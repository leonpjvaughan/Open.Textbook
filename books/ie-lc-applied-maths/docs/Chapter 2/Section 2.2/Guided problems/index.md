---
title: "2.2 Connected, disconnected, directed and undirected graphs — Practise with help"
chapter: 2
chapter_title: Networks and graphs
section: "2.2"
section_title: Connected, disconnected, directed and undirected graphs
tier: O
refs:
- S2
kind: guided-problems
---

# 2.2 Connected, disconnected, directed and undirected graphs — Practise with help

## Warm-up: remember

1. A network has vertex degrees $4, 4, 3, 3$. What is the sum of the degrees, and how
   many edges has the network?
2. A complete network has 4 vertices. Write down the degree of each vertex.

<details markdown="1">
<summary>Answers and feedback</summary>

1. Sum $= 14$, so $E = 7$. The sum must be even, and $14$ is.
2. Each vertex is joined to the other 3, so every degree is $3$.

</details>

## Practise with help

**1.** A network has vertices $A, B, C$ joined to each other, and a separate vertex $D$
with one edge to $E$. How many components has the network?

<details markdown="1">
<summary>Hint</summary>

A component is a set of vertices that can all reach one another.

<details markdown="1">
<summary>Next step</summary>

$\{A, B, C\}$ is one component. What can $D$ and $E$ reach?

<details markdown="1">
<summary>Full working</summary>

$\{A, B, C\}$ form one component. $D$ and $E$ can reach each other and nothing else, so
$\{D, E\}$ is a second component. The network has **2 components** and is disconnected.

</details>
</details>
</details>

**2.** A connected network has degrees $2, 2, 2, 2, 2, 2$. Does it have an Eulerian
trail? If so, what kind?

<details markdown="1">
<summary>Hint</summary>

Count the vertices of odd degree.

<details markdown="1">
<summary>Next step</summary>

There are 0 odd-degree vertices.

<details markdown="1">
<summary>Full working</summary>

With 0 odd-degree vertices and a connected network, an Eulerian trail exists and can
start and finish at the same vertex. It is an **Eulerian circuit**.

A simple example is a hexagon: walk round it and you have used every edge once and
returned to the start.

</details>
</details>
</details>

**3.** A connected network has degrees $5, 3, 2, 2, 2$. How many odd-degree vertices has
it, and can a trail use every edge exactly once?

<details markdown="1">
<summary>Hint</summary>

Odd means not divisible by 2.

<details markdown="1">
<summary>Next step</summary>

$5$ and $3$ are odd; the three $2$s are even.

<details markdown="1">
<summary>Full working</summary>

There are exactly **2** odd-degree vertices, $5$ and $3$. The test is satisfied, so an
Eulerian trail exists. It must start at one of the odd-degree vertices and finish at the
other — those are the only two places a trail can begin or end without leaving an edge
unused.

</details>
</details>
</details>

**4.** In a directed network, vertex $P$ has out-degree $3$ and in-degree $2$. Another
vertex $Q$ has out-degree $1$ and in-degree $4$. Write down the degree of each, and say
which vertex more traffic flows *into*.

<details markdown="1">
<summary>Hint</summary>

Degree is the sum of the two. Traffic flows in along the arriving arrows.

<details markdown="1">
<summary>Next step</summary>

$\deg(P) = 3 + 2$ and $\deg(Q) = 1 + 4$. Compare the in-degrees.

<details markdown="1">
<summary>Full working</summary>

$$\deg(P) = 3 + 2 = 5 \qquad \deg(Q) = 1 + 4 = 5$$

More traffic flows into $Q$, because its in-degree is $4$ against $P$'s $2$. The
degrees are equal, which shows that the ordinary degree does not tell you which way the
traffic goes — that is why directed networks need two numbers, not one.

</details>
</details>
</details>

**5.** A route through a network is $A \to B \to C \to A \to D$. Is it a walk, a trail,
a path or a cycle? Say what repeats.

<details markdown="1">
<summary>Hint</summary>

Check whether an edge repeats, then whether a vertex repeats.

<details markdown="1">
<summary>Next step</summary>

$A$ is visited twice, at the start and in the middle.

<details markdown="1">
<summary>Full working</summary>

$A$ repeats, so it is not a path. No edge repeats — each of the four steps uses a
different edge — so it is a **trail**. It is not a cycle, because a cycle must return to
its starting vertex at the *end*, and this route ends at $D$.

So it is a trail, and neither a path nor a cycle.

</details>
</details>
</details>

**6.** Explain why a network with an Eulerian trail cannot have four vertices of odd
degree.

<details markdown="1">
<summary>Hint</summary>

Every time a trail passes through a vertex it uses two of that vertex's edges. Where do
the odd edges end up?

<details markdown="1">
<summary>Next step</summary>

Only the start and the finish can be left with an odd number of used edges.

<details markdown="1">
<summary>Full working</summary>

An Eulerian trail uses every edge. At any vertex that is neither the start nor the
finish, the trail arrives as many times as it leaves, so its edges are used in pairs and
its degree is even. Only the start has one extra edge leaving, and only the finish has
one extra edge arriving. So at most two vertices can have odd degree. Four is more than
two, so no such trail exists.

</details>
</details>
</details>

## A question from Section 2.1

**7.** The handshake lemma says the number of odd-degree vertices is even. How does that
agree with the Eulerian test, which allows 0 or 2 but not 4?

<details markdown="1">
<summary>Hint</summary>

The lemma says the count is even. The test says which even counts are *useful*.

<details markdown="1">
<summary>Next step</summary>

Even counts are $0, 2, 4, 6, \dots$

<details markdown="1">
<summary>Full working</summary>

The lemma allows $0, 2, 4, 6, \dots$ odd-degree vertices — any even number. The Eulerian
test is stricter: only $0$ and $2$ work. A network with four odd-degree vertices is
perfectly possible; it simply cannot be travelled in one trail that uses every edge once.

So the lemma tells you which networks can exist, and the test tells you which of those
can be traversed. They answer different questions, and the test only makes sense once
you know the lemma is satisfied.

</details>
</details>
</details>

**8.** A one-way system is drawn as an undirected network with the direction written on
each street. Explain one question this loses the answer to, and how a directed network
answers it.

<details markdown="1">
<summary>Hint</summary>

Think about a journey that must be possible, not just short.

<details markdown="1">
<summary>Next step</summary>

An undirected edge can be travelled either way; an arrow cannot.

<details markdown="1">
<summary>Full working</summary>

The undirected drawing says two places are connected, but not whether you can actually
get from one to the other. A street may run the wrong way, so there is a connection and
no route.

A directed network answers it: a route from $A$ to $B$ exists only if there is a chain
of arrows all pointing the right way. That is the difference between "these two places
are joined" and "you can drive from here to there", and it is the reason one-way systems
are modelled as directed networks.

</details>
</details>
</details>
