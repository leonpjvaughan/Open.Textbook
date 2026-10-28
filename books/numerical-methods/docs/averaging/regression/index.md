---
title: Fitting, and what the fit does not say
---

# Fitting, and what the fit does not say

## What this page answers

A line through data is the commonest statistical computation in this collection,
and no page derived it. This page derives least squares, gives the normal
equations, and says what the slope's standard error means. It also says what a
small residual does not mean.

It settles the row the map could not: fitting was reachable only as a price line
on Gauss–Newton, with no page that says what the fit is.

## The mathematics

Suppose $y_i = a + b x_i + \varepsilon_i$, with the errors independent and
normally distributed with mean zero and variance $\sigma^2$. The likelihood is
maximised by minimising

$$ S(a,b) = \sum_{i=1}^n (y_i - a - b x_i)^2. $$

Differentiate and set the derivatives to zero:

$$ \frac{\partial S}{\partial a} = -2\sum (y_i - a - b x_i) = 0, \qquad
\frac{\partial S}{\partial b} = -2\sum x_i(y_i - a - b x_i) = 0. $$

The first equation gives $a = \bar y - b\bar x$: the line passes through
$(\bar x, \bar y)$. Substituting into the second gives the slope

$$ b = \frac{S_{xy}}{S_{xx}} = \frac{\sum (x_i-\bar x)(y_i-\bar y)}{\sum
(x_i-\bar x)^2}. $$

That is the **normal equation** in one variable. In matrix form, with a column
of ones in $X$, the same two equations are

$$ X^\top X \beta = X^\top y, \qquad \hat\beta = (X^\top X)^{-1}X^\top y. $$

### The standard error

The residuals are $r_i = y_i - \hat a - \hat b x_i$. An unbiased estimate of
$\sigma^2$ is

$$ s^2 = \frac{\sum r_i^2}{n-2}, $$

where the $2$ is the number of fitted parameters. The covariance of the fitted
slope is

$$ \operatorname{Var}(\hat b) = \frac{\sigma^2}{S_{xx}}, $$

estimated by $s^2/S_{xx}$. Its square root is the standard error. The ratio
$\hat b/\operatorname{SE}(\hat b)$ is a $t$ statistic: how many standard errors
the slope is from zero.

**The check.** For the five points below, the slope is $0.99$, the residual
standard deviation is $0.1889$, and the standard error of the slope is $0.0597$
. The line passes through $(2.0, 3.0)$, which is $(\bar x, \bar y)$, and the
slope is $16.6$ standard errors from zero.

## The code

The program fits the line from the normal equations, prints the slope and its
standard error, and checks the mean point.

```python
x = [0.0, 1.0, 2.0, 3.0, 4.0]
y = [1.1, 1.9, 3.2, 3.8, 5.1]
n = len(x)
mx = sum(x) / n
my = sum(y) / n
sxx = sum((xi - mx) ** 2 for xi in x)
sxy = sum((xi - mx) * (yi - my) for xi, yi in zip(x, y))
slope = sxy / sxx
intercept = my - slope * mx
rss = sum((yi - intercept - slope * xi) ** 2 for xi, yi in zip(x, y))
s2 = rss / (n - 2)
se = (s2 / sxx) ** 0.5
print(f"slope       {slope:.4f}")
print(f"intercept   {intercept:.4f}")
print(f"residual s  {s2 ** 0.5:.4f}")
print(f"se(slope)   {se:.4f}")
print(f"t           {slope / se:.2f}")
print(f"mean point  ({mx:.1f}, {my:.1f})")
print(f"line at x-bar {intercept + slope * mx:.1f}")
```

```text
slope       0.9900
intercept   1.0400
residual s  0.1889
se(slope)   0.0597
t           16.58
mean point  (2.0, 3.0)
line at x-bar 3.0
```

The slope is nearly one and the intercept is nearly one, which is what the data
were built to show. The standard error says how much the slope would move if the
data were redrawn; it does not say that the line is the right model.

## The theory

Least squares is maximum likelihood when the errors are normal and independent.
When they are not, it is still the best linear unbiased estimator under weaker
conditions, but the standard error above is no longer the whole story.
Clustered, heteroscedastic or correlated errors need a different covariance, and
the plain $s^2/S_{xx}$ is then too small.

The mean-point identity is worth keeping: the fitted line always passes through
$(\bar x, \bar y)$, because the first normal equation says so. It is a check on
the arithmetic that needs no extra data.

What a small residual does not say:

-  **That the model is right.** A straight line through a curve can have a small
residual over a narrow range and be badly wrong outside it.
-  **That the slope is stable.** A single high-leverage point can move it a long
way; the standard error is a guide, not a guarantee.
-  **That the errors are independent.** A time series with a trend has a small
residual and a slope that is mostly the trend.
-  **That prediction is safe.** Extrapolation is a different question, and the
standard error of a prediction at a new $x$ is larger than the standard error of
the slope.

The geometry of least squares is the projection of $y$ onto the column space of
$X$. [§1.3 of Maths Applied](/maths-applied/chapter-1/section-1.3/learn/) uses
that projection to solve a linkage, and
[§9.4 of the Leaving Certificate Applied Mathematics book](/ie-lc-applied-maths/higher/chapter-9/section-9.4/learn/)
takes up overfitting. Neither is restated here.

The sources are in `sources.yaml`: Trefethen and Bau for the normal equations
and the projection, and Robert and Casella for the likelihood reading.

## What this cost

The normal equations cost $O(np^2)$ for $p$ parameters and $O(np)$ to form the
cross-products, with a factorisation of the $p \times p$ matrix. For one slope
that is a handful of sums. Storing $X^\top X$ squares the condition number,
which is why a large fit uses a QR factorisation rather than the normal
equations.

The standard error costs one more pass over the residuals. The fit itself is
cheap; the model choice is what is expensive.

What it will not do: it will not choose the model, and it will not detect a
missing variable. Those are judgement, and the residual plot is the evidence.

## Back to the map

[Averaging](../index.md) is the class page this works under.
[An average, and its error bar](../error-bars/index.md) is the same
standard-error idea for a mean. [Walking a chain that
settles](../mcmc/index.md) is the sampler that fits a model when the likelihood
has no closed form.
