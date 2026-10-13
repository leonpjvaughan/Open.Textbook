---
title: 1.1 Statements, assumptions and the structure of a proof — Learn
chapter: 1
chapter_title: Proof and mathematical argument
section: '1.1'
section_title: Statements, assumptions and the structure of a proof
refs:
- A1
- OT1
kind: walkthrough
---

# 1.1 Statements, assumptions and the structure of a proof — Learn

**Prerequisites:** arithmetic with whole numbers; prime numbers; multiples and
factors; substituting a value into an expression.

**By the end of this section you can:** decide whether a sentence is a statement
and whether it is true; name the assumption and the conclusion of an implication;
write the converse of an implication; use "for all" and "there is" correctly; and
explain why one example is not a proof, while one counter example is a disproof.

## 1. Statements

A **statement** is a sentence that is either true or false. It is not a question,
an instruction or an opinion.

$$
\text{“}7 \text{ is prime}\text{”} \qquad
\text{“}12 \text{ is a multiple of } 4\text{”} \qquad
\text{“}7 < 3\text{”}
$$

are all statements. The first two are true, and the third is false. These are not
statements:

$$
\text{“Work out } 4 + 5\text{”} \qquad
\text{“}x + 3 = 5\text{”} \qquad
\text{“Is } 7 \text{ prime?}\text{”}
$$

The first is an instruction, and the last is a question. The middle sentence
depends on $x$: it becomes a statement only once we fix the value of $x$, or say
which values of $x$ we mean.

**Example 1.** Is the sentence "Every even number is a multiple of $4$" a
statement, and is it true or false?

It is a statement, because it is either true or false. It is false: the number
$2$ is even, but $2 = 4 \times 0 + 2$, so it is not a multiple of $4$.

## 2. Assumptions and conclusions

Many mathematical statements have the form

$$
\text{if } A \text{ then } B.
$$

We call $A$ the **assumption** and $B$ the **conclusion**. The statement claims
that whenever $A$ is true, $B$ must be true as well.

**Example 2.** Write the assumption and the conclusion.

"If a whole number is a multiple of $6$, then it is a multiple of $3$."

Assumption: the number is a multiple of $6$.

Conclusion: the number is a multiple of $3$.

To test the statement, substitute a value that satisfies the assumption. Take
the number $42$. Then

$$
42 = 6 \times 7,
$$

so the assumption holds. Also

$$
42 = 3 \times 14,
$$

so the conclusion holds too. The statement survives this test, but one test
never proves a claim about every whole number.

## 3. "For all" and "there is"

Two phrases carry most of the weight in proof.

- **"For all"** claims every case. To prove it, you need an argument that covers
  every case. One example is not enough, but one counter example is enough to
  disprove it.
- **"There is"** claims at least one case. To prove it, one example is enough.

The statement "For all whole numbers $n$, $n^2 + n$ is even" needs a proof.
The statement "There is a whole number $n$ for which $n^2 + n + 1$ is a
multiple of $3$" needs only one value: $n = 1$, since $1 + 1 + 1 = 3$.

## 4. The converse

Swap the assumption and the conclusion and you have the **converse**. The
converse is a different statement. It may be true or false, whatever the
original was.

$$
\text{Statement: if } n \text{ is a multiple of } 6 \text{ then } n \text{ is a multiple of } 3.
$$

$$
\text{Converse: if } n \text{ is a multiple of } 3 \text{ then } n \text{ is a multiple of } 6.
$$

The statement is true. The converse is false, and $n = 3$ shows it: $3$ is a
multiple of $3$, but not a multiple of $6$.

## 5. Necessary and sufficient

Two more words describe the two directions of an implication.

- $A$ is **sufficient** for $B$ when $A$ implies $B$.
- $A$ is **necessary** for $B$ when $B$ implies $A$.

Being a multiple of $6$ is sufficient for being a multiple of $3$: the first
forces the second. Being a multiple of $3$ is necessary for being a multiple of
$6$: without it, the number cannot be a multiple of $6$.

## 6. The shape of a proof

A **proof** is a chain of reasoning that starts from the assumption and ends at
the conclusion. Each step must follow from what came before, and the reader must
be able to see why.

A written proof usually:

1. states the assumption;
2. uses algebra or known facts to move forward;
3. links the steps with words such as *since*, *so* and *therefore*;
4. states the conclusion at the end.

> **Watch out.** "It works for the examples I tried" is not a proof of a "for
> all" statement, and it is not a disproof either. The rule is:
> an example supports, a counter example disproves, and only an argument proves.
> Suppose you test "for all $n$, $n^2 + n + 41$ is prime" for $n = 1$ to $5$ and
> every value is prime. That is five pieces of evidence, not a proof. A later
> value, $n = 40$, gives $1681 = 41 \times 41$, so the claim is false. **Re-check:**
> before you accept or reject a claim, ask which of the three sentences you have
> written — an example, a counter example, or an argument.

## Progress check

Return to the chapter problem. Claim A says that $n^2 + n$ is even for every
whole number $n$. Claim B says that $n^2 + n + 41$ is prime for every whole
number $n$.

1. Which kind of statement is each one: "for all" or "there is"?
2. Which claim would be settled by a single counter example, and what would that
   example look like?
3. Why does testing $n = 1, 2, 3$ for Claim B prove nothing?

## You should now be able to

- decide whether a sentence is a statement, and whether it is true or false;
- name the assumption and the conclusion of an implication;
- write the converse of an implication and test it;
- use "for all", "there is", "sufficient" and "necessary" correctly;
- explain the difference between evidence, a counter example and a proof.
