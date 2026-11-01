---
title: "2.7 Minimum spanning trees: Prim's algorithm — Learn"
chapter: 2
chapter_title: Networks and graphs
section: '2.7'
section_title: "Minimum spanning trees: Prim's algorithm"
tier: O
refs:
- S2
kind: walkthrough
---

# 2.7 Minimum spanning trees: Prim's algorithm — Learn

**Prerequisites:** Section 2.6 — Kruskal's algorithm.

**Objectives:** find a minimum spanning tree with Prim's algorithm; compare it with
Kruskal's; say why the starting vertex does not change the total weight.

By the end of this section you have a second way to find the same answer, and a check on
the first.

## Growing one tree

Kruskal's algorithm can build several separate pieces before it joins them: it takes the
cheapest edge anywhere. Robert Prim's method is different. It keeps **one connected tree**
and grows it outwards, one vertex at a time.

> **Prim's algorithm.**
>
> 1. Choose any vertex to start. It is the tree.
> 2. Find the cheapest edge that leaves the tree — one end in the tree, one end outside.
> 3. Add it, bringing in a new vertex.
> 4. Repeat until every vertex is in the tree.

The tree is connected at every step, which is the visible difference from Kruskal.

**Example 1.** Find a minimum spanning tree by Prim's algorithm, starting from $A$.

- $AB = 4$, $AC = 2$, $BC = 1$, $BD = 5$, $CD = 8$, $CE = 10$, $DE = 2$, $DF = 6$,
  $EF = 3$

| Tree so far | Cheapest edge leaving it | Weight |
|---|---|---|
| $\{A\}$ | $AC = 2$ | 2 |
| $\{A, C\}$ | $CB = 1$ | 1 |
| $\{A, C, B\}$ | $BD = 5$ | 5 |
| $\{A, C, B, D\}$ | $DE = 2$ | 2 |
| $\{A, C, B, D, E\}$ | $EF = 3$ | 3 |

All 6 vertices are in the tree, so the algorithm stops. The edges are

$$\{AC,\; CB,\; BD,\; DE,\; EF\}$$

with total weight

$$2 + 1 + 5 + 2 + 3 = 13$$

the same total Kruskal found.

## Why $AB$ is not considered

Look at the step where the tree is $\{A, C, B\}$. The edge $AB = 4$ is cheap, but it is
**not a candidate**: both of its ends are already in the tree. Prim's algorithm only ever
takes an edge that *leaves* the tree, so an edge between two tree vertices is never looked
at.

That is not an omission. Adding $AB$ would close the cycle $A-B-C-A$, which a tree does
not have. So the rule "take the cheapest edge leaving the tree" carries the no-cycle
condition inside it — there is no separate check to make.

:::figure mst-stepper

**Predict, then test.** Run Prim from $A$ and write down the edge chosen at each step.
Then start again from $D$ and compare. The totals should agree — write down why the
starting vertex cannot change the total. Finally switch to Kruskal and run it on the same
network. Notice where the two algorithms make different choices and still agree at the end.

## Which algorithm, and when

Both always find a minimum spanning tree, and on a network with distinct weights they
find the same one. So the choice is about the work, not the answer.

- **Kruskal** sorts every edge once. That is simple and quick to do by hand on a
  small network, but on a large network the sorting dominates.
- **Prim** never sorts anything. It keeps looking for the cheapest edge leaving the tree,
  which suits a network stored as a table — it can be done by scanning the row of the
  matrix for the newest vertex. On a dense network, where most pairs are joined, Prim is
  usually the faster of the two.

For an exam question, either is accepted. Write down which you are using, and be
consistent.

> **Watch out.** Prim's algorithm does not start with the cheapest edge in the network. It
> starts with the cheapest edge **at the starting vertex**. On this network Kruskal starts
> at $BC = 1$, but Prim from $A$ starts at $AC = 2$. If you list the edges in weight order
> and take them one by one, you are running Kruskal — say so, or the marks will not match
> the method.

## Progress check

Back to the chapter problem. Run Prim's algorithm on your seven-room network, starting
from whichever room you like, and find the total length of cable.

Then start again from a different room. If the two totals agree, your arithmetic is
almost certainly right, and you have found the cheapest cabling for the building. If they
disagree, one run has a mistake in it — find it before you trust either.

## You should now be able to

- run Prim's algorithm from any starting vertex, and say which edge is chosen at each
  step and why;
- explain why an edge between two vertices already in the tree is never considered;
- say why the starting vertex cannot change the total weight;
- say when you would choose Prim rather than Kruskal, and give a reason.
