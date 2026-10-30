---
title: "2.6 Minimum spanning trees: Kruskal's algorithm — Learn"
chapter: 2
chapter_title: Networks and graphs
section: '2.6'
section_title: "Minimum spanning trees: Kruskal's algorithm"
tier: O
refs:
- S2
kind: walkthrough
---

# 2.6 Minimum spanning trees: Kruskal's algorithm — Learn

**Prerequisites:** Section 2.5 — spanning trees.

**Objectives:** find a minimum spanning tree with Kruskal's algorithm; say why an edge is
rejected; use it on a weighted network.

By the end of this section you can connect everything in a network for the least possible
total cost, and say why the answer is the least.

## The problem

A spanning tree reaches every vertex. Most networks have many spanning trees, and they do
not cost the same. The question is:

> Which spanning tree has the **smallest total weight**?

That is a **minimum spanning tree**, or **MST**. For a network of cable runs it is the
cheapest set of cables that reaches every room. For a rail network it is the cheapest set
of lines that connects every station.

## Kruskal's algorithm

Joseph Kruskal's method is the one that follows directly from the edge count. There are
$n - 1$ edges to choose, so choose the cheapest ones — but never one that would close a
cycle, because a tree has none.

> **Kruskal's algorithm.**
> 1. List all the edges in order of weight, smallest first.
> 2. Go through the list. Add the next edge **unless** adding it would close a cycle with
>    the edges already chosen.
> 3. Stop when $n - 1$ edges have been chosen.

Step 3 is where the tree comes from: $n - 1$ edges with no cycle is a spanning tree.

**Example 1.** Find a minimum spanning tree for this network.

- $AB = 4$, $AC = 2$, $BC = 1$, $BD = 5$, $CD = 8$, $CE = 10$, $DE = 2$, $DF = 6$,
  $EF = 3$

**Step 1 — sort the edges.**

$$BC = 1,\; AC = 2,\; DE = 2,\; EF = 3,\; AB = 4,\; BD = 5,\; DF = 6,\; CD = 8,\; CE = 10$$

**Step 2 — work down the list.** There are 6 vertices, so the tree needs 5 edges.

| Edge | Weight | Add? | Why |
|---|---|---|---|
| $BC$ | 1 | yes | nothing chosen yet |
| $AC$ | 2 | yes | joins a new vertex |
| $DE$ | 2 | yes | joins a new vertex |
| $EF$ | 3 | yes | joins a new vertex |
| $AB$ | 4 | **no** | $A$, $B$ and $C$ are already joined by $AC$ and $BC$, so $AB$ would close the cycle $A-B-C-A$ |
| $BD$ | 5 | yes | the first edge joining $\{A,B,C\}$ to $\{D,E,F\}$ |

Five edges have been chosen, so the algorithm stops. The tree is

$$\{BC,\; AC,\; DE,\; EF,\; BD\}$$

with total weight

$$1 + 2 + 2 + 3 + 5 = 13$$

:::figure mst-stepper

**Predict, then test.** Before you step through, write down which edge you expect Kruskal
to reject first, and why. Then step through the algorithm and check. Now switch to Prim
and run it from $A$. Both algorithms should reach the same total — write down why they
must.

## Why it works

It is worth being clear about what makes the greedy choice safe. Taking the cheapest
edge never rules out the best tree, because of a fact called the **cut property**: for
any split of the vertices into two groups, the cheapest edge crossing the split belongs
to *some* minimum spanning tree.

Kruskal's algorithm adds the cheapest edge that does not close a cycle. At the moment it
considers that edge, its two ends are in different groups of the chosen edges — otherwise
it would close a cycle. So the edge crosses a split, and the cut property says it is safe
to take.

> **Watch out.** Kruskal's algorithm is not "take the $n-1$ cheapest edges". On this
> network the four cheapest are $BC = 1$, $AC = 2$, $DE = 2$, $EF = 3$ and the fifth
> cheapest is $AB = 4$ — but $AB$ is rejected. Taking the five cheapest edges would give
> $\{BC, AC, DE, EF, AB\}$, which has the cycle $A-B-C-A$ and leaves $D$, $E$, $F$ joined
> to nothing. It is not a spanning tree at all. The cycle check is what makes the
> algorithm correct, not the sorting.

## Progress check

Back to the chapter problem. Run Kruskal's algorithm on your seven-room network.

Work through the sorted list, and for each edge write down *add* or *reject* and the
reason. Keep the reasons — "would close a cycle" is the answer an examiner wants, and the
cycle is worth naming. When you finish, check two things: you have exactly 6 edges, and
every room is reached.

## You should now be able to

- state what a minimum spanning tree is;
- run Kruskal's algorithm, in order, and say for each edge why it is added or rejected;
- find the total weight of the minimum spanning tree;
- explain why the algorithm is correct, and why "the cheapest $n-1$ edges" is not the
  same thing.
