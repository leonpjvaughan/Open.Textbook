---
title: 4.7 Sequences and series in modelling — Practise with help
chapter: 4
chapter_title: Sequences and series
section: '4.7'
section_title: Sequences and series in modelling
refs:
- D6
- OT3
kind: guided-problems
---

# 4.7 Sequences and series in modelling — Practise with help

Work each one first, closed book. Decide whether the quantity changes by a fixed
amount or by a fixed factor before you write anything down. State the
assumptions of your model in one sentence.

## Warm-up: remember

1. Work out the 5th term of the geometric sequence $3, 6, 12, \dots$.
2. Work out the sum of the first 6 terms of $2, 5, 8, \dots$.
3. A recurrence is given by $u_{n+1} = 0.5u_n + 10$ and $u_1 = 10$. Work out
   $u_3$.

<details markdown="1">
<summary>Answers</summary>

1. Here $a = 3$ and $r = 2$, so $u_5 = 3(2)^4 = 48$.
2. The sequence is arithmetic with $a = 2$ and $d = 3$, so
   $S_6 = \frac{6}{2}(2(2) + 5(3)) = 3(19) = 57$.
3. $u_2 = 0.5(10) + 10 = 15$, so $u_3 = 0.5(15) + 10 = 17.5$.

If question 3 was hard, revisit recurrences in Section 4.3 before you continue.
The recurrence adds a fixed amount each step, so the terms settle.
</details>

## Practise with help

**1.** A quantity takes the values $200, 220, 242, \dots$. Decide whether an
arithmetic or a geometric model fits, and work out the 6th value.

<details markdown="1">
<summary>Hint</summary>

Work out the differences and the ratios between consecutive values. One of them
is constant.
</details>

<details markdown="1">
<summary>Next step</summary>

The ratios are $\frac{220}{200} = 1.1$ and $\frac{242}{220} = 1.1$, so the model
is geometric with $r = 1.1$. Then $u_6 = 200(1.1)^5$.
</details>

<details markdown="1">
<summary>Full working</summary>

The ratios are constant, so the model is geometric with $a = 200$ and $r = 1.1$.

$$
u_6 = 200(1.1)^5 = 200(1.61051) = 322.102.
$$

The 6th value is $322.102$. The differences grow, which is the sign of a
geometric model: $20$, then $22$, then more each step.
</details>

**2.** A quantity takes the values $80, 95, 110, \dots$. Decide which model
fits, and work out the 10th value.

<details markdown="1">
<summary>Hint</summary>

Check the differences first. If they are constant, the model is arithmetic.
</details>

<details markdown="1">
<summary>Next step</summary>

The difference is $95 - 80 = 15$, and $110 - 95 = 15$. Use
$u_n = 80 + (n - 1)(15)$ with $n = 10$.
</details>

<details markdown="1">
<summary>Full working</summary>

The differences are constant at $15$, so the model is arithmetic with $a = 80$
and $d = 15$.

$$
u_{10} = 80 + (10 - 1)(15) = 80 + 135 = 215.
$$

The 10th value is $215$. The model adds the same amount at every step, so a graph
of the values is a straight line.
</details>

**3.** At the start of year 1 a village has $12{,}000$ people, and the population
grows by 3% each year. Work out the population at the start of year 6.

<details markdown="1">
<summary>Hint</summary>

A rise of 3% means the growth factor is $1.03$. This is a geometric model, so
use $P_n = P_1 r^{n-1}$.
</details>

<details markdown="1">
<summary>Next step</summary>

$P_6 = 12{,}000(1.03)^{6-1} = 12{,}000(1.03)^5$. Work out $1.03^5$ first, then
multiply.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
P_6 = 12{,}000(1.03)^5 = 12{,}000(1.1592740743) = 13{,}911.3.
$$

The population is about $13{,}911$ people at the start of year 6. A population
is a whole number, so the value is rounded, and the model treats a fraction of a
person as meaningful, which it cannot be.
</details>

**4.** A tree is $2$ m tall at the start of year 1 and grows by 8% each year, so
$h_n = 2(1.08)^{n-1}$ metres at the start of year $n$. Use trial and improvement
to find when the tree first passes $3$ m.

<details markdown="1">
<summary>Hint</summary>

You need $2(1.08)^{n-1} > 3$, so $(1.08)^{n-1} > 1.5$. Try two values of the
power on either side of $1.5$.
</details>

<details markdown="1">
<summary>Next step</summary>

Work out $1.08^5$ and $1.08^6$, then substitute each into the model to find the
two heights around $3$ m.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
1.08^5 = 1.4693, \qquad 1.08^6 = 1.5869.
$$

So

$$
h_6 = 2(1.4693) = 2.939 \text{ m}, \qquad h_7 = 2(1.5869) = 3.174 \text{ m}.
$$

The tree is below $3$ m at the start of year 6 and above it at the start of year
7, so it first passes $3$ m during year 6. The answer names a year, and the model
gives no information about the height at a finer interval.
</details>

**5.** A patient takes a dose each day. The amount in the body just after a dose
follows $u_{n+1} = 0.4u_n + 60$ with $u_1 = 60$ mg. Find the level the amount
settles on.

<details markdown="1">
<summary>Hint</summary>

At the settling level $L$, the next amount equals the current one, so
$L = 0.4L + 60$.
</details>

<details markdown="1">
<summary>Next step</summary>

Subtract $0.4L$ from both sides: $0.6L = 60$. Then divide by $0.6$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
L = 0.4L + 60 \implies 0.6L = 60 \implies L = 100.
$$

The amount settles at 100 mg. The terms $60, 84, 93.6, \dots$ creep towards
$100$, which the recurrence confirms in one line.
</details>

**6.** A savings account holds £500. Each year the account adds 5% interest, then
the saver deposits £200. The balance just after a deposit follows
$u_{n+1} = 1.05u_n + 200$ with $u_1 = 500$. Work out the balance just after the
4th deposit.

<details markdown="1">
<summary>Hint</summary>

The 4th deposit is three steps after the 1st. Apply the rule three times, or
write the terms out one at a time.
</details>

<details markdown="1">
<summary>Next step</summary>

$u_2 = 1.05(500) + 200 = 725$, then find $u_3$, then $u_4$. Keep the pence at
each step rather than rounding.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
u_2 = 1.05(500) + 200 = 725,
$$

$$
u_3 = 1.05(725) + 200 = 961.25,
$$

$$
u_4 = 1.05(961.25) + 200 = 1209.3125.
$$

The balance is £1209.31 just after the 4th deposit, to the nearest penny. The
interest is worked out before the deposit is added, which is the order the
situation describes.
</details>

**7.** The quiz night raises $25n^2 + 125n$ pounds in its first $n$ months. The
appeal raises $3000(1 - 0.8^n)$ pounds. Work out the total after 14 months, to
the nearest penny.

<details markdown="1">
<summary>Hint</summary>

Work out each stream for $n = 14$ and add them. The quiz total grows quickly,
because it contains $n^2$.
</details>

<details markdown="1">
<summary>Next step</summary>

Quiz: $25(14^2) + 125(14) = 4900 + 1750$. Appeal: $3000(1 - 0.8^{14})$, and
$0.8^{14} = 0.0439804651$ to ten decimal places.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\text{quiz} = 25(196) + 1750 = 6650,
$$

$$
\text{appeal} = 3000(1 - 0.0439804651) = 3000(0.9560195349) = 2868.06.
$$

The total is

$$
6650 + 2868.06 = 9518.06,
$$

which is £9518.06 to the nearest penny. That is above £9,000, so the roof is paid
for by the end of month 14.
</details>
