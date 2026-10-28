---
title: The product rule
---

# The product rule

If $y = uv$, where $u$ and $v$ are both functions of $x$, then

$$\frac{dy}{dx} = u\frac{dv}{dx} + v\frac{du}{dx}.$$

In words: differentiate the first and keep the second, then keep the first and
differentiate the second, and add the two results.

## Before you start

You need two facts.

- **The derivative is a limit.** The derivative measures a small change in $y$
  against the small change in $x$ that caused it:
  $$\frac{dy}{dx} = \lim_{\delta x \to 0}\frac{\delta y}{\delta x}.$$
- **A sum that tends to a limit.** If one part of an expression tends to a limit
  and another part tends to $0$, the second part disappears in the limit. That is
  what decides the fate of the corner in this proof.

## Predict first

Picture a rectangle with width $u$ and height $v$, so its area is $uv$. Now let
both sides grow: the width grows by $\delta u$ and the height grows by
$\delta v$.

**Before you read on, predict:** is the growth in area the two new strips alone?
One strip runs along the right, the other along the top. Or is something else
there as well? Draw the grown rectangle and look at the corner where the two
strips meet.

:::figure product-rule-rectangle

Now test it. Move each slider and watch the two strips and the corner. Then
explain, in your own words, why the corner shrinks faster than either strip as the
two growths get smaller.

## The proof

The symbol $\delta$ (delta) stands for a small change. Let $x$ change by
$\delta x$. Because $u$ and $v$ both depend on $x$, that makes $u$ change by some
$\delta u$ and $v$ change by some $\delta v$. The changes are linked to
$\delta x$: as $\delta x$ tends to $0$, so do $\delta u$ and $\delta v$.

### The new area

The old rectangle has area

$$uv.$$

The new rectangle has width $u + \delta u$ and height $v + \delta v$, so its area
is the product

$$(u + \delta u)(v + \delta v).$$

Multiply out the brackets, taking every term by every term:

$$(u + \delta u)(v + \delta v) = uv + u\,\delta v + v\,\delta u + \delta u\,\delta v.$$

You can read the four pieces in the figure:

- $uv$ is the original rectangle;
- $v\,\delta u$ is the strip added along the right;
- $u\,\delta v$ is the strip added along the top;
- $\delta u\,\delta v$ is the small corner where those strips meet.

### The change in area

Subtract the old area $uv$:

$$\delta(uv) = (u + \delta u)(v + \delta v) - uv = u\,\delta v + v\,\delta u + \delta u\,\delta v.$$

Both strips are there, and so is the corner. The prediction asked whether the two
strips were the whole change. They are not, and the corner is the missing piece.

### Divide by the change in x

Now do what the definition of the derivative asks: divide the change in $uv$ by
the change in $x$.

$$\frac{\delta(uv)}{\delta x}
= \frac{u\,\delta v + v\,\delta u + \delta u\,\delta v}{\delta x}
= u\frac{\delta v}{\delta x} + v\frac{\delta u}{\delta x} + \delta u\frac{\delta v}{\delta x}.$$

Look closely at the third term. Dividing $\delta u\,\delta v$ by $\delta x$ gives
the $\delta x$ to the $\delta v$, which leaves

$$\delta u \times \frac{\delta v}{\delta x}.$$

That is the corner, still divided by $\delta x$.

### Take the limit

Let $\delta x \to 0$. Each piece does something simple.

- $u$ does not depend on $\delta x$, so it stays $u$;
- $\dfrac{\delta v}{\delta x}$ tends to the derivative $\dfrac{dv}{dx}$;
- $v$ stays $v$, and $\dfrac{\delta u}{\delta x}$ tends to $\dfrac{du}{dx}$;
- $\delta u$ tends to $0$.

Putting those together,

$$\frac{d(uv)}{dx}
= \lim_{\delta x \to 0}\left(u\frac{\delta v}{\delta x} + v\frac{\delta u}{\delta x} + \delta u\frac{\delta v}{\delta x}\right)
= u\frac{dv}{dx} + v\frac{du}{dx} + 0 \times \frac{dv}{dx}.$$

The third term is $0 \times \dfrac{dv}{dx}$, and that is $0$ as long as
$\dfrac{dv}{dx}$ is a finite number, which it is for every function met in this
course. So

$$\frac{d(uv)}{dx} = u\frac{dv}{dx} + v\frac{du}{dx}.$$

That is the product rule.

## Why the corner contributes nothing

This is the step that is usually skipped, so it is worth saying plainly. Compare
the three terms that are left after the division by $\delta x$.

- The strip $v\,\delta u$ was **one** small amount, $\delta u$, multiplied by $v$.
  Dividing by $\delta x$ turns $\dfrac{\delta u}{\delta x}$ into the derivative
  $\dfrac{du}{dx}$. Something survives, because one small length was divided by
  one small length.
- The other strip behaves the same way, with $u$ and $v$ swapped.
- The corner was **two** small amounts, $\delta u$ and $\delta v$, multiplied
  together. The division by $\delta x$ removes one of them. A single factor of
  $\delta u$ is left behind, and $\delta u$ tends to $0$.

Two small lengths cannot outrun one division by a small length, so the corner
tends to $0$ while the strips tend to the two derivatives.

If that is hard to see, watch it in the figure. Shrink the two growths and the
corner takes a smaller and smaller share of the whole change. In the limit the
corner is nothing, and the two strips are everything.

## Check your understanding

1. A rectangle is $8\text{ cm}$ wide and $5\text{ cm}$ tall. The width grows by
   $0.2\text{ cm}$ and the height grows by $0.1\text{ cm}$. Work out the two
   strips and the corner, and check that the three pieces add to the exact change
   in area.
2. Where does the corner term $\delta u\,\delta v$ appear in
   $\dfrac{\delta(uv)}{\delta x}$ after the division by $\delta x$?
3. Use the product rule with $u = x$ and $v = x$ to differentiate $x^2$. What
   does the corner term look like here, and why does it vanish in the limit?

<details markdown="1">
<summary>Answers</summary>

1. The right strip is $5 \times 0.2 = 1\text{ cm}^2$, the top strip is
   $8 \times 0.1 = 0.8\text{ cm}^2$, and the corner is
   $0.2 \times 0.1 = 0.02\text{ cm}^2$. They add to $1.82\text{ cm}^2$. The areas
   are $40$ and $8.2 \times 5.1 = 41.82$, and $41.82 - 40 = 1.82$, so the three
   pieces are the whole change.
2. It becomes $\delta u\,\dfrac{\delta v}{\delta x}$, the corner still divided by
   $\delta x$. As $\delta x \to 0$, the factor $\delta u$ tends to $0$, so the
   whole term tends to $0$.
3. With $u = v = x$, the product rule gives $x \times 1 + x \times 1 = 2x$. The
   corner is $\delta x \times \delta x = (\delta x)^2$, which divided by
   $\delta x$ is $\delta x$, and that tends to $0$.
</details>

## A common error

Do not differentiate a product by differentiating each part and multiplying. The
derivative of $uv$ is **not** $\dfrac{du}{dx} \times \dfrac{dv}{dx}$. Check it on
the simplest case, $u = v = x$: multiplying the derivatives gives
$1 \times 1 = 1$, but the derivative of $x^2$ is $2x$. The rule adds the two
strips together. The corner is what makes the grown rectangle exactly a rectangle,
and the corner is what disappears.
