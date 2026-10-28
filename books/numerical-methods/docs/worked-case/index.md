---
title: The same corner, five ways
---

# The same corner, five ways

One mechanism, five questions. Each question turns the same suspension corner
into a
kind of problem, and the kind decides what a solve costs.

The numbers below come from the model in
[`Maths Applied`](/maths-applied/), which prints them on the pages named beside
each
one. They are quoted rather than recomputed: a second implementation in this
book
would be a second answer, and this page is about the kinds, not about the
corner.

## The five questions

| question | the model | the class | what a solve costs |
|---|---|---|---|
| Where is the wheel? | two circles and a rigid upright | [root finding](../root/index.md) | one closed-form step, no iteration |
| Which row is the spare one? | three rules, two unknowns | [linear system](../linear-system/index.md) | one factorisation of a three-by-two matrix |
| How stiff should the bush be? | the same corner, swept over stiffness | [optimisation](../optimisation/index.md) | one sweep, and a target to hit |
| How does the wheel bounce? | mass and a spring, with constraints priced | a [saddle point](../saddle-point/index.md), then [eigenvalues](../eigenvalue/index.md) and the [Hamiltonian flag](../hyperbolic/index.md) | a time step, and a choice of integrator |
| How hot does the damper get? | a damper, and the heat it makes — not built here | [parabolic](../parabolic/index.md), and stiff | a time step chosen for the wrong scale |

The map has nine kinds, and this collection names six of them. §1.2 and §1.5 say
the corner is a [root problem](../root/index.md), and §1.3 and §1.4 say it is a
[linear system](../linear-system/index.md). §1.5 asks an
[optimisation](../optimisation/index.md) question; §1.6 prices the constraints
as a
[saddle point](../saddle-point/index.md) and reads the oscillation as
[eigenvalues](../eigenvalue/index.md). The statistics chapters name
[averaging](../averaging/index.md) where a standard error appears. Three more —
[elliptic](../elliptic/index.md), [parabolic](../parabolic/index.md) and
[hyperbolic](../hyperbolic/index.md) — have no section that names them yet, and
their pages say so under **Used in this collection**. The last row above is one
of
them: a question the chapter names and does not reach. The stiffness sweep below
is
an [optimisation](../optimisation/index.md), and the bounce is a [stability
eigenvalue](../eigenvalue/index.md). `Maths Applied` names both where the class
becomes true: §1.5 for the stiffness that meets a tolerance, §1.6 for the
frequencies the motion repeats at. The remaining three wait for a chapter that
poses a field problem or one that adds a damper.

## Where is the wheel: root finding

Set the lower arm's angle, and the upper ball joint is wherever two circles
meet.
Two circles meet twice, and both are real assemblies of the same parts.

From 40 mm below the design position to 40 mm above it, the rigid model's camber
runs from −1.869° to +0.082°, a change of **1.950°**, with −1.000° at rest.
`Maths Applied`
[§1.2](/maths-applied/chapter-1/section-1.2/learn/) prints those numbers.

The interesting part is not the arithmetic; it is that a rule holding at a point
can
hold at two points. A solver started near one assembly returns it, and a reader
who
does not know there are two will not notice.

## Which row is the spare one: a linear system

Give the wishbone a second leg and the model has three rules and two unknowns.
In
the least-squares sense the matrix is a three-by-two, and **a three-by-two
always has
a zero singular value** — so a zero is not evidence of a fault. The evidence is
the
null vector: which rows it is supported on says which rule is the spare one.

Dropping that row returns the two-circle problem, and the class changes from a
[linear system](../linear-system/index.md) with a rank deficiency to a
[root problem](../root/index.md) with a unique answer. `Maths Applied`
[§1.4](/maths-applied/chapter-1/section-1.4/learn/) is where this is worked.

## How stiff should the bush be: optimisation

Replace the joint with a spring and the corner is a root problem at each wheel
position. That makes one question worth asking: how stiff does the spring have
to be
before the bushed model agrees with the rigid one?

The answer is a sweep, and the sweep is a number. These are the export's own
four
stiffnesses, and `Maths Applied`
[§1.5](/maths-applied/chapter-1/section-1.5/learn/) prints the same ladder from
the
same model:

| bush stiffness | camber at rest | difference at rest | change over the travel |
|---|---|---|---|
| 0.2 MN/m | −1.91° | −0.91° | 1.96° |
| 1 MN/m | −1.18° | −0.18° | 1.92° |
| 10 MN/m | −1.02° | −0.02° | 1.91° |
| 100 MN/m | −1.00° | −0.002° | 1.91° |

The difference column is the bushed camber minus the rigid model's −1.000° at
rest,
so a negative number means the bush has moved the wheel further from the design
value. Ten times the stiffness brings the two models closer, which is what a
stiff
limit looks like when you sweep it. The last column barely moves: the bush
shifts
the curve rather than tilting it.

A stiffness chosen for a tenth of a degree **at rest** is **1.8 MN/m**, and that
is
an [optimisation](../optimisation/index.md) with a stated tolerance —
`Maths Applied`
[§1.5](/maths-applied/chapter-1/section-1.5/learn/) prints the table. §1.5 also
shows
that the same tenth of a degree asked of the change over the travel is met by
the
export's softest row, 0.2 MN/m. That is about nine times softer, because it is a
question about a different quantity. That is why a tolerance has to name what it
is
a tolerance on.

## How does the wheel bounce: a saddle point, then eigenvalues

