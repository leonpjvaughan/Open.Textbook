---
title: Methods, A to Z
---

# Methods, A to Z

The inverse lookup. You have heard of a method and want to know where it applies,
or you are choosing between two and want to know what each costs.

Read the **class** column first. A method outside its class is not a slower
answer; it is a wrong one, or a run that does not finish. The last column is the
price: what the method needs from you, and what it will not do.

<a id="finding-a-state"></a>

## Finding a state

| method | class | what it needs, and what it costs |
|---|---|---|
| Bisection | [Root](../root/) | A bracket. Certain, and slow: about three steps per digit |
| Secant, false position | [Root](../root/) | Two points. No derivative; can leave the bracket |
| Newton | [Root](../root/), [Optimisation](../optimisation/) | The Jacobian, and a start close enough. Fast, local, fragile |
| Quasi-Newton (Broyden) | [Root](../root/), [Optimisation](../optimisation/) | Gradients, not second derivatives. The stored matrix grows with the problem |
| Brent | [Root](../root/) | A bracket, no derivative. The default for one equation |
| Fixed-point iteration | [Root](../root/) | A map whose error shrinks. Converges when it contracts, and most interesting cases do not |
| Continuation, homotopy | [Root](../root/), [Saddle point](../saddle-point/) | A solved case to walk from. The tool for several solutions and toggle points |
| Trust region | [Root](../root/), [Optimisation](../optimisation/) | A radius inside which the model is trusted. Survives a poor linear model; each step is a subproblem |
| Levenberg–Marquardt | [Root](../root/), [Optimisation](../optimisation/) | A least-squares residual. Damps the step, so it survives a bad start |
| Gradient descent | [Optimisation](../optimisation/) | A gradient. Cheap steps, slow arrival, and it zig-zags in a narrow valley |
| Quasi-Newton (BFGS) | [Optimisation](../optimisation/) | Gradients. Better than descent, and needs memory for the matrix |
| Gauss–Newton | [Optimisation](../optimisation/) | A least-squares residual and its Jacobian. The fitting workhorse |
| Nelder–Mead | [Optimisation](../optimisation/) | Nothing but values. Fine in a few variables, unreliable beyond |
| Simplex method | [Optimisation](../optimisation/) (linear) | A linear problem in standard form. Corners, exactly |
| Interior point | [Optimisation](../optimisation/) | A convex problem. Scales to large systems; needs a linear solve |
| Sequential quadratic programming (SQP) | [Optimisation](../optimisation/) | Smooth constraints. Expensive steps; the general answer |
| Stochastic gradient, Adam | [Optimisation](../optimisation/) (noisy) | A sampled gradient. Fast on huge data, imprecise at the answer |
| Multistart, basin hopping | [Optimisation](../optimisation/) (not convex) | Many cheap runs. No guarantee; a way of finding a better local minimum |
| Bayesian optimisation | [Optimisation](../optimisation/) (expensive) | A surrogate and a prior. Best when one run costs a day |

<a id="linear-systems"></a>

## Linear systems

