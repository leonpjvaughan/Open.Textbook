---
title: 15.8 Writing a formal proof — Learn
chapter: 15
chapter_title: 'Synthetic geometry: foundations'
section: '15.8'
section_title: Writing a formal proof
tier: O
refs:
- '2.1'
kind: walkthrough
---

# 15.8 Writing a formal proof — Learn

**Prerequisites:** all of Sections 15.1 to 15.7.

**Objectives:** set out a proof in the standard form; give a reason for every line; use
the symbols of geometry correctly.

By the end of this section you can write a proof that another person can follow, line by
line, without asking you what you meant.

## The shape of a proof

A formal proof has four parts, and they always come in the same order.

| Part | What it holds |
|---|---|
| **Given** | the facts you start with, written down |
| **To prove** | the single statement you are going to reach |
| **Construction** | any line, point or arc you add to the figure |
| **Proof** | the chain of statements, each with a reason |

The **Construction** part is the one students leave out. If your proof draws a line, that
line has to be announced first. A reader who cannot see the drawing still has to be able
to follow the argument.

## The symbols

Geometry has its own shorthand. Use it, but write the words as well when the reason is
new.

| Symbol | Meaning |
|---|---|
| $[AB]$ | the segment from $A$ to $B$ |
| $AB$ | the line through $A$ and $B$ |
| $\lvert AB \rvert$ | the distance from $A$ to $B$ |
| $\lvert \angle ABC \rvert$ | the measure of the angle at $B$ |
| $\triangle ABC$ | the triangle with vertices $A$, $B$ and $C$ |
| $\cong$ | is congruent to |
| $\parallel$ | is parallel to |
| $\perp$ | is perpendicular to |
| $\Rightarrow$ | implies |
| $\therefore$ | therefore |
| $\blacksquare$ | the proof is finished |

## Every line needs a reason

The rule is simple and it is the whole of this section: **each line of a proof carries a
reason**. The reason names an axiom, a theorem, a definition, or a fact from the Given.

A reason that repeats the statement is not a reason. "The angles are equal because they
are equal" says nothing. "The angles are equal because they are vertically opposite" names
the theorem.

Here is a good line and a poor one, side by side.

- $|\angle ABC| = |\angle DAB|$. **[Alternate angles, Theorem 3 part 2]** — a reason.
- $|\angle ABC| = |\angle DAB|$. **[The angles are equal]** — not a reason.

## Worked example 1: the angle sum

Write the proof that the angles of a triangle add to $180^\circ$ in formal form.

**Given:** the triangle $\triangle ABC$.

**To prove:** $|\angle ABC| + |\angle BCA| + |\angle CAB| = 180^\circ$.

**Construction:** Draw the line through $A$ parallel to $BC$. Name its two ends $D$ and
$E$, with $D$ on the opposite side of $AB$ from $C$, and $E$ on the opposite side of $AC$
from $B$.

**Proof.**

1. $DE \parallel BC$. [Construction]
2. $|\angle ABC| = |\angle DAB|$. [Alternate angles, Theorem 3 part 2, with $AB$ as
   transversal]
3. $|\angle BCA| = |\angle CAE|$. [Alternate angles, Theorem 3 part 2, with $AC$ as
   transversal]
4. $|\angle DAB| + |\angle BAC| + |\angle CAE| = 180^\circ$. [The three angles make the
   straight angle $\angle DAE$; Protractor Axiom]
5. $|\angle ABC| + |\angle BAC| + |\angle BCA| = 180^\circ$. [Substitute lines 2 and 3
   into line 4] $\blacksquare$

## Worked example 2: vertically opposite angles

**Given:** two lines crossing at a point $O$. Name the four angles around $O$ as $a$, $b$,
$c$ and $d$, in order.

**To prove:** $a = c$ and $b = d$.

**Proof.**

1. $a + b = 180^\circ$. [Angles on a straight line]
2. $c + b = 180^\circ$. [Angles on a straight line]
3. $a + b = c + b$. [Both totals are $180^\circ$]
4. $a = c$. [Subtract $b$ from both sides]
5. $b = d$. [The same argument, with $a$ and $c$ in place of $b$ and $d$] $\blacksquare$

## Worked example 3: the isosceles triangle

**Given:** the triangle $\triangle ABC$ with $|AB| = |AC|$.

**To prove:** $|\angle ABC| = |\angle ACB|$.

**Proof.**

1. $|AB| = |AC|$. [Given]
2. $|AC| = |AB|$. [The same two sides, written the other way round]
3. $|\angle BAC| = |\angle CAB|$. [The same angle]
4. $\triangle ABC \cong \triangle ACB$. [SAS, from lines 1, 2 and 3]
5. $|\angle ABC| = |\angle ACB|$. [Matching angles of congruent triangles] $\blacksquare$

Notice how short the proof is. The work is in choosing what to compare, and in giving the
reason for each line.

## Worked example 4: a reason you must not use

A student writes this proof that a triangle is isosceles.

**Given:** the triangle $\triangle ABC$.
**To prove:** $|AB| = |AC|$.
**Proof.** $|\angle ABC| = |\angle ACB|$, because the diagram looks symmetrical.
Therefore the triangle is isosceles.

Find the fault.

The fault is in the reason. "The diagram looks symmetrical" is not a reason. A diagram is
a sketch, and it can be misleading. The proof is only valid if the equality of the two
angles is in the **Given**, or is itself proved.

Here is the same proof with the fact supplied.

**Given:** the triangle $\triangle ABC$, with $|\angle ABC| = |\angle ACB|$.
**To prove:** $|AB| = |AC|$.
**Proof.** $|\angle ABC| = |\angle ACB|$ by the Given, so $|AB| = |AC|$ by Theorem 2 part 2.

> **Watch out.** Two things go wrong most often. The first is a reason that repeats the
> statement instead of naming a theorem. The second is using a fact that is only visible
> in the diagram, such as two lines that look parallel or two sides that look equal. A
> fact from the diagram is not given.
>
> **Re-check:** read your proof one line at a time, and ask "why?" after each line. If the
> answer is a theorem, an axiom, a definition or a fact from the Given, the line is
> allowed. If the answer is "because it looks like that", the line is not proved.

## Progress check

Back to the chapter problem. Write the glazier's proof in full formal form.

**Given:** the triangle $\triangle ABC$, with $|\angle A| = 65^\circ$ and
$|\angle B| = 48^\circ$.

**To prove:** $|\angle A| + |\angle B| + |\angle C| = 180^\circ$, and $|\angle C| = 67^\circ$.

Write out the four parts: Given, To prove, Construction, Proof. Give a reason for every
line. Then say which axiom and which theorem the proof rests on, which is the sentence the
chapter problem asked you to be able to say.

## You should now be able to

- set out a proof with Given, To prove, Construction and Proof;
- read and write the symbols for segment, line, distance, angle, congruence and parallel;
- give a reason for every line, naming an axiom, a theorem, a definition or a Given fact;
- write the angle sum proof, the vertically opposite proof and the isosceles proof in
  formal form;
- spot a reason that repeats the statement, and a fact taken from the diagram.
