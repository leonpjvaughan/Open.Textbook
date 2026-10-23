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

No searching and no solving for the best of anything: the bush settles where the
two forces agree, and finding it is a root-finding loop with two unknowns.

:::class root

## Stiffen it, and watch the curve move

The load is the corner's own: 3.5 kN downwards and 1.8 kN sideways at the wheel
centre, which is what one front wheel carries under braking in a corner. The
exported model carries the same pair at the same point, so the two routes are one
experiment. The slider moves the bush's stiffness over three orders of magnitude.

:::figure stiffness-agreement

Drag the stiffness up. The dashed curve — the model with a bush — moves towards the
solid one, and the gap at rest closes with it. Nothing else changes: same load,
same geometry, same travel.

| Bush stiffness | Bush deflection | Camber at rest | Difference at rest | Change over the travel |
|---|---|---|---|---|
| 0.2 MN/m | 6.1 mm | −1.91° | −0.91° | 1.96° |
| 1 MN/m | 1.21 mm | −1.18° | −0.18° | 1.92° |
| 10 MN/m | 0.12 mm | −1.02° | −0.02° | 1.91° |
| 100 MN/m | 0.012 mm | −1.00° | −0.002° | 1.91° |

**The table is the exported model's**, and this section's front view gives the same
ladder to within **0.04°** — inside the tenth of a degree the chapter asked for, and
outside the last digit of the camber column. Two routes to one answer is the
evidence; the small gap between them is the front view's idealisation, and §1.4 is
where that is measured.

Each tenfold increase in stiffness cuts the difference by roughly a factor of ten,
and the numbers keep going the same way: down. That monotonic approach is the
evidence, and the solver's test suite asserts it across a ladder of stiffnesses
rather than at one convenient value.

Look at the last column, though, because it is the surprise. The bush mostly
**moves** the curve rather than tilting it: the load is constant, so the deflection
is roughly constant, and the camber change over the travel barely notices. A soft
bush of 0.2 MN/m shifts the whole curve by about a degree, and the change over the
travel moves by five hundredths of a degree, from 1.96° at 0.2 MN/m to 1.91° at
100 MN/m.

## The chapter's problem, answered

The chapter asked how far the camber changes, and how little model can answer it to
within a tenth of a degree. Both halves now have numbers, and the second one turns
out to depend on a distinction the question hides.

Over the full travel the rigid model gives a camber change of **1.95°**, from
−1.87° at 40 mm of droop to +0.08° at 40 mm of bump. Call that 2°, or 1.08° for a
40 mm bump from rest. The export's ladder gives 1.91° at 100 MN/m, four
hundredths below the rigid model's. That gap is the front view's idealisation,
measured in §1.4, and it is inside the tenth of a degree this chapter asked for.

Now the tolerance. A tenth of a degree can be asked of two different things:

- **of the camber at a given position**, which is what a designer setting the
  wheel's angle cares about: the bush has to be about **1.8 MN/m** before the rigid
  model is within a tenth of a degree;
- **of the change over the travel**, which is what this chapter asked: even a soft
  bush of 0.15 MN/m is enough, because the bush shifts the curve rather than tilting
  it.

So the answer to "which model do I need" is not a matter of taste, and it is not
even a single number. It is a comparison between the tolerance the question asks for
and the size of the effect the simpler model leaves out — and the comparison has to
be made against **the quantity the question is about**, not against a number that
happens to be nearby.

Here the two tolerances are twelve times apart, and a reader who took the wrong
one would either throw away a model that answers the question or trust a model that
misses it by a degree. That is why this section is the centre of the chapter rather
than an appendix to it. §1.2's model and this one do not compete. They answer
different versions of the same question, and which version you asked decides which
one is right.

Read the first bullet again, though, because it is a different kind of question from
everything above. "About 1.8 MN/m" is not a solve: it is the stiffness that makes a
number meet a target, and finding it means searching over the stiffness rather than
settling at the equilibrium for one. The bush still settles where the two forces
agree; what changes is what you are asking for.

:::class optimisation

## The agreement panel

| Check | Value |
|---|---|
| Camber change over the full travel, rigid model | 1.95° |
| Camber at rest, bush model at 1 MN/m | −1.18°, which is 0.18° from rigid |
| Camber at rest, bush model at 100 MN/m | −1.00°, which is 0.002° from rigid |
| Camber change, bush model at 0.2 MN/m | 1.96°, five hundredths above the 100 MN/m row |
| Bush stiffness for a tenth of a degree **at rest** | about 1.8 MN/m |
| The front view's ladder against the export's | within 0.04°, over four stiffnesses |
| Bush stiffness for a tenth of a degree **in the change** | about 0.15 MN/m |
| The trend as stiffness rises | monotone, in the solver's ladder test |

### The same idea, on a different joint

The package's compliant example softens a different joint: not the upper ball joint but the
**tie rod**, the fore-aft link that sets where the wheel points. Its kernel takes that
compliance at run time, and the quantity it moves is not camber.

| tie-rod compliance | toe | camber |
|---|---|---|
| 10⁻⁶ m/N | 0.009° | −0.0003° |
| 10⁻⁴ m/N | 0.58° | −0.015° |
| 10⁻² m/N | 1.46° | −0.037° |

A hundred times softer moves the toe by a degree and a half and the camber by four
hundredths of a degree. That is the section's real lesson in a second form: **which joint you
soften decides which angle moves.** A bush at the upper ball joint tilts the wheel; a bush in
the tie rod turns it. The model has to name the joint, not just the stiffness.

The ladder is this page's model, recomputed by the figure on every load. The
package's compliant export is vendored at
`docs/assets/data/otkd/models/double-wishbone-compliant/out.js`, but it carries one
stiffness rather than a ladder, and the package **refuses** to compile a kernel for
it: *"a compliant model needs the equilibrium root-find, which is not compiled yet"*.
So the ladder's evidence is still the page's model. When the package reports a
ladder, the table is generated from its sweep, and the two must agree.

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
prints it: 12 mm at the softest setting, 0.06 mm at the stiffest.

The second trap is thinking that "more complex" means "more correct". Which model
answers the question depends on which quantity the tolerance is attached to, and
this chapter has shown two answers twelve times apart. A stiffness you have
to guess is a new source of error, not a removed one — and a model that needs one
should have to earn it by changing the answer the question asked for.

## Going further

:::deeper equilibrium-without-time
