---
title: 3.6 Oscillations and simple harmonic motion — Learn
chapter: 3
chapter_title: Mechanics
section: '3.6'
section_title: Oscillations and simple harmonic motion
refs:
- AP3
kind: walkthrough
---

# 3.6 Oscillations and simple harmonic motion — Learn

**Prerequisites:** the pendulum and the measurement of $g$ from Chapter 1;
Newton's second law from Section 3.2; conservation of energy from Section 3.3;
angular velocity and radians from Section 3.5.

**By the end of this section you can:** define displacement, amplitude, period
and frequency for an oscillation; state the condition for simple harmonic motion
and use $a = -\omega^2 x$; use $x = A\cos\omega t$ and its velocity; find the
period of a mass on a spring and of a simple pendulum; and describe the energy
changes in an oscillation.

## 1. The language of oscillations

An **oscillation** is a repeating back-and-forth motion about an equilibrium
position. Several quantities describe it.

| Quantity | Symbol | Meaning |
|---|---|---|
| Displacement | $x$ | distance and direction from the equilibrium position |
| Amplitude | $A$ | the maximum displacement |
| Period | $T$ | the time for one complete oscillation |
| Frequency | $f$ | the number of oscillations per second, $f = 1/T$ |
| Angular frequency | $\omega$ | $\omega = 2\pi f = \dfrac{2\pi}{T}$ |

The period is measured in seconds, the frequency in hertz, and the angular
frequency in radians per second. Do not confuse the frequency $f$ with the
angular frequency $\omega$: the angular frequency is $2\pi$ times larger.

## 2. The condition for simple harmonic motion

In **simple harmonic motion** (SHM), the acceleration is proportional to the
displacement from the equilibrium position and is directed towards the
equilibrium position.

$$ a = -\omega^2 x $$

The minus sign records the direction: when $x$ is positive, $a$ is negative, and
the object is pulled back towards the centre. The constant $\omega^2$ sets how
quickly the motion repeats.

This condition is met whenever the **restoring force** is proportional to the
displacement. A mass on a spring obeys Hooke's law, $F = -kx$, so

$$ a = \frac{F}{m} = -\frac{k}{m}x \quad\Rightarrow\quad \omega^2 = \frac{k}{m} $$

For a simple pendulum at a small angle $\theta$, the restoring force is
$-mg\sin\theta$. For small angles, $\sin\theta \approx \theta = \dfrac{x}{l}$, so

$$ a = -\frac{g}{l}x \quad\Rightarrow\quad \omega^2 = \frac{g}{l} $$

The approximation holds only for small amplitudes, which is why a pendulum clock
uses a small swing.

## 3. The equations of SHM

For an oscillation that starts at maximum displacement, the displacement at time
$t$ is

$$ x = A\cos\omega t $$

The velocity and acceleration follow:

$$
\begin{aligned}
v &= -A\omega\sin\omega t \\
a &= -A\omega^2\cos\omega t = -\omega^2 x
\end{aligned}
$$

The speed is greatest at the equilibrium position, where $x = 0$, and the
acceleration is greatest at the extremes, where the displacement is largest.

$$
v_{\max} = A\omega \qquad a_{\max} = A\omega^2
$$

The displacement and the acceleration are always in opposite directions. The
velocity is $90^\circ$ ahead of the displacement, and the acceleration is
$180^\circ$ out of phase with it.

**Worked example 1.** A mass on a spring oscillates with amplitude 0.040 m and
period 0.50 s. Find the angular frequency, the maximum speed and the maximum
acceleration.

$$
\begin{aligned}
\omega &= \frac{2\pi}{T} = \frac{2\pi}{0.50} = 12.6\,\text{rad}\,\text{s}^{-1} \\
v_{\max} &= A\omega = 0.040 \times 12.6 = 0.50\,\text{m}\,\text{s}^{-1} \\
a_{\max} &= A\omega^2 = 0.040 \times 12.6^2 = 6.3\,\text{m}\,\text{s}^{-2}
\end{aligned}
$$

**Worked example 2.** A mass of 0.50 kg hangs on a spring of spring constant
$20\,\text{N}\,\text{m}^{-1}$. Find the period of the oscillation.

$$
T = 2\pi\sqrt{\frac{m}{k}} = 2\pi\sqrt{\frac{0.50}{20}} = 2\pi \times 0.158 = 0.99\,\text{s}
$$

**Worked example 3.** A simple pendulum has a length of 0.800 m. Find its
period. Take $g = 9.81\,\text{m}\,\text{s}^{-2}$.

$$
T = 2\pi\sqrt{\frac{l}{g}} = 2\pi\sqrt{\frac{0.800}{9.81}} = 2\pi \times 0.286 = 1.80\,\text{s}
$$

This is the pendulum from Chapter 1: its measured period was 1.795 s.

## 4. Speed at a general displacement

The speed at a displacement $x$ comes from the energy, or from combining the
equations for $x$ and $v$. Squaring $x = A\cos\omega t$ and
$v = -A\omega\sin\omega t$ and using $\sin^2 + \cos^2 = 1$ gives

