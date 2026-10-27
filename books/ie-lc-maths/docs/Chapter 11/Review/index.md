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

1. A class of 30 students has a mean height of $168$ cm. Is this a description or an
   inference? Explain.
2. A sample of $400$ voters gives $54\%$ Yes. Find the standard error and the $95\%$ margin
   of error.
3. Using your answer to question 2, write the confidence interval and say whether the
   sample gives evidence of a majority.
4. A study of 12 people finds a correlation of $0.9$ between two variables. Give one reason
   to be cautious.
5. A chart shows a company's sales rising from €96m to €100m with a vertical axis starting
   at €95m. State what is misleading and how the chart should be drawn.
6. A report says a food "increases your risk of illness by 50%". The risk rises from two in
   a million to three in a million. Explain why the two statements do not conflict.
7. A poll reports $45\%$ Yes with a margin of error of $3$ points. Can it rule out a $50$-$50$
   split? Explain.
8. A test finds a difference between two groups with $p = 0.03$. Explain what that does and
   does not tell you.
9. A survey is sent by email to a company's customers and $8\%$ reply. Name the bias and
   explain why a large number of replies would not fix it.
10. Explain why a result can be statistically significant and still be too small to matter,
    and give an example.

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
