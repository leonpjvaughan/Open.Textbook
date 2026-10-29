---
title: Methods, A to Z
---

# Methods, A to Z

The inverse lookup. You have heard of a method and want to know where it
applies, or you are choosing between two and want to know what each costs.

Five classes, and one section for each. **Read the class first**: a method
outside its class is not a slower answer, it is a wrong one, or a run that does
not finish. Inside a section, each method gives three things. Its **class**
comes first, as the link to the page that argues for it. Then the **step**: the
arithmetic at the centre of the method, the update it repeats or the equation it
solves. Then the **price**: what it needs from you, and what it will not do.
Where a method is a family, the step is the representative member, and the class
line says what the family covers.

| class | what it answers | entries |
|---|---|---|
| [Finding a state](#finding-a-state) | $F(x)=0$: one unknown, or $n$ equations in $n$ unknowns | 19 |
| [Linear systems](#linear-systems) | $Ax=b$: one answer that satisfies many equations at once | 20 |
| [Eigenvalues](#eigenvalues) | $Av=\lambda v$: the directions a matrix does not turn | 8 |
| [Moving problems](#moving-problems) | $\dot u=F(u)$: an answer that travels, or settles, in time | 19 |
| [Averaging](#averaging) | $\mathbb E[g(X)]$: an answer that is a distribution, not a number | 11 |

A family counts once, and a method filed under two classes appears in both, so
the column is entries rather than a partition of the book's methods.

<div class="method-index" markdown="1">

<a id="finding-a-state"></a>

## Finding a state

<a id="bisection"></a>
### Bisection

Class: [Root](../root/)

$m=\frac{a+b}{2}$; keep the half where $f$ changes sign

A bracket. Certain, and slow: about three steps per digit

<a id="secant"></a>
### Secant, false position

Class: [Root](../root/)

$x_{k+1}=x_k-f(x_k)\frac{x_k-x_{k-1}}{f(x_k)-f(x_{k-1})}$

Two points. No derivative; can leave the bracket

<a id="newton"></a>
### Newton

Class: [Root](../root/), [Optimisation](../optimisation/)

$x_{k+1}=x_k-J(x_k)^{-1}F(x_k)$

The Jacobian, and a start close enough. Fast, local, fragile

<a id="quasi-newton-broyden"></a>
### Quasi-Newton (Broyden)

Class: [Root](../root/), [Optimisation](../optimisation/)

$B_{k+1}s_k=y_k$; the least-change update of $B_k$, then $B_k\delta=-F(x_k)$

Gradients, not second derivatives. The stored matrix grows with the problem

<a id="brent"></a>
### Brent

Class: [Root](../root/)

$x_{k+1}=\operatorname{IQI}(a,b,c)$, guarded by a bracket and bisected when it
stalls

A bracket, no derivative. The default for one equation

<a id="fixed-point-iteration"></a>
### Fixed-point iteration

Class: [Root](../root/)

$x_{k+1}=g(x_k)$, with $\lvert g'(x^*)\rvert<1$ at the answer

A map whose error shrinks. Converges when it contracts, and most interesting
cases do not

<a id="continuation"></a>
### Continuation, homotopy

Class: [Root](../root/), [Saddle point](../saddle-point/)

$H(x,\lambda)=(1-\lambda)H_0(x)+\lambda F(x)=0$, as $\lambda:0\to1$

A solved case to walk from. The tool for several solutions and toggle points

<a id="trust-region"></a>
### Trust region

Class: [Root](../root/), [Optimisation](../optimisation/)

$\min_{\lVert p\rVert\le\Delta_k} f_k+\nabla f_k^{\mathsf T}p+\tfrac12 p^{\mathsf T}B_kp$

A radius inside which the model is trusted. Survives a poor linear model; each
step is a subproblem

<a id="levenberg-marquardt"></a>
### Levenberg–Marquardt

Class: [Root](../root/), [Optimisation](../optimisation/)

$(J^{\mathsf T}J+\lambda_kI)\delta=-J^{\mathsf T}r$; adjust $\lambda_k$ after
the step

A least-squares residual. Damps the step, so it survives a bad start

<a id="gradient-descent"></a>
### Gradient descent

Class: [Optimisation](../optimisation/)

$x_{k+1}=x_k-\alpha_k\nabla f(x_k)$

A gradient. Cheap steps, slow arrival, and it zig-zags in a narrow valley

<a id="quasi-newton-bfgs"></a>
### Quasi-Newton (BFGS)

Class: [Optimisation](../optimisation/)

$H_{k+1}y_k=s_k$; the least-change rank-two update of $H_k$

Gradients. Better than descent, and needs memory for the matrix

<a id="gauss-newton"></a>
### Gauss–Newton

Class: [Optimisation](../optimisation/)

$\delta=-(J^{\mathsf T}J)^{-1}J^{\mathsf T}r$, then $x_{k+1}=x_k+\delta$

A least-squares residual and its Jacobian. The fitting workhorse

<a id="nelder-mead"></a>
### Nelder–Mead

Class: [Optimisation](../optimisation/)

$x_{\text{new}}=x_c+\alpha(x_c-x_{\text{worst}})$, with
$\alpha\in\{-1,\tfrac12,2\}$

Nothing but values. Fine in a few variables, unreliable beyond

<a id="simplex-method"></a>
### Simplex method

Class: [Optimisation](../optimisation/) (linear)

$\max c^{\mathsf T}x$ subject to $Ax\le b$, $x\ge0$; pivot between vertices

A linear problem in standard form. Corners, exactly

<a id="interior-point"></a>
### Interior point

Class: [Optimisation](../optimisation/)

$\min f(x)-\mu\sum_i\log s_i$ subject to $g(x)+s=0$, as $\mu\downarrow0$

A convex problem. Scales to large systems; needs a linear solve

<a id="sequential-quadratic-programming"></a>
### Sequential quadratic programming (SQP)

Class: [Optimisation](../optimisation/)

$\min_p\tfrac12p^{\mathsf T}H_kp+\nabla f_k^{\mathsf T}p$ subject to
$\nabla g_k^{\mathsf T}p+g_k=0$

Smooth constraints. Expensive steps; the general answer

<a id="stochastic-gradient"></a>
### Stochastic gradient, Adam

Class: [Optimisation](../optimisation/) (noisy)

$\theta_{k+1}=\theta_k-\alpha\frac{\hat m_k}{\sqrt{\hat v_k}+\epsilon}$

A sampled gradient. Fast on huge data, imprecise at the answer

<a id="multistart"></a>
### Multistart, basin hopping

Class: [Optimisation](../optimisation/) (not convex)

$x^*=\arg\min_j\min_x f(x)$ from starts $x_0^{(j)}$

Many cheap runs. No guarantee; a way of finding a better local minimum

<a id="bayesian-optimisation"></a>
### Bayesian optimisation

Class: [Optimisation](../optimisation/) (expensive)

$\begin{aligned}x_{k+1}={}&\arg\max_x\mathbb E\big[\\&\max(0,f_{\min}-f(x))\big]\end{aligned}$

A surrogate and a prior. Best when one run costs a day


- $f$ is the function whose zero you want.
- $F$ carries the same idea for several equations at once: a vector that is zero
  when they all hold.
- $a$ and $b$ bracket one root, and $m$ is the point halfway between them.
- $x_k$ is the current guess and $x_{k+1}$ the next.
- $J$ is the Jacobian, the matrix of $F$ 's first derivatives.
- $B_k$ is a running approximation to the Jacobian, $s_k=x_{k+1}-x_k$ is the
  step taken, and $y_k=F(x_{k+1})-F(x_k)$ is the change it produced.
- $\delta$ is the linear step a method solves for.
- $c$ is the third point that inverse quadratic interpolation (IQI) fits through
  $a$, $b$ and $c$.
- $g$ is the map a fixed-point iteration applies, and $x^*$ is the point it
  settles at.
- $\lambda$ walks a homotopy from a problem you can solve, $H_0$, to the one you
  want.
- In the trust-region method, $\Delta_k$ is the radius, $p$ the trial step,
  $f_k$ the local model and $\nabla f_k$ its gradient.
- From gradient descent onward, $f$ is the objective rather than a residual,
  $\alpha_k$ is the step length, $r$ is a residual and $I$ is the identity
  matrix.
- In the simplex method, $c$ is the cost vector, $A$ the constraint matrix, $b$
  its right-hand side and $x\ge0$ the variables.
- $s_i$ is a slack in the interior-point method, where $\mu$ is the barrier
  weight.
- In the sampling methods, $\theta$ are the parameters being learned, $\hat m_k$
  and $\hat v_k$ are running estimates of the gradient and of its square,
  $\epsilon$ guards a division, and $f_{\min}$ is the best value seen so far.
- There $\mathbb E$ is an expectation over the surrogate model, and $x_0^{(j)}$
  is the $j$ -th starting point.
<a id="linear-systems"></a>

## Linear systems

<a id="dense-lu"></a>
### Dense LU, with pivoting

Class: [Linear system](../linear-system/)

$PA=LU$; solve $Ly=Pb$, then $Ux=y$

A few thousand unknowns. Cubic work, and it answers every right-hand side

<a id="cholesky"></a>
### Cholesky

Class: [Linear system](../linear-system/) (symmetric positive definite)

$A=LL^{\mathsf T}$ for $A=A^{\mathsf T}\succ0$

Half the work of LU, and it refuses anything indefinite

<a id="qr"></a>
### QR, SVD

Class: [Linear system](../linear-system/) (rectangular),
[Eigenvalues](../eigenvalue/)

$A=QR$, $x=R^{-1}Q^{\mathsf T}b$; $A=U\Sigma V^{\mathsf T}$

Least squares, rank, and a diagnostic of conditioning. Expensive, and honest

<a id="normal-equations"></a>
### Normal equations

Class: [Linear system](../linear-system/) (least squares)

$A^{\mathsf T}Ax=A^{\mathsf T}b$, with $\kappa(A^{\mathsf T}A)=\kappa(A)^2$

Simple, and it squares the condition number. Avoid unless the matrix is well
conditioned

<a id="sparse-direct-cholesky"></a>
### Sparse direct (Cholesky, LU, multifrontal)

Class: [Linear system](../linear-system/), [Elliptic](../elliptic/),
[Saddle point](../saddle-point/)

$PAP^{\mathsf T}=LU$, with $P$ chosen to limit fill

A factorisation and an ordering. Excellent in two dimensions; fill-in limits
three

<a id="conjugate-gradients"></a>
### Conjugate gradients

Class: [Linear system](../linear-system/) (symmetric positive definite)

$x_{k+1}=x_k+\alpha_kp_k$, $r_{k+1}=r_k-\alpha_kAp_k$,
$\alpha_k=\frac{r_k^{\mathsf T}r_k}{p_k^{\mathsf T}Ap_k}$

A symmetric positive definite matrix. Needs a preconditioner to be quick

<a id="gmres"></a>
### GMRES, BiCGSTAB

Class: [Linear system](../linear-system/), [Saddle point](../saddle-point/)

$x_k=\arg\min_{x\in x_0+\mathcal K_k}\lVert b-Ax\rVert_2$

The matrix, and a preconditioner. Memory grows with the iteration count

<a id="minres"></a>
### MINRES

Class: [Linear system](../linear-system/) (indefinite),
[Saddle point](../saddle-point/)

the same minimum for $A=A^{\mathsf T}$, with a three-term recurrence

Symmetry and indefiniteness. The right Krylov method for a block system

<a id="iterative-refinement"></a>
### Iterative refinement

Class: [Linear system](../linear-system/) (ill-conditioned)

$r=b-Ax_k$; solve $A\delta=r$, then $x_{k+1}=x_k+\delta$

A factorisation and a residual. Recovers digits a single solve loses

<a id="multigrid"></a>
### Multigrid, algebraic multigrid (AMG)

Class: [Linear system](../linear-system/), [Elliptic](../elliptic/)

$u\leftarrow u+PA_c^{-1}R(b-Au)$, with smoothing before and after

A hierarchy of meshes, or a matrix graph. Close to linear in the size

<a id="preconditioners-ilu"></a>
### Preconditioners (ILU, Jacobi, AMG)

Class: [Linear system](../linear-system/), [Elliptic](../elliptic/),
[Saddle point](../saddle-point/)

$M^{-1}Ax=M^{-1}b$ with $M\approx A$; ILU uses $A\approx\tilde L\tilde U$

The matrix. The difference between converging and not

<a id="jacobi"></a>
### Jacobi, Gauss–Seidel, SOR

Class: [Linear system](../linear-system/), [Elliptic](../elliptic/)

$\begin{aligned}x_i^{(k+1)}={}&(1-\omega)x_i^{(k)}\\&+\frac{\omega}{a_{ii}}\big(b_i\\&-\sum_{j\ne i}a_{ij}x_j\big)\end{aligned}$

A mesh. A smoother inside multigrid, and slow on its own

<a id="domain-decomposition"></a>
### Domain decomposition

Class: [Elliptic](../elliptic/)

$x_{k+1}=x_k+\sum_iR_i^{\mathsf T}A_i^{-1}R_i r$, with $r=b-Ax_k$

A partition of the region. Scales on many cores; needs an interface solve

<a id="fast-fourier-transform"></a>
### Fast Fourier transform (FFT)

Class: [Elliptic](../elliptic/) (constant coefficients)

$\hat u_k=\sum_{j=0}^{N-1}u_je^{-2\pi ijk/N}$ in $O(N\log N)$

A regular, periodic grid. Exact and fast, and refuses everything else

<a id="boundary-element"></a>
### Boundary element

Class: [Elliptic](../elliptic/)

$\begin{aligned}c(x)u(x)&+\int_{\partial\Omega}u\frac{\partial G}{\partial n}\,dS\\&=\int_{\partial\Omega}G\frac{\partial u}{\partial n}\,dS\end{aligned}$

The boundary alone. Linear, homogeneous, unbounded regions; a varying
coefficient inside defeats it

<a id="schur-complement"></a>
### Schur complement

Class: [Saddle point](../saddle-point/)

$S=BA^{-1}B^{\mathsf T}$; solve $Sp=BA^{-1}f-g$

A good solver for the state block. The Schur complement is dense

<a id="uzawa"></a>
### Uzawa

Class: [Saddle point](../saddle-point/)

$u_{k+1}=A^{-1}(f-B^{\mathsf T}p_k)$, $p_{k+1}=p_k+\omega(Bu_{k+1}-g)$

Iteration on the multiplier alone. Quick to write, slow without help

<a id="null-space-method"></a>
### Null-space method

Class: [Saddle point](../saddle-point/)

$u=u_0+Zz$ with $Z$ spanning $\ker B$; solve
$Z^{\mathsf T}AZz=-Z^{\mathsf T}(Au_0-f)$

A parameterisation of the allowed directions. Exact constraints, small systems

<a id="constraint-elimination"></a>
### Constraint elimination

Class: [Saddle point](../saddle-point/)

$u=Cu_r$; solve $(C^{\mathsf T}AC)u_r=C^{\mathsf T}f$

A simple, local constraint. Removes unknowns; dense, coupled constraints defeat
it

<a id="augmented-lagrangian"></a>
### Augmented Lagrangian

Class: [Saddle point](../saddle-point/)

$\begin{aligned}L_\rho={}&f(u)-p^{\mathsf T}(Bu-g)\\&+\frac{\rho}{2}\lVert Bu-g\rVert^2\end{aligned}$,
then $p\leftarrow p-\rho(Bu-g)$

A penalty and a multiplier together. Better conditioning; the penalty term hides
the constraint error


- $A$ is the matrix, $b$ the right-hand side and $x$ the answer they solve for.
- $P$ is a permutation, which reorders rows for stability.
- $L$ and $U$ are the lower and upper triangular factors, and $y$ is the
  intermediate vector in a two-stage solve.
- $\kappa$ is the condition number: the factor by which a relative error in $b$
  can grow in $x$.
- $Q$ has orthonormal columns and $R$ is upper triangular.
- In the singular value decomposition, $U$ and $V$ are orthogonal and $\Sigma$
  holds the singular values.
- $M$ is a preconditioner that approximates $A$, and $\tilde L\tilde U$ is its
  incomplete factorisation.
- $r_k$ is the residual at step $k$, $p_k$ the search direction, and $\alpha_k$
  the distance moved along it.
- $\mathcal K_k$ is the Krylov space spanned by $b$, $Ab$ and the products after
  them.
- $x_0$ is the starting guess.
- In relaxation, $a_{ij}$ are entries of $A$, $b_i$ of $b$, and $\omega$ is the
  over-relaxation weight.
- $R_i$ restricts a vector to subdomain $i$, and $A_i$ is that subdomain's
  matrix.
- In the boundary-element method, $\Omega$ is the region, $\partial\Omega$ its
  boundary, $n$ the outward normal, $u$ the unknown field, $G$ the Green's
  function, and $c(x)$ the local boundary geometry factor.
- $S=BA^{-1}B^{\mathsf T}$ is the Schur complement of the block system.
- There $B$ is the constraint matrix, $f$ and $g$ are its two right-hand sides,
  and $p$ is the multiplier, with $\omega$ the step in Uzawa.
- $Z$ spans the directions the constraints allow, $z$ is the coordinate vector
  in that basis, $u_0$ is one particular solution, and $C$ maps reduced unknowns
  $u_r$ back to the full set.
- $\rho$ is the augmentation weight.
- In the Fourier method, $N$ is the number of grid points, $u_j$ the value at
  point $j$, $\hat u_k$ its coefficient, and $i$ the imaginary unit.

<a id="eigenvalues"></a>

## Eigenvalues

<a id="qr-algorithm"></a>
### QR algorithm

Class: [Eigenvalues](../eigenvalue/) (dense)

$A_k=Q_kR_k$, $A_{k+1}=Q_k^{\mathsf T}A_kQ_k$

The whole matrix. All eigenvalues, and cubic cost

<a id="qz"></a>
### QZ

Class: [Eigenvalues](../eigenvalue/) (generalised)

$A=QSZ^{\mathsf T}$, $B=QTZ^{\mathsf T}$

Two dense matrices. Handles a singular mass matrix

<a id="power-iteration"></a>
### Power iteration

Class: [Eigenvalues](../eigenvalue/) (extreme)

$v_{k+1}=\frac{Av_k}{\lVert Av_k\rVert}$, $\lambda\approx v_k^{\mathsf T}Av_k$

One matrix-vector product. The largest eigenvalue, slowly

<a id="inverse-iteration"></a>
### Inverse iteration, shift-invert

Class: [Eigenvalues](../eigenvalue/) (interior)

$(A-\sigma I)v_{k+1}=v_k$,
$\lambda\approx\frac{v^{\mathsf T}Av}{v^{\mathsf T}v}$

A linear solve with a shifted matrix. The practical route to interior
eigenvalues

<a id="lanczos"></a>
### Lanczos, Arnoldi

Class: [Eigenvalues](../eigenvalue/) (sparse)

$AV_k=V_kH_k+h_{k+1,k}v_{k+1}e_k^{\mathsf T}$; eigenvalues of $H_k$

A Krylov subspace. A few extreme eigenvalues of a large matrix

<a id="subspace-iteration"></a>
### Subspace iteration

Class: [Eigenvalues](../eigenvalue/) (sparse)

$V_{k+1}=\operatorname{qr}(AV_k)$

A block of vectors. Several dominant eigenvalues at once; interior ones are out
of reach

<a id="jacobi-davidson"></a>
### Jacobi–Davidson

Class: [Eigenvalues](../eigenvalue/) (interior, non-linear)

$\begin{aligned}(I-xx^{\mathsf T})&(A-\theta I)\\&\times(I-xx^{\mathsf T})u=-r\end{aligned}$

A preconditioner and a target. Complex to set up, and worth it

<a id="contour-integral"></a>
### Contour integral (FEAST)

Class: [Eigenvalues](../eigenvalue/) (interior)

$\frac{1}{2\pi i}\oint_\Gamma(zI-A)^{-1}V\,dz$, eigenvalues inside $\Gamma$

A contour and a linear solve. Every eigenvalue in a window; needs a good shifted
solver


- $A$ and $B$ are the matrices, and $I$ is the identity.
- $\lambda$ is an eigenvalue with eigenvector $v$, so $Av=\lambda v$.
- $\sigma$ is the shift chosen to bring a wanted eigenvalue to the top of the
  spectrum.
- In the QR algorithm, $A_k=Q_kR_k$ is the factorisation and
  $A_{k+1}=Q_k^{\mathsf T}A_kQ_k$ is the next matrix in the sequence.
- In QZ, $S$ and $T$ are the triangular factors of $A$ and $B$.
- $v_k$ is the current vector, and $\lVert\cdot\rVert$ is its length.
- $V_k$ holds the basis vectors of a Krylov subspace.
- $H_k$ is the small matrix the projection produces, $h_{k+1,k}$ is the entry
  immediately below its corner, and $e_k$ is the last unit vector.
- $\theta$ is the current estimate of an eigenvalue and $x$ its eigenvector,
  with $r$ the residual left by the Davidson correction.
- In the contour method, $\Gamma$ is the closed curve and $z$ the variable
  integrated around it, so $(zI-A)^{-1}$ is one shifted inverse solve at each
  point of the curve.
<a id="moving-problems"></a>

## Moving problems

<a id="forward-euler"></a>
### Forward Euler, explicit Runge–Kutta

Class: [Parabolic](../parabolic/), [Hyperbolic](../hyperbolic/)

$u_{n+1}=u_n+\Delta tF(u_n)$; RK4 adds $\frac{\Delta t}{6}(k_1+2k_2+2k_3+k_4)$

A step inside the stability limit. Cheap per step

<a id="backward-euler"></a>
### Backward Euler

Class: [Parabolic](../parabolic/) (stiff)

$u_{n+1}=u_n+\Delta tF(u_{n+1})$

A linear solve per step. Unconditionally stable, first order

<a id="crank-nicolson"></a>
### Crank–Nicolson

Class: [Parabolic](../parabolic/)

$u_{n+1}=u_n+\frac{\Delta t}{2}\big(F(u_n)+F(u_{n+1})\big)$

A linear solve per step. Second order, and it rings at a sharp start

<a id="bdf"></a>
### BDF, Radau, implicit Runge–Kutta

Class: [Parabolic](../parabolic/) (stiff)

$\sum_{j=0}^{s}\alpha_ju_{n+j}=\Delta t\beta_sF(u_{n+s})$

A linear solve and an error estimate. The stiff default

<a id="adaptive-step-control"></a>
### Adaptive step control

Class: [Parabolic](../parabolic/), [Hyperbolic](../hyperbolic/)

$\Delta t_{\text{new}}=\Delta t\big(\tau/\lVert e\rVert\big)^{1/(p+1)}$

An error estimator. Turns a fixed step into a trustworthy one

<a id="adi"></a>
### ADI

Class: [Parabolic](../parabolic/) (grid)

$(I-\frac{\Delta t}{2}A_x)u^*=(I+\frac{\Delta t}{2}A_y)u^n$, then swap $x$ and
$y$

A rectangular grid. Splits the solve by direction

<a id="spectral-methods"></a>
### Spectral methods

Class: [Parabolic](../parabolic/)

$u_N=\sum_{k=0}^{N}\hat u_k\phi_k(x)$; differentiate the $\hat u_k$

A smooth solution in a simple region. Very accurate; a shock or a complex
boundary defeats it

<a id="exponential-integrators"></a>
### Exponential integrators

Class: [Parabolic](../parabolic/)

$\begin{aligned}u_{n+1}={}&e^{\Delta tL}u_n\\&+\Delta t\,\varphi_1(\Delta tL)N(u_n)\end{aligned}$

A dominant linear term and a small non-linear one. Exact in the linear part, and
no help when it is not

<a id="method-of-characteristics"></a>
### Method of characteristics

Class: [Hyperbolic](../hyperbolic/)

$\frac{dx}{dt}=a(x,t)$; $u$ is constant along $x(t)$

Known paths. Exact where they exist

<a id="upwind"></a>
### Upwind

Class: [Hyperbolic](../hyperbolic/)

$u_i^{n+1}=u_i^n-\frac{a\Delta t}{\Delta x}(u_i^n-u_{i-1}^n)$ for $a>0$

The direction of travel. Stable, and it diffuses the answer

<a id="lax-wendroff"></a>
### Lax–Wendroff

Class: [Hyperbolic](../hyperbolic/)

$\begin{aligned}u_i^{n+1}&=u_i^n-\frac{a\Delta t}{2\Delta x}(u_{i+1}^n-u_{i-1}^n)\\&+\frac{a^2\Delta t^2}{2\Delta x^2}(u_{i+1}^n-2u_i^n+u_{i-1}^n)\end{aligned}$

Second order in space and time. Smooth waves; it wiggles at a shock

<a id="godunov"></a>
### Godunov, finite volume

Class: [Hyperbolic](../hyperbolic/) (conservation)

$u_i^{n+1}=u_i^n-\frac{\Delta t}{\Delta x}(F_{i+1/2}-F_{i-1/2})$

A flux function. Correct shocks, more work per face

<a id="riemann-solvers-roe"></a>
### Riemann solvers (Roe, HLLC, exact)

Class: [Hyperbolic](../hyperbolic/) (conservation)

$\begin{aligned}F_{i+1/2}={}&\frac12(F_L+F_R)\\&-\frac12\lvert\tilde A\rvert(u_R-u_L)\end{aligned}$

A flux between two states. Correct wave speeds; check the entropy fix

<a id="weno"></a>
### WENO, limiters

Class: [Hyperbolic](../hyperbolic/)

$u_{i+1/2}=\sum_kw_ku_{i+1/2}^{(k)}$, $w_k\propto d_k/(\epsilon+\beta_k)^2$

A stencil and a smoothness measure. High order without wiggles

<a id="discontinuous-galerkin"></a>
### Discontinuous Galerkin

Class: [Hyperbolic](../hyperbolic/), [Elliptic](../elliptic/)

$\begin{aligned}\frac{d}{dt}\int_Ku_h\varphi\,dx\\&=\int_{\partial K}\hat F\varphi\,ds\\&-\int_KF(u_h)\varphi'\,dx\end{aligned}$

A mesh with local polynomials. High order and complex geometry, more unknowns

<a id="spectral-element"></a>
### Spectral element

Class: [Hyperbolic](../hyperbolic/)

$u_h\mid_K=\sum_{j=0}^{p}u_j\ell_j(x)$, with nodal $\ell_j$

Large elements with a high order inside each. Smooth waves over long times; not
shocks

<a id="symplectic-integration"></a>
### Symplectic integration

Class: [Hyperbolic](../hyperbolic/) (Hamiltonian)

$p_{n+1/2}=p_n-\frac{\Delta t}{2}\nabla V(q_n)$,
$q_{n+1}=q_n+\Delta tM^{-1}p_{n+1/2}$

A structure to preserve. Long-time boundedness that others lose

<a id="projection"></a>
### Projection (Chorin)

Class: [Saddle point](../saddle-point/) (moving)

$\Delta\phi=\frac{1}{\Delta t}\nabla\cdot u^*$, then
$u_{n+1}=u^*-\Delta t\nabla\phi$

A pressure solve per step. The standard route for incompressible flow

<a id="simple"></a>
### SIMPLE

Class: [Saddle point](../saddle-point/) (steady)

$\nabla\cdot(\frac{1}{a_p}\nabla p')=\nabla\cdot u^*$, then
$u=u^*-\frac{1}{a_p}\nabla p'$

A pressure correction. The workhorse of steady flow solvers


- $u$ is the field being advanced and $u_n$ its value at step $n$; $\Delta t$
  and $\Delta x$ are the time and space steps.
- $F(u)$ is the right-hand side of the semi-discrete system $\dot u=F(u)$, and
  $i$ is a cell index.
- In Runge–Kutta, $k_1$ to $k_4$ are the stage slopes.
- In BDF and Radau, $\alpha_j$ and $\beta_s$ are the coefficients of the method
  and $s$ is the number of past steps it uses.
- In adaptive step control, $\tau$ is the error you ask for, $\lVert e\rVert$
  the error you estimate, and $p$ the order of the method.
- $A_x$ and $A_y$ are the one-dimensional operators in each direction, and $u^*$
  is the half-step in ADI.
- In the spectral methods, $\phi_k$ are the basis functions and $\hat u_k$ their
  coefficients.
- $L$ is the linear part of the operator, $N(u)$ its non-linear part, and
  $\varphi_1$ the first exponential-integrator function.
- $a(x,t)$ is the wave speed and $F_{i\pm1/2}$ is the flux at a cell face.
- In WENO, $w_k$ are the weights, $d_k$ the ideal weights, $\beta_k$ the
  smoothness indicators, and $\epsilon$ a guard against dividing by zero.
- In the Galerkin method, $K$ is an element, $u_h$ the approximation, $\varphi$
  a test function and $\hat F$ the numerical flux at the element's edge.
- In the spectral-element method, $\ell_j$ are the nodal polynomials and $p$ the
  order inside an element.
- In the Hamiltonian method, $q$ is position, $p$ is momentum, $V$ the potential
  and $M$ the mass matrix.
- In projection and SIMPLE, $u^*$ is the velocity before the correction, $\phi$
  the pressure-like potential, $p'$ the correction to the pressure, and $a_p$ a
  coefficient of the discretised momentum equation.
<a id="averaging"></a>

## Averaging

<a id="monte-carlo"></a>
### Monte Carlo

Class: [Averaging](../averaging/)

$\hat\mu_N=\frac1N\sum_{i=1}^{N}g(x_i)$, with standard error $\sigma/\sqrt N$

A model you can run. Error falls as one over the root of the runs

<a id="importance-sampling"></a>
### Importance sampling

Class: [Averaging](../averaging/) (rare)

$\hat\mu=\frac1N\sum_i g(x_i)\frac{p(x_i)}{q(x_i)}$

A good proposal distribution. Enormous gains, or enormous variance

<a id="stratified-and-latin-hypercube-sampling"></a>
### Stratified and Latin hypercube sampling

Class: [Averaging](../averaging/)

$\hat\mu=\sum_sW_s\bar g_s$; LHS draws once in every stratum of every input

A smooth response in a modest dimension. Spreads the draws; a discontinuous
response defeats it

<a id="quasi-monte-carlo"></a>
### Quasi-Monte Carlo

Class: [Averaging](../averaging/) (smooth)

$\hat\mu_N=\frac1N\sum_i g(x_i)$ with low-discrepancy $x_i$; error
$O\big((\log N)^d/N\big)$

A low-discrepancy sequence. Faster convergence, no honest error bar

<a id="control-variates"></a>
### Control variates, antithetic pairs

Class: [Averaging](../averaging/)

$\hat\mu=\bar g-\beta(\bar h-\mathbb E[h])$,
$\beta=\frac{\operatorname{cov}(g,h)}{\operatorname{var}(h)}$

A correlated cheap model. Free accuracy when the correlation is strong

<a id="markov-chain-monte-carlo"></a>
### Markov chain Monte Carlo

Class: [Averaging](../averaging/) (Bayesian)

$\alpha=\min\big(1,\frac{p(x')q(x\mid x')}{p(x)q(x'\mid x)}\big)$; accept with
probability $\alpha$

A target known up to a constant. Correlated samples and a burn-in

<a id="particle-filter"></a>
### Particle filter, sequential Monte Carlo

Class: [Averaging](../averaging/) (sequential)

$w_i\propto w_i\frac{p(y\mid x_i)p(x_i\mid x_{i-1})}{q(x_i\mid x_{i-1},y)}$,
then resample

A state model and a likelihood. Degenerates in high dimension

<a id="kalman-filter"></a>
### Kalman filter, ensemble Kalman

Class: [Averaging](../averaging/) (linear, Gaussian)

$\begin{aligned}\hat x_{k\mid k}={}&\hat x_{k\mid k-1}\\&+K_k(y_k-H\hat x_{k\mid k-1})\end{aligned}$,
with
$\begin{aligned}K_k={}&P_{k\mid k-1}H^{\mathsf T}\\&\times(HP_{k\mid k-1}H^{\mathsf T}+R)^{-1}\end{aligned}$

A linear model and Gaussian noise. Optimal, and only there

<a id="bootstrap"></a>
### Bootstrap

Class: [Averaging](../averaging/) (data)

$\hat\theta^*_b$ from resamples;
$\widehat{\operatorname{se}}=\operatorname{sd}(\hat\theta^*_1,\dots,\hat\theta^*_B)$

A sample. Error bars without a formula, and none for dependence

<a id="least-squares-fit"></a>
### Least-squares fit

Class: [Optimisation](../optimisation/), [Linear system](../linear-system/)

$X^{\mathsf T}X\beta=X^{\mathsf T}y$; solve for the coefficients

A model linear in its parameters. A small residual is not a good fit

<a id="gaussian-quadrature"></a>
### Gaussian quadrature

Class: [Averaging](../averaging/) (deterministic)

$\int_a^bf(x)w(x)\,dx\approx\sum_{i=1}^{n}w_if(x_i)$; exact to degree $2n-1$

A smooth integrand. Exact to a degree, and hopeless above about ten dimensions
</div>


- $\mu$ is the mean you want, $\hat\mu$ an estimate of it, and $\hat\mu_N$ the
  estimate from $N$ samples.
- $g$ is the quantity being averaged and $x_i$ is the $i$ -th draw.
- $\sigma$ is the standard deviation of one draw, which is why the standard
  error is $\sigma/\sqrt N$.
- $p$ is the density you want and $q$ the density you draw from, so their ratio
  is the weight.
- In stratified sampling, $s$ labels a stratum, $W_s$ is its share of the
  probability and $\bar g_s$ the average inside it.
- In the control-variate method, $h$ is a correlated quantity whose average you
  know, $\beta$ is the fitted slope, and $\operatorname{cov}$ and
  $\operatorname{var}$ are covariance and variance.
- In Markov chain Monte Carlo, $x$ is the current state, $x'$ the proposal,
  $p(x)$ the target density and $q$ the proposal density, and $\alpha$ is the
  probability of accepting the proposal.
- In the particle filter, $w_i$ is the weight of particle $i$, $y$ is the
  observation, and $x_{i-1}$ is the state at the step before.
- In the Kalman filter, $\hat x_{k\mid k}$ is the estimate at step $k$ using the
  data up to $k$, $K_k$ is the gain, $P$ is a covariance, $H$ maps state to
  observation, and $R$ is the observation noise covariance.
- In the bootstrap, $\hat\theta^*_b$ is the estimate from resample $b$, $B$ is
  the number of resamples, and $\operatorname{sd}$ is a standard deviation.
- In quadrature, $w(x)$ is the weight function inside the integral, while $w_i$
  and $x_i$ are the quadrature weights and nodes, $n$ of them.
