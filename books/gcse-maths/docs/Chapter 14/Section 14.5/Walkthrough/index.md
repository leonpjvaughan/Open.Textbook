---
title: "14.5 Iteration and numerical methods — Learn"
chapter: 14
chapter_title: Simultaneous equations and iteration
section: "14.5"
section_title: Iteration and numerical methods
tier: H
dfe: [A20]
kind: walkthrough
---

# 14.5 Iteration and numerical methods — Learn

**Prerequisites:** Substitute into formulae, use a calculator accurately, and round to a stated accuracy.

**Objectives:** Use an iteration rule repeatedly and report the required approximation.

## Repeat a rule

An **iteration** repeats a calculation using the previous answer. A rule such as $x_{n+1}=g(x_n)$ tells you to find the next value from the current value. The starting value is $x_0$.

**Example.** Use $x_{n+1}=\frac12(x_n+6/x_n)$ with $x_0=2$. Find $x_3$.

Use the rule to find the next value each time:

$$
x_1=\frac12(2+6/2)=2.5
$$

$$
x_2=\frac12(2.5+6/2.5)=2.45
$$

$$
x_3=\frac12(2.45+6/2.45)\approx2.449
$$

Therefore $x_3\approx2.449$. Keep enough digits during the working, then round the final value as requested.

An iteration can also solve an equation after rearranging it into a suitable form $x=g(x)$. Different rearrangements can behave differently, so follow the rule given in the question.

> **Watch out.** The subscript tells you the step number. Do not reuse $x_0$ each time: calculate $x_1$, then use that result to calculate $x_2$, and continue.
> **Re-check:** substitute your finished value back into the original equation.

## Progress check

The rule starts from $x_0=2$. Predict whether $x_2$ is nearer to $2$ or to $2.5$, then calculate it and compare.

## You should now be able to

- identify the starting value and iteration rule;
- calculate each new value from the previous one;
- state the requested approximation with suitable accuracy.
