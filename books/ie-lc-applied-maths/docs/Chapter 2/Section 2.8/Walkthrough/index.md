---
title: "2.8 Shortest paths and Dijkstra's algorithm — Learn"
chapter: 2
chapter_title: Networks and graphs
section: '2.8'
section_title: "Shortest paths and Dijkstra's algorithm"
tier: O
refs:
- S2
kind: walkthrough
---

# 2.8 Shortest paths and Dijkstra's algorithm — Learn

**Prerequisites:** Section 2.6 and 2.7 — minimum spanning trees.

**Objectives:** find the shortest path between two vertices with Dijkstra's algorithm;
say why the nearest unsettled vertex can be settled; tell this problem from the spanning
tree problem.

By the end of this section you can find the shortest route between two places, which is a
different question from connecting all of them.

## A different question

A spanning tree connects **every** vertex for the least total weight. A shortest path
connects **two** vertices — a start and a destination — for the least total weight. The
two answers are usually different, and confusing them is the commonest mistake in this
chapter.

The shortest path problem is the one every navigation app solves: given a start and a
destination, what is the cheapest route?

## Dijkstra's algorithm

Edsger Dijkstra's method finds the shortest distance from one start to **every** vertex,
which is more than you asked for and exactly what makes it work.

> **Dijkstra's algorithm.**
>
> 1. Give the start vertex a distance of 0. Give every other vertex a tentative distance
>    of $\infty$ (unknown).
> 2. Of the vertices not yet settled, choose the one with the smallest tentative distance.
>    Settle it: its distance is now final.
> 3. For each neighbour of the settled vertex, work out the distance via the settled
>    vertex. If that is smaller than the neighbour's current tentative distance, replace it.
> 4. Repeat from step 2 until the destination is settled, or until nothing is left.

The word "tentative" matters. A distance is a *guess* until the vertex is settled, and a
guess can be improved. A settled distance never changes.

**Example 1.** Find the shortest distance from $A$ to $F$.

- $AB = 4$, $AC = 2$, $BC = 1$, $BD = 5$, $CD = 8$, $CE = 10$, $DE = 2$, $DF = 6$,
  $EF = 3$

| Settled | Distance from $A$ | Updates |
|---|---|---|
| $A$ | 0 | $B \to 4$ via $A$; $C \to 2$ via $A$ |
| $C$ | 2 | $B \to \min(4, 2+1) = 3$; $D \to 2+8 = 10$; $E \to 2+10 = 12$ |
| $B$ | 3 | $D \to \min(10, 3+5) = 8$ |
| $D$ | 8 | $E \to \min(12, 8+2) = 10$; $F \to 8+6 = 14$ |
| $E$ | 10 | $F \to \min(14, 10+3) = 13$ |
| $F$ | 13 | done |

The shortest distance from $A$ to $F$ is **13**.

To recover the route, trace back the update that gave each vertex its final distance:
$F$ came from $E$, $E$ from $D$, $D$ from $B$, $B$ from $C$, $C$ from $A$. So the shortest
path is

$$A \to C \to B \to D \to E \to F$$

with total weight $2 + 1 + 5 + 2 + 3 = 13$.

## Why settling the nearest vertex is safe

At each step the algorithm settles the unsettled vertex with the smallest tentative
distance. Why can that distance never be improved afterwards?

Any other route to that vertex would have to leave the settled set at some point, through
some unsettled vertex. But every unsettled vertex has a tentative distance **at least as
large** as the one being settled — that is how it was chosen. And every edge weight is
positive, so going further only adds. So no cheaper route exists, and the distance is
final.

That argument is the whole reason the algorithm is correct, and it is also where its limit
lies.

> **Watch out.** Dijkstra's algorithm needs every weight to be **non-negative**. If an
> edge had a negative weight, a longer-looking route could turn out cheaper, and settling
> the nearest vertex would be wrong. Every weight in this course is a distance, a cost or a
> time, so every weight is positive and the algorithm applies. If you ever meet a negative
> weight, this algorithm is the wrong tool.

:::figure dijkstra-stepper

**Predict, then test.** Before you step through, write down what you expect the shortest
distance from $A$ to $F$ to be, and which route it takes. Then run the algorithm and
check. Now look at the vertex settled second: was its distance the one you expected? Write
down why the algorithm was able to settle it so early.

## Shortest path is not the spanning tree

The two problems look similar and the algorithms both take a cheapest something. They are
not the same.

| | Minimum spanning tree | Shortest path |
|---|---|---|
| Connects | every vertex | two vertices |
| Number of edges | $n - 1$ | 1 to $n - 1$ |
| Answer is | a set of edges | a route from start to destination |
| Algorithm | Kruskal or Prim | Dijkstra |

On the network above the shortest path from $A$ to $F$ has weight 13 and the minimum
spanning tree also has weight 13. That is a **coincidence of this network**. Change one
weight and the two answers separate. Never use one answer for the other question.

## Progress check

Back to the chapter problem. The delivery van has to travel between two particular rooms
by the shortest route. Use Dijkstra's algorithm on your seven-room network, starting at
the room the van leaves from.

Write down the settled distance for each room, then trace the route back from the
destination. Check it against the drawing: the route should be a chain of edges that
actually exist, and its weights should add to the distance you found.

You now have both answers to the chapter problem. The cheapest cabling came from Kruskal
or Prim; the shortest van route came from Dijkstra. Say in one sentence why they are
different questions.

## You should now be able to

- run Dijkstra's algorithm and find the shortest distance from a start to every vertex;
- recover the shortest path by tracing the updates back from the destination;
- explain why the nearest unsettled vertex can be settled for good;
- say why the algorithm needs non-negative weights;
- tell the shortest path problem from the minimum spanning tree problem, and say which
  algorithm answers which.
