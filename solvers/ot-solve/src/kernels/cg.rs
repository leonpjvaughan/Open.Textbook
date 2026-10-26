//! Conjugate gradients on the one-dimensional Poisson problem.
//!
//! `-u'' = f` with `u(0) = u(1) = 0`, discretised with the three-point Laplacian,
//! is the standard elliptic exercise and the standard symmetric positive-definite
//! linear system. The figure draws both faces: the field settling onto the exact
//! curve, and the residual falling as the iteration count rises.

use crate::abi::*;
use crate::grid;

const CAP: usize = 256;
const HISTORY: usize = 128;
const TOLERANCE: f64 = 1.0e-9;

const P_CELLS: usize = 0;
const P_LOAD: usize = 1;

const S_U: usize = 0;
const S_R: usize = CAP;
const S_P: usize = 2 * CAP;
const S_AP: usize = 3 * CAP;

const O_U: usize = 0;
const O_HISTORY: usize = CAP;
const O_EXACT: usize = CAP + HISTORY;

const D_ITER: usize = 0;
const D_RESIDUAL: usize = 1;
const D_INITIAL: usize = 2;
const D_CONVERGED: usize = 3;

pub const META: Meta = Meta {
    id: "cg-poisson",
    title: "Conjugate gradients on a one-dimensional Poisson problem",
    summary:
        "Solves -u'' = f with a point load; the residual falls and the field meets the exact curve.",
    params: &[
        Param::count("cells", "Cells", 64.0, 8.0, CAP as f64),
        Param::new("load", "Load", 1.0, 0.0, 2.0, 0.05, ""),
    ],
    outputs: &[
        Output::new("u", "Solution", Block::Out, O_U, CAP, ""),
        Output::new("history", "Residual", Block::Out, O_HISTORY, HISTORY, ""),
        Output::new("exact", "Exact solution", Block::Out, O_EXACT, CAP, ""),
        Output::new("iterations", "Iterations", Block::Diag, D_ITER, 1, ""),
        Output::new("residual", "Residual", Block::Diag, D_RESIDUAL, 1, ""),
        Output::new("initial", "Initial residual", Block::Diag, D_INITIAL, 1, ""),
        Output::new("converged", "Converged", Block::Diag, D_CONVERGED, 1, ""),
    ],
    capacity: &[("cells", CAP)],
    sizes: [2, 4 * CAP, 2 * CAP + HISTORY, 4],
    exact: false,
};

pub const KERNEL: Kernel = Kernel {
    meta: META,
    init,
    step,
    cases: CASES,
};

fn cells(a: &Arena<'_>) -> Option<usize> {
    let cells = a.params()[P_CELLS] as usize;
    if !(8..=CAP).contains(&cells) {
        return None;
    }
    Some(cells)
}

fn dot(a: &[f64], b: &[f64]) -> f64 {
    a.iter().zip(b).map(|(x, y)| x * y).sum()
}

/// `A p` for the three-point Laplacian, with the boundary values held at zero.
fn laplacian(p: &[f64], out: &mut [f64], cells: usize) {
    for index in 1..cells - 1 {
        out[index] = 2.0 * p[index] - p[index - 1] - p[index + 1];
    }
    out[0] = 0.0;
    out[cells - 1] = 0.0;
}

pub fn init(a: &mut Arena<'_>) -> Status {
    let Some(cells) = cells(a) else {
        return Status::BadParameter;
    };
    let load = a.params()[P_LOAD];
    if !load.is_finite() || load < 0.0 {
        return Status::BadParameter;
    }
    let h = grid::dx(cells);
    let state = a.state_mut();
    for index in 0..cells {
        let value = if index == 0 || index == cells - 1 {
            0.0
        } else {
            // A constant load. A sine load is an eigenvector of the discrete
            // Laplacian, so CG would finish in one iteration and the figure would
            // have nothing to show; a constant needs every mode.
            load * h * h
        };
        state[S_U + index] = 0.0;
        state[S_R + index] = value;
        state[S_P + index] = value;
        state[S_AP + index] = 0.0;
    }
    let initial = dot(&state[S_R..S_R + cells], &state[S_R..S_R + cells]).sqrt();
    let diag = a.diag_mut();
    diag[D_ITER] = 0.0;
    diag[D_RESIDUAL] = initial;
    diag[D_INITIAL] = initial;
    diag[D_CONVERGED] = 0.0;

    let out = a.out_mut();
    out.fill(0.0);
    out[O_HISTORY] = initial;
    for index in 0..cells {
        let x = grid::x(index, cells);
        out[O_EXACT + index] = load * 0.5 * x * (1.0 - x);
    }
    Status::Ok
}

