//! The kernel registry.
//!
//! One list, in one place. The build tool walks it, the wasm build selects one by
//! its feature, and the page names one by its `id`. Adding a kernel is a module, a
//! feature, and a line here.

pub mod cg;
pub mod gradient;
pub mod heat;
pub mod montecarlo;
pub mod newton;
pub mod power;
pub mod wave;

use crate::abi::Kernel;

pub static ALL: &[Kernel] = &[
    heat::KERNEL,
    wave::KERNEL,
    cg::KERNEL,
    newton::KERNEL,
    power::KERNEL,
    gradient::KERNEL,
    montecarlo::KERNEL,
];

pub fn by_id(id: &str) -> Option<&'static Kernel> {
    ALL.iter().find(|kernel| kernel.meta.id == id)
}
