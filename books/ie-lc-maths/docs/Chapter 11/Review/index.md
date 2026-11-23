---
title: 'Chapter 11: Review'
chapter: 11
kind: review
---

# Chapter 11: Review

## The chapter problem, solved

**The poll that got it wrong.** A random sample of $1000$ voters gave $52\%$ Yes and
$48\%$ No. The headline said "Yes on course for victory". On the day, $48\%$ voted Yes and
$52\%$ voted No.

**How far out can a sample of 1000 be?** For a sample proportion near $50\%$, the standard
error is

$$SE = \sqrt{\frac{p(1-p)}{n}} = \sqrt{\frac{0.5 \times 0.5}{1000}} = 0.0158$$

where $SE$ is the standard error, $p$ is the population proportion and $n$ is the sample
size. This is $1.58$ percentage points. The margin of error at $95\%$ confidence is about
twice that:

$$1.96 \times 1.58\% \approx 3.1 \text{ percentage points}$$

So the poll's result should be read as

$$52\% \pm 3.1\% \quad\text{that is, from } 48.9\% \text{ to } 55.1\%$$

**What that means.** The interval contains values below $50\%$, so the poll could not
separate the two sides. It never justified the word "victory" — not because the poll was
wrong, but because four points is far too narrow a lead for a sample of this size to
resolve.

**And the actual error was four points**, which is just outside the interval. That is not a
scandal and it is not fraud. A $95\%$ interval is a promise about the **method**: if you
took many samples this way, about $95$ of every $100$ intervals would contain the true
value. About one in twenty would not. This poll was one of the twenty.

**What a margin of error does and does not promise.** It promises how much sampling noise
to expect. It does **not** promise that the sample was unbiased — a badly chosen sample of
$1000$ can be far further out than $3.1$ points, and no margin of error can detect that. It
does not promise that the question was fair, and it does not predict how people will vote
on the day. Those are different failures, and only the first is a margin of error.

**The headline's two mistakes.** It read a lead smaller than the uncertainty as a
conclusion, and it turned a measurement into a forecast. The poll was honest; the sentence
above it was not.

## Mixed practice — choose the method first

Work through these without notes. For each one, decide **what kind of statistical statement
it is** — a description, an inference, a correlation, or a claim — before you answer.

:::problems chapter-11-review

:::answers chapter-11-review

## What you can now do

- tell a population from a sample, and say how far a conclusion can be generalised;
- name the common sampling methods and the bias each one invites;
- read a chart carefully, and spot a truncated axis and a misleading scale;
- find the mean, median and mode, and the range and interquartile range;
- find the standard deviation and say what it measures;
- use the normal distribution to find a proportion or a value;
- find a margin of error and a confidence interval, and say what the interval promises;
- carry out a hypothesis test and state the conclusion in the context of the question;
- find a correlation coefficient and a line of best fit, and say why correlation is not
  causation;
- ask the questions that expose a weak statistical claim.

## Thinking back

Look at the claim you chose at the start of the chapter — a headline, an advertisement, a
chart in a report.

You can now take it apart. Write down the population, the sample and its size, where the
chart's axis starts, and whether the language is about a ratio or a difference. Then answer
the question you started with: **what would have to be true for this claim to hold?**

If the claim does not survive that question, you can now say precisely which step fails —
and that is worth more than a general suspicion. Saying *why* a number does not support the
sentence above it is the reasoning this chapter has been teaching, and it is the part of
statistics that is useful every day.
