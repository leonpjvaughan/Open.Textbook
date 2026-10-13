---
title: 6.5 Logarithmic graphs and estimating parameters — Learn
chapter: 6
chapter_title: Exponentials and logarithms
section: '6.5'
section_title: Logarithmic graphs and estimating parameters
refs:
- F6
kind: walkthrough
---

# 6.5 Logarithmic graphs and estimating parameters — Learn

**Prerequisites:** the laws of logarithms from Section 6.3; straight-line graphs
and gradients from Chapter 3; the model $y = kb^x$ from Sections 6.2 and 6.6.

**By the end of this section you can:** take logarithms of a model to turn it
into a straight line; estimate the constants in $y = kb^x$ from a graph of
$\ln y$ against $x$; estimate the constants in $y = ax^n$ from a graph of
$\ln y$ against $\ln x$; and convert an intercept back into the original
constant.

## 1. Turning a curve into a straight line

A straight line is easier to read than a curve. A gradient and an intercept can
be measured with a ruler, and a line makes the trend obvious. Logarithms let us
turn an exponential or a power model into a straight line.

Start with the exponential model $y = kb^x$, where $k > 0$ and $b > 0$. Take the
natural logarithm of both sides:

$$
\ln y = \ln\left(kb^x\right) = \ln k + x\ln b.
$$

This has the form $Y = mX + c$ if we plot $Y = \ln y$ against $X = x$. The graph
is a straight line with

$$
\text{gradient} = \ln b, \qquad \text{intercept} = \ln k.
$$

So the gradient of the line gives $\ln b$, and the intercept gives $\ln k$. To
recover $b$ and $k$, undo the logarithm with the exponential: $b = e^{\text{gradient}}$
and $k = e^{\text{intercept}}$.

Now take the power model $y = ax^n$, where $a > 0$ and $x > 0$. Take logarithms:

$$
\ln y = \ln\left(ax^n\right) = \ln a + n\ln x.
$$

Plot $Y = \ln y$ against $X = \ln x$. The graph is a straight line with

$$
\text{gradient} = n, \qquad \text{intercept} = \ln a.
$$

The table below shows which plot is needed for each model.

| Model | Plot | Gradient | Intercept |
|---|---|---|---|
| $y = kb^x$ | $\ln y$ against $x$ | $\ln b$ | $\ln k$ |
| $y = ax^n$ | $\ln y$ against $\ln x$ | $n$ | $\ln a$ |

**Example 1.** A model $y = kb^x$ has data points $(0, 200)$ and $(1, 300)$.
Estimate $k$ and $b$.

The gradient of the graph of $\ln y$ against $x$ is

$$
\ln 300 - \ln 200 = \ln\frac{300}{200} = \ln 1.5 \approx 0.405.
$$

So $\ln b = \ln 1.5$ and $b = 1.5$. The intercept is $\ln k = \ln 200$, so
$k = 200$. The model is $y = 200\left(1.5\right)^x$.

**Example 2.** A graph of $\ln y$ against $\ln x$ for a model $y = ax^n$ has
gradient $3$ and intercept $\ln 4$. Find $a$ and $n$.

The gradient is $n$, so $n = 3$. The intercept is $\ln a = \ln 4$, so $a = 4$.
The model is $y = 4x^3$.

**Example 3.** A model satisfies $\log_{10} y = 2 + 0.5x$. Find $k$ and $b$ in
$y = kb^x$.

Compare with $\log_{10} y = \log_{10} k + x\log_{10} b$. The intercept gives
$\log_{10} k = 2$, so $k = 10^2 = 100$. The gradient gives
$\log_{10} b = 0.5$, so $b = 10^{0.5} = \sqrt{10} \approx 3.16$.

## 2. Try it: straightening a curve

**Predict first.** The figure shows a set of data points from a model
$y = k b^x$. Before you touch the controls, predict the shape of the graph of
$\ln y$ against $x$: a curve or a straight line? Then predict the sign of the
gradient when $b$ is larger than $1$. Write both predictions down.

:::figure ch6-log-linear

**Test.** Move the slider to change the growth factor $b$. Note the shape of the
graph of $y$ against $x$. Then press the button to show $\ln y$ against $x$, and
read the gradient. Change $b$ again and read the new gradient.

**Explain.** Write two sentences. The first explains why plotting $\ln y$
instead of $y$ turns the curve into a straight line. The second explains what
the gradient of that line tells you about $b$.

## Progress check

Return to the mould culture in the chapter problem. Its counts are $200$, $300$,
$450$ and $675$ at times $0$, $1$, $2$ and $3$ hours.

1. Work out the ratio between each count and the one before it.
2. Explain why a model of the form $N = kb^t$ fits the data.
3. Use two readings, at $t = 0$ and $t = 3$, to estimate the gradient of
   $\ln N$ against $t$.
4. Hence estimate $b$ and predict when $N$ reaches $2000$.

> **Watch out.** These mistakes are common.
>
> **Quoting the intercept as $k$.** For $y = kb^x$ the intercept is $\ln k$, not
> $k$. So an intercept of $\ln 200$ means $k = 200$, not $k = \ln 200$. Undo the
> logarithm with the exponential before you state the constant.
>
> **Plotting the wrong quantity for a power model.** For $y = ax^n$ both axes
> need logarithms: plot $\ln y$ against $\ln x$. Plotting $\ln y$ against $x$
> does not give gradient $n$.
>
> **Using logs of negative data.** A logarithm needs a positive input, so $y$
> and $x$ must be positive for these plots. If the data contain a zero or a
> negative value, the log-linear method cannot be used directly.
>
> **Re-check:** after reading a gradient, compute $e^{\text{gradient}}$ and check
> that the value is plausible. A gradient of $\ln 1.5 \approx 0.405$ should give
> a growth factor close to $1.5$.

## You should now be able to

- explain why $\ln y = \ln k + x\ln b$ is a straight-line equation;
- explain why $\ln y = \ln a + n\ln x$ is a straight-line equation;
- choose the correct plot for an exponential model and for a power model;
- estimate the gradient and intercept from a log-linear graph;
- convert a gradient into a growth factor and an intercept into a constant;
- predict a future value from the fitted model.
