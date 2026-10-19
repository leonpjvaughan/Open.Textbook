---
title: When it goes wrong
---

# When it goes wrong

A wrong answer has a shape, and the shape usually names the class. This page is the
one to open when a solver is running and the number is not right.

Read the first column as the thing you observed, not as the thing you suspect.

## It does not finish

| symptom | likely class | cause | fix |
|---|---|---|---|
| The iteration count grows every time the mesh is refined | Elliptic | No preconditioner, or a smoother used alone | Multigrid or algebraic multigrid |
| It ran all night and moved nowhere | Elliptic, Saddle point | The method moves information one cell per step | A method that sees the whole region at once |
| It stalls on the constraint block | Saddle point | No block preconditioner | A Schur-complement preconditioner |
| The step size collapses to nothing | Parabolic | Stiff, with an explicit method | An implicit method |
| It dies at the same time every run | Hyperbolic | The step crossed the CFL limit | Compute the step from the fastest wave |

## The answer is wrong, and looks plausible

| symptom | likely class | cause | fix |
|---|---|---|---|
| It converged to a worse answer than a colleague's | Optimisation | A different local minimum | Multistart, or make the model convex |
| It converged to the wrong assembly | Root | Two solutions; the start chose one | Start on the branch you want; continue from a solved case |
| The smallest eigenvalue is wrong | Eigenvalues | Power iteration finds the largest | Shift-invert about zero |
| The pressure has a checkerboard pattern | Saddle point | The velocity and pressure spaces do not fit | An LBB-stable pair, or stabilisation |
| The forces are wrong but the displacements are right | Saddle point | The multiplier was recovered badly | Solve for the multiplier directly |
| The answer oscillates at a large time step | Parabolic | The explicit stability limit was crossed | Implicit, or a smaller step |
| The shock is smeared over many cells | Hyperbolic | First-order upwind, or too much numerical diffusion | Higher order with a limiter |
| The early time is wrong and the late time is fine | Parabolic | The initial data does not match the boundary | Make them consistent first |
| The total is not conserved | Hyperbolic, Parabolic | A non-conservative discretisation | Write the flux form, and check the balance |

## The answer moves, and it should not

| symptom | likely class | cause | fix |
|---|---|---|---|
| The constraint drifts over a long run | Saddle point | Projection applied once, then forgotten | Project at every step |
| Energy grows without a source | Hyperbolic | A method that does not respect the structure | Symplectic or energy-preserving integration |
| The answer changes with the mesh, but the physics does not | Parabolic, Hyperbolic | Numerical diffusion, or an inconsistent scheme | Higher order; check convergence under refinement |
| A refined mesh changes the answer a lot | Elliptic | A point load or a re-entrant corner | A graded mesh, or a formulation that expects it |

## The linear solve is the problem

| symptom | likely class | cause | fix |
|---|---|---|---|
| The residual is tiny and the answer is wrong | Linear system | Ill-conditioning: a small residual says little | Check the condition number; scale the unknowns |
| The factorisation runs out of memory | Linear system | Fill-in: a sparse matrix with a dense factor | A fill-reducing ordering, or an iterative method |
| Conjugate gradients stalls | Linear system | The matrix is not symmetric positive definite | Check symmetry; use GMRES or MINRES |
| The answer changes when the rows are reordered | Linear system | Rounding, amplified by conditioning | Fix a pivot ordering, and report the conditioning |

## The statistics are wrong

| symptom | likely class | cause | fix |
|---|---|---|---|
| The error bar is tiny and the answer is wrong | Averaging | The samples were not independent, or the model is biased | Check the autocorrelation; check the model |
| A different seed gives a different answer | Averaging | That is the method | Report the error bar and the seed |
| A rare event never appears | Averaging | Plain sampling, and the event is rare | Importance sampling, or subset simulation |
| Ten million samples and still noisy | Averaging | The variance is too large | A control variate, or a quasi-random sequence |

## Before you change the method

Three checks cost an hour and save a week, in this order:

1. **Is the answer converged?** Halve the mesh, and halve the time step. If the
   answer moves, the solver is not the problem.
2. **Is the model what you meant?** Evaluate the residual at the reported answer. A
   solver that converged to a solution of the wrong equations is behaving correctly.
3. **Does a limit case agree?** Shrink the new term to zero and check you recover
   the simpler model you already trusted. If you cannot, the new term is not the
   one you think it is.

A converged answer to the wrong model is the most expensive kind of wrong, because
nothing about the run looks unusual.
