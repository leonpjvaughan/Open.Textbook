---
title: "2.9 Multi-stage problems and dynamic programming — Learn"
chapter: 2
chapter_title: Networks and graphs
section: '2.9'
section_title: "Multi-stage problems and dynamic programming"
tier: O
refs:
- S2
kind: walkthrough
---

# 2.9 Multi-stage problems and dynamic programming — Learn

**Prerequisites:** Section 2.8 — Dijkstra's algorithm.

**Objectives:** recognise a multi-stage problem; solve it by backward recursion; say
what a stage and a state are.

By the end of this section you can break a sequence of decisions into stages and solve it
from the end backwards, which is the method used wherever decisions are made one after
another.

## Problems in stages

Some problems are naturally a **sequence of decisions**. A journey that must pass through
one town in each of several regions. A factory that must decide output each month. A
network laid out in columns, where you move from one column to the next.

A network like that is a **multi-stage** network, and its columns are **stages**. Within
a stage, each vertex is a **state**: a situation you can be in at that point.

The rule is that you must visit exactly one state in each stage, moving forward through
the stages. The question is which states to choose.

## Backward recursion

You could answer it with Dijkstra, and on a small network you would get the same answer.
Dynamic programming answers it differently, and the difference is what makes it worth
learning: it works **backwards from the end**.

> **Backward recursion.**
> 1. At the last stage, the least cost from each state to the end is known directly.
> 2. Move back one stage. For each state, add the cost of each edge forward to the least
>    cost already found for the state it reaches, and take the smallest.
> 3. Repeat until the first stage. The value at the start is the answer.

**Example 1.** A network has four stages: stage 1 is $A$; stage 2 is $B, C$; stage 3 is
$D, E$; stage 4 is $F$. The edges are

$$AB = 2,\; AC = 5,\; BD = 4,\; BE = 7,\; CD = 3,\; CE = 2,\; DF = 6,\; EF = 1$$

**Stage 4.** $F$ is the end, so the cost from $F$ to $F$ is 0.

**Stage 3.** From $D$ there is only $DF = 6$, so the least cost from $D$ is 6. From $E$
there is only $EF = 1$, so the least cost from $E$ is 1.

**Stage 2.** From $B$:

$$B \to D \to F: 4 + 6 = 10 \qquad B \to E \to F: 7 + 1 = 8$$

The least is **8**, through $E$.

From $C$:

$$C \to D \to F: 3 + 6 = 9 \qquad C \to E \to F: 2 + 1 = 3$$

The least is **3**, through $E$.

**Stage 1.** From $A$:

$$A \to B \text{ then } 8: 2 + 8 = 10 \qquad A \to C \text{ then } 3: 5 + 3 = 8$$

The least total cost is **8**, along

$$A \to C \to E \to F$$

with weights $5 + 2 + 1 = 8$.

## Why backwards, and not forwards

At the last stage the answer needs no decision — there is nothing left to choose. That is
what makes the recursion start there. Each earlier stage is then solved using numbers
already worked out for the stage after it.

The forward method has to keep track of every possible route so far, and that grows
quickly. The backward method keeps **one number per state** and never solves the same
sub-problem twice. On a large problem that is the difference between a few hundred
calculations and millions.

> **Watch out.** The greedy choice — take the cheapest edge now — does **not** work here.
> From $A$ the cheapest first edge is $AB = 2$, but taking it costs $2 + 8 = 10$ in total.
> The better total of $8$ comes from $AC = 5$, the *more expensive* first edge. Dynamic
> programming looks at the whole remaining problem at each stage, not only the next edge,
> and that is why it needs the later values before it can decide.

## Progress check

Back to the chapter problem. Suppose the delivery van has to visit one room in each of
four zones of the building before it finishes. That is a multi-stage problem.

Draw the four stages and the possible moves between them with their distances. Then work
backwards: start at the last stage, write the cost from each room to the end, and move
back one stage at a time. When you reach the first zone you have the least total distance,
and by following the choices back you have the route.

Compare your answer with the one Dijkstra gave you in Section 2.8. If the network is the
same, the numbers should agree — two different methods, one answer.

## You should now be able to

- say what a stage and a state are in a multi-stage problem;
- solve one by backward recursion, writing the value at each state;
- recover the optimal route by following the choices back from the first stage;
- say why backward recursion is more efficient than listing every route, and why the
  greedy choice does not work.
