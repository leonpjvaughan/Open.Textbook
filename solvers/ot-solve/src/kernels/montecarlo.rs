//! Monte Carlo estimation of π by sampling the unit square.
//!
//! The estimator is `4 × (points inside the quarter circle) / (points drawn)`. Its
//! error falls as `1/√n`, which is the whole of the averaging class: a better answer
//! costs samples, not a better formula. The generator is a small LCG seeded from a
//! parameter, so two readers comparing what they saw see the same sequence.

use crate::abi::*;

const HISTORY: usize = 128;

const P_SEED: usize = 0;
const P_BATCH: usize = 1;

const S_RNG: usize = 0;
const S_N: usize = 1;
const S_INSIDE: usize = 2;

const O_ESTIMATE: usize = 0;
const O_STDERR: usize = HISTORY;

const D_STEP: usize = 0;
const D_ESTIMATE: usize = 1;
const D_STDERR: usize = 2;
const D_SAMPLES: usize = 3;

pub const META: Meta = Meta {
    id: "monte-carlo-pi",
    title: "Monte Carlo estimation of π",
    summary: "Samples the unit square; the estimate converges as 1/sqrt(n), and the seed makes it repeatable.",
    params: &[
        Param::count("seed", "Seed", 1.0, 1.0, 1000000.0),
        Param::new("batch", "Batch size", 1000.0, 10.0, 10000.0, 10.0, ""),
    ],
    outputs: &[
        Output::new("estimate_history", "Estimate", Block::Out, O_ESTIMATE, HISTORY, ""),
        Output::new("stderr_history", "Standard error", Block::Out, O_STDERR, HISTORY, ""),
        Output::new("steps", "Steps", Block::Diag, D_STEP, 1, ""),
        Output::new("estimate", "Estimate", Block::Diag, D_ESTIMATE, 1, ""),
        Output::new("stderr", "Standard error", Block::Diag, D_STDERR, 1, ""),
        Output::new("samples", "Samples", Block::Diag, D_SAMPLES, 1, ""),
    ],
    capacity: &[],
    sizes: [2, 3, 2 * HISTORY, 4],
    exact: true,
};

pub const KERNEL: Kernel = Kernel {
    meta: META,
    init,
    step,
    cases: CASES,
};

fn next(state: &mut u32) -> f64 {
    *state = state.wrapping_mul(1_664_525).wrapping_add(1_013_904_223);
    // The top 24 bits are the ones with the good distribution; the low bits of an
    // LCG are the ones with the period.
    (*state >> 8) as f64 / 16_777_216.0
}

pub fn init(a: &mut Arena<'_>) -> Status {
    let seed = a.params()[P_SEED];
    let batch = a.params()[P_BATCH];
    if !seed.is_finite() || seed < 1.0 || !batch.is_finite() || batch < 1.0 {
        return Status::BadParameter;
    }
    let state = a.state_mut();
    state[S_RNG] = seed as u32 as f64;
    state[S_N] = 0.0;
    state[S_INSIDE] = 0.0;
    let out = a.out_mut();
    for slot in out.iter_mut() {
        *slot = 0.0;
    }
    let diag = a.diag_mut();
    diag[D_STEP] = 0.0;
    diag[D_ESTIMATE] = 0.0;
    diag[D_STDERR] = 0.0;
    diag[D_SAMPLES] = 0.0;
    Status::Ok
}

pub fn step(a: &mut Arena<'_>) -> Status {
    let batch = a.params()[P_BATCH];
    if !batch.is_finite() || batch < 1.0 {
        return Status::BadParameter;
    }
    let batch = batch as u32;
    let (mut rng, mut n, mut inside) = {
        let state = a.state();
        (
            state[S_RNG] as u32,
            state[S_N] as u64,
            state[S_INSIDE] as u64,
        )
    };
    for _ in 0..batch {
        let x = next(&mut rng);
        let y = next(&mut rng);
        if x * x + y * y <= 1.0 {
            inside += 1;
        }
        n += 1;
    }
    let p = inside as f64 / n as f64;
    let estimate = 4.0 * p;
    let stderr = 4.0 * (p * (1.0 - p) / n as f64).sqrt();
    let state = a.state_mut();
    state[S_RNG] = rng as f64;
    state[S_N] = n as f64;
    state[S_INSIDE] = inside as f64;
    let iteration = a.diag()[D_STEP] as usize;
    let slot = (iteration + 1).min(HISTORY - 1);
    let out = a.out_mut();
    out[O_ESTIMATE + slot] = estimate;
    out[O_STDERR + slot] = stderr;
    let diag = a.diag_mut();
    diag[D_STEP] = (iteration + 1) as f64;
    diag[D_ESTIMATE] = estimate;
    diag[D_STDERR] = stderr;
    diag[D_SAMPLES] = n as f64;
    if !estimate.is_finite() {
        return Status::Unstable;
    }
    Status::Ok
}

fn setup_default(_: &mut Arena<'_>) {}

pub const CASES: &[Case] = &[
    Case {
        name: "seed 1, 500 samples a step",
        params: &[("seed", 1.0), ("batch", 500.0)],
        setup: setup_default,
        steps: 16,
    },
    Case {
        name: "seed 7, 2000 samples a step",
        params: &[("seed", 7.0), ("batch", 2000.0)],
        setup: setup_default,
        steps: 8,
    },
];

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn the_estimate_approaches_pi() {
        let mut buffer = vec![0.0; META.slots()];
        let mut arena = Arena::from_slice(&mut buffer, &META);
        arena.params_mut()[P_SEED] = 1.0;
        arena.params_mut()[P_BATCH] = 1000.0;
        init(&mut arena);
        for _ in 0..200 {
            step(&mut arena);
        }
        assert!((arena.diag()[D_ESTIMATE] - core::f64::consts::PI).abs() < 0.01);
    }

    #[test]
    fn the_same_seed_gives_the_same_sequence() {
        let run = || {
            let mut buffer = vec![0.0; META.slots()];
            let mut arena = Arena::from_slice(&mut buffer, &META);
            arena.params_mut()[P_SEED] = 42.0;
            arena.params_mut()[P_BATCH] = 100.0;
            init(&mut arena);
            for _ in 0..10 {
                step(&mut arena);
            }
            arena.diag()[D_ESTIMATE]
        };
        assert_eq!(run(), run());
    }
}
