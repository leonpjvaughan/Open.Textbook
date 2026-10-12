---
title: Differentiating x to the n from first principles
---

# Differentiating x to the n from first principles

The derivative of $x^n$ is

$$\frac{d}{dx}\left(x^n\right) = n x^{n-1}.$$

Raising the power by one brings the **old power** down in front, multiplied by
$x$ raised to **one less** than before. This page proves that from the definition
of the derivative, for every positive whole number $n$.

## Before you start

You need three facts.

- **The derivative is a limit.** The gradient of $y = f(x)$ at a point is
  $$f'(x) = \lim_{h \to 0} \frac{f(x + h) - f(x)}{h}.$$
- **The binomial expansion** of $(x + h)^n$, for a positive whole number $n$:
  $$(x + h)^n = x^n + n x^{n-1} h + \binom{n}{2} x^{n-2} h^2 + \cdots + n x h^{n-1} + h^n.$$
- **A sum of terms that tend to limits.** If a quantity is a finite sum of terms,
  and each term tends to a limit, then the whole sum tends to the sum of those
  limits. In particular, any term carrying a factor of $h$ tends to $0$ as
  $h \to 0$.

## Predict first

The rule says the derivative of $x^4$ is $4x^3$. Expanding the bracket gives

$$(x + h)^4 = x^4 + 4x^3h + 6x^2h^2 + 4xh^3 + h^4.$$

**Before you do any algebra, predict:** after you subtract $x^4$, how many of the
four remaining terms still carry an $h$? Then predict what the division by $h$
does to each of them, and which single term survives the limit.

## The proof

Do the case $n = 3$ in full first, then repeat the same steps with $n$ left as a
letter. The second run holds no new ideas; it is the first run with more letters
in it.

### The case n = 3

Take $f(x) = x^3$. First principles gives four steps: expand, subtract, divide,
then let $h \to 0$.

**Expand.** The binomial expansion of a cube is

$$f(x + h) = (x + h)^3 = x^3 + 3x^2h + 3xh^2 + h^3.$$

**Subtract.** Since $f(x) = x^3$, the $x^3$ at the front cancels:

$$f(x + h) - f(x) = 3x^2h + 3xh^2 + h^3.$$

**Divide by $h$.** Every term on the right carries at least one factor of $h$, so
the division is exact:

$$\frac{f(x + h) - f(x)}{h} = 3x^2 + 3xh + h^2.$$

**Take the limit.** As $h \to 0$, the terms $3xh$ and $h^2$ both tend to $0$,
while $3x^2$ does not change:

$$f'(x) = \lim_{h \to 0}\left(3x^2 + 3xh + h^2\right) = 3x^2.$$

Notice where the $3x^2$ came from. It is the term $3x^2h$, the only term after
$x^3$ that carried exactly one factor of $h$. Dividing by $h$ removed that single
$h$ and left $3x^2$ standing.

### The case with n left as a letter

Now take $f(x) = x^n$, where $n$ is a positive whole number. The binomial
expansion is

$$(x + h)^n = x^n + n x^{n-1} h + \binom{n}{2} x^{n-2} h^2 + \cdots + n x h^{n-1} + h^n.$$

The coefficients are the binomial coefficients, so the coefficient of $h$ is
$\binom{n}{1} = n$, and the last term is $\binom{n}{n}h^n = h^n$.

**Subtract** $f(x) = x^n$. The $x^n$ at the front cancels:

$$f(x + h) - f(x) = n x^{n-1} h + \binom{n}{2} x^{n-2} h^2 + \cdots + n x h^{n-1} + h^n.$$

**Every term on the right carries a factor of $h$.** The first carries one, the
next carries $h^2$, and this continues down to $h^n$. Nothing is left without an
$h$. That is the whole reason the division works, so take out the common factor
$h$:

$$f(x + h) - f(x) = h\left(n x^{n-1} + \binom{n}{2} x^{n-2} h + \cdots + n x h^{n-2} + h^{n-1}\right).$$

**Divide by $h$.** The factor $h$ cancels:

$$\frac{f(x + h) - f(x)}{h} = n x^{n-1} + \binom{n}{2} x^{n-2} h + \cdots + n x h^{n-2} + h^{n-1}.$$

The division is safe because $h \neq 0$ while the limit is taken.

**Take the limit.** The first term, $n x^{n-1}$, contains no $h$, so it does not
change. Every other term still carries at least one factor of $h$, so every one
of them tends to $0$. Therefore

$$\frac{d}{dx}\left(x^n\right) = \lim_{h \to 0}\left(n x^{n-1} + \binom{n}{2} x^{n-2} h + \cdots + h^{n-1}\right) = n x^{n-1}.$$

That is the power rule.

## What the argument needs, and what it does not

The expansion at the centre of the proof is the binomial expansion for a
**positive whole number** $n$. That case has $n + 1$ terms and stops, which is
what makes the last step short: finitely many terms are left carrying an $h$, and
each of them tends to $0$.

For other values of $n$ the rule $n x^{n-1}$ still holds. For example

$$\frac{d}{dx}\left(\frac{1}{x}\right) = \frac{d}{dx}\left(x^{-1}\right) = -x^{-2},$$

which is the rule with $n = -1$, and

$$\frac{d}{dx}\left(\sqrt{x}\right) = \frac{d}{dx}\left(x^{1/2}\right) = \tfrac{1}{2}x^{-1/2},$$

which is the rule with $n = \tfrac{1}{2}$. This argument does not prove either of
them. When $n$ is negative or a fraction, the binomial expansion of $(x + h)^n$
does not stop. It runs on forever, so the short last step above no longer
describes what is happening. Those cases are proved later in the course, by
writing the power in another form and using the derivatives of $e^x$ and
$\ln x$.

The honest statement of what is proved here is therefore: **the power rule for a
positive whole number $n$**.

## Check your understanding

1. Use the expansion of $(x + h)^5$ to differentiate $x^5$ from first principles.
   Which term survives the limit?
2. The expansion of $(x + h)^n$ has a term $\binom{n}{2}x^{n-2}h^2$. After the
   division by $h$, what is this term, and what happens to it as $h \to 0$?
3. Why does the argument above not prove the rule for $n = -2$?

<details markdown="1">
<summary>Answers</summary>

1. $(x + h)^5 = x^5 + 5x^4h + 10x^3h^2 + 10x^2h^3 + 5xh^4 + h^5$. Subtracting
   $x^5$ and dividing by $h$ gives
   $5x^4 + 10x^3h + 10x^2h^2 + 5xh^3 + h^4$. As $h \to 0$ every term except the
   first tends to $0$, so the derivative is $5x^4$. It came from the term
   $5x^4h$.
2. It becomes $\binom{n}{2}x^{n-2}h$, which still carries an $h$, so it tends to
   $0$. It contributes nothing to the derivative.
3. For $n = -2$ the expansion of $(x + h)^{-2}$ does not stop, so there are not
   finitely many terms left carrying an $h$. The last step of the proof does not
   apply, even though the rule itself is still true.
</details>

## A common error

After the division by $h$, a term such as $\binom{n}{2}x^{n-2}h$ still carries an
$h$. It can look like the term that became the answer, so it is tempting to keep
it. Do not: dividing $h^2$ by $h$ leaves $h$, not a constant, and as $h \to 0$
this term vanishes. **Re-check:** after the limit is taken, count the terms. Only
$n x^{n-1}$ has no $h$ in it.
