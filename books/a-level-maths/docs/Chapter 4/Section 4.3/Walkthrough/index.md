---
title: 4.3 Sequences from formulae and recurrences — Learn
chapter: 4
chapter_title: Sequences and series
section: '4.3'
section_title: Sequences from formulae and recurrences
refs:
- D2
kind: walkthrough
---

# 4.3 Sequences from formulae and recurrences — Learn

**Prerequisites:** substituting a number into a formula; the laws of indices
from Section 2.1; arithmetic with negative numbers.

**By the end of this section you can:** generate the terms of a sequence from a
formula for the $n$th term; generate them from a rule that links each term to
the one before; decide whether a sequence increases, decreases or repeats; and
find a term far along a periodic sequence without listing every term.

## 1. A sequence and its terms

A **sequence** is an ordered list of numbers. Each number in the list is a
**term**. We label the terms $u_1, u_2, u_3, \dots$, where the subscript is the
**position** of the term in the list. The letter $n$ stands for a position, so
$u_n$ means the term in position $n$.

Two sequences are the same only when they have the same terms in the same
order. The sequence $1, 3, 5, 7, \dots$ is not the same as $3, 1, 7, 5, \dots$.

## 2. A formula for the nth term

The first way to define a sequence is a formula. The formula gives any term from
its position, with no need to work out the terms before it.

**Example 1.** A sequence is given by $u_n = 2n^2 - 3$. Work out the first four
terms.

Substitute $n = 1$, then $n = 2$, and so on:

$$
u_1 = 2(1)^2 - 3 = -1,
$$

$$
u_2 = 2(2)^2 - 3 = 5,
$$

$$
u_3 = 2(3)^2 - 3 = 15,
$$

$$
u_4 = 2(4)^2 - 3 = 29.
$$

The sequence begins $-1, 5, 15, 29, \dots$. Each term is larger than the one
before, so the sequence is **increasing**. A term far along is quick to find:
$u_{20} = 2(20)^2 - 3 = 797$, with no need for the terms in between.

## 3. A recurrence

The second way to define a sequence is a **recurrence**. A recurrence gives the
next term from the term before. It must come with a **starting value**, or there
is no term to start from.

**Example 2.** A sequence is given by $u_{n+1} = 3u_n + 2$ and $u_1 = 4$. Work out
the next three terms.

Substitute the value you have to get the next one:

$$
u_2 = 3u_1 + 2 = 3(4) + 2 = 14,
$$

$$
u_3 = 3u_2 + 2 = 3(14) + 2 = 44,
$$

$$
u_4 = 3u_3 + 2 = 3(44) + 2 = 134.
$$

The sequence begins $4, 14, 44, 134, \dots$ and it is increasing. To find
$u_{20}$ you would have to work out every term on the way, because the rule
gives no shortcut. That is the price of a recurrence, and the reason a formula
for the $n$th term is more useful when one can be found.

The **Fibonacci sequence** is a famous recurrence with two starting values:

$$
u_1 = 1, \qquad u_2 = 1, \qquad u_{n+2} = u_{n+1} + u_n.
$$

Its terms are $1, 1, 2, 3, 5, 8, 13, \dots$. Each term is the sum of the two
before it.

## 4. Increasing, decreasing and periodic

A sequence is:

- **increasing** when every term is larger than the one before it, so
  $u_{n+1} > u_n$ for every $n$;
- **decreasing** when every term is smaller than the one before it, so
  $u_{n+1} < u_n$ for every $n$;
- **periodic** when the terms repeat in a fixed pattern. If the pattern repeats
  every $p$ terms, then $u_{n+p} = u_n$ for every $n$, and the **period** is $p$.

A sequence that always stays between two fixed numbers is **bounded**. The
sequence $u_{n+1} = 0.8u_n$ with $u_1 = 600$ is decreasing and bounded below by
$0$, because each term is a positive fraction of the one before.

**Example 3.** A sequence repeats the pattern $2, 5, 7, 2, 5, 7, \dots$. Work
out $u_{100}$.

The period is $3$, because the pattern has three terms. Divide the position by
the period: $100 = 3 \times 33 + 1$, so position $100$ is the first term of a
block. Therefore $u_{100} = u_1 = 2$.

The remainder gives the position inside a block. A remainder of $1$ means the
first term of a block, a remainder of $2$ means the second, and a remainder of
$0$ means the last term of a block.

## 5. A recurrence for the chapter problem

The two fundraising streams in the chapter problem are both sequences.

- The quiz night raises £150 in month 1 and £50 more each month, so
  $q_1 = 150$ and $q_{n+1} = q_n + 50$.
- The online appeal raises £600 in month 1 and 80% of that each month after, so
  $a_1 = 600$ and $a_{n+1} = 0.8a_n$.

The first recurrence adds a fixed amount, so the sequence increases steadily.
The second multiplies by a fixed fraction, so the sequence decreases and settles
towards $0$. The next sections turn each of these patterns into a formula.

> **Watch out.** The commonest error is an off-by-one slip with the position.
>
> **Starting at the wrong index.** A sequence labelled $u_1, u_2, u_3, \dots$
> begins at position $1$, not $0$. For $u_n = 2n^2 - 3$, the first term is
> $u_1 = -1$, not $u_0 = -3$. If you use $n = 0$ you have shifted every term by
> one place.
>
> **A recurrence without a start.** The rule $u_{n+1} = 3u_n + 2$ on its own
> gives no particular sequence. The value $u_1 = 4$ is part of the definition.
> **Re-check:** after three steps of a recurrence, substitute your term back
> into the rule to confirm the next one.

## Progress check

Return to the chapter problem. Use $q_{n+1} = q_n + 50$ with $q_1 = 150$ for the
quiz night, and $a_{n+1} = 0.8a_n$ with $a_1 = 600$ for the online appeal.

1. Work out the quiz income in month 8.
2. Work out the appeal income in month 5, to the nearest penny.
3. Decide whether each sequence increases or decreases.
4. Explain why the appeal income can never be negative, whatever the month.

## You should now be able to

- generate terms from a formula for the $n$th term;
- generate terms from a recurrence, given its starting value;
- decide whether a sequence increases, decreases or repeats;
- find the period of a periodic sequence and use it to find a distant term;
- read a recurrence as a description of how a real quantity changes.
