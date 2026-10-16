---
title: "9.6 Proof by induction — Practise with help"
chapter: 9
chapter_title: Sequences and series
section: "9.6"
section_title: Proof by induction
tier: H
refs:
- '4.1'
kind: guided-problems
---

# 9.6 Proof by induction — Practise with help

## Warm-up: remember

1. Find the sum of the first $5$ terms of $2, 5, 8, \dots$
2. Simplify $\dfrac{k(k+1)}{2} + (k+1)$.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $\dfrac{5}{2}(4 + 12) = 40$.
2. $(k+1)\left(\dfrac{k}{2} + 1\right) = \dfrac{(k+1)(k+2)}{2}$.

Both of these are exactly what the induction proof uses.

</details>

## Practise with help

**1.** Write down the three parts of a proof by induction.

<details markdown="1">
<summary>Hint</summary>

Base, assumption, step.

<details markdown="1">
<summary>Next step</summary>

What is shown, then what is assumed, then what is proved.

<details markdown="1">
<summary>Full working</summary>

1. **Base case** — show the statement is true for $n = 1$.
2. **Inductive hypothesis** — assume it is true for $n = k$.
3. **Inductive step** — prove it is true for $n = k + 1$.

Then it is true for every $n \ge 1$.

</details>
</details>
</details>

**2.** Prove by induction that $1 + 2 + \dots + n = \dfrac{n(n+1)}{2}$.

<details markdown="1">
<summary>Hint</summary>

Base case $n = 1$, then use the hypothesis to reach $k + 1$.

<details markdown="1">
<summary>Next step</summary>

$1 + 2 + \dots + k + (k+1) = \dfrac{k(k+1)}{2} + (k+1)$.

<details markdown="1">
<summary>Full working</summary>

**Base case.** $n = 1$: LHS $= 1$, RHS $= \dfrac{1 \times 2}{2} = 1$. True.

**Hypothesis.** Assume $1 + 2 + \dots + k = \dfrac{k(k+1)}{2}$.

**Step.** Then

$$1 + 2 + \dots + k + (k+1) = \frac{k(k+1)}{2} + (k+1) = (k+1)\left(\frac{k}{2} + 1\right) = \frac{(k+1)(k+2)}{2}$$

which is the formula with $n = k + 1$. 

**Conclusion.** True for $n = 1$, and true for $k+1$ whenever true for $k$, so true for all
$n \ge 1$.

</details>
</details>
</details>

**3.** Prove by induction that the sum of the first $n$ odd numbers is $n^2$.

<details markdown="1">
<summary>Hint</summary>

The next odd number after $2k - 1$ is $2k + 1$.

<details markdown="1">
<summary>Next step</summary>

$k^2 + (2k + 1) = (k+1)^2$.

<details markdown="1">
<summary>Full working</summary>

**Base case.** $n = 1$: $1 = 1^2$. True.

**Hypothesis.** Assume $1 + 3 + \dots + (2k - 1) = k^2$.

**Step.** The next odd number is $2(k+1) - 1 = 2k + 1$, so

$$1 + 3 + \dots + (2k - 1) + (2k+1) = k^2 + 2k + 1 = (k+1)^2$$

which is the formula with $n = k + 1$.

**Conclusion.** True for all $n \ge 1$.

</details>
</details>
</details>

**4.** In the proof above, the step ends with $(k+1)^2$. Explain why that is exactly what
was needed.

<details markdown="1">
<summary>Hint</summary>

What is the statement for $n = k+1$?

<details markdown="1">
<summary>Next step</summary>

The claim is "the sum of the first $n$ odd numbers is $n^2$". With $n = k+1$, the sum
should be $(k+1)^2$.

<details markdown="1">
<summary>Full working</summary>

The statement to prove for $n = k+1$ is that the sum of the first $k+1$ odd numbers equals
$(k+1)^2$. The step showed that the sum of the first $k$ odd numbers plus the next one
equals $(k+1)^2$.

That is the same thing written out. The last line of the step must always be the statement
with $n$ replaced by $k+1$ — if it is not, the step has not been finished. Checking that
the final expression matches is how you know you are done.

</details>
</details>
</details>

**5.** Explain what is wrong with a "proof" that does the inductive step but omits the
base case.

<details markdown="1">
<summary>Hint</summary>

What does the step actually prove on its own?

<details markdown="1">
<summary>Next step</summary>

It is conditional: *if* true for $k$, *then* true for $k+1$.

<details markdown="1">
<summary>Full working</summary>

The step alone proves only a **conditional**: if the statement is true for some $k$, then
it is true for $k + 1$. It does not say the statement is true for any particular value.

Without a base case there is nothing to start the chain. A statement false for every $n$
can still satisfy the step perfectly — for instance "every whole number is greater than
itself" would satisfy an equally bad step. The base case is what anchors the chain to a
true value.

</details>
</details>
</details>

**6.** A student's inductive step never uses the hypothesis. What does that tell you?

<details markdown="1">
<summary>Hint</summary>

If the hypothesis is not used, what has been proved?

<details markdown="1">
<summary>Next step</summary>

If the step holds with no assumption, the statement holds for every $n$ directly.

<details markdown="1">
<summary>Full working</summary>

If the step never uses the hypothesis, then the fact that it holds for $k+1$ does not
depend on it holding for $k$. The student has proved the statement **directly** for an
arbitrary $n$, not by induction.

That is not wrong — a direct proof is stronger — but it means the answer has not used the
method asked for, and it usually signals that the algebra was not really an induction step.
Real induction steps look like "the sum up to $k+1$ equals the sum up to $k$, plus the new
term", which uses the hypothesis unavoidably.

</details>
</details>
</details>

## A question from Section 9.2

**7.** Use the formula $1 + 2 + \dots + n = \dfrac{n(n+1)}{2}$ to find
$1 + 2 + \dots + 50$, and say why a proof that it holds for every $n$ is worth having.

<details markdown="1">
<summary>Hint</summary>

Substitute $n = 50$.

<details markdown="1">
<summary>Next step</summary>

$\dfrac{50 \times 51}{2}$.

<details markdown="1">
<summary>Full working</summary>

$$1 + 2 + \dots + 50 = \frac{50 \times 51}{2} = 1275$$

A proof that the formula holds for every $n$ means you never have to check again. Without
it, you would know the formula works for the values you happened to try, and no more. With
it, you can use it on 50, on 10,000, or on an $n$ you have not thought of yet — which is
what makes it a formula rather than a coincidence.

</details>
</details>
</details>
