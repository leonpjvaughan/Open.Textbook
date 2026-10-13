---
title: 13.2 Calculating binomial probabilities — Learn
chapter: 13
chapter_title: Statistical distributions
section: '13.2'
section_title: Calculating binomial probabilities
refs:
- N1
kind: walkthrough
---

# 13.2 Calculating binomial probabilities — Learn

**Prerequisites:** the binomial formula and the four conditions from
Section 13.1; the complement rule from Section 12.1.

**By the end of this section you can:** find $P(X = r)$ for a binomial
variable; find an at-most probability $P(X \le r)$; find an at-least
probability $P(X \ge r)$ using the complement; and find a between probability
$P(a \le X \le b)$.

## 1. From one value to a range

The formula from Section 13.1 gives the probability of exactly one value of
$X$:

$$
P(X = r) = \binom{n}{r} p^r (1-p)^{n-r}.
$$

Most questions ask for a **range** of values. The probabilities of the
individual values are added, because the values do not overlap. For a binomial
variable,

$$
P(X \le r) = P(X = 0) + P(X = 1) + \dots + P(X = r).
$$

**Example 1.** The random variable $X \sim B(10, 0.4)$. Find $P(X \le 2)$.

The possible values 0, 1 and 2 are the ones we need. Work out each term.

$$
P(X = 0) = (0.6)^{10} = 0.0060466 \ (4 \text{ d.p.}),
$$

$$
P(X = 1) = \binom{10}{1}(0.4)(0.6)^9 = 10 \times 0.4 \times 0.0100777
= 0.0403108 \ (4 \text{ d.p.}),
$$

$$
P(X = 2) = \binom{10}{2}(0.4)^2(0.6)^8 = 45 \times 0.16 \times 0.0167962
= 0.1209324 \ (4 \text{ d.p.}).
$$

Add the three terms:

$$
P(X \le 2) = 0.0060466 + 0.0403108 + 0.1209324 = 0.1673 \ (4 \text{ d.p.}).
$$

## 2. At least, using the complement

For an at-least probability, the values run to the top of the range. There are
two routes.

- Add the terms from $r$ up to $n$.
- Use the complement: $P(X \ge r) = 1 - P(X \le r - 1)$.

Choose the route with fewer terms. The complement rule is

$$
P(X \ge r) = 1 - P(X < r) = 1 - P(X \le r - 1).
$$

The subtraction uses $r - 1$, not $r$. The event $X \ge r$ leaves out every
value up to and including $r - 1$.

**Example 2.** The random variable $X \sim B(10, 0.4)$. Find $P(X \ge 8)$.

Adding the terms from 8 to 10 uses three terms:

$$
P(X = 8) = \binom{10}{8}(0.4)^8(0.6)^2 = 45 \times 0.0006554 \times 0.36
= 0.0106168,
$$

$$
P(X = 9) = \binom{10}{9}(0.4)^9(0.6) = 10 \times 0.0002621 \times 0.6
= 0.0015729,
$$

$$
P(X = 10) = (0.4)^{10} = 0.0001049.
$$

Add:

$$
P(X \ge 8) = 0.0106168 + 0.0015729 + 0.0001049 = 0.0123
\ (4 \text{ d.p.}).
$$

The complement route would need the seven terms from 0 to 7, so adding the
three terms is shorter.

## 3. Between two values

For a between probability, add the terms from the lower value to the upper
value:

$$
P(a \le X \le b) = P(X \le b) - P(X \le a - 1).
$$

**Example 3.** The random variable $X \sim B(12, 0.3)$. Find
$P(3 \le X \le 5)$.

The values are 3, 4 and 5. Work out the three terms.

$$
P(X = 3) = \binom{12}{3}(0.3)^3(0.7)^9 = 220 \times 0.027 \times 0.0403536
= 0.2397 \ (4 \text{ d.p.}),
$$

$$
P(X = 4) = \binom{12}{4}(0.3)^4(0.7)^8 = 495 \times 0.0081 \times 0.0576480
= 0.2311 \ (4 \text{ d.p.}),
$$

$$
P(X = 5) = \binom{12}{5}(0.3)^5(0.7)^7 = 792 \times 0.00243 \times 0.0823543
= 0.1585 \ (4 \text{ d.p.}).
$$

Add:

$$
P(3 \le X \le 5) = 0.2397 + 0.2311 + 0.1585 = 0.6293 \ (4 \text{ d.p.}).
$$

## 4. Progress check

Return to the chapter problem. The supplier claims that each of the 20 seeds
germinates with probability 0.8, and the seeds germinate independently. Let $X$
be the number that germinate. Then $X \sim B(20, 0.8)$.

Find the probability that 13 or fewer seeds germinate. Use the complement and
the terms from 14 to 20, or a calculator.

<details markdown="1">
<summary>Answer</summary>

$$
P(X \le 13) = 1 - P(X \ge 14) = 1 - \left(P(X = 14) + \dots + P(X = 20)\right)
\approx 0.0867.
$$

So 13 or fewer seeds germinate in about 8.7% of packets of this kind. Keep this
value for the Review.

</details>

## 5. Try it: shading a range

**Predict first.** The figure shows the bars of a binomial distribution for
$X \sim B(n, p)$, with a value $r$ you can change. Before you move anything,
predict how the shaded area changes when you switch from "exactly $r$" to
"at most $r$" to "at least $r$" for the same $n$, $p$ and $r$.

:::figure ch13-binomial-cumulative

**Test.** Set $n = 10$ and $p = 0.4$. Choose "at most" and set $r = 2$. Read the
probability, then change to "exactly" with the same $r$. Compare the two
readings. Now use "at least" with $r = 8$ and compare it with
$1 - P(X \le 7)$.

**Explain.** Write two sentences. The first explains why "at most" and "at
least" together cover the whole range but overlap at $r$. The second explains
why $P(X \ge r) = 1 - P(X \le r - 1)$ uses $r - 1$.

> **Watch out.** Three mistakes are common.
>
> **Subtracting the wrong value.** For $P(X \ge r)$, subtract $P(X \le r-1)$,
> not $P(X \le r)$. Using $P(X \le r)$ removes the value $r$ as well, so the
> answer is too small.
>
> **Leaving out a term.** For $P(3 \le X \le 5)$, the values are 3, 4 and 5.
> Include both ends. The answer is not $P(X < 5)$.
>
> **Rounding at every step.** Keep the individual terms to four decimal places
> or more, and round once at the end. Rounding each term to two places can move
> the final answer by more than the accuracy you want.
>
> **Re-check:** say the inequality in words before you calculate. "At least 8"
> means 8, 9, 10, and so on. "Between 3 and 5" means 3, 4 and 5.

## You should now be able to

- add individual binomial terms to find $P(X \le r)$;
- use $P(X \ge r) = 1 - P(X \le r-1)$ and choose the shorter calculation;
- find $P(a \le X \le b)$ by adding the terms from $a$ to $b$;
- keep enough accuracy and round once.
