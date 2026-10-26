---
title: Methods, A to Z
---

# Methods, A to Z

The inverse lookup. You have heard of a method and want to know where it applies,
or you are choosing between two and want to know what each costs.

Read the **class** column first. A method outside its class is not a slower
answer; it is a wrong one, or a run that does not finish. The **step** column is
the arithmetic at the centre of the method: the update it repeats, or the
equation it solves. Where a method is a family, the step is the representative
member, and the class column says what the family covers. The last column is the
price: what the method needs from you, and what it will not do.

<div class="method-index" markdown="1">

<a id="finding-a-state"></a>

## Finding a state

| method | class | the step, in symbols | what it needs, and what it costs |
|---|---|---|---|
| Bisection | [Root](../root/) | $m=\frac{a+b}{2}$; keep the half where $f$ changes sign | A bracket. Certain, and slow: about three steps per digit |
| Secant, false position | [Root](../root/) | $x_{k+1}=x_k-f(x_k)\frac{x_k-x_{k-1}}{f(x_k)-f(x_{k-1})}$ | Two points. No derivative; can leave the bracket |
| Newton | [Root](../root/), [Optimisation](../optimisation/) | $x_{k+1}=x_k-J(x_k)^{-1}F(x_k)$ | The Jacobian, and a start close enough. Fast, local, fragile |
| Quasi-Newton (Broyden) | [Root](../root/), [Optimisation](../optimisation/) | $B_{k+1}s_k=y_k$; the least-change update of $B_k$, then $B_k\delta=-F(x_k)$ | Gradients, not second derivatives. The stored matrix grows with the problem |
| Brent | [Root](../root/) | $x_{k+1}=\operatorname{IQI}(a,b,c)$, guarded by a bracket and bisected when it stalls | A bracket, no derivative. The default for one equation |
| Fixed-point iteration | [Root](../root/) | $x_{k+1}=g(x_k)$, with $\lvert g'(x^*)\rvert<1$ at the answer | A map whose error shrinks. Converges when it contracts, and most interesting cases do not |
| Continuation, homotopy | [Root](../root/), [Saddle point](../saddle-point/) | $H(x,\lambda)=(1-\lambda)H_0(x)+\lambda F(x)=0$, as $\lambda:0\to1$ | A solved case to walk from. The tool for several solutions and toggle points |
| Trust region | [Root](../root/), [Optimisation](../optimisation/) | $\min_{\lVert p\rVert\le\Delta_k} f_k+\nabla f_k^{\mathsf T}p+\tfrac12 p^{\mathsf T}B_kp$ | A radius inside which the model is trusted. Survives a poor linear model; each step is a subproblem |
| Levenberg–Marquardt | [Root](../root/), [Optimisation](../optimisation/) | $(J^{\mathsf T}J+\lambda_kI)\delta=-J^{\mathsf T}r$; adjust $\lambda_k$ after the step | A least-squares residual. Damps the step, so it survives a bad start |
| Gradient descent | [Optimisation](../optimisation/) | $x_{k+1}=x_k-\alpha_k\nabla f(x_k)$ | A gradient. Cheap steps, slow arrival, and it zig-zags in a narrow valley |
| Quasi-Newton (BFGS) | [Optimisation](../optimisation/) | $H_{k+1}y_k=s_k$; the least-change rank-two update of $H_k$ | Gradients. Better than descent, and needs memory for the matrix |
| Gauss–Newton | [Optimisation](../optimisation/) | $\delta=-(J^{\mathsf T}J)^{-1}J^{\mathsf T}r$, then $x_{k+1}=x_k+\delta$ | A least-squares residual and its Jacobian. The fitting workhorse |
| Nelder–Mead | [Optimisation](../optimisation/) | $x_{\text{new}}=x_c+\alpha(x_c-x_{\text{worst}})$, with $\alpha\in\{-1,\tfrac12,2\}$ | Nothing but values. Fine in a few variables, unreliable beyond |
| Simplex method | [Optimisation](../optimisation/) (linear) | $\max c^{\mathsf T}x$ subject to $Ax\le b$, $x\ge0$; pivot between vertices | A linear problem in standard form. Corners, exactly |
| Interior point | [Optimisation](../optimisation/) | $\min f(x)-\mu\sum_i\log s_i$ subject to $g(x)+s=0$, as $\mu\downarrow0$ | A convex problem. Scales to large systems; needs a linear solve |
| Sequential quadratic programming (SQP) | [Optimisation](../optimisation/) | $\min_p\tfrac12p^{\mathsf T}H_kp+\nabla f_k^{\mathsf T}p$ subject to $\nabla g_k^{\mathsf T}p+g_k=0$ | Smooth constraints. Expensive steps; the general answer |
| Stochastic gradient, Adam | [Optimisation](../optimisation/) (noisy) | $\theta_{k+1}=\theta_k-\alpha\frac{\hat m_k}{\sqrt{\hat v_k}+\epsilon}$ | A sampled gradient. Fast on huge data, imprecise at the answer |
| Multistart, basin hopping | [Optimisation](../optimisation/) (not convex) | $x^*=\arg\min_j\min_x f(x)$ from starts $x_0^{(j)}$ | Many cheap runs. No guarantee; a way of finding a better local minimum |
| Bayesian optimisation | [Optimisation](../optimisation/) (expensive) | $\begin{aligned}x_{k+1}={}&\arg\max_x\mathbb E\big[\\&\max(0,f_{\min}-f(x))\big]\end{aligned}$ | A surrogate and a prior. Best when one run costs a day |

