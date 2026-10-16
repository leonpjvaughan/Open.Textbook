---
title: "2.8 Shortest paths and Dijkstra's algorithm — Practise with help"
chapter: 2
chapter_title: Networks and graphs
section: "2.8"
section_title: "Shortest paths and Dijkstra's algorithm"
tier: O
refs:
- S2
kind: guided-problems
---

# 2.8 Shortest paths and Dijkstra's algorithm — Practise with help

## Warm-up: remember

1. A network has 7 vertices. How many edges has a minimum spanning tree of it?
2. On the same network, how many edges could a shortest path have?

<details markdown="1">
<summary>Answers and feedback</summary>

1. $7 - 1 = 6$ edges.
2. Anywhere from 1 (if the two vertices are joined) to 6 (if the route visits every
   vertex). A shortest path has no fixed length — that is the difference from a spanning
   tree.

</details>

## Practise with help

**1.** A network has edges $PQ = 3$, $PR = 6$, $QR = 4$. Find the shortest distance from
$P$ to $R$ using Dijkstra's algorithm.

<details markdown="1">
<summary>Hint</summary>

There are two routes: direct, and through $Q$.

<details markdown="1">
<summary>Next step</summary>

Direct: $PR = 6$. Through $Q$: $PQ + QR = 3 + 4$.

<details markdown="1">
<summary>Full working</summary>

| Settled | Distance | Updates |
|---|---|---|
| $P$ | 0 | $Q \to 3$; $R \to 6$ |
| $Q$ | 3 | $R \to \min(6, 3+4) = 6$ |
| $R$ | 6 | done |

The shortest distance is **6**, and here the direct edge is as good as the detour. Both
routes cost 6, so there are two shortest paths: $P \to R$ and $P \to Q \to R$.

</details>
</details>
</details>

**2.** A network has edges $AB = 5$, $AC = 1$, $CB = 2$, $BD = 3$, $CD = 10$. Find the
shortest distance from $A$ to $D$.

<details markdown="1">
<summary>Hint</summary>

Settle $A$, then the nearest unsettled vertex.

<details markdown="1">
<summary>Next step</summary>

From $A$: $B \to 5$, $C \to 1$. Settle $C$ next.

<details markdown="1">
<summary>Full working</summary>

| Settled | Distance | Updates |
|---|---|---|
| $A$ | 0 | $B \to 5$; $C \to 1$ |
| $C$ | 1 | $B \to \min(5, 1+2) = 3$; $D \to 1+10 = 11$ |
| $B$ | 3 | $D \to \min(11, 3+3) = 6$ |
| $D$ | 6 | done |

The shortest distance is **6**, along $A \to C \to B \to D$: $1 + 2 + 3 = 6$. The direct
route $A \to B \to D$ costs $5 + 3 = 8$, and going through $C$ is cheaper.

</details>
</details>
</details>

**3.** In that question, at the moment $A$ is settled, $B$'s tentative distance is 5. Why
does it change to 3?

<details markdown="1">
<summary>Hint</summary>

A tentative distance is a guess, and a guess can improve.

<details markdown="1">
<summary>Next step</summary>

Settling $C$ at distance 1 opens a new route to $B$: through $C$.

<details markdown="1">
<summary>Full working</summary>

When $A$ is settled, the only known route to $B$ is the direct edge $AB = 5$, so $B$'s
tentative distance is 5. But 5 is a guess, not a fact — $B$ is not settled yet.

When $C$ is settled at distance 1, the algorithm looks at $C$'s neighbours. The route
$A \to C \to B$ costs $1 + 2 = 3$, which is less than 5, so the tentative distance is
replaced by 3.

That is the point of keeping tentative distances: the algorithm improves its guesses as it
learns more, and only fixes a distance when it settles the vertex.

</details>
</details>
</details>

**4.** A student runs Dijkstra's algorithm and settles a vertex at distance 7, then later
finds a route to it of total 6. What has gone wrong?

<details markdown="1">
<summary>Hint</summary>

Can a settled distance ever be improved?

<details markdown="1">
<summary>Next step</summary>

No — that is the guarantee the algorithm rests on.

<details markdown="1">
<summary>Full working</summary>

A settled distance can never be improved, so a route of total 6 found after settling a
vertex at 7 means the algorithm was not run correctly. Something has gone wrong in one of
two ways:

- a tentative distance was not updated when a neighbour was settled, so the vertex was
  settled at 7 when its true distance was already 6; or
