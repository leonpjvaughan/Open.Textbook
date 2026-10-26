//! Exactly one kernel feature per wasm build.
//!
//! The library API contains every kernel, so the host build and the tests enable
//! none. A wasm build enables one, because the exported `init`/`step`/`run` have
//! fixed names and two kernels would collide. Catching that here is cheaper than
//! a linker error that names a mangled symbol.

fn main() {
    println!("cargo:rerun-if-changed=build.rs");
    let names = [
        "HEAT_EXPLICIT",
        "WAVE_EXPLICIT",
        "CG_POISSON",
        "NEWTON_ROOT",
        "POWER_ITERATION",
        "GRADIENT_DESCENT",
        "MONTE_CARLO_PI",
    ];
    let enabled = names
        .iter()
        .filter(|name| std::env::var(format!("CARGO_FEATURE_{name}")).is_ok())
        .count();
    if enabled > 1 {
        panic!(
            "enable at most one kernel feature: a wasm build exports one kernel, and \
             {enabled} were enabled"
        );
    }
}
