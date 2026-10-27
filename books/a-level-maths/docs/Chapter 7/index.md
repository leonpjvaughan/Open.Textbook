---
title: 'Chapter 7: Differentiation'
chapter: 7
strand: pure
anchor: How large a box can you fold, and how fast is the balloon growing?
---

# Chapter 7: Differentiation

## The chapter problem: the open box and the rising balloon

A sheet of card measures $16$ cm by $10$ cm. Four equal squares of side $x$ cm
are cut from the corners, and the sides are folded up to make an open box.

The volume $V$ of the box is

$$
V = x(16 - 2x)(10 - 2x).
$$

The largest volume is not at the largest square, and it is not at the smallest.
Calculus finds the exact value of $x$ that gives the greatest volume.

A spherical balloon is inflated for a display. Its volume increases at a steady
rate of $100$ cm$^3$ per second, so

$$
\frac{dV}{dt} = 100.
$$

The radius $r$ grows too. Its rate of growth is linked to the rate at which the
volume grows. Calculus finds $\dfrac{dr}{dt}$ at any radius, and shows how the
rate changes as the balloon swells.

By the end of the chapter you will answer both parts exactly. You will write the
volume of the box as a function of $x$, find where its gradient is zero, and
prove that the point gives a maximum. You will also connect the two rates and
find the speed at which the radius grows when $r = 5$ cm.

> **First contact — no working needed yet.** Look at the box. If $x = 0$ the box
> is flat, and if $x = 5$ the card is cut in two and there is no box. Predict the
> value of $x$ between $0$ and $5$ that gives the greatest volume. Write your
> prediction down before you read on.
>
> Then look at the balloon. It starts small and swells. Predict whether the
> radius grows faster at the start, or later when the balloon is large. Write
> one sentence to explain your prediction.

<details markdown="1">
<summary>If you are not sure where to start</summary>

For the box, work out the volume for a few values of $x$. Try $x = 1$, $x = 2$
and $x = 3$. The largest of the three is closer to the greatest volume, but the
exact value needs calculus.

For the balloon, the volume grows at a steady $100$ cm$^3$ each second. A
balloon of radius $5$ cm holds much more air than one of radius $1$ cm. Adding
the same volume to a large balloon spreads over a bigger surface, so the radius
grows more slowly as the balloon swells.
</details>

## By the end of this chapter you will be able to

- estimate a gradient from a chord that shrinks, and explain the derivative as
  the gradient of the tangent;
- interpret a derivative as a rate of change, and read the notation $f'(x)$ and
  $\dfrac{dy}{dx}$;
- find a derivative from first principles for a whole-number power of $x$;
- differentiate $x^n$ for any rational $n$, with constant multiples, sums and
  differences;
- differentiate $e^{kx}$, $a^{kx}$, $\sin kx$, $\cos kx$, $\tan kx$ and
  $\ln x$;
- find and interpret a second derivative, and describe convex and concave
  sections;
- find stationary points and decide whether each is a maximum or a minimum;
- find the equation of a tangent and of a normal to a curve;
- decide where a function is increasing or decreasing;
- use the product, quotient and chain rules;
- solve connected-rates problems, and differentiate an inverse function;
- differentiate an implicit relation and a parametric curve;
- build a differential equation from a written description.

## Where it is used

Differentiation is the mathematics of change. Engineers use it to design a
container that uses the least material, economists use it to find the price that
gives the greatest profit, and physicists use it for speed and acceleration.
Every rate in a science is a derivative. The rules in this chapter turn a
description of how a quantity changes into an equation, and that equation is
where the next chapter, on integration, begins.

## Your turn to connect it

Think of a quantity that grows or shrinks. It could be the water in a tank, the
charge left in a battery, a savings balance, the height of a plant, or the
temperature of a drink. Write down what you would measure, how fast it changes,
and whether the rate itself changes as the quantity grows.

:::figure relevance-prompt

## Roadmap

1. [7.1 The derivative as a gradient and a rate of change](Section 7.1/Walkthrough/index.md)
2. [7.2 Differentiation from first principles](Section 7.2/Walkthrough/index.md)
3. [7.3 Differentiating powers, exponentials, trigonometric functions and logarithms](Section 7.3/Walkthrough/index.md)
4. [7.4 The second derivative, convexity and points of inflection](Section 7.4/Walkthrough/index.md)
5. [7.5 Tangents, normals, maxima, minima and stationary points](Section 7.5/Walkthrough/index.md)
6. [7.6 Increasing and decreasing functions](Section 7.6/Walkthrough/index.md)
7. [7.7 The product, quotient and chain rules](Section 7.7/Walkthrough/index.md)
8. [7.8 Connected rates of change and inverse functions](Section 7.8/Walkthrough/index.md)
9. [7.9 Implicit and parametric differentiation](Section 7.9/Walkthrough/index.md)
10. [7.10 Constructing differential equations](Section 7.10/Walkthrough/index.md)
11. [Review](Review/index.md)
