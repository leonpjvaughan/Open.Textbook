---
title: 'Chapter 4: Review'
chapter: 4
kind: review
---

# Chapter 4: Review

## The chapter problem, solved

The village hall needs a new roof, and it will cost £9,000. Two fundraising
streams run at the same time, and a former resident gives £2,000 at the start.
The gift is invested at 6% compound interest each year.

**Step 1. Name each stream as a sequence.** The quiz night raises £150 in month
1 and £50 more each month, so it is arithmetic:

$$
q_n = 150 + 50(n - 1) = 50n + 100.
$$

The online appeal raises £600 in month 1 and 80% of that each month after, so it
is geometric:

$$
a_n = 600(0.8)^{n-1}.
$$

Here $q_n$ is the amount the quiz night raises in month $n$ and $a_n$ is the
amount the appeal raises.

**Step 2. Find the first few months, to check the models.** The quiz night gives
$150, 200, 250, \dots$, and the appeal gives $600, 480, 384, \dots$. The quiz
night grows by a fixed amount, and the appeal falls by a fixed factor. Over a
year the quiz night raises more, even though the appeal starts higher.

**Step 3. Find the total from each stream after 12 months.** For the arithmetic
stream,

$$
S^{q}_{12} = \frac{12}{2}\bigl(2(150) + 11(50)\bigr) = 6(300 + 550) = 5100.
$$

For the geometric stream,

$$
S^{a}_{12} = \frac{600(1 - 0.8^{12})}{1 - 0.8} = 3000(1 - 0.8^{12}) = 2793.84.
$$

After one year the fund holds $5100 + 2793.84 = 7893.84$, which is short of
£9,000 by £1106.16.

**Step 4. Find the most the appeal can ever raise.** The common ratio is
$0.8$, and $|0.8| < 1$, so the series converges:

$$
S^{a}_\infty = \frac{600}{1 - 0.8} = 3000.
$$

The appeal can never raise more than £3,000, however long it runs. That is why
the second stream cannot pay for the roof on its own.

**Step 5. Decide whether the fund reaches £9,000, and when.** After $n$ months
the total is

$$
T_n = 25n^2 + 125n + 3000(1 - 0.8^n).
$$

At the end of month 13,

$$
T_{13} = 5850 + 2835.07 = 8685.07,
$$

which is below £9,000. At the end of month 14,

$$
T_{14} = 6650 + 2868.06 = 9518.06,
$$

which is above. **The fund passes £9,000 during month 14.** The roof is paid
for, and the two streams together do it sooner than the quiz night alone.

**Step 6. Refine the plan.** The quiz night alone raises $25n^2 + 125n$ pounds.
Set this equal to $9000$:

$$
25n^2 + 125n = 9000 \implies n^2 + 5n - 360 = 0.
$$

The formula gives $n = \frac{-5 + \sqrt{1465}}{2} \approx 16.6$, so the quiz
night alone would take until month 17. The appeal brings the date forward by
about three months, and it is worth the effort even though its total is capped at
£3,000.

**Step 7. Find the value of the gift.** After 3 years,

$$
2000(1.06)^3 = 2000(1 + 3(0.06) + 3(0.06)^2 + (0.06)^3)
= 2000(1.191016) = 2382.03,
$$

so the gift is worth £2382.03. If the committee moves the money after
$2\frac{1}{2}$ years instead, the binomial expansion for a rational power gives

$$
(1.06)^{\frac{5}{2}} \approx 1 + \frac{5}{2}(0.06) + \frac{15}{8}(0.06)^2
+ \frac{5}{16}(0.06)^3 = 1.1568175\dots,
$$

so the gift is worth about $2000 \times 1.1568175 = 2313.63$ pounds.

**The chapter's answer.** The fund passes £9,000 during month 14 and holds
£9518.06 by the end of that month. The online appeal raises £2793.84 in the
first year and can never exceed £3,000. The quiz night alone would take until
month 17. The £2,000 gift is worth £2382.03 after 3 years, or about £2313.63
after $2\frac{1}{2}$ years. The roof is paid for.

## Mixed practice — choose the method first

For each question, say which method you will use and why before you calculate.
The items mix this chapter with Chapters 1, 2 and 3, so the choice is not always
obvious.

:::problems chapter-04-review

:::answers chapter-04-review

## What you can now do

- use factorials and binomial coefficients, and expand $(a + bx)^n$ for a
  positive whole number $n$;
- find a single term or coefficient without expanding the whole bracket;
- expand $(1 + x)^n$ for a rational $n$, state the range of validity, and
  approximate a value with the first few terms;
- generate a sequence from a formula or a recurrence, and describe its
  behaviour;
- read and write sums in sigma notation, and use the standard results;
- find the $n$th term and the sum of an arithmetic sequence;
- find the $n$th term and the sum of a geometric sequence, and the sum to
  infinity when $|r| < 1$;
- choose a sequence model, state its assumptions, find when it reaches a target,
  and refine it.

## Your relevance reflection

Return to the prompt in the chapter opener: something in your own life that
changes by a rule. Write down your starting value and your rule again. Now add
three things you could not have said before this chapter: the formula for the
$n$th value, the total after a given number of steps, and whether the change is
a fixed amount or a fixed factor. Finish with one sentence about what the model
leaves out.
