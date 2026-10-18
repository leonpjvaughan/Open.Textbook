---
title: 1.2 One rigid triangle — Learn
chapter: 1
chapter_title: Suspension kinematics
section: '1.2'
section_title: One rigid triangle
refs: []
kind: walkthrough
---

# 1.2 One rigid triangle

## What the model assumes

The first model makes two claims and no more.

1. Each wishbone is **one rigid body**, turning about the line through its two
   chassis pivots. It is a triangle, and a triangle cannot change shape.
2. The upright is **one rigid body** too, carrying both ball joints and the hub.

From those two claims, the whole front view follows. There is nothing else in the
model: no bending, no play in the joints, no give in the bushes.

## It has exactly one degree of freedom

A rigid body can move in three ways in a plane: two translations and a rotation.
So three moving bodies have nine degrees of freedom between them. Constraints
take them away:

| Constraint | How many | Freedoms removed |
|---|---|---|
| Lower wishbone to the body, at its axis | 1 | 2 |
| Upper wishbone to the body, at its axis | 1 | 2 |
| Lower wishbone to the upright, at the ball joint | 1 | 2 |
| Upper wishbone to the upright, at the ball joint | 1 | 2 |

Nine minus eight leaves **one**. One number sets the whole mechanism, so if the
lower arm's angle is known, everything else is known. That is what makes this
model worth having: one input, one output, no searching.

The general rule is worth writing down, because it is what tells you a model is
well posed before you try to solve it:

$$ 3\,(n-1) - \sum_i c_i = \text{degrees of freedom}, $$

where $n$ counts the bodies and $c_i$ is the number of freedoms each constraint
removes — 2 for a hinge in a plane, 3 for a ball joint in space, and 1 for a fixed
length. The solver refuses to run a mechanism whose freedom count does not match
the number of things being driven, because such a model has no single answer to
give.

## Two circles, and where they meet

Set the lower arm's angle to $\theta$. The lower ball joint $C$ swings on a circle
about its pivot $A$, so its position is known exactly:

$$ C = A + R_A\,(\cos(\alpha+\theta),\, \sin(\alpha+\theta)), $$

where $\alpha$ is the arm's angle at rest and $R_A$ is its length. The upper ball
joint $D$ is at the end of the upper arm, and also at a fixed distance from $C$,
because the upright is rigid. Both facts are distances, so both are circles:

$$ \begin{aligned}
(D_x - B_x)^2 + (D_z - B_z)^2 &= R_B^{\,2}, \\
(D_x - C_x)^2 + (D_z - C_z)^2 &= L^2.
\end{aligned} $$

Two circles meet in two places, or none, or touch. In code, the two places are
found without any searching at all:

```python
def upper_joint(C):
    """Where the upper ball joint can be, given where the lower one is."""
    d = norm(C - B)
    along = (R_B**2 - L**2 + d**2) / (2 * d)      # where the chord crosses BC
    across = sqrt(R_B**2 - along**2)              # how far off BC the meeting is
    mid = B + along * unit(C - B)
    n = perp(unit(C - B))
    return [mid + across * n, mid - across * n]   # two assemblies; the car has one
```

Both answers are real solutions of the same two equations. They are two different
assemblies of the same parts, and only one of them is a car. Which one you keep is
a modelling decision, not a mathematical one, and §1.2's depth page is about it.

## Camber, from the pose

The wheel plane is fixed in the upright, so the wheel's angle is the upright's
angle, plus whatever the upright was built with at rest:

$$ \gamma = \gamma_0 + \left(\phi - \phi_0\right), $$

where $\phi$ is the direction of the line between the two ball joints and
$\phi_0$ is that direction at rest. The design used here has $\gamma_0 = -1.0°$:
the top of the wheel leans in by one degree when the car is standing still.

:::figure wishbone-hero

Predict before you move it: as the wheel rises, does the top of the wheel lean
further out, or further in? The drawing answers both ways round — the rim tilts,
and the readout gives the number.

