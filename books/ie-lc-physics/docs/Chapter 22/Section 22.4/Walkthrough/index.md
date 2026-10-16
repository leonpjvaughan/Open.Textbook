---
title: 22.4 Processing and evaluating your data — Learn
chapter: 22
chapter_title: The Physics In Practice Investigation
section: '22.4'
section_title: Processing and evaluating your data
tier: O
refs:
- '1.4'
kind: walkthrough
---

# 22.4 Processing and evaluating your data — Learn

**Prerequisites:** the primary data from Section 22.3, and graphs and uncertainty
from Sections 1.2 and 1.5.

**Objectives:** turn a table into a graph with labelled axes and units; find a
mean and its uncertainty; read a gradient, an intercept and an area with their
units; combine percentage uncertainties; test the hypothesis against the evidence;
evaluate the method and say what you would change.

By the end of this section you can take your readings and say what they show.

## From a table to a graph

A graph shows a pattern that a table hides. Plot the independent variable on the
horizontal axis and the dependent variable on the vertical axis. Label each axis
with the quantity and its unit, such as **Angle / degrees** and **Voltage / V**.

If the points lie on a curve, look for a quantity that straightens them. A graph of
distance against time squared, for a falling ball, is a straight line through the
origin. The gradient of that line is $\frac{1}{2}g$, so the line turns a curve into
a physical constant.

## The mean and its uncertainty

For repeats at the same setting, the mean is the best estimate. The uncertainty in
the mean is half the range:

$$\text{uncertainty} = \frac{\text{largest reading} - \text{smallest reading}}{2}$$

A reading far from the others is **anomalous**. Repeat that trial and look for a
mistake. Leave it out of the mean only when you can say what went wrong, and say so
in the report.

## Reading a graph

Three things can be read from a straight-line graph, and each has a meaning.

- The **gradient** is the change in the vertical quantity divided by the change in
  the horizontal quantity. Its unit is the vertical unit divided by the horizontal
  unit.
- The **intercept** is the value of the vertical quantity when the horizontal
  quantity is zero. It often shows a zero error in the instrument.
- The **area** under the graph is the product of the two quantities. On a
  force-extension graph, the area is the energy stored.

**Example 1.** A graph of voltage against current passes through (0.10 A, 1.2 V),
(0.20 A, 2.4 V) and (0.30 A, 3.6 V). Find the gradient and say what it means.

The gradient is the change in voltage divided by the change in current:

$$\text{gradient} = \frac{3.6 - 1.2}{0.30 - 0.10} = \frac{2.4}{0.20} = 12\,\text{V/A}$$

A volt per amp is an ohm, so the gradient is the resistance, $12\,\Omega$. The unit
of the gradient is the physical meaning of the number.

## Combining uncertainties

When quantities are multiplied or divided, the percentage uncertainties add. The
answer is then quoted with its absolute uncertainty.

**Example 2.** A force of 8.0 N is measured with an uncertainty of 3%, and it
moves an object 0.25 m with an uncertainty of 2%. Find the work done and its
absolute uncertainty.

The work is $W = Fd = 8.0 \times 0.25 = 2.0$ J. The percentage uncertainties add:

$$3\% + 2\% = 5\%$$

The absolute uncertainty is 5% of 2.0 J, which is 0.10 J. So
$W = 2.0\,\text{J} \pm 0.10\,\text{J}$.

## Testing the hypothesis

The hypothesis made a prediction. The processed data either supports it or does not.
Write the judgement with a number and a reason.

**Example 3.** A graph of distance against time squared gives a gradient of
9.5 m/s$^2$, and the accepted value of $g$ is 9.8 m/s$^2$. Does the evidence support
the model?

The measured value is about 3% below the accepted value. The uncertainty in the
timings is larger than 3%, so the two values agree within the uncertainty. The
evidence supports the model.

If the difference were much larger than the uncertainty, the evidence would not
support the model, and the report would look for a reason: a systematic error, a
control variable that changed, or an assumption of the model that does not hold.

## Evaluating the method

An evaluation is not a list of apologies. It is an honest account of what limited
the result, and what you would change.

1. **What were the main sources of error?** Name each one.
2. **How big was each one?** A reaction time of 0.20 s is large beside a fall time
   of 0.40 s, so it limits the result badly.
3. **What would improve it?** A light gate removes the reaction time. More repeats
   reduce the random scatter. A clamp fixes a control variable.

**Random errors** scatter the readings above and below the true value, so the mean
reduces them. **Systematic errors** push every reading the same way, so the mean
does not reduce them. A reading that is always 0.02 s too large is systematic.

> **Watch out.** Do not round at every step. If you round the mean, then the
> gradient, then the final answer, the small errors add up and the answer can be
> wrong in the last figure. The contrast is to keep the full value through the
> working and round once, at the end, to the figures the data support.

## Progress check

Back to the chapter problem. Your investigation now needs the readings processed.

1. Find the mean and the uncertainty for one setting of your independent variable.
2. Plot your readings, and find the gradient of the line of best fit.
3. Write one sentence saying whether the evidence supports your hypothesis, with a
   number and a reason.

Keep the answers. Section 22.5 turns them into the report, and the Review uses them
to resolve the chapter problem.

## You should now be able to

- plot a graph with the independent variable on the horizontal axis;
- label both axes with the quantity and its unit;
- find a mean and the uncertainty as half the range;
- read a gradient, an intercept and an area, with their units and their meanings;
- combine percentage uncertainties for a product or a quotient;
- test a hypothesis against the evidence, with a number and a reason;
- tell random error from systematic error;
- evaluate the method and suggest a concrete improvement.
