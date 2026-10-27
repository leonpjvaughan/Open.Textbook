---
title: 6.1 Superposition and interference — Learn
chapter: 6
chapter_title: Waves
section: '6.1'
section_title: Superposition and interference
refs:
- AP6
kind: walkthrough
---

# 6.1 Superposition and interference — Learn

**Prerequisites:** SI prefixes and units from Section 1.1; speed as distance
divided by time from Section 3.1; the sine and cosine of an angle from
Section 2.2.

**By the end of this section you can:** describe a progressive wave; tell a
transverse wave from a longitudinal wave; use $v = f\lambda$ and
$T = \dfrac{1}{f}$; find a phase difference and a path difference; decide whether
two waves reinforce or cancel; explain what makes two sources coherent; and use
the fringe formula for two slits.

## 1. What a wave is

A **progressive wave** carries energy from one place to another without carrying
matter with it. The particles of the material move about their own positions, and
the disturbance travels through them. A wave on a rope moves along the rope, but
each piece of rope stays near where it started.

The particles can move in two ways, and this gives two families of wave.

| Type | How the particles move | Examples |
|---|---|---|
| **Transverse** | at right angles to the direction of travel | light, a wave on a string, a wave on water |
| **Longitudinal** | along the direction of travel | sound, a push along a spring |

A longitudinal wave has **compressions**, where the particles are crowded
together, and **rarefactions**, where they are spread out. A sound wave in air is
longitudinal, so it has no direction of vibration that you can see from the side.

## 2. The quantities that describe a wave

| Quantity | Symbol | Meaning | Unit |
|---|---|---|---|
| Displacement | $x$ | distance and direction of a point from its rest position | m |
| Amplitude | $A$ | the maximum displacement | m |
| Wavelength | $\lambda$ | the distance between two neighbouring points in step | m |
| Period | $T$ | the time for one complete wave to pass | s |
| Frequency | $f$ | the number of waves passing a point each second | Hz |

Frequency and period are reciprocals:

$$ f = \frac{1}{T} \qquad T = \frac{1}{f} $$

One wavelength passes a point in one period, so the wave travels a distance
$\lambda$ in a time $T$. Its speed is therefore

$$ v = \frac{\lambda}{T} = f\lambda $$

The symbol $c$ is used for the speed of light and of other electromagnetic
waves. The equation is the same: $c = f\lambda$.

**Worked example 1.** A sound wave has a frequency of 256 Hz. The speed of sound
in air is $340\,\text{m}\,\text{s}^{-1}$. Find its wavelength.

$$
\begin{aligned}
v &= f\lambda \\
\lambda &= \frac{v}{f} = \frac{340}{256} \\
        &= 1.33\,\text{m}
\end{aligned}
$$

The wavelength is 1.33 m.

**Worked example 2.** Red light has a wavelength of 600 nm in a vacuum. The speed
of light is $3.00 \times 10^{8}\,\text{m}\,\text{s}^{-1}$. Find its frequency.

$$
\begin{aligned}
c &= f\lambda \\
f &= \frac{c}{\lambda} = \frac{3.00 \times 10^{8}}{600 \times 10^{-9}} \\
  &= 5.00 \times 10^{14}\,\text{Hz}
\end{aligned}
$$

The frequency is $5.00 \times 10^{14}\,\text{Hz}$. The frequency of a wave does
not change when the wave enters a different material, but its speed and
wavelength do.

## 3. Phase and phase difference

Points on a wave are **in phase** when they are doing the same thing at the same
time. Two crests are in phase. Two points one wavelength apart are also in
phase.

The **phase difference** tells you how far apart two points are in their cycle.
It can be measured in degrees or in radians. One whole wavelength is $360^\circ$
or $2\pi$ radians, so

$$ \Delta\phi = \frac{\Delta x}{\lambda} \times 360^\circ
   = \frac{\Delta x}{\lambda} \times 2\pi $$

where $\Delta\phi$ is the phase difference and $\Delta x$ is the distance
between the points.

**Worked example 3.** Two points on a wave are 0.150 m apart. The wavelength is
0.600 m. Find the phase difference between them.

$$
\begin{aligned}
\Delta\phi &= \frac{\Delta x}{\lambda} \times 360^\circ \\
           &= \frac{0.150}{0.600} \times 360^\circ \\
           &= 90^\circ
\end{aligned}
$$

The phase difference is $90^\circ$, which is $\dfrac{\pi}{2}$ radians.

## 4. The principle of superposition

When two waves meet, they pass through each other. At every point the resultant
displacement is the sum of the displacements the two waves would have on their
own. This is the **principle of superposition**.

Read the rule carefully. It is the displacements that add, and displacement has a
direction. A crest and a trough at the same place add to zero.

- **Constructive interference** happens when the two waves arrive **in phase**.
  A crest meets a crest, and the resultant amplitude is larger.
- **Destructive interference** happens when the two waves arrive **antiphase**. A
  crest meets a trough, and the resultant amplitude is smaller. If the two
  amplitudes are equal, the resultant is zero.

For two sources that started in step, the phase at a point depends on how far
each wave has travelled. Call the difference in the distances the **path
difference** $\Delta x$.

| Path difference | Phase difference | Result |
|---|---|---|
| $n\lambda$ | $0^\circ$, $360^\circ$, … | constructive |
| $(n + \tfrac{1}{2})\lambda$ | $180^\circ$, $540^\circ$, … | destructive |

Here $n$ is a whole number: 0, 1, 2, ….

