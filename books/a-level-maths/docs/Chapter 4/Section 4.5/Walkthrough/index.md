---
title: 4.5 Arithmetic sequences and series — Learn
chapter: 4
chapter_title: Sequences and series
section: '4.5'
section_title: Arithmetic sequences and series
dfe:
- D4
kind: walkthrough
---

# 4.5 Arithmetic sequences and series — Learn

**Prerequisites:** generating terms of a sequence from a formula in Section 4.3;
solving a linear equation; substituting into a formula.

**By the end of this section you can:** find the $n$th term of an arithmetic
sequence; find the sum of the first $n$ terms of an arithmetic series; work out
how many terms a series has; and use an arithmetic series to model a total that
rises by a fixed amount.

## 1. The common difference

An **arithmetic sequence** rises or falls by the same amount at every step. That
fixed amount is the **common difference**, written $d$. The first term is written
$a$.

$$
5, \; 9, \; 13, \; 17, \; \dots
$$

Each term here is $4$ more than the one before, so $d = 4$ and $a = 5$. An
arithmetic sequence with $d < 0$ falls.

## 2. The nth term

To reach the $n$th term you start at $a$ and add $d$ once for each step. From
position $1$ to position $n$ there are $n - 1$ steps, so

$$
u_n = a + (n - 1)d.
$$

**Example 1.** The first three terms of an arithmetic sequence are
$7, 11, 15$. Work out the 15th term.

Here $a = 7$ and $d = 11 - 7 = 4$. Substitute $n = 15$:

$$
u_{15} = 7 + (15 - 1)(4) = 7 + 56 = 63.
$$

The number of steps is $14$, not $15$. The term $u_1$ is the starting point, so
it needs no step.

## 3. The sum of an arithmetic series

The **series** is the total of the terms. The sum of the first $n$ terms is
written $S_n$. For an arithmetic series,

$$
S_n = \frac{n}{2}\bigl(2a + (n - 1)d\bigr).
$$

There is a neat reason. Pair the first term with the last, the second with the
second last, and so on. Every pair has the same total, $a + l$, where $l$ is the
last term. There are $n$ terms, so there are $\frac{n}{2}$ pairs:

$$
S_n = \frac{n}{2}(a + l),
$$

where $l = u_n$ is the last term. Both forms give the same answer; the second is
quicker when you already know the last term.

**Example 2.** Work out the sum of the first 20 terms of
$5, 9, 13, \dots$.

Here $a = 5$ and $d = 4$. Use the first form with $n = 20$:

$$
S_{20} = \frac{20}{2}\bigl(2(5) + 19(4)\bigr) = 10(10 + 76) = 10(86) = 860.
$$

The bracket is $2a + (n - 1)d$, so it uses $n - 1$, exactly as the term formula
does.

**Example 3.** Work out the sum $3 + 7 + 11 + \dots + 83$.

First find how many terms there are. The $n$th term is $a + (n - 1)d$ with
$a = 3$ and $d = 4$:

$$
3 + (n - 1)(4) = 83.
$$

So $4(n - 1) = 80$, giving $n - 1 = 20$ and $n = 21$. There are 21 terms. Use
the last-term form:

$$
S_{21} = \frac{21}{2}(3 + 83) = \frac{21}{2}(86) = 21 \times 43 = 903.
$$

The sum is $903$. Finding $n$ first is the whole of the work in a question like
this one.

## 4. Try it: adding the terms one at a time

**Predict first.** The bars show the running total of the series. Before you
touch the sliders, predict what the running total does when $d$ is negative, and
what it does when $d = 0$. Write both predictions down.

:::figure ch4-arithmetic-total

**Test.** Set $a = 5$ and $d = 4$, then move the slider for $n$ from $1$ up to
$8$ and watch the bars grow. Now set $d$ to a negative value and move $n$ again.

The line marks the individual terms. Each bar is taller than the bar before it
by the height of the term above it.

**Explain.** Write two sentences saying why each bar grows by the height of the
term beside it, and why the running total after $n$ terms is much larger than
the $n$th term alone.

## 5. The chapter problem

The quiz night raises £150 in month 1 and £50 more each month. Its income is an
arithmetic sequence with $a = 150$ and $d = 50$.

**Example 4.** Work out the total the quiz night raises in the first 12 months.

$$
S_{12} = \frac{12}{2}\bigl(2(150) + 11(50)\bigr) = 6(300 + 550) = 6(850) = 5100.
$$

The quiz night raises £5100 in its first year. That is more than half of the
£9,000 the roof needs, and the income keeps rising.

> **Watch out.** Two slips account for most lost marks here.
>
> **Using $n$ where $n - 1$ belongs.** To find the 15th term of
> $7, 11, 15, \dots$, the number of steps is $14$, so $u_{15} = 7 + 14(4) = 63$.
> Writing $7 + 15(4) = 67$ adds one step too many, because the first term is the
> start of the journey, not a step. **Re-check:** the 2nd term must be
> $a + d$. Put $n = 2$ into your formula and confirm it gives exactly one step.
>
> **Confusing the term with the sum.** The term $u_{15}$ is one number, the
> income in month 15. The sum $S_{15}$ is the total of the first fifteen terms.
> For the quiz night, $u_{15} = 150 + 14(50) = 850$, while
> $S_{15} = \frac{15}{2}(150 + 850) = 7500$. The sum is much larger, and the
> question tells you which one it wants by using the words "month" and "total".

## Progress check

Return to the chapter problem. The quiz night has $a = 150$ and $d = 50$.

1. Work out the quiz income in month 12 using $u_n = a + (n - 1)d$.
2. Work out the total quiz income in the first 12 months using the series
   formula, and check it against $S_n = \frac{n}{2}(a + l)$.
3. The first year raises £5100. Find how much the quiz night has raised by the
   end of month 18, and decide whether that alone pays for the roof.
4. Explain why the quiz night will reach £9,000 eventually, whatever the delay.

## You should now be able to

- identify the first term and the common difference of an arithmetic sequence;
- find the $n$th term with $u_n = a + (n - 1)d$;
- find the sum of the first $n$ terms with either form of the series formula;
- work out how many terms a series has before adding them;
- use an arithmetic series to model a total that rises by a fixed amount each
  step.
