---
title: Knowing the answer is right
---
# Knowing the answer is right

## What this page answers

A solver returns a number. This page asks what evidence makes that number
believable when the answer is unknown, and what evidence does not. It settles
the question every symptom on the map raises: the residual is small, so why is
the answer wrong?

The short answer is that a residual measures the equation, and an error measures
the answer. The two are related by the conditioning of the problem, and they are
not the same thing.

## The mathematics

For a linear system $Ax=b$ with computed solution $\hat x$ , the **residual** is

$$ r = b - A\hat x. $$

It is computable, and for that reason it is the first thing a solver reports.
But

$$ \hat x - x = A^{-1}r, $$

so the error is the residual passed through $A^{-1}$ . Taking norms,

$$ \|\hat x - x\| \le \|A^{-1}\|\,\|r\|, $$

and dividing by $\|x\|$ gives the bound from the previous page,

$$ \frac{\|\hat x-x\|}{\|x\|} \le \kappa(A)\, \frac{\|r\|}{\|b\|}. $$

A residual of $10^{-13}$ with a condition number of $10^6$ permits an error of
$10^{-7}$ . Both numbers are true, and only the second is about the answer.

### Three kinds of check

**A manufactured solution.** Choose an answer you know, substitute it into the
equation to compute the source term that would produce it, then solve the
discrete problem and compare. The comparison is exact because the answer was
chosen. The check tests the code and the discretisation, not the model.

**Grid convergence.** Solve on two or three grids and measure the observed
order, as the previous page does. A method that is second order on a smooth
manufactured solution and first order on the real data has a kink or a boundary
error, and the table says so.

**Agreement between methods.** Two independent methods agreeing is evidence, but
only if their errors are independent. Two implementations of the same formula
agree because they share the mistake. A direct solve and an iterative solve are
independent enough to be worth comparing; two runs of the same code are not.

### Verification and validation

**Verification** asks whether the equations are solved correctly. A manufactured
solution and a convergence table are verification.

**Validation** asks whether the equations describe the world. No amount of
convergence answers that. A model can be verified to machine precision and still
be the wrong model, which is why the agreement panels in `Maths Applied` compare
two models rather than one model with itself.

**The check.** The 2-by-2 system below has condition number about $10^6$ . A
perturbation of $10^{-10}$ in one entry of $b$ produces a relative error of
$10^{-7}$ while the relative residual is $10^{-13}$ . The residual is four
orders smaller than the answer's error, and the bound is the bridge between
them.

## The code

The program solves the system twice, perturbs one entry of $b$ , and prints the
condition number, the relative residual and the relative error.

```python
import sympy as sp

A = sp.Matrix([[1.0, 1000.0], [0.0, 1.0]])
b = sp.Matrix([1000.0, 1.0])
exact = A.solve(b)
perturbed = A.solve(b + sp.Matrix([0.0, 1e-10]))
error = perturbed - exact
residual = b - A * perturbed
kappa = A.norm(ord=sp.oo) * A.inv().norm(ord=sp.oo)
ratio = residual.norm() / b.norm()
error_ratio = error.norm() / exact.norm()
print(f"condition number  {float(kappa):.1e}")
print(f"relative residual {float(ratio):.1e}")
print(f"relative error    {float(error_ratio):.1e}")
print(f"bound             {float(kappa * ratio):.1e}")
```

```text
condition number  1.0e+06
relative residual 1.0e-13
relative error    1.0e-07
bound             1.0e-07
```

The residual is small, the error is not, and the bound predicts the error. A
solver that reported only the residual would have called this answer good.

## The theory

The bound is sharp in the worst case but often loose in practice. It is still
the right first check, because it needs no exact answer. It also separates two
causes: a large residual is a solver problem, and a small residual with a large
error is a conditioning problem.

The manufactured-solution method is the standard verification test in
computational fluid dynamics and in numerical software. Its limitation is that
it tests the code against a solution the author chose, so it can miss a defect
shared by the code and the manufactured solution. Grid convergence and method
comparison cover that gap from different directions.

The residual itself can be computed in the wrong norm. A residual that is small
in the infinity norm and large in the energy norm is a real possibility for a
symmetric problem. The norm has to match the quantity a reader cares about.
This is the same rule the tolerance page states: a norm, a scale, and a reason.

Roache's *Verification and Validation in Computational Science and Engineering*
is the source for the manufactured-solution method and for the distinction
between the two words. The convergence argument is in LeVeque, and the
condition-number bound is in Trefethen and Bau.

## What this cost

A residual costs one matrix-vector product. A manufactured solution costs one
solve, plus the work of deriving the source term. A three-grid convergence study
costs three solves. A condition-number estimate costs a factorisation or an
iterative estimate of comparable cost.

The evidence is not free, but it is cheap relative to trusting a wrong answer.

What it will not do: it will not tell you that the model is right. Verification
and validation are different questions, and only the second one involves the
world.

## Back to the map

[Home](../index.md) is the summary this page works under.
[Error, and what a tolerance is](../error/index.md) gives the bound this page
uses. [Convergence, and how to measure it](../order/index.md) is how a
manufactured solution becomes a table.
