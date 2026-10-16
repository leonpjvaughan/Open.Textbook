---
title: 13.2 Coulomb's law — Learn
chapter: 13
chapter_title: Charge and electric fields
section: '13.2'
section_title: Coulomb's law
tier: O
refs:
- '3.1'
kind: walkthrough
---

# 13.2 Coulomb's law — Learn

**Prerequisites:** electric charge and the coulomb from Section 13.1; forces and
Newton's third law from Chapter 3.

**Objectives:** state Coulomb's law; use $F = \dfrac{1}{4\pi\epsilon_0}\dfrac{q_1q_2}{d^2}$;
decide from the signs whether the force attracts or repels; explain the
inverse-square law.

By the end of this section, you can find the force between two point charges and say
which way it points.

## The force between two point charges

In Section 13.1 you saw that two charges push or pull each other. The size of that
force was measured in 1785 by Charles Coulomb. He found a rule that works for
**point charges**: charges that are small compared with the distance between them.

> **Coulomb's law.** The force between two point charges is proportional to the
> product of the charges and inversely proportional to the square of the distance
> between them. It acts along the line joining the charges.

$$F = \frac{1}{4\pi\epsilon_0}\frac{q_1q_2}{d^2}$$

- $F$ is the force on each charge, in newtons (N);
- $q_1$ and $q_2$ are the charges, in coulombs (C);
- $d$ is the distance between the charges, in metres (m);
- $\epsilon_0$ is the **permittivity of free space**,
  $8.85 \times 10^{-12}$ F/m.

The quantity $\dfrac{1}{4\pi\epsilon_0}$ appears so often that it is given its own
symbol, $k$:

$$k = \frac{1}{4\pi\epsilon_0} = 9.0 \times 10^{9}\,\text{N m}^{2}\,\text{C}^{-2}$$

Using $k$ makes the arithmetic shorter, but it is the same law:

$$F = \frac{k\,q_1q_2}{d^2}$$

## Attraction or repulsion

Coulomb's law gives the **size** of the force. The signs of the charges tell you the
direction.

- If the charges have the **same** sign, the force is **repulsive**. Each charge is
  pushed away from the other.
- If the charges have **opposite** signs, the force is **attractive**. Each charge is
  pulled towards the other.

The force acts along the line joining the two charges. Each charge feels a force of
the same size, in the opposite direction. That is Newton's third law: the forces are
a pair.

## An inverse-square law

The force depends on $\dfrac{1}{d^2}$. This is an **inverse-square law**, the same
shape as Newton's law of gravitation from Chapter 6.

- Double the distance, and the force falls to one quarter of its value.
- Triple the distance, and the force falls to one ninth.
- Halve the distance, and the force becomes four times larger.

The charges matter too. Double one charge and the force doubles. Double both and it
becomes four times larger.

**Example 1.** Two point charges of $+2.0\ \mu\text{C}$ and $+3.0\ \mu\text{C}$ are
$0.10$ m apart in air. Calculate the force between them.

First convert the charges to coulombs: $2.0\ \mu\text{C} = 2.0 \times 10^{-6}$ C.

$$
F = \frac{k\,q_1q_2}{d^2}
$$

$$
F = \frac{9.0 \times 10^{9} \times 2.0 \times 10^{-6} \times 3.0 \times 10^{-6}}{(0.10)^2}
$$

$$
F = \frac{5.4 \times 10^{-2}}{1.0 \times 10^{-2}}
$$

$$
F = 5.4\,\text{N}
$$

Both charges are positive, so the force is repulsive.

**Example 2.** A charge of $+4.0\ \mu\text{C}$ and a charge of $-2.0\ \mu\text{C}$
are $0.20$ m apart. Calculate the size of the force between them.

$$
F = \frac{9.0 \times 10^{9} \times 4.0 \times 10^{-6} \times 2.0 \times 10^{-6}}{(0.20)^2}
$$

$$
F = \frac{7.2 \times 10^{-2}}{4.0 \times 10^{-2}}
$$

$$
F = 1.8\,\text{N}
$$

The charges have opposite signs, so the force is attractive.

**Example 3.** Two equal charges of $+2.0\ \mu\text{C}$ each repel with a force of
$0.90$ N. Calculate the distance between them.

Rearranging $F = \dfrac{kq_1q_2}{d^2}$ for the distance:

$$
d = \sqrt{\frac{k\,q_1q_2}{F}}
$$

$$
d = \sqrt{\frac{9.0 \times 10^{9} \times 2.0 \times 10^{-6} \times 2.0 \times 10^{-6}}{0.90}}
$$

$$
d = \sqrt{0.040}
$$

$$
d = 0.20\,\text{m}
$$

:::figure coulomb-force

**Predict, then test.** Before you move the slider, write down what you expect the
force to be when the two charges are $0.20$ m apart. Then set the separation to
$0.20$ m and check. Now double the separation to $0.40$ m and describe what happens
to the force. **Explain** why the curve is so steep at small separations and so flat
at large ones.

## Comparing the electric and gravitational forces

Both laws are inverse-square, and both act at a distance. Two things are different.

- Gravity only attracts, because mass has one kind. The electric force can attract
  or repel, because charge has two kinds.
- For particles such as an electron and a proton, the electric force is enormously
  stronger than the gravitational force between them.

Large bodies such as planets are almost neutral. Their positive and negative charges
nearly cancel, so their electric forces are tiny. Gravity has no such cancellation,
which is why gravity shapes the Solar System.

> **Watch out.** Two traps catch most mistakes here. First, the charges must be in
> **coulombs**, not microcoulombs: $2.0\ \mu\text{C}$ is $2.0 \times 10^{-6}$ C, and
> forgetting the $10^{-6}$ makes the answer a million times too large. Second, $d$
> is the distance **between the centres**, not the gap between the surfaces. Use the
> magnitudes in the formula, and then decide from the signs whether the force
> attracts or repels.

## Progress check

Back to the chapter problem. Two ink drops each carry a charge of
$-2.0 \times 10^{-12}$ C, and they pass $1.0$ mm apart.

1. Calculate the size of the force between the two drops.
2. State whether the force attracts or repels them, and say how you know.

Keep your answers. Section 13.4 finds the much larger force that the steering plates
put on one drop, and you will compare the two there.

## You should now be able to

- state Coulomb's law and say what each symbol means, with its unit;
- use $F = \dfrac{kq_1q_2}{d^2}$ to find a force, a charge or a distance;
- decide from the signs of the charges whether the force attracts or repels;
- explain what an inverse-square law means, and find the effect of changing the
  distance or the charges;
- convert microcoulombs to coulombs before substituting;
- compare the electric force with the gravitational force.
