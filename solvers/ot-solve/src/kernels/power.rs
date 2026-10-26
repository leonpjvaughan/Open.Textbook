//! Power iteration on a symmetric two-by-two matrix.
//!
//! The dominant eigenvalue and its eigenvector are known in closed form, so the
//! kernel can report the error as well as the estimate. The ratio of the two
//! eigenvalues is the convergence rate, and it is the number a reader can move.

use crate::abi::*;

const HISTORY: usize = 128;

const P_RATIO: usize = 0;
const P_MIX: usize = 1;
const P_ANGLE: usize = 2;

const S_X: usize = 0;
const S_Y: usize = 2;

const O_ANGLE: usize = 0;
const O_LAMBDA: usize = HISTORY;
const O_REFERENCE: usize = 2 * HISTORY;

const D_ITER: usize = 0;
const D_LAMBDA: usize = 1;
const D_ANGLE: usize = 2;
const D_ERROR: usize = 3;

pub const META: Meta = Meta {
    id: "power-iteration",
    title: "Power iteration on a two-by-two matrix",
    summary: "A vector repeatedly multiplied by A turns toward the dominant eigenvector; the ratio sets the speed.",
    params: &[
        Param::new("ratio", "Ratio", 0.5, 0.05, 0.95, 0.01, ""),
        Param::new("mix", "Mix", 0.3, -0.9, 0.9, 0.05, ""),
        Param::new("angle", "Starting angle", 0.6, -3.1, 3.1, 0.05, "rad"),
    ],
    outputs: &[
        Output::new("angle_history", "Angle", Block::Out, O_ANGLE, HISTORY, "rad"),
        Output::new("lambda_history", "Eigenvalue estimate", Block::Out, O_LAMBDA, HISTORY, ""),
        Output::new("reference", "Dominant pair", Block::Out, O_REFERENCE, 2, ""),
        Output::new("iterations", "Iterations", Block::Diag, D_ITER, 1, ""),
        Output::new("lambda", "Eigenvalue", Block::Diag, D_LAMBDA, 1, ""),
        Output::new("angle", "Angle", Block::Diag, D_ANGLE, 1, "rad"),
        Output::new("angle_error", "Angle error", Block::Diag, D_ERROR, 1, "rad"),
    ],
    capacity: &[],
    sizes: [3, 4, 2 * HISTORY + 2, 4],
    exact: false,
};

pub const KERNEL: Kernel = Kernel {
    meta: META,
    init,
    step,
    cases: CASES,
};

/// The largest eigenvalue and its eigenvector angle, in closed form.
fn dominant(ratio: f64, mix: f64) -> (f64, f64) {
    let mean = 0.5 * (1.0 + ratio);
    let radius = (0.25 * (1.0 - ratio) * (1.0 - ratio) + mix * mix).sqrt();
    let lambda = mean + radius;
    let angle = (lambda - 1.0).atan2(mix);
    (lambda, angle)
}

fn multiply(x: f64, y: f64, ratio: f64, mix: f64) -> (f64, f64) {
    (x + mix * y, mix * x + ratio * y)
}

pub fn init(a: &mut Arena<'_>) -> Status {
    let ratio = a.params()[P_RATIO];
    let mix = a.params()[P_MIX];
    let angle = a.params()[P_ANGLE];
    if !ratio.is_finite() || !mix.is_finite() || !angle.is_finite() {
        return Status::BadParameter;
    }
    if ratio <= 0.0 || ratio >= 1.0 || mix.abs() >= 1.0 {
        return Status::BadParameter;
    }
    let (lambda_exact, angle_exact) = dominant(ratio, mix);
    let state = a.state_mut();
    state[S_X] = angle.cos();
    state[S_Y] = angle.sin();
    let x = state[S_X];
    let y = state[S_Y];
    let rayleigh = x * (x + mix * y) + y * (mix * x + ratio * y);
    let out = a.out_mut();
    for value in out.iter_mut() {
        *value = 0.0;
    }
    out[O_ANGLE] = angle;
    out[O_LAMBDA] = rayleigh;
    out[O_REFERENCE] = angle_exact;
    out[O_REFERENCE + 1] = lambda_exact;
    let diag = a.diag_mut();
    diag[D_ITER] = 0.0;
    diag[D_LAMBDA] = rayleigh;
    diag[D_ANGLE] = angle;
    diag[D_ERROR] = (angle - angle_exact).abs();
    Status::Ok
}

