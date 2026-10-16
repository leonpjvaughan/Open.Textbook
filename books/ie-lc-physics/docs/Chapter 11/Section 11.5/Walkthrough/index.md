---
title: 11.5 Calculating with the Doppler effect — Learn
chapter: 11
chapter_title: Sound
section: '11.5'
section_title: Calculating with the Doppler effect
tier: H
refs:
- '2.7'
kind: walkthrough
---

# 11.5 Calculating with the Doppler effect — Learn

**Prerequisites:** the Doppler effect from Section 11.4; the wave equation from
Section 9.2; rearranging an equation from Chapter 1.

**Objectives:** use $f' = \dfrac{fc}{c \pm u}$ to find an observed frequency; choose the
correct sign for an approaching or a receding source; rearrange the formula to find the
speed of the source; find the observed wavelength.

By the end of this section, you can calculate the two frequencies heard from a moving
source and find a source speed from a measured frequency.

## The Doppler formula

Section 11.4 described the effect in words. To put numbers on it, use the Doppler
formula:

$$f' = \frac{fc}{c \pm u}$$

- $f$ is the **frequency the source makes**, in hertz;
- $f'$ is the **frequency the listener hears**, in hertz;
- $c$ is the **speed of sound in the medium**, in metres per second;
- $u$ is the **speed of the source** relative to the medium, in metres per second.

The sign in the denominator is chosen by the direction of the motion.

- The source moves **towards** the listener: use the **minus** sign, $c - u$.
- The source moves **away** from the listener: use the **plus** sign, $c + u$.

A smaller denominator gives a larger frequency, so the minus sign raises the observed
frequency. A larger denominator gives a smaller frequency, so the plus sign lowers it.
That matches the wavefront picture: the wavefronts bunch in front and spread behind.

**Example 1.** An ambulance siren makes a note of 700 Hz. The ambulance approaches a
stationary listener at 30 m/s. The speed of sound in air is 340 m/s. Calculate the
frequency the listener hears.

The source approaches, so use the minus sign.

$$
f' = \frac{fc}{c - u}
$$

$$
f' = \frac{700 \times 340}{340 - 30}
$$

$$
f' = \frac{238000}{310}
$$

$$
f' = 768\,\text{Hz}
$$

The listener hears 768 Hz, which is higher than the 700 Hz the siren makes.

**Example 2.** The same ambulance has passed the listener and now moves away at 30 m/s.
Calculate the frequency the listener hears.

The source moves away, so use the plus sign.

$$
f' = \frac{fc}{c + u}
$$

$$
f' = \frac{700 \times 340}{340 + 30}
$$

$$
f' = \frac{238000}{370}
$$

$$
f' = 643\,\text{Hz}
$$

So the one steady 700 Hz siren is heard as 768 Hz on the way in and 643 Hz on the way out.
That drop from 768 Hz to 643 Hz is the change of note you hear as the ambulance passes.

## Finding the speed of the source

A Doppler speed trap measures the observed frequency and works back to the speed. The same
rearrangement answers any question that gives $f'$ and asks for $u$.

**Example 3.** A source approaches a stationary listener and makes a note of 700 Hz. The
listener hears 800 Hz. The speed of sound in air is 340 m/s. Calculate the speed of the
source.

Start from the approaching form, $f' = \dfrac{fc}{c - u}$, and rearrange for $c - u$:

$$
c - u = \frac{fc}{f'}
$$

$$
c - u = \frac{700 \times 340}{800}
$$

$$
c - u = 297.5\,\text{m/s}
$$

Then

$$
u = 340 - 297.5 = 42.5\,\text{m/s}
$$

Always check a rearrangement by substituting the answer back. Here
$\dfrac{700 \times 340}{340 - 42.5} = 800$ Hz, which is the frequency the listener heard.

## The observed wavelength

The wavefronts in front of a moving source are squeezed together, so the observed
wavelength is shorter than the wavelength the source makes. For a source moving towards a
listener:

$$\lambda' = \frac{c - u}{f}$$

For a source moving away:

$$\lambda' = \frac{c + u}{f}$$

**Example 4.** The siren makes 700 Hz and moves towards the listener at 30 m/s. The speed
of sound in air is 340 m/s. Calculate the observed wavelength.

$$
\lambda' = \frac{c - u}{f}
$$

$$
\lambda' = \frac{340 - 30}{700}
$$

$$
\lambda' = \frac{310}{700} = 0.44\,\text{m}
$$

The stationary wavelength was 0.49 m, so the wavefronts in front are squeezed closer
together. A shorter wavelength with the same speed of sound means a higher observed
frequency, which agrees with the 768 Hz from Example 1.

> **Watch out.** In this formula, $c$ is the speed of **sound in the medium**, not the
> speed of light. The symbol is the same one the SEC tables use for the velocity of a
> wave. Also check that you have chosen the right sign before you calculate: a minus sign
> for an approaching source, a plus sign for a receding one. Choosing the wrong sign
> still gives a plausible-looking number, and it is the most common mistake in this
> section.

## Progress check

Back to the chapter problem. The ambulance siren makes 700 Hz and the ambulance travels at
30 m/s. The speed of sound in air is 340 m/s.

1. Calculate the frequency you hear as the ambulance approaches.
2. Calculate the frequency you hear after it has passed.
3. Explain why the two answers are different, even though the siren makes one steady note.

Keep your answers. The Review returns to the chapter problem and uses these two values.

## You should now be able to

- state the Doppler formula and say what each symbol means;
- choose the minus sign for an approaching source and the plus sign for a receding one;
- calculate the observed frequency for a source moving towards or away from a stationary
  listener;
- rearrange the formula to find the speed of a source from a measured frequency;
- calculate the observed wavelength in front of or behind a moving source;
- check a rearranged answer by substituting it back into the formula.