## What the model says

| Wheel travel | Lower arm turns | Camber | Instant centre | Roll centre |
|---|---|---|---|---|
| −40 mm | −5.3° | −2.36° | 1.04 m inboard, 0.30 m up | 102 mm |
| −20 mm | −2.7° | −1.71° | 0.92 m inboard, 0.23 m up | 91 mm |
| 0 mm | 0.0° | −1.00° | 0.81 m inboard, 0.17 m up | 82 mm |
| +20 mm | 2.7° | −0.24° | 0.70 m inboard, 0.12 m up | 72 mm |
| +40 mm | 5.3° | +0.58° | 0.59 m inboard, 0.08 m up | 64 mm |

Three numbers matter for the chapter's question:

- camber moves **2.94°** from one end of the travel to the other;
- that is **0.037° per millimetre**, so 40 mm of bump is worth about 1.6°;
- the track narrows by **6.0 mm** at the bump end, and widens a little in droop.

The **instant centre** is where the two arm axes would meet if they carried on
past the wheel. It is 1.57 m from the hub, which is why the drawing has to say
"to the instant centre" rather than showing it. The **roll centre** is where the
line from the contact patch through that point crosses the middle of the car: it
is 82 mm above the ground at rest, and it moves down as the wheel rises.

## The agreement panel

Every section after this one ends with a panel of numbers. This one has two
solvers rather than two models: the two-circle construction above, and the general
Newton iteration that §1.3 meets.

| Check | Value |
|---|---|
| Camber over the whole travel, closed form | −2.36° to +0.58° |
| Camber over the whole travel, Newton iteration | same curve, to the last bit of a double |
| Largest difference between the two, over the sweep | to be read from the solver's export |

```text
TODO(phase-a): replace this row with `agreement.max_abs_diff` from
examples/double-wishbone/out.js, which the solver package asserts is below 1e-9
and reports as about 1e-14. The panel must read the exported object, not a number
typed here.
```

The closed form is the fast path and the independent check at once: it gets the
answer without the solver, so it can be used to test the solver. Two routes to one
number is evidence; one route is a claim.

## Pseudocode, and the file it comes from

```python
# derive.py — the residual and its Jacobian, symbolically, once
unknowns = symbols("C_x C_z D_x D_z")
rows = [
    dist(C, A) - R_A,            # the lower arm keeps its length
    dist(D, B) - R_B,            # the upper arm keeps its length
    dist(D, C) - L,              # the upright keeps its length
]
J = Matrix(rows).jacobian(unknowns)     # never hand-differentiate: this is the bug
residual = lambdify((...), rows, cse=True)
jacobian = lambdify((...), J, cse=True)
```

The file is [`analytic.py`](https://github.com/leonpjvaughan/suspension-kinematics/blob/main/src/suspension/analytic.py)
for the closed form, and [`derive.py`](https://github.com/leonpjvaughan/suspension-kinematics/blob/main/src/suspension/derive.py)
for the derivation. The pseudocode uses the same names and shapes as the files;
it is not a copy of them.

## You should now be able to

- say what the first model assumes, and what it ignores
- count the degrees of freedom of a mechanism in a plane, and say why one is enough
- explain why the two ball joints' positions come from two circles
- read camber, instant centre and roll centre off a pose

## Watch out

The two circles meet in **two** places, and taking the other one is a mistake that
looks like a physics bug. The mechanism is then assembled the other way up, the
camber curve starts somewhere else, and it can leap from one solution to the other
part-way through the travel.

The check is one line long and hard to live without: solve each position from the
previous one, keep the branch the design position was on, and record any frame
where the branch changes. A curve with a jump in it is a solver finding a
different assembly, not a wheel doing something surprising.

A related trap: the two arms are nearly horizontal, so their axes meet a long way
away from the wheel — 1.57 m here. If a drawing shows the instant centre inside
the wheel, it is not drawn to the same scale in both directions, and every angle
in it is wrong.

## Going further

:::deeper two-solutions