<a id="linear-systems"></a>

## Linear systems

| method | class | the step, in symbols | what it needs, and what it costs |
|---|---|---|---|
| Dense LU, with pivoting | [Linear system](../linear-system/) | $PA=LU$; solve $Ly=Pb$, then $Ux=y$ | A few thousand unknowns. Cubic work, and it answers every right-hand side |
| Cholesky | [Linear system](../linear-system/) (symmetric positive definite) | $A=LL^{\mathsf T}$ for $A=A^{\mathsf T}\succ0$ | Half the work of LU, and it refuses anything indefinite |
| QR, SVD | [Linear system](../linear-system/) (rectangular), [Eigenvalues](../eigenvalue/) | $A=QR$, $x=R^{-1}Q^{\mathsf T}b$; $A=U\Sigma V^{\mathsf T}$ | Least squares, rank, and a diagnostic of conditioning. Expensive, and honest |
| Normal equations | [Linear system](../linear-system/) (least squares) | $A^{\mathsf T}Ax=A^{\mathsf T}b$, with $\kappa(A^{\mathsf T}A)=\kappa(A)^2$ | Simple, and it squares the condition number. Avoid unless the matrix is well conditioned |
| Sparse direct (Cholesky, LU, multifrontal) | [Linear system](../linear-system/), [Elliptic](../elliptic/), [Saddle point](../saddle-point/) | $PAP^{\mathsf T}=LU$, with $P$ chosen to limit fill | A factorisation and an ordering. Excellent in two dimensions; fill-in limits three |
| Conjugate gradients | [Linear system](../linear-system/) (symmetric positive definite) | $x_{k+1}=x_k+\alpha_kp_k$, $r_{k+1}=r_k-\alpha_kAp_k$, $\alpha_k=\frac{r_k^{\mathsf T}r_k}{p_k^{\mathsf T}Ap_k}$ | A symmetric positive definite matrix. Needs a preconditioner to be quick |
| GMRES, BiCGSTAB | [Linear system](../linear-system/), [Saddle point](../saddle-point/) | $x_k=\arg\min_{x\in x_0+\mathcal K_k}\lVert b-Ax\rVert_2$ | The matrix, and a preconditioner. Memory grows with the iteration count |
| MINRES | [Linear system](../linear-system/) (indefinite), [Saddle point](../saddle-point/) | the same minimum for $A=A^{\mathsf T}$, with a three-term recurrence | Symmetry and indefiniteness. The right Krylov method for a block system |
| Iterative refinement | [Linear system](../linear-system/) (ill-conditioned) | $r=b-Ax_k$; solve $A\delta=r$, then $x_{k+1}=x_k+\delta$ | A factorisation and a residual. Recovers digits a single solve loses |
| Multigrid, algebraic multigrid (AMG) | [Linear system](../linear-system/), [Elliptic](../elliptic/) | $u\leftarrow u+PA_c^{-1}R(b-Au)$, with smoothing before and after | A hierarchy of meshes, or a matrix graph. Close to linear in the size |
| Preconditioners (ILU, Jacobi, AMG) | [Linear system](../linear-system/), [Elliptic](../elliptic/), [Saddle point](../saddle-point/) | $M^{-1}Ax=M^{-1}b$ with $M\approx A$; ILU uses $A\approx\tilde L\tilde U$ | The matrix. The difference between converging and not |
| Jacobi, Gauss–Seidel, SOR | [Linear system](../linear-system/), [Elliptic](../elliptic/) | $\begin{aligned}x_i^{(k+1)}={}&(1-\omega)x_i^{(k)}\\&+\frac{\omega}{a_{ii}}\big(b_i\\&-\sum_{j\ne i}a_{ij}x_j\big)\end{aligned}$ | A mesh. A smoother inside multigrid, and slow on its own |
| Domain decomposition | [Elliptic](../elliptic/) | $x_{k+1}=x_k+\sum_iR_i^{\mathsf T}A_i^{-1}R_i r$, with $r=b-Ax_k$ | A partition of the region. Scales on many cores; needs an interface solve |
| Fast Fourier transform (FFT) | [Elliptic](../elliptic/) (constant coefficients) | $\hat u_k=\sum_{j=0}^{N-1}u_je^{-2\pi ijk/N}$ in $O(N\log N)$ | A regular, periodic grid. Exact and fast, and refuses everything else |
| Boundary element | [Elliptic](../elliptic/) | $\begin{aligned}c(x)u(x)&+\int_{\partial\Omega}u\frac{\partial G}{\partial n}\,dS\\&=\int_{\partial\Omega}G\frac{\partial u}{\partial n}\,dS\end{aligned}$ | The boundary alone. Linear, homogeneous, unbounded regions; a varying coefficient inside defeats it |
| Schur complement | [Saddle point](../saddle-point/) | $S=BA^{-1}B^{\mathsf T}$; solve $Sp=BA^{-1}f-g$ | A good solver for the state block. The Schur complement is dense |
| Uzawa | [Saddle point](../saddle-point/) | $u_{k+1}=A^{-1}(f-B^{\mathsf T}p_k)$, $p_{k+1}=p_k+\omega(Bu_{k+1}-g)$ | Iteration on the multiplier alone. Quick to write, slow without help |
| Null-space method | [Saddle point](../saddle-point/) | $u=u_0+Zz$ with $Z$ spanning $\ker B$; solve $Z^{\mathsf T}AZz=-Z^{\mathsf T}(Au_0-f)$ | A parameterisation of the allowed directions. Exact constraints, small systems |
| Constraint elimination | [Saddle point](../saddle-point/) | $u=Cu_r$; solve $(C^{\mathsf T}AC)u_r=C^{\mathsf T}f$ | A simple, local constraint. Removes unknowns; dense, coupled constraints defeat it |
| Augmented Lagrangian | [Saddle point](../saddle-point/) | $\begin{aligned}L_\rho={}&f(u)-p^{\mathsf T}(Bu-g)\\&+\frac{\rho}{2}\lVert Bu-g\rVert^2\end{aligned}$, then $p\leftarrow p-\rho(Bu-g)$ | A penalty and a multiplier together. Better conditioning; the penalty term hides the constraint error |
<a id="eigenvalues"></a>

