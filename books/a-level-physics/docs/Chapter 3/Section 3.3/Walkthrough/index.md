---
title: 3.3 Work, energy and power — Learn
chapter: 3
chapter_title: Mechanics
section: '3.3'
section_title: Work, energy and power
dfe:
- AP3
kind: walkthrough
---

# 3.3 Work, energy and power — Learn

**Prerequisites:** the equations of motion from Section 3.1; resolving a vector
into components from Section 2.2; the idea of energy transfer from Chapter 1.

**By the end of this section you can:** calculate the work done by a constant
force, including a force not along the line of motion; use the kinetic energy
and gravitational potential energy equations; apply conservation of energy; and
calculate power from work and time, and from force and velocity.

## 1. Work done by a constant force

**Work** is done when a force moves its point of application. For a constant
force $F$ that acts at an angle $\theta$ to the displacement $s$,

$$ W = Fs\cos\theta $$

Work is a **scalar**, measured in **joules** (J). One joule is one newton metre.

$$ 1\,\text{J} = 1\,\text{N}\,\text{m} $$

The $s\cos\theta$ part is the component of the displacement along the force. Only
the component of the force along the direction of motion does work. When the
force is along the displacement, $\theta = 0$ and $\cos 0 = 1$, so $W = Fs$.
When the force is perpendicular to the displacement, $\theta = 90^\circ$ and
$\cos 90^\circ = 0$, so the force does **no work**.

Work can be negative. A friction force acts opposite to the motion, so
$\theta = 180^\circ$, $\cos 180^\circ = -1$, and the work done by friction is
negative. Negative work removes energy from the object and transfers it to the
surroundings, usually as thermal energy.

**Worked example 1.** A force of 40 N pushes a box 5.0 m along a floor. Find the
work done.

$$ W = Fs = 40 \times 5.0 = 200\,\text{J} $$

**Worked example 2.** A rope pulls a sled with a force of 250 N at 30° to the
horizontal. The sled moves 12 m along the ground. Find the work done by the
rope.

$$
\begin{aligned}
W &= Fs\cos\theta \\
  &= 250 \times 12 \times \cos 30^\circ \\
  &= 3000 \times 0.866 = 2600\,\text{J}
\end{aligned}
$$

Only the horizontal component of the pull, $250\cos 30^\circ$, does work,
because the sled moves horizontally.

## 2. Work transfers energy

Work is a way of transferring energy. The **work–energy theorem** says that the
total work done on an object equals its change in kinetic energy.

For a constant force along the line of motion, $W = Fs = (ma)s$. Using
$v^2 = u^2 + 2as$ gives $as = \dfrac{v^2 - u^2}{2}$, so

$$ W = m\left(\frac{v^2 - u^2}{2}\right) = \tfrac{1}{2}mv^2 - \tfrac{1}{2}mu^2 $$

The work done equals the gain in **kinetic energy**,

$$ E_k = \tfrac{1}{2}mv^2 $$

When a force raises an object through a vertical height $\Delta h$, the work done
against gravity is stored as **gravitational potential energy**:

$$ \Delta E_p = mg\Delta h $$

Near the Earth's surface, $g$ is constant, so a change in height gives a change
in potential energy. Only changes in potential energy matter; the zero is chosen
for convenience.

**Worked example 3.** A car of mass 1500 kg speeds up from
$10\,\text{m}\,\text{s}^{-1}$ to $20\,\text{m}\,\text{s}^{-1}$. Find the work
done by the resultant force.

$$
\begin{aligned}
E_k(\text{initial}) &= \tfrac{1}{2} \times 1500 \times 10^2 = 75000\,\text{J} \\
E_k(\text{final}) &= \tfrac{1}{2} \times 1500 \times 20^2 = 300000\,\text{J} \\
W &= 300000 - 75000 = 225000\,\text{J} = 225\,\text{kJ}
\end{aligned}
$$

**Worked example 4.** A book of mass 2.0 kg is lifted through 1.5 m. Find the
gravitational potential energy gained. Take $g = 9.81\,\text{m}\,\text{s}^{-2}$.

$$
\Delta E_p = mg\Delta h = 2.0 \times 9.81 \times 1.5 = 29\,\text{J}
$$

## 3. Conservation of energy

**Energy is transferred, not created or destroyed.** The total energy of a
closed system stays the same. In a frictionless system the gravitational
potential energy lost by a falling object equals the kinetic energy gained.

If friction or drag is present, some energy is transferred to the thermal store
of the surroundings. The mechanical energy then falls, but the total energy,
including the thermal energy, is still conserved.

**Worked example 5.** A ball is dropped from a height of 5.0 m. Find its speed
just before it lands, if air resistance is negligible.

The gravitational potential energy lost equals the kinetic energy gained.

$$
\begin{aligned}
mgh &= \tfrac{1}{2}mv^2 \\
v &= \sqrt{2gh} = \sqrt{2 \times 9.81 \times 5.0} \\
  &= 9.9\,\text{m}\,\text{s}^{-1}
\end{aligned}
$$

The mass cancels, so the landing speed is the same for a heavy ball and a light
one.

## 4. Power

**Power** is the rate of transfer of energy.

$$ P = \frac{W}{t} $$

Power is measured in **watts** (W). One watt is one joule per second. For an
object moving at a constant velocity $v$ under a driving force $F$, the power is

$$ P = Fv $$

because the force moves through a distance $Fs$ in time $t$.

**Worked example 6.** A pump raises 200 kg of water through 15 m in 30 s. Find
the useful power of the pump. Take $g = 9.81\,\text{m}\,\text{s}^{-2}$.

$$
\begin{aligned}
W &= mg\Delta h = 200 \times 9.81 \times 15 = 29430\,\text{J} \\
P &= \frac{W}{t} = \frac{29430}{30} = 981\,\text{W}
\end{aligned}
$$

**Worked example 7.** A car travels at a constant $25\,\text{m}\,\text{s}^{-1}$
with a driving force of 2000 N. Find the useful power developed.

$$ P = Fv = 2000 \times 25 = 50000\,\text{W} = 50\,\text{kW} $$

At a constant speed the driving force balances the resistive forces, so the
useful power is the rate at which the engine works against them.

> **Watch out.** A force that is perpendicular to the motion does **no** work,
> even when it is large. A person carrying a heavy box along a level floor does
> no work on the box against gravity, because the upward force and the horizontal
> displacement are at right angles. Check that the force has a component along
> the displacement before you use $W = Fs$.

## Progress check

Return to the chapter problem. The car and riders have a mass of 500 kg and are
released from rest 45 m above the bottom of the loop.

1. Find the gravitational potential energy lost by the car as it descends 45 m.
2. Assuming no energy is transferred to thermal stores, find the kinetic energy
   and the speed of the car at the bottom.
3. The top of the loop is 24 m above the bottom. Find the speed of the car at
   the top of the loop.

If question 1 goes wrong, use $\Delta E_p = mg\Delta h$. If question 2 goes
wrong, set the potential energy lost equal to the kinetic energy gained, and
rearrange for $v$. If question 3 goes wrong, first find the potential energy at
the top of the loop, then subtract it from the energy at the bottom.

## You should now be able to

- calculate work done by a constant force, including a force not along the line
  of motion;
- explain why a perpendicular force does no work;
- use the work–energy theorem and the kinetic energy equation;
- calculate gravitational potential energy changes;
- apply conservation of energy, including energy transferred to thermal stores;
- calculate power from work and time, and from force and velocity;
- explain why the mass cancels in a free-fall energy calculation.
