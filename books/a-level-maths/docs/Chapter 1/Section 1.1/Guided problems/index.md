---
title: 1.1 Statements, assumptions and the structure of a proof — Practise with help
chapter: 1
chapter_title: Proof and mathematical argument
section: '1.1'
section_title: Statements, assumptions and the structure of a proof
dfe:
- A1
- OT1
kind: guided-problems
---

# 1.1 Statements, assumptions and the structure of a proof — Practise with help

Work each one first, closed book. Reveal a hint only if you are stuck, the next
step to see the first move, and the full working only to check.

## Warm-up: remember

1. Write down the first five prime numbers.
2. Work out the value of $n^2 + 1$ when $n = 5$.
3. Is $2$ an even number? Is $2$ a prime number?

<details markdown="1">
<summary>Answers</summary>

1. $2$, $3$, $5$, $7$, $11$.
2. $5^2 + 1 = 26$.
3. Yes, and yes. It is the only even prime.
</details>

## Practise with help

**1.** Which of these are statements? For each statement, say whether it is true
or false. (a) $9$ is prime (b) Solve $x + 1 = 2$ (c) $4 + 5 = 9$.

<details markdown="1">
<summary>Hint</summary>

A statement is a sentence that is either true or false. Check each sentence for
a question mark, an instruction, or a letter whose value is not fixed.
</details>

<details markdown="1">
<summary>Next step</summary>

Take the first sentence on its own. "9 is prime" claims something specific, so
test it by looking for a factor of $9$.
</details>

<details markdown="1">
<summary>Full working</summary>

(a) A statement, and false: $9 = 3 \times 3$, so $9$ has a factor other than $1$
and itself.

(b) Not a statement: "Solve" is an instruction, not a claim.

(c) A statement, and true: $4 + 5 = 9$.
</details>

**2.** Write the assumption and the conclusion of: "If a shape is a square, then
it has four sides."

<details markdown="1">
<summary>Hint</summary>

The assumption is the part after "if". The conclusion is the part after "then".
</details>

<details markdown="1">
<summary>Next step</summary>

Write the sentence underneath in the form "if $A$ then $B$", then copy $A$ and
$B$ into two separate lines.
</details>

<details markdown="1">
<summary>Full working</summary>

Assumption: the shape is a square.

Conclusion: the shape has four sides.
</details>

**3.** Write the converse of the statement in question 2, and give a shape that
shows the converse is false.

<details markdown="1">
<summary>Hint</summary>

Swap the assumption and the conclusion. The converse starts with "If it has
four sides".
</details>

<details markdown="1">
<summary>Next step</summary>

Write the converse in full, then look for a four-sided shape that is not a
square.
</details>

<details markdown="1">
<summary>Full working</summary>

Converse: "If a shape has four sides, then it is a square."

The converse is false. A rectangle that is $3$ cm by $4$ cm has four sides, but
it is not a square. The original statement is true and its converse is false, so
the two directions are independent.
</details>

**4.** The statement is: "If $n$ is a multiple of $3$, then $n$ is a multiple of
$9$." Test it with $n = 3$ and $n = 9$.

<details markdown="1">
<summary>Hint</summary>

The assumption is "a multiple of $3$", so both values satisfy the assumption.
Now check the conclusion for each value.
</details>

<details markdown="1">
<summary>Next step</summary>

Work out $3 \div 9$ and $9 \div 9$ as whole-number divisions with remainders.
</details>

<details markdown="1">
<summary>Full working</summary>

For $n = 3$: the assumption holds, since $3 = 3 \times 1$. The conclusion fails,
since $3$ is not a multiple of $9$.

For $n = 9$: the assumption holds, and the conclusion holds, since
$9 = 9 \times 1$.

The value $n = 3$ shows the statement is false. One counter example is enough.
</details>

**5.** Disprove the statement "For every real number $x$, $x^2 > x$" by finding
one value of $x$.

<details markdown="1">
<summary>Hint</summary>

Look for a value between $0$ and $1$. Squaring a number in that range makes it
smaller, not larger.
</details>

<details markdown="1">
<summary>Next step</summary>

Try $x = \frac{1}{2}$ and work out $x^2$.
</details>

<details markdown="1">
<summary>Full working</summary>

Take $x = \frac{1}{2}$. Then

$$
x^2 = \frac{1}{4}.
$$

Now

$$
\frac{1}{4} < \frac{1}{2},
$$

so $x^2 > x$ is false for this value. The statement says "for every real number",
so one counter example disproves it.
</details>

**6.** Return to the chapter problem. For Claim B, work out the value of
$n^2 + n + 41$ when $n = 40$, and show that the value is not prime.

<details markdown="1">
<summary>Hint</summary>

Substitute $40$ for $n$ and work out the three terms separately before adding
them.
</details>

<details markdown="1">
<summary>Next step</summary>

Work out $40^2$, then add $40$, then add $41$, and look at the total.
</details>

<details markdown="1">
<summary>Full working</summary>

For $n = 40$,

$$
n^2 + n + 41 = 1600 + 40 + 41 = 1681.
$$

But

$$
1681 = 41 \times 41,
$$

so the value has a factor other than $1$ and itself. It is not prime, and Claim
B is false.
</details>
