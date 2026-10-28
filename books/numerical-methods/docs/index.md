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
| methods named in [Methods, A to Z](techniques/index.md) | **77** |
| systems the nine kinds are used on | **64** |
| kinds of question | **9** |

Nobody holds seventy-seven methods in their head. Nine kinds is a different size of
task. Learn the nine, and each method becomes a lookup inside a kind you already
understand, chosen by a circumstance you can name.

## The nine kinds

Every kind is a page. The third column is the model the kind writes down. Read the
last column first: it says how to recognise the kind from the model in front of
you.

| Kind | What you are asking, and what comes back | The model you write down | How you know it is this one |
|---|---|---|---|
| [Optimisation](optimisation/index.md) | which allowed choice is best → one choice, and the price of every rule | $\min_x f(x)$ s.t. $g(x)\le0$, $h(x)=0$ | you can score a choice with a number |
| [Averaging](averaging/index.md) | how likely, and how spread out → a distribution, or an average with an error bar | $\mathbb E[g(X)]=\int g(x)\,p(x)\,dx$ | the inputs vary, or two runs disagree |
| [Eigenvalues](eigenvalue/index.md) | which values the system allows → those values, and the patterns that belong to them | $Ax=\lambda x$ | you want a set of values, not one of them |
| [Linear system](linear-system/index.md) | what state balances every rule at once → one solve, and the work is in the matrix | $Ax=b$ | every rule is a sum of the unknowns |
| [Root finding](root/index.md) | where a rule comes out zero → a point, found by looping from a start | $F(x)=0$ | you can write "this is zero" and cannot rearrange it |
| [Saddle point](saddle-point/index.md) | what holds a rule true everywhere → the state, and the force that enforces it | $Au+B^{\mathsf T}p=f$, $Bu=g$ | something has to stay true, and nothing chooses it |
| [Elliptic](elliptic/index.md) | what a settled field is, point by point → a value everywhere, fixed by the edges | $-\nabla\cdot(k\nabla u)=f$ | nothing travels; the answer is a shape |
| [Parabolic](parabolic/index.md) | what smoothing does as time passes → a field that moves forward and forgets | $\partial_tu=\nabla\cdot(k\nabla u)+f$ | the model spreads, cools or diffuses |
| [Hyperbolic](hyperbolic/index.md) | what travels, and how fast → a field carried along paths, shocks and all | $\partial_tu+\nabla\cdot F(u)=0$ | carries something: a wave, a flood, a jam |

The order is the order the questions reach them: what you want comes first, then
whether the answer is settled or moving, and then what the answer looks like.
Each class page takes its equation apart under **The model you write down**, and
says what the solver becomes.

:::figure kind-shapes

The nine answers do not look alike. A root and a linear system come back as a
point. A saddle point comes back as a point and the price of a rule. An
eigenvalue problem and an average come back as a set. The difference between the
field problems is what the field does as time passes: nothing, smoothing, or
travelling.

Three of the kinds are read off the equation itself, in one line of arithmetic:
for a second-order equation, $B^2-4AC$ says whether the answer travels, smooths
or settles. [Reading the class off the equation](reading-the-class/index.md)
gives that number, the reason it decides, and a program that computes it.

## What decides the method, once you know the kind

Three circumstances cut across the kinds. Each one changes the method without
changing the question, which is how a kind can hold ten methods and stay one kind.
They are not more boxes. They are the choices inside a box.

| Circumstance | What it changes |
|---|---|
| **Non-linear** | The answer appears inside the rule, so the model changes as you solve it. Every method becomes a loop around a linear one, and the starting guess starts to matter. |
| **Stiff** | The model contains a fast change you do not care about, and that change decides your step. This is the one that turns an explicit method into an implicit one. |
| **Geometry not known in advance** | The region is part of the question: a melting front, a contact patch, a crack. The mesh becomes an unknown too. |

Each kind also has properties of its own that narrow the choice. They include how
sparse a matrix is, whether it is symmetric, how well conditioned it is, and how
wide a mesh is. The class page names them. That is the whole reason nine kinds hold
seventy-seven methods: the kind is the question, and the circumstances are the
choices.

## Where the working is

Nine kinds is the whole of the map, and the map is summary. Under each kind
there are pages with the working on them: the algebra, a program that prints a
number, and the argument for why the method does what it does. They are optional
in the same way that the class pages are. Nothing here needs them, and a reader
who wants to know why an error falls as $1/\sqrt N$ rather than being told that
it does has somewhere to go.

Three pages cross the kinds. They are the working that no single class owns.

| Page | What it settles |
|---|---|
| [Error, and what a tolerance is](error/index.md) | Round-off, machine epsilon, cancellation, conditioning, and what a tolerance is a statement about |
| [Convergence, and how to measure it](order/index.md) | Observed order, Richardson extrapolation, and what a rate does not promise |
| [Knowing the answer is right](checking/index.md) | Manufactured solutions, grid convergence, residuals, and the difference between verified and validated |

A class page gains a detail page when there is working under it that the class
page cannot hold. Those pages sit under their class in the sidebar. The four
under Averaging are the first of them.

| Page | What it settles |
|---|---|
| [An average, and its error bar](averaging/error-bars/index.md) | The variance of an estimate, the $\sigma/\sqrt N$ rate, and the two-standard-error bar |
| [When the samples are not independent](averaging/correlated/index.md) | Autocorrelation and the effective sample size $N/\tau$ |
| [Walking a chain that settles](averaging/mcmc/index.md) | Metropolis, detailed balance, R-hat and the effective sample size |
| [Fitting, and what the fit does not say](averaging/regression/index.md) | Least squares, the normal equations, and the slope's standard error |

## Why the number is nine

Nine is a choice, not a fact about nature. The same physics can be written as two
different kinds, and the writing decides what a solver can do with it.

The Einstein equations make the case. Written with a rule that has to hold
everywhere, a change inside the region must be felt everywhere at once, and a solver
cannot step forward. Written with a rule that travels at a finite speed, the same
physics runs. The equations did not change. The writing did. [The class is a
choice](choosing-the-class/#the-same-equations-classified) writes both rules down,
reads the three coefficients off each, and shows the one sign that decides it.

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
The same happens below the model. Once a steady problem is discretised, the step
that solves it is a [linear system](linear-system/index.md). That is why the kind
exists even though no physics says "linear".

The suspension corner in [`Maths Applied`](/maths-applied/) is the small version of
this. The rigid linkage is [root finding](root/index.md). Hold the joint rigid and
price it instead, and it becomes a [saddle point](saddle-point/index.md), whose
multiplier is the force in the joint. Make the joint a spring and it is a root
problem again, with no multiplier at all. Its bounce is an [eigenvalue](eigenvalue/index.md) problem, and
with no damper it keeps its energy: the Hamiltonian flag is described on the
[hyperbolic page](hyperbolic/index.md), though no section names that class. [The
same corner, five ways](worked-case/index.md) takes that one mechanism through five
kinds and quotes the numbers where the models agree. The page's last section explains
[what a kernel is](worked-case/#what-a-kernel-is): the compiled solver some pages in
the collection run, and the two other senses the word has in numerical work.

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
