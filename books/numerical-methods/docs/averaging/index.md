---
title: Averaging
---

# Averaging

**You have one of these when** the answer is not a number but a distribution, or
an average over possibilities you cannot list.

## What you are modelling

The system has randomness in it, or so many states that counting them is
hopeless. You are not asking where it is. You are asking how likely something
is, how spread out it is, or what happens on average when the inputs vary.

This is the statistical half of the map, and it is the same box as the physical
half. It is also the whole of that half: one box, and a page that names the
methods. Four of them are derived in full under this page, and the rest are
named and priced, because a reference work's job is to tell you where your
problem belongs. A suspension
corner whose bush stiffness is only known to within ten per cent is an averaging
problem in exactly the sense that a queue is.

## The model you write down

$$
\mathbb{E}[g(X)] = \int g(x)\,p(x)\,\mathrm{d}x ,
$$

where $p$ is the distribution of the inputs. When the state is only known
probabilistically, the model is a rule for how the distribution moves — a
transition, a likelihood, and a prior.

## What it becomes on a computer

**Worked number.** With $\sigma=1$ and $N=1000$ samples, the standard error is
$1/\sqrt{1000}=0.0316$, so a two-standard-error bar is $0.063$.

You draw samples and average them. The estimate is

$$
\hat{\mu} = \frac{1}{N}\sum_{i=1}^{N} g(x_i), \qquad
\text{error} \sim \frac{\sigma}{\sqrt{N}} .
$$

Two facts follow, and they are the whole character of the class.

- **The error falls as $1/\sqrt{N}$, whatever the dimension.** Four times the
  work halves the error. That is slow, and it is also why the method survives
  problems with a hundred inputs where a grid would need $10^{100}$ points.
- **Every answer carries an error bar.** An average without one is a number with
  no claim attached.

The error bar is the answer's honesty. The figure draws the estimate and two
standard errors around it as the samples accumulate; the bar narrows as
$1/\sqrt{N}$, and the dashed line is the value the method cannot see.

:::figure monte-carlo-lab

## The signature

The answer is an estimate. There is no equilibrium to solve and no region to
discretise; there is a sample, a variance, and a convergence rate you can
measure.

## Flags that matter here

- **Correlated samples.** A Markov chain gives a valid average, but consecutive
  samples are not independent. The naive error bar is then too small, sometimes
  by a factor of a hundred.
- **Rare events.** If the thing you want happens once in $10^{9}$ draws,
  sampling will not see it. The method has to be aimed.
- **An expensive model.** Ten thousand runs of a two-hour simulation is not a
  plan. A cheap stand-in, itself fitted by a smaller number of runs, is the
  usual answer.

## Techniques

Every method named here is in [Methods, A to Z](../techniques/#averaging), with
its price and what it will not do.

| technique | what it does | when it wins | when it is the wrong tool |
|---|---|---|---|
| Monte Carlo | Draws independent samples and averages | Any dimension, any model you can run | You need precision; $1/\sqrt{N}$ is slow |
| Importance sampling | Draws where the answer is, and reweights | Rare events; a known region of interest | The weight has huge variance |
| Stratified and Latin hypercube sampling | Spreads the draws over the space | Smooth response, modest dimension | Discontinuous response |
| Quasi-Monte Carlo | Uses a low-discrepancy sequence instead of random draws | Smooth integrands, moderate dimension | No reliable error estimate |
| Control variates, antithetic pairs | Uses a known answer to cancel part of the error | A cheap correlated model exists | The correlation is weak |
| Markov chain Monte Carlo | Walks a chain that settles to $p$ | $p$ known up to a constant; Bayesian fitting | You need independent samples, or speed |
| Particle filter, sequential Monte Carlo | Carries a cloud of weighted samples through time | State estimation as data arrive | Very high dimension |
| Kalman filter | Exact update for linear models with Gaussian noise | The model is linear and the noise is Gaussian | Non-linear, or multi-modal state |
| Bootstrap | Resamples your data to get an error bar | You have data and no formula | Very small samples; dependent data |
| Gaussian quadrature | Chooses points and weights exactly | Smooth, low-dimensional integrands | Dimension above about ten |

## Systems that live here

- How much the camber varies when the bush stiffness is only known to ten per
  cent.
- Weather and climate ensembles: one model, many starting states.
- Option pricing, where the average is over paths.
- Bayesian parameter fitting: the answer is a distribution, not a number.
- Sensor fusion: where the car is, from noisy measurements.
- Reliability: the probability that a part fails before a mileage.
- Detector and radiotherapy simulation: the average is over millions of
  histories.

## What goes wrong

| symptom | cause | fix |
|---|---|---|
| A tiny error bar, and the answer is wrong | Samples were not independent, or the model is biased | Check the autocorrelation and the model |
| The chain never settles | The target has not been normalised, or the support is wrong | Fix the model before tuning the sampler |
| A rare event never appears | Plain sampling, and the event is rare | Importance sampling or subset simulation |
| Ten million samples and still noisy | The variance of $g$ is large | A control variate, or a quasi-random sequence |
| A different run gives a different answer | That is the method, not a bug | Report the error bar, and the seed |

## The working under this page

Four pages take one method family each and carry the algebra, a program and the
theory. They are optional: the class page is complete without them.

| Page | What it settles |
|---|---|
| [An average, and its error bar](error-bars/index.md) | The variance of an estimate, the $\sigma/\sqrt N$ rate, and what a two-standard-error bar means |
| [When the samples are not independent](correlated/index.md) | Autocorrelation, the integrated autocorrelation time, and the effective sample size |
| [Walking a chain that settles](mcmc/index.md) | Metropolis, detailed balance, R-hat and the effective sample size |
| [Fitting, and what the fit does not say](regression/index.md) | Least squares as maximum likelihood, the normal equations, and the slope's standard error |

## Used in this collection

:::used

## Read next

- [Optimisation](../optimisation/index.md) — fitting a model is an average and a
  minimum at the same time.
- [Parabolic](../parabolic/index.md) — a distribution that spreads is the same
  equation as heat.
- [When it goes wrong](../symptoms/index.md) — the symptom table for every
  class.
