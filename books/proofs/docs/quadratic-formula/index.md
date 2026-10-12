---
title: The quadratic formula
---

# The quadratic formula

A quadratic equation $ax^2 + bx + c = 0$ has the solutions

$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$

Every course hands this over to be used. Here is where it comes from: it is
**completing the square**, carried out once with letters instead of numbers, so
that the answer works for every quadratic at once.

## Before you start

You need to be able to complete the square, because that is the whole method. If
$x^2 + 6x + 2 = 0$, you write the left side as $(x + 3)^2 - 7$ and solve from
there. The only difference below is that the numbers are $a$, $b$ and $c$.

## Predict first

**Before reading on, predict:** the formula divides by $2a$, so it breaks when
$a = 0$. What kind of equation is $ax^2 + bx + c = 0$ when $a = 0$? Work that out
first, then read the proof and see where it is assumed.

## The proof

Start with the general quadratic equation and $a \neq 0$:

$$ax^2 + bx + c = 0$$

**Step 1: divide by $a$.** This is where $a \neq 0$ is needed — you cannot divide
by zero. Dividing turns the leading coefficient into $1$, which is what completing
the square wants:

$$x^2 + \frac{b}{a}x + \frac{c}{a} = 0$$

**Step 2: move the constant to the other side.**

$$x^2 + \frac{b}{a}x = -\frac{c}{a}$$

**Step 3: complete the square.** Take half of the coefficient of $x$, which is
$\dfrac{b}{2a}$, and square it: $\dfrac{b^2}{4a^2}$. Add it to both sides:

$$x^2 + \frac{b}{a}x + \frac{b^2}{4a^2} = \frac{b^2}{4a^2} - \frac{c}{a}$$

The left side is now a perfect square, by construction:

$$\left(x + \frac{b}{2a}\right)^2 = \frac{b^2}{4a^2} - \frac{c}{a}$$

**Step 4: put the right side over one denominator.** The common denominator is
$4a^2$, so multiply the second fraction by $\dfrac{4a}{4a}$:

$$\left(x + \frac{b}{2a}\right)^2 = \frac{b^2 - 4ac}{4a^2}$$

**Step 5: take the square root of both sides.** A square has two square roots, one
positive and one negative, and that is where the $\pm$ comes from:

$$x + \frac{b}{2a} = \pm\frac{\sqrt{b^2 - 4ac}}{2a}$$

**Step 6: subtract $\dfrac{b}{2a}$ from both sides.** The two fractions already
share the denominator $2a$:

$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$

That is the formula.

## What the proof tells you for free

**The discriminant is a square root.** The quantity $b^2 - 4ac$ sits under a square
root, so its sign decides how many solutions there are: positive gives two,
zero gives one, negative gives none. That is not an extra rule to learn — it is the
shape of the answer.

**Why the formula fails when $a = 0$.** Step 1 divides by $a$. When $a = 0$ the
equation is $bx + c = 0$, which is a straight line with one solution, not a
quadratic. The formula was never meant to apply, and it says so by breaking.

**Why you can divide by $2a$ at the end.** The proof assumes $a \neq 0$ throughout,
so $2a \neq 0$ and the division is allowed.

## Check your understanding

1. Why is the $\pm$ there? Answer in terms of the step it appears in, not by
   quoting the formula.
2. Use the formula on $2x^2 - 7x + 3 = 0$ and check one root by substituting it.
3. The proof completes the square by adding $\dfrac{b^2}{4a^2}$ to both sides.
   Where did that expression come from?

<details markdown="1">
<summary>Answers</summary>

1. It appears when taking a square root in Step 5. Every positive number has two
   square roots, so the equation $\text{(something)}^2 = k$ has two solutions
   whenever $k > 0$.
2. $a = 2$, $b = -7$, $c = 3$, so $b^2 - 4ac = 49 - 24 = 25$ and
   $x = \dfrac{7 \pm 5}{4}$, giving $x = 3$ or $x = \tfrac{1}{2}$. Check:
   $2(3)^2 - 7(3) + 3 = 18 - 21 + 3 = 0$.
3. The coefficient of $x$ is $\dfrac{b}{a}$. Completing the square always uses half
   of that coefficient squared, and half of $\dfrac{b}{a}$ is $\dfrac{b}{2a}$, whose
   square is $\dfrac{b^2}{4a^2}$.
</details>

## A common error

The formula applies to $ax^2 + bx + c = 0$ **with the terms collected and in that
order**. If the equation arrives as $3 + 2x^2 = 7x$, rearrange it to
$2x^2 - 7x + 3 = 0$ before reading off $a$, $b$ and $c$ — and take the sign of
$b$ with the term, because a negative $b$ is the most common way to lose a mark.
