# Accepted follow-ups

Work that has been agreed and deliberately not done yet. Each entry says what it is, why it is
deferred, and what would make it done — so picking one up does not require reconstructing the
argument.

## Dynamics v2.4: four corners, and a load that arrives through the tyre

v2.0 (accelerations and reactions), v2.1 (time stepping, the energy test, the CLI path) and v2.2
(`examples/quarter-car`: a heaving chassis, a coil-over, the tyre on a road plane) are implemented
and tested. Measured for the next step: a four-corner model compiles — 13 moving bodies, 91
unknowns, 167 s to derive, 11 ms per Jacobian — so it is usable for a figure and not for real time.

Remaining, per [`dynamics.md`](dynamics.md) §7: the chassis as a full body with its own compliance,
and a load that arrives through the contact patch rather than at the wheel centre. The quarter car's
`coil` is a spring with no damper, which is what the book's §1.6 quotes.

## The UI

Not built, and possibly never. The condition for starting is that configuring a corner by hand
becomes slower than the vertical slice (load a model, drag a point, front view, check badge).
Nothing in the package depends on it. Any front end must compute nothing itself: every number
comes from `check` or `solve`.

## Polish, accepted

| item | why it matters |
|---|---|
| A sanity check on the toe curve | the steering arm was lengthened until bump steer was believable (±0.6°); it wants an engineer's eye, not a test |
