---
title: 'Chapter 14: Review'
chapter: 14
kind: review
---

# Chapter 14: Review

## The chapter problem, solved

The snack company claims that 1 packet in 4 contains a voucher. A customer buys
20 packets and finds 1 voucher. Decide whether the claim is believable at the 5%
level.

### Step 1. Write the hypotheses and the level

The claim is the null hypothesis. The customer suspects too few vouchers, so the
test is one-tailed on the lower tail:

$$
H_0: p = 0.25, \qquad H_1: p < 0.25, \qquad \alpha = 0.05.
$$

### Step 2. State the model under $H_0$

Under the claim, each packet contains a voucher with probability $0.25$. The
number of vouchers in 20 packets is

$$
X \sim \mathrm{B}(20,\ 0.25).
$$

The model assumes the packets are independent and that each has the same
probability. Both assumptions are checked at the end.

### Step 3. Find the test statistic

The sample gives

$$
X = 1.
$$

### Step 4. Find the p-value and the critical region

The lower tail contains the observed value and every smaller count:

$$
P(X \le 1) = P(0) + P(1) = 0.0032 + 0.0211 = 0.0243 \quad (4 \text{ d.p.}).
$$

Work up the tail to find the critical region. The next value gives

$$
P(X \le 2) = 0.0913 > 0.05,
$$

so the critical region at the 5% level is $X \le 1$, with critical value 1. The
acceptance region is $X \ge 2$.

### Step 5. Compare, decide and interpret

$$
0.0243 < 0.05,
$$

so the test rejects $H_0$. The value $X = 1$ lies in the critical region, which
agrees with the p-value route.

There is sufficient evidence at the 5% level that fewer than 1 packet in 4
contains a voucher.

### What the test does and does not show

The sample proportion is $\dfrac{1}{20} = 0.05$, far below the claimed $0.25$. If
the claim were true, a result this low would happen in only about 2.4% of samples
of 20. That is the evidence against the claim.

The test does not prove that the claim is false. It says that the evidence is
strong enough to doubt the claim at the 5% level of risk.

The level matters. At the 1% level the same p-value gives

$$
0.0243 > 0.01,
$$

so the test would retain $H_0$. A conclusion must always name the level.

Three limits apply to the conclusion.

- **The sample is small.** Twenty packets give limited information. A larger
  sample would give a clearer answer.
- **The packets may not be independent.** If the 20 packets came from one box or
  one delivery, one missing batch of vouchers could produce the whole result.
- **The sample may not be random.** The customer chose the shop and the day.
  Another shop may stock a different mix of packets.

Return to the first-contact predictions. One quarter of 20 is 5, so 5 vouchers
were expected. Finding 1 is surprising enough to reject the claim at the 5%
level. Finding 5 would have been ordinary, and the test would have retained the
claim.

## Mixed practice — choose the method first

For each question, say which method you will use before you calculate: a
binomial test, a Normal test for a mean, a Normal or binomial probability, a
summary statistic, or a comparison with a critical value. The items mix this
chapter with Chapters 11, 13 and 4.

:::problems chapter-14-review

:::answers chapter-14-review

## What you can now do

- write a null hypothesis and an alternative hypothesis for a proportion or a
  mean;
- choose a one-tailed or two-tailed test and give a reason;
- explain the significance level as the probability of rejecting a true null
  hypothesis;
- carry out a binomial test for a proportion, with the exact p-value or the
  critical region;
- carry out a Normal test for a mean when the variance is known, given or
  assumed;
- interpret a correlation coefficient with a given p-value or critical value;
- write a conclusion in context that names the significance level and the risk
  it carries.

## Your relevance reflection

Return to the prompt in the chapter opener: a number you have seen in an advert,
a news report or a school notice. Write the claim again.

Now add three things you could not have said before this chapter. First, write
the null hypothesis and the alternative for the claim. Second, say what sample
would test it and what test you would use. Third, say what a p-value would tell
you, and what it would still leave open. Finish with one sentence about how a
small sample could make a true claim look false, or a false claim look true.