## Eigenvalues

| method | class | the step, in symbols | what it needs, and what it costs |
|---|---|---|---|
| QR algorithm | [Eigenvalues](../eigenvalue/) (dense) | $A_k=Q_kR_k$, $A_{k+1}=Q_k^{\mathsf T}A_kQ_k$ | The whole matrix. All eigenvalues, and cubic cost |
| QZ | [Eigenvalues](../eigenvalue/) (generalised) | $A=QSZ^{\mathsf T}$, $B=QTZ^{\mathsf T}$ | Two dense matrices. Handles a singular mass matrix |
| Power iteration | [Eigenvalues](../eigenvalue/) (extreme) | $v_{k+1}=\frac{Av_k}{\lVert Av_k\rVert}$, $\lambda\approx v_k^{\mathsf T}Av_k$ | One matrix-vector product. The largest eigenvalue, slowly |
| Inverse iteration, shift-invert | [Eigenvalues](../eigenvalue/) (interior) | $(A-\sigma I)v_{k+1}=v_k$, $\lambda\approx\frac{v^{\mathsf T}Av}{v^{\mathsf T}v}$ | A linear solve with a shifted matrix. The practical route to interior eigenvalues |
| Lanczos, Arnoldi | [Eigenvalues](../eigenvalue/) (sparse) | $AV_k=V_kH_k+h_{k+1,k}v_{k+1}e_k^{\mathsf T}$; eigenvalues of $H_k$ | A Krylov subspace. A few extreme eigenvalues of a large matrix |
| Subspace iteration | [Eigenvalues](../eigenvalue/) (sparse) | $V_{k+1}=\operatorname{qr}(AV_k)$ | A block of vectors. Several dominant eigenvalues at once; interior ones are out of reach |
| Jacobi–Davidson | [Eigenvalues](../eigenvalue/) (interior, non-linear) | $\begin{aligned}(I-xx^{\mathsf T})&(A-\theta I)\\&\times(I-xx^{\mathsf T})u=-r\end{aligned}$ | A preconditioner and a target. Complex to set up, and worth it |
| Contour integral (FEAST) | [Eigenvalues](../eigenvalue/) (interior) | $\frac{1}{2\pi i}\oint_\Gamma(zI-A)^{-1}V\,dz$, eigenvalues inside $\Gamma$ | A contour and a linear solve. Every eigenvalue in a window; needs a good shifted solver |

