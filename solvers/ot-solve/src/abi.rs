//! The contract between a kernel and the page.
//!
//! A kernel is a fixed block of `f64` slots cut into four named blocks. JavaScript
//! writes the parameters and the initial state, calls `init`, then `step` or `run`,
//! and reads the outputs. Nothing is allocated, nothing is returned by pointer, and
//! a failure is a status code rather than a trap.
//!
//! The manifest a figure reads is generated from these same declarations, so the
//! controls and the wasm cannot disagree about a parameter's index or an output's
//! offset.

use core::marker::PhantomData;

/// The calling-convention version. Bump it when an export's meaning changes, not
/// when a kernel's mathematics does.
pub const ABI: i32 = 1;

/// The four blocks every arena has, in offset order.
pub const BLOCKS: usize = 4;

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
#[repr(usize)]
pub enum Block {
    Params = 0,
    State = 1,
    Out = 2,
    Diag = 3,
}

/// A failure is data. The figure can draw an unstable answer; it cannot draw a trap.
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
#[repr(i32)]
pub enum Status {
    Ok = 0,
    /// The scheme's own stability limit was crossed and the field is growing.
    Unstable = 1,
    /// The iteration ran out of steps before it reached its tolerance.
    NotConverged = 2,
    /// A parameter is outside its declared range or is not finite.
    BadParameter = 3,
    /// `step` or `run` was called before `init`.
    NotInitialised = 4,
}

impl Status {
    pub fn code(self) -> i32 {
        self as i32
    }
}

/// One number the reader can move, and the range the figure builds a control from.
#[derive(Clone, Copy)]
pub struct Param {
    pub name: &'static str,
    pub label: &'static str,
    pub default: f64,
    pub min: f64,
    pub max: f64,
    pub step: f64,
    pub unit: &'static str,
}

impl Param {
    pub const fn new(
        name: &'static str,
        label: &'static str,
        default: f64,
        min: f64,
        max: f64,
        step: f64,
        unit: &'static str,
    ) -> Self {
        Self {
            name,
            label,
            default,
            min,
            max,
            step,
            unit,
        }
    }

    /// A whole-number parameter: a cell count, an iteration count, a seed. The
    /// minimum is part of the declaration because a slider that can reach a grid the
    /// kernel rejects is a control that produces a status instead of a picture.
    pub const fn count(
        name: &'static str,
        label: &'static str,
        default: f64,
        min: f64,
        max: f64,
    ) -> Self {
        Self::new(name, label, default, min, max, 1.0, "")
    }
}

/// One array or scalar a figure can read, as a slice of a block.
#[derive(Clone, Copy)]
pub struct Output {
    pub name: &'static str,
    pub label: &'static str,
    pub block: Block,
    pub offset: usize,
    pub length: usize,
    pub unit: &'static str,
}

impl Output {
    pub const fn new(
        name: &'static str,
        label: &'static str,
        block: Block,
        offset: usize,
        length: usize,
        unit: &'static str,
    ) -> Self {
        Self {
            name,
            label,
            block,
            offset,
            length,
            unit,
        }
    }
}

/// Everything the build tool and the page need to know about a kernel.
#[derive(Clone, Copy)]
pub struct Meta {
    pub id: &'static str,
    pub title: &'static str,
    pub summary: &'static str,
    pub params: &'static [Param],
    pub outputs: &'static [Output],
    /// The compile-time capacity of the arrays a parameter can size, e.g. `cells`.
    pub capacity: &'static [(&'static str, usize)],
    /// Slots in each block: params, state, out, diag.
    pub sizes: [usize; BLOCKS],
    /// True when the kernel uses only IEEE arithmetic (`+ - * / sqrt`), so a native
    /// run and the wasm must agree bit for bit. A kernel that calls `sin`, `exp` or
    /// `atan2` is false: the host libm and the wasm libm may differ in the last bit.
    pub exact: bool,
}

impl Meta {
    pub fn slots(&self) -> usize {
        self.sizes.iter().sum()
    }

    pub fn offset(&self, block: Block) -> usize {
        self.sizes[..block as usize].iter().sum()
    }

    pub fn param_index(&self, name: &str) -> Option<usize> {
        self.params.iter().position(|param| param.name == name)
    }

    /// FNV-1a over the block sizes. The page compares it with the manifest's, so a
    /// stale wasm and a fresh manifest cannot be mixed silently.
    pub fn layout_hash(&self) -> u32 {
        let mut hash = 0x811c_9dc5u32;
        for size in self.sizes {
            for byte in (size as u32).to_le_bytes() {
                hash ^= byte as u32;
                hash = hash.wrapping_mul(0x0100_0193);
            }
        }
        hash
    }
}