pub fn step(a: &mut Arena<'_>) -> Status {
    let Some(cells) = cells(a) else {
        return Status::BadParameter;
    };
    if a.diag()[D_CONVERGED] > 0.0 {
        return Status::Ok;
    }
    let iteration = a.diag()[D_ITER] as usize;
    let initial = a.diag()[D_INITIAL];
    let (residual, converged, field) = {
        let state = a.state_mut();
        let (u_block, rest) = state.split_at_mut(CAP);
        let (r_block, rest) = rest.split_at_mut(CAP);
        let (p_block, rest) = rest.split_at_mut(CAP);
        let ap_block = &mut rest[..CAP];
        laplacian(&p_block[..cells], &mut ap_block[..cells], cells);
        let p_ap = dot(&p_block[..cells], &ap_block[..cells]);
        if !p_ap.is_finite() || p_ap <= 0.0 {
            return Status::Unstable;
        }
        let rs_old = dot(&r_block[..cells], &r_block[..cells]);
        let alpha = rs_old / p_ap;
        for index in 0..cells {
            u_block[index] += alpha * p_block[index];
            r_block[index] -= alpha * ap_block[index];
        }
        let rs_new = dot(&r_block[..cells], &r_block[..cells]);
        let beta = rs_new / rs_old;
        for index in 0..cells {
            p_block[index] = r_block[index] + beta * p_block[index];
        }
        let mut field = [0.0f64; CAP];
        field[..cells].copy_from_slice(&u_block[..cells]);
        (rs_new.sqrt(), rs_new.sqrt() < TOLERANCE * initial, field)
    };
    let diag = a.diag_mut();
    diag[D_ITER] += 1.0;
    diag[D_RESIDUAL] = residual;
    diag[D_CONVERGED] = if converged { 1.0 } else { 0.0 };
    let out = a.out_mut();
    if iteration + 1 < HISTORY {
        out[O_HISTORY + iteration + 1] = residual;
    }
    out[O_U..O_U + cells].copy_from_slice(&field[..cells]);
    if !residual.is_finite() {
        return Status::Unstable;
    }
    Status::Ok
}

fn setup_nothing(_: &mut Arena<'_>) {}

pub const CASES: &[Case] = &[
    Case {
        name: "64 cells, 40 iterations",
        params: &[("cells", 64.0), ("load", 1.0)],
        setup: setup_nothing,
        steps: 40,
    },
    Case {
        name: "16 cells, 16 iterations",
        params: &[("cells", 16.0), ("load", 1.0)],
        setup: setup_nothing,
        steps: 16,
    },
];

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn meets_the_exact_solution() {
        let mut buffer = vec![0.0; META.slots()];
        let mut arena = Arena::from_slice(&mut buffer, &META);
        arena.params_mut()[P_CELLS] = 64.0;
        arena.params_mut()[P_LOAD] = 1.0;
        assert_eq!(init(&mut arena), Status::Ok);
        for _ in 0..80 {
            assert_eq!(step(&mut arena), Status::Ok);
        }
        let cells = 64;
        let mut worst = 0.0f64;
        for index in 0..cells {
            let error = (arena.out()[O_U + index] - arena.out()[O_EXACT + index]).abs();
            worst = worst.max(error);
        }
        assert!(worst < 5.0e-4, "worst error {worst}");
        assert_eq!(arena.diag()[D_CONVERGED], 1.0);
    }

    #[test]
    fn the_residual_falls() {
        let mut buffer = vec![0.0; META.slots()];
        let mut arena = Arena::from_slice(&mut buffer, &META);
        arena.params_mut()[P_CELLS] = 32.0;
        arena.params_mut()[P_LOAD] = 1.0;
        init(&mut arena);
        let initial = arena.diag()[D_RESIDUAL];
        for _ in 0..60 {
            step(&mut arena);
        }
        // The residual's 2-norm is not monotone for CG — the A-norm of the error is
        // the monotone quantity — so the check is that it has fallen a long way, not
        // that every step did.
        assert!(arena.diag()[D_RESIDUAL] < initial * 1.0e-3);
    }
}
