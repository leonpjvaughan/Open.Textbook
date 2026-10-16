---
title: 'Chapter 2: Review'
chapter: 2
kind: review
---

# Chapter 2: Review

## The chapter problem, solved

**Wiring the new building.** Seven rooms, a list of possible cable runs each with a
length, and a van that has to travel between two of them by the shortest route. Two
questions, one diagram.

**The cheapest cabling.** A set of cables that reaches every room with no redundant loop
is a spanning tree, and every spanning tree on 7 rooms has $7 - 1 = 6$ cables. The
question is which 6, and that is Kruskal's or Prim's algorithm.

Run Kruskal: sort the cable runs by length, take each one unless it would close a loop,
and stop at 6. The total length is the least possible. Run Prim from any room and you
should get the same total — if the two disagree, one run has an arithmetic mistake in it,
and finding it is worth the two minutes.

**The shortest van route.** This is a different question. Use Dijkstra's algorithm from
the room the van leaves. Settle the nearest unsettled room, update its neighbours'
tentative distances, and repeat until the destination is settled. Trace the route back by
following the updates.

**Why the two answers differ.** The spanning tree connects *every* room for the least
total; the shortest path connects *two* rooms for the least total. The cheapest set of
cables need not contain the shortest route between any particular pair of rooms, and the
shortest route is not a set of cables at all — it is a single chain of them. The two
totals may happen to be equal on a small network, and that is a coincidence, not a rule.

**And if the building were laid out in zones**, with the van visiting one room in each
zone in turn, that would be a third question. It is a staged network, and backward
recursion answers it: start at the last zone, write the cost from each room to the finish,
and work back one zone at a time. Dijkstra would give the same answer; backward recursion
does less work because it uses the zones.

## Mixed practice — choose the method first

Work through these without notes. For each one, decide **which kind of problem it is** and
say why, *before* you calculate anything. Two of them are deliberately questions you
should refuse to answer with the algorithm that first comes to mind.

1. A network has vertices $A, B, C, D$ and edges $AB = 3$, $AC = 7$, $BC = 2$, $BD = 5$,
   $CD = 4$. Find the minimum spanning tree and its total weight.
2. For the same network, find the shortest distance from $A$ to $D$ and name the route.
3. For the same network, how many walks of length 2 are there from $A$ to $D$? Write the
   adjacency matrix first.
4. A network has degrees $4, 4, 3, 3, 2, 2$. How many edges has it, and how many
   odd-degree vertices? Does it have an Eulerian trail?
5. A network has 9 vertices and 12 edges. How many edges must be removed to leave a
   spanning tree, and what must be true of each edge removed?
6. A staged network has stages $A$; $B, C$; $D, E$; $F$ with edges $AB = 6$, $AC = 3$,
   $BD = 1$, $BE = 9$, $CD = 4$, $CE = 2$, $DF = 5$, $EF = 7$. Find the least total cost
   from $A$ to $F$ by backward recursion, and write down the route.
7. A network has a directed edge of weight $-2$ and a question asks for the shortest path.
   State which algorithm you would normally use, and why you cannot use it here.
8. A complete network has 6 vertices. How many edges has it, and how many spanning trees?
9. A network is stored as an adjacency matrix. Explain how to find the out-degree of a
   vertex, the in-degree, and whether the network is directed.
10. A council must connect 12 villages by road for the least total length, and separately
    must find the shortest route from the depot to the hospital. Explain why these are two
    different problems and name the algorithm for each.

## What you can now do

- describe a network precisely — vertex, edge, weight, degree, path, cycle, tree;
- use the handshake lemma, and use the parity of the degree sum to show a network cannot
  exist;
- tell a connected network from a disconnected one, and a directed network from an
  undirected one;
- write a network as an adjacency matrix and read it back, including in-degree and
  out-degree;
- multiply matrices, and use a power of an adjacency matrix to count walks;
- find a minimum spanning tree by Kruskal's algorithm and by Prim's algorithm, and say why
  each is correct;
- find a shortest path by Dijkstra's algorithm, and say why it needs non-negative weights;
- solve a multi-stage problem by backward recursion, and state Bellman's principle;
- choose the right algorithm for a question, and say why the others do not answer it.

## Thinking back

Look at the route you chose at the start of the chapter — the bus that takes a particular
way, the delivery that reaches your area on a particular day, the signal that reaches your
house by one cable rather than another.

You can now model it. Draw the places as vertices and the connections as edges, and put a
number on each edge — distance, or time, or cost, whichever the question is really about.
Then decide which question you are asking. Is it "how do I connect everything cheaply", or
"how do I get from here to there cheaply"? They are different, and the answer to one is
not the answer to the other.

Write down which algorithm you would use and why. If your model is rough — you are not
sure of the numbers, or of which connections exist — that is worth writing down too.
Deciding what to leave out is what makes a model useful, and saying what you left out is
part of the applied mathematics, not an apology for it. It is also exactly what the
modelling project asks you to do.
