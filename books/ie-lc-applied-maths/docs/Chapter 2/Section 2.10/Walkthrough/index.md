---
title: "2.10 Bellman's principle of optimality — Learn"
chapter: 2
chapter_title: Networks and graphs
section: '2.10'
section_title: "Bellman's principle of optimality"
tier: O
refs:
- S2
kind: walkthrough
---

# 2.10 Bellman's principle of optimality — Learn

**Prerequisites:** Section 2.9 — backward recursion.

**Objectives:** state Bellman's principle; explain why it makes dynamic programming
valid; say what it does and does not claim.

By the end of this section you know *why* the backward method is allowed, not only how to
do it.

## The principle

Section 2.9 solved a staged network by working backwards, keeping one number per state.
That works because of a fact about optimal routes, named after Richard Bellman.

> **Bellman's principle of optimality.** Any part of an optimal route is itself an optimal
> route between its own two endpoints.

In other words: if the whole journey is the cheapest possible, then no section of it can
be replaced by a cheaper section. If a section could be improved, improving it would make
the whole journey cheaper — contradicting that the whole journey was optimal.

**Example 1.** On the network of Section 2.9 the optimal route from $A$ to $F$ is
$A \to C \to E \to F$, of cost $8$.

Look at the part $C \to E \to F$, of cost $3$. The principle says this part is optimal
between $C$ and $F$. The only other route from $C$ to $F$ is $C \to D \to F$ at
$3 + 6 = 9$, which is dearer. So the part is indeed optimal, as promised.

But notice: the principle *told us* it would be, before we checked. That is what makes it
useful.

## Why it makes dynamic programming valid

Dynamic programming works by solving small sub-problems once and building larger answers
out of them. That is only sound if a sub-problem's best answer is the same no matter which
larger problem it belongs to.

Bellman's principle gives exactly that. If every part of an optimal route is itself
optimal, then

> the least cost from a state to the end is a **fixed number**, independent of how you
> arrived at that state.

So each state can be solved once, and its value reused everywhere that state appears. The
backward recursion relies on precisely this.

**Example 2.** In Section 2.9 the value at $B$ was $8$. Whether you reach $B$ from $A$
directly or by some longer route, the best way to finish from $B$ costs 8. That is why
the value at $B$ is a single number, and why it can be worked out before you know how you
will arrive.

## What the principle does not say

It is possible to state this too strongly, so be careful.

- It says: every part of an **optimal** route is optimal. It does **not** say every part
  of **any** route is optimal. A part of a poor route is usually poor too.
- It does **not** justify the greedy choice. Taking the cheapest edge now is a method, and
  the principle says nothing about it. On the network of Section 2.9 the cheapest first
  edge gave a total of 10, while the optimal total was 8 — so the greedy choice was part
  of no optimal route at all.

**Example 3.** A route from $A$ to $F$ goes $A \to B \to D \to F$, costing
$2 + 4 + 6 = 12$. This route is not optimal. Is the part $B \to D \to F$ optimal between
$B$ and $F$?

No — $B \to E \to F$ costs $7 + 1 = 8$, which is cheaper than $4 + 6 = 10$. The part is
not optimal, and Bellman's principle makes no claim that it should be. The principle is
about optimal routes only.

> **Watch out.** "Any part of an optimal route is optimal" is not the same as "you can
> build an optimal route by taking optimal parts greedily". The second is false. The
> principle is used *backwards*, from the end, so that the parts are chosen knowing what
> the rest of the journey will cost. A part chosen without that knowledge may be optimal
> between its own endpoints and still lead to a non-optimal whole.

## Progress check

Back to the chapter problem. You have found the cheapest route through the zones, and the
cheapest set of cables for the building.

Take the cheapest route and pick any part of it — say, from the second zone to the
finish. Check that this part is itself the cheapest route between those two points. It
must be, by Bellman's principle. Now try the same with a route you know is *not* cheapest,
and find a part that is not optimal. Writing down the contrast is the clearest way to see
what the principle claims.

## You should now be able to

- state Bellman's principle of optimality;
- explain why it makes the backward recursion valid, in terms of each state being solved
  once;
- say what the principle does **not** claim, and give an example of a part of a non-optimal
  route that is not optimal.
