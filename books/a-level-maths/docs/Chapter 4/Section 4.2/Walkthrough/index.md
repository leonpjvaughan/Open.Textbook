---
title: 4.2 Binomial expansion for rational n and approximation — Learn
chapter: 4
chapter_title: Sequences and series
section: '4.2'
section_title: Binomial expansion for rational n and approximation
refs:
- D1
kind: walkthrough
---

# 4.2 Binomial expansion for rational n and approximation — Learn

**Prerequisites:** the binomial expansion for a positive whole number $n$ from
Section 4.1; factorials and binomial coefficients; the laws of indices,
including fractional and negative exponents from Section 2.1.

**By the end of this section you can:** expand $(1 + x)^n$ when $n$ is a fraction
or a negative number; state the range of $x$ for which the expansion is valid;
expand $(a + bx)^n$ by taking out the factor $a^n$; and use the first few terms
to approximate a value.

## 1. The expansion when n is not a positive whole number

The formula from Section 4.1 still works when $n$ is any rational number, but
the series never stops. For $r \ge 1$ the coefficient is

$$
\binom{n}{r} = \frac{n(n-1)(n-2)\cdots(n-r+1)}{r!}.
$$

The product on the top has $r$ factors. It starts at $n$ and drops by one each
time. The series is

$$
(1 + x)^n = 1 + nx + \frac{n(n-1)}{2!}x^2 + \frac{n(n-1)(n-2)}{3!}x^3 + \dots,
$$

and it is **valid** — it really does add up to $(1 + x)^n$ — only when
$|x| < 1$.

The word **valid** matters. Inside the range, adding more terms brings the sum
closer to the true value. Outside it, the series either grows without limit or
settles on the wrong number.

## 2. A fractional power

**Example 1.** Expand $(1 + x)^{\frac{1}{2}}$ up to and including the term in
$x^3$.

Take $n = \frac{1}{2}$ and work out the coefficients one at a time.

$$
\binom{\frac{1}{2}}{1} = \frac{1}{2},
$$

$$
\binom{\frac{1}{2}}{2} = \frac{\frac{1}{2} \times \left(-\frac{1}{2}\right)}{2}
= -\frac{1}{8},
$$

$$
\binom{\frac{1}{2}}{3} =
\frac{\frac{1}{2} \times \left(-\frac{1}{2}\right) \times
\left(-\frac{3}{2}\right)}{6} = \frac{3}{48} = \frac{1}{16}.
$$

So

$$
(1 + x)^{\frac{1}{2}} = 1 + \frac{1}{2}x - \frac{1}{8}x^2 + \frac{1}{16}x^3 - \dots,
\qquad |x| < 1.
$$

The signs alternate once the factors become negative. The series continues for
ever, so the dots are part of the answer.

## 3. A negative power

**Example 2.** Expand $(1 - 2x)^{-1}$ up to and including the term in $x^3$.

Take $n = -1$, so $x$ in the formula is replaced by $-2x$. Every coefficient
$\binom{-1}{r} = (-1)^r$.

$$
(1 - 2x)^{-1} = 1 + (-1)(-2x) + \frac{(-1)(-2)}{2}(-2x)^2
+ \frac{(-1)(-2)(-3)}{6}(-2x)^3 + \dots
$$

$$
= 1 + 2x + 4x^2 + 8x^3 + \dots, \qquad |2x| < 1.
$$

The condition $|2x| < 1$ is the same as $|x| < \frac{1}{2}$. This series is a
geometric series with first term $1$ and ratio $2x$, which is why the terms
double each time. Section 4.6 returns to that link.

## 4. Taking out the factor a to the power n

Most brackets are not in the form $(1 + x)^n$. Write

$$
(a + bx)^n = a^n\left(1 + \frac{bx}{a}\right)^n,
$$

then expand the bracket. The expansion is valid when

$$
\left|\frac{bx}{a}\right| < 1.
$$

**Example 3.** Expand $\sqrt{4 + x}$ up to and including the term in $x^3$, and
state the values of $x$ for which the expansion is valid.

Take out the factor $4^{\frac{1}{2}} = 2$:

$$
\sqrt{4 + x} = 2\left(1 + \frac{x}{4}\right)^{\frac{1}{2}}.
$$

Use the coefficients from Example 1 with $\frac{x}{4}$ in place of $x$:

$$
= 2\left[1 + \frac{1}{2}\left(\frac{x}{4}\right)
- \frac{1}{8}\left(\frac{x}{4}\right)^2
+ \frac{1}{16}\left(\frac{x}{4}\right)^3 + \dots\right]
$$

Work out each term inside the bracket first, then multiply by $2$:

