---
title: 6.6 Exponential and logarithmic functions — Learn
chapter: 6
chapter_title: Functions
section: '6.6'
section_title: Exponential and logarithmic functions
tier: O
refs:
- '5.1'
kind: walkthrough
---

# 6.6 Exponential and logarithmic functions — Learn

**Prerequisites:** the rules of indices; function notation; transformations of graphs.

**Objectives:** sketch the graph of $y = a^x$; convert between exponential and logarithmic
form; use the laws of logarithms; solve an equation $a^x = b$; finish the chapter problem.

By the end of this section you can solve an equation in which the unknown is an index, and
answer the coffee question.

## Exponential functions

An **exponential function** has the input in the index:

$$f(x) = a^x \qquad (a > 0)$$

When $a > 1$ the graph grows, and when $0 < a < 1$ the graph decays. Every exponential graph
passes through $(0, 1)$, because $a^0 = 1$. The $x$-axis is a horizontal asymptote.

**Example 1.** The graph of $y = 2^x$ rises steeply. The graph of $y = (0.5)^x$ falls
towards zero. Both pass through $(0, 1)$ and neither crosses the $x$-axis.

## Logarithms

A **logarithm** answers the question "what power?".

> **Definition.** $\log_a b = c$ means exactly the same as $a^c = b$.

The base $a$ must be positive and not $1$, and $b$ must be positive. The logarithm is the
inverse function of the exponential, in the sense of Section 6.3.

**Example 2.** Write $3^4 = 81$ in logarithmic form.

The exponent is $4$, so $\log_3 81 = 4$.

**Example 3.** Work out $\log_2 64$.

Ask which power of $2$ gives $64$. Since $2^6 = 64$, the answer is $6$.

## The laws of logarithms

The laws of logarithms come from the laws of indices.

$$\log_a(xy) = \log_a x + \log_a y$$

$$\log_a\!\left(\frac{x}{y}\right) = \log_a x - \log_a y$$

$$\log_a(x^n) = n\log_a x$$

**Example 4.** Simplify $\log 3 + \log 4$.

$$\log 3 + \log 4 = \log 12$$

Adding logarithms multiplies the arguments.

> **Watch out.** There is no law for $\log(x + y)$. It is **not** $\log x + \log y$. Test it
> with numbers: $\log(10 + 10) = \log 20$, while $\log 10 + \log 10 = 2$. The two are
> different, so you cannot split a logarithm across a sum. The laws work for products,
> quotients and powers only.

## Solving an equation a^x = b

Take logarithms of both sides and use the power law to bring the index down.

**Example 5.** Solve $3^x = 20$, giving $x$ to three significant figures.

$$x\log 3 = \log 20 \qquad x = \frac{\log 20}{\log 3} = 2.7268\dots$$

To three significant figures, $x = 2.73$.

**Example 6.** Solve $2^x = 32$ exactly.

Write $32$ as a power of $2$: $32 = 2^5$. Matching the powers gives $x = 5$.

## The cooling coffee

Now the chapter problem can be finished. The temperature is
$T(t) = 20 + 70(0.5)^{t/5}$, and the comfortable temperature is $50^\circ C$.

$$20 + 70(0.5)^{t/5} = 50 \qquad 70(0.5)^{t/5} = 30 \qquad (0.5)^{t/5} = \frac{3}{7}$$

Take logarithms to bring the index down:

$$\frac{t}{5}\log 0.5 = \log\frac{3}{7} \qquad t = 5\,\frac{\log(3/7)}{\log 0.5} = 6.11\dots$$

The coffee reaches $50^\circ C$ after about $6.11$ minutes. That is the answer to the
chapter problem.

## Progress check

Back to the chapter problem. Solve $20 + 70(0.5)^{t/5} = 50$ for $t$ and give the time in
minutes to two decimal places.

Then check your answer by substituting it back into $T(t)$. The temperature should come out
at $50^\circ C$.

## You should now be able to

- sketch the graph of $y = a^x$ and state its asymptote;
- change between exponential form and logarithmic form;
- use the laws of logarithms for products, quotients and powers;
- solve an equation $a^x = b$ by taking logarithms;
- answer the chapter problem and explain each step.
