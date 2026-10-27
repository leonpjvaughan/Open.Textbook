---
title: "2.1 Networks and their terminology — Practise with help"
chapter: 2
chapter_title: Networks and graphs
section: "2.1"
section_title: Networks and their terminology
tier: O
refs:
- S2
kind: guided-problems
---

# 2.1 Networks and their terminology — Practise with help

## Warm-up: remember

1. How many minutes are in $2\frac{1}{2}$ hours?
2. A map is drawn to a scale of $1 : 50\,000$. What real distance, in kilometres, does
   $4$ cm on the map represent?

<details markdown="1">
<summary>Answers and feedback</summary>

1. $150$ minutes. $2\frac{1}{2} \times 60 = 150$.
2. $4 \times 50\,000 = 200\,000$ cm $= 2$ km. Distances on a network diagram are often
   given directly, but a map scale is the usual way a real network is measured, so this
   is the skill the weights come from.

</details>

:::figure warm-up-gate


## Practise with help

**1.** Write down the degree of each vertex in this list of edges: $AB$, $AC$, $AD$,
$BC$, $CD$.

<details markdown="1">
<summary>Hint</summary>

The degree of a vertex is the number of edges that meet it. Count how many of the five
edges touch each letter.

<details markdown="1">
<summary>Next step</summary>

$A$ is in $AB$, $AC$ and $AD$. $B$ is in $AB$ and $BC$.

<details markdown="1">
<summary>Full working</summary>

- $\deg(A) = 3$ (edges $AB$, $AC$, $AD$)
- $\deg(B) = 2$ (edges $AB$, $BC$)
- $\deg(C) = 3$ (edges $AC$, $BC$, $CD$)
- $\deg(D) = 2$ (edges $AD$, $CD$)

Check with the handshake lemma: $3 + 2 + 3 + 2 = 10 = 2 \times 5$, and there are 5
edges. The check passes.

</details>
</details>
</details>

**2.** A network has degrees $5, 4, 4, 3, 2$. How many edges has it?

<details markdown="1">
<summary>Hint</summary>

Add the degrees, then halve.

<details markdown="1">
<summary>Next step</summary>

$5 + 4 + 4 + 3 + 2 = 18$, so $E = 18 \div 2$.

<details markdown="1">
<summary>Full working</summary>

$$\sum \deg(v) = 18 \qquad E = \frac{18}{2} = 9$$

Here $v$ is a vertex and $E$ is the number of edges.

The network has 9 edges. Notice that the sum came out even, which it must — if you had
got an odd number you would know to look for a miscounted degree.

</details>
</details>
</details>

**3.** A complete network has 12 vertices. How many edges has it?

<details markdown="1">
<summary>Hint</summary>

Every vertex is joined to all the others. Use $E = \dfrac{n(n-1)}{2}$.

<details markdown="1">
<summary>Next step</summary>

$E = \dfrac{12 \times 11}{2}$.

<details markdown="1">
<summary>Full working</summary>

$$E = \frac{12 \times 11}{2} = 66$$

Each vertex has degree $11$, and there are 12 vertices, giving $12 \times 11 = 132$ ends
— which is twice the number of edges. So $132 \div 2 = 66$.

</details>
</details>
</details>

**4.** A network has 28 edges. What is the sum of the degrees of its vertices?

<details markdown="1">
<summary>Hint</summary>

The handshake lemma works in both directions.

<details markdown="1">
<summary>Next step</summary>

$\sum \deg(v) = 2E$.

<details markdown="1">
<summary>Full working</summary>

$$\sum \deg(v) = 2 \times 28 = 56$$

You do not need to know how many vertices there are, or what the individual degrees are.
The sum is fixed by the number of edges.

</details>
</details>
</details>

**5.** A network has 4 vertices. Three of them have degree 3, and the fourth has degree
$k$. Find every possible value of $k$, and explain your reasoning.

<details markdown="1">
<summary>Hint</summary>

The sum of the degrees must be even. What does that force $k$ to be? Then think about
how large a degree a vertex can have in a network with only 4 vertices.

<details markdown="1">
<summary>Next step</summary>

$\sum \deg = 3 + 3 + 3 + k = 9 + k$. For this to be even, $k$ must be odd. The largest
degree possible is 3, since a vertex can join to at most the other three.

<details markdown="1">
<summary>Full working</summary>

$\sum \deg = 9 + k$ must be even, so $k$ is odd. A vertex in a 4-vertex network can
reach at most the other 3, so $k \le 3$. The odd possibilities are $k = 1$ and $k = 3$.

- $k = 3$: all four vertices have degree 3, which is the complete network on 4 vertices,
  with $E = 6$.
- $k = 1$: the three degree-3 vertices are joined to each other, and the fourth has one
  edge to one of them. Then $E = (9+1)/2 = 5$.

Both exist, so $k = 1$ or $k = 3$.

</details>
</details>
</details>

**6.** Explain why a network cannot have exactly one vertex of odd degree. Read that
again — it cannot, and the reason is the same one that rules out three. State the rule
and apply it.

<details markdown="1">
<summary>Hint</summary>

The sum of all the degrees is even. If every odd degree had no partner, what would the
sum be?

<details markdown="1">
<summary>Next step</summary>

An odd number of odd degrees makes the sum odd.

<details markdown="1">
<summary>Full working</summary>

The sum of the degrees is $2E$, which is even. Adding an odd number of odd values always
gives an odd total, whatever the even values are. So the number of vertices of odd degree
must be **even**: $0, 2, 4, \dots$ — never an odd count. One, three, five are all
impossible.

</details>
</details>
</details>

## A question from Chapter 1

**7.** In Chapter 1 a model was defined by what it leaves out. A road map of Ireland
shows every town and every road. The network in this section shows seven places and
seven connections. State one thing the network leaves out that the map shows, and one
question the network can answer that the map makes hard.

<details markdown="1">
<summary>Hint</summary>

Think about what a vertex stands for and what an edge carries.

<details markdown="1">
<summary>Next step</summary>

The network keeps only the connections and one number per connection.

<details markdown="1">
<summary>Full working</summary>

It leaves out position: the network does not say which way round the places are, how far
apart they are on the ground, or where the roads bend. Only the connections and their
weights survive.

What it makes straightforward is a question about *connections* rather than *places*: which set of
roads reaches every town for the least total distance, or whether there is a route at all
between two towns. On a map you would answer those by tracing with your finger; in the
network you answer them by calculation. That is the whole reason for turning the map into
a network.

</details>
</details>
</details>

**8.** A student writes: "Vertex $A$ is joined to $B$ twice, so $\deg(A) = 1$ because it
is still only one neighbour." Say what is wrong and give the correct degree.

<details markdown="1">
<summary>Hint</summary>

The degree counts edges, not neighbours.

<details markdown="1">
<summary>Next step</summary>

How many edge-ends touch $A$?

<details markdown="1">
<summary>Full working</summary>

The degree counts the number of edge **ends** at the vertex, not the number of different
neighbours. Two edges to $B$ are two edge-ends, so $\deg(A)$ includes both, plus every
other edge at $A$.

If $A$ had only the two edges to $B$, then $\deg(A) = 2$, not $1$. The mistake shows up
as an odd sum of degrees, which is the signal that something has been counted wrongly.

</details>
</details>
</details>
