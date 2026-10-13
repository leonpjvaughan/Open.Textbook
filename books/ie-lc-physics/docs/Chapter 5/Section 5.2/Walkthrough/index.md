---
title: 5.2 The spring constant and combinations of springs — Learn
chapter: 5
chapter_title: Stretching and compressing
section: '5.2'
section_title: The spring constant and combinations of springs
tier: O
refs: ['1.3']
kind: walkthrough
---

# 5.2 The spring constant and combinations of springs — Learn

**Prerequisites:** $F = kx$, and what the spring constant means.

**Objectives:** find the spring constant of springs joined in series and in parallel;
explain why one combination is stiffer than either spring alone.

By the end of this section, you can work out the spring constant of a combination and
say whether your answer makes sense.

## What the spring constant tells you

A large spring constant means a stiff spring: a lot of force for a little extension. A
small spring constant means a soft spring.

$$k = \frac{F}{x}$$

Two springs joined together are a single spring with its own spring constant, and the
way you join them decides what that constant is.

## Springs in series

In **series**, the springs are joined end to end.

Pull the combination and the **same force** acts through both springs. Each one
stretches, and the two extensions add to give the total.

$$x = x_1 + x_2$$

Since $x = \dfrac{F}{k}$ for each spring:

$$\frac{F}{k} = \frac{F}{k_1} + \frac{F}{k_2}$$

Divide both sides by $F$:

$$\frac{1}{k} = \frac{1}{k_1} + \frac{1}{k_2}$$

**Example 1.** Two springs of spring constant 60 N/m and 30 N/m are joined end to end.
Calculate the spring constant of the combination.

$$\frac{1}{k} = \frac{1}{60} + \frac{1}{30} = \frac{1}{60} + \frac{2}{60} = \frac{3}{60} = \frac{1}{20}$$

$$k = 20\,\text{N/m}$$

Notice that 20 N/m is **smaller** than both 60 and 30. That is what should happen: two
springs end to end are easier to stretch than either one alone, because the extension
adds up.

## Springs in parallel

In **parallel**, the springs are side by side and stretch together.

Now both springs stretch by the **same extension**, and each carries part of the force.
The forces add:

$$F = F_1 + F_2$$

Since $F = kx$ for each spring:

$$kx = k_1 x + k_2 x$$

Divide both sides by $x$:

$$k = k_1 + k_2$$

**Example 2.** The same two springs, 60 N/m and 30 N/m, side by side.

$$k = 60 + 30 = 90\,\text{N/m}$$

Now 90 N/m is **larger** than both. Two springs sharing the load are harder to stretch
than either one alone.

> **Watch out.** The two rules look like other rules you have met, and swapping them is
> the usual mistake. **Series adds the reciprocals and gives a smaller answer.
> Parallel adds the constants and gives a larger answer.** The check is free: for
> series the answer must be smaller than the smallest spring constant, and for parallel
> it must be larger than the largest. If your answer fails that check, you have used
> the wrong rule.

## Why the two answers are different

The reason is what stays the same in each arrangement.

In series, the **force** is the same throughout, because a force transmitted along a
spring is transmitted to the next one. Both springs stretch, so the extension adds —
and a larger extension for the same force means a smaller spring constant.

In parallel, the **extension** is the same for both, because they are fixed side by
side. The load is shared, so each spring carries less force and stretches less. A
smaller extension for the same total force means a larger spring constant.

## Progress check

Back to the chapter problem. You have a force-extension graph for a single spring with
its straight part and its bend.

Suppose you joined two such springs in series and plotted the same graph. Write down
what you expect to happen to the gradient of the straight part, and why. Then say
whether the limit of proportionality would come at a larger or a smaller force.

You do not have to calculate anything yet — predict it, and you can test the
prediction with two springs and a set of weights.

## You should now be able to

- find the spring constant of springs joined in series using
  $\frac{1}{k} = \frac{1}{k_1} + \frac{1}{k_2}$;
- find the spring constant of springs joined in parallel using $k = k_1 + k_2$;
- say which combination is stiffer, and check your answer against the size of the
  individual spring constants;
- explain, in terms of what stays the same, why the two rules differ.
