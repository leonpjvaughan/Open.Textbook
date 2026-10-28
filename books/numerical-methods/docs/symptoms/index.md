---
title: When it goes wrong
---

# When it goes wrong

A wrong answer has a shape, and the shape usually names the class. This page is
the
one to open when a solver is running and the number is not right.

Read the first column as the thing you observed, not as the thing you suspect.
Every
row here is also on the class page it names, in the same words, so a reader who
arrives from either direction meets one list rather than two.

## It does not finish

| symptom | likely class | cause | fix |
|---|---|---|---|
| The iteration count grows as the mesh is refined | [Elliptic](../elliptic/) | No preconditioner, or a smoother used alone | Multigrid, or AMG |
| It ran all night and moved nowhere | [Elliptic](../elliptic/) | The method moves information one cell per step | A method that sees the whole region at once |
| The solver stalls on the constraint block | [Saddle point](../saddle-point/) | No block preconditioner | A Schur-complement preconditioner |
| Iterations grow as the viscosity falls | [Saddle point](../saddle-point/) | The Schur complement is badly conditioned | Precondition the Schur complement as well as $A$ |
| The step size collapses to nothing | [Parabolic](../parabolic/) | Stiff, with an explicit method | An implicit method |
| It takes far more steps than expected | [Parabolic](../parabolic/) | The $\Delta x^{2}$ limit, with a fine mesh | Implicit method, or a coarser mesh with a check |
| It blows up at a step that worked before | [Hyperbolic](../hyperbolic/) | CFL crossed, usually by a finer mesh | Reduce the step, and compute it from the fastest wave |
| It oscillates and never settles | [Root finding](../root/) | The step is too large, or the Jacobian is wrong | Damping or a line search; check the Jacobian by differences |
| It fails exactly at a limit position | [Root finding](../root/) | The Jacobian is singular at a toggle | Arc-length continuation, or re-parameterise the step |
| The chain never settles | [Averaging](../averaging/) | The target has not been normalised, or the support is wrong | Fix the model before tuning the sampler |
| The iterative method needs thousands of steps | [Linear system](../linear-system/) | No preconditioner, or a poor one | Precondition; measure the count before and after |

## The answer is wrong, and looks plausible

| symptom | likely class | cause | fix |
|---|---|---|---|
| It converged, but to a worse answer than a colleague's | [Optimisation](../optimisation/) | A different local minimum | Multistart, or make the model convex |
| The answer sits on a constraint boundary | [Optimisation](../optimisation/) | The constraint was handled as a penalty | Use the KKT system, or an interior point method |
| It stops on a flat region, far from the bottom | [Optimisation](../optimisation/) | Gradient tolerance met too early | Tighten it, restart, or check the curvature |
| It zig-zags and crawls | [Optimisation](../optimisation/) | Variables on wildly different scales | Scale them; use a quasi-Newton method |
| Every evaluation costs a day | [Optimisation](../optimisation/) | The model is the computer run | Surrogate model, then optimise the surrogate |
| It converged to the wrong assembly | [Root finding](../root/) | Two solutions, and the start chose one | Start from the branch you want; continue from a solved case |
| It reports no solution | [Root finding](../root/) | The model is infeasible, not the solver | Check the residual at the start; the rule may be contradictory |
| Two unknowns moved in opposite directions | [Root finding](../root/) | The system is ill-conditioned | Scale the variables; check for redundancy |
| A complex eigenvalue arrives and the code assumed real | [Eigenvalues](../eigenvalue/) | The matrix is non-symmetric | Complex arithmetic, or work with the real block |
| The smallest eigenvalue comes out wrong | [Eigenvalues](../eigenvalue/) | Power iteration converges to the largest | Shift-invert about zero |
| A known mode is missing | [Eigenvalues](../eigenvalue/) | The start vector was orthogonal to it | Try several starts; use a block method |
| Spurious eigenvalues near a boundary | [Eigenvalues](../eigenvalue/) | The discretisation, not the physics | Refine, and check convergence of each eigenvalue |
| The solver reports an infinite eigenvalue | [Eigenvalues](../eigenvalue/) | A generalised problem with singular $B$ | That is a constraint; use QZ and read it as such |
| The pressure has a checkerboard pattern | [Saddle point](../saddle-point/) | The velocity and pressure spaces do not fit together | An LBB-stable pair, or stabilisation |
| The forces are wrong but the displacements are right | [Saddle point](../saddle-point/) | The multiplier was recovered badly | Solve for the multiplier directly, not by differencing |
| Two constraints say the same thing | [Saddle point](../saddle-point/) | The constraint set is redundant | A singular value decomposition of $B$, and drop a row |
| The answer looks right but the flux is wrong | [Elliptic](../elliptic/) | The boundary condition is on the wrong quantity | Check whether the value or its derivative was given |
| The answer oscillates once the step is large | [Parabolic](../parabolic/) | The explicit stability limit was crossed | Go implicit, or reduce the step |
| The total quantity is not conserved | [Parabolic](../parabolic/) | A non-conservative discretisation | Write the flux form, and check the balance |
| The early time is wrong and the late time is fine | [Parabolic](../parabolic/) | The initial data does not match the boundary | Make them consistent before blaming the solver |
| The shock is smeared over many cells | [Hyperbolic](../hyperbolic/) | First-order upwind, or too much numerical diffusion | Higher order with a limiter |
| Wiggles appear near a shock | [Hyperbolic](../hyperbolic/) | A centred scheme, or an unlimited high-order one | Upwind, or a limiter |
| The answer behind the shock is wrong | [Hyperbolic](../hyperbolic/) | A non-conservative form, or the wrong Riemann solver | Write the flux form; check the wave speeds |
| A rarefaction has a jump in it | [Hyperbolic](../hyperbolic/) | The Riemann solver has no entropy fix | Add one |
| The boundary at the outlet reflects | [Hyperbolic](../hyperbolic/) | A value was applied where information leaves | A one-sided, non-reflecting condition |

