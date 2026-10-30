---
title: "2.9 Multi-stage problems and dynamic programming — Practise with help"
chapter: 2
chapter_title: Networks and graphs
section: "2.9"
section_title: "Multi-stage problems and dynamic programming"
tier: O
refs:
- S2
kind: guided-problems
---

# 2.9 Multi-stage problems and dynamic programming — Practise with help

## Warm-up: remember

1. On a network, what is the shortest distance from the destination to itself?
2. Why does Dijkstra's algorithm settle the nearest unsettled vertex?

<details markdown="1">
<summary>Answers and feedback</summary>

1. 0 — you are already there.
2. Because any other route would pass through an unsettled vertex that is at least as far
   away, and every weight is positive.

</details>

:::figure warm-up-gate


## Practise with help

**1.** A network has stages $A$; $B, C$; $D$. Edges: $AB = 3$, $AC = 1$, $BD = 2$,
$CD = 8$. Find the least cost from $A$ to $D$ by backward recursion.

<details markdown="1">
<summary>Hint</summary>

Start at the last stage, $D$, where the cost to the end is 0.

<details markdown="1">
<summary>Next step</summary>

From $B$: $3$? No — from $B$ the cost to $D$ is $BD = 2$. From $C$ it is $CD = 8$.

<details markdown="1">
<summary>Full working</summary>

Stage 3 ($D$): cost to the end $= 0$.

Stage 2:
- From $B$: $BD = 2$, so cost $= 2 + 0 = 2$.
- From $C$: $CD = 8$, so cost $= 8 + 0 = 8$.

Stage 1 ($A$):
- $A \to B$ then $2$: $3 + 2 = 5$.
- $A \to C$ then $8$: $1 + 8 = 9$.

Least is $5$, along $A \to B \to D$. Here the greedy choice happens to be wrong too: the
cheapest first edge is $AC = 1$, but the better total is through $AB = 3$.

</details>
</details>
</details>

**2.** For that network, a student says "the cheapest first edge is $AC = 1$, so the
answer is 9". Explain the mistake.

<details markdown="1">
<summary>Hint</summary>

What does the cheap first edge lead to?

<details markdown="1">
<summary>Next step</summary>

$AC = 1$ is cheap, but from $C$ the only way on is $CD = 8$.

<details markdown="1">
<summary>Full working</summary>

The student has made the greedy choice: take the cheapest edge now. But the cheap first
edge leads to an expensive continuation. $A \to C$ costs 1, and then $C \to D$ costs 8,
giving 9 in total. The more expensive first edge $A \to B$ costs 3, but then $B \to D$
costs only 2, giving 5.

The least total is 5, not 9. Dynamic programming avoids this mistake by looking at the
cost of the whole remaining journey from each state, not just the next edge.

</details>
</details>
</details>

**3.** A four-stage network has stages $P$; $Q, R$; $S, T$; $U$. Edges: $PQ = 1$,
$PR = 4$, $QS = 3$, $QT = 6$, $RS = 2$, $RT = 5$, $SU = 4$, $TU = 1$. Find the least
total cost from $P$ to $U$.

<details markdown="1">
<summary>Hint</summary>

Work back: $U$ is 0, then stage 3 ($S, T$), then stage 2, then stage 1.

<details markdown="1">
<summary>Next step</summary>

From $S$: $SU = 4$. From $T$: $TU = 1$. Then from $Q$: $\min(3+4, 6+1)$.

<details markdown="1">
<summary>Full working</summary>

Stage 4 ($U$): $0$.

Stage 3:
- $S$: $SU = 4$, cost $= 4$.
- $T$: $TU = 1$, cost $= 1$.

Stage 2:
- $Q$: $\min(QS + 4,\; QT + 1) = \min(3 + 4,\; 6 + 1) = \min(7, 7) = 7$.
- $R$: $\min(RS + 4,\; RT + 1) = \min(2 + 4,\; 5 + 1) = \min(6, 6) = 6$.

Stage 1 ($P$):
- $\min(PQ + 7,\; PR + 6) = \min(1 + 7,\; 4 + 6) = \min(8, 10) = 8$.

Least total cost $= 8$, along $P \to Q \to S \to U$ ($1 + 3 + 4 = 8$) or
$P \to Q \to T \to U$ ($1 + 6 + 1 = 8$). There are **two** optimal routes with the same
cost, which is worth noticing — a dynamic programming table records the best *value*,
and ties mean more than one route achieves it.

