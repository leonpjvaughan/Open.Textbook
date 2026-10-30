---
title: Optimisation
---

# Optimisation

**You have one of these when** you can score any candidate answer with a single number,
and you want the best one.

## What you are modelling

Nothing moves and nothing is at every point. You have a set of choices, and a
rule that turns a choice into a cost, a profit, an error or a score. The model
says which choices are allowed and how good each one is.

## The model you write down

$$
\min_{x} f(x) \quad \text{subject to} \quad g(x) \le 0, \quad h(x) = 0 .
$$

The function $f$ is what you want to be small. The constraints say which $x$ you
are allowed to try. If there are no constraints, the model is one function and
one region.

## What it becomes on a computer

**Worked number.** For $f(x)=(x-3)^2$, setting $f'(x)=2(x-3)$ to zero gives
$x=3$, and one Newton step from $x=0$ lands there.

A function that can be evaluated, and often differentiated. Each step asks
"which way is downhill, and how far?" — so the cost of a solve is the number of
evaluations multiplied by the cost of one evaluation. That second factor is why
a model that takes a day to run changes the whole method.

The shape of $f$ is what decides the difficulty:

- **Convex.** One bottom. Find it and you have the answer. This is not a detail;
  it is the difference between a problem with an answer and a problem with a
  good try.
- **Not convex.** Many bottoms. Every method finds one, and which one depends on
  where you started.

The step size is the whole difficulty of the simplest case. The figure runs
gradient descent on a quadratic, where the condition is $0 < \text{step} < 2/a$;
above it the iterates grow while the objective is still defined.

:::figure gradient-lab

## The signature

There is no propagation and no memory. The answer is a single point, and the
difficulty is entirely in the shape of the landscape and in the constraints.

## Flags that matter here

- **Constraints.** A constraint turns the problem into one with a price
  attached, and the price is a second unknown. That is the
  [saddle point](../saddle-point/index.md) page, because the KKT system has the
  same block structure.
- **Expensive evaluations.** A day per run, or a physical test per run, rules
  out finite differences and pushes you to a surrogate model.
- **Noise.** If the same $x$ gives a different $f$ each time, a method that
  trusts small differences will chase noise.

## Techniques

Every method named here is in [Methods, A to Z](../techniques/#finding-a-state),
with its price and what it will not do.

| technique | what it does | when it wins | when it is the wrong tool |
|---|---|---|---|
| Gradient descent | Steps downhill along $-\nabla f$ | Very many unknowns, cheap gradient | Narrow valleys; it zig-zags |
| Newton | Uses the curvature as well as the slope | Few unknowns, second derivatives available | Each step costs a linear solve; needs a good start |
| Quasi-Newton (BFGS) | Builds curvature from gradients it has seen | Second derivatives unavailable | Very large problems where the stored matrix is too big |
| Gauss–Newton, Levenberg–Marquardt | Least squares, with damping | Fitting a model to data | Not a least-squares residual |
| Nelder–Mead | Compares a simplex of points, no derivatives | Noisy or non-smooth $f$, few unknowns | More than about ten unknowns; it stalls |
| Simplex method | Walks the corners of a linear problem | Linear objective, linear constraints | Anything non-linear |
| Interior point | Approaches the boundary from inside | Large linear and convex problems | Non-convex problems with many local minima |
| Sequential quadratic programming | Solves a quadratic model at each step | Smooth non-linear constraints | Constraints that are noisy or discontinuous |
| Stochastic gradient, Adam | Samples the objective | Machine learning, huge data sets | You need a precise optimum |
| Multistart | Runs a local method from many starts | Many local minima, cheap runs | Expensive runs; better to use a surrogate |
| Bayesian optimisation | Fits a surrogate and chooses where to look | Very expensive evaluations | Cheap evaluations; a grid would do |

## Systems that live here

- Choosing a bush stiffness so the corner's camber meets a tolerance.
- Fitting a tyre model to rig data — a least-squares problem, and therefore
  Gauss–Newton with damping.
- Optimal control: the damper curve that keeps the tyre loaded.
- Topology optimisation: where to leave material in a bracket.
- Bundle adjustment: where the cameras were, from where the points appear.
- Linear programming: scheduling, blending, transport.

## What goes wrong

| symptom | cause | fix |
|---|---|---|
| It converged, but to a worse answer than a colleague's | A different local minimum | Multistart, or make the model convex |
| The answer sits on a constraint boundary | The constraint was handled as a penalty | Use the KKT system, or an interior point method |
| It zig-zags and crawls | Variables on wildly different scales | Scale them; use a quasi-Newton method |
| It stops on a flat region, far from the bottom | Gradient tolerance met too early | Tighten it, restart, or check the curvature |
| Every evaluation costs a day | The model is the computer run | Surrogate model, then optimise the surrogate |

## Used in this collection

:::used

## Read next

- [A step has a direction and a length](descent/index.md) — the working under
  this class: the step length, and the window it has to be in.
- [Saddle point](../saddle-point/index.md) — the same problem with constraints,
  and where the price comes from.
- [Root finding](../root/index.md) — setting the gradient to zero is a root
  problem.
- [When it goes wrong](../symptoms/index.md) — the symptom table for every
  class.

Back to the map: [the nine kinds](../index.md) puts this class among the
other eight.
