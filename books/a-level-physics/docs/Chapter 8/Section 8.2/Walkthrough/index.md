---
title: 8.2 Wave-particle duality — Learn
chapter: 8
chapter_title: Quantum and nuclear physics
section: '8.2'
section_title: Wave-particle duality
dfe:
- AP8
kind: walkthrough
---

# 8.2 Wave-particle duality — Learn

**Prerequisites:** superposition, interference and diffraction from Chapter 6;
momentum from Section 3.4; work, energy and the electronvolt from Section 3.3
and Section 1.1; powers and square roots.

**By the end of this section you can:** describe the de Broglie hypothesis; use
$\lambda = \dfrac{h}{p}$; find the momentum of an accelerated electron; explain
how electron diffraction shows that particles behave as waves; and explain why
the wave nature of a large object is not observed.

## 1. Two pictures of light

Chapter 6 taught that light behaves as a wave. It diffracts through a narrow
gap, and two beams of light produce an interference pattern. Those experiments
measure a wavelength.

Section 8.1 taught that light behaves as a particle. A photon carries a fixed
energy $E = hf$, and in the photoelectric effect one photon is absorbed by one
electron. A wave would not behave in that way.

Both pictures are needed. Neither picture on its own is complete. Light has
**wave-particle duality**: some experiments show its wave nature, and others
show its particle nature. The two descriptions are two views of one thing.

In 1924 Louis de Broglie asked whether the opposite could also be true. If a
wave can behave as a particle, can a particle behave as a wave?

## 2. The de Broglie wavelength

De Broglie proposed that every moving particle has a wavelength, and that the
wavelength is set by its momentum:

$$ \lambda = \frac{h}{p} = \frac{h}{mv} $$

Here $p = mv$ is the momentum, $m$ is the mass and $v$ is the speed. The
constant $h$ is the same Planck constant. The idea became known as the
**de Broglie hypothesis**, and the wavelength is the **de Broglie wavelength**.

The equation says that a faster or heavier particle has a shorter wavelength. A
heavy everyday object has a wavelength far too small to measure. An electron,
with its tiny mass, can have a wavelength about the size of an atom.

**Worked example 1.** An electron is accelerated through a potential difference
of 150 V in the hospital's teaching electron gun. Find its de Broglie
wavelength.

The kinetic energy gained by the electron is the work done by the electric
field.

$$
\begin{aligned}
E_k &= eV = 1.60 \times 10^{-19} \times 150 \\
    &= 2.40 \times 10^{-17}\,\text{J}
\end{aligned}
$$

The momentum comes from the kinetic energy. Since $E_k = \dfrac{p^2}{2m}$,
$p = \sqrt{2mE_k}$.

$$
\begin{aligned}
p &= \sqrt{2mE_k} = \sqrt{2 \times 9.11 \times 10^{-31} \times 2.40 \times 10^{-17}} \\
  &= \sqrt{4.37 \times 10^{-47}} = 6.61 \times 10^{-24}\,\text{kg}\,\text{m}\,\text{s}^{-1}
\end{aligned}
$$

Then use the de Broglie equation.

$$
\begin{aligned}
\lambda &= \frac{h}{p} = \frac{6.63 \times 10^{-34}}{6.61 \times 10^{-24}} \\
        &= 1.00 \times 10^{-10}\,\text{m}
\end{aligned}
$$

The electron's wavelength is $1.00 \times 10^{-10}\,\text{m}$, or 0.100 nm. That
is about the distance between the atoms in a crystal.

**Worked example 2.** Find the de Broglie wavelength of a 0.050 kg ball moving
at $20\,\text{m}\,\text{s}^{-1}$.

$$
\begin{aligned}
p &= mv = 0.050 \times 20 = 1.0\,\text{kg}\,\text{m}\,\text{s}^{-1} \\
\lambda &= \frac{h}{p} = \frac{6.63 \times 10^{-34}}{1.0}
        = 6.6 \times 10^{-34}\,\text{m}
\end{aligned}
$$

The wavelength is about $10^{-34}\,\text{m}$. No gap or crystal is small enough
to diffract it, so the wave nature of the ball is never observed. This is why
everyday objects seem to obey only the particle model.

## 3. Electron diffraction