</details>
</details>
</details>

**4.** In that network, both $Q$ and $R$ have the same cost to the end, 7 and 6
respectively, but from $P$ only $Q$ is used. Explain.

<details markdown="1">
<summary>Hint</summary>

Add the cost of the first edge to each.

<details markdown="1">
<summary>Next step</summary>

$PQ + 7 = 8$; $PR + 6 = 10$.

<details markdown="1">
<summary>Full working</summary>

From $P$ the two options are $P \to Q$ then $7$ more, giving $1 + 7 = 8$, and $P \to R$
then $6$ more, giving $4 + 6 = 10$. The first is cheaper.

Even though $R$ has a lower cost to the end than $Q$ ($6$ against $7$), the edge to $R$
is much more expensive ($4$ against $1$). The decision at a stage combines the edge cost
*and* the value of the state it leads to — neither alone decides it.

</details>
</details>
</details>

**5.** Explain why dynamic programming does not need to list every possible route.

<details markdown="1">
<summary>Hint</summary>

How many numbers does it keep per state?

<details markdown="1">
<summary>Next step</summary>

One: the least cost to the end.

<details markdown="1">
<summary>Full working</summary>

It keeps one number per state — the least cost from that state to the end — and reuses
it wherever that state appears. A route that passes through a state later uses the same
number, so the work for that state is done once.

Listing every route would examine each route separately, and the number of routes grows
very quickly with the number of stages. Dynamic programming does work proportional to the
number of states and edges, not the number of routes.

</details>
</details>
</details>

**6.** A student works forwards, keeping the least cost to reach each state. Explain why
this is harder than working backwards.

<details markdown="1">
<summary>Hint</summary>

At a state in the middle, what do you still not know?

<details markdown="1">
<summary>Next step</summary>

You do not know how much the rest of the journey will cost.

<details markdown="1">
<summary>Full working</summary>

Working forwards, when you reach a state you know the cheapest way to *get there*, but
not the cost of the rest of the journey — which is what you actually want to minimise.
The cheapest way to reach a state may lead to an expensive continuation, exactly as the
greedy choice did.

Working backwards, the value at each state is the cost of the *remaining* journey, which
is precisely what the decision needs. That is why backward recursion is the natural
direction for this kind of problem: the unknown is at the end, and the recursion starts
where the unknown is known.

(Forward dynamic programming is possible and is used for some problems, but it needs the
same values, and the backward version is the one this course uses.)

</details>
</details>
</details>

## A question from Section 2.8

**7.** The multi-stage network of Example 1 has 4 stages and 4 routes from $A$ to $F$.
Dijkstra's algorithm and backward recursion both give 8. Explain what each method does
differently, given they agree.

<details markdown="1">
<summary>Hint</summary>

One settles vertices in order of distance from the start; the other fills in values from
the end.

<details markdown="1">
<summary>Next step</summary>

Both find shortest distances; they differ in the order the work is done.

<details markdown="1">
<summary>Full working</summary>

Dijkstra's algorithm works **forwards** from the start: it settles the nearest unsettled
vertex, working outwards from $A$ until everything is settled. It does not use the stage
structure at all.

Backward recursion works **backwards** from the end, one stage at a time, using the fact
that you must pass through exactly one vertex per stage.

On a network with stages, backward recursion does less work, because the stage structure
tells it which vertices to consider next. On a general network with no stages, Dijkstra's
algorithm applies and backward recursion does not. Both are correct; each suits a
different shape of problem.

</details>
</details>
</details>

**8.** A network has 5 stages with 4 states in each. Roughly how many routes are there
from the first stage to the last, and how many numbers does backward recursion keep?

<details markdown="1">
<summary>Hint</summary>

A route picks one state per stage. How many ways?

<details markdown="1">
<summary>Next step</summary>

$4$ choices in each of the 4 stages after the first: $4^4$.

<details markdown="1">
<summary>Full working</summary>

A route picks one state in each of the 4 stages after the first, so there are
$4^4 = 256$ routes. Listing them all would mean 256 sums.

Backward recursion keeps **one number per state**: $5 \times 4 = 20$ states, so 20
numbers. The saving grows with the size of the problem — with 10 stages and 10 states per
stage it is $10^9$ routes against 100 numbers.

</details>
</details>
</details>
