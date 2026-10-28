---
title: When the samples are not independent
---

# When the samples are not independent

## What this page answers

The previous page divided $\sigma$ by $\sqrt N$ because the samples were
independent. Most samplers do not give independent samples: each draw depends on
the one before it. This page derives the correction, computes the effective
sample size, and shows a bar that is too small by a factor of four.

It settles a gap the class page leaves open. "Use a chain" is not advice until
you can say how many *independent* samples the chain bought.

## The mathematics

Let $X_1, \dots, X_N$ be a stationary sequence with variance $\sigma^2$ and
autocorrelation $\rho_k = \operatorname{Corr}(X_i, X_{i+k})$. The variance of
the mean is no longer $\sigma^2/N$. It is

$$ \operatorname{Var}(\bar X) = \frac{\sigma^2}{N}\left(1 + 2\sum_{k=1}^{N-1}
\left(1 - \frac{k}{N}\right)\rho_k\right). $$

The factor in brackets is the **integrated autocorrelation time**

$$ \tau = 1 + 2\sum_{k=1}^{\infty}\rho_k, $$

once the $k/N$ term is negligible. Then

$$ \operatorname{Var}(\bar X) \approx \frac{\sigma^2 \tau}{N} =
\frac{\sigma^2}{N/\tau}, $$

and $N/\tau$ is the **effective sample size**. The honest standard error is
$\sigma/\sqrt{N/\tau}$ rather than $\sigma/\sqrt N$. When $\tau > 1$ the plain
bar is too small by $\sqrt\tau$.

For a first-order autoregression, $X_t = \phi X_{t-1} + \varepsilon_t$ with
$|\phi| < 1$, the autocorrelation is $\rho_k = \phi^k$, so

$$ \tau = 1 + 2\sum_{k=1}^{\infty}\phi^k = \frac{1+\phi}{1-\phi}. $$

At $\phi=0.9$, $\tau=19$: about nineteen draws buy one independent sample. The
plain bar is too small by $\sqrt{19} = 4.36$. That is not a small correction.
It is the difference between a result and a coincidence.

**The check.** The program below builds a chain with $\phi=0.9$ and $N=20{,}000$
. Its plain two-standard-error bar is $0.0138$ and its honest bar is $0.0585$,
a ratio of $4.2$. The estimated $\tau$ is $17.8$, close to the exact $19$;
the remaining gap is the finite sample and the truncation of the sum.

## The code

The sum of autocorrelations is truncated at the first non-positive value. That
is a standard window: the sample autocorrelation is noisy, and past the first
zero crossing the noise, not the dependence, is what the terms measure.

```python
import math
import random

random.seed(7)
phi = 0.9
n = 20000
noise = math.sqrt(1.0 - phi * phi)
x = 0.0
samples = []
for _ in range(n):
    x = phi * x + random.gauss(0.0, noise)
    samples.append(x)

mean = sum(samples) / n
var = sum((v - mean) ** 2 for v in samples) / (n - 1)
sd = math.sqrt(var)
naive = sd / math.sqrt(n)

def acf(k):
    total = 0.0
    for i in range(n - k):
        total += (samples[i] - mean) * (samples[i + k] - mean)
    return total / ((n - k) * var)

tau = 1.0
k = 1
while acf(k) > 0:
    tau += 2.0 * acf(k)
    k += 1
honest = sd * math.sqrt(tau / n)
print(f"mean            {mean:+.4f}")
print(f"naive 2se       {2 * naive:.4f}")
print(f"estimated tau   {tau:.2f}")
print(f"effective N     {n / tau:.0f}")
print(f"honest 2se      {2 * honest:.4f}")
```

```text
mean            +0.0196
naive 2se       0.0138
estimated tau   17.84
effective N     1121
honest 2se      0.0585
```

The plain bar is four times too small. A reader who reported it would claim a
precision the chain did not deliver.

## The theory

The derivation assumes stationarity. A chain started far from its target is not
stationary, and the early samples carry a drift that no autocorrelation
correction removes. The usual answer is a burn-in: discard the start, then
estimate $\tau$ from what remains. The next page shows a diagnostic for whether
the chain has settled.

The integrated autocorrelation time is a property of the sampler, not only of
the target. A proposal that moves a long way each step has a smaller $\tau$;
one that moves a short way has a larger one. That is the trade-off a sampler
tunes, and it is why "more samples" is not the same as "more information".

The truncation is a bias-variance choice. Summing more terms includes the noise
and overestimates $\tau$; summing fewer loses the tail and underestimates it.
Sokal's automatic window is the standard compromise: sum until the estimate
stops being dominated by the signal. The program uses the simplest version, the
first zero crossing.

The sources are in `sources.yaml`: Robert and Casella for the Monte Carlo
theory and the autocorrelation correction.

## What this cost

The autocorrelation function costs $O(NK)$ for $K$ lags, which is the price of
the diagnostic rather than of the sample. A chain of 20,000 with 42 lags is
under a million multiplications. The sampler itself costs one target evaluation
per step.

The information is $N/\tau$ rather than $N$, and that is the number to report.
A chain that is four times as long and twice as correlated buys less than it
looks.

What it will not do: it will not detect a chain that has not converged, and it
will not fix a sampler that is biased. It measures dependence, not correctness.

## Back to the map

[Averaging](../index.md) is the class page this works under.
[An average, and its error bar](../error-bars/index.md) is the independent
case this page corrects. [Walking a chain that
settles](../mcmc/index.md) is where the samples come from.
