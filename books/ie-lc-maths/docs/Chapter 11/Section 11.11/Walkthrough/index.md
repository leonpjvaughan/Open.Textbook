---
title: 11.11 Statistical reasoning and misused statistics — Learn
chapter: 11
chapter_title: Statistics
section: '11.11'
section_title: Statistical reasoning and misused statistics
tier: F
refs:
- '1.4'
kind: walkthrough
---

# 11.11 Statistical reasoning and misused statistics — Learn

**Prerequisites:** the whole chapter, especially Section 11.2 — bias, and Section 11.10 —
correlation.

**Objectives:** decide how far a conclusion can be generalised; recognise a misleading
graph; spot the common ways a statistic is misused; ask the questions that expose a weak
claim.

By the end of this section you can read a statistical claim the way a careful person
reads it, and you can say what the numbers do and do not support.

## From a sample to a population

A statistic describes a sample. A conclusion about the population is a **generalisation**,
and it is only as good as the sample. Before you accept a generalisation, ask:

- **Who was in the sample?** A sample of students says nothing about adults.
- **How was the sample chosen?** A random sample supports a generalisation; a convenience
  sample does not.
- **How large was the sample?** A small sample is noisy, and one unusual person can change
  the result.
- **Who was left out?** Non-response and self-selection remove whole groups.

A claim from a biased sample is not repaired by a large number of responses. The method,
not the size, decides whether the sample can stand in for the population.

## Misleading graphs

A graph can be accurate and still mislead. The most common trick is a **truncated axis**:
the vertical axis starts at a number other than zero. A change from $96$ to $100$ is about
$4\%$, and it looks tiny on an axis from $0$ to $100$. On an axis from $95$ to $100$, the
same change fills most of the chart and looks enormous.

Other traps include a broken axis, which skips a range of values, and a picture whose
height and width both grow, so the area grows faster than the number it shows.

> **A misleading graph.** A graph misleads when its scale makes a small change look large
> or a large change look small. The numbers can be correct while the impression is false.

**Example 1.** A bar chart shows profits of €$96$m, €$98$m and €$100$m, and its vertical
axis starts at €$95$m. Explain why the chart exaggerates the change.

The three bars have heights $1$, $3$ and $5$ above the axis, so the third bar looks five
times as tall as the first. The actual increase from $96$ to $100$ is

$$\frac{100 - 96}{96} \times 100 = 4.17\%$$

which is small. An axis starting at $0$ would show three almost equal bars.

## Other ways a statistic misleads

- **Correlation used as causation.** Two variables can move together without one causing
  the other. Section 11.10 showed the third-variable explanation.
- **A loaded question.** The wording pushes the reader towards one answer, as in Section
  11.2.
- **Cherry-picking.** Reporting only the years, regions or groups that support the claim.
- **A percentage of a small number.** "Half of our customers switched" means little if
  there were only four customers. Two out of four is $50\%$, and it is also two people.
- **A big-sounding number with no base.** "Thousands of people are affected" says nothing
  without the total. A thousand cases in a million is one in a thousand.
- **Relative risk without the base rate.** A claim that a treatment "doubles the risk" is
  alarming until you learn that the risk rose from one in a million to two in a million.

**Example 2.** An advertisement says "two out of three dentists recommend this brush".
Explain why the claim should be checked before it is believed.

Two out of three is a very small sample. Ask how many dentists were asked, how they were
chosen, and what the other brushes were. Three dentists chosen from one clinic prove
nothing about dentists in general.

> **Watch out.** A result can be statistically significant and still be too small to
> matter. A new medicine that lowers blood pressure by a tiny amount may give a very small
> $p$-value in a huge trial, and the effect on a patient is still tiny. Statistical
> significance is not the same as practical importance.

## The questions to ask

When you meet a statistic, ask these questions in order.

1. Who or what is the population, and who was actually measured?
2. How was the sample chosen, and who was left out?
3. How large was the sample, and how large is the margin of error?
4. What exactly was measured, and how was the question worded?
5. Does the graph show the full scale?
6. Does the claim jump from correlation to cause?
7. Is the size of the effect important, as well as statistically detectable?

## Progress check

Back to the chapter problem. The newspaper printed "Yes on course for victory" above a
poll that reported $52\%$ Yes.

Name two things the headline gets wrong.

First, the lead of four points is smaller than the margin of error of about $3.2$
percentage points on each side, so the poll cannot separate the two sides. The result is
too close to call.

Second, the headline turns a sample result into a prediction. The confidence interval for
Yes ran from $48.8\%$ to $55.2\%$, which includes a No result. A poll is a measurement
with an uncertainty attached, and it is not a forecast.

The poll itself was honest. The misuse was in the sentence above it.

## You should now be able to

- decide how far a conclusion can be generalised;
- recognise a truncated or broken axis;
- spot cherry-picking, a loaded question and a percentage of a small number;
- explain why correlation is not causation;
- tell statistical significance from practical importance;
- ask the questions that test a statistical claim.
