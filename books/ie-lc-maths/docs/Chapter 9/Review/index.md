---
title: 'Chapter 9: Review'
chapter: 9
kind: review
---

# Chapter 9: Review

## The chapter problem, solved

**The two savings plans.** Both start with €50 and run for 24 months.

**Plan A — arithmetic.** €50, then €20 more each month: $a = 50$, $d = 20$. The total saved
in 24 months is $S_{24}$.

$$S_{24} = \frac{24}{2}\left(2(50) + 23(20)\right) = 12(100 + 460) = 12 \times 560 = 6720$$

so Plan A saves €6720.

**Plan B — geometric.** €50, then up 10% each month: $a = 50$, $r = 1.1$.

$$S_{24} = \frac{50\left(1.1^{24} - 1\right)}{1.1 - 1} = 500(9.8497\dots - 1) \approx 4425$$

so Plan B saves about €4425.

**Plan A wins**, by about €2295.

**Why the surprise.** A geometric plan multiplies rather than adds, so it grows without
bound and eventually overtakes anything linear. But it starts from the same €50, and over
24 months the €20-a-month rise is worth more than a 10% rise on a small base. The
geometric plan's advantage is in the long run; over a fixed two years, arithmetic wins.

**Which has a sum to infinity?** Plan A, with a fixed €20 added each month, does not — the
terms do not shrink. Plan B has $|r| = 1.1 > 1$, so it has no sum to infinity either. Both
plans have to stop, which is why the question is "after 24 months".

**Proving the formula.** The sum formula for Plan A is not a coincidence. Section 9.6
proves the simpler version, $1 + 2 + \dots + n = \dfrac{n(n+1)}{2}$, by induction — base
case, hypothesis, step — and the arithmetic sum formula follows the same argument.

## Mixed practice — choose the method first

Work through these without notes. For each one, say **which kind of sequence** it is — or
that it is neither — before you calculate. Two of them are geometric and two are
arithmetic, and mixing them up is the whole point of the exercise.

1. Find the twentieth term of $4, 9, 14, \dots$
2. Find the tenth term of $3, 6, 12, \dots$
3. Find $7 + 11 + 15 + \dots + 83$.
4. Find the sum of the first six terms of $2, 6, 18, \dots$
5. Find the sum to infinity of $20 + 10 + 5 + \dots$
6. A sequence is $2, 6, 12, 20, \dots$ Is it arithmetic, geometric, or neither? Explain.
7. A geometric series has $a = 4$ and sum to infinity $16$. Find $r$.
8. $T_1 = 5$ and $T_{n+1} = 3T_n - 4$. Find $T_4$ and the fixed point.
9. Prove by induction that $1 + 3 + \dots + (2n-1) = n^2$.
10. A saving plan puts away €100 in month 1 and increases the amount by 5% each month.
    Write it as a recurrence, and say whether it has a sum to infinity.

## What you can now do

- recognise an arithmetic or a geometric sequence, and find $a$ and $d$ or $r$;
- find any term of either kind, and work out which term a given value is;
- add an arithmetic series using either form of the formula;
- add a geometric series, and find its sum to infinity when $|r| < 1$;
- explain why the sum-to-infinity condition is $|r| < 1$, in terms of $r^n$;
- use a recurrence relation and find its fixed point;
- carry out a proof by induction, with all three parts labelled.

## Thinking back

Look at the growth or decay you chose at the start of the chapter — a battery losing a
percentage each hour, a rumour spreading, a loan gathering interest.

Decide which kind it is. If a fixed **amount** changes each step, it is arithmetic, and you
can use the sum formula. If a fixed **fraction** changes each step, it is geometric, and
$r$ is the multiplier. Write down $a$ and then $d$ or $r$.

Then answer the question you started with. If it is a total over a fixed time, use the sum
formula. If it is a long-run value, ask whether $|r| < 1$ — and if it is not, the honest
answer is that there is no long-run value, because the quantity grows without bound. Saying
that, with the reason, is the mathematics, not a failure to answer.