pub fn step(a: &mut Arena<'_>) -> Status {
    let ratio = a.params()[P_RATIO];
    let mix = a.params()[P_MIX];
    if !ratio.is_finite() || !mix.is_finite() {
        return Status::BadParameter;
    }
    let iteration = a.diag()[D_ITER] as usize;
    let (_, angle_exact) = dominant(ratio, mix);
    let (x, y) = {
        let state = a.state();
        (state[S_X], state[S_Y])
    };
    let (mut next_x, mut next_y) = multiply(x, y, ratio, mix);
    let norm = (next_x * next_x + next_y * next_y).sqrt();
    if !norm.is_finite() || norm == 0.0 {
        return Status::Unstable;
    }
    next_x /= norm;
    next_y /= norm;
    let angle = next_y.atan2(next_x);
    let state = a.state_mut();
    state[S_X] = next_x;
    state[S_Y] = next_y;
    let slot = (iteration + 1).min(HISTORY - 1);
    let out = a.out_mut();
    out[O_ANGLE + slot] = angle;
    out[O_LAMBDA + slot] = norm;
    let diag = a.diag_mut();
    diag[D_ITER] += 1.0;
    diag[D_LAMBDA] = norm;
    diag[D_ANGLE] = angle;
    diag[D_ERROR] = (angle - angle_exact).abs();
    if !next_x.is_finite() || !next_y.is_finite() {
        return Status::Unstable;
    }
    Status::Ok
}

fn setup_default(_: &mut Arena<'_>) {}

pub const CASES: &[Case] = &[
    Case {
        name: "ratio 0.5, mix 0.3",
        params: &[("ratio", 0.5), ("mix", 0.3), ("angle", 0.6)],
        setup: setup_default,
        steps: 20,
    },
    Case {
        name: "ratio 0.9, mix -0.4",
        params: &[("ratio", 0.9), ("mix", -0.4), ("angle", -1.2)],
        setup: setup_default,
        steps: 30,
    },
];

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn converges_to_the_dominant_pair() {
        let mut buffer = vec![0.0; META.slots()];
        let mut arena = Arena::from_slice(&mut buffer, &META);
        arena.params_mut()[P_RATIO] = 0.5;
        arena.params_mut()[P_MIX] = 0.3;
        arena.params_mut()[P_ANGLE] = 0.6;
        init(&mut arena);
        let (lambda, angle) = dominant(0.5, 0.3);
        for _ in 0..200 {
            step(&mut arena);
        }
        assert!((arena.diag()[D_LAMBDA] - lambda).abs() < 1.0e-8);
        assert!(
            (arena.diag()[D_ANGLE] - angle).abs() < 1.0e-8,
            "angle {} expected {} (lambda {} expected {})",
            arena.diag()[D_ANGLE],
            angle,
            arena.diag()[D_LAMBDA],
            lambda
        );
    }

    #[test]
    fn a_slow_ratio_is_slower() {
        let run = |ratio: f64| {
            let mut buffer = vec![0.0; META.slots()];
            let mut arena = Arena::from_slice(&mut buffer, &META);
            arena.params_mut()[P_RATIO] = ratio;
            arena.params_mut()[P_MIX] = 0.3;
            arena.params_mut()[P_ANGLE] = 0.6;
            init(&mut arena);
            for _ in 0..10 {
                step(&mut arena);
            }
            arena.diag()[D_ERROR]
        };
        assert!(run(0.9) > run(0.2) * 10.0);
    }
}
