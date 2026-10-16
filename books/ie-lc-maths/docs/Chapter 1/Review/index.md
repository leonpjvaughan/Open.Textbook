---
title: 'Chapter 1: Review'
chapter: 1
kind: review
---

# Chapter 1: Review

## The chapter problem, solved

**The error that cost a contract.** A room measures $4.35$ m by $3.28$ m. Carpet
costs €32.40 per square metre, the quote adds $5\%$ for waste and $10\%$ profit,
and the estimator rounded the measurements to $4$ m and $3$ m before starting.

**The correct calculation.** Keep every figure until the end.

$$4.35 \times 3.28 = 14.268 \text{ m}^2$$

$$14.268 \times 1.05 = 14.9814 \text{ m}^2$$

$$14.9814 \times 32.40 = 485.39736$$

$$485.39736 \times 1.10 = 533.937096$$

So the correct quote is €533.94 to the nearest cent.

**The estimator's calculation.** The rounded measurements give a smaller area:

$$4 \times 3 \times 1.05 \times 32.40 \times 1.10 = 449.064$$

So the quote sent was €449.06.

**The error.** The two quotes differ by

$$|533.937096 - 449.064| = 84.873096$$

about €84.87. The profit the job was meant to make was

$$485.39736 \times 0.10 = 48.539736$$

about €48.54. The error is nearly twice the profit, so the job lost money.

**The loss.** The materials cost €485.40, but the quote was €449.06:

$$|485.39736 - 449.064| = 36.33336$$

The company lost about €36.33 on the job.

**Where the rounding should have happened.** At the end, and only there. The
measurements $4.35$ and $3.28$ are rational numbers, and they can be carried
exactly as the fractions $\dfrac{87}{20}$ and $\dfrac{82}{25}$. Rounding them to
$4$ and $3$ threw away the $0.35$ m and the $0.28$ m, and the area lost
$2.268$ m$^2$. That lost area was multiplied by the carpet price, the waste
allowance and the profit margin, so the error grew through the chain.

**How much precision a chain needs.** Carry full precision through every step, and
round once at the end. Round the final answer to the accuracy the context needs —
here, to the nearest cent. A decimal shown in a question is not a rounded number;
it is an exact rational number, and it should stay exact until the last line.

## Mixed practice — choose the method first

Work through these without notes. For each one, say **which method you will use
and why** before you calculate. The questions mix every section of the chapter,
and two of them need a method that is not the first one you might reach for.

1. Which of $\mathbb{N}$, $\mathbb{Z}$, $\mathbb{Q}$ and $\mathbb{R}$ is the
   smallest system that contains $-0.75$?
2. Write $0.363636\dots$ as a fraction in its lowest terms.
3. Simplify $\sqrt{75}$.
4. Write $\dfrac{8}{\sqrt{2}}$ with a whole-number denominator.
5. Describe how to construct $\sqrt{2}$ and then $\sqrt{3}$ on the number line.
6. Work out $|-13|$ and the distance between $-5$ and $3$.
7. Solve $|x - 4| = 6$.
8. Simplify $(3a^2)^3$.
9. Solve $3^{2x} = 81$.
10. Write $0.000\,456$ to 2 significant figures and in scientific notation.
11. A quote for a job is rounded to the nearest euro before the profit margin is
    added. Explain why the final figure may be out by more than €1, and say where
    the rounding should happen instead.

## What you can now do

- place a number in $\mathbb{N}$, $\mathbb{Z}$, $\mathbb{Q}$ or $\mathbb{R}$;
- write a terminating or recurring decimal as a fraction;
- simplify a surd, add like surds, and rationalise a denominator;
- construct $\sqrt{2}$ and $\sqrt{3}$ on the number line;
- work out an absolute value and solve a modulus equation or inequality;
- use the laws of indices, including a zero, negative or fractional index;
- solve an equation where the unknown is in the index;
- write a number in scientific notation and round to significant figures;
- keep full precision through a chain and round once at the end.

## Thinking back

Return to the rounded number you wrote down at the start of the chapter — a price
that did not add up, a measurement that was too rough, or an estimate that was
far out.

Now you can say something precise about it. Write down:

- the exact value, if you can find it;
- the rounded value that was used instead;
- the size of the error, as an absolute value;
- whether the error grew through a chain of calculations, and why.

If the rounding did not matter, say that too, and say why not. Knowing when a
rounded number is safe is as useful as knowing how to round.
