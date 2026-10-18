---
title: 1.5 Bushes are not rigid — Learn
chapter: 1
chapter_title: Suspension kinematics
section: '1.5'
section_title: Bushes are not rigid
refs: []
kind: walkthrough
---

# 1.5 Bushes are not rigid

## What the rigid model could not know

§1.2 assumed the joints do not move. A car's joints are bushes: rubber liners,
pressed in, that hold a pin in the middle of a sleeve. Under load the pin sits
off-centre by a few tenths of a millimetre, and a few tenths of a millimetre at
the end of an upright is a different camber.

Two questions follow, and only the second one is interesting.

1. How far does a bush move? A fraction of a millimetre, and the bush's stiffness
   answers it.
2. **Does it matter for the question being asked?** The chapter asked for a tenth
   of a degree. That is the question the next model has to answer.

## The model, changed in exactly one place

The upper ball joint stops being a joint and becomes a spring. The upper arm's
outer point and the upright's upper point are no longer the same place: they are
joined by a spring of stiffness $k$, and the distance between them is the bush's
deflection.

The mechanism now has more freedom than before, so the wheel's position is no
longer decided by the linkage alone. What decides it is **equilibrium**: the
spring pushes, the tyre pushes, and the two balance.

$$ E(\alpha,\beta) = \tfrac12 k\left|D(\alpha) - U(\beta)\right|^2 - F\,x_P(\alpha) $$

Here $\alpha$ is how far the upright has turned about the lower ball joint, $\beta$
is where the upper arm points, $U$ is the upper arm's outer end, $D$ is the
upright's upper point, and $F$ is a sideways force at the contact patch — the force
a cornering car puts through the tyre. The first term is the energy stored in the
bush. The second is the work the tyre's force does as the contact patch moves.

Equilibrium is where that energy stops changing:

$$ \frac{\partial E}{\partial \alpha} = 0, \qquad
\frac{\partial E}{\partial \beta} = 0. $$

Two equations, two unknowns. **No time, no differential equation, nothing that has
to be integrated.** Stiffen the spring, and the two ends of the bush are forced
together until they cannot separate — which is the rigid joint, and therefore
§1.2's model.

## Stiffen it, and watch the curve move

The load used here is 3 kN at the contact patch, which is what one front corner
carries through a hard corner. The slider moves the bush's stiffness over three
orders of magnitude.

:::figure stiffness-agreement

Drag the stiffness up. The dashed curve — the model with a bush — moves towards the
solid one, and the gap at rest closes with it. Nothing else changes: same load,
same geometry, same travel.

| Bush stiffness | Bush deflection | Camber at rest | Difference at rest | Change over the travel |
|---|---|---|---|---|
| 0.2 MN/m | 6.9 mm | −2.07° | −1.07° | 2.87° |
| 1 MN/m | 1.38 mm | −1.21° | −0.21° | 2.93° |
| 10 MN/m | 0.14 mm | −1.02° | −0.02° | 2.94° |
| 100 MN/m | 0.014 mm | −1.00° | −0.002° | 2.94° |

Each tenfold increase in stiffness cuts the difference by roughly a factor of ten,
and the numbers keep going the same way: down. That monotonic approach is the
evidence, and the solver's test suite asserts it across a ladder of stiffnesses
rather than at one convenient value.

Look at the last column, though, because it is the surprise. The bush mostly
**moves** the curve rather than tilting it: the load is constant, so the deflection
is roughly constant, and the camber change over the travel barely notices. A soft
bush of 0.2 MN/m shifts the whole curve by a degree and changes the total travel by
seven hundredths of a degree.

## The chapter's problem, answered

The chapter asked how far the camber changes, and how little model can answer it to
within a tenth of a degree. Both halves now have numbers, and the second one turns
out to depend on a distinction the question hides.

Over the full travel the rigid model gives a camber change of **2.94°**, from
−2.36° at 40 mm of droop to +0.58° at 40 mm of bump. Call that 3°, or 1.6° for a
40 mm bump from rest.

