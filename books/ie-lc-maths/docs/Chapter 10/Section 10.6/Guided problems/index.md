---
title: "10.6 Conditional probability — Practise with help"
chapter: 10
chapter_title: Counting and probability
section: "10.6"
section_title: Conditional probability
tier: O
refs:
- '1.2'
kind: guided-problems
---

# 10.6 Conditional probability — Practise with help

## Warm-up: remember

1. $P(A) = 0.3$. Find $P(A')$.
2. A bag holds $5$ red and $3$ blue counters. Find the probability that one counter drawn
   at random is red.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $P(A') = 1 - 0.3 = 0.7$.
2. $P(\text{red}) = \dfrac{5}{8}$.

Both are probabilities of a single event. This section updates a probability once you
learn that something else has happened.

</details>

## Practise with help

**1.** $P(A \cap B) = 0.2$ and $P(B) = 0.5$. Find $P(A \mid B)$.

<details markdown="1">
<summary>Hint</summary>

Use $P(A \mid B) = \dfrac{P(A \cap B)}{P(B)}$.

<details markdown="1">
<summary>Next step</summary>

Divide $0.2$ by $0.5$.

<details markdown="1">
<summary>Full working</summary>

$$P(A \mid B) = \frac{0.2}{0.5} = 0.4$$

The denominator is the probability of the condition, $B$.

</details>
</details>
</details>

**2.** A bag holds $5$ red and $3$ blue counters. Two are drawn without replacement. Given
that the first is red, find the probability that the second is red.

<details markdown="1">
<summary>Hint</summary>

One red counter has been removed from the bag.

<details markdown="1">
<summary>Next step</summary>

$4$ red and $3$ blue remain, so $7$ counters in total.

<details markdown="1">
<summary>Full working</summary>

$$P(\text{second red} \mid \text{first red}) = \frac{4}{7}$$

The condition changes the sample space to the $7$ remaining counters.

</details>
</details>
</details>

**3.** $P(B) = 0.5$ and $P(A \mid B) = 0.4$. Find $P(A \cap B)$.

<details markdown="1">
<summary>Hint</summary>

Use the multiplication rule.

<details markdown="1">
<summary>Next step</summary>

$P(A \cap B) = 0.4 \times 0.5$.

<details markdown="1">
<summary>Full working</summary>

$$P(A \cap B) = P(A \mid B) \times P(B) = 0.4 \times 0.5 = 0.2$$

The multiplication rule rearranges the conditional formula.

</details>
</details>
</details>

**4.** A bag holds $3$ red and $2$ green counters. Two are drawn without replacement. Find
the probability that both are red.

<details markdown="1">
<summary>Hint</summary>

Find the probability of red on the second draw given red on the first.

<details markdown="1">
<summary>Next step</summary>

$P(\text{first red}) = \dfrac{3}{5}$ and
$P(\text{second red} \mid \text{first red}) = \dfrac{2}{4}$.

<details markdown="1">
<summary>Full working</summary>

$$P(\text{both red}) = \frac{3}{5} \times \frac{2}{4} = \frac{3}{10}$$

Multiply along the branch of the tree diagram.

</details>
</details>
</details>

**5.** The probability that it rains is $0.3$. If it rains, the probability that a student
is late is $0.4$. Find the probability that it rains and the student is late.

<details markdown="1">
<summary>Hint</summary>

Multiply the two probabilities.

<details markdown="1">
<summary>Next step</summary>

$0.3 \times 0.4$.

<details markdown="1">
<summary>Full working</summary>

$$P(\text{rain and late}) = 0.3 \times 0.4 = 0.12$$

This is the rain branch followed by the late branch.

</details>
</details>
</details>

**6.** Back to the chapter problem. The lucky dip draws two counters from $5$ red and $3$
blue without replacement. Given that the first counter is red, find the probability that
the second is red, and hence find the probability that both are red.

<details markdown="1">
<summary>Hint</summary>

After one red is drawn, count what is left.

<details markdown="1">
<summary>Next step</summary>

$4$ red and $3$ blue remain. Then multiply by $P(\text{first red}) = \dfrac{5}{8}$.

<details markdown="1">
<summary>Full working</summary>

$$P(\text{second red} \mid \text{first red}) = \frac{4}{7}$$

$$P(\text{both red}) = \frac{5}{8} \times \frac{4}{7} = \frac{5}{14}$$

This matches the count $\dfrac{10}{28}$, so the conditional route gives the same answer as
counting the pairs.

</details>
</details>
</details>

## A question from Chapter 10.5

**7.** $P(A) = 0.5$, $P(B) = 0.4$ and $P(A \cap B) = 0.2$. Find $P(A \cup B)$.

<details markdown="1">
<summary>Hint</summary>

Use the addition rule.

<details markdown="1">
<summary>Next step</summary>

$0.5 + 0.4 - 0.2$.

<details markdown="1">
<summary>Full working</summary>

$$P(A \cup B) = 0.5 + 0.4 - 0.2 = 0.7$$

The same overlap $P(A \cap B) = 0.2$ is what the conditional formula uses as its numerator.

</details>
</details>
</details>
