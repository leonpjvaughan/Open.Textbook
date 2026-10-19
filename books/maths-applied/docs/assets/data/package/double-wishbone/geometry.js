// The package's geometry, as the figures use it.
//
// Generated from `geometry.yaml` beside this file — which is the package's own
// `examples/double-wishbone/geometry.yaml`, vendored unchanged — so a figure can pass
// it to the kernel without a YAML parser in the browser. `tests/test_maths_applied_data.py`
// fails if the two ever disagree.

export const geometry = {
  points: {
    lcaf: [0.3, 0.12, 0.15],
    lcar: [0.3, -0.12, 0.16],
    lbj: [0.72, 0.01, 0.15],
    ucaf: [0.38, 0.1, 0.48],
    ucar: [0.38, -0.1, 0.47],
    ubj: [0.68, 0.0, 0.52],
    wc: [0.76, 0.0, 0.32],
    wco: [0.86, 0.0, 0.32],
    tri: [0.33, 0.14, 0.3],
    tro: [0.7, 0.12, 0.31],
  },
  // A unit vector along each arm's pivot axis, as the package computes it.
  axes: {
    "lca-axis": [0.0, -0.999133073, 0.041630545],
    "uca-axis": [0.0, -0.998752339, -0.049937617],
  },
  // One number slot: the tie-rod length. `null` means "use the design separation",
  // which is what the package's own exporter passes.
  numbers: [null],
};
