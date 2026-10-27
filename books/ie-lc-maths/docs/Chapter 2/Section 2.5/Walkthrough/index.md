---
title: 2.5 Present value — Learn
chapter: 2
chapter_title: Arithmetic in context
section: '2.5'
section_title: Present value
tier: H
refs:
- '3.3'
kind: walkthrough
---

# 2.5 Present value — Learn

**Prerequisites:** Section 2.4 — compound interest.

**Objectives:** work out the present value of a future sum; compare two offers by
bringing both to today; find an interest rate from a loan.

By the end of this section you can say what a sum of money promised later is worth
today, and use that to choose between two offers.

## Money later is worth less than money now

A sum of money in your hand today can earn interest. At $5\%$ a year, €1,000
today becomes €1,050 in a year. So €1,000 today and €1,050 in a year are worth
the same, and a promise of €1,050 in a year is worth only €1,000 today.

That today-value is called the **present value**. Finding it is called
**discounting**, because the future sum is reduced to its value today.

> **Present value.** $P = \dfrac{F}{(1 + i)^t}$, where $P$ is the present value,
> $F$ is the future value, $i$ is the rate as a decimal, and $t$ is the number of
> years.

This is the reverse of compound interest. Compound interest grows a present value
into a future one, and dividing brings a future value back to today.

## Finding a present value

**Example 1.** €5,200 is due in one year. Money earns $4\%$ a year. Work out the
present value.

$$P = \frac{5\,200}{1.04} = 5\,000$$

The present value is €5,000. Invested today at $4\%$, €5,000 becomes €5,200 in a
year.

**Example 2.** €5,618 is due in 2 years. Money earns $6\%$ a year. Work out the
present value.

$$P = \frac{5\,618}{1.06^2} = 5\,000$$

The present value is €5,000. The divisor is $1.06^2$, not $1.06 \times 2$.

## Comparing two offers

To compare an amount now with an amount later, bring both to today. The amount
now is already a present value, and the amount later is discounted.

**Example 3.** The chapter problem. A garage offers to wait 2 years for €12,000,
or to take €11,070 now. Money earns $3\%$ a year. Which offer is cheaper?

Discount the €12,000:

$$P = \frac{12\,000}{1.03^2} = 11\,311.15$$

The present value of the later payment is €11,311.15 to the nearest cent. Paying
€11,070 now is cheaper, by

$$11\,311.15 - 11\,070 = 241.15$$

about €241.15.

You can check the same choice by looking forward instead of back. If Niamh keeps
the €11,070 for two years, it grows to

$$11\,070 \times 1.03^2 = 11\,744.16$$

She then pays €12,000, so she is worse off by about €255.84. Both views say the
same thing: paying now is better.

## Loans and investments

**Example 4.** A loan of €10,000 is repaid as a single payment of €11,236 after 2
years. Work out the annual rate.

$$10\,000(1 + i)^2 = 11\,236$$

Divide by $10\,000$:

$$(1 + i)^2 = 1.1236$$

Take the square root:

$$1 + i = 1.06$$

So $i = 0.06$, and the rate is $6\%$ a year. The square root undoes two years of
growth.

**Example 5.** An investment will be worth €20,000 in 3 years. Money earns $5\%$ a
year. Work out its value today.

$$P = \frac{20\,000}{1.05^3} = 17\,276.75$$

The investment is worth €17,276.75 today, to the nearest cent.

> **Watch out.** Never compare a future amount with a present amount directly.
> €12,000 and €11,070 are not measured at the same time, so comparing them
> decides nothing. Discount the future amount first, and then compare. The other
> trap is the divisor: it is $(1 + i)^t$, not $(1 + it)$. Present value uses
> compound growth, so the power is the number of years.

## Progress check

Back to the chapter problem. Niamh can pay €11,070 now, or €12,000 in 2 years. Her
money earns $3\%$ a year.

Work out the present value of the €12,000. Then say which way of paying is
cheaper, and by how much, in today's money.

Check your answer by growing the €11,070 for two years instead of discounting the
€12,000. Both routes must give the same decision.

## You should now be able to

- say why a sum of money promised later is worth less today;
- work out the present value of a future sum;
- compare an amount now with an amount later by bringing both to today;
- find an annual interest rate from a loan and its repayment;
- check a present-value comparison by growing the present amount instead.
