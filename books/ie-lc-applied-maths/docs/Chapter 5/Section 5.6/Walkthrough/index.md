---
title: 5.6 Terminal velocity — Learn
chapter: 5
chapter_title: Friction and resistance
section: '5.6'
section_title: Terminal velocity
tier: H
refs:
- S3
kind: walkthrough
---

# 5.6 Terminal velocity — Learn

**Prerequisites:** Section 5.5, drag proportional to a power of speed; Section
5.3, motion on a rough plane; Section 4.3, using $F = ma$.

**Objectives:** define terminal velocity; find a terminal velocity for $D = kv$
and for $D = kv^2$; find the terminal speed on a rough slope; explain how the
speed approaches its terminal value.

Section 5.5 ended with a question. If the drag grows with speed, what happens if
the object falls far enough? This section answers it. The speed stops rising,
and that final speed has a name.

## What terminal velocity is

**Terminal velocity** is the constant speed an object reaches when the resultant
force on it is zero.

When the resultant is zero, Newton's second law gives $a = 0$. The object keeps
moving, but its speed does not change. For a falling object, the drag has grown
until it balances the weight:

$$mg = D$$

The object is not at rest, and the forces on it have not disappeared. They
balance, which is why the speed is steady.

## Falling under D = kv

With $D = kv$, the balance at the terminal speed $v_T$ is

$$mg = kv_T$$

Divide both sides by $k$:

$$v_T = \frac{mg}{k}$$

A larger $k$ means more drag at a given speed, so the terminal speed is smaller.

## Falling under D = kv²

With $D = kv^2$, the balance is

$$mg = kv_T^2$$

Divide both sides by $k$ and take the square root:

$$v_T = \sqrt{\frac{mg}{k}}$$

Doubling the mass increases the terminal speed by a factor of $\sqrt{2}$. A
parachute works by making $k$ large, which makes $v_T$ small.

## Terminal speed on a rough slope

On a slope, the object does not need to fall vertically. The driving force down
the slope is the component of the weight, and friction takes part of it. At the
terminal speed, the drag makes up the rest:

$$mg\sin\theta - \mu mg\cos\theta = kv_T^2$$

$$v_T = \sqrt{\frac{mg\sin\theta - \mu mg\cos\theta}{k}}$$

The numerator is the resultant force from Section 5.3, the force that would
accelerate the object if there were no drag. The drag eats into that resultant
as the speed rises, until nothing is left.

## How the speed approaches the terminal value

At the instant an object is released, $v = 0$, so the drag is zero and the
acceleration is at its largest. As the speed grows, the drag grows and the
acceleration falls. The speed gets closer and closer to $v_T$, and the
acceleration gets closer and closer to zero.

The object never passes $v_T$. If it moved faster than $v_T$, the drag would
exceed the driving force, the resultant would point backwards, and the object
would slow down again.

**Example 1.** An object of mass $0.5$ kg falls with $D = kv$, where
$k = 0.25$ kg/s. Find its terminal velocity. Take $g = 9.8$ m/s².

At the terminal speed the drag balances the weight:

$$mg = kv_T$$

$$v_T = \frac{mg}{k} = \frac{0.5 \times 9.8}{0.25}$$

$$v_T = \frac{4.9}{0.25} = 19.6\,\text{m/s}$$

The terminal velocity is 19.6 m/s.

**Example 2.** A skydiver of mass $80$ kg falls with $D = kv^2$, where
$k = 0.2$ kg/m. Find the terminal velocity, to four significant figures. Take
$g = 9.8$ m/s².

$$mg = kv_T^2$$

$$v_T = \sqrt{\frac{mg}{k}} = \sqrt{\frac{80 \times 9.8}{0.2}}$$

$$v_T = \sqrt{3920} = 62.61\,\text{m/s}$$

The terminal velocity is 62.61 m/s, about 225 km/h. A parachute raises $k$ and
brings this speed down to something safe.

**Example 3.** A skier of mass $70$ kg goes down a slope inclined at
$30^\circ$. The coefficient of friction is $0.2$ and the drag is $D = kv^2$ with
$k = 0.3$ kg/m. Find the terminal speed, to four significant figures. Take
$g = 9.8$ m/s².

The driving force down the slope is the weight component minus friction:

$$mg\sin 30^\circ = 70 \times 9.8 \times 0.5 = 343\,\text{N}$$

$$\mu mg\cos 30^\circ = 0.2 \times 70 \times 9.8 \times 0.8660 = 118.8\,\text{N}$$

The resultant is $343 - 118.8 = 224.2$ N. At the terminal speed the drag
supplies exactly this balance:

$$0.3v_T^2 = 224.2$$

$$v_T^2 = \frac{224.2}{0.3} = 747.3$$

$$v_T = \sqrt{747.3} = 27.34\,\text{m/s}$$

The terminal speed is 27.34 m/s, about 98 km/h.

> **Watch out.** At terminal velocity the forces on the object balance, but they
> are still there. The weight still pulls down and the drag still pushes up. A
> common error is to say the object has no forces on it, or that gravity has
> stopped. A second error is to use $mg = D$ for an object on a slope. On a
> slope the driving force is $mg\sin\theta$, and friction takes part of it
> first. Write the resultant from Section 5.3, and set the drag equal to that.

## Progress check

Back to the chapter problem. The resultant force on the skier along the slope is
$224.2$ N, and the drag is $D = 0.30v^2$.

At the terminal speed, the drag equals that resultant:

$$0.30v^2 = 224.2$$

$$v^2 = \frac{224.2}{0.30} = \underline{\hspace{2cm}}$$

$$v = \underline{\hspace{2cm}}\,\text{m/s}$$

That is the fastest the skier can go on this slope. Section 5.6 has answered the
last question of the chapter problem.

## You should now be able to

- define terminal velocity as the speed when the resultant force is zero;
- explain why the acceleration is zero at the terminal speed;
- find the terminal velocity for $D = kv$ from $v_T = \dfrac{mg}{k}$;
- find the terminal velocity for $D = kv^2$ from
  $v_T = \sqrt{\dfrac{mg}{k}}$;
- find the terminal speed on a rough slope, with friction in the balance;
- explain how the speed approaches the terminal value without passing it.
