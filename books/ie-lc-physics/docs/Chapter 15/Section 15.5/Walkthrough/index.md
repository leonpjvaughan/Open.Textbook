---
title: 15.5 The electric motor — Learn
chapter: 15
chapter_title: Magnetism and the force on a current
section: '15.5'
section_title: The electric motor
tier: O
refs:
- '3.5'
kind: walkthrough
---

# 15.5 The electric motor — Learn

**Prerequisites:** the force on a current-carrying conductor from Section 15.3;
Fleming's left-hand rule from Section 15.3.

**Objectives:** explain how the forces on a coil produce a turning effect; state the
function of the split-ring commutator; describe how to increase the turning effect;
describe the energy transfers in a motor.

By the end of this section, you can explain how a current makes a coil turn, and why
the commutator has to reverse the current.

## The turning effect on a coil

Put a rectangular coil of wire in a magnetic field and send a current through it. The
current flows one way along one side of the coil and the opposite way along the other
side.

The field is the same for both sides, so $F = BIl$ gives the same size of force on
each side, but the forces point in opposite directions. The two opposite forces act on
opposite sides of the axis, so together they produce a **turning effect** that rotates
the coil. A pair of equal, opposite forces like this is called a **couple**.

**Example 1.** A motor coil has 40 turns. The side of the coil in the field is 3.0 cm
long, the flux density is 0.20 T, and the current is 0.50 A. Calculate the force on one
side of one turn, and the total force on that side of the coil.

$$
F = BIl = 0.20 \times 0.50 \times 0.030 = 3.0 \times 10^{-3}\,\text{N}
$$

Every turn carries the same current, so the 40 turns add their forces:

$$
F_{\text{total}} = 40 \times 3.0 \times 10^{-3} = 0.12\,\text{N}
$$

## Why the coil stops without a commutator

Suppose the current always flows the same way around the coil. As the coil turns, the
forces keep pointing the same way in space, and the coil turns through a quarter of a
turn. Then it reaches the position where its plane is at right angles to the field.

At that position the forces on the two sides act along the same line through the axis.
They still pull, but they no longer produce a turning effect, so the coil stops. If it
overshoots, the forces now push it back the way it came, and it would swing to and fro
instead of turning.

## The split-ring commutator

A real motor solves this with a **split-ring commutator**. It is a ring cut into two
half-rings, attached to the ends of the coil, with two fixed contacts called
**brushes** pressing against it.

Every half turn, the gap between the half-rings passes the brushes, and the connections
swap over. That **reverses the direction of the current in the coil** at exactly the
moment the coil passes through the vertical. Reversing the current reverses the force
on each side, so the forces now push the coil on round the same way as before.

The result is that the coil keeps turning in one direction instead of stopping. That is
the whole job of the commutator, and it is why a direct-current motor can run
continuously.

**Example 2.** A motor coil is carrying a current of 0.20 A. The current is doubled to
0.40 A. State what happens to the force on each side of the coil.

The force is proportional to the current, so doubling the current doubles the force on
each side, and the turning effect doubles.

## Making the turning effect larger

Four changes increase the turning effect on the coil.

- Use a **stronger magnet**, so the flux density $B$ is larger.
- Increase the **current** $I$.
- Increase the **number of turns** $N$ on the coil, because every turn adds its force.
- Make the coil **longer** in the field, so $l$ is larger.

A practical motor uses all four: many turns of copper wire, several coils, a strong
magnet, and a current as large as the wire can carry without overheating.

## Energy transfers in a motor

A motor transfers energy from a battery or a power supply to the turning coil. The
useful output is kinetic energy, and some of the input is always transferred as heat in
the coil, because the coil has resistance.

**Example 3.** A small motor draws a current of 0.25 A from a 3.0 V supply. Calculate
the power it uses and the energy it transfers in 60 s.

$$
P = VI = 3.0 \times 0.25 = 0.75\,\text{W}
$$

$$
E = Pt = 0.75 \times 60 = 45\,\text{J}
$$

Some of that 45 J turns the coil and some warms it. That is why a motor gets warm when
it has been running for a while.

> **Watch out.** The commutator does not make the coil turn; the magnetic force does.
> The commutator only reverses the current, so that the same force keeps pushing the
> coil round. A second trap is to think the force on the two sides is unequal because
> the coil is turning. The two forces are the same size and opposite in direction, and
> that is exactly what makes the coil rotate rather than move away.

:::figure dc-motor

**Predict, then test.** Before you move the angle slider, write down what you expect
the current in each side of the coil to do as the coil turns. Then turn the coil slowly
through a full turn and watch the current and the force on each side. **Explain** what
the commutator is doing at the moment the current reverses.

## Progress check

Back to the chapter problem. The force on one side of the fan's coil is
$3.8 \times 10^{-2}$ N, and the force on the other side is the same size in the
opposite direction.

Explain why the two forces make the coil turn rather than move away. Then say why the
coil would stop after half a turn without a commutator, and what the commutator does
about it. Finally state two changes that would make the fan turn faster.

## You should now be able to

- explain why the two sides of a coil in a magnetic field are pushed in opposite
  directions, and why that makes the coil turn;
- explain why the coil would stop after half a turn without a commutator;
- state the function of the split-ring commutator and the brushes;
- name four changes that increase the turning effect on a motor coil;
- describe the energy transfers in a motor, and say why it gets warm.
