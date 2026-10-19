---
title: Root finding
---

# Root finding

**You have one of these when** the unknowns are a finite list, the rule is an
equation that has to hold at a point, and nothing changes with time.

## What you are modelling

A state that has to satisfy a condition. The condition can come from geometry — two
circles have to meet — from balance — the forces have to add to zero — or from
closure — a loop of links has to come back to where it started.

The answer is the state where the condition holds. There may be more than one.

## The model you write down

$$
F(x) = 0 .
$$

One equation for one unknown, or $n$ equations for $n$ unknowns. The function $F$
is usually a residual: it measures how far the current guess is from satisfying the
rule, and zero means satisfied.

## What it becomes on a computer

A loop. Each step replaces $F$ by its tangent and solves the linear problem

$$
J(x_k)\,\delta = -F(x_k), \qquad x_{k+1} = x_k + \delta ,
$$

where $J$ is the Jacobian. This is Newton's method, and everything else in the box
is a way of doing it more safely or more cheaply.

Two things decide whether you get an answer: **the start**, and **the number of
solutions**. Newton is fast near a solution and unreliable away from one. A
bracketing method is the reverse.

## The signature

The rule holds at a point, and the point is found by iteration. There is no region
and no time. The difficulty is:
- which of the solutions you land in;
- whether the Jacobian is invertible where you need it;
- whether your start is inside the region where the method converges.

A mechanism at a toggle point has a singular Jacobian, and that is a fact about the
mechanism, not a failure of the method.

## Flags that matter here

- **Several solutions.** Two circles meet twice, and a linkage has two assemblies.
  The start decides the branch, which is why a continuation from a known state is
  often the right tool.
- **Singular Jacobian.** At a toggle or a bifurcation the step cannot be solved.
  Arc-length continuation walks around it.
- **Constraints.** If the rule has to hold *and* a second rule prices it, the
  problem is a [saddle point](../saddle-point/index.md), not a root.

## Techniques

Every method named here is in [Methods, A to Z](../techniques/#finding-a-state), with its price and what it will not do.

| technique | what it does | when it wins | when it is the wrong tool |
|---|---|---|---|
| Bisection | Halves a bracket that contains a sign change | You have a bracket and need certainty | Needs 40 steps for ten digits; one equation only |
| Secant, false position | Interpolates between two points | The derivative is unavailable | The bracket is poor |
| Newton | Uses the Jacobian | Few unknowns, Jacobian available | A bad start; a singular Jacobian |
| Quasi-Newton (Broyden) | Updates an approximate Jacobian | The Jacobian is expensive | Many unknowns with strong coupling |
| Brent | Combines a bracket with fast interpolation | One equation, no derivative, need reliability | Systems of equations |
| Fixed-point iteration | Repeats a map that shrinks the error | The map is a contraction | The map expands; most interesting cases |
| Continuation, homotopy | Solves a sequence from a known case | Several solutions, toggle points | The path has a fold and you step in $x$ |
| Levenberg–Marquardt | Damped least squares | Overdetermined or near-singular systems | A square, well-conditioned system |
| Trust region | Limits the step to where the model is trusted | The linear model is poor far from the answer | Cheap, well-scaled problems |

## Systems that live here

- Where the wheel goes: two circles meet, and the meeting point is the pose.
- The position of a four-bar linkage at a given crank angle.
- The equilibrium of a bushed linkage, where the spring force and the geometry have
  to agree.
- A boundary-value problem solved by shooting: guess the slope, integrate, correct.
- Chemical equilibrium: the species have to balance.
- Power flow: the network has to satisfy Kirchhoff's laws.
- A CAD constraint solver: the sketch has to close.

## What goes wrong

| symptom | cause | fix |
|---|---|---|
| It converged to the wrong assembly | Two solutions, and the start chose one | Start from the branch you want; continue from a solved case |
| It oscillates and never settles | The step is too large, or the Jacobian is wrong | Damping, a line search, and check the Jacobian by finite differences |
| It fails exactly at a limit position | The Jacobian is singular at a toggle | Arc-length continuation, or re-parameterise the step |
| It reports no solution | The model is infeasible, not the solver | Check the residual at the start; the rule may be contradictory |
| Two unknowns moved in opposite directions | The system is ill-conditioned | Scale the variables; check for redundancy |

## Used in this collection

:::used

## Read next

- [Saddle point](../saddle-point/index.md) — the same loop with a constraint priced in.
- [Optimisation](../optimisation/index.md) — a minimum is a root of the gradient.
- [When it goes wrong](../symptoms/index.md) — the symptom table for every class.
