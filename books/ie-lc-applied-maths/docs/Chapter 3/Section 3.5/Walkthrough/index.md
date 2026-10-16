---
title: 3.5 The fundamental theorem of calculus — Learn
chapter: 3
chapter_title: Describing motion
section: '3.5'
section_title: The fundamental theorem of calculus
tier: O
refs:
- S3
kind: walkthrough
---

# 3.5 The fundamental theorem of calculus — Learn

**Prerequisites:** Section 3.3, the area under a velocity–time graph; Section
3.4, differentiating a power of $t$.

**Objectives:** integrate a power of $t$; evaluate a definite integral; state
the fundamental theorem of calculus; find a displacement as the integral of a
velocity.

Section 3.3 found a displacement by measuring the area under a graph. This
section finds the same number from a formula, and the two ideas turn out to be
the same idea.

## Integration reverses differentiation

An **antiderivative** of a function is a function whose derivative is the one
you started with. Finding it is called **integration**.

The rule for a power of $t$ is the reverse of the differentiation rule:

$$\int t^n\,dt = \frac{t^{n+1}}{n+1} + C.$$

Raise the power by one, then divide by the new power. The letter $C$ stands for
any constant, because a constant has derivative zero.

**Example 1.** Find $\displaystyle\int 6t\,dt$.

$$\int 6t\,dt = \frac{6t^2}{2} + C = 3t^2 + C$$

**Example 2.** Find $\displaystyle\int (6t + 2)\,dt$.

Integrate term by term:

$$\int (6t + 2)\,dt = 3t^2 + 2t + C$$

## The fundamental theorem of calculus

A **definite integral** has two limits, a lower one and an upper one. It gives a
single number, and it is the area under the graph between those limits.

The **fundamental theorem of calculus** connects the two ideas. If $F$ is any
antiderivative of $f$, then

$$\int_a^b f(t)\,dt = F(b) - F(a).$$

To evaluate a definite integral: find an antiderivative, substitute the upper
limit, substitute the lower limit, and subtract.

**Example 3.** Evaluate $\displaystyle\int_1^3 (4t + 3)\,dt$.

An antiderivative is $F(t) = 2t^2 + 3t$.

$$F(3) = 18 + 9 = 27$$

$$F(1) = 2 + 3 = 5$$

$$\int_1^3 (4t + 3)\,dt = 27 - 5 = 22$$

## Displacement as the integral of velocity

Velocity is the derivative of displacement. Turning that round, displacement is
the integral of velocity.

$$s = \int v\,dt$$

Between two times, the displacement is the definite integral of the velocity:

$$s = \int_a^b v\,dt.$$

This is exactly the area under the velocity–time graph from Section 3.3. Where
the velocity is negative, the integral is negative too, so that part reduces the
displacement.

**Example 4.** A particle has velocity $v = 12 - 3t$ m/s. Find its displacement
between $t = 0$ s and $t = 4$ s.

$$\int_0^4 (12 - 3t)\,dt = \left[12t - \frac{3t^2}{2}\right]_0^4$$

$$= (48 - 24) - 0$$

$$= 24\,\text{m}$$

> **Watch out.** Two errors cause most of the trouble. The first is putting the
> limits the wrong way round: the value at the upper limit comes first, so it is
> $F(b) - F(a)$. Reversing them changes the sign of the answer. The second is
> using a definite integral to find a distance when the velocity changes sign.
> The integral gives the displacement, and a negative part cancels a positive
> one. To find the distance, split the time at each moment the velocity is zero,
> integrate each part, and add the sizes.

## Progress check

Back to the chapter problem. The ball's vertical velocity is
$v = 10 - 9.8t$ m/s.

Integrate to find the height at time $T$:

$$\int_0^T (10 - 9.8t)\,dt = \left[10t - 4.9t^2\right]_0^T =
\underline{\hspace{2cm}}$$

Now substitute two times.

- At $T = 1.02$ s, the height is $10(1.02) - 4.9(1.02)^2 =
  \underline{\hspace{2cm}}$ m. That is the greatest height.
- At $T = 2.04$ s, the height is $10(2.04) - 4.9(2.04)^2 =
  \underline{\hspace{2cm}}$ m. That is the moment the ball returns to the
  ground.

The first answer is about $5.1$ m and the second is $0$ m. Section 3.8 uses the
second time to find the range.

## You should now be able to

- integrate a power of $t$ and a sum of powers;
- explain why an indefinite integral carries a constant $C$;
- state the fundamental theorem of calculus;
- evaluate a definite integral between two limits;
- find a displacement by integrating a velocity;
- explain why a definite integral gives a displacement and not a distance.
