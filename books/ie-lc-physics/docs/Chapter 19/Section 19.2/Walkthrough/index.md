---
title: 19.2 The Bohr model and energy levels — Learn
chapter: 19
chapter_title: Models of the atom
section: '19.2'
section_title: The Bohr model and energy levels
tier: O
refs:
- '4.3'
kind: walkthrough
---

# 19.2 The Bohr model and energy levels — Learn

**Prerequisites:** the nuclear model from Section 19.1; the photon and its energy from
Section 18.1; energy and the electronvolt from Chapter 4.

**Objectives:** describe Bohr's model of the hydrogen atom; state that an electron
occupies one of a set of fixed energy levels; use the energy levels of hydrogen and
$\Delta E = hf$ to find a photon energy, a frequency or a wavelength; explain what the
ionisation energy means.

By the end of this section, you can find the photon an atom emits from the two levels
the electron moves between.

## Why the nuclear model was not enough

The nuclear model explains the scattering experiment. It leaves two problems.

An electron moving in a circle is accelerating. A charged particle that accelerates
gives out energy, so the electron should spiral inwards and the atom should collapse.

The model also says nothing about the light from a gas. A gas gives out light only at
certain fixed wavelengths, and the nuclear model gives no reason for them.

In 1913 Niels Bohr changed the model to answer both problems.

## Allowed orbits and energy levels

Bohr kept the nucleus and the electrons outside it. He added one new rule.

An electron in an atom can occupy only certain allowed orbits. Each orbit has a fixed
energy, so the atom has a set of **energy levels**. An electron in an allowed orbit
does not give out energy.

An electron can move between levels, but it cannot sit between them. The move is
sometimes called a **quantum leap**.

- To move **up** a level, the electron must gain energy. It can absorb a photon, or it
  can be given energy in a collision.
- To move **down** a level, the electron loses energy. The atom gives out a photon.

## The energy levels of hydrogen

For the hydrogen atom, Bohr's model gives a simple formula for the energy of each
level.

$$E_n = -\frac{13.6}{n^2}\,\text{eV}$$

- $n$ is the level number: $1, 2, 3, \ldots$;
- $E_n$ is the energy of level $n$, in electronvolts.

The level with $n = 1$ is the **ground state**. The atom has its lowest energy there.
The higher levels are **excited states**.

| Level $n$ | Energy / eV | Name |
|---|---|---|
| 1 | $-13.6$ | ground state |
| 2 | $-3.40$ | first excited state |
| 3 | $-1.51$ | |
| 4 | $-0.85$ | |
| $\infty$ | $0$ | electron free of the atom |

Every energy is negative. The zero is chosen with the electron free of the atom, at
$n = \infty$. An electron bound in the atom has less energy than a free one, so its
energy is negative.

The energy needed to move the electron from the ground state to $n = \infty$ is
$13.6$ eV. This is the **ionisation energy** of hydrogen.

**Example 1.** Calculate the energy of the $n = 2$ level of the hydrogen atom.

$$
E_2 = -\frac{13.6}{2^2}
$$

$$
E_2 = -\frac{13.6}{4} = -3.40\,\text{eV}
$$

**Example 2.** Calculate the energy needed to lift the electron from the ground state
to $n = \infty$.

$$
\Delta E = E_\infty - E_1
$$

$$
\Delta E = 0 - (-13.6) = 13.6\,\text{eV}
$$

This is the ionisation energy. It takes 13.6 eV to remove the electron from a hydrogen
atom.

## Photons from quantum leaps

When an electron moves between two levels, the atom absorbs or emits one photon. The
energy of that photon equals the difference between the two levels.

$$\Delta E = E_{\text{higher}} - E_{\text{lower}} = hf = \frac{hc}{\lambda}$$

- $\Delta E$ is the photon energy, in joules;
- $h = 6.6 \times 10^{-34}$ J s is the Planck constant;
- $f$ is the frequency, in hertz (Hz);
- $c = 3.0 \times 10^{8}$ m/s is the speed of light;
- $\lambda$ is the wavelength, in metres (m).

Because the levels are fixed, the differences are fixed too. So an atom can emit only
certain photon energies, which means only certain wavelengths. That is the origin of
the bright lines in Section 19.3.

**Example 3.** Calculate the energy of the photon emitted when an electron in a
hydrogen atom moves from the $n = 3$ level to the $n = 2$ level. Take the energies of
the two levels as $-1.51$ eV and $-3.40$ eV.

$$
\Delta E = E_3 - E_2
$$

$$
\Delta E = -1.51 - (-3.40) = 1.89\,\text{eV}
$$

The electron loses energy, so the atom gives out a photon of energy 1.89 eV.

**Example 4.** A hydrogen lamp gives a bright red line of wavelength 656 nm. Calculate
the energy of one photon of this light. Take $h = 6.6 \times 10^{-34}$ J s and
$c = 3.0 \times 10^{8}$ m/s.

First change the wavelength to metres: $656\,\text{nm} = 6.56 \times 10^{-7}$ m. Then

$$
E = \frac{hc}{\lambda}
$$

$$
E = \frac{6.6 \times 10^{-34} \times 3.0 \times 10^{8}}{6.56 \times 10^{-7}}
$$

$$
E = 3.0 \times 10^{-19}\,\text{J}
$$

That is $1.9$ eV, close to the 1.89 eV of Example 3. The red line comes from the
$n = 3$ to $n = 2$ transition.

**Example 5.** A photon from the red line carries $3.0 \times 10^{-19}$ J. Calculate
its frequency.

$$
E = hf
$$

$$
f = \frac{E}{h} = \frac{3.0 \times 10^{-19}}{6.6 \times 10^{-34}}
$$

$$
f = 4.5 \times 10^{14}\,\text{Hz}
$$

> **Watch out.** The photon energy is the **difference** between two levels, never the
> energy of one level on its own. The level energies are negative, so take care with
> the signs: $E_3 - E_2 = -1.51 - (-3.40)$, which is positive. A negative answer for an
> emitted photon means the two levels are the wrong way round. Also, an atom can absorb
> a photon only when the photon energy equals a gap exactly. A photon of the wrong
> energy passes straight through.

## Progress check

Back to the chapter problem. The hydrogen lamp gives a bright red line at 656 nm. You
found in Example 4 that one photon of this light carries $3.0 \times 10^{-19}$ J, which
is $1.9$ eV.

Now use the level energies in the table. Write down $\Delta E = E_{\text{higher}} -
E_{\text{lower}}$ for the $n = 3$ to $n = 2$ transition, and calculate the difference.
Compare it with your photon energy, and write one sentence saying which transition
produced the red line. Section 19.3 uses the same reasoning for every line in the
spectrum.

## You should now be able to

- explain the two problems that the nuclear model could not solve;
- state what an allowed orbit and an energy level are;
- use $E_n = -\dfrac{13.6}{n^2}$ eV to find the energy of a level of hydrogen;
- explain what the ground state, an excited state and the ionisation energy mean;
- use $\Delta E = E_{\text{higher}} - E_{\text{lower}} = hf$ to find a photon energy,
  a frequency or a wavelength;
- explain why an atom emits only certain wavelengths.
