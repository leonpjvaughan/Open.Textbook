//! Newton's method on a cubic: a rule that must hold at a point, and bends.
//!
//! `f(x) = x³ − 2x − 5` has one real root. The kernel records the iterates, so a
//! figure can draw the tangent steps or the residual falling; the damping factor is
//! the one control that turns a convergent run into an oscillating one.

use crate::abi::*;

/// The iterates a figure can draw. More than enough for a cubic from any start.
const HISTORY: usize = 64;

const P_X0: usize = 0;
const P_DAMPING: usize = 1;

const S_X: usize = 0;
const S_F: usize = 1;
const S_DF: usize = 2;

const O_X: usize = 0;
const O_F: usize = HISTORY;
const O_CURVE: usize = 2 * HISTORY;
const CURVE: usize = 128;

const D_ITER: usize = 0;
const D_RESIDUAL: usize = 1;
const D_CONVERGED: usize = 2;

pub const META: Meta = Meta {
    id: "newton-root",
    title: "Newton's method on a cubic",
    summary: "The tangent step for f(x) = x^3 - 2x - 5, with the iterates and the residual.",
    params: &[
        Param::new("x0", "Starting value", 3.0, -4.0, 4.0, 0.1, ""),
        Param::new("damping", "Damping", 1.0, 0.1, 1.5, 0.05, ""),
    ],
    outputs: &[
        Output::new("x_history", "Iterates", Block::Out, O_X, HISTORY, ""),
        Output::new("f_history", "Residual", Block::Out, O_F, HISTORY, ""),
        Output::new("curve", "The cubic", Block::Out, O_CURVE, 2 * CURVE, ""),
        Output::new("iterations", "Iterations", Block::Diag, D_ITER, 1, ""),
        Output::new("residual", "Residual", Block::Diag, D_RESIDUAL, 1, ""),
        Output::new("converged", "Converged", Block::Diag, D_CONVERGED, 1, ""),
    ],
    capacity: &[],
    sizes: [2, 3, 2 * HISTORY + 2 * CURVE, 4],
    exact: true,
};

pub const KERNEL: Kernel = Kernel {
    meta: META,
    init,
    step,
    cases: CASES,
};

fn evaluate(x: f64) -> (f64, f64) {
    (x * x * x - 2.0 * x - 5.0, 3.0 * x * x - 2.0)
}

pub fn init(a: &mut Arena<'_>) -> Status {
    let x = a.params()[P_X0];
    let damping = a.params()[P_DAMPING];
    if !x.is_finite() || !damping.is_finite() || damping <= 0.0 {
        return Status::BadParameter;
    }
    let (f, df) = evaluate(x);
    let state = a.state_mut();
    state[S_X] = x;
    state[S_F] = f;
    state[S_DF] = df;
    let out = a.out_mut();
    for value in out.iter_mut() {
        *value = 0.0;
    }
    out[O_X] = x;
    out[O_F] = f;
    for index in 0..CURVE {
        let sample = -4.0 + 8.0 * index as f64 / (CURVE - 1) as f64;
        let (value, _) = evaluate(sample);
        out[O_CURVE + 2 * index] = sample;
        out[O_CURVE + 2 * index + 1] = value;
    }
    let diag = a.diag_mut();
    diag[D_ITER] = 0.0;
    diag[D_RESIDUAL] = f;
    diag[D_CONVERGED] = if f.abs() < 1.0e-14 { 1.0 } else { 0.0 };
    Status::Ok
}

pub fn step(a: &mut Arena<'_>) -> Status {
    let damping = a.params()[P_DAMPING];
    if !damping.is_finite() || damping <= 0.0 {
        return Status::BadParameter;
    }
    let iteration = a.diag()[D_ITER] as usize;
    let converged = a.diag()[D_CONVERGED] > 0.0;
    if converged {
        return Status::Ok;
    }
    let (x, f, df) = {
        let state = a.state();
        (state[S_X], state[S_F], state[S_DF])
    };
    if df == 0.0 || !df.is_finite() {
        return Status::NotConverged;
    }
    let next = x - damping * f / df;
    let (next_f, next_df) = evaluate(next);
    let state = a.state_mut();
    state[S_X] = next;
    state[S_F] = next_f;
    state[S_DF] = next_df;
    let slot = (iteration + 1).min(HISTORY - 1);
    let out = a.out_mut();
    out[O_X + slot] = next;
    out[O_F + slot] = next_f;
    let diag = a.diag_mut();
    diag[D_ITER] += 1.0;
    diag[D_RESIDUAL] = next_f;
    diag[D_CONVERGED] = if next_f.abs() < 1.0e-12 { 1.0 } else { 0.0 };
    if !next.is_finite() || next.abs() > 1.0e6 {
        return Status::Unstable;
    }
    Status::Ok
}

fn setup_default(_: &mut Arena<'_>) {}

pub const CASES: &[Case] = &[
    Case {
        name: "from 3, undamped",
        params: &[("x0", 3.0), ("damping", 1.0)],
        setup: setup_default,
        steps: 8,
    },
    Case {
        name: "from -3, undamped",
        params: &[("x0", -3.0), ("damping", 1.0)],
        setup: setup_default,
        steps: 12,
    },
];

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn finds_the_root() {
        let mut buffer = vec![0.0; META.slots()];
        let mut arena = Arena::from_slice(&mut buffer, &META);
        arena.params_mut()[P_X0] = 3.0;
        arena.params_mut()[P_DAMPING] = 1.0;
        init(&mut arena);
        for _ in 0..10 {
            step(&mut arena);
        }
        assert!(arena.state()[S_F].abs() < 1.0e-12);
        assert!((arena.state()[S_X] - 2.094_551_481_542_326_5).abs() < 1.0e-12);
        assert_eq!(arena.diag()[D_CONVERGED], 1.0);
    }

    #[test]
    fn a_bad_damping_is_reported_not_trapped() {
        let mut buffer = vec![0.0; META.slots()];
        let mut arena = Arena::from_slice(&mut buffer, &META);
        arena.params_mut()[P_X0] = 3.0;
        arena.params_mut()[P_DAMPING] = 0.0;
        init(&mut arena);
        assert_eq!(step(&mut arena), Status::BadParameter);
    }
}
