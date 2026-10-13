---
title: 6.4 Solving equations of the form a^x = b — Learn
chapter: 6
chapter_title: Exponentials and logarithms
section: '6.4'
section_title: Solving equations of the form a^x = b
refs:
- F5
kind: walkthrough
---

# 6.4 Solving equations of the form a^x = b — Learn

**Prerequisites:** the laws of logarithms from Section 6.3; solving a quadratic
by factorising from Chapter 2; the domain of a logarithm.

**By the end of this section you can:** solve $a^x = b$ by taking logarithms;
solve an equation where the exponent is a linear expression; solve a quadratic
equation in $e^x$ or $a^x$; solve a simple logarithmic equation; and check each
answer against the domain.

## 1. Take logarithms of both sides

To solve $a^x = b$, take the logarithm of both sides. The power law then brings
the $x$ down from the exponent, where it can be handled.

Starting from $a^x = b$ and taking natural logarithms:

$$
x\ln a = \ln b, \qquad x = \frac{\ln b}{\ln a}.
$$

This is the change-of-base rule in action: $x = \log_a b$. Any base of logarithm
works, but $\ln$ is the usual choice.

**Example 1.** Solve $3^x = 20$, giving $x$ exactly and to three significant
figures.

Take logarithms: $x\ln 3 = \ln 20$, so

$$
x = \frac{\ln 20}{\ln 3} = 2.7268\ldots \approx 2.73.
$$

**Example 2.** Solve $e^{2x} = 7$.

The natural logarithm undoes the exponential directly:

$$
2x = \ln 7, \qquad x = \frac{\ln 7}{2} \approx 0.973.
$$

Divide by the coefficient of $x$ only at the end.

**Example 3.** Solve $5^{2x-1} = 30$.

Take logarithms of both sides:

$$
(2x - 1)\ln 5 = \ln 30.
$$

Make $2x - 1$ the subject, then solve for $x$:

$$
2x - 1 = \frac{\ln 30}{\ln 5}, \qquad
x = \frac{1}{2}\left(1 + \frac{\ln 30}{\ln 5}\right) \approx 1.557.
$$

## 2. An equation that is a quadratic in disguise

When an equation contains both $a^{2x}$ and $a^{x}$, write $a^{2x} =
\left(a^{x}\right)^2$ and treat $a^x$ as a single unknown. Factorise, then solve
each exponential equation.

**Example 4.** Solve $e^{2x} - 5e^x + 6 = 0$.

Let $u = e^x$. The equation becomes $u^2 - 5u + 6 = 0$, which factorises:

$$
(u - 2)(u - 3) = 0.
$$

So $e^x = 2$ or $e^x = 3$, giving $x = \ln 2 \approx 0.693$ or
$x = \ln 3 \approx 1.099$. Both values are valid, because $e^x$ is positive for
every $x$.

**Example 5.** Solve $2^{2x} - 5\left(2^x\right) + 4 = 0$.

Write $2^{2x} = \left(2^x\right)^2$ and let $u = 2^x$:

$$
u^2 - 5u + 4 = 0, \qquad (u - 1)(u - 4) = 0.
$$

So $2^x = 1$, giving $x = 0$, or $2^x = 4$, giving $x = 2$.

## 3. Solving a logarithmic equation

Reverse the logarithm with its matching exponential. If $\ln x = c$, then
$x = e^c$. If $\log_a x = c$, then $x = a^c$. Always check that the answer lies
in the domain, because a logarithm needs a positive input.

**Example 6.** Solve $\ln(x - 2) = 1$.

The input must be positive, so $x > 2$. Exponentiate both sides:

$$
x - 2 = e^1 = e, \qquad x = e + 2 \approx 4.72.
$$

The answer is greater than $2$, so it lies in the domain.

## Progress check

Return to the cooling coffee in the chapter problem. Its excess temperature is
$E = 60e^{-kt}$, and after $10$ minutes the excess temperature is $45^\circ$C.

1. Substitute $t = 10$ and $E = 45$ to write an equation for $k$.
2. Solve it exactly, and give $k$ to three significant figures.
3. Find the exact time for the excess temperature to fall to $15^\circ$C, and
   give the time in minutes to one decimal place.
4. Explain why the second time is longer than the first, even though the second
   temperature fall is smaller.

> **Watch out.** These mistakes are common.
>
> **Taking the logarithm of a negative number.** The equation $2^x = -8$ has no
> solution, because $2^x$ is positive for every real $x$. A negative number has
> no real logarithm.
>
> **Dividing by the wrong thing.** In $e^{2x} = 7$ the logarithm gives
> $2x = \ln 7$, so $x = \dfrac{\ln 7}{2}$. Dividing by $7$ or subtracting $2$
> gives the wrong answer. Isolate the exponential first.
>
> **Stopping at the quadratic.** After $u^2 - 5u + 6 = 0$ gives $u = 2$ or
> $u = 3$, the equation is not solved. Substitute back: $e^x = 2$ and $e^x = 3$
> still have to be solved for $x$.
>
> **Forgetting the domain.** From $\ln(x - 2) = 1$ you get $x = e + 2$. If a
> candidate made the input zero or negative, it would have to be rejected.
> **Re-check:** substitute the answer into the original logarithm and confirm a
> positive input.

## You should now be able to

- solve $a^x = b$ by taking logarithms of both sides;
- solve an equation where the exponent is a linear expression in $x$;
- recognise $a^{2x}$ as $\left(a^x\right)^2$ and solve the resulting quadratic;
- solve a simple equation involving $\ln$ or $\log_a$;
- check each solution against the domain of the logarithm or exponential.
