---
title: "2.11 Comparing the algorithms and choosing one — Learn"
chapter: 2
chapter_title: Networks and graphs
section: '2.11'
section_title: "Comparing the algorithms and choosing one"
tier: H
refs:
- S2
kind: walkthrough
---

# 2.11 Comparing the algorithms and choosing one — Learn

**Prerequisites:** all of Chapter 2.

**Objectives:** match a question to the algorithm that answers it; compare the algorithms
by the work they do; say which conditions each one needs.

By the end of this section you can look at a problem, decide what kind it is, and choose
the method — which is the skill the whole chapter has been building towards.

## Which question is it?

Three different questions have appeared in this chapter, and they need three different
answers. Read the question carefully before choosing.

| The question asks for | It is | Use |
|---|---|---|
| the cheapest set of connections reaching **every** vertex | a minimum spanning tree | Kruskal or Prim |
| the cheapest route between **two** vertices | a shortest path | Dijkstra |
| the cheapest route through a **staged** network | dynamic programming | backward recursion |

The first two are often confused, and the mistake is common. A spanning tree reaches
everything; a shortest path reaches one place from another. Ask yourself: *does the answer
have to touch every vertex?* If yes, it is a spanning tree. If no, it is a path.

## Comparing by the work

Both spanning-tree algorithms give the same answer, so the choice is about the work.

- **Kruskal's algorithm** sorts all $E$ edges, then reads down the list. Its work grows
  with the number of **edges**.
- **Prim's algorithm** adds one vertex at a time and scans the row of the vertex most recently
  added. Its work grows with the number of **vertices** — and with how many edges there
  are per vertex.

That gives a practical rule:

- **Few edges, or edges given as a list** → Kruskal. It sorts once and the list is quick to
  work through by hand.
- **A dense network, or the network stored as a matrix** → Prim. It never sorts, and the
  row scan is exactly what a matrix is good at.

Dijkstra's algorithm is the only one that needs a condition on the weights, and the
condition is a real restriction, not a formality.

| Algorithm | Weights | Gives |
|---|---|---|
| Kruskal | any | minimum spanning tree |
| Prim | any | minimum spanning tree |
| Dijkstra | **non-negative only** | shortest path from one start |
| Backward recursion | any | shortest route through a staged network |

**Example 1.** A network has 50 vertices and 60 edges. Which spanning-tree algorithm is
likely to be lighter?

60 edges is only slightly more than 50 vertices — a **sparse** network, so most vertices
have few connections. Kruskal sorts 60 edges; Prim adds 50 vertices and scans the few
edges at each. Kruskal's sorting is small here, and it is quick to do by hand, so either
works and Kruskal is the natural choice for showing working.

**Example 2.** A network has 50 vertices and 1,200 edges. Which is likely to be lighter?

1,200 edges is a lot for 50 vertices — a **dense** network, where most pairs are joined.
Kruskal sorts all 1,200; Prim adds 50 vertices and scans a row of about 50 entries each
time. Prim is much lighter here.

## Why the answers cannot be swapped

It is worth seeing *why* each algorithm fails on the other's question, not only that it
does.

- **Kruskal on a shortest path.** Kruskal takes the cheapest edge anywhere. That edge may
  point away from the destination, and the tree it builds is chosen to reach everything
  cheaply, not to reach one place cheaply. The route between two vertices inside the tree
  can be far longer than the shortest path.
- **Dijkstra on a spanning tree.** Dijkstra settles the nearest unsettled vertex and never
  considers an edge between two vertices that are both already settled. But those edges —
  the ones joining two settled vertices — are exactly what a spanning tree is made of.
  So Dijkstra's settled structure is not a spanning tree.
- **Dijkstra on a staged network.** It works, and gives the right answer, but it does not
  use the stage structure. Backward recursion does less work because the stages tell it
  which vertices to consider next.
- **Backward recursion on a general network.** It needs stages. Without them, there is no
  order in which to fill the values in, and the method does not apply.

> **Watch out.** Dijkstra's non-negative condition is the one that matters most in an
> exam. Every weight in this course is a distance, a cost or a time, so every weight is
> positive and the algorithm applies. But if a question ever shows a negative weight —
> unusual, and usually a sign of a different kind of problem — Dijkstra's algorithm is the
> wrong tool, and you should say so.

## Progress check

Back to the chapter problem. You have three answers for the building: the cheapest set of
cables, the shortest route between two rooms, and — if the building were laid out in
zones — the cheapest route through the zones.

Write one paragraph that a client could read. Say what each answer is, which question it
answers, and why the cheapest cabling is not the same as the shortest route. That
paragraph is the answer to the chapter problem, and writing it is the last step.

## You should now be able to

- match a question to the algorithm that answers it, and say why the others do not;
- compare Kruskal's and Prim's algorithms by the work they do, and choose between them;
- state Dijkstra's non-negative condition and say what breaks without it;
- explain why a minimum spanning tree is not a shortest path, and give a reason in terms
  of the edges each algorithm considers.
