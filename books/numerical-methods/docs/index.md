---
title: Nine kinds of problem
---

# Nine kinds of problem

Numerical work looks enormous from the outside. A thousand algorithms, each with a
name and a paper behind it, and no obvious place to start. This book takes the
opposite view. The field is nine kinds of question, and a few circumstances decide
which method answers each one.

The numbers are the whole argument:

| | |
|---|---|
| methods named in [Methods, A to Z](techniques/index.md) | **62** |
| systems the nine kinds are used on | **64** |
| kinds of question | **9** |

Nobody holds sixty-two methods in their head. Nine kinds is a different size of
task. Learn the nine, and each method becomes a lookup inside a kind you already
understand, chosen by a circumstance you can name.

## The nine kinds

Every kind is a page. The last column is the one to read first: it says how to
recognise the kind from the model in front of you.

| Kind | What you are asking, and what comes back | How you know it is this one |
|---|---|---|
| [Optimisation](optimisation/index.md) | which allowed choice is best → one choice, and the price of every rule | you can score a choice with a number |
| [Averaging](averaging/index.md) | how likely, and how spread out → a distribution, or an average with an error bar | the inputs vary, or two runs disagree |
| [Eigenvalues](eigenvalue/index.md) | which values the system allows → those values, and the patterns that belong to them | you want a set of values, not one of them |
| [Linear system](linear-system/index.md) | what state balances every rule at once → one solve, and the work is in the matrix | every rule is a sum of the unknowns |
| [Root finding](root/index.md) | where a rule comes out zero → a point, found by looping from a start | you can write "this is zero" and cannot rearrange it |
| [Saddle point](saddle-point/index.md) | what holds a rule true everywhere → the state, and the force that enforces it | something has to stay true, and nothing chooses it |
| [Elliptic](elliptic/index.md) | what a settled field is, point by point → a value everywhere, fixed by the edges | nothing travels; the answer is a shape |
| [Parabolic](parabolic/index.md) | what smoothing does as time passes → a field that moves forward and forgets | the model spreads, cools or diffuses |
| [Hyperbolic](hyperbolic/index.md) | what travels, and how fast → a field carried along paths, shocks and all | carries something: a wave, a flood, a jam |

The order is the order the questions reach them: what you want comes first, then
whether the answer is settled or moving, and then what the answer looks like.

## What decides the method, once you know the kind

Three circumstances cut across the kinds. Each one changes the method without
changing the question, which is how a kind can hold ten methods and stay one kind.
They are not more boxes. They are the choices inside a box.

| Circumstance | What it changes |
|---|---|
| **Non-linear** | The answer appears inside the rule, so the model changes as you solve it. Every method becomes a loop around a linear one, and the starting guess starts to matter. |
| **Stiff** | The model contains a fast change you do not care about, and that change decides your step. This is the one that turns an explicit method into an implicit one. |
| **Geometry not known in advance** | The region is part of the question: a melting front, a contact patch, a crack. The mesh becomes an unknown too. |

Each kind also has properties of its own that narrow the choice — how sparse a
matrix is, whether it is symmetric, how well conditioned it is, how wide a mesh is —
and its page names them. That is the whole reason nine kinds hold sixty-two
methods: the kind is the question, and the circumstances are the choices.

## Why the number is nine

Nine is a choice, not a fact about nature. The same physics can be written as two
different kinds, and the writing decides what a solver can do with it.

The Einstein equations make the case. Written with a rule that has to hold
everywhere, a change inside the region must be felt everywhere at once, and a solver
cannot step forward. Written with a rule that travels at a finite speed, the same
physics runs. The equations did not change. The writing did.

So when a page here says "this is an elliptic problem", read it as "you wrote it
down that way". If the method you need does not exist for your kind, the model is
what changes. [The class is a choice](choosing-the-class/index.md) argues this with
three cases, including one from the next section.

## One model, several kinds

A kind belongs to a term, not to a problem. A single model can hold three kinds at
once, and each term is handled its own way.

Navier–Stokes has a rule that the flow cannot compress, a term that carries
information along paths, and a term that smooths. That is a saddle point, a
hyperbolic part and a parabolic part in one line, and nobody solves it as one kind.
The same happens below the model: once a steady problem is discretised, the step
that solves it is a [linear system](linear-system/index.md), which is why that kind
exists even though no physics says "linear".

The suspension corner in `Maths Applied` is the small version of this. The rigid
linkage is [root finding](root/index.md); hold the joint rigid and price it instead
and it becomes a [saddle point](saddle-point/index.md), whose multiplier is the force
in the joint; make the joint a spring and it is a root problem again, with no
multiplier at all. Its bounce is [parabolic](parabolic/index.md). [The same corner,
five ways](worked-case/index.md) takes that one mechanism through five kinds and
quotes the numbers where the models agree.

## Three ways in

- **You have a model and no idea what it is.** Start with the nine kinds above, and
  read the last column before the others.
- **You know a method by name and want to know where it applies.** Start at
  [Methods, A to Z](techniques/index.md). It goes method → kinds it works on → what
  it costs.
- **You have a wrong answer.** Start at [When it goes wrong](symptoms/index.md). It
  goes symptom → kind → cause → fix.

Nothing here is a course, and there is nothing to practise. Every page stands on its
own, and a page you skip is a page you did not need.

:::disclaimer