$$ v = \pm\omega\sqrt{A^2 - x^2} $$

The sign is positive when the object moves away from the equilibrium position
and negative when it returns.

**Worked example 4.** A mass oscillates with amplitude 0.050 m and angular
frequency $8.0\,\text{rad}\,\text{s}^{-1}$. Find its speed when the displacement
is 0.030 m.

$$
\begin{aligned}
v &= \omega\sqrt{A^2 - x^2} \\
  &= 8.0\sqrt{0.050^2 - 0.030^2} \\
  &= 8.0\sqrt{0.0016} = 8.0 \times 0.040 = 0.32\,\text{m}\,\text{s}^{-1}
\end{aligned}
$$

## 5. Energy in simple harmonic motion

In SHM the energy is transferred between a kinetic store and a potential store.
The total energy is constant when there is no damping.

$$
\begin{aligned}
E_k &= \tfrac{1}{2}m\omega^2(A^2 - x^2) \\
E_p &= \tfrac{1}{2}m\omega^2 x^2 \\
E_{\text{total}} &= \tfrac{1}{2}m\omega^2 A^2
\end{aligned}
$$

The potential energy is a maximum at the extremes, where the object is
momentarily at rest, and the kinetic energy is a maximum at the equilibrium
position.

**Worked example 5.** A mass of 0.20 kg oscillates with amplitude 0.10 m and
angular frequency $5.0\,\text{rad}\,\text{s}^{-1}$. Find the total energy and the
kinetic energy when the displacement is 0.060 m.

$$
\begin{aligned}
E_{\text{total}} &= \tfrac{1}{2} \times 0.20 \times 5.0^2 \times 0.10^2 = 0.025\,\text{J} \\
E_p &= \tfrac{1}{2} \times 0.20 \times 5.0^2 \times 0.060^2 = 0.0090\,\text{J} \\
E_k &= 0.025 - 0.0090 = 0.016\,\text{J}
\end{aligned}
$$

## 6. Damping

Real oscillations lose energy to their surroundings, usually as thermal energy.
The amplitude then falls over time. This is **damping**.

- **Light damping** makes the amplitude decay gradually, while the period is
  almost unchanged.
- **Critical damping** brings the system back to equilibrium in the shortest
  time without overshooting. Car suspension and door closers are designed near
  critical damping.
- **Heavy damping** returns the system to equilibrium slowly, without
  oscillating.

> **Watch out.** The equations of motion from Section 3.1 do **not** apply to
> SHM, because the acceleration is not constant. It changes throughout the
> oscillation, from $+A\omega^2$ at one extreme to $-A\omega^2$ at the other.
> Use the SHM equations, not $s = ut + \tfrac{1}{2}at^2$. Also remember that
> the period of SHM does not depend on the amplitude; a larger amplitude means a
> larger maximum speed, but the same time for one oscillation.
> **Re-check:** ask whether the acceleration is constant before you choose an equation of motion.

## 7. Try it: the three graphs

The figure draws the displacement, velocity and acceleration graphs for an SHM
oscillation. Two sliders set the amplitude and the period.

**Predict first.** Do not move the sliders yet. Write down your answers.

1. At the instant the displacement is zero, what is the speed?
2. At the instant the displacement is a maximum, what is the acceleration?
3. If you double the amplitude but keep the period the same, what happens to the
   maximum speed and the maximum acceleration?

**Test.** Set the amplitude to 0.05 m and the period to 1.0 s. Watch the three
curves. Then change the period and check how the curves stretch. Check each
prediction.

**Explain.** Why is the acceleration largest when the speed is smallest? Write
two or three sentences. Use the idea that the restoring force, and so the
acceleration, is largest at the extremes of the motion, where the object is
momentarily at rest.

:::figure shm-graphs

## Progress check

Return to the pendulum from Chapter 1. It has a length of 0.800 m and its
measured period is 1.795 s.

1. Use $T = 2\pi\sqrt{\dfrac{l}{g}}$ to find the period predicted from the length.
2. Explain why the measured period agrees so closely.
3. Find the length a pendulum needs for a period of exactly 2.000 s.

If question 1 goes wrong, use $g = 9.81\,\text{m}\,\text{s}^{-2}$ and
$l = 0.800\,\text{m}$. If question 3 goes wrong, rearrange the period equation
to make $l$ the subject.

## You should now be able to

- define displacement, amplitude, period, frequency and angular frequency;
- state the condition for SHM, $a = -\omega^2 x$;
- explain why a mass on a spring and a small-angle pendulum obey the condition;
- use $x = A\cos\omega t$, $v = -A\omega\sin\omega t$ and $v_{\max} = A\omega$;
- find the speed at a general displacement;
- find the period of a mass on a spring and of a simple pendulum;
- calculate the energy in SHM and describe the energy transfers;
- describe light, critical and heavy damping;
- explain why the equations of motion for constant acceleration do not apply to
  SHM.
