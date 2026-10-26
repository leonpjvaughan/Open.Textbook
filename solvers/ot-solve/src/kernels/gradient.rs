//! Gradient descent on a one-dimensional quadratic.
//!
//! `f(x) = ½ax² − bx` has its minimum at `x = b/a`, and the step size decides
//! whether the iterates converge, oscillate, or run away: `0 < step < 2/a` is the
//! whole stability condition. That is the optimisation class in one control.

use crate::abi::*;

const HISTORY: usize = 128;

const P_A: usize = 0;
const P_B: usize = 1;
const P_STEP: usize = 2;

const S_X: usize = 0;

const O_X: usize = 0;
const O_F: usize = HISTORY;
const O_CURVE: usize = 2 * HISTORY;
const CURVE: usize = 128;

const D_ITER: usize = 0;
const D_F: usize = 1;
const D_GRAD: usize = 2;
const D_CONVERGED: usize = 3;

pub const META: Meta = Meta {
    id: "gradient-descent",
    title: "Gradient descent on a quadratic",
    summary:
        "The step size decides convergence: below 2/a the iterates settle, above it they run away.",
    params: &[
        Param::new("a", "Curvature a", 1.0, 0.2, 3.0, 0.1, ""),
        Param::new("b", "Target b", 2.0, -4.0, 4.0, 0.1, ""),
        Param::new("step", "Step size", 0.3, 0.05, 2.5, 0.05, ""),
    ],
    outputs: &[
        Output::new("x_history", "Iterates", Block::Out, O_X, HISTORY, ""),
        Output::new("f_history", "Objective", Block::Out, O_F, HISTORY, ""),
        Output::new("curve", "The quadratic", Block::Out, O_CURVE, 2 * CURVE, ""),
        Output::new("iterations", "Iterations", Block::Diag, D_ITER, 1, ""),
        Output::new("objective", "Objective", Block::Diag, D_F, 1, ""),
        Output::new("gradient", "Gradient", Block::Diag, D_GRAD, 1, ""),
        Output::new("converged", "Converged", Block::Diag, D_CONVERGED, 1, ""),
    ],
    capacity: &[],
    sizes: [3, 1, 2 * HISTORY + 2 * CURVE, 4],
    exact: true,
};

pub const KERNEL: Kernel = Kernel {
    meta: META,
    init,
    step,
    cases: CASES,
};

fn objective(a: f64, b: f64, x: f64) -> f64 {
    0.5 * a * x * x - b * x
}

pub fn init(a: &mut Arena<'_>) -> Status {
    let curvature = a.params()[P_A];
    let target = a.params()[P_B];
    let step = a.params()[P_STEP];
    if !curvature.is_finite() || curvature <= 0.0 || !target.is_finite() || !step.is_finite() {
        return Status::BadParameter;
    }
    if step <= 0.0 {
        return Status::BadParameter;
    }
    let state = a.state_mut();
    state[S_X] = 0.0;
    let value = objective(curvature, target, 0.0);
    let out = a.out_mut();
    for slot in out.iter_mut() {
        *slot = 0.0;
    }
    out[O_X] = 0.0;
    out[O_F] = value;
    let optimum = target / curvature;
    for index in 0..CURVE {
        let sample = optimum - 2.0 + 4.0 * index as f64 / (CURVE - 1) as f64;
        out[O_CURVE + 2 * index] = sample;
        out[O_CURVE + 2 * index + 1] = objective(curvature, target, sample);
    }
    let diag = a.diag_mut();
    diag[D_ITER] = 0.0;
    diag[D_F] = value;
    diag[D_GRAD] = -target;
    diag[D_CONVERGED] = 0.0;
    Status::Ok
}

pub fn step(a: &mut Arena<'_>) -> Status {
    let curvature = a.params()[P_A];
    let target = a.params()[P_B];
    let step = a.params()[P_STEP];
    if !curvature.is_finite() || curvature <= 0.0 || step <= 0.0 {
        return Status::BadParameter;
    }
    let iteration = a.diag()[D_ITER] as usize;
    let x = a.state()[S_X];
    let grad = curvature * x - target;
    let next = x - step * grad;
    let state = a.state_mut();
    state[S_X] = next;
    let slot = (iteration + 1).min(HISTORY - 1);
    let value = objective(curvature, target, next);
    let out = a.out_mut();
    out[O_X + slot] = next;
    out[O_F + slot] = value;
    let diag = a.diag_mut();
    diag[D_ITER] += 1.0;
    diag[D_F] = value;
    diag[D_GRAD] = curvature * next - target;
    diag[D_CONVERGED] = if (curvature * next - target).abs() < 1.0e-9 {
        1.0
    } else {
        0.0
    };
    if !next.is_finite() || next.abs() > 1.0e6 {
        return Status::Unstable;
    }
    Status::Ok
}

fn setup_default(_: &mut Arena<'_>) {}

pub const CASES: &[Case] = &[
    Case {
        name: "a = 1, b = 2, step = 0.3",
        params: &[("a", 1.0), ("b", 2.0), ("step", 0.3)],
        setup: setup_default,
        steps: 30,
    },
    Case {
        name: "past the stability limit, step = 2.5",
        params: &[("a", 1.0), ("b", 2.0), ("step", 2.5)],
        setup: setup_default,
        steps: 50,
    },
];

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn converges_to_the_minimum() {
        let mut buffer = vec![0.0; META.slots()];
        let mut arena = Arena::from_slice(&mut buffer, &META);
        arena.params_mut()[P_A] = 1.0;
        arena.params_mut()[P_B] = 2.0;
        arena.params_mut()[P_STEP] = 0.3;
        init(&mut arena);
        for _ in 0..100 {
            step(&mut arena);
        }
        assert!((arena.state()[S_X] - 2.0).abs() < 1.0e-6);
        assert_eq!(arena.diag()[D_CONVERGED], 1.0);
    }

    #[test]
    fn past_two_over_a_it_runs_away() {
        let mut buffer = vec![0.0; META.slots()];
        let mut arena = Arena::from_slice(&mut buffer, &META);
        arena.params_mut()[P_A] = 1.0;
        arena.params_mut()[P_B] = 2.0;
        arena.params_mut()[P_STEP] = 2.5;
        init(&mut arena);
        let mut status = Status::Ok;
        for _ in 0..60 {
            status = step(&mut arena);
        }
        assert_eq!(status, Status::Unstable);
    }
}
