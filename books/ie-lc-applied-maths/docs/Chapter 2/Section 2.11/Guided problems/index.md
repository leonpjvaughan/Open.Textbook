---
title: "2.11 Comparing the algorithms and choosing one — Practise with help"
chapter: 2
chapter_title: Networks and graphs
section: "2.11"
section_title: "Comparing the algorithms and choosing one"
tier: H
refs:
- S2
kind: guided-problems
---

# 2.11 Comparing the algorithms and choosing one — Practise with help

## Warm-up: remember

1. What does a minimum spanning tree connect?
2. What does a shortest path connect?
3. Which algorithm needs non-negative weights?

<details markdown="1">
<summary>Answers and feedback</summary>

1. Every vertex, for the least total weight.
2. Two vertices, for the least total weight.
3. Dijkstra's algorithm.

</details>

:::figure warm-up-gate


## Practise with help

**1.** A council wants to connect every village to the water supply for the least total
length of pipe. Which algorithm, and why?

<details markdown="1">
<summary>Hint</summary>

Does the answer have to touch every village?

<details markdown="1">
<summary>Next step</summary>

Every village must be connected.

<details markdown="1">
<summary>Full working</summary>

It is a **minimum spanning tree**: the cheapest set of connections reaching every village.
Use Kruskal's or Prim's algorithm.

Not Dijkstra — Dijkstra finds the shortest route between two places, and the council does
not want a route, it wants every village connected.

</details>
</details>
</details>

**2.** A courier wants the shortest route from the depot to one customer. Which algorithm?

<details markdown="1">
<summary>Hint</summary>

Does the answer have to touch every address?

<details markdown="1">
<summary>Next step</summary>

Only two places matter: the depot and the customer.

<details markdown="1">
<summary>Full working</summary>

It is a **shortest path**: use Dijkstra's algorithm from the depot. Stop when the customer
is settled.

Not Kruskal — the courier does not need every address connected, only the cheapest route
between two of them.

</details>
</details>
</details>

**3.** A network has 200 vertices and 250 edges. Which spanning-tree algorithm is likely
to be lighter, and why?

<details markdown="1">
<summary>Hint</summary>

Compare the number of edges with the number of vertices.

<details markdown="1">
<summary>Next step</summary>

250 edges against 200 vertices is sparse.

<details markdown="1">
<summary>Full working</summary>

The network is **sparse**: 250 edges is not much more than 200 vertices, so most vertices
have few connections. Kruskal's algorithm sorts 250 edges, which is small, and Prim scans
200 rows with few entries each.

Either is fine, and Kruskal is the natural choice for showing working, because the sorted
list is short and quick to write out.

</details>
</details>
</details>

**4.** A network has 200 vertices and 15,000 edges. Which is likely to be lighter?

<details markdown="1">
<summary>Hint</summary>

15,000 edges is a lot for 200 vertices.

<details markdown="1">
<summary>Next step</summary>

Almost every pair of vertices is joined — a dense network.

<details markdown="1">
<summary>Full working</summary>

Prim's algorithm. With 200 vertices, the maximum possible number of edges is
$200 \times 199 / 2 = 19{,}900$, so 15,000 is close to complete — a dense network.

Kruskal would sort all 15,000 edges. Prim adds 200 vertices and scans a row of about 200
entries each time, which is far less work. On a dense network Prim is usually the better
choice.

</details>
</details>
</details>

**5.** Explain why Dijkstra's algorithm cannot be used to find a minimum spanning tree.

<details markdown="1">
<summary>Hint</summary>

Which edges does Dijkstra never look at?

<details markdown="1">
<summary>Next step</summary>

Edges joining two already-settled vertices.

<details markdown="1">
<summary>Full working</summary>

Dijkstra settles vertices in order of distance from the start, and only ever relaxes edges
from a newly settled vertex to unsettled neighbours. An edge joining two vertices that are
**both already settled** is never considered.

But a spanning tree is made of exactly such edges: it connects vertices that are already
reachable to each other, without cycles. So the structure Dijkstra builds is a
shortest-path tree, not a minimum spanning tree, and its total weight is generally larger
than the minimum spanning tree's.

</details>
</details>
</details>

**6.** A question says: "Find the cheapest way to connect all six towns." A student runs
Dijkstra's algorithm from one town. Explain what is wrong.

<details markdown="1">
<summary>Hint</summary>

What is the question asking for?

<details markdown="1">
<summary>Next step</summary>

Every town connected, not a route to one town.

<details markdown="1">
<summary>Full working</summary>

"Connect all six towns" is a minimum spanning tree question, so the right method is
Kruskal's or Prim's algorithm.

Running Dijkstra from one town finds the shortest route from that town to each other town.
Those routes together are not a spanning tree — they may share edges, they may contain
cycles, and their total weight is not the least cost of connecting the towns.

The student has answered "how do I get from here to each town" when the question asked
"how do I connect everything".

</details>
</details>
</details>

## A question from Section 2.10

**7.** A staged network is also a network, so Dijkstra's algorithm would work on it.
Explain why backward recursion is preferred for a staged network.

<details markdown="1">
<summary>Hint</summary>

What does the stage structure tell you?

<details markdown="1">
<summary>Next step</summary>

Which vertices to consider next, and in what order.

<details markdown="1">
<summary>Full working</summary>

Both give the correct shortest distance. Backward recursion is preferred because it uses
the stage structure: it knows that every route visits exactly one vertex per stage, so it
can fill in the values stage by stage instead of settling vertices one at a time.

That means it never has to search for the nearest unsettled vertex, and it computes each
state's value once from the stage after it. On a large staged network that is less work
than Dijkstra.

Dijkstra would also have to be able to handle the whole network as one graph, ignoring
the stages — more work for the same answer.

</details>
</details>
</details>

**8.** A question gives a network with one edge of weight $-3$ and asks for the shortest
path. Explain why Dijkstra's algorithm should not be used, and what the negative weight
would do.

<details markdown="1">
<summary>Hint</summary>

The algorithm settles the nearest vertex because going further always costs more.

<details markdown="1">
<summary>Next step</summary>

With a negative weight, can a longer-looking route become cheaper?

<details markdown="1">
<summary>Full working</summary>

Dijkstra's algorithm settles the nearest unsettled vertex on the argument that any other
route would pass through a vertex at least as far away, and every extra edge adds more
cost. A negative edge breaks that argument: a route could go to a vertex that looks far
away, take the $-3$ edge, and arrive cheaper than the vertex already settled.

So the settled distance could be wrong, and the algorithm's guarantee fails. Dijkstra's
algorithm should not be used.

(Networks with negative weights need a different method — Bellman and Ford's algorithm,
which is not on this course. The important thing here is to recognise that the condition
is required, and to say so.)

</details>
</details>
</details>