| method | class | what it needs, and what it costs |
|---|---|---|
| Dense LU, with pivoting | [Linear system](../linear-system/) | A few thousand unknowns. Cubic work, and it answers every right-hand side |
| Cholesky | [Linear system](../linear-system/) (symmetric positive definite) | Half the work of LU, and it refuses anything indefinite |
| QR, SVD | [Linear system](../linear-system/) (rectangular), [Eigenvalues](../eigenvalue/) | Least squares, rank, and a diagnostic of conditioning. Expensive, and honest |
| Normal equations | [Linear system](../linear-system/) (least squares) | Simple, and it squares the condition number. Avoid unless the matrix is well conditioned |
| Sparse direct (Cholesky, LU, multifrontal) | [Linear system](../linear-system/), [Elliptic](../elliptic/), [Saddle point](../saddle-point/) | A factorisation and an ordering. Excellent in two dimensions; fill-in limits three |
| Conjugate gradients | [Linear system](../linear-system/) (symmetric positive definite) | A symmetric positive definite matrix. Needs a preconditioner to be quick |
| GMRES, BiCGSTAB | [Linear system](../linear-system/), [Saddle point](../saddle-point/) | The matrix, and a preconditioner. Memory grows with the iteration count |
| MINRES | [Linear system](../linear-system/) (indefinite), [Saddle point](../saddle-point/) | Symmetry and indefiniteness. The right Krylov method for a block system |
| Iterative refinement | [Linear system](../linear-system/) (ill-conditioned) | A factorisation and a residual. Recovers digits a single solve loses |
| Multigrid, algebraic multigrid (AMG) | [Linear system](../linear-system/), [Elliptic](../elliptic/) | A hierarchy of meshes, or a matrix graph. Close to linear in the size |
| Preconditioners (ILU, Jacobi, AMG) | [Linear system](../linear-system/), [Elliptic](../elliptic/), [Saddle point](../saddle-point/) | The matrix. The difference between converging and not |
| Jacobi, Gauss–Seidel, SOR | [Linear system](../linear-system/), [Elliptic](../elliptic/) | A mesh. A smoother inside multigrid, and slow on its own |
| Domain decomposition | [Elliptic](../elliptic/) | A partition of the region. Scales on many cores; needs an interface solve |
| Fast Fourier transform (FFT) | [Elliptic](../elliptic/) (constant coefficients) | A regular, periodic grid. Exact and fast, and refuses everything else |
| Boundary element | [Elliptic](../elliptic/) | The boundary alone. Linear, homogeneous, unbounded regions; a varying coefficient inside defeats it |
| Schur complement | [Saddle point](../saddle-point/) | A good solver for the state block. The Schur complement is dense |
| Uzawa | [Saddle point](../saddle-point/) | Iteration on the multiplier alone. Quick to write, slow without help |
| Null-space method | [Saddle point](../saddle-point/) | A parameterisation of the allowed directions. Exact constraints, small systems |
| Constraint elimination | [Saddle point](../saddle-point/) | A simple, local constraint. Removes unknowns; dense, coupled constraints defeat it |
| Augmented Lagrangian | [Saddle point](../saddle-point/) | A penalty and a multiplier together. Better conditioning; the penalty term hides the constraint error |
<a id="eigenvalues"></a>

## Eigenvalues

| method | class | what it needs, and what it costs |
|---|---|---|
| QR algorithm | [Eigenvalues](../eigenvalue/) (dense) | The whole matrix. All eigenvalues, and cubic cost |
| QZ | [Eigenvalues](../eigenvalue/) (generalised) | Two dense matrices. Handles a singular mass matrix |
| Power iteration | [Eigenvalues](../eigenvalue/) (extreme) | One matrix-vector product. The largest eigenvalue, slowly |
| Inverse iteration, shift-invert | [Eigenvalues](../eigenvalue/) (interior) | A linear solve with a shifted matrix. The practical route to interior eigenvalues |
| Lanczos, Arnoldi | [Eigenvalues](../eigenvalue/) (sparse) | A Krylov subspace. A few extreme eigenvalues of a large matrix |
| Subspace iteration | [Eigenvalues](../eigenvalue/) (sparse) | A block of vectors. Several dominant eigenvalues at once; interior ones are out of reach |
| Jacobi–Davidson | [Eigenvalues](../eigenvalue/) (interior, non-linear) | A preconditioner and a target. Complex to set up, and worth it |
| Contour integral (FEAST) | [Eigenvalues](../eigenvalue/) (interior) | A contour and a linear solve. Every eigenvalue in a window; needs a good shifted solver |

<a id="moving-problems"></a>

## Moving problems

