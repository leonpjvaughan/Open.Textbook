# Design record

These documents describe what the package is and why it is shaped the way it is. Where one
of them records a departure from an earlier design, it gives the reason in place.

| document | answers |
|---|---|
| [`config-layer.md`](config-layer.md) | what a model *is*: bodies, sites, components, modes, constraint kinds, joints, actuators, geometry, study, and the rules that make a bad model fail at load |
| [`problem-mapping.md`](problem-mapping.md) | what is *built* from a model: unknowns, rows, the Jacobian, how the chapters' problems are selected, and the three solvers |
| [`dynamics.md`](dynamics.md) | what a dynamics study would need, and precisely which parts of the above it reuses unchanged |
| [`entry-points.md`](entry-points.md) | what a user supplies, the CLI, the Python API, and how a bad file fails |
| [`wasm.md`](wasm.md) | the compiled kernel: what a generated kernel is mathematically, how sympy becomes Rust becomes WebAssembly, and how the book consumes it |
| [`naming.md`](naming.md) | the name, the module layout, the verbs, and the engine boundary every front end speaks |
| [`follow-ups.md`](follow-ups.md) | work that is agreed and deliberately not done yet, with what would make each item done |

Suggested reading order for someone picking the work up: `config-layer.md` §1–§3 (the split
and the component model), then `../examples/constraints.yaml` (the whole vocabulary, in one
page), then `problem-mapping.md` §8 (the row tables — that is the whole book in numbers),
then `entry-points.md` if you are going to run it.

The one-sentence summary, if you only read one: **three files and a library describe a
mechanism; a joint is a set of components, each locked, free or compliant; a constraint kind
is a named bundle of those; an actuator prescribes one free component; and the solver is
chosen from the rank of the symbolic Jacobian, never from a flag.**
