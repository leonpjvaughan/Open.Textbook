---
title: 4.6 Pulleys — Learn
chapter: 4
chapter_title: Forces and Newton's laws
section: '4.6'
section_title: Pulleys
tier: O
refs:
- S3
kind: walkthrough
---

# 4.6 Pulleys — Learn

**Prerequisites:** Section 4.4, resolving the weight on a slope; Section 4.5,
writing an equation for each of two connected particles.

**Objectives:** describe what a pulley does; solve a pulley problem with a mass
on a table; solve a pulley problem with a mass on a slope; find the hanging mass
needed for equilibrium.

A **pulley** is a wheel over which a string runs. It lets a hanging mass pull a
mass that is on a table or a slope. This section puts together everything so
far, and it resolves the chapter problem.

## What a pulley does

A smooth pulley changes the **direction** of the string. It does not change the
tension, so the string pulls both bodies with the same force $T$.

That single idea turns the problem into two simpler ones: one body moves
horizontally or along a slope, and the other moves vertically. Write $F = ma$
for each, and add the equations.

## A mass on a table joined to a hanging mass

Let a mass $m_1$ sit on a smooth horizontal table, joined by a light string over
a smooth pulley to a hanging mass $m_2$. The hanging mass drives the system.

- The driving force is the hanging weight, $m_2 g$.
- The total mass moved is $m_1 + m_2$.

So

$$a = \frac{m_2 g}{m_1 + m_2}$$

The tension follows from the table mass, because the tension is the only
horizontal force on it:

$$T = m_1 a$$

**Example 1.** A mass of $5$ kg rests on a smooth table. A string from it passes
over a smooth pulley and carries a hanging mass of $3$ kg. Find the acceleration
and the tension. Take $g = 9.8$ m/s².

The driving force is the hanging weight:

$$m_2 g = 3 \times 9.8 = 29.4\,\text{N}$$

The total mass is $5 + 3 = 8$ kg.

$$a = \frac{29.4}{8}$$

$$a = 3.675\,\text{m/s}^2$$

The tension comes from the table mass:

$$T = m_1 a$$

$$T = 5 \times 3.675$$

$$T = 18.375\,\text{N}$$

The acceleration is 3.675 m/s², and the tension is 18.375 N.

## A mass on a slope joined to a hanging mass

Now let the mass $m_1$ sit on a smooth plane inclined at $\theta$, joined by a
light string up the slope, over a smooth pulley, to a hanging mass $m_2$.

Two forces now pull against each other along the string:

- the hanging weight, $m_2 g$, pulling the mass up the slope;
- the component of the slope mass's weight down the slope, $m_1 g\sin\theta$.

The resultant driving force is the difference, and the total mass moved is
$m_1 + m_2$.

$$a = \frac{m_2 g - m_1 g\sin\theta}{m_1 + m_2}$$

The sign of the numerator tells you which way the system moves. If it is
positive, the hanging mass falls and the slope mass moves up. If it is negative,
the slope mass slides down and the hanging mass rises.

## Equilibrium

The system is in **equilibrium** when the two pulls balance:

$$m_2 g = m_1 g\sin\theta$$

The $g$ cancels from both sides:

$$m_2 = m_1\sin\theta$$

**Example 2 (the chapter problem).** A crate of mass $20$ kg rests on a smooth
ramp inclined at $30^\circ$. A light rope from the crate runs up the ramp, over
a smooth pulley at the top, and carries a hanging mass of $15$ kg. Find the
acceleration and the tension. Take $g = 9.8$ m/s².

The hanging weight is

$$15 \times 9.8 = 147\,\text{N}$$

The component of the crate's weight down the ramp is

$$20 \times 9.8 \times \sin 30^\circ = 196 \times 0.5 = 98\,\text{N}$$

The hanging weight is larger, so the crate moves up the ramp. The resultant is

$$147 - 98 = 49\,\text{N}$$

The total mass moved is $20 + 15 = 35$ kg.

$$a = \frac{49}{35}$$

$$a = 1.4\,\text{m/s}^2$$

For the tension, use the hanging mass. It accelerates downwards, so

$$m_2 g - T = m_2 a$$

$$147 - T = 15 \times 1.4$$

$$147 - T = 21$$

$$T = 126\,\text{N}$$

Check with the crate. It accelerates up the ramp, so

$$T - 98 = 20 \times 1.4$$

$$T - 98 = 28$$

$$T = 126\,\text{N}$$

Both checks give 126 N.

The acceleration is 1.4 m/s², with the crate moving up the ramp, and the tension
is 126 N. The prediction you made at the start of the chapter was correct if you
said the hanging mass would win.

> **Watch out.** The most common error is to forget the component of the slope
> mass's weight. The crate's full weight of 196 N does not pull down the ramp;
> only 98 N of it does. A second error is to use only one mass in the
> denominator. Both bodies move, so the total mass is $m_1 + m_2$. If you get an
> acceleration larger than $g$, one of these two errors is the cause.

## Progress check

Back to the chapter problem one last time. You have found $a = 1.4$ m/s² and
$T = 126$ N. Check both against the two separate equations.

- Crate: $T - 98 = 126 - 98 = 28$ N, and $20a = 20 \times 1.4 = 28$ N.
- Hanging mass: $147 - T = 147 - 126 = 21$ N, and $15a = 15 \times 1.4 = 21$ N.

Both balance. Now change one thing: what hanging mass would keep the crate in
equilibrium? Use $m_2 = m_1\sin 30^\circ = 20 \times 0.5 = 10$ kg. With 10 kg on
the end, the two pulls are equal and the system stays still.

## You should now be able to

- say what a smooth pulley does to the direction and the tension of a string;
- find the acceleration of a mass on a table joined to a hanging mass;
- find the acceleration of a mass on a slope joined to a hanging mass;
- use the sign of the resultant to say which way the system moves;
- find the tension, and check it with the second body;
- find the hanging mass needed for equilibrium.
