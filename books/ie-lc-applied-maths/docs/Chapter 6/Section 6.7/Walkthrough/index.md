---
title: 6.7 Successive collisions and rebounds — Learn
chapter: 6
chapter_title: Momentum, impulse and collisions
section: '6.7'
section_title: Successive collisions and rebounds
tier: H
refs:
- S3
kind: walkthrough
---

# 6.7 Successive collisions and rebounds — Learn

**Prerequisites:** Section 6.4, the coefficient of restitution; Section 6.5,
elastic and inelastic collisions; Section 6.1, impulse.

**Objectives:** find the speed and height after any number of bounces; sum the
geometric series for the total distance; follow a chain of collisions; find the
impulse at a rebound.

A ball dropped on the floor does not stop after one bounce. It bounces again,
lower each time, and after a while it stops. A row of balls in a line passes the
motion along. This section follows the pattern through as many impacts as you
like, and shows that the total is finite.

## Repeated bounces

Each bounce multiplies the speed by the coefficient of restitution $e$. If the
ball hits the floor at speed $u$, then

- after the first bounce the speed is $ue$;
- after the second bounce it is $ue^2$;
- after $n$ bounces it is $ue^n$.

The height depends on the square of the speed, so the height multiplies by $e^2$
each time. A ball dropped from height $h$ rebounds to

$$h_1 = he^2, \qquad h_2 = he^4, \qquad h_n = he^{2n}$$

**Example 1.** A ball hits the floor at $10$ m/s. The coefficient of restitution
is $0.7$. Find the speed with which it hits the floor on the next three bounces.

$$10 \times 0.7 = 7\,\text{m/s}$$

$$10 \times 0.7^2 = 4.9\,\text{m/s}$$

$$10 \times 0.7^3 = 3.43\,\text{m/s}$$

The speeds fall quickly, because $0.7$ is less than $1$.

**Example 2.** A ball is dropped from a height of $2$ m. The coefficient of
restitution is $0.5$. Find the height after the first and second bounces.

$$h_1 = 2 \times 0.5^2 = 0.5\,\text{m}$$

$$h_2 = 2 \times 0.5^4 = 0.125\,\text{m}$$

Each bounce reaches one quarter of the previous height.

## The total distance travelled

The first fall is a distance $h$. Each bounce after that covers a rise and a
fall, both of the same height, so the distance for the $n$th bounce is $2h_n$.
The total distance $D$ is therefore

$$D = h + 2he^2 + 2he^4 + 2he^6 + \cdots$$

The terms after the first form a geometric series with first term $2he^2$ and
common ratio $e^2$. Because $e < 1$, the ratio is less than $1$, and the series
has a finite sum:

$$D = h + \frac{2he^2}{1 - e^2} = h\left(1 + \frac{2e^2}{1 - e^2}\right)$$

**Example 3.** A ball is dropped from a height of $2$ m. The coefficient of
restitution is $0.5$. Find the total distance it travels before it stops.

$$D = 2\left(1 + \frac{2 \times 0.25}{1 - 0.25}\right)
= 2\left(1 + \frac{0.5}{0.75}\right) = 2\left(1 + \frac{2}{3}\right)
= \frac{10}{3} \approx 3.33\,\text{m}$$

The ball travels $3.33$ m in total, even though it bounces for ever in the
model. The distances shrink quickly enough for the total to be finite.

## A chain of collisions

The same idea applies to a row of bodies. Each collision passes some of the
motion along to the next body.

For two equal masses with one at rest and coefficient of restitution $e$, the
struck body moves off at

$$v = \frac{u(1 + e)}{2}$$

**Example 4.** A ball of mass $2$ kg moving at $6$ m/s hits a stationary ball of
mass $2$ kg. The coefficient of restitution is $0.5$. The struck ball then hits a
third stationary ball of mass $2$ kg, again with coefficient of restitution
$0.5$. Find the speed of each struck ball.

After the first collision, the second ball moves at

$$v_2 = \frac{6 \times (1 + 0.5)}{2} = \frac{6 \times 1.5}{2} = 4.5\,\text{m/s}$$

After the second collision, the third ball moves at

$$v_3 = \frac{4.5 \times 1.5}{2} = 3.375\,\text{m/s}$$

The speed falls at each collision, because kinetic energy is lost each time.

## The impulse at a rebound

At a rebound the velocity reverses, so the change in momentum is larger than a
simple stop.

**Example 5.** A test car of mass $1200$ kg hits a barrier at $15$ m/s and
rebounds at $6$ m/s. Find the impulse $J$ on the car.

Take the direction towards the barrier as positive. The velocity changes from
$+15$ m/s to $-6$ m/s:

$$J = 1200 \times (-6 - 15) = 1200 \times (-21) = -25200\,\text{N s}$$

The impulse is $25200$ N s away from the barrier. A rebound gives a larger
impulse than a stop, because the momentum reverses.

> **Watch out.** The total distance travelled by a bouncing ball counts the
> first fall once and every later bounce twice, once up and once down. A common
> error is to count only the rises, or to forget the first fall. A second error
> is to use the speed ratio for the heights. The speed multiplies by $e$ each
> bounce, but the height multiplies by $e^2$, because the height depends on the
> square of the speed. A third error is to expect the ball to stop after a few
> bounces in the model: it bounces for ever, but the total distance is finite.

## Progress check

Back to the chapter problem. The centre also runs a barrier test. The car hits
the barrier at $15$ m/s and rebounds at $6$ m/s.

Find the coefficient of restitution:

$$e = \frac{6}{15} = \underline{\hspace{2cm}}$$

If the car were to bounce repeatedly against the barrier, the rebound speeds
would be $15e$, $15e^2$, $15e^3$, and so on. Find the next two rebound speeds.
They fall quickly, because the coefficient is less than $1$.

## You should now be able to

- find the speed after any number of bounces from $u_n = ue^n$;
- find the height after any number of bounces from $h_n = he^{2n}$;
- explain why the height ratio is $e^2$ and the speed ratio is $e$;
- write the geometric series for the total distance and sum it;
- follow a chain of collisions, using $v = \dfrac{u(1 + e)}{2}$ for equal masses;
- find the impulse at a rebound, giving the reversed velocity the correct sign.
