---
title: 'Chapter 10: Review'
chapter: 10
kind: review
---

# Chapter 10: Review

## The chapter problem, solved

**The lucky dip.** The bag holds $5$ red and $3$ blue counters, so $8$ counters. Two are
drawn without replacement, and the order does not matter.

**Count the draws.** The number of pairs is

$$\binom{8}{2} = \frac{8 \times 7}{2} = 28$$

**Count each outcome.**

- Both red: $\dbinom{5}{2} = 10$ pairs.
- Different colours: $5 \times 3 = 15$ pairs.
- Both blue: $\dbinom{3}{2} = 3$ pairs.

The three counts add to $10 + 15 + 3 = 28$, which is every pair.

**The probabilities.**

$$P(\text{small prize}) = \frac{10}{28} = \frac{5}{14} \approx 0.357$$

$$P(\text{star prize}) = \frac{15}{28} \approx 0.536 \qquad
P(\text{no prize}) = \frac{3}{28} \approx 0.107$$

**The answer.** The **star prize** is the most likely single outcome, at $\dfrac{15}{28}$.
It is more likely than the small prize and the no-prize outcome combined, because there are
more red counters than blue and either colour order gives a star prize.

**The conditional check.** If the first counter is red, $4$ red and $3$ blue remain, so
$P(\text{second red} \mid \text{first red}) = \dfrac{4}{7}$. Multiplying the two stages
gives

$$P(\text{both red}) = \frac{5}{8} \times \frac{4}{7} = \frac{5}{14}$$

which matches the count above.

**Dependent, not independent.** The draws are without replacement, so the first draw
changes the second. If the counter were put back, the draws would be independent and
$P(\text{both red}) = \dfrac{5}{8} \times \dfrac{5}{8} = \dfrac{25}{64} \approx 0.391$,
a little higher than $\dfrac{5}{14}$. Replacing the counter keeps the chance of red at
$\dfrac{5}{8}$ every time.

**The stallholder's follow-up.** Suppose the counter is replaced after each draw, and the
game is played $6$ times. The number of red counters is then $X \sim B\left(6, \dfrac58\right)$,
and

$$P(X = 4) = \binom{6}{4}\left(\frac58\right)^4\left(\frac38\right)^2
= \frac{84375}{262144} \approx 0.3219$$

so exactly $4$ red counters is the single most likely result, but still under a third of
the time.

## Mixed practice — choose the method first

Work through these without notes. For each one, say **which method** you will use —
fundamental principle, permutation, combination, complement, conditional probability,
independence, or the binomial distribution — before you calculate. Three of them come from
earlier chapters.

1. A cafe offers $4$ soups and $6$ sandwiches. How many soup-and-sandwich lunches are
   possible?
2. How many ways can $5$ runners fill first, second and third place?
3. A committee of $4$ is chosen from $9$ people. How many committees are possible?
4. A fair die is rolled twice. Find the probability of two even scores.
5. A bag holds $6$ red and $4$ green counters. Two are drawn without replacement. Find the
   probability that both are red.
6. $P(A) = 0.6$, $P(B) = 0.3$ and $P(A \cap B) = 0.18$. Are $A$ and $B$ independent?
   Give a reason.
7. $X \sim B(10, \tfrac14)$. Find $P(X = 3)$.
8. Find the sum of the first $20$ terms of the arithmetic series $3 + 7 + 11 + \dots$
9. The fifth term of a geometric sequence is $48$ and the first term is $3$. Find the
   common ratio.
10. Prove by induction that $2 + 4 + 6 + \dots + 2n = n(n+1)$.

<details markdown="1">
<summary>Answers and concise solutions</summary>

1. $4 \times 6 = 24$ lunches. The choices multiply.
2. $5 \times 4 \times 3 = 60$ ways. Order matters, so this is a permutation.
3. $\dbinom{9}{4} = 126$ committees. Order does not matter, so this is a combination.
4. The rolls are independent, so $\dfrac{3}{6} \times \dfrac{3}{6} = \dfrac{1}{4}$.
5. $P(\text{first red}) = \dfrac{6}{10}$. Then $5$ red and $4$ green remain, so
   $P(\text{second red} \mid \text{first red}) = \dfrac{5}{9}$. Then
   $\dfrac{6}{10} \times \dfrac{5}{9} = \dfrac{1}{3}$.
6. $P(A) \times P(B) = 0.6 \times 0.3 = 0.18$, which equals $P(A \cap B)$. So the events
   are independent.
7. $P(X = 3) = \dbinom{10}{3}\left(\tfrac14\right)^3\left(\tfrac34\right)^7
   = \dfrac{120 \times 2187}{1048576} = \dfrac{262440}{1048576} = \dfrac{32805}{131072}$.
8. $a = 3$, $d = 4$, so $S_{20} = \dfrac{20}{2}\left(2(3) + 19(4)\right)
   = 10(6 + 76) = 820$.
9. $ar^4 = 48$ with $a = 3$, so $r^4 = 16$ and $r = \pm 2$.
10. Base case $n = 1$: $2 = 1 \times 2$. True. Assume
    $2 + 4 + \dots + 2k = k(k+1)$. Then
    $2 + 4 + \dots + 2k + 2(k+1) = k(k+1) + 2(k+1) = (k+1)(k+2)$, which is the formula
    with $n = k + 1$. So it holds for every $n \ge 1$ by induction.

</details>

## What you can now do

- count outcomes by multiplying the choices at each stage;
- count ordered arrangements with permutations;
- count unordered selections with combinations;
- describe a sample space and write events as sets;
- use the axioms, the complement rule and the addition rule;
- find a conditional probability, and use the multiplication rule;
- test two events for independence;
- use the binomial distribution for a fixed number of independent trials.

## Thinking back

Look at the chance you chose at the start of the chapter — a weather forecast, a game at a
fair, a team's chance of winning, or a guess on a quiz.

Decide how you would count it. If the outcomes are equally likely, count the outcomes that
favour the event and divide by the total, using permutations when order matters and
combinations when it does not. If you learn something new, use a conditional probability.
If the same trial repeats a fixed number of times, with two outcomes and a constant
probability, use the binomial distribution.

Then answer the question you started with. Write down the probability, and say whether
your original guess was close. Changing your mind when the count disagrees is the
mathematics working, not a mistake.
