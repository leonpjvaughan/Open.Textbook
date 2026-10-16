---
title: "2.10 Bellman's principle of optimality — Practise with help"
chapter: 2
chapter_title: Networks and graphs
section: "2.10"
section_title: "Bellman's principle of optimality"
tier: O
refs:
- S2
kind: guided-problems
---

# 2.10 Bellman's principle of optimality — Practise with help

## Warm-up: remember

1. On the network of Section 2.9, what is the least cost from $E$ to $F$?
2. What is the least cost from $A$ to $F$, and along which route?

<details markdown="1">
<summary>Answers and feedback</summary>

1. $EF = 1$, so $1$.
2. $8$, along $A \to C \to E \to F$.

</details>

## Practise with help

**1.** State Bellman's principle of optimality.

<details markdown="1">
<summary>Hint</summary>

It is about parts of an optimal route.

<details markdown="1">
<summary>Next step</summary>

What can you say about any section of the best route?

<details markdown="1">
<summary>Full working</summary>

Any part of an optimal route is itself an optimal route between its own two endpoints.

Equivalently: if a route is optimal as a whole, then replacing any section of it with a
cheaper section would produce a cheaper whole, which is impossible. So no section can be
improved.

</details>
</details>
</details>

**2.** The optimal route from $A$ to $F$ is $A \to C \to E \to F$ with cost 8. Is the part
$A \to C$ optimal between $A$ and $C$? Explain.

<details markdown="1">
<summary>Hint</summary>

What other route is there from $A$ to $C$?

<details markdown="1">
<summary>Next step</summary>

The only edges out of $A$ are $AB = 2$ and $AC = 5$, and there is no route from $B$ to
$C$ in this network.

<details markdown="1">
<summary>Full working</summary>

Yes. The only edge from $A$ to $C$ is $AC = 5$, so the part $A \to C$ is trivially the
optimal route between $A$ and $C$.

Bellman's principle guarantees this in general, but here you can also check it directly
because the network is small. Both agree, as they must.

</details>
</details>
</details>

**3.** A route from $A$ to $F$ goes $A \to B \to D \to F$ with cost 12. Is the part
$B \to D \to F$ optimal between $B$ and $F$? Show your working.

<details markdown="1">
<summary>Hint</summary>

Compare $B \to D \to F$ with $B \to E \to F$.

<details markdown="1">
<summary>Next step</summary>

$4 + 6 = 10$ against $7 + 1 = 8$.

<details markdown="1">
<summary>Full working</summary>

No. $B \to D \to F$ costs $4 + 6 = 10$, while $B \to E \to F$ costs $7 + 1 = 8$. So the
part is **not** optimal between $B$ and $F$.

This does not contradict Bellman's principle, because the whole route $A \to B \to D \to
F$ is not optimal — its cost is 12, against the optimal 8. The principle only makes claims
about optimal routes.

</details>
</details>
</details>

**4.** Explain why Bellman's principle is needed for dynamic programming to work.

<details markdown="1">
<summary>Hint</summary>

What does dynamic programming reuse?

<details markdown="1">
<summary>Next step</summary>

The value at a state, whichever larger problem it belongs to.

<details markdown="1">
<summary>Full working</summary>

Dynamic programming solves each state once and reuses its value wherever that state
appears. That is only sound if the value is the same in every context.

Bellman's principle gives exactly that: the least cost from a state to the end depends
only on the state, not on how you reached it. So the value is fixed, and can be computed
once.

Without the principle, the best continuation from a state might depend on the route taken
to reach it, and a single number per state would not be enough — dynamic programming
would be invalid.

</details>
</details>
</details>

**5.** A student says: "Bellman's principle means the greedy method is correct — always
take the best-looking step." Explain the mistake.

<details markdown="1">
<summary>Hint</summary>

The principle is about an optimal route. Does the greedy choice find one?

<details markdown="1">
<summary>Next step</summary>

On the network of Section 2.9, greedy gave 10 and optimal was 8.

<details markdown="1">
<summary>Full working</summary>

The principle says that in an **already optimal** route, every part is optimal. It does
not say that choosing the cheapest step at each stage builds an optimal route.

On the network of Section 2.9, the greedy choice from $A$ is $AB = 2$, leading to a total
of 10, while the optimal total is 8. So the greedy route is not optimal, and the principle
says nothing about its parts.

The difference is direction and knowledge. The principle is used backwards, when the cost
of the rest of the journey is already known. Greedy decides forwards, without that
knowledge.

</details>
</details>
</details>

**6.** On a four-stage network, the optimal route from stage 1 to stage 4 is
$P \to Q \to S \to U$ with cost 8. A second route $P \to Q \to T \to U$ also costs 8.
Does this break Bellman's principle?

<details markdown="1">
<summary>Hint</summary>

Does the principle say the optimal route is unique?

<details markdown="1">
<summary>Next step</summary>

It says parts of an optimal route are optimal — not that there is only one.

<details markdown="1">
<summary>Full working</summary>

No. The principle says that every part of an optimal route is optimal between its own
endpoints. It does not say there is only one optimal route.

Both routes are optimal, and both have the same cost 8. The part $Q \to S \to U$ costs
$3 + 4 = 7$, and the part $Q \to T \to U$ costs $6 + 1 = 7$: both are optimal between $Q$
and $U$, because they tie. Ties are allowed.

When values tie, a dynamic programming table records the best *value*; there may be more
than one route achieving it.

</details>
</details>
</details>

## A question from Section 2.9

**7.** In the backward recursion, the value at each state is computed from the values of
the states one stage later. Explain how this uses Bellman's principle.

<details markdown="1">
<summary>Hint</summary>

The value at a state is the cost of the best continuation.

<details markdown="1">
<summary>Next step</summary>

The continuation begins with one edge, then an optimal route from the next state.

<details markdown="1">
<summary>Full working</summary>

The best continuation from a state starts with one edge to some state in the next stage,
and then continues optimally from there. By Bellman's principle, that continuation is
itself an optimal route from the next state — so its cost is exactly the value already
computed for that state.

So the value at a state is

$$\text{value(state)} = \min_{\text{edges}} \left( \text{edge cost} + \text{value(next state)} \right)$$

which is the recursion. Bellman's principle is what makes the "value(next state)" term the
right thing to add: it is the cost of the best continuation, guaranteed.

</details>
</details>
</details>

**8.** A network has one stage with a single state, and the cost to the end is 0. Explain
why the recursion has to start there, using Bellman's principle.

<details markdown="1">
<summary>Hint</summary>

What is the optimal route from the destination to itself?

<details markdown="1">
<summary>Next step</summary>

There is nothing to decide.

<details markdown="1">
<summary>Full working</summary>

At the last stage the route is already finished, so the optimal route from that state to
the end is the empty route, of cost 0. There is no decision and no dependence on any
other state.

That is the only place where the value is known without using Bellman's principle. Every
other value is computed *from* the values one stage later, using the principle to justify
adding "the cost of the best continuation". So the recursion must start where the value is
known directly — at the end — and work backwards.

</details>
</details>
</details>
