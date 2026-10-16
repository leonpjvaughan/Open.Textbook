---
title: 2.2 Connected, disconnected, directed and undirected graphs — Learn
chapter: 2
chapter_title: Networks and graphs
section: '2.2'
section_title: Connected, disconnected, directed and undirected graphs
tier: O
refs:
- S2
kind: walkthrough
---

# 2.2 Connected, disconnected, directed and undirected graphs — Learn

**Prerequisites:** Section 2.1 — vertices, edges and degree.

**Objectives:** tell a connected network from a disconnected one; tell a directed
network from an undirected one; use in-degree and out-degree; state the test for an
Eulerian trail.

By the end of this section you can say what kind of network you are looking at, and what
that shape allows.

## Connected and disconnected

A network is **connected** when there is a path between every pair of vertices. If you
can start anywhere and reach everywhere, it is connected.

If not, it is **disconnected**, and it falls into pieces called **components**. A
component is a set of vertices that can all reach one another, with no edge to any
vertex outside the set. A disconnected network has two or more components.

Think of the rail network of an island. If every station can be reached from every other
station, the network is connected. If one line was built to an island with no link to
the main system, that island is a separate component, and the whole network is
disconnected.

**Why it matters.** A network that is disconnected cannot answer a question about
connecting everything, because there is nothing to connect across the gap. The first
thing to check, before any algorithm, is whether the network is connected at all.

## Directed and undirected

So far every edge has been a plain line: you can travel it either way. That is an
**undirected** network.

Sometimes a connection only works one way. A one-way street, a river that flows
downhill, a task that must follow another. An edge with a direction is a **directed
edge**, drawn with an arrow, and a network made of directed edges is a **directed
network**, or **digraph**.

In a directed network the degree splits in two:

- the **out-degree** of a vertex is the number of arrows leaving it;
- the **in-degree** is the number of arrows arriving at it.

The ordinary degree is the sum: $\deg(v) = \text{out-degree}(v) + \text{in-degree}(v)$.

**Example 1.** In a directed network, vertex $X$ has arrows to $Y$ and $Z$, and an arrow
from $W$ arrives at $X$. Find the out-degree, the in-degree and the degree of $X$.

$$\text{out-degree} = 2 \qquad \text{in-degree} = 1 \qquad \deg(X) = 3$$

Every arrow leaves exactly one vertex and arrives at exactly one, so across the whole
network the out-degrees add to the number of arrows — and so do the in-degrees.

## Walks, trails, paths and cycles

Four words describe a route, and the difference between them is what is allowed to
repeat.

- A **walk** is any route along edges. Vertices and edges may repeat.
- A **trail** is a walk that does not repeat an edge.
- A **path** is a walk that does not repeat a vertex.
- A **cycle** is a trail that returns to where it started.

A path is always a trail, because repeating a vertex would mean repeating an edge to
leave it again. A trail need not be a path: $A \to B \to C \to B \to D$ uses no edge
twice but visits $B$ twice, so it is a trail and not a path.

## Eulerian trails

A postal worker wants to walk every street on a round exactly once. Can it be done?

An **Eulerian trail** is a trail that uses every edge of a network exactly once. It is
named after Leonhard Euler, who answered the question for the bridges of Königsberg in
1736 — the problem that started network theory.

The test is short and it is about degree.

> **The Eulerian test.** A connected network has an Eulerian trail exactly when the
> number of vertices of odd degree is 0 or 2.
>
> - **0 odd vertices:** the trail can start and finish at the same vertex. This is an
>   **Eulerian circuit**.
> - **2 odd vertices:** the trail must start at one of them and finish at the other.
> - **Any other number:** no Eulerian trail exists.

**Why it works.** Every time a trail passes *through* a vertex it uses two edges there,
one arriving and one leaving. So a vertex in the middle of a trail has an even number of
its edges used in pairs. Only the start and the finish are left with an odd number —
because the start has one edge leaving without one arriving first, and the finish has one
arriving without one leaving after. So at most two vertices can have odd degree, and if
there are none the start and finish can be the same vertex.

**Example 2.** A connected network has degrees $3, 3, 2, 2, 2$. Can its edges be
travelled exactly once each?

There are exactly two odd-degree vertices, so yes. The trail must start at one of the
degree-3 vertices and finish at the other.

**Example 3.** Every vertex of a connected network has even degree. What kind of trail
exists?

With 0 odd vertices the network has an Eulerian circuit: start anywhere, use every edge
once, and finish where you started.

> **Watch out.** The test needs the network to be **connected** as well as having 0 or 2
> odd vertices. Two separate triangles have six vertices of even degree each, so 0 odd
> vertices — but no single trail can use the edges of both, because nothing joins them.
> Check connectedness first.

## Progress check

Back to the chapter problem. Look at your seven-room network from Section 2.1. Before
you run any algorithm on it, answer two questions.

Is it connected? If it is not, the cabling problem has no solution as drawn, and you
need another possible cable run. Then count the vertices of odd degree. If there are
exactly 0 or 2, a single cable route could run every possible run exactly once — which
would be a different, cheaper way to see the whole building. Keep both answers; Section
2.5 uses the first.

## You should now be able to

- say whether a network is connected or disconnected, and count its components;
- tell an undirected network from a directed one, and find in-degree, out-degree and
  degree;
- tell a walk, a trail, a path and a cycle apart by what each allows to repeat;
- state the Eulerian test and use it, remembering that connectedness is part of the test.
