---
title: 6.5 Logarithmic graphs and estimating parameters — Practise with help
chapter: 6
chapter_title: Exponentials and logarithms
section: '6.5'
section_title: Logarithmic graphs and estimating parameters
dfe:
- F6
kind: guided-problems
---

# 6.5 Logarithmic graphs and estimating parameters — Practise with help

Work each question closed book first. Decide which plot the model needs, then
remember that the intercept is the logarithm of the constant, not the constant.

## Warm-up: remember

1. Write $\ln a + 3\ln x$ as a single logarithm.
2. Find the gradient of the straight line through $(0, 2)$ and $(4, 10)$.
3. Work out $e^{\ln 5}$.

<details markdown="1">
<summary>Answers</summary>

1. $\ln a + 3\ln x = \ln\left(ax^3\right)$.
2. The gradient is $\dfrac{10 - 2}{4 - 0} = 2$.
3. $e^{\ln 5} = 5$, because the exponential undoes the logarithm.

If question 1 was hard, revise the laws of logarithms in Section 6.3 before you
continue.
</details>

## Practise with help

**1.** For the model $y = kb^x$, what quantity is plotted on each axis to give a
straight line, and what do the gradient and intercept represent?

<details markdown="1">
<summary>Hint</summary>

Take the natural logarithm of both sides of $y = kb^x$ and compare the result
with $Y = mX + c$.
</details>

<details markdown="1">
<summary>Next step</summary>

$\ln y = \ln k + x\ln b$. Match $X = x$ and $Y = \ln y$, then read off $m$ and
$c$.
</details>

<details markdown="1">
<summary>Full working</summary>

Plot $Y = \ln y$ against $X = x$. Then

$$
\ln y = \ln k + x\ln b
$$

is a straight line with gradient $m = \ln b$ and intercept $c = \ln k$. The
gradient gives the growth factor $b = e^{m}$, and the intercept gives
$k = e^{c}$.
</details>

**2.** A model $y = kb^x$ has data points $(0, 400)$ and $(1, 600)$. Find $b$
and $k$.

<details markdown="1">
<summary>Hint</summary>

The gradient of $\ln y$ against $x$ is the change in $\ln y$, which is
$\ln 600 - \ln 400$.
</details>

<details markdown="1">
<summary>Next step</summary>

Use the quotient law to simplify the gradient to $\ln 1.5$. The intercept is
$\ln 400$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\text{gradient} = \ln 600 - \ln 400 = \ln\frac{600}{400} = \ln 1.5.
$$

So $\ln b = \ln 1.5$ and $b = 1.5$. The intercept is $\ln 400$, so $k = 400$.
The model is $y = 400\left(1.5\right)^x$.
</details>

**3.** A graph of $\ln y$ against $\ln x$ for a model $y = ax^n$ has gradient
$2.5$ and intercept $\ln 3$. Find $a$ and $n$.

<details markdown="1">
<summary>Hint</summary>

For a power model the gradient is the power $n$, and the intercept is $\ln a$.
</details>

<details markdown="1">
<summary>Next step</summary>

Read the gradient straight off as $n$. Undo the logarithm in the intercept with
the exponential.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
n = 2.5, \qquad \ln a = \ln 3, \qquad a = 3.
$$

The model is $y = 3x^{2.5}$.
</details>

**4.** A model satisfies $\log_{10} y = 1 + 0.3x$. Find $k$ and $b$ in
$y = kb^x$.

<details markdown="1">
<summary>Hint</summary>

Compare the given equation with
$\log_{10} y = \log_{10} k + x\log_{10} b$.
</details>

<details markdown="1">
<summary>Next step</summary>

The intercept gives $\log_{10} k = 1$, and the gradient gives
$\log_{10} b = 0.3$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
k = 10^{1} = 10, \qquad b = 10^{0.3} \approx 2.00.
$$

So the model is $y = 10\left(2.00\right)^x$ to three significant figures.
</details>

**5.** A graph of $\ln y$ against $x$ has gradient $0.7$. Find the growth factor
$b$ in $y = kb^x$, to three significant figures.

<details markdown="1">
<summary>Hint</summary>

The gradient equals $\ln b$. Undo the logarithm with the exponential.
</details>

<details markdown="1">
<summary>Next step</summary>

Work out $e^{0.7}$ and round to three significant figures.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\ln b = 0.7, \qquad b = e^{0.7} = 2.0137\ldots \approx 2.01.
$$

Because $b > 1$, the model grows.
</details>

**6.** A model $N = 200\left(1.5\right)^t$ has been fitted to the mould data.
Use it to predict $N$ when $t = 5$.

<details markdown="1">
<summary>Hint</summary>

Substitute $t = 5$ and work out $\left(1.5\right)^5$ first.
</details>

<details markdown="1">
<summary>Next step</summary>

$\left(1.5\right)^5 = 7.59375$, so multiply by $200$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
N = 200 \times \left(1.5\right)^5 = 200 \times 7.59375 = 1518.75.
$$

The prediction is about $1519$ cells after five hours. It assumes the growth
pattern continues, which a model cannot guarantee.
</details>

**7.** A student plots $\ln y$ against $x$ for a model $y = ax^n$ and expects
the gradient to be $n$. Explain why this is wrong, and state the correct plot.

<details markdown="1">
<summary>Hint</summary>

Take logarithms of $y = ax^n$ and see whether $\ln x$ or $x$ appears on the
right-hand side.
</details>

<details markdown="1">
<summary>Next step</summary>

The logarithm gives $\ln y = \ln a + n\ln x$, so the variable on the horizontal
axis must be $\ln x$, not $x$.
</details>

<details markdown="1">
<summary>Full working</summary>

Taking logarithms gives

$$
\ln y = \ln a + n\ln x.
$$

The right-hand side contains $\ln x$, not $x$. So a graph of $\ln y$ against
$x$ is not straight in general. The correct plot is $\ln y$ against $\ln x$, and
only then is the gradient equal to the power $n$.
</details>