<a id="moving-problems"></a>

## Moving problems

| method | class | the step, in symbols | what it needs, and what it costs |
|---|---|---|---|
| Forward Euler, explicit Runge–Kutta | [Parabolic](../parabolic/), [Hyperbolic](../hyperbolic/) | $u_{n+1}=u_n+\Delta tF(u_n)$; RK4 adds $\frac{\Delta t}{6}(k_1+2k_2+2k_3+k_4)$ | A step inside the stability limit. Cheap per step |
| Backward Euler | [Parabolic](../parabolic/) (stiff) | $u_{n+1}=u_n+\Delta tF(u_{n+1})$ | A linear solve per step. Unconditionally stable, first order |
| Crank–Nicolson | [Parabolic](../parabolic/) | $u_{n+1}=u_n+\frac{\Delta t}{2}\big(F(u_n)+F(u_{n+1})\big)$ | A linear solve per step. Second order, and it rings at a sharp start |
| BDF, Radau, implicit Runge–Kutta | [Parabolic](../parabolic/) (stiff) | $\sum_{j=0}^{s}\alpha_ju_{n+j}=\Delta t\beta_sF(u_{n+s})$ | A linear solve and an error estimate. The stiff default |
| Adaptive step control | [Parabolic](../parabolic/), [Hyperbolic](../hyperbolic/) | $\Delta t_{\text{new}}=\Delta t\big(\tau/\lVert e\rVert\big)^{1/(p+1)}$ | An error estimator. Turns a fixed step into a trustworthy one |
| ADI | [Parabolic](../parabolic/) (grid) | $(I-\frac{\Delta t}{2}A_x)u^*=(I+\frac{\Delta t}{2}A_y)u^n$, then swap $x$ and $y$ | A rectangular grid. Splits the solve by direction |
| Spectral methods | [Parabolic](../parabolic/) | $u_N=\sum_{k=0}^{N}\hat u_k\phi_k(x)$; differentiate the $\hat u_k$ | A smooth solution in a simple region. Very accurate; a shock or a complex boundary defeats it |
| Exponential integrators | [Parabolic](../parabolic/) | $\begin{aligned}u_{n+1}={}&e^{\Delta tL}u_n\\&+\Delta t\,\varphi_1(\Delta tL)N(u_n)\end{aligned}$ | A dominant linear term and a small non-linear one. Exact in the linear part, and no help when it is not |
| Method of characteristics | [Hyperbolic](../hyperbolic/) | $\frac{dx}{dt}=a(x,t)$; $u$ is constant along $x(t)$ | Known paths. Exact where they exist |
| Upwind | [Hyperbolic](../hyperbolic/) | $u_i^{n+1}=u_i^n-\frac{a\Delta t}{\Delta x}(u_i^n-u_{i-1}^n)$ for $a>0$ | The direction of travel. Stable, and it diffuses the answer |
| Lax–Wendroff | [Hyperbolic](../hyperbolic/) | $\begin{aligned}u_i^{n+1}&=u_i^n\\&\quad-\frac{a\Delta t}{2\Delta x}(u_{i+1}^n-u_{i-1}^n)\\&\quad+\frac{a^2\Delta t^2}{2\Delta x^2}(u_{i+1}^n-2u_i^n)\\&\quad+\frac{a^2\Delta t^2}{2\Delta x^2}u_{i-1}^n\end{aligned}$ | Second order in space and time. Smooth waves; it wiggles at a shock |
| Godunov, finite volume | [Hyperbolic](../hyperbolic/) (conservation) | $u_i^{n+1}=u_i^n-\frac{\Delta t}{\Delta x}(F_{i+1/2}-F_{i-1/2})$ | A flux function. Correct shocks, more work per face |
| Riemann solvers (Roe, HLLC, exact) | [Hyperbolic](../hyperbolic/) (conservation) | $\begin{aligned}F_{i+1/2}={}&\frac12(F_L+F_R)\\&-\frac12\lvert\tilde A\rvert(u_R-u_L)\end{aligned}$ | A flux between two states. Correct wave speeds; check the entropy fix |
| WENO, limiters | [Hyperbolic](../hyperbolic/) | $u_{i+1/2}=\sum_kw_ku_{i+1/2}^{(k)}$, $w_k\propto d_k/(\epsilon+\beta_k)^2$ | A stencil and a smoothness measure. High order without wiggles |
| Discontinuous Galerkin | [Hyperbolic](../hyperbolic/), [Elliptic](../elliptic/) | $\begin{aligned}\frac{d}{dt}\int_Ku_h\varphi\,dx\\&=\int_{\partial K}\hat F\varphi\,ds\\&-\int_KF(u_h)\varphi'\,dx\end{aligned}$ | A mesh with local polynomials. High order and complex geometry, more unknowns |
| Spectral element | [Hyperbolic](../hyperbolic/) | $u_h\mid_K=\sum_{j=0}^{p}u_j\ell_j(x)$, with nodal $\ell_j$ | Large elements with a high order inside each. Smooth waves over long times; not shocks |
| Symplectic integration | [Hyperbolic](../hyperbolic/) (Hamiltonian) | $p_{n+1/2}=p_n-\frac{\Delta t}{2}\nabla V(q_n)$, $q_{n+1}=q_n+\Delta tM^{-1}p_{n+1/2}$ | A structure to preserve. Long-time boundedness that others lose |
| Projection (Chorin) | [Saddle point](../saddle-point/) (moving) | $\Delta\phi=\frac{1}{\Delta t}\nabla\cdot u^*$, then $u_{n+1}=u^*-\Delta t\nabla\phi$ | A pressure solve per step. The standard route for incompressible flow |
| SIMPLE | [Saddle point](../saddle-point/) (steady) | $\nabla\cdot(\frac{1}{a_p}\nabla p')=\nabla\cdot u^*$, then $u=u^*-\frac{1}{a_p}\nabla p'$ | A pressure correction. The workhorse of steady flow solvers |

<a id="averaging"></a>

## Averaging

| method | class | the step, in symbols | what it needs, and what it costs |
|---|---|---|---|
| Monte Carlo | [Averaging](../averaging/) | $\hat\mu_N=\frac1N\sum_{i=1}^{N}g(x_i)$, with standard error $\sigma/\sqrt N$ | A model you can run. Error falls as one over the root of the runs |
| Importance sampling | [Averaging](../averaging/) (rare) | $\hat\mu=\frac1N\sum_i g(x_i)\frac{p(x_i)}{q(x_i)}$ | A good proposal distribution. Enormous gains, or enormous variance |
| Stratified and Latin hypercube sampling | [Averaging](../averaging/) | $\hat\mu=\sum_sW_s\bar g_s$; LHS draws once in every stratum of every input | A smooth response in a modest dimension. Spreads the draws; a discontinuous response defeats it |
| Quasi-Monte Carlo | [Averaging](../averaging/) (smooth) | $\hat\mu_N=\frac1N\sum_i g(x_i)$ with low-discrepancy $x_i$; error $O\big((\log N)^d/N\big)$ | A low-discrepancy sequence. Faster convergence, no honest error bar |
| Control variates, antithetic pairs | [Averaging](../averaging/) | $\hat\mu=\bar g-\beta(\bar h-\mathbb E[h])$, $\beta=\frac{\operatorname{cov}(g,h)}{\operatorname{var}(h)}$ | A correlated cheap model. Free accuracy when the correlation is strong |
| Markov chain Monte Carlo | [Averaging](../averaging/) (Bayesian) | $\alpha=\min\big(1,\frac{p(x')q(x\mid x')}{p(x)q(x'\mid x)}\big)$; accept with probability $\alpha$ | A target known up to a constant. Correlated samples and a burn-in |
| Particle filter, sequential Monte Carlo | [Averaging](../averaging/) (sequential) | $w_i\propto w_i\frac{p(y\mid x_i)p(x_i\mid x_{i-1})}{q(x_i\mid x_{i-1},y)}$, then resample | A state model and a likelihood. Degenerates in high dimension |
| Kalman filter, ensemble Kalman | [Averaging](../averaging/) (linear, Gaussian) | $\begin{aligned}\hat x_{k\mid k}={}&\hat x_{k\mid k-1}\\&+K_k(y_k-H\hat x_{k\mid k-1})\end{aligned}$, with $\begin{aligned}K_k={}&P_{k\mid k-1}H^{\mathsf T}\\&\times(HP_{k\mid k-1}H^{\mathsf T}+R)^{-1}\end{aligned}$ | A linear model and Gaussian noise. Optimal, and only there |
| Bootstrap | [Averaging](../averaging/) (data) | $\hat\theta^*_b$ from resamples; $\widehat{\operatorname{se}}=\operatorname{sd}(\hat\theta^*_1,\dots,\hat\theta^*_B)$ | A sample. Error bars without a formula, and none for dependence |
| Gaussian quadrature | [Averaging](../averaging/) (deterministic) | $\int_a^bf(x)w(x)\,dx\approx\sum_{i=1}^{n}w_if(x_i)$; exact to degree $2n-1$ | A smooth integrand. Exact to a degree, and hopeless above about ten dimensions |

## Two methods that are not one class

- **Newton** appears under root finding and under optimisation, because setting a
  gradient to zero is a root problem. Same method, and the Jacobian of the first is
  the Hessian of the second.
- **Multigrid** is tied to an elliptic origin. It appears under linear systems and
  elliptic problems, because an elliptic problem is solved as one. On a hyperbolic
  problem the coarse mesh carries the wrong physics, and it does not work.

</div>
