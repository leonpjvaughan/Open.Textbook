---
title: 16.3 Lenz's law and conservation of energy — Learn
chapter: 16
chapter_title: Electromagnetic induction
section: '16.3'
section_title: Lenz's law and conservation of energy
tier: O
refs:
- '3.6'
kind: walkthrough
---

# 16.3 Lenz's law and conservation of energy — Learn

**Prerequisites:** Faraday's law from Section 16.2; the force on a
current-carrying conductor from Section 15.3; conservation of energy from
Chapter 4.

**Objectives:** state Lenz's law; use it to find the direction of an induced
current; explain the law using conservation of energy.

By the end of this section, you can say which way an induced current flows, and
why the direction is fixed by the need to conserve energy.

## The minus sign in Faraday's law

Faraday's law is written

$$E = -N\frac{\Delta\Phi}{\Delta t}$$

where $E$ is the induced emf, $N$ is the number of turns, $\Delta\Phi$ is the
change in flux through one turn and $\Delta t$ is the time taken.

The minus sign is not a detail. It fixes the **direction** of the induced emf, and
that direction is the subject of Lenz's law.

> **Lenz's law.** The induced current flows in a direction that opposes the change
> that produced it.

The induced current opposes the change in flux, not the flux itself. If the flux
through a coil is increasing, the induced current tries to reduce it. If the flux
is decreasing, the induced current tries to increase it. Either way, the induced
current pushes back against whatever is changing.

## Finding the direction

To find the direction of an induced current, ask two questions in order.

1. **What is the change?** Decide whether the flux through the coil is increasing
   or decreasing.
2. **What would oppose that change?** The induced current must create a magnetic
   field that acts against the change. Then use the right-hand grip rule from
   Section 15.2 to find which way the current flows.

For example, push the north pole of a magnet towards a coil. The flux through the
coil increases. The induced current must make the face of the coil nearest the
magnet into a north pole, so that it repels the approaching magnet. That gives the
direction of the current.

Pull the magnet away instead. The flux now decreases, so the induced current makes
the near face a south pole, which attracts the magnet and tries to hold it back.

## Why the direction is forced: energy

Lenz's law is conservation of energy in disguise.

Suppose the induced current helped the change instead of opposing it. Push a magnet
towards a coil, and the coil would pull the magnet in. The magnet would speed up on
its own, the flux would change faster, the current would grow, and the magnet would
be pulled harder still. The current would grow without limit, and the energy would
come from nothing.

That cannot happen. Because the induced current **opposes** the change, you must do
work to keep the change going. That work is the energy that becomes electrical
energy in the coil. This is the statement in the syllabus that mechanical energy
changes to electrical energy.

## Where you meet it

- **A falling magnet in a copper tube.** The moving magnet induces currents in the
  copper, and those currents oppose the motion. The magnet falls slowly, even
  though copper is not magnetic. The currents are called **eddy currents**, and the
  energy they transfer heats the tube a little.
- **A metal plate swinging between the poles of a magnet.** The plate is braked
  as it cuts the field, because the eddy currents oppose the motion.
- **A generator.** The turbine must do work to turn the coil, because the induced
  current in the coil is in a magnetic field and feels a force that opposes the
  turning. Stop driving the turbine and the generator slows down.

> **Watch out.** The induced current opposes the **change** in flux, not the flux.
> A coil in a steady field carries no induced current at all, however strong the
> field is. Also, Lenz's law does not stop the change. The magnet still moves and
> the flux still changes; the induced current only makes it harder.

**Example.** A side of a generator coil is 0.15 m long and lies at right angles to
a field of flux density 0.20 T. The induced current in the side is 0.50 A.
Calculate the force on the side, and state its direction.

$$
F = BIL = 0.20 \times 0.50 \times 0.15 = 0.015\,\text{N}
$$

where $F$ is the force on the side, $B$ is the flux density, $I$ is the current
and $L$ is the length of the side.

The force opposes the motion of the coil. That is Lenz's law in the form the
turbine feels: the water must push the coil against this force, and the work it
does becomes electrical energy.

## Progress check

Back to the chapter problem. The stream turns the turbine, and the turbine turns
the generator coil. The coil drives a current through the village circuit.

Explain, in two or three sentences, why the falling water must keep doing work on
the turbine for as long as the village uses electricity. Use Lenz's law and the
idea of energy conservation. Then say where the energy that heats the coil and the
cable comes from. Keep your answer: Section 16.5 uses the same argument to explain
why a transmission cable wastes energy.

## You should now be able to

- state Lenz's law and say that the induced current opposes the change in flux;
- work out the direction of an induced current from the change in flux;
- explain Lenz's law using conservation of energy;
- describe one example where an induced current opposes a motion, and say where
  the energy goes.
