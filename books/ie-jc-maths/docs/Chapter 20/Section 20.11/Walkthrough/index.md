---
title: 20.11 Evaluating someone else's proof — Learn
chapter: 20
chapter_title: Synthetic geometry, constructions and proof
section: '20.11'
section_title: Evaluating someone else's proof
tier: O
refs:
- GT.3
kind: walkthrough
---

# 20.11 Evaluating someone else's proof — Learn

**Prerequisites:** the theorems and tests from Sections 20.3 to 20.10, and the
idea of a converse from Section 20.1.

**Objectives:** read a proof critically; spot a gap, a circle or a wrong reason;
test a general claim with a counterexample.

By the end of this section you can judge whether a proof is sound, and you can
say exactly what is wrong when it is not.

## A proof can reach the right answer and still be wrong

A correct answer is not the same as a proof. A proof shows that the answer must be
true, for every case. It can fail in several ways, and this section names them.

Use this checklist on any proof you read.

- Does it separate the given from the goal?
- Does every step have a reason?
- Does each reason apply to this step?
- Does it use only results already proved?
- Does it use a converse as if it were the theorem?
- Does it rely on the diagram instead of a reason?
- Does it reach the goal at the end?

## Circular reasoning

A proof is **circular** when it uses the result it is meant to prove. The argument
goes round in a circle and proves nothing.

**Example 1.** A proof of the triangle angle sum begins: "the angles add to 180°
because the angles in a triangle add to 180°."

This is circular. The proof assumes the very result it is meant to show. A proof
must start from the axioms and from results already proved. Using the conclusion
as a reason is not allowed.

## A missing reason

Sometimes a proof gives the steps and leaves out the reason. The step may be
correct, but the proof has a gap.

**Example 2.** A proof contains: "the line through $A$ is parallel to $BC$,
therefore $|\angle ABC|=|\angle DAB|$."

Is the step justified? **Yes.** The two lines are parallel and $AB$ is a
transversal, so the alternate angles are equal by the alternate angles theorem.
The step names a real reason and uses it correctly.

**Example 3.** A proof of the triangle angle sum draws the parallel line, uses the
alternate angles, and concludes that the three angles add to 180°. Which step is
missing?

The step that the three angles at $A$ lie on a straight line, so they add to 180°.
Without it, the proof has moved the angles to $A$ but has not shown that their sum
is 180°.

## Relying on the diagram

A diagram shows one case, drawn one way. A proof must hold for every case.

**Example 4.** A proof says: "from the diagram you can see the two angles are
equal."

This is not a proof. The equality has to follow from an axiom or a theorem, not
from how the picture happens to be drawn. A different triangle would be drawn
differently, and the proof would say nothing about it.

## Using a converse without proof

A converse is a separate statement. It can be false even when the theorem is true,
as Section 20.1 showed.

**Example 5.** A proof uses the converse of a theorem as if it were the theorem
itself. Why is this a problem?

A converse is a separate statement, so using it without proof leaves a gap. A
converse may be used only when it has itself been stated and proved, as the
converses of the isosceles theorem and of Pythagoras have been in this chapter.

## Arithmetic and completeness

A proof can have correct arithmetic and still miss the point.

**Example 6.** A proof writes $65+72+x=180$, and works out $x$.

$$65+72=137 \qquad 180-137=43$$

So $x=43°$. The arithmetic is right. But the proof has not shown **why** the three
angles add to 180°. It has used the triangle angle sum without proving it. If the
result is the one being proved, that is a gap.

**Example 7.** A proof of the isosceles theorem says: "triangle $ABC$ is congruent
to triangle $ACB$ by SAS." What else must the proof state before this step is
complete?

The step is incomplete on its own. The proof must state the two pairs of equal
sides, $|AB|=|AC|$ and $|AC|=|AB|$, and it must state that the angle at $A$ is the
included angle, common to both triangles. SAS needs two sides and the angle
between them.

## Testing a general claim

A claim about every case is disproved by one **counterexample**, one case where it
fails.

**Example 8.** A student claims: "if a number is divisible by 3, then it is
divisible by 6." Test the number 9.

$$9\div3=3$$

So 9 is divisible by 3. But $9\div6$ leaves a remainder of 3, so 9 is not divisible
by 6. The claim is false, and 9 is a counterexample. One counterexample is enough
to disprove a general claim.

> **Watch out.** Do not confuse "the answer is right" with "the proof is right". A
> proof can reach a true conclusion from a false reason by accident. Check the
> reason at every step, and check that the reason applies here. When a claim says
> "for all" or "always", look for one counterexample before you try to prove it.

## Progress check

Back to the chapter problem. Here is a short argument:

"The angles of a triangle add to 180°, because you can tear off the corners and
place them on a straight line."

Is this a proof? Write two sentences saying what is good about it and what is
missing. Then compare it with the proof in Section 20.3.

## You should now be able to

- use a checklist to read a proof critically;
- spot circular reasoning, a missing reason, and an unjustified diagram;
- say why a converse needs its own proof;
- complete an incomplete congruence step;
- disprove a general claim with one counterexample;
- tell a correct answer apart from a correct proof.
