---
title: 8.4 First-order difference equations — Learn
chapter: 8
chapter_title: Modelling a changing world
section: '8.4'
section_title: First-order difference equations
tier: O
refs:
- S4
kind: walkthrough
---

# 8.4 First-order difference equations — Learn

**Prerequisites:** Section 8.3, recurrence relations and fixed points;
indices.

**Objectives:** recognise a first-order difference equation; find its fixed
point; write its closed form; decide whether the sequence settles.

By the end of this section you can write down the value after any number of
steps without iterating, and say where the sequence is heading.

## From recurrence to formula

A recurrence such as $u_{n+1} = 0.8u_n + 10$ is a rule for stepping forwards. It
is correct but slow: to reach $u_{50}$ you would apply it fifty times. A
**closed form** gives $u_n$ directly as a formula in $n$.

A recurrence of the form

$$u_{n+1} = au_n + b$$

is a **first-order difference equation**. The word "first-order" says that each
term depends only on the one before it.

The fixed point $L$ is found by setting $u_{n+1} = u_n = L$:

$$L = aL + b, \qquad L = \frac{b}{1 - a} \qquad (a \neq 1).$$

## The closed form

The gap between $u_n$ and the fixed point shrinks by a factor of $a$ at each
step. That gives the closed form

$$u_n = a^n(u_0 - L) + L.$$

Read it in two parts. The term $a^n(u_0 - L)$ is the distance from the fixed
point, multiplied by $a$ once per step. The term $L$ is where the sequence is
heading. At $n = 0$ the distance is $u_0 - L$, and the formula returns $u_0$.

**Example 1.** Solve $u_{n+1} = 0.8u_n + 10$ with $u_0 = 0$.

The fixed point is

$$L = \frac{10}{1 - 0.8} = 50.$$

Then

$$u_n = 0.8^n(0 - 50) + 50 = 50 - 50(0.8)^n.$$

Check $n = 0$: $50 - 50 = 0$. Check $n = 1$: $50 - 40 = 10$, which matches the
recurrence.

**Example 2.** Solve $u_{n+1} = 3u_n + 2$ with $u_0 = 1$.

The fixed point is

$$L = \frac{2}{1 - 3} = -1.$$

Then

$$u_n = 3^n(1 - (-1)) + (-1) = 2 \times 3^n - 1.$$

Check $n = 0$: $2 - 1 = 1$. Check $n = 1$: $6 - 1 = 5$, which matches
$3(1) + 2$.

## The arithmetic case

When $a = 1$ the recurrence is $u_{n+1} = u_n + b$. Each step adds the same
amount, so

$$u_n = u_0 + nb.$$

This is an arithmetic sequence. There is no fixed point, because the equation
$L = L + b$ has no solution unless $b = 0$.

**Example 3.** Solve $u_{n+1} = u_n + 5$ with $u_0 = 2$.

$$u_n = 2 + 5n.$$

At $n = 4$ this gives $2 + 20 = 22$.

## Does the sequence settle?

The closed form shows what happens as $n$ grows. The term $a^n$ decides it.

- If $-1 < a < 1$, then $a^n$ tends to zero, so $u_n$ tends to $L$. The sequence
  **settles** to the fixed point.
- If $a > 1$, then $a^n$ grows, so $u_n$ moves away from $L$ without limit.
- If $a < -1$, the terms grow in size and alternate in sign, so the sequence
  does not settle either.

**Example 4.** A loan of €10\,000 is charged $1\%$ interest a month, and €300 is
repaid at the end of each month. The balance is

$$u_{n+1} = 1.01u_n - 300, \qquad u_0 = 10\,000.$$

Find the closed form.

The fixed point is

$$L = \frac{-300}{1 - 1.01} = \frac{-300}{-0.01} = 30\,000.$$

Then

$$u_n = 1.01^n(10\,000 - 30\,000) + 30\,000 = 30\,000 - 20\,000(1.01)^n.$$

Here $a = 1.01 > 1$, so the distance from the fixed point grows. The balance
falls at first, because the repayments are larger than the interest, but the
model says it would eventually turn and grow if the repayments stopped.

> **Watch out.** The fixed point is not $b$, and it is not the starting value. It
> is $\dfrac{b}{1 - a}$, and it is the value the sequence heads towards when
> $|a| < 1$. A second trap is the sign of $a$ when deciding whether the sequence
> settles: the test is on the **size** of $a$, so $a = -0.5$ settles while
> $a = -1.5$ does not. **Re-check:** substitute $n = 0$ into your closed form; it
> must return $u_0$.

## Progress check

Back to the chapter problem. The daily lake model is

$$u_{n+1} = 0.95u_n, \qquad u_0 = 400\ \text{kg}.$$

1. Find the fixed point of this recurrence. What does the value mean for the
   lake?
2. Write the closed form for $u_n$.
3. Use the closed form to find $u_{10}$, the amount left after ten days.
4. Does the sequence settle to the fixed point? Explain in one sentence.

Keep your value of $u_{10}$. Section 8.8 compares it with the continuous model.

## You should now be able to

- recognise a first-order difference equation $u_{n+1} = au_n + b$;
- find its fixed point $L = \dfrac{b}{1 - a}$;
- write its closed form $u_n = a^n(u_0 - L) + L$;
- solve the arithmetic case $u_{n+1} = u_n + b$;
- decide from the size of $a$ whether the sequence settles;
- use a difference equation for a loan or a savings plan.
