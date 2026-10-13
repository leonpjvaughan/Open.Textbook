---
title: 14.2 Binomial tests for a proportion — Learn
chapter: 14
chapter_title: Statistical hypothesis testing
section: '14.2'
section_title: Binomial tests for a proportion, one- and two-tailed
refs:
- O1
- O2
kind: walkthrough
---

# 14.2 Binomial tests for a proportion — Learn

**Prerequisites:** the language of hypothesis testing from Section 14.1, and the
binomial distribution and its probabilities from earlier in this book.

**By the end of this section you can:** carry out a full binomial hypothesis test
for a proportion; handle lower-tail, upper-tail and two-tailed tests; and write
the decision as a conclusion about the population, not about the sample.

## 1. The five steps of a test

Every binomial test follows the same five steps. Write them down each time until
the order becomes automatic.

1. Write the null hypothesis $H_0$, the alternative hypothesis $H_1$, and the
   significance level $\alpha$.
2. State the model for the test statistic under $H_0$. For a proportion the model
   is
   $$
   X \sim \mathrm{B}(n,\ p_0),
   $$
   where $n$ is the sample size and $p_0$ is the value in $H_0$.
3. Find the observed value of $X$ from the sample.
4. Find the p-value, or compare $X$ with the critical region.
5. Compare with $\alpha$, decide the test, and write the conclusion in the
   context of the original claim.

Step 5 is the step that wins marks. The decision is "reject $H_0$" or "retain
$H_0$". The conclusion is a sentence about the claim, and it says which
significance level was used.

## 2. A lower-tail test

The customer's voucher problem from Section 14.1 runs through all five steps.

**Step 1.** The claim is $p = 0.25$, and the customer suspects fewer vouchers:

$$
H_0: p = 0.25, \qquad H_1: p < 0.25, \qquad \alpha = 0.05.
$$

**Step 2.** Under $H_0$, the number of vouchers in 20 packets is

$$
X \sim \mathrm{B}(20,\ 0.25).
$$

**Step 3.** The sample gives $X = 1$.

**Step 4.** The alternative uses $<$, so the tail is the lower tail. The results
"at least as extreme" as 1 are $X = 1$ and $X = 0$:

$$
P(X \le 1) = 0.0243 \quad (4 \text{ d.p.}).
$$

**Step 5.** Compare the p-value with the level:

$$
0.0243 < 0.05.
$$

Reject $H_0$. There is sufficient evidence at the 5% level that fewer than 1
packet in 4 contains a voucher.

## 3. An upper-tail test

A company claims that 30% of students walk to school. A sample of 25 students
contains 12 who walk. A parent group suspects the true proportion is higher.

**Step 1.**

$$
H_0: p = 0.3, \qquad H_1: p > 0.3, \qquad \alpha = 0.05.
$$

**Step 2.** Under $H_0$,

$$
X \sim \mathrm{B}(25,\ 0.3).
$$

**Step 3.** The sample gives $X = 12$.

**Step 4.** The alternative uses $>$, so the upper tail is needed:

$$
P(X \ge 12) = 0.0442 \quad (4 \text{ d.p.}).
$$

**Step 5.** Since $0.0442 < 0.05$, reject $H_0$. There is sufficient evidence at
the 5% level that more than 30% of students walk to school.

## 4. A two-tailed test

A coin is tossed 20 times and shows 15 heads. Test at the 5% level whether the
coin is fair.

**Step 1.** A fair coin means $p = 0.5$, and bias in either direction matters:

$$
H_0: p = 0.5, \qquad H_1: p \ne 0.5, \qquad \alpha = 0.05.
$$

**Step 2.** Under $H_0$,

$$
X \sim \mathrm{B}(20,\ 0.5).
$$

**Step 3.** The sample gives $X = 15$.

**Step 4.** The value 15 is above the centre. Find the smaller tail, then double
it:

$$
P(X \ge 15) = 0.0207,
\qquad
\text{p-value} = 2 \times 0.0207 = 0.0414.
$$

**Step 5.** Since $0.0414 < 0.05$, reject $H_0$. There is sufficient evidence at
the 5% level that the coin is not fair.

If $H_1$ uses $\ne$, the p-value is twice the smaller one-sided tail. If $H_1$
uses $<$ or $>$, do not double it.

## 5. The significance level as a risk

In Section 14.1 the level was defined as the probability of rejecting $H_0$ when
$H_0$ is true. The binomial test shows the definition at work.

For the voucher test at the 5% level, the critical region is $X \le 1$. If
$H_0$ is true, the probability of landing in that region is

$$
P(X \le 1) = 0.0243.
$$

So the test wrongly rejects a true claim in about 2.4% of samples, even though the
level chosen was 5%. The probability can be smaller than $\alpha$, because a
discrete count cannot always be cut at exactly 5%.