$$
= 2 + 2 \times \frac{x}{8} - 2 \times \frac{x^2}{128} + 2 \times \frac{x^3}{1024}
= 2 + \frac{x}{4} - \frac{x^2}{64} + \frac{x^3}{512} + \dots
$$

The expansion is valid when $\left|\frac{x}{4}\right| < 1$, which is $|x| < 4$.

## 5. Using the expansion to approximate

A short expansion gives a good estimate when $x$ is small, because the later
powers of $x$ shrink quickly.

**Example 4.** Use the first three terms of Example 3 to estimate $\sqrt{4.1}$.

The value $4.1$ is $4 + 0.1$, so $x = 0.1$:

$$
\sqrt{4.1} \approx 2 + \frac{0.1}{4} - \frac{0.1^2}{64}
= 2 + 0.025 - 0.00015625 = 2.02484375.
$$

A calculator gives $2.0248457$ to $7$ decimal places. The three-term estimate is
correct to $5$ decimal places, which shows how quickly the later terms fade.

**Example 5.** The £2,000 gift in the chapter problem is moved after $2\frac{1}{2}$
years, with the interest still at 6% a year. Estimate its value then.

The value is $2000(1.06)^{2.5}$, and $2.5 = \frac{5}{2}$. Expand
$(1 + 0.06)^{\frac{5}{2}}$ with $x = 0.06$:

$$
\binom{\frac{5}{2}}{1} = \frac{5}{2}, \qquad
\binom{\frac{5}{2}}{2} = \frac{\frac{5}{2} \times \frac{3}{2}}{2} = \frac{15}{8},
\qquad
\binom{\frac{5}{2}}{3} =
\frac{\frac{5}{2} \times \frac{3}{2} \times \frac{1}{2}}{6} = \frac{5}{16}.
$$

So

$$
(1.06)^{\frac{5}{2}} \approx 1 + \frac{5}{2}(0.06) + \frac{15}{8}(0.06)^2
+ \frac{5}{16}(0.06)^3.
$$

Work out the terms:

$$
= 1 + 0.15 + 0.00675 + 0.0000675 + \dots = 1.1568175\dots
$$

Then

$$
2000 \times 1.1568175 = 2313.635,
$$

so the gift is worth about £2313.63 after $2\frac{1}{2}$ years. The expansion is
valid because $|0.06| < 1$.

## 6. Try it: how far does the approximation reach?

**Predict first.** The figure draws the true curve of $(1 + x)^n$ and the sum of
the first few terms of its expansion. Before you touch the controls, predict
what happens to the gap between the two curves as you add more terms, both
inside the range $|x| < 1$ and just outside it. Write your prediction down.

:::figure ch4-binomial-approximation

**Test.** Move the slider for the number of terms and watch the dashed curve.
Then move the marker to different values of $x$ and read the true value and the
approximation in the readout. Choose a negative power and a fractional power from
the list and compare them.

**Explain.** Write two sentences saying why adding terms makes the approximation
better inside the range $|x| < 1$ but worse outside it.

> **Watch out.** Two mistakes appear again and again.
>
> **Dropping the factor $a^n$.** For $\sqrt{4 + x}$ the answer starts at $2$,
> because $4^{\frac{1}{2}} = 2$. Writing $\left(1 + \frac{x}{4}\right)^{\frac{1}{2}}
> = 1 + \frac{x}{8} - \dots$ is the expansion of the bracket alone, not of
> $\sqrt{4 + x}$. **Re-check:** put $x = 0$. The expansion must give $a^n$, so
> $\sqrt{4 + 0}$ must give $2$.
>
> **Forgetting the range.** The expansion of $(1 + x)^n$ is valid only for
> $|x| < 1$. In the form $(a + bx)^n$ the range is
> $\left|\frac{bx}{a}\right| < 1$. For $(1 - 2x)^{-1}$ that is $|x| < \frac{1}{2}$,
> not $|x| < 1$. **Re-check:** state the range next to your answer, every time.

## Progress check

Return to the chapter problem. The committee also considers moving the £2,000
after only 1 year and 6 months, which is $1.5$ years.

1. Write the value as $2000(1.06)^{1.5}$, and write $1.5$ as $\frac{3}{2}$.
2. Use $\binom{\frac{3}{2}}{1}$, $\binom{\frac{3}{2}}{2}$ and
   $\binom{\frac{3}{2}}{3}$ to expand $(1.06)^{1.5}$ up to the $x^3$ term.
3. Estimate the value after $1.5$ years, to the nearest penny.

## You should now be able to

- write the general binomial series for $(1 + x)^n$ with a rational $n$;
- work out $\binom{n}{r}$ for a fractional or negative $n$;
- state the range of $x$ for which an expansion is valid;
- take out the factor $a^n$ from $(a + bx)^n$ and expand the bracket;
- use the first few terms of an expansion to approximate a value.
