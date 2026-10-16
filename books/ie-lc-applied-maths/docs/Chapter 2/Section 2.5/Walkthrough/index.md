---
title: 2.5 Trees and spanning trees — Learn
chapter: 2
chapter_title: Networks and graphs
section: '2.5'
section_title: Trees and spanning trees
tier: O
refs:
- S2
kind: walkthrough
---

# 2.5 Trees and spanning trees — Learn

**Prerequisites:** Section 2.2 — connected and disconnected; Section 2.1 — degree.

**Objectives:** state what a tree is; use $E = n - 1$; explain what a spanning tree is
and why every connected network has one.

By the end of this section you know the cheapest shape that reaches everything, which is
the shape the next two sections will find.

## What a tree is

A **tree** is a connected network with no cycles.

That is the whole definition, and it has a surprising number of consequences. In a tree
there is **exactly one path** between any two vertices. If there were two, they would
together form a cycle; if there were none, the network would not be connected. So the
definition can be read either way:

- connected, with no cycles;
- exactly one path between every pair of vertices.

A network that is not connected but whose components are each trees is a **forest**. A
forest is a collection of trees.

**Example 1.** Is a network with vertices $A, B, C, D$ and edges $AB$, $BC$, $CD$ a tree?

It is connected — you can walk from $A$ to $D$ through $B$ and $C$. It has no cycle: to
return to a vertex you would have to reuse an edge. So it is a tree.

**Example 2.** Is a network with vertices $A, B, C$ and edges $AB$, $BC$, $CA$ a tree?

It is connected, but it is a triangle: the cycle $A \to B \to C \to A$ exists. So it is
not a tree.

## The edge count

Trees are the cheapest way to connect a set of vertices, and that shows in a formula.

> **A tree on $n$ vertices has exactly $n - 1$ edges.**

**Why.** Build the tree one vertex at a time. Start with one vertex and no edges. Add a
new vertex by one edge, which is the only way to keep it connected and avoid a cycle.
Each new vertex needs exactly one new edge, so connecting all $n$ vertices takes $n - 1$
edges.

The formula runs both ways. A connected network with $n$ vertices and $n - 1$ edges is a
tree. A connected network with more than $n - 1$ edges must contain a cycle.

**Example 3.** A tree has 8 vertices. How many edges has it?

$$8 - 1 = 7$$

**Example 4.** A connected network has 7 vertices and 9 edges. How many edges must be
removed, at least, to leave a tree?

A tree on 7 vertices has 6 edges, so at least $9 - 6 = 3$ edges must go. Each one removed
must be an edge on a cycle, or the network would fall apart.

## Spanning trees

Most real networks are not trees: they have more edges than they need, because a
connection is useful even when another route already exists. The rail network of a
country is full of cycles.

A **spanning tree** of a network is a tree that contains every vertex of the network, and
uses only edges the network already has.

It is "spanning" because it reaches everything, and a tree because it has no spare edges.
For the rail network, a spanning tree is a set of lines that still connects every station,
with no line that could be removed while keeping the network connected.

**Every connected network has a spanning tree.** If the network has no cycle, it is
already a tree and is its own spanning tree. If it has a cycle, remove any edge on that
cycle; the network stays connected, because the rest of the cycle still joins the two
ends. Keep removing edges on cycles until none is left. You now have a spanning tree.

**Example 5.** A network has 10 vertices and 15 edges. Every spanning tree of it has how
many edges?

Every spanning tree reaches all 10 vertices, so it has $10 - 1 = 9$ edges. The number is
the same whatever the network looks like and whatever the weights are. The question is
only ever *which* 9 edges.

> **Watch out.** A spanning tree must use edges the network actually has. You cannot draw
> a new connection because it is shorter. The whole point is to choose a subset of the
> existing connections, and Section 2.6 finds the cheapest such subset.

## Progress check

Back to the chapter problem. You have a seven-room network with a length on every
possible cable run. Count the rooms: $n = 7$. So every set of cables that reaches every
room without a redundant loop has $7 - 1 = 6$ cables.

Write down one such set by hand — any spanning tree will do, cheapest or not. Then work
out its total length. That total is your first answer to the cabling problem, and Section
2.6 finds the cheapest one there is.

## You should now be able to

- say what a tree is, in either of its two equivalent forms;
- use the fact that a tree on $n$ vertices has $n - 1$ edges, and that a connected
  network with more edges must contain a cycle;
- say what a spanning tree is and explain why every connected network has one;
- say how many edges every spanning tree of a given network has, and why the number is
  the same for all of them.
