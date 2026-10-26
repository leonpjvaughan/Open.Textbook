//! Small helpers shared by the one-dimensional kernels.

/// The grid point of a cell, on `[0, 1]`.
pub fn x(index: usize, cells: usize) -> f64 {
    index as f64 / (cells - 1) as f64
}

/// The spacing between two grid points.
pub fn dx(cells: usize) -> f64 {
    1.0 / (cells - 1) as f64
}

/// The first sine mode, `sin(πx)`, sampled on the grid.
pub fn sine_mode(state: &mut [f64], cells: usize) {
    use core::f64::consts::PI;
    for (index, value) in state.iter_mut().take(cells).enumerate() {
        *value = (PI * index as f64 / (cells - 1) as f64).sin();
    }
}

/// A Gaussian pulse centred at `centre`, with standard deviation `width`.
pub fn gaussian(state: &mut [f64], cells: usize, centre: f64, width: f64) {
    for (index, value) in state.iter_mut().take(cells).enumerate() {
        let x = x(index, cells) - centre;
        *value = (-(x / width).powi(2)).exp();
    }
}

/// The largest absolute value in a slice.
pub fn max_abs(values: &[f64]) -> f64 {
    values
        .iter()
        .fold(0.0, |largest, value| largest.max(value.abs()))
}
