---
title: 3.8 Time of flight and range — Learn
chapter: 3
chapter_title: Describing motion
section: '3.8'
section_title: Time of flight and range
tier: O
refs:
- S3
kind: walkthrough
---

# 3.8 Time of flight and range — Learn

**Prerequisites:** Section 3.6, the equations of motion derived by calculus;
Section 3.7, resolving a launch velocity.

**Objectives:** find the time of flight of a projectile on level ground; find
its range and its greatest height; use the range formula; explain why the range
depends on $2\theta$.

Section 3.7 found the height of a projectile at a given time. This section finds
how long it stays in the air and how far it travels.

## Time of flight

On level ground, a projectile starts and finishes at the same height. Its
vertical displacement is zero at both moments.

$$y = u_y t - \frac{1}{2}gt^2 = t\left(u_y - \frac{1}{2}gt\right)$$

One root is $t = 0$, the launch. The other is the **time of flight**:

$$T = \frac{2u_y}{g} = \frac{2u\sin\theta}{g}.$$

The projectile spends the same time rising as falling, so the factor $2$ appears.

## Greatest height

At the highest point the vertical velocity is zero. The time to get there is
half the time of flight, $t = \dfrac{u_y}{g}$.

$$H = \frac{u_y^2}{2g} = \frac{u^2\sin^2\theta}{2g}$$

## Range

The **range** is the horizontal distance travelled in the time of flight. The
horizontal velocity is constant, so

$$R = u_x T = u\cos\theta \times \frac{2u\sin\theta}{g}.$$

Using $2\sin\theta\cos\theta = \sin 2\theta$,

$$R = \frac{u^2\sin 2\theta}{g}.$$

**Example 1.** A ball is kicked at $20$ m/s at $30^\circ$ above the horizontal.
Take $g = 9.8$ m/s². Find the time of flight, the greatest height and the range.

The components are $u_x = 17.32$ m/s and $u_y = 10$ m/s.

$$T = \frac{2 \times 10}{9.8} = 2.04\,\text{s}$$

$$H = \frac{10^2}{2 \times 9.8} = 5.10\,\text{m}$$

$$R = 17.32 \times 2.04 = 35.35\,\text{m}$$

The range formula gives the same value:
$R = \dfrac{400\sin 60^\circ}{9.8} = 35.35$ m.

**Example 2.** A ball is kicked at $25$ m/s at $45^\circ$. Find its range.

At $45^\circ$, $\sin 2\theta = \sin 90^\circ = 1$:

$$R = \frac{u^2}{g} = \frac{625}{9.8} = 63.78\,\text{m}$$

**Example 3.** A ball is kicked at $30$ m/s at $20^\circ$. Find its range.

$$R = \frac{u^2\sin 2\theta}{g} = \frac{900 \times \sin 40^\circ}{9.8}
= \frac{900 \times 0.6428}{9.8} = 59.03\,\text{m}$$

> **Watch out.** The time of flight uses the vertical component $u_y$, not the
> full launch speed $u$. At $20$ m/s and $30^\circ$, the time is
> $\dfrac{2 \times 10}{9.8}$, not $\dfrac{2 \times 20}{9.8}$. A second error is
> using the range formula when the projectile does not land at the height it
> started from. A ball thrown off a cliff lands further away, and its time of
> flight must be found from the vertical motion instead.

## Progress check

Back to the chapter problem. The ball is kicked at $20$ m/s at $30^\circ$. Its
components are $u_x = 17.32$ m/s and $u_y = 10$ m/s. Take $g = 9.8$ m/s².

Find the time of flight:

$$T = \frac{2u_y}{g} = \frac{20}{9.8} = \underline{\hspace{2cm}}\,\text{s}$$

Now find the range:

$$R = u_x T = 17.32 \times 2.04 = \underline{\hspace{2cm}}\,\text{m}$$

The time of flight is about $2.04$ s and the range is about $35.35$ m. The ball
lands about $35$ m from the kick, well beyond the $15$ m wall. Section 3.9 looks
at what other launch angles would give.

## You should now be able to

- find the time of flight of a projectile on level ground;
- find its greatest height;
- find its range from the horizontal component and the time of flight;
- use the range formula $R = \dfrac{u^2\sin 2\theta}{g}$;
- say why the range formula needs the projectile to land at its starting height.
