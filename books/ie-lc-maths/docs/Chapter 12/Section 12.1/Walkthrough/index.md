---
title: 12.1 The trigonometric ratios in a right triangle — Learn
chapter: 12
chapter_title: Trigonometry
section: '12.1'
section_title: The trigonometric ratios in a right triangle
tier: F
refs:
- '2.3'
kind: walkthrough
---

# 12.1 The trigonometric ratios in a right triangle — Learn

**Prerequisites:** naming the sides of a triangle; rounding a decimal; a calculator in
degree mode.

**Objectives:** name the opposite, the adjacent and the hypotenuse; write down the three
ratios; use a ratio to find a missing side or angle.

By the end of this section you can choose the correct ratio for a right triangle and use
it to find what the question asks for.

## Naming the sides

A **right triangle** contains one angle of $90^\circ$. Choose one of the other two angles
and call it $\theta$. The three sides then have names that depend on $\theta$.

- The **hypotenuse** is the longest side. It lies opposite the right angle.
- The **opposite** is the side opposite the angle $\theta$.
- The **adjacent** is the side next to $\theta$ that is not the hypotenuse.

The opposite and the adjacent swap over when you choose the other angle. So name the
sides **after** you have marked $\theta$ on the diagram.

## The three ratios

Draw two right triangles with the same angle $\theta$ but different sizes. Measure the
opposite and the hypotenuse in each, and divide. The two answers are equal. This is the
fact the whole chapter rests on.

> **The trigonometric ratios.** For an angle $\theta$ in a right triangle,
>
>
> $$\sin\theta = \frac{\text{opposite}}{\text{hypotenuse}} \qquad
> \cos\theta = \frac{\text{adjacent}}{\text{hypotenuse}} \qquad
> \tan\theta = \frac{\text{opposite}}{\text{adjacent}}$$

The three initials spell **SOH CAH TOA**, which is how most people remember them.

Each ratio depends only on the angle. It does not depend on the size of the triangle,
which is why a small drawing can answer a question about a tall cliff.

**Example 1.** A right triangle has opposite $3$ cm, adjacent $4$ cm and hypotenuse
$5$ cm. Write down $\sin\theta$, $\cos\theta$ and $\tan\theta$.

$$\sin\theta = \frac{3}{5} = 0.6 \qquad \cos\theta = \frac{4}{5} = 0.8 \qquad \tan\theta = \frac{3}{4} = 0.75$$

Check: $\dfrac{\sin\theta}{\cos\theta} = \dfrac{0.6}{0.8} = 0.75$, which is $\tan\theta$.
That is always true, and Section 12.8 explains why.

## Finding a side

Mark the side you know, the side you want and the angle. That tells you which ratio to
use.

**Example 2.** In a right triangle, the angle is $35^\circ$ and the side opposite it is
$7$ cm. Find the hypotenuse.

The two sides involved are the opposite and the hypotenuse, so use sine.

$$\sin 35^\circ = \frac{7}{h}$$

Multiply both sides by $h$, then divide by $\sin 35^\circ$:

$$h = \frac{7}{\sin 35^\circ} = \frac{7}{0.5736} = 12.2 \text{ cm (to 3 s.f.)}$$

The hypotenuse is longer than the opposite side, which is a quick check on the answer.

**Example 3.** A ladder makes an angle of $40^\circ$ with the ground. The ladder is
$12$ m long. How high up the wall does it reach?

The height is opposite the $40^\circ$ angle and the ladder is the hypotenuse, so use
sine.

$$h = 12 \sin 40^\circ = 12 \times 0.6428 = 7.71 \text{ m (to 3 s.f.)}$$

The height is smaller than the ladder, as it must be.

## Finding an angle

When you know two sides and want the angle, use the **inverse** ratio. On a calculator
this is written $\sin^{-1}$, $\cos^{-1}$ or $\tan^{-1}$.

**Example 4.** In a right triangle, the side opposite $\theta$ is $5$ cm and the adjacent
side is $8$ cm. Find $\theta$.

$$\tan\theta = \frac{5}{8} = 0.625$$

$$\theta = \tan^{-1}(0.625) = 32.0^\circ \text{ (to 3 s.f.)}$$

The angle is less than $45^\circ$, which fits: the opposite side is shorter than the
adjacent side, so the angle is smaller than the equal-side case.

> **Watch out.** Two mistakes are common here. The first is choosing the wrong ratio:
> $5$ and $8$ are the opposite and the adjacent, so the ratio is tangent, not sine. The
> second is leaving the calculator in radian mode, which gives $\theta = 0.56$ instead
> of $32.0^\circ$.
>
> **Re-check:** cover the ratio you chose and name the two sides it uses out loud. Then
> check that the calculator shows **DEG** at the top of the screen.

## Progress check

Back to the chapter problem. The Coast Guard station stands on a cliff $60$ m above the
sea. A marker buoy lies at sea level, and the angle of depression from the station to
the buoy is $9^\circ$.

The angle of depression is measured down from the horizontal. The angle inside the
triangle at the top of the cliff is also $9^\circ$, because it is alternate to it.

Use the tangent ratio to find the horizontal distance $x$ from the foot of the cliff to
the buoy:

$$\tan 9^\circ = \frac{60}{x}$$

You will need a calculator. Keep the answer; Section 12.2 uses it to find the direct
distance from the station to the buoy.

## You should now be able to

- name the opposite, the adjacent and the hypotenuse for a chosen angle;
- write down the three ratios, and say which one to use from the sides you have;
- find a missing side by multiplying or dividing;
- find a missing angle with an inverse ratio;
- check that the calculator is in degree mode.
