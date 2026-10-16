---
title: 1.7 Scientific notation and accuracy — Learn
chapter: 1
chapter_title: Number systems and arithmetic
section: '1.7'
section_title: Scientific notation and accuracy
tier: F
refs:
- '3.1'
kind: walkthrough
---

# 1.7 Scientific notation and accuracy — Learn

**Prerequisites:** Section 1.1 — rational numbers; Section 1.5 — indices;
rounding to decimal places.

**Objectives:** write a number in scientific notation and back again; multiply
and divide numbers in scientific notation; round to a number of significant
figures; explain why a chain of calculations should be rounded only at the end.

By the end of this section you can write a very large or very small number
tidily, and say how many figures of an answer are worth keeping.

## Scientific notation

**Scientific notation** writes a number as a value between $1$ and $10$
multiplied by a power of ten:

$$a \times 10^n \quad \text{where } 1 \leq a < 10 \text{ and } n \text{ is a whole number}$$

**Example 1.** Write $45\,000$ in scientific notation.

Move the decimal point so that one non-zero digit sits before it:

$$45\,000 = 4.5 \times 10^4$$

The index $4$ counts the places the point moved.

**Example 2.** Write $0.00032$ in scientific notation.

$$0.00032 = 3.2 \times 10^{-4}$$

The index is negative, because the number is smaller than $1$.

Scientific notation is useful because it shows the **size** of a number at a
glance. $4.5 \times 10^4$ is about forty thousand; $4.5 \times 10^7$ is about
forty million. The index carries the scale.

## Multiplying and dividing

Multiply the front numbers and add the indices. Divide the front numbers and
subtract the indices.

**Example 3.** Work out $(2 \times 10^3)(3 \times 10^5)$.

$$(2 \times 10^3)(3 \times 10^5) = 6 \times 10^{3+5} = 6 \times 10^8$$

**Example 4.** Work out $\dfrac{8 \times 10^6}{2 \times 10^2}$.

$$\frac{8 \times 10^6}{2 \times 10^2} = 4 \times 10^{6-2} = 4 \times 10^4$$

If the front number is not between $1$ and $10$ after the arithmetic, adjust it.
For example, $12 \times 10^5 = 1.2 \times 10^6$.

## Significant figures

A **significant figure** is a digit that carries information about the size of a
number. To count them:

- the first non-zero digit is the first significant figure;
- leading zeros do not count;
- zeros between significant figures count;
- trailing zeros after a decimal point count.

So $0.004\,567$ has four significant figures, and $14.268$ has five.

To round to a number of significant figures, find the figure you are keeping and
look at the next digit.

**Example 5.** Round $0.004\,567$ to 2 significant figures.

The first two significant figures are $4$ and $5$. The next digit is $6$, so
round the $5$ up:

$$0.004\,567 \approx 0.0046$$

**Example 6.** Round $14.268$ to 3 significant figures.

The first three significant figures are $1$, $4$ and $2$. The next digit is $6$,
so round the $2$ up:

$$14.268 \approx 14.3$$

## Accuracy in a chain

A chain of calculations is a row of steps that each build on the one before. The
rule is to **round once, at the end**. Rounding at every step lets each small
error feed into the next, and the final answer drifts.

**Example 7.** The chapter problem.

A room measures $4.35$ m by $3.28$ m. Carpet costs €32.40 per square metre, and
the quote adds $5\%$ for waste and then $10\%$ profit.

Keep every figure until the end:

$$4.35 \times 3.28 = 14.268$$

$$14.268 \times 1.05 = 14.9814$$

$$14.9814 \times 32.40 \times 1.10 = 533.937096$$

So the correct quote is €533.94 to the nearest cent.

The estimator rounded the measurements to $4$ m and $3$ m first:

$$4 \times 3 \times 1.05 \times 32.40 \times 1.10 = 449.064$$

That quote is €449.06. The error is

$$533.937096 - 449.064 = 84.873096$$

about €84.87. The carpet alone costs €485.40, so the quote of €449.06 does not
even cover the materials. The job lost money because the rounding happened at the
wrong point.

> **Watch out.** Rounding early is the trap. A rounded measurement is not the
> measurement, and the error grows as it passes through the chain. Keep full
> precision through every step, and round only the final answer. If a question
> asks for a decimal, that request is the last step, not the first.

## Progress check

Back to the chapter problem. The correct quote is €533.94 and the estimator's
quote is €449.06.

Write the exact quote €533.937096 in scientific notation, and round it to 3
significant figures. Then write the error €84.873096 to 2 significant figures.
Explain why rounding only at the end gives the better answer.

The Review page resolves the problem in full and works out the loss.

## You should now be able to

- write a large or small number in scientific notation, and back again;
- multiply and divide numbers in scientific notation;
- count the significant figures in a decimal;
- round a number to a required number of significant figures;
- explain why a chain of calculations is rounded once, at the end.