| method | class | what it needs, and what it costs |
|---|---|---|
| Forward Euler, explicit Runge–Kutta | [Parabolic](../parabolic/), [Hyperbolic](../hyperbolic/) | A step inside the stability limit. Cheap per step |
| Backward Euler | [Parabolic](../parabolic/) (stiff) | A linear solve per step. Unconditionally stable, first order |
| Crank–Nicolson | [Parabolic](../parabolic/) | A linear solve per step. Second order, and it rings at a sharp start |
| BDF, Radau, implicit Runge–Kutta | [Parabolic](../parabolic/) (stiff) | A linear solve and an error estimate. The stiff default |
| Adaptive step control | [Parabolic](../parabolic/), [Hyperbolic](../hyperbolic/) | An error estimator. Turns a fixed step into a trustworthy one |
| ADI | [Parabolic](../parabolic/) (grid) | A rectangular grid. Splits the solve by direction |
| Spectral methods | [Parabolic](../parabolic/) | A smooth solution in a simple region. Very accurate; a shock or a complex boundary defeats it |
| Exponential integrators | [Parabolic](../parabolic/) | A dominant linear term and a small non-linear one. Exact in the linear part, and no help when it is not |
| Method of characteristics | [Hyperbolic](../hyperbolic/) | Known paths. Exact where they exist |
| Upwind | [Hyperbolic](../hyperbolic/) | The direction of travel. Stable, and it diffuses the answer |
| Lax–Wendroff | [Hyperbolic](../hyperbolic/) | Second order in space and time. Smooth waves; it wiggles at a shock |
| Godunov, finite volume | [Hyperbolic](../hyperbolic/) (conservation) | A flux function. Correct shocks, more work per face |
| Riemann solvers (Roe, HLLC, exact) | [Hyperbolic](../hyperbolic/) (conservation) | A flux between two states. Correct wave speeds; check the entropy fix |
| WENO, limiters | [Hyperbolic](../hyperbolic/) | A stencil and a smoothness measure. High order without wiggles |
| Discontinuous Galerkin | [Hyperbolic](../hyperbolic/), [Elliptic](../elliptic/) | A mesh with local polynomials. High order and complex geometry, more unknowns |
| Spectral element | [Hyperbolic](../hyperbolic/) | Large elements with a high order inside each. Smooth waves over long times; not shocks |
| Symplectic integration | [Hyperbolic](../hyperbolic/) (Hamiltonian) | A structure to preserve. Long-time boundedness that others lose |
| Projection (Chorin) | [Saddle point](../saddle-point/) (moving) | A pressure solve per step. The standard route for incompressible flow |
| SIMPLE | [Saddle point](../saddle-point/) (steady) | A pressure correction. The workhorse of steady flow solvers |

<a id="averaging"></a>

## Averaging

| method | class | what it needs, and what it costs |
|---|---|---|
| Monte Carlo | [Averaging](../averaging/) | A model you can run. Error falls as one over the root of the runs |
| Importance sampling | [Averaging](../averaging/) (rare) | A good proposal distribution. Enormous gains, or enormous variance |
| Stratified and Latin hypercube sampling | [Averaging](../averaging/) | A smooth response in a modest dimension. Spreads the draws; a discontinuous response defeats it |
| Quasi-Monte Carlo | [Averaging](../averaging/) (smooth) | A low-discrepancy sequence. Faster convergence, no honest error bar |
| Control variates, antithetic pairs | [Averaging](../averaging/) | A correlated cheap model. Free accuracy when the correlation is strong |
| Markov chain Monte Carlo | [Averaging](../averaging/) (Bayesian) | A target known up to a constant. Correlated samples and a burn-in |
| Particle filter, sequential Monte Carlo | [Averaging](../averaging/) (sequential) | A state model and a likelihood. Degenerates in high dimension |
| Kalman filter, ensemble Kalman | [Averaging](../averaging/) (linear, Gaussian) | A linear model and Gaussian noise. Optimal, and only there |
| Bootstrap | [Averaging](../averaging/) (data) | A sample. Error bars without a formula, and none for dependence |
| Gaussian quadrature | [Averaging](../averaging/) (deterministic) | A smooth integrand. Exact to a degree, and hopeless above about ten dimensions |

## Two methods that are not one class

- **Newton** appears under root finding and under optimisation, because setting a
  gradient to zero is a root problem. Same method, and the Jacobian of the first is
  the Hessian of the second.
- **Multigrid** appears only under elliptic problems. It is the clearest case of a
  method that is tied to a class: on a hyperbolic problem the coarse mesh carries
  the wrong physics, and it does not work.