A smaller $\alpha$ makes the test safer against a false alarm, but it also makes
the test harder to pass. At the 1% level the same voucher data give a p-value of
$0.0243$, and

$$
0.0243 > 0.01,
$$

so the test retains $H_0$. The evidence that was enough at 5% is not enough at
1%. Report the level with every conclusion.

## 6. More worked examples

**Example 1 — a retained claim.** A manufacturer claims that 1 in 5 components is
faulty. A sample of 30 components contains 2 faulty ones. Test at the 5% level
whether the fault rate is lower than the claim.

The claim is $p = 0.2$ and the concern is lower, so

$$
H_0: p = 0.2, \qquad H_1: p < 0.2.
$$

Under $H_0$, $X \sim \mathrm{B}(30, 0.2)$, and the sample gives $X = 2$. The
p-value is

$$
P(X \le 2) = 0.0442 \quad (4 \text{ d.p.}).
$$

Since $0.0442 < 0.05$, the test rejects $H_0$ at the 5% level. At the 1% level,
$0.0442 > 0.01$, so the test retains $H_0$. The level changes the decision.

**Example 2 — from the critical region.** For $X \sim \mathrm{B}(20, 0.25)$, find
the critical region at the 5% level, then use it to test the sample that found 2
vouchers.

Work up the lower tail from $X = 0$:

$$
P(X \le 0) = 0.0032, \qquad P(X \le 1) = 0.0243, \qquad P(X \le 2) = 0.0913.
$$

The largest tail whose probability is at most $0.05$ is $X \le 1$, so the
critical region is $X \le 1$ and the acceptance region is $X \ge 2$. The value
$X = 2$ lies in the acceptance region, so the test retains $H_0$. This agrees
with the p-value route, where $0.0913 > 0.05$.

**Example 3 — an upper-tail test that retains.** A call centre claims that 70% of
calls are answered within 30 seconds. In a sample of 40 calls, 32 are answered
in time. Test at the 5% level whether the proportion is higher than the claim.

$$
H_0: p = 0.7, \qquad H_1: p > 0.7.
$$

Under $H_0$, $X \sim \mathrm{B}(40, 0.7)$, and the sample gives $X = 32$. The
upper tail is

$$
P(X \ge 32) = 0.1110 \quad (4 \text{ d.p.}).
$$

Since $0.1110 > 0.05$, the test retains $H_0$. There is not sufficient evidence
that more than 70% of calls are answered in 30 seconds.

## 7. What the test assumes

The binomial model needs two assumptions.

- Each observation has the same probability $p_0$ under $H_0$.
- The observations are independent.

The second assumption is the one that fails most often. A sample of 20 packets
from one shop on one day may share a batch, so one unusual batch affects every
packet in the sample. When the assumptions are doubtful, say so, and treat the
conclusion with more caution.

> **Watch out.** Five traps are common in this section.
>
> **Doubling a one-tailed p-value.** Only a test with $H_1: p \ne p_0$ doubles the
> tail. A test with $H_1: p < p_0$ or $H_1: p > p_0$ uses one tail.
>
> **Doubling the wrong tail.** A two-tailed result doubles the *smaller* tail,
> the one containing the observed value. Doubling the larger tail gives a
> p-value above 1 or above the answer.
>
> **Using the sample proportion inside the model.** The model under $H_0$ uses
> $p_0$, the value in the claim. The sample proportion is the evidence, not the
> model. For the vouchers the model is $\mathrm{B}(20, 0.25)$, never
> $\mathrm{B}(20, 0.05)$.
>
> **Saying "accept $H_0$".** The test has not proved the claim. Write "retain
> $H_0$" or "there is not sufficient evidence".
>
> **Forgetting the level.** "Reject $H_0$" on its own is incomplete. Add "at the
> 5% level" or "at the 1% level" so the reader knows the risk you accepted.
>
> **Re-check:** after the decision, read the conclusion back to the original
> claim. It must be about the population, and it must name the level.

## Progress check

1. Return to the company's claim that 1 packet in 4 contains a voucher. Carry
   out the full test at the 5% level for the sample of 20 packets with 1
   voucher. State the model, the p-value, the decision and the conclusion.
2. A second sample of 20 packets contains 4 vouchers. Find the p-value and
   decide at the 5% level, using the lower tail.
3. Explain why the test in question 2 is one-tailed, and how the work would
   change if $H_1: p \ne 0.25$.

## You should now be able to

- write $H_0$, $H_1$ and $\alpha$ for a claim about a proportion;
- choose the correct model $X \sim \mathrm{B}(n, p_0)$ under $H_0$;
- find a lower-tail or upper-tail p-value from a binomial distribution;
- double the smaller tail for a two-tailed test;
- use a critical region as an alternative to a p-value;
- interpret the significance level as the risk of wrongly rejecting $H_0$;
- write a conclusion in context that names the significance level.
