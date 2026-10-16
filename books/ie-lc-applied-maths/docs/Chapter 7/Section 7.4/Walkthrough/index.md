---
title: 7.4 Conical pendulum and banked tracks — Learn
chapter: 7
chapter_title: Circular motion and oscillation
section: '7.4'
section_title: Conical pendulum and banked tracks
tier: H
refs:
- S3
kind: walkthrough
---

# 7.4 Conical pendulum and banked tracks — Learn

**Prerequisites:** Section 3.9, resolving a velocity into components; Section 4.4,
motion on an inclined plane; Section 7.2, centripetal acceleration and force.

**Objectives:** resolve the forces on a conical pendulum; find the speed and the
period of the bob; find the design speed of a banked track; explain why banking
reduces the need for friction.

A centripetal force can be supplied by a force that is not horizontal. A bob on
a string moves in a horizontal circle while the string stays at a fixed angle,
and a car on a banked track is held by a normal reaction that is not vertical.
Both are solved by resolving forces into a vertical direction and a direction
towards the centre.

## The conical pendulum

A **conical pendulum** is a bob on a light string, moving in a horizontal circle.
The string sweeps out a cone, and it makes a constant angle $\theta$ with the
vertical. The bob is at distance $L$ from the point of support, where $L$ is the
length of the string.

The bob moves in a circle whose radius is the horizontal distance from the axis:

$$r = L\sin\theta$$

Two forces act on the bob: the tension $T$ along the string, and the weight $mg$
downwards. The tension has a vertical component and a horizontal component.

- Vertically there is no acceleration, so the vertical components balance:

$$T\cos\theta = mg$$

- Horizontally the bob accelerates towards the centre of its circle, so the
  horizontal component of the tension is the centripetal force:

$$T\sin\theta = \frac{mv^2}{r}$$

Divide the second equation by the first. The tension and the mass both cancel:

$$\tan\theta = \frac{v^2}{gr}$$

This is the key result. It gives the speed for a given angle,

$$v = \sqrt{gr\tan\theta}$$

and the angle for a given speed. The period follows from $v = \dfrac{2\pi r}{T_p}$,
where $T_p$ is the period of the circular motion:

$$T_p = \frac{2\pi r}{v} = 2\pi\sqrt{\frac{r}{g\tan\theta}}
= 2\pi\sqrt{\frac{L\cos\theta}{g}}$$

**Example 1.** A conical pendulum has a string of length $1.2$ m, and the string
makes an angle of $30^\circ$ with the vertical. Find the radius of the circle, the
speed of the bob, and the period.

$$r = L\sin\theta = 1.2 \times \sin 30^\circ = 1.2 \times 0.5 = 0.6\ \text{m}$$

$$v = \sqrt{gr\tan\theta} = \sqrt{9.8 \times 0.6 \times \tan 30^\circ}
= \sqrt{9.8 \times 0.6 \times 0.5774} \approx 1.84\ \text{m/s}$$

$$T_p = 2\pi\sqrt{\frac{L\cos\theta}{g}}
= 2\pi\sqrt{\frac{1.2 \times 0.8660}{9.8}} \approx 2.05\ \text{s}$$

## A banked track

A **banked track** is tilted so that the surface makes an angle $\theta$ with the
horizontal. On a banked track the normal reaction is not vertical; it is
perpendicular to the surface, and so it points inwards as well as upwards.

At one particular speed, called the **design speed**, no friction is needed at
all. The normal reaction alone supplies the centripetal force.

- Vertically there is no acceleration:

$$N\cos\theta = mg$$

- Horizontally the normal reaction supplies the centripetal force:

$$N\sin\theta = \frac{mv^2}{r}$$

Divide the second equation by the first:

$$\tan\theta = \frac{v^2}{gr}$$

So the design speed is

$$v = \sqrt{gr\tan\theta}$$

This is the same equation as the conical pendulum, because the geometry is the
same. The two problems are one problem seen from two directions.

The normal reaction on a banked track is larger than the weight, because it also
turns the car:

$$N = \frac{mg}{\cos\theta}$$

**Example 2.** The chapter-problem bend has radius $150$ m and is banked at
$15^\circ$. Find the design speed, and the normal reaction on the $1200$ kg car
at that speed.

$$v = \sqrt{gr\tan\theta} = \sqrt{9.8 \times 150 \times \tan 15^\circ}
= \sqrt{9.8 \times 150 \times 0.2679} \approx 19.8\ \text{m/s}$$

$$N = \frac{mg}{\cos\theta} = \frac{1200 \times 9.8}{\cos 15^\circ}
= \frac{11760}{0.9659} \approx 12175\ \text{N}$$

At the design speed the friction force is zero. At a higher speed the car tends
to slide outwards and friction acts inwards; at a lower speed it tends to slide
inwards and friction acts outwards.

**Example 3.** A bend of radius $100$ m is to be built so that a car can take it
at $25$ m/s with no friction. Find the angle of the bank.

$$\tan\theta = \frac{v^2}{gr} = \frac{25^2}{9.8 \times 100} = \frac{625}{980}
= 0.6378$$

$$\theta = \arctan 0.6378 \approx 32.5^\circ$$

> **Watch out.** The radius of a conical pendulum is not the length of the
> string. The bob travels in a circle of radius $r = L\sin\theta$, which is
> smaller than $L$ unless the string is horizontal. A common error is to use $L$
> as the radius and get a speed that is too large. A second error is to put the
> sine and the cosine the wrong way round: the vertical component of the tension
> is $T\cos\theta$ and the horizontal component is $T\sin\theta$, because the
> angle is measured from the vertical. On a banked track the normal reaction is
> not $mg$; it is $\dfrac{mg}{\cos\theta}$, which is larger.

## Progress check

Back to the chapter problem. The motorway bend has radius $150$ m and is banked
at $15^\circ$ to the horizontal.

Find the design speed, the speed at which no friction is needed:

$$v = \sqrt{gr\tan\theta} = \sqrt{9.8 \times 150 \times \tan 15^\circ}
= \underline{\hspace{2cm}}\ \text{m/s}$$

Give your answer to three significant figures. Compare it with the $10$ m/s the
car used on the roundabout. Section 7.5 turns to the car's springs, and Section
7.6 to how the car bounces on them.

## You should now be able to

- draw and label the forces on the bob of a conical pendulum;
- use $r = L\sin\theta$ for the radius of the bob's circle;
- resolve the tension into $T\cos\theta$ vertically and $T\sin\theta$ towards the
  centre;
- use $\tan\theta = \dfrac{v^2}{gr}$ for a conical pendulum and for a banked
  track;
- find the speed, the angle or the period of a conical pendulum;
- find the design speed of a banked track;
- explain why no friction is needed at the design speed, and which way friction
  acts at other speeds;
- find the normal reaction on a banked track.
