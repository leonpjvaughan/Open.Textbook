---
title: 'Chapter 10: Vectors'
chapter: 10
strand: pure
anchor: Can the drone reach the stranded walker?
---

# Chapter 10: Vectors

## The chapter problem: can the drone reach the stranded walker?

A mountain rescue team sends a supply drone to a walker on the hills. The rescue
base is the origin $O$ of a map grid. One grid unit stands for one kilometre.
East is the direction of $\mathbf{i}$ and north is the direction of
$\mathbf{j}$.

The walker is at the position

$$
\mathbf{w} = 13\mathbf{i} + 7\mathbf{j}.
$$

The drone waits on a pad at the position

$$
\mathbf{p} = 2\mathbf{i} + \mathbf{j}.
$$

The controller uploads two legs for the flight:

$$
\mathbf{u} = 3\mathbf{i} + 4\mathbf{j}
\qquad \text{and} \qquad
\mathbf{v} = 4\mathbf{i} - 3\mathbf{j}.
$$

During the flight a steady wind pushes the drone off course. Over the whole
flight the wind adds a drift

$$
\mathbf{d} = \mathbf{i} + \mathbf{j}.
$$

By the end of the chapter you will answer all of this exactly. You will add the
two legs and the drift to the starting position, and find where the drone really
finishes. You will work out how far the drone lands from the walker, and in
which direction the walker lies from that landing point. You will also find the
thrust the drone needs to hover against the wind.

> **First contact — no working needed yet.** Draw rough axes from $0$ to $14$ in
> both directions. Mark the pad and the walker. Then follow the two legs and the
> drift with your finger: across and up, across and down, then the wind. Predict
> whether the drone finishes north, south, east or west of the walker. Write one
> sentence to say whether you think the drone reaches the walker.

<details markdown="1">
<summary>If you are not sure where to start</summary>

Start at the pad $(2, 1)$. The first leg moves $3$ units east and $4$ units
north. The second leg moves $4$ units east and $3$ units south. The wind moves
the drone $1$ unit east and $1$ unit north.

Join the end of all three movements to the pad with one straight line. That
straight line is the drone's overall change of position. Compare its end with
the walker at $(13, 7)$.
</details>

## By the end of this chapter you will be able to

- explain what a vector is, and write one in column form and in
  $\mathbf{i}$, $\mathbf{j}$, $\mathbf{k}$ form;
- use vectors in two dimensions and in three dimensions;
- find the magnitude and the direction of a vector;
- convert between component form and magnitude/direction form;
- add vectors and multiply a vector by a scalar, and say what each means on a
  diagram;
- use position vectors, and find the distance between two points;
- prove a geometrical fact with vectors, such as three points being collinear;
- use vectors to solve problems with forces and with motion.

## Where it is used

A vector carries a size and a direction at the same time. That is exactly what a
force, a velocity and a displacement need, so vectors are the language of
mechanics. In pure mathematics they prove facts about shapes without a diagram
for every case. Later you will meet them again in the study of motion, in
projectiles and in the geometry of three dimensions. The same idea also drives
computer graphics, navigation systems and the physics of fields.

## Your turn to connect it

Think of a journey that has more than one stage, and something that pushes you
along the way. It could be a boat crossing a river with a current, a plane
flying with a crosswind, or a swimmer heading for the far bank. Write down the
stages and the push as arrows, and say which direction the overall journey
takes. Keep your answer for the Review.

:::figure relevance-prompt

## Roadmap

1. [10.1 Vectors in two and three dimensions](Section 10.1/Walkthrough/index.md)
2. [10.2 Magnitude and direction; component and magnitude/direction form](Section 10.2/Walkthrough/index.md)
3. [10.3 Vector addition and scalar multiplication](Section 10.3/Walkthrough/index.md)
4. [10.4 Position vectors and the distance between two points](Section 10.4/Walkthrough/index.md)
5. [10.5 Vectors in pure mathematics and in context](Section 10.5/Walkthrough/index.md)
6. [Review](Review/index.md)