**Worked example 4.** Two loudspeakers are driven in phase at 500 Hz. The speed
of sound is $340\,\text{m}\,\text{s}^{-1}$. A point P is 2.38 m from one speaker
and 1.70 m from the other. Decide whether the sound at P is loud or quiet.

$$
\begin{aligned}
\lambda &= \frac{v}{f} = \frac{340}{500} = 0.68\,\text{m} \\
\Delta x &= 2.38 - 1.70 = 0.68\,\text{m}
\end{aligned}
$$

The path difference is one wavelength, so the two waves arrive in phase. The
sound at P is loud. A second point with a path difference of 0.34 m would be
quiet, because 0.34 m is half a wavelength.

> **Watch out.** A path difference is measured in metres, so compare it with the
> wavelength, which is also in metres. A common trap is to compare a path
> difference of 0.68 m with the frequency of 500 Hz. Those numbers cannot be
> compared. Divide the path difference by the wavelength to get a number of
> wavelengths: $\dfrac{0.68}{0.68} = 1$, so the waves are in phase.
> **Re-check:** divide the path difference by the wavelength and confirm that both are in the same unit.

## 5. Coherence

Two sources give a steady interference pattern only if they are **coherent**.
Coherent sources have the **same frequency** and a **constant phase difference**
between them. Two loudspeakers driven by the same signal generator are coherent.
Two separate lamps are not, because each emits light in short, unrelated bursts,
so the pattern shifts many times a second and the eye sees only an average.

A laser is different. All the light from one laser is coherent, which is why a
laser is used for a clear interference pattern.

## 6. Two slits and the fringe pattern

Light from two narrow slits is coherent, because the two slits are illuminated
by the same source. The waves travel different distances to the screen, so the
path difference varies across the screen. Bright fringes are the places where the
path difference is a whole number of wavelengths.

For a slit separation $s$ and a screen distance $D$ much larger than $s$, the
bright fringes are equally spaced. The distance from one bright fringe to the
next is the **fringe spacing** $w$:

$$ w = \frac{\lambda D}{s} $$

The same geometry applies to any two coherent sources, such as two loudspeakers.
The bright fringes lie at angles given by

$$ s\sin\theta = n\lambda $$

For a small angle, $\sin\theta \approx \theta$ in radians, and the two equations
agree.

**Worked example 5.** A laser of wavelength 633 nm passes through two slits
0.25 mm apart. The screen is 2.50 m away. Find the fringe spacing.

$$
\begin{aligned}
w &= \frac{\lambda D}{s} \\
  &= \frac{633 \times 10^{-9} \times 2.50}{0.25 \times 10^{-3}} \\
  &= 6.33 \times 10^{-3}\,\text{m}
\end{aligned}
$$

The fringes are 6.33 mm apart. That is about the width of a fingernail.

**Worked example 6.** In a two-slit experiment the slits are 0.50 mm apart and
the screen is 3.00 m away. The fringe spacing is 3.60 mm. Find the wavelength of
the light.

$$
\begin{aligned}
w &= \frac{\lambda D}{s} \\
\lambda &= \frac{ws}{D} = \frac{3.60 \times 10^{-3} \times 0.50 \times 10^{-3}}{3.00} \\
        &= 6.0 \times 10^{-7}\,\text{m}
\end{aligned}
$$

The wavelength is $6.0 \times 10^{-7}\,\text{m}$, or 600 nm. This is how a
two-slit experiment measures the wavelength of light.

## 7. Try it: two sources

The figure draws the interference pattern from two coherent sources. Three
sliders set the wavelength, the distance between the sources, and the distance to
the screen.

**Predict first.** Do not move the sliders yet. Write down your answers.

1. If you halve the wavelength, what happens to the spacing of the bright
   fringes?
2. If you move the sources closer together, what happens to the fringe spacing?
3. If you move the screen further away, what happens to the path difference at a
   fixed point on the screen?

**Test.** Set the wavelength to 600 nm, the source separation to 0.25 mm and the
screen distance to 2.50 m. Watch the pattern and read the fringe spacing. Then
change one slider at a time and check each prediction.

**Explain.** Why does making the sources closer together spread the fringes
further apart? Write two or three sentences. Use the idea that the path
difference must still be a whole number of wavelengths, but a smaller separation
makes the waves travel more nearly equal distances.

:::figure interference-2source

## Progress check

Return to the concert hall. The two loudspeakers are 1.20 m apart and are driven
in phase at 1.00 kHz. The speed of sound is $340\,\text{m}\,\text{s}^{-1}$.

1. Find the wavelength of the sound.
2. Find the angle at which the listener hears the first loud band to the side of
   the centre line. Use $s\sin\theta = n\lambda$ with $n = 1$.
3. Explain why a listener on the centre line hears a loud sound.
4. Explain why the pattern would vanish if the two speakers were driven by
   separate signal generators set to nearly the same frequency.

If question 1 goes wrong, use $\lambda = \dfrac{v}{f}$. If question 2 goes wrong,
divide the wavelength by the separation before taking the inverse sine. If
question 3 goes wrong, find the path difference on the centre line and compare it
with the wavelength.

## You should now be able to

- describe a progressive wave and say what it carries;
- tell a transverse wave from a longitudinal wave;
- use $v = f\lambda$ to find a speed, a frequency or a wavelength;
- find the period from a frequency, and a frequency from a period;
- find the phase difference between two points on a wave;
- state the principle of superposition;
- use a path difference to decide whether two waves reinforce or cancel;
- explain what makes two sources coherent;
- use $w = \dfrac{\lambda D}{s}$ for the fringes from two slits;
- find the angle of a bright fringe from $s\sin\theta = n\lambda$.