/// The fixed arena, viewed as four blocks.
///
/// The lifetime is the buffer's. The wasm build gets a `'static` arena from the
/// module's own static; a test gets one borrowed from a `Vec`.
pub struct Arena<'a> {
    base: *mut f64,
    sizes: [usize; BLOCKS],
    offsets: [usize; BLOCKS],
    _marker: PhantomData<&'a mut f64>,
}

impl<'a> Arena<'a> {
    pub fn from_slice(buffer: &'a mut [f64], meta: &Meta) -> Self {
        assert!(
            buffer.len() >= meta.slots(),
            "an arena needs {} slots, the buffer has {}",
            meta.slots(),
            buffer.len()
        );
        let mut offsets = [0usize; BLOCKS];
        let mut total = 0usize;
        for (index, size) in meta.sizes.iter().enumerate() {
            offsets[index] = total;
            total += size;
        }
        Self {
            base: buffer.as_mut_ptr(),
            sizes: meta.sizes,
            offsets,
            _marker: PhantomData,
        }
    }

    /// # Safety
    ///
    /// `base` must point at `meta.slots()` initialised `f64`s that outlive `'static`
    /// and are not aliased while the arena is used. The wasm entry points are the
    /// only caller, with the module's own static buffer.
    pub unsafe fn from_raw(base: *mut f64, meta: &Meta) -> Arena<'static> {
        let mut offsets = [0usize; BLOCKS];
        let mut total = 0usize;
        for (index, size) in meta.sizes.iter().enumerate() {
            offsets[index] = total;
            total += size;
        }
        Arena {
            base,
            sizes: meta.sizes,
            offsets,
            _marker: PhantomData,
        }
    }

    fn block(&self, block: Block) -> &[f64] {
        let index = block as usize;
        unsafe {
            core::slice::from_raw_parts(self.base.add(self.offsets[index]), self.sizes[index])
        }
    }

    fn block_mut(&mut self, block: Block) -> &mut [f64] {
        let index = block as usize;
        unsafe {
            core::slice::from_raw_parts_mut(self.base.add(self.offsets[index]), self.sizes[index])
        }
    }

    pub fn params(&self) -> &[f64] {
        self.block(Block::Params)
    }

    pub fn params_mut(&mut self) -> &mut [f64] {
        self.block_mut(Block::Params)
    }

    pub fn state(&self) -> &[f64] {
        self.block(Block::State)
    }

    pub fn state_mut(&mut self) -> &mut [f64] {
        self.block_mut(Block::State)
    }

    pub fn out(&self) -> &[f64] {
        self.block(Block::Out)
    }

    pub fn out_mut(&mut self) -> &mut [f64] {
        self.block_mut(Block::Out)
    }

    pub fn diag(&self) -> &[f64] {
        self.block(Block::Diag)
    }

    pub fn diag_mut(&mut self) -> &mut [f64] {
        self.block_mut(Block::Diag)
    }

    /// A parameter by name, for the build tool and tests. A kernel reads its own
    /// parameters by index, which is fixed by its `Meta`.
    pub fn param(&self, meta: &Meta, name: &str) -> Option<f64> {
        meta.param_index(name).map(|index| self.params()[index])
    }
}

/// One kernel: its metadata, its two entry points, and the vectors that prove the
/// artefact behaves the same as the native code.
#[derive(Clone, Copy)]
pub struct Kernel {
    pub meta: Meta,
    pub init: fn(&mut Arena<'_>) -> Status,
    pub step: fn(&mut Arena<'_>) -> Status,
    pub cases: &'static [Case],
}

/// A selftest vector, run natively at build time and replayed against the wasm.
#[derive(Clone, Copy)]
pub struct Case {
    pub name: &'static str,
    pub params: &'static [(&'static str, f64)],
    pub setup: fn(&mut Arena<'_>),
    pub steps: u32,
}

/// Advance at most `n` steps, stopping at the first failure.
pub fn run(kernel: &Kernel, arena: &mut Arena<'_>, n: u32) -> Status {
    for _ in 0..n {
        match (kernel.step)(arena) {
            Status::Ok => {}
            other => return other,
        }
    }
    Status::Ok
}

pub fn max_abs(values: &[f64]) -> f64 {
    values.iter().fold(0.0, |m, value| m.max(value.abs()))
}

pub fn rms(values: &[f64]) -> f64 {
    if values.is_empty() {
        return 0.0;
    }
    let sum: f64 = values.iter().map(|value| value * value).sum();
    (sum / values.len() as f64).sqrt()
}
