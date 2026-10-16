---
title: 2.6 Checking whether a result is reasonable — Learn
chapter: 2
chapter_title: Arithmetic in context
section: '2.6'
section_title: Checking whether a result is reasonable
tier: F
refs:
- '3.3'
kind: walkthrough
---

# 2.6 Checking whether a result is reasonable — Learn

**Prerequisites:** Sections 2.1 to 2.4 — percentages, profit, tax and interest.

**Objectives:** check the size of a result; work a problem backwards; judge
whether an answer is plausible; round to the accuracy the context needs.

By the end of this section you can tell a sensible answer from an impossible one,
and check a calculation without repeating it.

## Check the size

An **order of magnitude** check rounds every number to one significant figure and
works out the answer roughly. It does not give the exact answer, and it does not
try to. It tells you the size the answer should be.

**Example 1.** Check the size of $4\,986 \times 21$.

Round $4\,986$ to $5\,000$ and $21$ to $20$:

$$5\,000 \times 20 = 100\,000$$

The exact answer is $104\,706$, which is close to $100\,000$. The exact answer is
the right size. An exact answer of $10\,470\,600$ would be ten times too big, so
something would have gone wrong.

## Work backwards

A reverse calculation is its own check. If you worked out a value by multiplying,
divide to get back to where you started.

**Example 2.** A price after a $23\%$ increase is €11,070. Work out the original
price.

$$11\,070 \div 1.23 = 9\,000$$

The original price was €9,000. Check by working forwards: $9\,000 \times 1.23 =
11\,070$. The two calculations agree, so the answer is consistent.

**Example 3.** The chapter problem. The oven costs €11,070 and adds €2,340 of net
profit a year. Work out the payback time, and check it.

$$11\,070 \div 2\,340 = 4.73\ldots$$

The oven pays for itself in about $4.7$ years. Check by working forwards:

$$4.7 \times 2\,340 = 10\,998$$

That is just below €11,070, so $4.7$ years is the right size. An answer of $0.47$
years or $47$ years would be impossible, and the check would catch it.

## Judge whether an answer is possible

Some checks need no arithmetic at all. Read the answer and ask whether it could be
true.

- Net pay must be **less** than gross pay, because deductions only take money off.
- A discount must **reduce** a price.
- A present value must be **less** than the future amount, because money grows
  over time.
- A loss percentage must be positive, and a profit of more than $100\%$ of the
  cost price is possible but worth a second look.
- A payback time longer than the life of the machine means the machine never pays
  for itself.

If an answer breaks one of these, the calculation has gone wrong somewhere.

> **Watch out.** An estimate is not an answer, and a check is not a repeat of the
> calculation. Writing "I worked it out twice" checks nothing, because the same
> mistake happens twice. A real check changes the route: estimate the size,
> reverse the operation, or test the answer against something you already know.
> Write the check down, so that a reader can see why the answer is trusted.

<!-- tier:o -->

## Percentage error and tolerance

An estimate is never exact, so it helps to measure how far out it is.

> **Percentage error.** $\text{percentage error} =
> \dfrac{|\text{estimate} - \text{exact value}|}{\text{exact value}} \times 100$.

**Example 4.** An estimate is $100\,000$ and the exact value is $104\,706$. Work
out the percentage error, to one decimal place.

$$|100\,000 - 104\,706| = 4\,706$$

$$\frac{4\,706}{104\,706} \times 100 = 4.49\ldots\%$$

The percentage error is $4.5\%$ to one decimal place. A percentage error of a few
per cent shows that the estimate is good enough to check the size of an answer.

A **tolerance** is the error a measurement or a result is allowed to have. If a
part must be $50$ mm long with a tolerance of $\pm 0.5$ mm, then any length from
$49.5$ mm to $50.5$ mm is acceptable.

## Accumulated error

When you add or subtract rounded measurements, the errors add too.

**Example 5.** Two lengths are $12.4$ m and $8.3$ m, each rounded to the nearest
$0.1$ m. Work out the largest possible error in the sum.

Each length could be out by up to $0.05$ m. Adding them gives a sum of
$12.4 + 8.3 = 20.7$ m, and the errors add:

$$0.05 + 0.05 = 0.1 \text{ m}$$

The sum could be out by up to $0.1$ m. Errors accumulate by addition and
subtraction only; a product needs a different rule.

## Average rate of change

An **average rate of change** is the total change divided by the time it took.

**Example 6.** A town's population grows from $8\,000$ to $8\,600$ in 4 years.
Work out the average rate of change per year.

$$\frac{8\,600 - 8\,000}{4} = \frac{600}{4} = 150$$

The population grows by $150$ people a year on average. The average rate does not
say that the population grew by exactly $150$ in every year.

<!-- /tier:o -->

## Progress check

Back to the chapter problem. The oven costs €11,070 and adds €2,340 of net profit
a year.

Work out the payback time to one decimal place. Then check it by working forwards:
multiply your answer by €2,340 and compare the result with €11,070.

Then check the present-value answer. The €12,000 in two years has a present value
of about €11,311. Say why that value must be less than €12,000, and why the answer
of about €241 must be smaller than the €11,070.

## You should now be able to

- check the size of an answer by rounding every number to one significant figure;
- work a problem backwards to check a forward calculation;
- judge whether an answer is possible, from the meaning of the quantities;
- round a result to the accuracy the context needs;
- work out a percentage error and explain what a tolerance means;
- add the errors of rounded measurements that are added or subtracted;
- work out an average rate of change.
