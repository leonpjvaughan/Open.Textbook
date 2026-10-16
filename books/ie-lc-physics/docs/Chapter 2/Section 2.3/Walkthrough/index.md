---
title: 2.3 The equations of motion for constant acceleration — Learn
chapter: 2
chapter_title: Describing motion
section: '2.3'
section_title: The equations of motion for constant acceleration
tier: O
refs:
- '1.1'
kind: walkthrough
---

# 2.3 The equations of motion for constant acceleration — Learn

**Prerequisites:** displacement, velocity and acceleration (Section 2.1); reading the
gradient and the area of a velocity-time graph (Section 2.2).

**Objectives:** use the four equations of motion for constant acceleration; choose the
equation that fits the quantities you are given.

By the end of this section, you can solve a constant-acceleration problem from any three
of the five quantities.

## The five quantities

Every straight-line problem with constant acceleration uses five quantities. Learn the
symbols, because the equations are written in them.

| Symbol | Quantity | Unit |
|---|---|---|
| $u$ | initial velocity | m/s |
| $v$ | final velocity | m/s |
| $a$ | acceleration | m/s$^2$ |
| $s$ | displacement | m |
| $t$ | time | s |

The acceleration is **constant** throughout. That is the condition for using these
equations, and it is the first thing to check in a question.

## The four equations

$$v = u + at$$

$$s = ut + \frac{1}{2}at^2$$

$$v^2 = u^2 + 2as$$

$$s = \frac{u + v}{2}\,t$$

Each equation leaves out one of the five quantities. That is the key to choosing one.

| Missing quantity | Equation to use |
|---|---|
| $s$ | $v = u + at$ |
| $v$ | $s = ut + \frac{1}{2}at^2$ |
| $t$ | $v^2 = u^2 + 2as$ |
| $a$ | $s = \dfrac{u + v}{2}\,t$ |

**Example 1.** A car starts from rest and accelerates at 2.5 m/s$^2$ for 6.0 s. Calculate
its final velocity.

You are given $u = 0$, $a = 2.5$ and $t = 6.0$, and you want $v$. Use $v = u + at$.

$$
v = 0 + 2.5 \times 6.0 = 15\,\text{m/s}
$$

**Example 2.** The same car travels from rest at 2.5 m/s$^2$ for 6.0 s. Calculate the
distance it covers.

Now you want $s$, and you are given $u$, $a$ and $t$. Use $s = ut + \frac{1}{2}at^2$.

$$
s = 0 + \frac{1}{2} \times 2.5 \times 6.0^2 = 45\,\text{m}
$$

**Example 3.** A train travelling at 30 m/s brakes to rest with a deceleration of
2.0 m/s$^2$. Calculate the distance it travels while stopping.

You are given $u = 30$, $v = 0$ and $a = -2.0$, and you want $s$. The time is not given,
so use $v^2 = u^2 + 2as$.

$$
0 = 30^2 + 2 \times (-2.0) \times s
$$

$$
s = \frac{30^2}{2 \times 2.0} = 225\,\text{m}
$$

**Example 4.** A car speeds up steadily from 6.0 m/s to 14 m/s in 8.0 s. Calculate the
distance it travels.

You are given $u$, $v$ and $t$, and you want $s$. Use $s = \dfrac{u + v}{2}\,t$.

$$
s = \frac{6.0 + 14}{2} \times 8.0 = 80\,\text{m}
$$

> **Watch out.** The equations need a **constant** acceleration, and the value of $a$
> must have the right sign. Two common slips: using $u$ where the equation wants $v$, and
> putting a deceleration into the equation as a positive number. Write down $u$, $v$,
> $a$, $s$ and $t$ with their signs before you choose an equation, and the sign takes care
> of itself.

## Progress check

Back to the chapter problem. The drone starts from rest and accelerates upwards at
2.0 m/s$^2$ for 4.0 s.

Write down the four quantities you know, then choose the equation that gives the height
risen. Calculate the height, with its unit. You should find $16\,\text{m}$.

Section 2.2 found the same displacement from the area under a graph. The two methods
agree, and Section 2.5 shows why the equations come from the graph.

## You should now be able to

- state the five quantities and their units;
- write down the four equations of motion for constant acceleration;
- choose an equation by the quantity it leaves out;
- solve a constant-acceleration problem from any three of the five quantities, with the
  correct sign on the acceleration.
