---
title: Walking a chain that settles
---

# Walking a chain that settles

## What this page answers

The class page names Markov chain Monte Carlo and prices it. This page writes
down the transition rule, says why it leaves the target distribution alone, and
shows the two diagnostics a reader needs. Those are whether the chains have
settled, and how many independent samples they bought.

It settles a gap in the measured table. A chain is not an average; it is a
process, and a process that has not settled has no error bar worth computing.

## The mathematics

The target is a distribution $\pi(x)$. A Metropolis chain proposes a move from
the current point $x$ to $y$ from a proposal density $q(y \mid x)$, then
accepts it with probability

$$ \alpha(x, y) = \min\left(1, \frac{\pi(y)\,q(x \mid y)}{\pi(x)\,q(y \mid
x)}\right). $$

For a symmetric proposal, $q(y \mid x) = q(x \mid y)$, the ratio is
$\pi(y)/\pi(x)$. A move uphill is always accepted; a move downhill is accepted
with probability $\pi(y)/\pi(x)$.

The rule satisfies **detailed balance**:

$$ \pi(x)\,q(y \mid x)\,\alpha(x, y) = \pi(y)\,q(x \mid y)\,\alpha(y, x). $$

Summing over $x$ shows that $\pi$ is stationary: if the chain starts from $\pi$
, it stays there. That is the whole justification for using the chain's samples
as samples from $\pi$. It does not say how fast the chain reaches $\pi$, which
is why the diagnostics exist.

The proposal scale is the tuning knob. A small step accepts almost everything
and moves slowly; a large step moves far and is rejected. Both increase the
autocorrelation time, so the effective sample size is maximised somewhere in
between.

### Diagnostics

**R-hat** compares the variance within each chain with the variance between
chains. With $M$ chains of length $n$, within-chain variance $W$, and
between-chain variance $B$,

$$ \hat R = \sqrt{\frac{\frac{n-1}{n}W + \frac{B}{n}}{W}}. $$

If the chains have forgotten where they started, $\hat R \approx 1$. A value
above about $1.1$ means they have not mixed, and the samples are not yet from
one distribution.

**Effective sample size** is the correction from the previous page, applied to
the pooled chains: $N_{\text{eff}} = Mn/\bar\tau$. It is the number to report,
because it is what the error bar depends on.

**The check.** The program below runs four chains from $-4$, $-2$, $2$ and $4$
on a standard normal target, discards the first 1,000 steps of each, and prints
$\hat R \approx 1.001$ and $N_{\text{eff}} \approx 3{,}915$ from 20,000 draws.
The chains started far apart and still agree, which is what the diagnostic is
testing.

## The code

Each chain has its own seed, so the numbers below are reproducible. The burn-in
is discarded before any statistic is computed.

```python
import math
import random

def chain(seed, start, total, step=2.0):
    rng = random.Random(seed)
    x = start
    out = []
    for _ in range(total):
        proposal = x + rng.gauss(0.0, step)
        ratio = math.exp(-0.5 * (proposal**2 - x**2))
        if ratio >= 1.0 or rng.random() < ratio:
            x = proposal
        out.append(x)
    return out

def tau_of(values):
    n = len(values)
    mean = sum(values) / n
    var = sum((v - mean) ** 2 for v in values) / (n - 1)
    def acf(k):
        total = 0.0
        for i in range(n - k):
            total += (values[i] - mean) * (values[i + k] - mean)
        return total / ((n - k) * var)
    tau = 1.0
    k = 1
    while acf(k) > 0:
        tau += 2.0 * acf(k)
        k += 1
    return tau

burn, length = 1000, 5000
starts = (-4.0, -2.0, 2.0, 4.0)
chains = [chain(11 + i, s, burn + length)[burn:]
          for i, s in enumerate(starts)]
means = [sum(c) / length for c in chains]
variances = [
    sum((v - m) ** 2 for v in c) / (length - 1)
    for c, m in zip(chains, means)
]
within = sum(variances) / len(variances)
overall = sum(means) / len(means)
between = length * sum(
    (m - overall) ** 2 for m in means
) / (len(means) - 1)
rhat = math.sqrt(
    ((length - 1) / length * within + between / length) / within
)
taus = [tau_of(c) for c in chains]
mean_tau = sum(taus) / len(taus)
ess = len(chains) * length / mean_tau
print(f"R-hat            {rhat:.3f}")
print(f"mean             {overall:+.4f}")
print(f"mean tau         {mean_tau:.2f}")
print(f"effective N      {ess:.0f}")
```

```text
R-hat            1.001
mean             +0.0171
mean tau         5.11
effective N      3915
```

The chain has settled and the mean is within about two standard errors of zero,
which is the target's mean. The effective sample size is a fifth of the draws,
which is the price of the random walk.

## The theory

Detailed balance is sufficient for stationarity, not necessary, and it is what
makes the acceptance ratio so simple. The ratio is a statement about relative
probabilities: the chain does not need the normalising constant of $\pi$,
because it cancels. That is why MCMC works on targets that cannot be normalised.

The burn-in is a heuristic. A chain that mixes slowly needs a longer one, and a
chain with several well-separated modes may never reach one of them. R-hat
across chains started in different places is the evidence that the burn-in was
enough. A single chain cannot diagnose a mode it never visited.

An unsettled chain looks like R-hat above $1.1$, a mean that drifts with the
starting point, or an effective sample size near the number of chains. In that
case the sampler needs a better proposal, a reparameterisation, or a longer run,
and no amount of post-processing fixes it.

The sources are in `sources.yaml`: Robert and Casella for Metropolis and the
diagnostics.

## What this cost

One target evaluation per proposal, plus a random number for the acceptance. The
chain stores every draw unless it is thinned, and thinning trades memory for
information: it cannot create independent samples, only discard dependent ones.

A random-walk chain moves by about the proposal scale per accepted step, so
covering a target of width $L$ needs of order $(L/s)^2$ steps. The effective
sample size grows more slowly than the raw count, and the constant is the
autocorrelation time.

What it will not do: it will not find a mode it has not visited, and it will not
tell you that the target is the distribution you meant. The first is a mixing
failure, the second is a modelling failure.

## Back to the map

[Averaging](../index.md) is the class page this works under.
[When the samples are not independent](../correlated/index.md) supplies the
correction this page applies.
[Fitting, and what the fit does not say](../regression/index.md) is the other
way a statistical model becomes a number.
