---
title: 11.6 Outliers, data cleaning and critiquing presentation — Learn
chapter: 11
chapter_title: Statistical sampling and data presentation
section: '11.6'
section_title: Outliers, data cleaning and critiquing presentation
refs:
- L4
kind: walkthrough
---

# 11.6 Outliers, data cleaning and critiquing presentation — Learn

**Prerequisites:** quartiles and the interquartile range from Section 11.5;
reading axes and chart labels.

**By the end of this section you can:** recognise an outlier using the
interquartile-range rule; decide whether to keep, correct or remove an unusual
value and say why; clean a data set that has missing values or errors; and
criticise a statistical diagram or a published claim.

## 1. What an outlier is

An **outlier** is a value that is unusually far from the rest of the data. It
may be a genuine extreme value, or it may be a recording error. The first job is
to notice it. The second job is to decide what it means.

## 2. The interquartile-range rule

A common rule flags a value as a possible outlier when it lies outside the
**fences**

$$
Q_1 - 1.5 \times \text{IQR}
\qquad \text{and} \qquad
Q_3 + 1.5 \times \text{IQR}.
$$

A value below the lower fence or above the upper fence is a possible outlier.
The rule is a signal to look, not a proof that the value is wrong.

Some contexts use a different rule, such as a value more than two standard
deviations from the mean. Always state the rule you use.

**Example 1.** The data are
$12, 14, 15, 16, 17, 18, 19, 20, 21, 22, 45$. Find any outliers using the
interquartile-range rule.

The lower quartile is $Q_1 = 15$ and the upper quartile is $Q_3 = 21$, so

$$
\text{IQR} = 21 - 15 = 6.
$$

The fences are

$$
15 - 1.5(6) = 6
\qquad \text{and} \qquad
21 + 1.5(6) = 30.
$$

The value 45 is above 30, so 45 is a possible outlier.

## 3. Deciding what to do with an outlier

When you find a possible outlier, ask:

- **Could it be a recording error?** A value of 450 minutes where every other
  value is under 40 suggests a typing error. Check the original source.
- **Is it impossible?** A negative height or an age of 200 cannot be right.
- **Could it be genuine?** A very long journey time may be real, caused by an
  accident. If it is real, it belongs in the data.

Then choose one of three actions, and write down which one you chose and why:

- **Keep it.** The value is genuine and the mean and standard deviation should
  include it. Report that the data contain an extreme value.
- **Correct it.** The value is a recording error and the true value can be
  recovered. Replace it.
- **Remove it.** The value is an error and the true value cannot be recovered.
  Remove it, and say how many values were removed.

Removing an outlier only because it weakens your argument is not honest.

**Example 2.** Two values in a data set of 80 are recorded as 999. Every other
value is between 10 and 60. The original records are lost. Write the value 999
out of the data set and record the change.

The value 999 is impossible here, and the true value cannot be recovered.
Remove the 2 values and report that 2 of the 80 values were removed as errors,
leaving 78. A reader can then judge the effect on the mean.

## 4. Cleaning data

**Data cleaning** is the process of finding and dealing with values that are
wrong or missing.

| Problem | What to do |
|---|---|
| A missing value | Find it if possible. Otherwise leave it out and say how many are missing. |
| An impossible value | Check the source. Correct it if you can, otherwise remove it. |
| Inconsistent units | Convert every value to one unit before calculating. |
| A duplicate record | Remove the duplicate, unless two items really share a value. |
| A typographical error | Correct it when the true value is clear from the source. |

Whatever you do, record it. A reader must be able to see how many values were
changed and how the conclusion was affected.

**Example 3.** A data set of journey times is in minutes, but 5 of the 30 values
were recorded in seconds. Explain how to clean the data.

Convert the 5 values from seconds to minutes by dividing by 60. Then all 30
values share one unit, and the mean and standard deviation can be calculated.
Say in your answer that the conversion was made.

## 5. Critiquing a presentation

A diagram can be correct and still mislead. Look for:

- **A truncated axis.** If the vertical axis starts at 95 instead of 0, a small
  change looks large.
- **A wrong diagram.** A bar chart with gaps for continuous grouped data hides
  the fact that area is frequency. A histogram is needed.
- **An inconsistent scale.** Unequal class widths drawn as equal-width bars make
  a common class look rare, or the reverse.
- **A 3-D effect.** Perspective makes the front of a pie chart look larger than
  it is. The angles no longer match the frequencies.
- **A chosen range or average.** A graph may show only the years that support a
  claim, or quote the mean when the median describes the data better.
- **A missing label or unit.** An axis without a unit cannot be read.

**Example 4.** A company claims that its profits "rose sharply". The bar chart
shows bars of height 96, 98 and 100, and the vertical axis starts at 95.
Explain the problem.

The change from 96 to 100 is about four per cent, which is small. Starting the
axis at 95 makes the bars look very different in height, so the chart exaggerates
the rise. Starting the axis at 0 would show three almost equal bars.

> **Watch out.** Three mistakes are common.
>
> **Removing an outlier without a reason.** An outlier that is genuine is part
> of the data. Remove only a value that is an error, and say so.
>
> **Keeping an impossible value.** A value the context forbids, such as a
> negative mass, must be corrected or removed. It cannot be left in place.
>
> **Comparing bar heights across unequal classes.** For grouped continuous data,
> compare areas, not heights. A wide class has a tall-looking frequency even
> when its frequency density is small.
>
> **Re-check:** after cleaning, report the number of values removed or changed,
> and the original total, so the effect is visible.

## Progress check

Return to the chapter problem. The 30 journey times contain the value 58. The
quartiles are $Q_1 = 19.75$ and $Q_3 = 28.25$.

1. Find the two fences.
2. Is 58 a possible outlier? Explain your answer.
3. What should the group do with 58, and what must they report if they change
   the data set?

## You should now be able to

- identify a possible outlier using the interquartile-range fences;
- decide whether to keep, correct or remove an unusual value, and give a reason;
- clean a data set with missing values, errors or inconsistent units;
- record every change made during cleaning;
- criticise a truncated axis, a 3-D chart, a wrong diagram or a chosen range.
