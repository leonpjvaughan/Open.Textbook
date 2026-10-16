---
title: 20.10 Constructing a proof — Learn
chapter: 20
chapter_title: Synthetic geometry, constructions and proof
section: '20.10'
section_title: Constructing a proof
tier: O
refs:
- GT.3
kind: walkthrough
---

# 20.10 Constructing a proof — Learn

**Prerequisites:** the theorems and tests from Sections 20.3 to 20.8.

**Objectives:** separate the given from what is to be proved; plan a proof; write
each step with its reason; use a congruence test to reach a conclusion.

By the end of this section you can build a proof of your own, and you can see
which result each step uses.

## What a proof is

A **proof** is a chain of reasoning from what is given to what is claimed. Every
step follows from an axiom, a definition, or a theorem already proved. Each step
names its reason.

A list of steps with no reasons is not a proof. It may be a correct calculation,
but it does not show why the answer must be true.

## Step 1: separate the given from the goal

Read the question twice. Write down two things before anything else.

- **Given:** what you are told. This is the hypothesis.
- **To prove:** what you must show. This is the conclusion.

**Example 1.** A question says: "In the triangle $ABC$, $|AB|=|AC|$. Prove that
$|\angle B|=|\angle C|$." Write down the given and the goal.

**Given:** triangle $ABC$ with $|AB|=|AC|$.

**To prove:** $|\angle B|=|\angle C|$.

The given is the hypothesis. The goal is the conclusion. Every proof starts by
separating the two.

## Step 2: draw the figure

Draw the figure and mark on it everything you are given. Equal sides get the same
mark. Equal angles get the same mark. If two lines are parallel, mark the arrows.
If there is a right angle, mark the square.

The figure is a guide, not a proof. It shows you one case. The proof must work for
every case, so every claim still needs a reason.

## Step 3: find the bridge

Look for a connection between the given and the goal. The bridges in this chapter
are:

- a pair of **congruent triangles**, with a test;
- a pair of **similar triangles**, with the AA test;
- an **angle fact**, such as alternate angles or the triangle angle sum;
- the **isosceles theorem** or its converse;
- **Pythagoras' theorem** or its converse.

**Example 2.** You must prove that the diagonals of a parallelogram bisect one
another. Write the first step of a plan and name the test you expect to use.

First draw one diagonal, so that the two triangles share it, and mark the
alternate angles made by the parallel sides.

The two triangles have two pairs of equal angles and the equal opposite sides of
the parallelogram, so **ASA** is the test. The matching sides then give the two
halves of each diagonal as equal.

## Step 4: write each step with its reason

Write one step on each line. After each step, say why it follows. Use the
theorems by name.

**Example 3.** Write a proof that the base angles of an isosceles triangle are
equal.

Let $ABC$ have $|AB|=|AC|$.

1. $|AB|=|AC|$ — given.
2. $|AC|=|AB|$ — the same fact, the other way round.
3. The angle at $A$ is common to both triangles — the same angle.
4. Triangle $ABC$ is congruent to triangle $ACB$ — SAS, from steps 1, 2 and 3.
5. $|\angle B|=|\angle C|$ — matching angles in congruent triangles are equal.

The proof ends with the goal. Step 5 is the conclusion.

## Step 5: check the reasoning

Read the proof back and ask two questions.

- Does every step have a reason?
- Does the reason apply here?

If a step has no reason, the proof has a gap. If a reason does not apply, the
proof is wrong.

**Example 4.** A proof contains the line: "therefore
$|\angle ABC|=|\angle DAB|$." Which theorem is the reason?

The reason is the **alternate angles theorem**. The line through $A$ is parallel
to $BC$, and $AB$ is a transversal of the two parallel lines, so the alternate
angles are equal.

## Working with algebra inside a proof

Sometimes a proof reaches an equation. Solve it and keep going.

**Example 5.** A proof reaches the equation $55+65+x=180$. Work out $x$.

$$55+65=120 \qquad 180-120=60$$

So $x=60°$. The arithmetic is one step in the proof; the reason for it is the
triangle angle sum.

## A proof from start to finish

**Example 6.** Prove that each exterior angle of a triangle equals the sum of the
two interior opposite angles.

Let $\alpha$ be the exterior angle at $A$.

1. $|\alpha|+|\angle A|=180°$ — the two angles lie on a straight line.
2. $|\angle B|+|\angle C|+|\angle A|=180°$ — the triangle angle sum.
3. $|\alpha|=|\angle B|+|\angle C|$ — subtract $|\angle A|$ from both 180° sums.

The exterior angle equals the sum of the two interior opposite angles.

> **Watch out.** A proof is not the same as a calculation. Finding the right
> answer does not prove a general result. If the question says "prove", you must
> start from the given information and reach the goal with reasons. A diagram
> shows one case, so "you can see it" is never a reason.

## Progress check

Back to the chapter problem. You have now seen every step of the proof that the
angles of a triangle add to 180°.

Put the steps in the right order, and give each one a reason: (a) the three angles
at $A$ lie on a straight line, so they add to 180°; (b) draw the line through $A$
parallel to $BC$; (c) the alternate angles give the angle at $B$ equal to one
angle at $A$; (d) the alternate angles give the angle at $C$ equal to the other
angle at $A$.

Compare your order with the proof in Section 20.3, and with the proof you wrote in
the Progress check there.

## You should now be able to

- separate the given from what is to be proved;
- draw a figure and mark what you know;
- choose a bridge: congruence, similarity, or an angle fact;
- write each step of a proof with its reason;
- check a proof for a missing or misapplied reason.