Give the corner mass and the problem stops being algebra. The equations become
differential-algebraic, the constraint needs a force to hold it, and the class
becomes a [saddle point](../saddle-point/index.md) whose motion is an
[eigenvalue](../eigenvalue/index.md) problem. With no damper, the motion is
**conservative**: it repeats rather than decaying, and the energy drift is the
diagnostic that says so.

How the wheel hops and how the body heaves are
[eigenvalues](../eigenvalue/index.md)
of the linearised system. With no damper, "how long a bump takes to settle" has
no
answer: the motion never settles. A damped model would settle, and that decay
would
be a [parabolic](../parabolic/index.md) problem; this model does not build one.

`Maths Applied`
[§1.6](/maths-applied/chapter-1/section-1.6/learn/) is finished. It prints the
run:
212.8 mm of travel, a 0.625 s period (1.6 Hz), and an energy drift of
6.3 × 10⁻⁸. What it does not model is a damper, so the motion repeats; the
parabolic
decay and the damper's heat are the two later questions.

## How hot does the damper get: the same class, and stiff

A damper converts motion to heat, the oil warms, and the damping changes. That
is a
second [parabolic](../parabolic/index.md) problem, coupled to the first.

It is also the clearest case of the **stiff** flag. The heat equation's fast
scale
is not the wheel's motion, so a step chosen for the motion will either take
forever
or diverge. The quarter car has no damper yet, so there is no heat to model.

## What the five have in common

Every one of them is the same corner. Nothing was added to the car between the
first
question and the fifth; what changed is what was asked, and therefore how the
model
was written down.

That is the map's claim, and this page is the evidence for it: one mechanism,
five
questions and six kinds of problem, five of which a section already names. One
of
the methods needs no iteration at all.

## What a kernel is

The numbers on this page come from the model in `Maths Applied`, and that model
is
also compiled to a **kernel**. The word has more than one meaning in numerical
work,
so this section says which one this collection uses.

A kernel here is a **compiled solver for one model**. Its core is two functions:
the
residual $\Phi(q,g,t)$, which is zero when the model's rules hold, and its
Jacobian
$J=\partial\Phi/\partial q$. The pair is the same map the package's Python
engine
evaluates. The form is different: the kernel is a straight line of arithmetic,
not a
tree of expressions.

The pipeline has five steps.

| step | what goes in | what comes out |
|---|---|---|
| derive | the model's rules | $\Phi$ and $J$ as SymPy expressions |
| flatten | those expressions | a straight line of scalar assignments |
| print | the straight line | Rust source |
| compile | the Rust source | a WebAssembly module |
| wrap | the module | `kernel.js`, with the binary inlined |

That is the sense behind the phrase *SymPy → Rust → WebAssembly kernel*: SymPy
derives the arithmetic, Rust is the source language, and WebAssembly is what the
page loads.

**Derive.** SymPy differentiates the residual to get the Jacobian. The
derivation is
exact and happens once, before any number is solved. The Python engine and the
page
use the same derivation, and a test solves the same case with both. If they
disagree,
the Python derivation is right and the kernel is stale.

**Flatten.** Common-subexpression elimination finds a term that appears more
than
once, computes it once and gives it a name. The model's arithmetic becomes a
list of
scalar assignments, with no allocation and no interpreter. The model's size is
known
before the build, so the kernel needs no memory manager.

**Print and compile.** The list is printed as Rust and compiled for
`wasm32-unknown-unknown`. The module has one buffer of `f64` values, with fixed
offsets for the unknowns, the geometry, the residual, the Jacobian and the
outputs.
It imports nothing. A page writes numbers into the buffer, calls a function, and
reads the answer out.

**Wrap.** `kernel.js` carries the WebAssembly binary as base64, so a page needs
one
import and no second request. The binary is there for inspection. The module the
browser runs is the one inside the JavaScript file.

The word *kernel* is used in its software sense: the small core of arithmetic
that
the rest of the program calls. It is not the whole program. The page decides
what to
put in, when to call it, and how many iterations to allow. The method was chosen
when
the kernel was generated: Newton's step for the rigid model, a least-squares or
constrained step for the others, and an integrator for the quarter car.

**Common error.** It is tempting to read *kernel* as a method. A kernel is not
Newton's method, and it is not a Runge–Kutta step. It is one model's arithmetic,
printed as code. A different topology needs a new kernel, even when the same
method
solves both.

### The same word, other senses

Numerical work uses *kernel* for other things too. Two of them appear in this
book.

| sense | where you meet it | what it is |
|---|---|---|
| integral kernel | [Boundary element](../techniques/#linear-systems) | the function $G(x,y)$ inside the boundary integral |
| null space | [Saddle point](../saddle-point/index.md) | the vectors $x$ with $Ax=0$ |
| compiled kernel | this section | the generated solver for one model |

The first is a function you integrate. The second is a set of vectors a matrix
sends
to zero; it is also called the kernel of the matrix. The third is a piece of
code.
The context decides which one is meant: an integral sign, a matrix equation, or
a
module a page imports.

`Maths Applied` [§1.6](/maths-applied/chapter-1/section-1.6/learn/) walks the
pipeline on the quarter car, from the SymPy derivative to the Rust source and
the
module the page runs.

## Read next

- [The class is a choice](../choosing-the-class/index.md) — why the same
  physics can
  be two kinds, and what has to stay true when you switch.
- [Root finding](../root/index.md) — the first of the five.
- [When it goes wrong](../symptoms/index.md) — when a solve of one of these
  returns a
  plausible wrong answer.