- the wrong vertex was settled — the smallest tentative distance was not chosen, so a
  vertex was settled before its distance was final.

Both are the same mistake in different clothes: settling something before it was the
smallest unsettled distance.

</details>
</details>
</details>

**5.** On the network $AB = 4$, $AC = 2$, $BC = 1$, $BD = 5$, $CD = 8$, $CE = 10$,
$DE = 2$, $DF = 6$, $EF = 3$, find the shortest distance from $A$ to $E$.

<details markdown="1">
<summary>Hint</summary>

Run the same table as Example 1 and stop when $E$ is settled.

<details markdown="1">
<summary>Next step</summary>

$E$ is updated twice: to 12 via $C$, then to 10 via $D$.

<details markdown="1">
<summary>Full working</summary>

From Example 1 the settled distances are $A = 0$, $C = 2$, $B = 3$, $D = 8$, $E = 10$,
$F = 13$.

The shortest distance from $A$ to $E$ is **10**, along $A \to C \to B \to D \to E$:
$2 + 1 + 5 + 2 = 10$.

The direct-looking route $A \to C \to E$ costs $2 + 10 = 12$, so the longer way round is
cheaper. This is why the algorithm is needed — you cannot tell by looking.

</details>
</details>
</details>

**6.** Explain why Dijkstra's algorithm cannot be used on a network with a negative edge
weight.

<details markdown="1">
<summary>Hint</summary>

The algorithm settles the nearest vertex because going further always costs more.

<details markdown="1">
<summary>Next step</summary>

With a negative weight, is going further still more expensive?

<details markdown="1">
<summary>Full working</summary>

The algorithm settles the nearest unsettled vertex because any other route to it would
have to pass through an unsettled vertex whose distance is already at least as large, and
every extra edge adds more.

A negative edge breaks that. A route could go to a vertex that looks far away, take a
negative edge, and arrive back cheaper than the vertex the algorithm already settled. The
settled distance would then be wrong, and the whole guarantee fails.

Every weight in this course is a distance, cost or time, so every weight is positive, and
the algorithm is safe to use.

</details>
</details>
</details>

## A question from Section 2.7

**7.** The minimum spanning tree of this network weighs 13, and the shortest path from
$A$ to $F$ also weighs 13. A student concludes they are the same thing. Explain the
mistake.

<details markdown="1">
<summary>Hint</summary>

What does each answer consist of?

<details markdown="1">
<summary>Next step</summary>

One is a set of edges reaching every vertex; the other is a route between two.

<details markdown="1">
<summary>Full working</summary>

The two answers happen to share the same total here, but they are different objects. The
minimum spanning tree is a set of 5 edges reaching every vertex. The shortest path is a
single route from $A$ to $F$.

They also answer different questions: "connect everything as cheaply as possible" and
"get from here to there as cheaply as possible". A route that is cheapest between two
vertices need not be part of the cheapest way to connect everything, and the cheapest way
to connect everything is not a route at all.

The equality of the two totals is a coincidence of this network. Change $DF$ from 6 to 4
and the tree changes while the shortest path does not, or vice versa. Never use one answer
for the other question.

</details>
</details>
</details>

**8.** A network has 6 vertices. Dijkstra's algorithm from $A$ settles them in the order
$A, C, B, D, E, F$ with distances $0, 2, 3, 8, 10, 13$. Write down the shortest path from
$A$ to $F$, and explain how you found it.

<details markdown="1">
<summary>Hint</summary>

Trace back from $F$: which settled vertex updated it last?

<details markdown="1">
<summary>Next step</summary>

$F = 13 = 10 + 3$, and $E = 10$.

<details markdown="1">
<summary>Full working</summary>

Trace back from $F$:

- $13 = 10 + 3$, and the edge $EF$ has weight 3, so $F$ came from $E$;
- $10 = 8 + 2$, and $DE = 2$, so $E$ came from $D$;
- $8 = 3 + 5$, and $BD = 5$, so $D$ came from $B$;
- $3 = 2 + 1$, and $BC = 1$, so $B$ came from $C$;
- $2 = 0 + 2$, and $AC = 2$, so $C$ came from $A$.

The shortest path is $A \to C \to B \to D \to E \to F$. To check it, add the weights
along the route: $2 + 1 + 5 + 2 + 3 = 13$, which matches the settled distance of $F$.

</details>
</details>
</details>
