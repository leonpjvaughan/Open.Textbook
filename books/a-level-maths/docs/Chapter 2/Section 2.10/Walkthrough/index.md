---
title: 2.10 Composite and inverse functions — Learn
chapter: 2
chapter_title: Algebra and functions
section: '2.10'
section_title: Composite and inverse functions
dfe:
- B8
- OT1
kind: walkthrough
---

# 2.10 Composite and inverse functions — Learn

**Prerequisites:** substituting into an expression; rearranging a formula;
solving a modulus equation from 2.9; the graph of $y = x$.

**By the end of this section you can:** use function notation and state a domain
and a range; form a composite function and explain why order matters; decide
whether a function has an inverse; and find an inverse by rearranging, including
after restricting the domain.

## 1. Function language

A **function** is a rule that turns each allowed input into exactly one output.
The set of allowed inputs is the **domain**, and the set of outputs is the
**range**.

$$
f(x) = 2x + 3
$$

has the whole real line as its domain and the whole real line as its range.

A function is **one-to-one** when different inputs always give different outputs.
Only a one-to-one function can be reversed, because the reverse rule must give a
single answer for each output.

## 2. Composite functions

A **composite function** applies one function and then another. The notation
$f(g(x))$, often written $fg(x)$, means "apply $g$ first, then $f$".

**Example 1.** Given $f(x) = 3x + 1$ and $g(x) = x^2$, find $f(g(x))$ and
$g(f(x))$.

Substitute $g(x)$ into $f$:

$$
f(g(x)) = 3\left(x^2\right) + 1 = 3x^2 + 1.
$$

Substitute $f(x)$ into $g$:

$$
g(f(x)) = (3x + 1)^2 = 9x^2 + 6x + 1.
$$

The two answers are different, so $f(g(x))$ and $g(f(x))$ are not the same. The
order of the functions matters. Work from the inside out.

The domain of a composite is the set of inputs allowed by the first function
applied, and then by the second. If $g(x) = \sqrt{x}$ and $f(x) = x - 3$, then
$f(g(x)) = \sqrt{x} - 3$ needs $x \geq 0$.

## 3. Inverse functions

The **inverse function** $f^{-1}$ undoes $f$. If $f$ sends $a$ to $b$, then
$f^{-1}$ sends $b$ back to $a$. Composing a function with its inverse returns the
input:

$$
f^{-1}(f(x)) = x \qquad \text{and} \qquad f(f^{-1}(x)) = x.
$$

To find an inverse, write $y = f(x)$, make $x$ the subject, then swap the letters.

**Example 2.** Find the inverse of $f(x) = 3x - 2$.

Write $y = 3x - 2$. Add $2$:

$$
y + 2 = 3x.
$$

Divide by $3$:

$$
x = \frac{y + 2}{3}.
$$

Swap the letters to name the inverse as a function of $x$:

$$
f^{-1}(x) = \frac{x + 2}{3}.
$$

Check: $f^{-1}(f(x)) = \frac{(3x - 2) + 2}{3} = \frac{3x}{3} = x$.

**Example 3.** Find the inverse of $f(x) = \dfrac{x + 1}{x - 2}$, where
$x \neq 2$.

Write $y = \frac{x + 1}{x - 2}$ and multiply both sides by $x - 2$:

$$
y(x - 2) = x + 1.
$$

Expand and collect the $x$ terms on one side:

$$
yx - 2y = x + 1, \qquad yx - x = 2y + 1, \qquad x(y - 1) = 2y + 1.
$$

Divide by $y - 1$:

$$
x = \frac{2y + 1}{y - 1}.
$$

Swap the letters:

$$
f^{-1}(x) = \frac{2x + 1}{x - 1}, \qquad x \neq 1.
$$

## 4. The graph of an inverse

The graph of $y = f^{-1}(x)$ is the graph of $y = f(x)$ reflected in the line
$y = x$. The reflection swaps the two coordinates, which is exactly what
reversing a function does. The domain of $f^{-1}$ is the range of $f$, and the
range of $f^{-1}$ is the domain of $f$.

**Example 4.** The function $f(x) = x^2$ has domain $x \geq 0$. Find its inverse.

Write $y = x^2$. Then $x = \pm\sqrt{y}$. The domain $x \geq 0$ selects the
positive root, so $x = \sqrt{y}$. Swap the letters:

$$
f^{-1}(x) = \sqrt{x}, \qquad x \geq 0.
$$

Without the restriction, $f(x) = x^2$ has no inverse: $f(2) = f(-2) = 4$, so the
reverse rule would not know whether to return $2$ or $-2$.

> **Watch out.** Two errors appear again and again.
>
> **Treating $fg$ as a product.** $fg(x)$ means $f(g(x))$, not $f(x) \times g(x)$.
>
> **Assuming every function has an inverse.** A function must be one-to-one.
> $f(x) = x^2$ is not, so restrict its domain; a function such as $f(x) = x^3$ is
> one-to-one already.
>
> **Re-check:** after finding an inverse, compose both ways. Both compositions
> must give $x$ on the allowed domain.

## 5. Try it: reflecting a graph in $y = x$

**Predict first.** The figure draws the line $y = f(x)$ and its reflection in
the line $y = x$. Before you touch the sliders, choose a point on the line, read
its two coordinates, and predict the coordinates of its image. Write the
prediction down.

:::figure ch2-inverse-reflection

**Test.** Move the slider for the position of $P$ along the graph, and watch the
image. Then change the gradient and the intercept of $f$, and watch both lines
move together.

**Explain.** Write two sentences saying why the image of the point $(p, q)$ is
$(q, p)$, and why the reflected graph is the graph of the inverse function.

## Progress check

Return to the chapter problem. The height of the arch at a distance $x$ from the
centre is

$$
h(x) = 4 - \frac{x^2}{4}, \qquad -4 \leq x \leq 4.
$$

1. State the domain and the range of $h$.
2. Show that $h$ is not one-to-one by comparing $h(2)$ and $h(-2)$.
3. Restrict the domain to $0 \leq x \leq 4$ and find the inverse function
   $h^{-1}$.
4. Use the inverse to find the distance from the centre at which the arch is
   $3.2$ m high. Compare your answer with the interval you found in 2.6.

## You should now be able to

- use function notation and state a domain and a range;
- form a composite function and explain why order matters;
- decide whether a function is one-to-one and so has an inverse;
- find an inverse by rearranging and swapping the letters;
- restrict a domain to make an inverse possible;
- state the domain and range of an inverse.
