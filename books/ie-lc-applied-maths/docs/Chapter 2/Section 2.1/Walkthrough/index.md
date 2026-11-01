---
title: 2.1 Networks and their terminology — Learn
chapter: 2
chapter_title: Networks and graphs
section: '2.1'
section_title: Networks and their terminology
tier: O
refs:
- S2
kind: walkthrough
---

# 2.1 Networks and their terminology — Learn

**Prerequisites:** reading a table, and the idea of a distance.

**Objectives:** name the parts of a network; find the degree of a vertex; use the
handshake lemma; read a weighted network.

By the end of this section you can describe any network precisely, using the words that
every later section depends on.

## A network is places and connections

Draw a dot for each place and a line for each connection between two places. That is a
**network**, and it is also called a **graph**. The two words mean the same thing here.

- A **vertex** (plural **vertices**) is one of the places. A vertex is also called a
  **node**.
- An **edge** is a connection between two vertices. An edge is also called an **arc** or
  a **link**.
- The **weight** of an edge is the number attached to it — a distance, a cost, a time.
  A network whose edges carry weights is a **weighted network**.

The diagram below is a weighted network. The vertices are towns and the weights are the
road distances between them, in kilometres.

:::figure graph-basics

Choose a vertex and read its degree. Then work through the questions below the diagram
before you read on.

## Degree

The **degree** of a vertex is the number of edges that meet it. The degree is also
called the **order** of the vertex.

In the diagram, vertex $A$ is joined to $B$ and to $C$, so

$$\deg(A) = 2$$

A vertex of degree 0 is **isolated**: nothing reaches it. A vertex of degree 1 is a
**leaf** or an **end vertex**: it is the end of a single edge.

**Example 1.** A vertex $P$ has edges to $Q$, $R$ and $S$, and two separate edges to
$Q$. Find $\deg(P)$.

Both edges to $Q$ are counted separately, because they are two different connections.
So

$$\deg(P) = 1 + 1 + 1 + 1 = 4$$

Two edges joining the same pair of vertices are **multiple edges**. An edge from a
vertex back to itself is a **loop**, and a loop adds 2 to the degree of its vertex — it
leaves and arrives.

## The handshake lemma

Every edge has two ends, and each end contributes 1 to the degree of the vertex it
touches. Add up all the degrees and you have counted each edge twice, once at each end.

> **The handshake lemma.** In any network, the sum of the degrees of all the vertices is
> twice the number of edges.
>
>
>
> $$\sum \deg(v) = 2E$$

where $v$ is a vertex and $E$ is the number of edges.

**Example 2.** A network has degrees $3, 3, 2, 2, 2$. How many edges does it have?

$$\sum \deg(v) = 3 + 3 + 2 + 2 + 2 = 12$$

$$E = \frac{12}{2} = 6$$

The network has 6 edges.

The lemma has a useful consequence. The sum of the degrees is always **even**, because
it is twice an integer. So a network cannot have an odd number of vertices of odd
degree. If you count three vertices of odd degree, you have made a mistake.

**Example 3.** Is there a network with degrees $4, 3, 3, 1$?

The sum is $4 + 3 + 3 + 1 = 11$, which is odd. No such network exists — the sum of the
degrees must be even. This is worth checking before you try to draw anything.

> **Watch out.** The degree counts **edges**, not the number of different neighbours. If
> two edges join $A$ and $B$, then $B$ contributes 2 to the degree of $A$. Forgetting
> the second edge is the most common mistake with the handshake lemma, and it makes the
> total odd when it should be even — a sign you have made it.

## Paths, cycles and complete networks

- A **path** is a route through the network that does not repeat an edge.
- A **cycle** (or **circuit**) is a path that returns to where it started.
- A **complete network** is one in which every pair of vertices is joined by exactly one
  edge.

A complete network on $n$ vertices has every vertex joined to every other, so every
degree is $n - 1$ and

$$E = \frac{n(n-1)}{2}$$

**Example 4.** How many edges has a complete network on 5 vertices?

$$E = \frac{5 \times 4}{2} = 10$$

**Example 5.** A complete network has 15 edges. How many vertices has it?

$$15 = \frac{n(n-1)}{2} \quad\Rightarrow\quad n(n-1) = 30 \quad\Rightarrow\quad n = 6$$

since $6 \times 5 = 30$.

## Progress check

Back to the chapter problem. The building has seven rooms and a list of possible cable
runs, each with a length. Draw the network: a vertex for each room, an edge for each
possible run, and the length as the weight.

Now answer two questions about your diagram. How many edges did you draw, and what is
the sum of all the degrees? Check that one is twice the other. Keep the diagram —
Section 2.5 uses it to find the cheapest set of cables.

## You should now be able to

- name the parts of a network — vertex, edge, weight — and say what a weighted network is;
- find the degree of a vertex, counting multiple edges and loops correctly;
- use the handshake lemma in both directions, and use the parity of the degree sum to
  show a network cannot exist;
- count the edges of a complete network, or find its number of vertices from the number
  of edges.
