---
title: 11.4 Scatter diagrams, regression lines and correlation — Learn
chapter: 11
chapter_title: Statistical sampling and data presentation
section: '11.4'
section_title: Scatter diagrams, regression lines and correlation
refs:
- L2
kind: walkthrough
---

# 11.4 Scatter diagrams, regression lines and correlation — Learn

**Prerequisites:** plotting coordinates from Chapter 3; the gradient and
equation of a straight line from Sections 3.1 and 3.2.

**By the end of this section you can:** plot and read a scatter diagram;
describe the correlation in words; interpret the gradient and intercept of a
regression line; predict from a line of best fit; explain why correlation does
not imply causation; and recognise a scatter diagram that contains distinct
sections of the population.

## 1. Bivariate data and the scatter diagram

**Bivariate data** has two values for each item. A scatter diagram plots one
point for each item, with one variable on each axis.

One variable is usually the **explanatory variable**, which you choose or
control, and the other is the **response variable**, which you measure. Put the
explanatory variable on the horizontal axis. For journey time against distance,
distance is the explanatory variable and time is the response.

## 2. Describing correlation

**Correlation** describes how the two variables move together.

- **Positive correlation:** as one variable increases, the other tends to
  increase. Points rise from left to right.
- **Negative correlation:** as one variable increases, the other tends to
  decrease. Points fall from left to right.
- **No correlation:** there is no clear pattern.

Correlation also has **strength**. Points that lie close to a straight line show
**strong** correlation. Points that are widely scattered show **weak**
correlation.

A **regression line**, or line of best fit, is a straight line drawn through the
middle of the points. It is used to summarise the trend and to make predictions.
The line is the least-squares fit, and it passes through $(\bar x, \bar y)$;
[the derivation and the slope's standard error](/numerical-methods/averaging/regression/)
are worked through for a reader who wants them. In this course the line is
computed for you, and the work is to interpret it.

:::class optimisation

:::class linear-system

**Example 1.** A scatter diagram plots the distance of a house from a city
centre against its price. The points fall from left to right, fairly close to a
straight line. Describe the correlation.

The correlation is negative and fairly strong. Houses further from the centre
tend to cost less, and the points lie near a straight line.

## 3. Interpreting a regression line

A regression line often has the form

$$
y = a + bx,
$$

where $x$ is the explanatory variable, $y$ is the response variable, $b$ is the
gradient and $a$ is the intercept on the $y$-axis. The **gradient** says how
much the response changes for each extra unit of the explanatory variable. The
**intercept** is the predicted response when the explanatory variable is zero.

**Example 2.** A line of best fit for hours of study $x$ and test score $y$ is
$y = 4x + 30$. Interpret the gradient and the intercept, and predict the score
for 6 hours of study.

The gradient is $4$. Each extra hour of study is associated with about 4 extra
marks. The intercept is $30$: a student who does no study has a predicted score
of 30.

For $x = 6$,

$$
y = 4(6) + 30 = 54.
$$

The predicted score is 54. A prediction inside the range of the data is called
**interpolation**. A prediction outside it is **extrapolation**, and it is less
reliable, because the trend may not continue.

## 4. Distinct sections of the population

A single scatter diagram can contain two or more groups that behave differently.
This is called **distinct sections of the population**. One line of best fit
then describes neither group well, and the overall correlation can be
misleading.

**Example 3.** A scatter of weekly income against age contains one group of
part-time workers and one group of full-time workers. The full-time group sits
higher. A single line through all the points has a weak fit, because the two
groups sit on two different levels. The population should be split, and each
group described separately.

## 5. Correlation does not imply causation

A strong correlation between $x$ and $y$ does not prove that $x$ causes $y$.
Both variables may be affected by a third variable, called a **lurking
variable**, or the relationship may be a coincidence.

**Example 4.** In a group of children, shoe size is strongly correlated with
reading ability. Shoe size does not cause reading ability. Both increase with
age, so age is the lurking variable.

## 6. Try it: what one point does to a line

**Predict first.** The figure shows a scatter diagram and its line of best fit.
Before you move the slider, predict what happens to the line when you move the
far point upwards by a long way. Write down whether the line will tilt more or
less, and whether the prediction at the right-hand side will change.

:::figure ch11-scatter-explorer

**Test.** Move the slider and watch the line. Note how much the line tilts for a
small move and for a large move of the same point.

**Explain.** Write two sentences. The first explains why a point far from the
others can pull the line a long way. The second explains why a line pulled by one
point makes predictions less trustworthy.

> **Watch out.** Three mistakes are common.
>
> **Reading causation into a correlation.** A scatter diagram shows that two
> variables move together, not that one causes the other. Look for a lurking
> variable.
>
> **Extrapolating far beyond the data.** A line of best fit describes the range
> of the data it came from. A prediction far outside that range may be wrong.
>
> **Drawing one line through two groups.** When a scatter has distinct sections,
> describe each section separately. One line through both can hide the pattern.
>
> **Re-check:** before using a line of best fit, ask whether the scatter is a
> single group and whether your prediction lies inside the data range.

## You should now be able to

- plot bivariate data and identify the explanatory and response variables;
- describe correlation as positive, negative or none, and strong or weak;
- interpret the gradient and intercept of a regression line;
- predict a value from a line of best fit and say whether it is an
  interpolation or an extrapolation;
- recognise distinct sections of a population in a scatter diagram;
- explain why correlation does not imply causation.