## The answer moves, and it should not

| symptom | likely class | cause | fix |
|---|---|---|---|
| The constraint drifts over a long run | [Saddle point](../saddle-point/) | Projection applied once, then forgotten | Project at every step, or use a formulation that preserves it |
| Energy grows without a source | [Hyperbolic](../hyperbolic/) | A method that does not respect the structure | Symplectic or energy-preserving integration |
| The result depends on the mesh in a way the physics does not | [Parabolic](../parabolic/) | Numerical diffusion from the scheme | Higher order, or a different discretisation |
| Refining the time step changes the answer | [Parabolic](../parabolic/) | It is not converged in time | Halve the step and compare; use an error estimate |
| Refining the mesh changes the answer a lot | [Elliptic](../elliptic/) | A point load or a re-entrant corner | Graded mesh, or a formulation that expects it |

## The linear solve is the problem

| symptom | likely class | cause | fix |
|---|---|---|---|
| The residual is tiny and the answer is wrong | [Linear system](../linear-system/) | The matrix is ill-conditioned; a small residual says little | Check the condition number; scale the unknowns |
| The factorisation runs out of memory | [Linear system](../linear-system/) | Fill-in: a sparse matrix with a dense factor | A fill-reducing ordering, or an iterative method |
| Conjugate gradients stalls or returns nonsense | [Linear system](../linear-system/), [Elliptic](../elliptic/) | The matrix is not symmetric positive definite | Check symmetry; use GMRES or MINRES |
| The answer changes when the rows are reordered | [Linear system](../linear-system/) | Rounding, amplified by conditioning | Fix a pivot ordering, and report the conditioning |
| The solver reports no solution, or infinitely many | [Linear system](../linear-system/) | Redundant or contradictory rows | A rank-revealing factorisation, and fix the model |
| Two different solvers agree but the numbers differ | [Elliptic](../elliptic/) | The system is ill-conditioned | Scale the unknowns; check the residual, not the answer |

## The statistics are wrong

| symptom | likely class | cause | fix |
|---|---|---|---|
| A tiny error bar, and the answer is wrong | [Averaging](../averaging/) | Samples were not independent, or the model is biased | Check the autocorrelation and the model |
| A rare event never appears | [Averaging](../averaging/) | Plain sampling, and the event is rare | Importance sampling or subset simulation |
| Ten million samples and still noisy | [Averaging](../averaging/) | The variance of $g$ is large | A control variate, or a quasi-random sequence |
| A different run gives a different answer | [Averaging](../averaging/) | That is the method, not a bug | Report the error bar, and the seed |

## Before you change the method

Three checks cost an hour and save a week, in this order:

1. **Is the answer converged?** Halve the mesh, and halve the time step. If the
   answer moves, the solver is not the problem.
2.  **Is the model what you meant?** Evaluate the residual at the reported
   answer. A
solver that converged to a solution of the wrong equations is behaving
correctly.
3.  **Does a limit case agree?** Shrink the new term to zero and check you
   recover
   the simpler model you already trusted. If you cannot, the new term is not the
   one you think it is.

A converged answer to the wrong model is the most expensive kind of wrong,
because
nothing about the run looks unusual.
