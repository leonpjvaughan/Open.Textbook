---
title: 'Chapter 6: Review'
chapter: 6
kind: review
---

# Chapter 6: Review

## The chapter problem, solved

**The cooling coffee.** The temperature after $t$ minutes is

$$T(t) = 20 + 70(0.5)^{t/5}.$$

The coffee is comfortable at $50^\circ C$. Find the time.

**The domain and range.** Time starts at the pour, so the domain is $t \ge 0$. The coffee
starts at $T(0) = 90$ and cools towards the room temperature, so the range is
$20 < T \le 90$. The value $20$ is never reached.

**The function is injective.** As $t$ increases, $(0.5)^{t/5}$ decreases, so $T$ decreases.
The temperature never repeats a value, so two different times give two different
temperatures. The function is injective on $t \ge 0$.

**The function is bijective onto its range.** Every temperature between $20^\circ C$ and
$90^\circ C$ is reached at some time, so $T$ is surjective onto $(20, 90]$. With
injectivity, $T$ is bijective from $[0, \infty)$ onto $(20, 90]$. That is why the inverse
is a function.

**The inverse rule.** Put $T = 20 + 70(0.5)^{t/5}$ and solve for $t$:

$$(0.5)^{t/5} = \frac{T - 20}{70} \qquad t = 5\log_{0.5}\!\left(\frac{T - 20}{70}\right).$$

**The transformations.** The graph comes from $y = (0.5)^t$ by a horizontal stretch of
factor $5$, a vertical stretch of factor $70$, and a shift up by $20$. The horizontal
asymptote is $T = 20$, the room temperature.

**The time.** Put $T = 50$:

$$(0.5)^{t/5} = \frac{30}{70} = \frac{3}{7} \qquad
t = 5\,\frac{\log(3/7)}{\log 0.5} = 6.11\dots$$

The coffee reaches $50^\circ C$ after about $6.11$ minutes.

**The check.** Put $t = 6.11$ back into the rule:
$T = 20 + 70(0.5)^{1.222} = 20 + 29.995 = 49.995$. The temperature is $50^\circ C$ to the
nearest whole number, so the answer checks.

## Mixed practice — choose the method first

Work through these without notes. For each one, decide **what is being asked** and say why,
before you calculate. Two of them come from earlier chapters, and two are deliberately
questions where the obvious first move is wrong.

1. Is $\{(1, 2), (2, 2), (3, 4)\}$ a function? Give a reason.
2. State the domain of $f(x) = \dfrac{1}{x + 2}$ and the domain of $g(x) = \sqrt{x - 1}$.
3. For $f(x) = 4x - 1$ and $g(x) = x + 2$, work out $f(g(3))$ and $g(f(3))$.
4. Find the inverse of $f(x) = 4x - 1$.
5. Show that $f(x) = x^2$ is not injective on the real numbers. Is it injective on $x \le 0$?
6. Describe the transformations that turn $y = x^2$ into $y = 3(x - 1)^2 - 2$.
7. Solve $4^x = 64$, then solve $3^x = 15$ to three significant figures.
8. Simplify $\log 6 + \log 2$ into a single logarithm.
9. Solve $3x - 7 = 11$.
10. Simplify $\dfrac{5^2 \times 5^3}{5^4}$.

## What you can now do

- decide whether a relation is a function, and use the vertical line test;
- write the domain and range of a function, and use function notation;
- evaluate a function and form a composite function;
- find an inverse function and check it by composing;
- explain what injective, surjective and bijective mean, and why an inverse needs a
  bijection;
- shift, stretch and reflect the graph of a function;
- sketch an exponential graph, use logarithms, and solve $a^x = b$;
- answer the chapter problem and say what each step means.

## Thinking back

Look at the quantity you chose at the start of the chapter — a cooling drink, a warming
room, a charging phone, a draining sink.

Write down its function. Decide whether it grows or decays, and write it in the form
$A(t) = c + k a^t$. State its domain, its range and its horizontal asymptote.

Then answer the question you started with: how long until it reaches a chosen value? If the
quantity settles at a value, say what that value is and why the rule never passes it. If it
does not settle, say that too, and explain what the graph does instead. Saying why a model
does not fit is part of the mathematics, and it is often more useful than forcing it to fit.
