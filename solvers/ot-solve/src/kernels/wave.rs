//! The explicit wave scheme: `uₜₜ = c² uₓₓ`, leapfrogged in time.
//!
//! The dimensionless number is the Courant number `c = Δt/Δx`. The scheme is stable
//! for `c ≤ 1`; above it the highest mode grows. A pulse splits into two halves that
//! travel in opposite directions, which is the picture the page draws.

use crate::abi::*;
use crate::grid;

const CAP: usize = 256;

const P_CELLS: usize = 0;
const P_COURANT: usize = 1;

const S_PREV: usize = 0;
const S_U: usize = CAP;
const S_NEXT: usize = 2 * CAP;

const D_STEP: usize = 0;
const D_NORM: usize = 1;
const D_ENERGY: usize = 2;

pub const META: Meta = Meta {
    id: "wave-explicit",
    title: "Explicit wave propagation on a one-dimensional grid",
    summary: "Leapfrog for u_tt = c^2 u_xx. c is the Courant number; the scheme is stable up to 1.",
    params: &[
        Param::count("cells", "Cells", 96.0, 8.0, CAP as f64),
        Param::new("courant", "Courant number c", 0.7, 0.1, 1.2, 0.01, ""),
    ],
    outputs: &[
        Output::new("u", "Displacement", Block::Out, 0, CAP, ""),
        Output::new("step", "Step", Block::Diag, D_STEP, 1, ""),
        Output::new("norm", "Largest |u|", Block::Diag, D_NORM, 1, ""),
        Output::new("energy", "Energy", Block::Diag, D_ENERGY, 1, ""),
    ],
    capacity: &[("cells", CAP)],
    sizes: [2, 3 * CAP, CAP, 4],
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
    if !(8..=CAP).contains(&cells) {
        return None;
    }
    Some(cells)
}

/// The leapfrog energy at the half step. The cross term is what makes it exactly
/// conserved by the scheme; a naive `(Δu)²` does not have that property.
fn energy(u_new: &[f64], u_old: &[f64], cells: usize, courant: f64) -> f64 {
    let mut total = 0.0;
    let c2 = courant * courant;
    for index in 0..cells - 1 {
        let velocity = u_new[index] - u_old[index];
        let strain = c2 * (u_new[index + 1] - u_new[index]) * (u_old[index + 1] - u_old[index]);
        total += 0.5 * (velocity * velocity + strain);
    }
    total
}

pub fn init(a: &mut Arena<'_>) -> Status {
    let Some(cells) = cells(a) else {
        return Status::BadParameter;
    };
    let courant = a.params()[P_COURANT];
    if !courant.is_finite() || courant <= 0.0 {
        return Status::BadParameter;
    }
    let state = a.state_mut();
    // The caller's initial displacement is always `state[0..cells]`. Move it into
    // the three time levels, so every kernel has the same convention at the ABI.
    let mut initial = [0.0f64; CAP];
    initial[..cells].copy_from_slice(&state[..cells]);
    state[S_PREV..S_PREV + cells].copy_from_slice(&initial[..cells]);
    state[S_U..S_U + cells].copy_from_slice(&initial[..cells]);
    state[S_NEXT..S_NEXT + cells].copy_from_slice(&initial[..cells]);
    state[S_U] = 0.0;
    state[S_U + cells - 1] = 0.0;
    let (norm, total) = {
        let u = &state[S_U..S_U + cells];
        let prev = &state[S_PREV..S_PREV + cells];
        (grid::max_abs(u), energy(u, prev, cells, courant))
    };
    let _ = state;
    let mut field = [0.0f64; CAP];
    {
        let state = a.state();
        field[..cells].copy_from_slice(&state[S_U..S_U + cells]);
    }
    a.out_mut()[..cells].copy_from_slice(&field[..cells]);
    let diag = a.diag_mut();
    diag[D_STEP] = 0.0;
    diag[D_NORM] = norm;
    diag[D_ENERGY] = total;
    Status::Ok
}

pub fn step(a: &mut Arena<'_>) -> Status {
    let Some(cells) = cells(a) else {
        return Status::BadParameter;
    };
    let courant = a.params()[P_COURANT];
    if !courant.is_finite() || courant <= 0.0 {
        return Status::BadParameter;
    }
    let c2 = courant * courant;
    let mut field = [0.0f64; CAP];
    let (norm, total) = {
        let state = a.state_mut();
        let (prev_block, rest) = state.split_at_mut(CAP);
        let (u, rest) = rest.split_at_mut(CAP);
        let next = &mut rest[..CAP];
        for index in 1..cells - 1 {
            next[index] = 2.0 * u[index] - prev_block[index]
                + c2 * (u[index - 1] - 2.0 * u[index] + u[index + 1]);
        }
        next[0] = 0.0;
        next[cells - 1] = 0.0;
        // Rotate the three time levels: prev <- u, u <- next.
        prev_block[..cells].copy_from_slice(&u[..cells]);
        u[..cells].copy_from_slice(&next[..cells]);
        field[..cells].copy_from_slice(&next[..cells]);
        let norm = grid::max_abs(&next[..cells]);
        let total = energy(&u[..cells], &prev_block[..cells], cells, courant);
        (norm, total)
    };
    a.out_mut()[..cells].copy_from_slice(&field[..cells]);
    let diag = a.diag_mut();
    diag[D_STEP] += 1.0;
    diag[D_NORM] = norm;
    diag[D_ENERGY] = total;
    if !norm.is_finite() || norm > 1.0e6 {
        Status::Unstable
    } else {
        Status::Ok
    }
}

fn setup_pulse(a: &mut Arena<'_>) {
    let cells = a.params()[P_CELLS] as usize;
    let state = a.state_mut();
    grid::gaussian(&mut state[..cells], cells, 0.5, 0.08);
}

pub const CASES: &[Case] = &[
    Case {
        name: "a pulse at c = 0.8",
        params: &[("cells", 96.0), ("courant", 0.8)],
        setup: setup_pulse,
        steps: 40,
    },
    Case {
        name: "past the Courant limit, c = 1.1",
        params: &[("cells", 96.0), ("courant", 1.1)],
        setup: setup_pulse,
        steps: 60,
    },
];

#[cfg(test)]
mod tests {
    use super::*;

    fn arena<'a>(buffer: &'a mut [f64], cells: f64, courant: f64) -> Arena<'a> {
        let mut arena = Arena::from_slice(buffer, &META);
        arena.params_mut()[P_CELLS] = cells;
        arena.params_mut()[P_COURANT] = courant;
        arena
    }

    #[test]
    fn energy_is_conserved_below_the_limit() {
        let mut buffer = vec![0.0; META.slots()];
        let mut arena = arena(&mut buffer, 96.0, 0.5);
        setup_pulse(&mut arena);
        init(&mut arena);
        let before = arena.diag()[D_ENERGY];
        for _ in 0..200 {
            assert_eq!(step(&mut arena), Status::Ok);
        }
        let after = arena.diag()[D_ENERGY];
        assert!(
            (after - before).abs() / before < 1e-10,
            "{before} -> {after}"
        );
    }

    #[test]
    fn past_the_limit_the_field_grows() {
        let mut buffer = vec![0.0; META.slots()];
        let mut arena = arena(&mut buffer, 96.0, 1.1);
        setup_pulse(&mut arena);
        init(&mut arena);
        let before = grid::max_abs(arena.state());
        let mut status = Status::Ok;
        for _ in 0..80 {
            status = step(&mut arena);
        }
        assert_eq!(status, Status::Unstable);
        assert!(grid::max_abs(arena.state()) > before);
    }
}
