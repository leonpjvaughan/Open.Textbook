---
title: Which kind of problem do you have?
---

# Which kind of problem do you have?

You have a system in front of you. Perhaps it is a suspension link, a cooling
casting, or a star that will not sit still on a computer. Before anything can be
solved, the system has to be written down — and the way you write it down decides
what kind of problem you now have. That kind decides which techniques can solve
it, which ones waste a week, and which ones look right and are not.

This book is a map of those kinds. It does not teach numerical analysis. It
answers one question: **I have this model; what kind of problem is it, and what
solves it?**

## Five questions, in this order

The mnemonic is the chapter. Each question is about your *system*, not about the
mathematics, so you can answer it before you have solved anything.

1. **What do you want?** The best one? How likely something is? Which values are
   allowed? Or the state that obeys the rules?
2. **Does it move?** Is there a rate of change in the model, or is the answer
   settled?
3. **Is it everywhere?** One unknown at a point, or one unknown at every point in
   a region?
4. **What does it cost?** Is there a rule that has to hold everywhere, paid for by
   a second unknown?
5. **Does it remember?** As the answer moves forward, does it keep where it came
   from, or does it forget?

## The map

Every box is a page. Follow the branch that matches your model.

1. **What do you want?**
   - the best one → [Optimisation](optimisation/index.md)
   - how likely, how spread out → [Averaging](averaging/index.md)
   - which values are allowed → [Eigenvalues](eigenvalue/index.md)
   - the state that obeys the rules → question 2
2. **Does it move?**
   - no → question 3
   - yes → question 5
3. **Is it everywhere?**
   - no, a finite list of unknowns → is every rule linear in the unknowns?
     - yes → [Linear system](linear-system/index.md)
     - no → [Root finding](root/index.md)
   - yes, one unknown at every point → question 4
4. **What does it cost?**
   - a rule holds everywhere, paid for by a second unknown → [Saddle point](saddle-point/index.md)
   - no such rule → [Elliptic](elliptic/index.md)
5. **Does it remember?**
   - no, it smooths the answer and forgets where it started → [Parabolic](parabolic/index.md)
   - yes, it carries information along paths → [Hyperbolic](hyperbolic/index.md)

:::figure class-map

The same tree, drawn and walked step by step. The question you are stuck on is
usually the one you have not asked.

## Three flags, not three more boxes

Two models can be the same class and still need different treatment, because of
flags. They modify the technique; they do not change the class.

- **Non-linear.** The answer appears inside the model, so the model changes as you
  solve it. Every method becomes a loop around a linear one, and the starting
  guess starts to matter.
- **Stiff.** The model contains a fast change you do not care about. The fast part
  decides the step size unless the method is implicit, which is why a method that
  works at one speed fails at another.
- **Geometry not known in advance.** The region the answer lives in is part of the
  question — a melting front, a contact patch, a crack. The mesh becomes an
  unknown too.

## The class is a choice you make

This is the idea the rest of the map rests on, and it is not a fact about nature.

The clearest case comes from numerical relativity. Written with elliptic
coordinate conditions, the Einstein equations give a problem in which a change
inside the region has to be felt everywhere at once. A solver cannot do that, and
the calculation does not run. Written with hyperbolic conditions, the same physics
gives a problem where information travels at a finite speed, and it does run.
Same equations, different class, one of them usable.

The field has names for the two ways out. **Constrained evolution** solves the
elliptic constraint at every step. **Free evolution** solves it once and evolves
the rest, hoping it stays satisfied. A fluid solver makes the same choice every
time it decides whether to project the velocity onto the incompressible set or let
the divergence drift.

So when a page here says "this is an elliptic problem", read it as "you wrote it
down that way". If the method you need does not exist for your class, the model is
what changes.

The full argument, with three cases: [The class is a choice you make](choosing-the-class/index.md).

## One system, several boxes

A box is a property of a term, not of a problem. A single model can have terms in
three boxes at once, and the solver handles each term its own way.

Navier–Stokes has a constraint (the flow cannot compress, so pressure is a second
unknown priced against it), an advection term that carries information along paths,
and a viscous term that smooths. That is a saddle point, a hyperbolic part and a
parabolic part in one line. Nobody solves it as one class.

The same applies below the model. Once a steady problem is discretised, the step
that solves it is a [linear system](linear-system/index.md) — which is why that box
exists even though no physics says "linear".

The same is true of the suspension corner in `Maths Applied`: the rigid linkage is
a root-finding problem; keep the joint rigid and price it and it becomes a saddle
point, whose multiplier is the force in the joint; give the joint a spring instead and
it is a root problem again, with no multiplier at all. The bounce is parabolic, and
choosing a spring rate is optimisation. [The same corner, five ways](worked-case/index.md) takes that one
mechanism through five questions and quotes the numbers where the models agree.

## How to use this book

- **You have a wrong answer.** Start at [When it goes wrong](symptoms/index.md).
  It goes symptom → class → cause → fix.
- **You know a method and want to use it.** Start at [Methods, A to Z](techniques/index.md).
  It goes method → classes it works on, and says what it costs.
- **You have a model and no idea what it is.** Start with the five questions above.

Nothing here is a course, and there is nothing to practise. Every page stands on
its own, and a page you skip is a page you did not need.
