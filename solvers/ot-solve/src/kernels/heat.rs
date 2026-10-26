//! The explicit diffusion scheme: `uₜ = α uₓₓ` on a fixed grid.
//!
//! The dimensionless number is `r = αΔt/Δx²`. The scheme is stable for `r ≤ 1/2`
//! and any `r` above it grows without bound, which is the page's lesson. The kernel
//! reports that growth as a status rather than trapping, so the figure can draw it.

use crate::abi::*;
use crate::grid;

const CAP: usize = 256;

const P_CELLS: usize = 0;
const P_R: usize = 1;

const S_U: usize = 0;
const S_NEXT: usize = CAP;

const D_STEP: usize = 0;
const D_NORM: usize = 1;
const D_MAX: usize = 2;
const D_MIN: usize = 3;

pub const META: Meta = Meta {
    id: "heat-explicit",
    title: "Explicit diffusion on a one-dimensional grid",
    summary: "Forward-time, centred-space for u_t = alpha u_xx. r is the stability number.",
    params: &[
        Param::count("cells", "Cells", 64.0, 4.0, CAP as f64),
        Param::new("r", "r = alpha·dt/dx²", 0.4, 0.05, 0.9, 0.01, ""),
    ],
    outputs: &[
        Output::new("u", "Temperature", Block::Out, 0, CAP, ""),
        Output::new("step", "Step", Block::Diag, D_STEP, 1, ""),
        Output::new("norm", "Largest |u|", Block::Diag, D_NORM, 1, ""),
        Output::new("max", "Maximum", Block::Diag, D_MAX, 1, ""),
        Output::new("min", "Minimum", Block::Diag, D_MIN, 1, ""),
    ],
    capacity: &[("cells", CAP)],
    sizes: [2, 2 * CAP, CAP, 4],
    exact: true,
};

pub const KERNEL: Kernel = Kernel {
    meta: META,
    init,
    step,
    cases: CASES,
};

fn cells(a: &Arena<'_>) -> Option<usize> {
    let cells = a.params()[P_CELLS] as usize;
    if !(4..=CAP).contains(&cells) {
        return None;
    }
    Some(cells)
}

pub fn init(a: &mut Arena<'_>) -> Status {
    let Some(cells) = cells(a) else {
        return Status::BadParameter;
    };
    let r = a.params()[P_R];
    if !r.is_finite() || r <= 0.0 {
        return Status::BadParameter;
    }
    let state = a.state_mut();
    state[S_U] = 0.0;
    state[S_U + cells - 1] = 0.0;
    for index in 0..cells {
        state[S_NEXT + index] = state[S_U + index];
    }
    let values = &state[S_U..S_U + cells];
    let (norm, maximum, minimum) = (
        grid::max_abs(values),
        values.iter().copied().fold(f64::NEG_INFINITY, f64::max),
        values.iter().copied().fold(f64::INFINITY, f64::min),
    );
    let mut field = [0.0f64; CAP];
    {
        let state = a.state();
        field[..cells].copy_from_slice(&state[S_U..S_U + cells]);
    }
    a.out_mut()[..cells].copy_from_slice(&field[..cells]);
    let diag = a.diag_mut();
    diag[D_STEP] = 0.0;
    diag[D_NORM] = norm;
    diag[D_MAX] = maximum;
    diag[D_MIN] = minimum;
    Status::Ok
}

pub fn step(a: &mut Arena<'_>) -> Status {
    let Some(cells) = cells(a) else {
        return Status::BadParameter;
    };
    let r = a.params()[P_R];
    if !r.is_finite() || r <= 0.0 {
        return Status::BadParameter;
    }
    let mut field = [0.0f64; CAP];
    let norm = {
        let state = a.state_mut();
        let (u, rest) = state.split_at_mut(CAP);
        let next = &mut rest[..CAP];
        for index in 1..cells - 1 {
            next[index] = u[index] + r * (u[index - 1] - 2.0 * u[index] + u[index + 1]);
        }
        next[0] = 0.0;
        next[cells - 1] = 0.0;
        u[..cells].copy_from_slice(&next[..cells]);
        field[..cells].copy_from_slice(&next[..cells]);
        grid::max_abs(&next[..cells])
    };
    a.out_mut()[..cells].copy_from_slice(&field[..cells]);
    let diag = a.diag_mut();
    diag[D_STEP] += 1.0;
    diag[D_NORM] = norm;
    diag[D_MAX] = field[..cells]
        .iter()
        .copied()
        .fold(f64::NEG_INFINITY, f64::max);
    diag[D_MIN] = field[..cells].iter().copied().fold(f64::INFINITY, f64::min);
    if !norm.is_finite() || norm > 1.0e6 {
        Status::Unstable
    } else {
        Status::Ok
    }
}

fn setup_sine(a: &mut Arena<'_>) {
    let cells = a.params()[P_CELLS] as usize;
    let state = a.state_mut();
    grid::sine_mode(&mut state[S_U..S_U + cells], cells);
}

/// The highest mode the grid can carry. It is the one that decides the stability
/// limit, and the one that grows once r > 1/2.
fn setup_alternating(a: &mut Arena<'_>) {
    let cells = a.params()[P_CELLS] as usize;
    let state = a.state_mut();
    for index in 0..cells {
        state[S_U + index] = if index % 2 == 0 { 1.0 } else { -1.0 };
    }
}

pub const CASES: &[Case] = &[
    Case {
        name: "sine mode, r = 0.4",
        params: &[("cells", 64.0), ("r", 0.4)],
        setup: setup_sine,
        steps: 20,
    },
    Case {
        name: "past the limit, r = 0.6",
        params: &[("cells", 64.0), ("r", 0.6)],
        setup: setup_alternating,
        steps: 12,
    },
];

#[cfg(test)]
mod tests {
    use super::*;
    use core::f64::consts::PI;

    #[test]
    fn matches_the_amplification_factor() {
        let mut buffer = vec![0.0; META.slots()];
        let mut arena = Arena::from_slice(&mut buffer, &META);
        arena.params_mut()[P_CELLS] = 64.0;
        arena.params_mut()[P_R] = 0.4;
        setup_sine(&mut arena);
        assert_eq!(init(&mut arena), Status::Ok);
        for _ in 0..20 {
            assert_eq!(step(&mut arena), Status::Ok);
        }
        let cells = 64;
        let h = grid::dx(cells);
        let r = 0.4;
        let factor = (1.0 - 4.0 * r * (PI * h / 2.0).sin().powi(2)).powi(20);
        for index in 0..cells {
            let exact = factor * (PI * index as f64 * h).sin();
            assert!((arena.out()[index] - exact).abs() < 1e-12, "cell {index}");
        }
    }

    #[test]
    fn past_one_half_the_field_grows() {
        let mut buffer = vec![0.0; META.slots()];
        let mut arena = Arena::from_slice(&mut buffer, &META);
        arena.params_mut()[P_CELLS] = 64.0;
        arena.params_mut()[P_R] = 0.6;
        setup_alternating(&mut arena);
        init(&mut arena);
        let before = grid::max_abs(arena.state());
        for _ in 0..20 {
            step(&mut arena);
        }
        assert!(grid::max_abs(arena.state()) > before);
    }

    #[test]
    fn rejects_a_grid_that_does_not_fit() {
        let mut buffer = vec![0.0; META.slots()];
        let mut arena = Arena::from_slice(&mut buffer, &META);
        arena.params_mut()[P_CELLS] = 512.0;
        assert_eq!(init(&mut arena), Status::BadParameter);
    }
}
