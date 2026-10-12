---
title: Completing the square
---

# Completing the square

Adding one number turns $x^2 + bx$ into a perfect square:

$$x^2 + bx + \left(\frac{b}{2}\right)^2 = \left(x + \frac{b}{2}\right)^2$$

The number to add is **half** the coefficient of $x$, squared. This page shows why
that is the number, with a picture you can check and with algebra that holds for
every $b$, so the rule is something you can see rather than something to remember.

## Before you start

You need three facts.

- **Expanding a square:** $(x + k)^2 = x^2 + 2kx + k^2$.
- **The area of a rectangle** is its width times its height.
- **The area of a square** of side $s$ is $s^2$.

## Predict first

The figure starts with a square of side $x$. Two strips are added along the right
and the bottom, each one $\frac{b}{2}$ wide. The strips leave a gap in the corner.

**Before you read on, predict:** what shape fills the gap, and what are its two
side lengths? Write your prediction down. Then read the argument below and check
it against the figure.

:::figure completing-the-square

## The picture

Start with a square of side $x$. Its area is $x^2$.

Now add two rectangles. Put one along the right-hand side and one along the
bottom. Make each rectangle $\frac{b}{2}$ wide, and make it run the full $x$ along
the square.

Each rectangle has area

$$\frac{b}{2} \times x = \frac{bx}{2}.$$

There are two of them, so together they cover

$$2 \times \frac{bx}{2} = bx.$$

The shape so far is the square plus the two strips. Its area is

$$x^2 + bx.$$

The two strips meet at the bottom-right corner, and they leave a small square gap
there. Look at the gap: each side of it is the width of a strip, which is
$\frac{b}{2}$. So the gap is a square of side $\frac{b}{2}$, and its area is

$$\left(\frac{b}{2}\right)^2 = \frac{b^2}{4}.$$

Fill the gap. Now the outline is one big square. Its side is the old side $x$ plus
the strip width $\frac{b}{2}$:

$$\text{side} = x + \frac{b}{2}.$$

That big square is made of exactly the pieces: the square $x^2$, the two strips
$bx$, and the corner $\left(\frac{b}{2}\right)^2$. Add their areas:

$$x^2 + bx + \left(\frac{b}{2}\right)^2.$$

The big square and the pieces are the same shape, so their areas are equal:

$$x^2 + bx + \left(\frac{b}{2}\right)^2 = \left(x + \frac{b}{2}\right)^2.$$

This is the whole reason the number to add is half the coefficient, squared. The
**half** is the width of each strip, because the coefficient $b$ is shared between
two strips. The **square** is the area of the corner that the strips leave behind.

## The same thing in algebra

The picture used positive strips. The algebra does not care about the sign, and it
shows the identity for every $b$ at once.

Expand the right-hand side with the first fact above, $(x + k)^2 = x^2 + 2kx + k^2$,
taking $k = \frac{b}{2}$:

$$\left(x + \frac{b}{2}\right)^2
= x^2 + 2 \cdot \frac{b}{2} \cdot x + \left(\frac{b}{2}\right)^2
= x^2 + bx + \left(\frac{b}{2}\right)^2.$$

The middle term is $2 \cdot \frac{b}{2} \cdot x$. The $2$ cancels the $2$ in the
denominator, leaving $bx$, which is the coefficient the original expression has.
The last term is $\left(\frac{b}{2}\right)^2$, the number the picture called the
area of the corner.

**Why half, and not $b$?** The expansion of a square produces the middle term
*twice*:

$$(x + k)^2 = x^2 + kx + kx + k^2.$$

To make that middle term equal to $bx$, you need $2k = b$, so $k = \frac{b}{2}$.
The picture says the same thing: the coefficient $b$ is shared between the two
rectangles, so each one is $\frac{b}{2}$ wide.

When $b$ is negative, $\frac{b}{2}$ is negative and the strips are taken away
rather than added. The algebra above still holds, because it only ever uses
$\frac{b}{2}$ multiplied by $2$ or by itself, and a square is positive either way.

## Completing the square with a constant

Most expressions also have a constant term, $x^2 + bx + c$. Add the corner and
take it away again, so the value does not change:

$$x^2 + bx + c
= \left(x + \frac{b}{2}\right)^2 - \left(\frac{b}{2}\right)^2 + c
= \left(x + \frac{b}{2}\right)^2 + \left(c - \frac{b^2}{4}\right).$$

The bracket is the perfect square. The constant left over, $c - \frac{b^2}{4}$, is
the correction for adding a corner the expression did not have. Nothing new is
happening: you added $\left(\frac{b}{2}\right)^2$ and then subtracted it.

## Check your understanding

1. What number do you add to $x^2 + 10x$ to make a perfect square? Write the
   perfect square as well.
2. Expand $(x - 5)^2$. What number do you add to $x^2 - 10x$ to make a perfect
   square?
3. In the picture the two strips together have area $bx$, even though each strip
   is only $\frac{b}{2}$ wide. Explain why.

<details markdown="1">
<summary>Answers</summary>

1. Half of $10$ is $5$, and $5^2 = 25$. Add $25$:
   $x^2 + 10x + 25 = (x + 5)^2$.
2. $(x - 5)^2 = x^2 - 10x + 25$, so add $25$. The coefficient is negative, but
   the number added is $(-5)^2 = 25$, which is positive.
3. Each strip has area $\frac{b}{2} \times x = \frac{bx}{2}$, and there are two
   strips, so together they have area $\frac{bx}{2} + \frac{bx}{2} = bx$. The
   coefficient $b$ is shared between the two strips.
</details>

## A common error

The number you add is the **square** of half the coefficient. It is not
$\frac{b}{2}$ itself.

For $x^2 + 6x$, half of $6$ is $3$, and the number to add is $9$:

$$x^2 + 6x + 9 = (x + 3)^2.$$

Adding $3$ instead gives $x^2 + 6x + 3$, which is not a square.

The other trap is the sign inside the bracket. Half of $-6$ is $-3$, so the
bracket is $(x - 3)^2$, not $(x + 3)^2$. Expand to check:
$(x - 3)^2 = x^2 - 6x + 9$, which matches.
