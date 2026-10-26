//! Numerical kernels for Open.Textbook, compiled to WebAssembly.
//!
//! The library always contains every kernel, so the host build tool and the tests
//! need no feature. A wasm build enables exactly one feature, which selects the
//! kernel whose `init`/`step`/`run` are exported under the fixed ABI names in
//! [`ABI.md`](../../ABI.md).
//!
//! The design rules are in `solvers/AGENTS.md`. The short version: a fixed arena,
//! a declared layout, status codes rather than traps, and a selftest vector that
//! the build records and the page's runtime replays.

pub mod abi;
pub mod grid;
pub mod kernels;

pub use abi::{Arena, Block, Case, Kernel, Meta, Output, Param, Status};

/// The wasm module's arena, in `f64` slots. The largest kernel (CG) uses 1670;
/// the margin is for a larger grid, not for growth at run time.
const SLOTS: usize = 2048;
static mut ARENA: [f64; SLOTS] = [0.0; SLOTS];

#[cfg(feature = "heat-explicit")]
fn active() -> Option<&'static Kernel> {
    Some(&kernels::heat::KERNEL)
}

#[cfg(feature = "wave-explicit")]
fn active() -> Option<&'static Kernel> {
    Some(&kernels::wave::KERNEL)
}

#[cfg(feature = "cg-poisson")]
fn active() -> Option<&'static Kernel> {
    Some(&kernels::cg::KERNEL)
}

#[cfg(feature = "newton-root")]
fn active() -> Option<&'static Kernel> {
    Some(&kernels::newton::KERNEL)
}

#[cfg(feature = "power-iteration")]
fn active() -> Option<&'static Kernel> {
    Some(&kernels::power::KERNEL)
}

#[cfg(feature = "gradient-descent")]
fn active() -> Option<&'static Kernel> {
    Some(&kernels::gradient::KERNEL)
}

#[cfg(feature = "monte-carlo-pi")]
fn active() -> Option<&'static Kernel> {
    Some(&kernels::montecarlo::KERNEL)
}

#[cfg(not(any(
    feature = "heat-explicit",
    feature = "wave-explicit",
    feature = "cg-poisson",
    feature = "newton-root",
    feature = "power-iteration",
    feature = "gradient-descent",
    feature = "monte-carlo-pi"
)))]
fn active() -> Option<&'static Kernel> {
    None
}

fn with_arena<F>(body: F) -> i32
where
    F: FnOnce(&mut Arena<'_>) -> Status,
{
    let Some(kernel) = active() else {
        return Status::BadParameter.code();
    };
    if kernel.meta.slots() > SLOTS {
        return Status::BadParameter.code();
    }
    // The module's own arena: `'static`, unaliased, and never handed to JavaScript
    // as a reference. The page reads the same bytes through the memory export.
    let mut arena =
        unsafe { Arena::from_raw(core::ptr::addr_of_mut!(ARENA).cast::<f64>(), &kernel.meta) };
    body(&mut arena).code()
}

/// The calling-convention version. Named `abi` in the wasm exports.
#[export_name = "abi"]
pub extern "C" fn abi_version() -> i32 {
    abi::ABI
}

/// The byte offset of the arena in linear memory. Named `arena` in the exports.
#[export_name = "arena"]
pub extern "C" fn arena_offset() -> i32 {
    core::ptr::addr_of!(ARENA) as i32
}

/// The number of `f64` slots the active kernel uses. Named `slots` in the exports.
#[export_name = "slots"]
pub extern "C" fn arena_slots() -> i32 {
    active()
        .map(|kernel| kernel.meta.slots() as i32)
        .unwrap_or(0)
}

/// The layout digest the page compares with its manifest. Named `layout` in the exports.
#[export_name = "layout"]
pub extern "C" fn layout_hash() -> i32 {
    active()
        .map(|kernel| kernel.meta.layout_hash() as i32)
        .unwrap_or(0)
}

#[export_name = "init"]
pub extern "C" fn kernel_init() -> i32 {
    with_arena(|arena| match active() {
        Some(kernel) => (kernel.init)(arena),
        None => Status::BadParameter,
    })
}

#[export_name = "step"]
pub extern "C" fn kernel_step() -> i32 {
    with_arena(|arena| match active() {
        Some(kernel) => (kernel.step)(arena),
        None => Status::BadParameter,
    })
}

#[export_name = "run"]
pub extern "C" fn kernel_run(steps: i32) -> i32 {
    with_arena(|arena| match active() {
        Some(kernel) => abi::run(kernel, arena, steps.max(0) as u32),
        None => Status::BadParameter,
    })
}
