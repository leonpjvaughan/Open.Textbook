---
title: 4.3 Sequences from formulae and recurrences — Practise with help
chapter: 4
chapter_title: Sequences and series
section: '4.3'
section_title: Sequences from formulae and recurrences
dfe:
- D2
kind: guided-problems
---

# 4.3 Sequences from formulae and recurrences — Practise with help

Work each one first, closed book. When you meet a recurrence, write the starting
value down beside it before you substitute.

## Warm-up: remember

1. Work out $2(4)^2 - 3$.
2. Work out $3 \times 5 + 2$ and $3(5 + 2)$.
3. Write down the next two terms of $2, 5, 8, 11, \dots$.

<details markdown="1">
<summary>Answers</summary>

1. $2(16) - 3 = 32 - 3 = 29$.
2. $3 \times 5 + 2 = 17$, and $3(5 + 2) = 3 \times 7 = 21$. The bracket changes
   the answer.
3. The terms rise by $3$, so the next two are $14$ and $17$.

If question 1 was hard, revisit the order of operations before you continue. The
power comes before the multiplication.
</details>

## Practise with help

**1.** A sequence is given by $u_n = 3n + 1$. Write down the first four terms.

<details markdown="1">
<summary>Hint</summary>

The subscript is the position. The first term is $u_1$, so substitute $n = 1$
into the rule.
</details>

<details markdown="1">
<summary>Next step</summary>

Substitute $n = 1, 2, 3, 4$ in turn. The first term is $u_1 = 3(1) + 1$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
u_1 = 3(1) + 1 = 4, \qquad u_2 = 3(2) + 1 = 7,
$$

$$
u_3 = 3(3) + 1 = 10, \qquad u_4 = 3(4) + 1 = 13.
$$

The first four terms are $4, 7, 10, 13$. The sequence is increasing.
</details>

**2.** A sequence is given by $u_n = n^2 - 2n$. Work out $u_5$ and $u_{10}$.

<details markdown="1">
<summary>Hint</summary>

The rule gives any term from its position, so there is no need to work out the
terms in between.
</details>

<details markdown="1">
<summary>Next step</summary>

Substitute $n = 5$: the first term of the expression is $5^2 = 25$, and the
second is $2 \times 5 = 10$. Then substitute $n = 10$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
u_5 = 5^2 - 2(5) = 25 - 10 = 15,
$$

$$
u_{10} = 10^2 - 2(10) = 100 - 20 = 80.
$$

The tenth term is $80$. Notice how much faster the terms grow than in question
1, because the rule contains $n^2$.
</details>

**3.** A sequence is given by $u_{n+1} = 2u_n + 1$ and $u_1 = 3$. Work out
$u_2$, $u_3$ and $u_4$.

<details markdown="1">
<summary>Hint</summary>

Each step uses the term you found a moment ago. Put the value into the rule to get
the next one.
</details>

<details markdown="1">
<summary>Next step</summary>

Start with $u_1 = 3$, so $u_2 = 2(3) + 1$. Then put the value of $u_2$ back into
the same rule.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
u_2 = 2u_1 + 1 = 2(3) + 1 = 7,
$$

$$
u_3 = 2u_2 + 1 = 2(7) + 1 = 15,
$$

$$
u_4 = 2u_3 + 1 = 2(15) + 1 = 31.
$$

The first four terms are $3, 7, 15, 31$. Each term is larger than the one
before.
</details>

**4.** A sequence is given by $u_{n+1} = 5 - u_n$ and $u_1 = 1$. Write down the
first five terms and describe the sequence.

<details markdown="1">
<summary>Hint</summary>

Work out one term at a time. Watch what happens when a term is bigger than $5$,
because the rule subtracts it from $5$.
</details>

<details markdown="1">
<summary>Next step</summary>

$u_2 = 5 - 1 = 4$. Then $u_3 = 5 - 4 = 1$. Carry on for two more terms and look
for a pattern.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
u_1 = 1, \quad u_2 = 4, \quad u_3 = 1, \quad u_4 = 4, \quad u_5 = 1.
$$

The terms repeat in the pattern $1, 4$. The sequence is periodic with period
$2$, so $u_{n+2} = u_n$ for every $n$. It is neither increasing nor decreasing.
</details>

**5.** A sequence repeats the pattern $4, 9, 4, 9, \dots$. Work out $u_{50}$.

<details markdown="1">
<summary>Hint</summary>

Find the period first. Then divide the position by the period and look at the
remainder.
</details>

<details markdown="1">
<summary>Next step</summary>

The period is $2$. Work out $50 \div 2$ and find the remainder, then read off
the matching term of the block.
</details>

<details markdown="1">
<summary>Full working</summary>

The period is $2$, and $50 = 2 \times 25 + 0$. A remainder of $0$ means the last
term of a block, which is $9$. So $u_{50} = 9$. The even positions all hold $9$
and the odd positions all hold $4$.
</details>

**6.** The quiz night in the chapter problem raises £150 in month 1 and £50 more
each month. Its income follows $q_{n+1} = q_n + 50$ with $q_1 = 150$. Work out
the income in month 6.

<details markdown="1">
<summary>Hint</summary>

Month 6 is five steps after month 1, so there are five additions of £50. You can
count forward or use the pattern.
</details>

<details markdown="1">
<summary>Next step</summary>

Month 6 is $q_6 = q_1 + 5 \times 50 = 150 + 250$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
q_6 = q_1 + 5(50) = 150 + 250 = 400.
$$

The quiz night raises £400 in month 6. The income in month $n$ is
$q_n = 150 + 50(n - 1)$, so the sequence increases by £50 each month.
</details>

**7.** The online appeal raises £600 in month 1 and 80% of that each month
after. Its income follows $a_{n+1} = 0.8a_n$ with $a_1 = 600$. Work out the
income in month 4, to the nearest penny.

<details markdown="1">
<summary>Hint</summary>

Month 4 is three steps after month 1, so the rule is applied three times. Each
step multiplies by $0.8$.
</details>

<details markdown="1">
<summary>Next step</summary>

$a_4 = 600 \times 0.8 \times 0.8 \times 0.8 = 600 \times 0.8^3$. Work out
$0.8^3 = 0.512$ first.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
a_4 = 600(0.8)^3 = 600 \times 0.512 = 307.2.
$$

The appeal income in month 4 is £307.20. The sequence decreases, and each term
is 80% of the one before. The general rule is $a_n = 600(0.8)^{n-1}$.
</details>
