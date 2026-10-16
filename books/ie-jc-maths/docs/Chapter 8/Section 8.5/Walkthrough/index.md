---
title: 8.5 Order of operations on sets — Learn
chapter: 8
chapter_title: Sets
section: '8.5'
section_title: Order of operations on sets
tier: O
refs: [N.5]
kind: walkthrough
---

# 8.5 Order of operations on sets — Learn

**Prerequisites:** intersection, union and difference from Section 8.3, and
complements from Section 8.2.

**Objectives:** work out an expression with brackets by doing the inside first;
recognise that $(A \cap B) \cup C$ and $A \cap (B \cup C)$ can differ; use the
order complement, intersection, union when no brackets are written.

By the end of this section, you can work out a set expression in the correct
order, and say why the brackets matter.

## Brackets come first

A set expression is worked out in the same spirit as a number expression. Anything
inside brackets is done first.

**Example 1.** Let $A = \{1, 2, 3, 4\}$, $B = \{3, 4, 5\}$ and $C = \{2, 4, 6\}$.
Find $(A \cap B) \cup C$.

Do the bracket first.

$$A \cap B = \{3, 4\}$$

Now take the union with $C$.

$$(A \cap B) \cup C = \{3, 4\} \cup \{2, 4, 6\} = \{2, 3, 4, 6\}$$

**Example 2.** For the same sets, find $A \cap (B \cup C)$.

The bracket has changed, so the first step changes.

$$B \cup C = \{2, 3, 4, 5, 6\}$$

Now intersect with $A$.

$$A \cap (B \cup C) = \{1, 2, 3, 4\} \cap \{2, 3, 4, 5, 6\} = \{2, 3, 4\}$$

Compare the two answers: $\{2, 3, 4, 6\}$ and $\{2, 3, 4\}$. They are different
sets, even though the same three letters appear. The brackets decide which
operation happens first, and the answer changes with them.

## The order when there are no brackets

When no brackets are written, the operations have a fixed order.

1. **Complement** first, so $A'$ is found before anything is combined with it.
2. **Intersection** next.
3. **Union** last.

The order is the set version of the rule for numbers, where indices come before
multiplication and multiplication before addition. The complement plays the part of
the strongest operation, and the union the weakest.

**Example 3.** Let $U = \{1, 2, 3, 4, 5, 6\}$ and $A = \{1, 2, 3, 4\}$. Find
$A' \cup \{5, 6\}$.

The complement is worked out first.

$$A' = \{5, 6\}$$

Then the union.

$$A' \cup \{5, 6\} = \{5, 6\}$$

**Example 4.** Let $A = \{1, 2, 3, 4\}$, $B = \{3, 4, 5\}$ and $C = \{4, 6\}$.
Find $A \cup B \cap C$ with no brackets.

The intersection is stronger, so do $B \cap C$ first.

$$B \cap C = \{4\}$$

Then the union.

$$A \cup (B \cap C) = \{1, 2, 3, 4\} \cup \{4\} = \{1, 2, 3, 4\}$$

Writing the brackets in makes the order clear:
$A \cup B \cap C$ means $A \cup (B \cap C)$.

> **Watch out.** Do not work from left to right. The expression
> $A \cap B \cup C$ does not mean $(A \cap B) \cup C$ by accident; the
> intersection is stronger, so it means $(A \cap B) \cup C$ only because the
> intersection is done first. With brackets the answer can change:
> $(A \cup B) \cap C$ is a different set in general.
>
> **Re-check:** rewrite the expression with the brackets you think are there, then
> work out one small example with numbers. If the two answers differ, the brackets
> are doing real work.

## Progress check

Return to the chapter problem. Use the club fair sets $C$, $D$ and $S$, and the
eight regions from Section 8.4.

1. Work out $(C \cap D) \cup S$. Use $n(C \cap D) = 6$, $n(S) = 12$ and the
   middle region 2.
2. Work out $C \cap (D \cup S)$. Use $n(D \cup S) = 21$.
3. Compare your two answers. Write one sentence to explain why the brackets
   changed the result.

In Section 8.6 you will meet the rules that let you regroup an expression without
changing its value.

## You should now be able to

- work out a set expression by doing the brackets first;
- see that $(A \cap B) \cup C$ and $A \cap (B \cup C)$ can be different;
- use the order complement, then intersection, then union when no brackets are
  written;
- rewrite an expression with brackets to show the order you used.