In 1927, Davisson and Germer fired a beam of electrons at a crystal of nickel.
The electrons came out in directions that matched a diffraction pattern. Other
experiments pass electrons through a thin film of graphite and record rings on a
screen. The rings are like the pattern from a diffraction grating, but the wave
that diffracts is the electron wave.

The spacing of the rings matches the de Broglie wavelength. This is the
evidence that particles have a wave nature. It also works the other way: the
wavelength measured from the pattern agrees with $\lambda = \dfrac{h}{p}$.

When the accelerating voltage is raised, the electrons gain more kinetic energy.
Their momentum and their frequency rise, and their wavelength falls. The
diffraction rings then move closer together, because a shorter wavelength
diffracts through a smaller angle.

**Worked example 3.** In an electron diffraction experiment the electrons have a
de Broglie wavelength of $5.0 \times 10^{-11}\,\text{m}$. Find the potential
difference that accelerated them.

Find the momentum from the wavelength.

$$
p = \frac{h}{\lambda} = \frac{6.63 \times 10^{-34}}{5.0 \times 10^{-11}}
  = 1.33 \times 10^{-23}\,\text{kg}\,\text{m}\,\text{s}^{-1}
$$

Then find the kinetic energy, and convert it to a potential difference.

$$
\begin{aligned}
E_k &= \frac{p^2}{2m} = \frac{(1.33 \times 10^{-23})^2}{2 \times 9.11 \times 10^{-31}} \\
    &= 9.65 \times 10^{-17}\,\text{J} \\
V &= \frac{E_k}{e} = \frac{9.65 \times 10^{-17}}{1.60 \times 10^{-19}}
  = 6.0 \times 10^{2}\,\text{V}
\end{aligned}
$$

The electrons were accelerated through about 600 V.

> **Watch out.** The de Broglie equation uses the momentum, so the mass must be
> in kilograms and the speed in metres per second. A common error is to
> substitute a wavelength in nanometres or a mass in grams. Change every
> quantity to SI before you divide. A second error is to use the accelerating
> potential difference in volts as if it were an energy. Multiply the potential
> difference by the charge to get the kinetic energy in joules.

## 4. Try it: the electron wavelength

The figure draws the de Broglie wavelength of an electron as the accelerating
voltage changes. A slider sets the potential difference, and the readout gives
the kinetic energy, the momentum and the wavelength.

**Predict first.** Do not move the slider yet. Write down your answers.

1. If you double the accelerating voltage, does the wavelength double, halve, or
   change by a factor of $\sqrt{2}$?
2. Which has the shorter wavelength: a slow electron or a fast electron?
3. The wavelength of a 150 V electron is about 0.10 nm. What will it be at
   600 V?

**Test.** Set the voltage to 150 V and read the wavelength. Then set it to 600 V
and read the wavelength again. Change the voltage through a few values and check
each prediction.

**Explain.** Why does increasing the voltage make the electron's wavelength
shorter? Write two or three sentences. Use the ideas that a larger voltage gives
more kinetic energy, that more kinetic energy means more momentum, and that
$\lambda = \dfrac{h}{p}$.

:::figure de-broglie

## Progress check

Return to the hospital tracer. The teaching electron gun accelerates electrons
through a potential difference of 150 V.

1. Find the kinetic energy of an electron in the gun, in joules.
2. Find the momentum of the electron.
3. Find the de Broglie wavelength of the electron.
4. The team increases the voltage to 600 V. Predict what happens to the
   wavelength, and give a reason.

If question 1 goes wrong, use $E_k = eV$ and change the electronvolt to joules.
If question 2 goes wrong, use $p = \sqrt{2mE_k}$ with $m = 9.11 \times
10^{-31}\,\text{kg}$. If question 3 goes wrong, use $\lambda = \dfrac{h}{p}$.
If question 4 goes wrong, think about what more kinetic energy does to the
momentum.

## You should now be able to

- explain why light is described by both a wave model and a particle model;
- state the de Broglie hypothesis;
- use $\lambda = \dfrac{h}{p} = \dfrac{h}{mv}$;
- find the momentum and wavelength of an electron accelerated through a
  potential difference;
- describe electron diffraction, and explain why it is evidence for matter
  waves;
- explain why a large object has an unobservably small wavelength;
- explain how the diffraction pattern changes with the accelerating voltage.
