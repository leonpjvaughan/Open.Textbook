---
title: 7.2 Differentiation from first principles — Learn
chapter: 7
chapter_title: Differentiation
section: '7.2'
section_title: Differentiation from first principles
dfe:
- G1
kind: walkthrough
---

# 7.2 Differentiation from first principles — Learn

**Prerequisites:** expanding brackets such as $(x + h)^2$; simplifying an
algebraic fraction; the limit definition of the derivative from Section 7.1.

**By the end of this section you can:** use the definition
$f'(x) = \lim_{h \to 0} \dfrac{f(x + h) - f(x)}{h}$ to differentiate a
whole-number power of $x$; carry out the four steps of the method in order; and
explain why $h$ is not set to zero until the division is complete.

## 1. The definition, one more time

Section 7.1 introduced the derivative as the limit of a chord gradient:

$$
f'(x) = \lim_{h \to 0} \frac{f(x + h) - f(x)}{h}.
$$

Differentiating from first principles means working out this limit with algebra,
not with a table of numbers. Four steps do the job every time.

1. Write down $f(x + h)$.
2. Subtract $f(x)$.
3. Divide by $h$.
4. Let $h$ tend to zero.

The order matters. Step 3 must happen before step 4, because $h$ appears in the
denominator.

**Example 1.** Differentiate $f(x) = x^2$ from first principles.

Write $f(x + h) = (x + h)^2 = x^2 + 2xh + h^2$.

Subtract $f(x) = x^2$:

$$
f(x + h) - f(x) = x^2 + 2xh + h^2 - x^2 = 2xh + h^2.
$$

Divide by $h$:

$$
\frac{f(x + h) - f(x)}{h} = \frac{2xh + h^2}{h} = 2x + h.
$$

The division is safe because $h \neq 0$ while we take the limit. Let $h \to 0$:

$$
f'(x) = \lim_{h \to 0}(2x + h) = 2x.
$$

So the derivative of $x^2$ is $2x$. At $x = 2$ this gives $4$, which agrees with
the estimate in Section 7.1.

**Example 2.** Differentiate $f(x) = x^3$ from first principles.

Expand $(x + h)^3$ using the binomial expansion:

$$
f(x + h) = x^3 + 3x^2h + 3xh^2 + h^3.
$$

Subtract $f(x) = x^3$:

$$
f(x + h) - f(x) = 3x^2h + 3xh^2 + h^3.
$$

Divide by $h$:

$$
\frac{3x^2h + 3xh^2 + h^3}{h} = 3x^2 + 3xh + h^2.
$$

Let $h \to 0$. Every term still containing $h$ vanishes:

$$
f'(x) = 3x^2.
$$

## 2. A constant multiple and a sum

The method works just as well when the function has more than one term.

**Example 3.** Differentiate $f(x) = x^2 + x$ from first principles.

$$
f(x + h) = (x + h)^2 + (x + h) = x^2 + 2xh + h^2 + x + h.
$$

Subtract $f(x) = x^2 + x$:

$$
f(x + h) - f(x) = 2xh + h^2 + h.
$$

Divide by $h$:

$$
\frac{2xh + h^2 + h}{h} = 2x + h + 1.
$$

Let $h \to 0$:

$$
f'(x) = 2x + 1.
$$

**Example 4.** A constant function has a horizontal graph. Differentiate
$f(x) = 7$ from first principles.

Here $f(x + h) = 7$ for every $h$, so $f(x + h) - f(x) = 7 - 7 = 0$. Dividing by
$h$ gives $0$. The limit is $0$, so $f'(x) = 0$. A horizontal line has gradient
zero.

The same argument gives the derivative of any constant: it is zero.

## 3. Differentiating sine and cosine from first principles

The same definition gives the derivatives of $\sin x$ and $\cos x$. Use the
addition formula from Chapter 5:

$$
\sin(x + h) = \sin x\cos h + \cos x\sin h.
$$

Then

$$
\frac{\sin(x + h) - \sin x}{h}
= \sin x \cdot \frac{\cos h - 1}{h} + \cos x \cdot \frac{\sin h}{h}.
$$

As $h$ tends to zero, $\dfrac{\sin h}{h}$ tends to $1$ and
$\dfrac{\cos h - 1}{h}$ tends to $0$. Therefore

$$
\frac{d}{dx}(\sin x) = \cos x.
$$

A similar argument starting from $\cos(x + h) = \cos x\cos h - \sin x\sin h$
gives

$$
\frac{d}{dx}(\cos x) = -\sin x.
$$

The minus sign often goes missing. Section 7.3 uses these results in
calculations.

> **Watch out.** Three mistakes are common in this method.
>
> **Setting $h = 0$ before dividing.** If you put $h = 0$ into
> $f(x + h) - f(x)$ you get $0$, and then $\dfrac{0}{0}$ is meaningless. Divide
> by $h$ first, cancel it, and only then let $h$ tend to zero.
>
> **Expanding $(x + h)^n$ as $x^n + h^n$.** The bracket is a sum, not a product.
> For example, $(x + h)^2 = x^2 + 2xh + h^2$, and the middle term is essential.
> Use the binomial expansion or multiply out carefully.
>
> **Forgetting a term after dividing.** Every term that still contains $h$ goes
> to zero in the limit. In Example 2 the terms $3xh$ and $h^2$ both vanish,
> leaving only $3x^2$. **Re-check:** after taking the limit, no $h$ should remain
> in the answer.

## You should now be able to

- state the definition of the derivative as a limit;
- write down $f(x + h)$ for a polynomial;
- carry out the four steps of differentiation from first principles;
- differentiate $x^2$, $x^3$ and simple sums and multiples this way;
- explain why the constant function has derivative zero;
- state the derivatives of $\sin x$ and $\cos x$ from first principles.
