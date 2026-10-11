---
title: 11.7 Working with the large data set — Learn
chapter: 11
chapter_title: Statistical sampling and data presentation
section: '11.7'
section_title: Working with the large data set
dfe:
- K1
- L1
- L2
- L3
- L4
kind: walkthrough
---

# 11.7 Working with the large data set — Learn

**Prerequisites:** every section of this chapter: sampling, histograms,
scatter diagrams, averages and variation, and data cleaning.

**By the end of this section you can:** find a sample in a large data set; clean
it; draw a diagram from it; calculate summary statistics; compare groups inside
it; and write a conclusion that states whether the data set is the population or
a sample.

## 1. What the large data set is

Each exam board publishes its own **large data set**. Your teacher will give you
the one for your board. The data set is large, so you will not copy it by hand.
You will use a spreadsheet or a calculator, and you will be given extracts or
summary statistics in the exam.

The board assumes that you are familiar with its data set. Familiar means that
you know which variables it contains, the units each variable is measured in,
and how to work with it. You do not need to remember the individual values.

The large data set can play two roles:

- it can be the **population**, when you take a sample from it and study that
  sample;
- it can be a **sample**, when you use it to say something about a wider group,
  such as every day in a longer period.

Decide which role it plays before you write a conclusion, and say so.

## 2. The skills you need

The same tools from this chapter apply, on a larger scale.

| Task | Tool from this chapter |
|---|---|
| Take a sample | Section 11.2: simple random, systematic or stratified |
| Draw a diagram | Section 11.3: histogram, bar chart or scatter diagram |
| Find an average and a spread | Section 11.5: mean, median, quartiles, standard deviation |
| Spot an unusual value | Sections 11.5 and 11.6: fences and outliers |
| Clean the data | Section 11.6: missing values, units, errors |
| Compare groups | Sections 11.3 and 11.5: shape, centre and spread |

A spreadsheet helps with all of these. Learn to sort a column, to filter rows,
and to write a formula for a mean, a median and a standard deviation. Check
which standard deviation your software uses, because some spreadsheets divide by
$n - 1$.

## 3. Clean the data first

A large data set usually contains problems. Before you calculate anything, check
for:

- **missing values**, shown as a blank, a dash or a code;
- **values in the wrong unit**, such as a temperature in degrees Fahrenheit in a
  list of degrees Celsius;
- **impossible values**, such as a negative rainfall;
- **inconsistent codes**, such as two different labels for the same category;
- **duplicate rows**.

Decide what to do with each problem, do the same thing to every affected value,
and report what you changed. A summary statistic from uncleaned data can be
wrong.

## 4. An example extract

The table is a small example, not any board's data set. It shows the daily
maximum temperature at two stations over one week.

| Day | Station A (°C) | Station B (°F) |
|---|---|---|
| Monday | 18 | 64.4 |
| Tuesday | 20 | 66.2 |
| Wednesday | 22 | 68.0 |
| Thursday | 21 | 69.8 |
| Friday | — | 71.6 |
| Saturday | 24 | 73.4 |
| Sunday | 25 | 75.2 |

**Clean the data.** Station A has one missing value, on Friday. Station B is
recorded in degrees Fahrenheit, while station A is in degrees Celsius. Convert
station B to degrees Celsius using

$$
{}^\circ\mathrm{C} = \frac{5}{9}\left({}^\circ\mathrm{F} - 32\right)
$$

Station B becomes $18, 19, 20, 21, 22, 23, 24$.

**Compare the stations.** Station A has 6 known values, with mean

$$
\frac{18 + 20 + 22 + 21 + 24 + 25}{6} = \frac{130}{6} = 21.67 \ (2 \text{ d.p.}).
$$

Station B has 7 values, with mean

$$
\frac{18 + 19 + 20 + 21 + 22 + 23 + 24}{7} = \frac{147}{7} = 21.
$$

On this extract, station A is slightly warmer on average. Station A also has the
missing value, so its mean uses fewer days than station B's mean. The comparison
is limited by one week of data.

## 5. Writing a conclusion from a large data set

A conclusion should say:

- what you calculated, and from which group or sample;
- the value, with its unit;
- how much the values vary;
- what the result suggests about the population;
- one limitation of the data or the method.

**Example.** A sample of 200 days is taken at random from a large data set of
daily rainfall. The sample mean is 2.4 mm and the sample standard deviation is
1.8 mm. Write one sentence that reports the result, and one limitation.

The sample of 200 days has a mean daily rainfall of 2.4 mm, with a standard
deviation of 1.8 mm. This suggests that the mean daily rainfall for all days in
the data set is about 2.4 mm. One limitation is that the estimate comes from one
sample, so a different sample of 200 days would give a slightly different mean.

> **Watch out.** Three mistakes are common.
>
> **Forgetting to clean the data.** A missing value or a value in the wrong unit
> changes the answer. Clean first, then calculate.
>
> **Assuming the large data set is the whole population.** It may be a sample of
> a wider group. Say which role it plays.
>
> **Comparing groups without their spreads.** Two groups can share a mean and
> have different spreads. Report a measure of variation as well.
>
> **Re-check:** state the unit, the sample size and the cleaning step in every
> conclusion.

## You should now be able to

- describe what the large data set is and how your board expects you to use it;
- take a simple random, systematic or stratified sample from a large data set;
- clean missing values, wrong units and impossible values, and report the
  changes;
- draw a histogram or a scatter diagram from the data;
- calculate the mean, median, quartiles and standard deviation;
- compare two groups inside the data set;
- write a conclusion that names the unit, the sample size and one limitation.
