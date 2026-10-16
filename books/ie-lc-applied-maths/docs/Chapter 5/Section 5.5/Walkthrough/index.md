---
title: 5.5 Drag proportional to a power of speed — Learn
chapter: 5
chapter_title: Friction and resistance
section: '5.5'
section_title: Drag proportional to a power of speed
tier: O
refs:
- S3
kind: walkthrough
---

# 5.5 Drag proportional to a power of speed — Learn

**Prerequisites:** Section 4.3, using $F = ma$; Section 4.4, resolving; Section
5.1, what a resistance force does.

**Objectives:** write a drag force that depends on speed; find the resultant
force and the acceleration when drag acts; explain why the acceleration falls
as the speed rises.

Friction between two solids is almost independent of speed. Resistance from air
or water is not: it grows as the object moves faster. This section models that
resistance and uses it in $F = ma$.

## What drag is

**Drag** is a resistance force from a fluid, such as air or water. It acts
opposite to the velocity of the object through the fluid.

Drag has two features that friction between solids does not have.

- It depends on the speed. A faster object meets more drag.
- It reverses when the object reverses. Drag always opposes the velocity.

At low speeds, drag is proportional to the speed. At higher speeds, it is
proportional to the square of the speed. A question states which model to use.

## Writing the drag force

The two models are

$$D = kv \qquad\text{or}\qquad D = kv^2$$

The letter $k$ is a constant that depends on the shape and size of the object,
and on the fluid. It is not a pure number, because the drag must come out in
newtons. Check the units of $k$ for each model.

- For $D = kv$, the unit of $k$ is kg/s. Then kg/s multiplied by m/s gives
  kg m/s², which is the newton.
- For $D = kv^2$, the unit of $k$ is kg/m. Then kg/m multiplied by m²/s² gives
  kg m/s², again the newton.

## The resultant force and the acceleration

Take an object falling. Its weight $mg$ acts downwards and the drag acts
upwards, so the resultant is $mg - D$. Newton's second law gives

$$mg - D = ma$$

With $D = kv$, the acceleration is

$$a = g - \frac{kv}{m}$$

With $D = kv^2$, it is

$$a = g - \frac{kv^2}{m}$$

Now take an object thrown upwards. Its weight and the drag both act downwards,
so

$$mg + D = -ma$$

$$a = -\frac{mg + D}{m}$$

The acceleration is negative, so the object slows down. Its deceleration is
larger than on the way down, because both forces point the same way.

## The acceleration falls as the speed rises

Look at the falling case, $a = g - \dfrac{kv^2}{m}$. At the moment the object
is released, $v = 0$ and the drag is zero, so the acceleration is $g$. As the
object speeds up, the drag grows, and the acceleration falls.

The object still speeds up, but more and more slowly. If it falls far enough,
the drag grows until it equals the weight, the resultant becomes zero, and the
acceleration becomes zero. Section 5.6 takes that final state.

**Example 1.** A ball of mass $2$ kg falls through the air. The drag force is
$5$ N. Find the acceleration. Take $g = 9.8$ m/s².

The weight is $mg = 2 \times 9.8 = 19.6$ N downwards. The drag is 5 N upwards.

$$ma = 19.6 - 5 = 14.6\,\text{N}$$

$$a = \frac{14.6}{2} = 7.3\,\text{m/s}^2$$

The acceleration is 7.3 m/s² downwards, which is less than $g$, because drag
opposes the fall.

**Example 2.** A ball of mass $0.5$ kg is thrown vertically upwards. The drag
force is $2$ N. Find the acceleration, taking the upward direction as positive.
Take $g = 9.8$ m/s².

While the ball rises, the weight and the drag both act downwards:

$$ma = -(mg + D) = -(4.9 + 2) = -6.9\,\text{N}$$

$$a = \frac{-6.9}{0.5} = -13.8\,\text{m/s}^2$$

The acceleration is $-13.8$ m/s². The negative sign means the ball is slowing
down, and the deceleration is larger than on the way down.

**Example 3.** An object falls with $D = kv^2$, where $k = 0.4$ kg/m. Find the
drag at $15$ m/s.

$$D = kv^2 = 0.4 \times 15^2$$

$$D = 0.4 \times 225 = 90\,\text{N}$$

The drag is 90 N. Doubling the speed would multiply the drag by four, because
the drag depends on the square of the speed.

> **Watch out.** Drag depends on the speed, so the acceleration is not constant.
> The equations of motion from Chapter 3, such as $v = u + at$, assume a
> constant acceleration, so they do not apply here. Use $F = ma$ at the speed
> in the question, and find the acceleration at that instant. A second error is
> to forget that drag reverses with the velocity. On the way up, drag acts
> downwards; on the way down, it acts upwards.

## Progress check

Back to the chapter problem. The air resistance on the skier is
$D = kv^2$, with $k = 0.30$ kg/m.

At $10$ m/s, the drag is

$$D = 0.30 \times 10^2 = \underline{\hspace{2cm}}\,\text{N}$$

Compare that with the $224.2$ N resultant along the slope. At $10$ m/s the drag
is small, which is why the acceleration at the start is close to the value from
Section 5.3. As the skier speeds up, the drag grows, and Section 5.6 finds the
speed at which it takes over.

## You should now be able to

- say what drag is, and that it acts opposite to the velocity;
- write a drag force as $D = kv$ or $D = kv^2$, and check the unit of $k$;
- find the resultant force on a falling or a rising object;
- use $F = ma$ to find the acceleration at a given speed;
- explain why the acceleration of a falling object falls as its speed rises;
- explain why the constant-acceleration equations do not apply.
