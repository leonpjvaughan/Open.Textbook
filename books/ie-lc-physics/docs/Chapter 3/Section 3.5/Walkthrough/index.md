---
title: 3.5 Connected objects and systems — Learn
chapter: 3
chapter_title: Forces and Newton's laws
section: '3.5'
section_title: Connected objects and systems
tier: H
refs:
- '1.2'
kind: walkthrough
---

# 3.5 Connected objects and systems — Learn

**Prerequisites:** $F = ma$ from Section 3.2; the free-body diagram from Section 3.1;
the tension in a cable from Section 3.2.

**Objectives:** find the acceleration of two connected objects; find the tension in
the string or cable between them.

By the end of this section, you can solve a problem about two objects joined together,
by treating them as one system and then as two.

## The two-step method

Two objects joined by a string have the same acceleration, because the string does not
stretch. That fact is what makes the problem solvable.

There are two steps, and they answer two different questions.

1. **Treat the system as one object** to find the acceleration. The string is an
   internal part of the system, so the tension does not appear.
2. **Treat one object on its own** to find the tension. Now the tension is an external
   force on that object, so it appears in the equation.

Take the two objects in a pulley problem: masses $m_1$ and $m_2$, with $m_1$ the
heavier one. For the system, the net force is the difference in the weights, and the
mass being accelerated is the total mass.

$$a = \frac{(m_1 - m_2)g}{m_1 + m_2}$$

where $m_1$ and $m_2$ are the two masses, $g$ the gravitational field strength, $a$
the acceleration and $T$ the tension.

**Example 1.** Masses of 3.0 kg and 1.0 kg hang from a light string over a
frictionless pulley. Calculate the acceleration.

$$
a = \frac{(m_1 - m_2)g}{m_1 + m_2}
$$

$$
a = \frac{(3.0 - 1.0) \times 9.8}{3.0 + 1.0}
$$

$$
a = \frac{2.0 \times 9.8}{4.0} = 4.9\,\text{m/s}^2
$$

The 3.0 kg mass falls and the 1.0 kg mass rises, both at $4.9\,\text{m/s}^2$.

## Finding the tension

Now take one object on its own. The 3.0 kg mass is falling, so its weight is larger
than the tension.

$$m_1g - T = m_1a$$

Rearranged for the tension:

$$T = m_1(g - a)$$

**Example 2.** For the same two masses, calculate the tension in the string.

$$
T = m_1(g - a)
$$

$$
T = 3.0 \times (9.8 - 4.9)
$$

$$
T = 14.7\,\text{N}
$$

Check it on the other mass. The 1.0 kg mass is rising, so the tension is larger than
its weight:

$$T = m_2(g + a) = 1.0 \times (9.8 + 4.9) = 14.7\,\text{N}$$

Both objects give the same tension, which is the check that the working is sound.

> **Watch out.** The tension is **not** equal to the weight of the hanging mass. If it
> were, the resultant force on that mass would be zero and it would not accelerate.
> For the 3.0 kg mass the weight is 29.4 N and the tension is 14.7 N. The other common
> mistake is to use one mass to find the acceleration. Both masses are being
> accelerated, so the total mass goes into step 1.

## The lift and its counterweight

A real lift is balanced by a counterweight, so the motor only has to move the
difference. With the motor off, the heavier side falls.

**Example 3.** The lift of mass 800 kg is connected to a counterweight of mass 600 kg
by a cable over a pulley. Ignore friction. Calculate the acceleration of the lift.

$$
a = \frac{(m_1 - m_2)g}{m_1 + m_2}
$$

$$
a = \frac{(800 - 600) \times 9.8}{800 + 600}
$$

$$
a = \frac{200 \times 9.8}{1400} = 1.4\,\text{m/s}^2
$$

The lift is the heavier side, so the lift descends at $1.4\,\text{m/s}^2$ and the
counterweight rises at the same rate.

**Example 4.** For the same lift and counterweight, calculate the tension in the
cable.

Take the counterweight on its own. It is rising, so the tension is larger than its
weight.

$$
T = m_2(g + a)
$$

$$
T = 600 \times (9.8 + 1.4)
$$

$$
T = 6720\,\text{N}
$$

The tension is less than the weight of the lift, which is 7840 N. That is why the lift
accelerates downwards.

## A train of connected carriages

The same method works when a locomotive pulls carriages along a track. The driving
force accelerates the whole train, so the total mass goes into step 1.

**Example 5.** A locomotive of mass 20000 kg pulls two carriages, each of mass
8000 kg. The driving force is 18000 N. Ignore resistive forces. Calculate the
acceleration.

The total mass is

$$
20000 + 8000 + 8000 = 36000\,\text{kg}
$$

$$
a = \frac{F}{m} = \frac{18000}{36000} = 0.50\,\text{m/s}^2
$$

To find the force in the coupling between the locomotive and the first carriage,
isolate the two carriages. Their total mass is 16000 kg.

$$
F = ma = 16000 \times 0.50 = 8000\,\text{N}
$$

The coupling between the two carriages pulls only the rear carriage, so it carries
half of that force.

## Progress check

Back to the chapter problem. The lift of mass 800 kg and its counterweight of mass
600 kg hang from a cable over a pulley, with the motor off.

Use the two-step method to find the acceleration of the lift and the tension in the
cable. Then say how the tension compares with the weight of the lift, and explain why
the lift moves downwards. Keep your working. The Review brings this together with the
tension while the motor is pulling.

## You should now be able to

- explain why two connected objects have the same acceleration;
- find the acceleration of a connected system from the difference in the weights and
  the total mass;
- find the tension by treating one object on its own, and check it on the other;
- explain why the tension is not equal to the weight of a hanging mass;
- find the force in a coupling between two parts of a moving train.
