---
title: 11.10 Correlation and regression — Learn
chapter: 11
chapter_title: Statistics
section: '11.10'
section_title: Correlation and regression
tier: O
refs:
- '1.7'
kind: walkthrough
---

# 11.10 Correlation and regression — Learn

**Prerequisites:** Section 11.4 — the mean; plotting points on a coordinate grid.

**Objectives:** draw and read a scatterplot; describe correlation by direction and
strength; match a correlation coefficient to a scatterplot; draw a line of best fit and
use it to predict; explain why correlation does not prove causation.

By the end of this section you can describe the relationship between two variables, and
you can say what that relationship does and does not prove.

## Bivariate data

When we record two variables for each item, the data are **bivariate**. Each item gives a
pair of values, such as a person's height and shoe size, or a car's age and its price.

A **scatterplot** shows each pair as a point. The first variable goes on the horizontal
axis and the second on the vertical axis. The pattern of the points is the whole point of
the display.

## Describing correlation

**Correlation** describes how the two variables move together.

- **Positive correlation.** As one variable increases, the other tends to increase. The
  points rise from left to right.
- **Negative correlation.** As one variable increases, the other tends to decrease. The
  points fall from left to right.
- **No correlation.** The points show no pattern.

The **strength** of the correlation says how close the points lie to a straight line. A
**strong** correlation has points tightly packed along a line, and a **weak** one has them
scattered widely.

## The correlation coefficient

The strength and direction are combined in one number, the **correlation coefficient**
$r$. It always lies between $-1$ and $+1$.

| Value of $r$ | Meaning |
|---|---|
| $r = 1$ | perfect positive correlation |
| $r$ near $1$, such as $0.9$ | strong positive correlation |
| $r$ near $0$ | little or no linear correlation |
| $r$ near $-1$, such as $-0.9$ | strong negative correlation |
| $r = -1$ | perfect negative correlation |

A calculator or spreadsheet finds $r$ from the data. The sign tells you the direction, and
the distance from $0$ tells you the strength.

> **Correlation is not causation.** A strong correlation between two variables does not
> prove that one causes the other. A third variable may drive both, or the two may be
> related by coincidence.

**Example 1.** Ice-cream sales and the number of drowning deaths are strongly positively
correlated across the year. Explain why this does not show that ice cream causes
drowning.

Both variables rise in hot weather. The weather is a third variable that drives both, and
it explains the correlation. A correlation is a description of the data, and it does not
by itself identify a cause.

## The line of best fit

When the points on a scatterplot follow a straight line, we can draw a **line of best
fit** through them. Draw it so that the points lie roughly equally above and below the
line, and make sure it passes through the middle of the cloud of points.

The line lets us **predict** a value of one variable from the other.

**Example 2.** A line of best fit for the price of a used car against its age is
$y = 18000 - 2000x$, where $x$ is the age in years and $y$ is the price in euro. Predict
the price of a car that is $4$ years old.

$$y = 18000 - 2000(4) = 18000 - 8000 = 10000$$

The prediction is €$10000$. The prediction is a reading from the line, and it is only as
good as the line and the data.

> **Watch out.** A prediction is only reliable inside the range of the data. Predicting
> the price of a $20$-year-old car from a line fitted to cars up to $8$ years old is an
> **extrapolation**, and it can be badly wrong. Predicting inside the range is an
> **interpolation**, and it is much safer.

<!-- tier:h -->

## The least-squares line

A calculator or spreadsheet does not draw the line by eye. It finds the **least-squares
regression line** $y = a + bx$, which makes the sum of the squared vertical distances from
the points to the line as small as possible. The gradient $b$ and the intercept $a$ are
found from the data, and the calculator also gives $r$.

The gradient is the change in $y$ for each extra unit of $x$. If $b = -2000$ for the car
data, each extra year of age is associated with about €$2000$ less in price.

<!-- /tier:h -->

## Progress check

Back to the chapter problem. The table shows the last poll before eight referendums and
the actual result, both as the percentage voting Yes.

| Poll | $52$ | $60$ | $45$ | $70$ | $38$ | $55$ | $62$ | $49$ |
|---|---|---|---|---|---|---|---|---|
| Result | $48$ | $58$ | $47$ | $68$ | $40$ | $52$ | $63$ | $46$ |

A scatterplot of these pairs gives a correlation coefficient of about $r = 0.97$, and the
least-squares line is close to $y = 3.9 + 0.91x$.

The correlation is strong and positive: polls that predicted a high Yes vote generally
saw a high Yes vote. The line is close to $y = x$, which is what a reliable poll would
give.

Now find the referendum in the chapter problem: a poll of $52\%$ and a result of $48\%$.
The line predicts $3.9 + 0.91(52) \approx 51.2\%$, so the actual $48\%$ lies about three
points below the line.

That single point is the poll that got it wrong. It is one point among eight, and the
strong overall correlation does not promise that every poll is accurate. Section 11.11
looks at how a single unusual point can be used, or misused, in an argument.

## You should now be able to

- draw and read a scatterplot;
- describe correlation by direction and strength;
- match a value of $r$ to a scatterplot;
- draw a line of best fit and use it to predict;
- tell interpolation from extrapolation;
- explain why correlation does not imply causation.