Now the tolerance. A tenth of a degree can be asked of two different things:

- **of the camber at a given position**, which is what a designer setting the
  wheel's angle cares about: the bush has to be about **2.1 MN/m** before the rigid
  model is within a tenth of a degree;
- **of the change over the travel**, which is what this chapter asked: even a soft
  bush of 0.15 MN/m is enough, because the bush shifts the curve rather than tilting
  it.

So the answer to "which model do I need" is not a matter of taste, and it is not
even a single number. It is a comparison between the tolerance the question asks for
and the size of the effect the simpler model leaves out — and the comparison has to
be made against **the quantity the question is about**, not against a number that
happens to be nearby.

Here the two tolerances are fourteen times apart, and a reader who took the wrong
one would either throw away a model that answers the question or trust a model that
misses it by a degree. That is why this section is the centre of the chapter rather
than an appendix to it. §1.2's model and this one do not compete. They answer
different versions of the same question, and which version you asked decides which
one is right.

## The agreement panel

| Check | Value |
|---|---|
| Camber change over the full travel, rigid model | 2.94° |
| Camber at rest, bush model at 1 MN/m | −1.21°, which is 0.21° from rigid |
| Camber at rest, bush model at 100 MN/m | −1.00°, which is 0.002° from rigid |
| Camber change, bush model at 0.2 MN/m | 2.87°, which is 0.07° from rigid |
| Bush stiffness for a tenth of a degree **at rest** | about 2.1 MN/m |
| Bush stiffness for a tenth of a degree **in the change** | about 0.15 MN/m |
| The trend as stiffness rises | monotone, in the solver's ladder test |

```text
TODO(phase-a): the ladder test and the two curves come from
examples/double-wishbone-compliant/out.js. The panel will read the exported
compliant sweep and the rigid one, and print the largest difference at each
stiffness. The numbers above are this page's model, which the figure recomputes on
every load from the same file the hero uses.
```

## Pseudocode, and the file it comes from

```python
# sweep.py — the compliant sweep, one equilibrium per frame
def equilibrium(theta, stiffness, load):
    alpha, beta = 0.0, 0.0                     # start from the rigid pose
    for _ in range(40):
        g = gradient(energy, alpha, beta, theta, stiffness, load)
        J = hessian(energy, alpha, beta, theta, stiffness, load)
        alpha, beta = newton_step(J, g, alpha, beta)
        if norm(g) < 1e-10:
            break
    return Pose(alpha=alpha, beta=beta, bush=gap(alpha, beta))
```

The file is
[`sweep.py`](https://github.com/leonpjvaughan/suspension-kinematics/blob/main/src/suspension/sweep.py),
and the stiffness ladder is one of its tests. Each frame starts from the previous
frame's answer, so the sweep follows one branch of the model rather than jumping
between branches that happen to be nearby.

## You should now be able to

- say what a bush is, and why replacing a joint with one changes the number of
  unknowns
- explain why equilibrium is an algebraic condition rather than a simulation
- say what happens to the compliant curve as the stiffness rises, and why
- decide whether a model is good enough for a stated tolerance

## Watch out

A spring with nothing pushing it does nothing. If the load $F$ were zero, the
energy would be smallest exactly where the bush has no deflection, and the model
would collapse back onto the rigid one at any stiffness at all.

So compliance is not a property of the bush on its own. It is a property of the
bush **and the load**, and a model that has one without the other will show nothing
and look reassuring. The number to look for is the deflection, and §1.5's figure
prints it: 6.9 mm at the softest setting, 0.014 mm at the stiffest.

The second trap is thinking that "more complex" means "more correct". Which model
answers the question depends on which quantity the tolerance is attached to, and
this chapter has shown two answers fourteen times apart. A stiffness you have
to guess is a new source of error, not a removed one — and a model that needs one
should have to earn it by changing the answer the question asked for.

## Going further

:::deeper equilibrium-without-time
