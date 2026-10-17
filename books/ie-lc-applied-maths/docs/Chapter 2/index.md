---
title: 'Chapter 2: Networks and graphs'
chapter: 2
strand: networks
---

# Chapter 2: Networks and graphs

A network is a set of places and the connections between them. It is the simplest
useful model in applied mathematics: it throws away everything about the places except
how they are joined, and keeps just enough to answer real questions about routes, cables
and deliveries.

## The chapter problem

**Wiring the new building.** A new building has seven rooms. Cable has to reach every
room, and the cost of the job is the total length of cable you lay. Separately, a
delivery van has to travel between two of the rooms by the shortest possible route, and
the roads between them are not all the same length.

Two different questions, one diagram. Connecting every room as cheaply as possible and
finding the shortest route between two rooms are **not the same problem**, and the
answer to one is not usually the answer to the other.

By the end of the chapter you can draw the network, find a cheapest set of cables, find
a shortest route, and say which algorithm answers which question.

## By the end of this chapter you can

- describe a network in its own vocabulary — vertex, edge, weight, degree, path, cycle,
  tree — and use that vocabulary precisely;
- tell a connected network from a disconnected one, and a directed network from an
  undirected one;
- write a network as an adjacency matrix and read the network back out of it;
- multiply matrices and explain what a power of an adjacency matrix counts;
- find a minimum spanning tree using Kruskal's algorithm and Prim's algorithm;
- find a shortest path using Dijkstra's algorithm;
- solve a multi-stage problem by dynamic programming and explain Bellman's principle of
  optimality;
- choose between the algorithms and say why the choice matters.

## Where it is used

Road and rail networks, broadband and utility cabling, delivery and postal routes,
circuit design, project scheduling and social networks. Every navigation app on a phone
is running a shortest-path algorithm on a weighted network.

## Your turn to connect it

Somewhere in your day a route is chosen for you — a bus that takes a particular way, a
delivery that reaches your area on a particular day, a signal that reaches your house by
one cable rather than another.

Choose one. Write down the places involved and what connects them, and what "shortest"
or "cheapest" would mean in that case: distance, time, money, or something else. You
will be able to answer the question properly by the end of the chapter.

:::figure relevance-prompt

## Sections

- **2.1 Networks and their terminology** — vertices, edges, weights and degree
- **2.2 Connected, disconnected, directed and undirected graphs** — what the shape of a network tells you
- **2.3 Representing a network: adjacency matrices** — the same network as a table of numbers
- **2.4 Matrix algebra and the product of adjacency matrices** — what matrix multiplication counts
- **2.5 Trees and spanning trees** — the cheapest shape that reaches everything
- **2.6 Minimum spanning trees: Kruskal's algorithm** — cheapest edges first
- **2.7 Minimum spanning trees: Prim's algorithm** — grow outwards from one vertex
- **2.8 Shortest paths and Dijkstra's algorithm** — the shortest route between two places
- **2.9 Multi-stage problems and dynamic programming** — decisions in a sequence
- **2.10 Bellman's principle of optimality** — why the greedy step is allowed
- **2.11 Comparing the algorithms and choosing one** — which question, which method
