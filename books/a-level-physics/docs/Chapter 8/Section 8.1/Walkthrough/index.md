---
title: 8.1 Photons and the photoelectric effect — Learn
chapter: 8
chapter_title: Quantum and nuclear physics
section: '8.1'
section_title: Photons and the photoelectric effect
dfe:
- AP8
kind: walkthrough
---

# 8.1 Photons and the photoelectric effect — Learn

**Prerequisites:** the wave equation and the speed of light from Section 6.1;
work, energy and the conservation of energy from Section 3.3; SI prefixes and
the electronvolt from Section 1.1; rearranging an equation.

**By the end of this section you can:** describe light as a stream of photons;
use $E = hf = \dfrac{hc}{\lambda}$; explain the photoelectric effect; define the
work function and the threshold frequency; use $hf = \phi + E_{k(\text{max})}$;
find the stopping potential; and explain why the maximum kinetic energy does not
depend on the intensity.

## 1. The photon model

Light carries energy. In the wave model of Chapter 6, the energy of a beam is
spread along the wave. In the **photon model**, the energy arrives in short
bursts called **photons**. A photon is a packet of electromagnetic energy. It
travels at the speed of light and has no rest mass.

The energy of one photon depends only on its frequency:

$$ E = hf $$

Here $h$ is the **Planck constant**,
$h = 6.63 \times 10^{-34}\,\text{J}\,\text{s}$. A high-frequency photon carries
more energy than a low-frequency photon. Since $c = f\lambda$, the energy can
also be written with the wavelength:

$$ E = hf = \frac{hc}{\lambda} $$

The energy of a photon is often measured in **electronvolts**. One electronvolt
is the energy transferred when an electron moves through a potential difference
of one volt:

$$ 1\,\text{eV} = 1.60 \times 10^{-19}\,\text{J} $$

**Worked example 1.** A gamma-ray photon from the hospital tracer has an energy
of 511 keV. Find its energy in joules, its frequency and its wavelength.

First change keV to eV and then to joules.

$$
\begin{aligned}
E &= 511 \times 10^{3} \times 1.60 \times 10^{-19} \\
  &= 8.18 \times 10^{-14}\,\text{J}
\end{aligned}
$$

Now use $E = hf$ to find the frequency.

$$
\begin{aligned}
f &= \frac{E}{h} = \frac{8.18 \times 10^{-14}}{6.63 \times 10^{-34}} \\
  &= 1.23 \times 10^{20}\,\text{Hz}
\end{aligned}
$$

Then use $c = f\lambda$ for the wavelength.

$$
\begin{aligned}
\lambda &= \frac{c}{f} = \frac{3.00 \times 10^{8}}{1.23 \times 10^{20}} \\
        &= 2.43 \times 10^{-12}\,\text{m}
\end{aligned}
$$

The photon has an energy of $8.18 \times 10^{-14}\,\text{J}$, a frequency of
$1.23 \times 10^{20}\,\text{Hz}$ and a wavelength of
$2.43 \times 10^{-12}\,\text{m}$.

## 2. Energy levels and line spectra

An electron in an atom can occupy only certain **energy levels**. The atom
emits a photon when an electron drops from a higher level to a lower one. The
energy of the photon is the energy gap between the two levels:

$$ hf = E_1 - E_2 $$

Because the levels are fixed, an atom emits only certain photon energies. Each
element gives a unique set of bright lines, called its **line spectrum**. This is
how the elements in a star are identified.

**Worked example 2.** In a hydrogen atom, an electron falls from a level at
$-3.40\,\text{eV}$ to a level at $-13.6\,\text{eV}$. Find the energy of the
emitted photon, its frequency and its wavelength.

The energy gap is the difference between the two levels.

$$
\begin{aligned}
E &= E_1 - E_2 = -3.40 - (-13.6) \\
  &= 10.2\,\text{eV} = 10.2 \times 1.60 \times 10^{-19} \\
  &= 1.63 \times 10^{-18}\,\text{J}
\end{aligned}
$$

$$
\begin{aligned}
f &= \frac{E}{h} = \frac{1.63 \times 10^{-18}}{6.63 \times 10^{-34}}
   = 2.46 \times 10^{15}\,\text{Hz} \\
\lambda &= \frac{c}{f} = \frac{3.00 \times 10^{8}}{2.46 \times 10^{15}}
        = 1.22 \times 10^{-7}\,\text{m}
\end{aligned}
$$

The photon has an energy of $10.2\,\text{eV}$ and a wavelength of 122 nm, in the
ultraviolet.

## 3. The photoelectric effect

When light of a high enough frequency falls on a clean metal surface, electrons
leave the surface. This is the **photoelectric effect**. The emitted electrons
are called **photoelectrons**, and the current they form is the
**photocurrent**.

Three observations need the photon model.

- **There is a threshold frequency.** Light below a certain frequency releases
  no electrons, however bright the light is.
- **Emission is immediate.** Electrons leave as soon as the light arrives, even
  when the light is very dim.
- **The maximum kinetic energy depends on the frequency, not the intensity.**

The wave model cannot explain these facts. A wave would spread its energy over
the whole surface, so a dim wave would take time to build up enough energy to
free an electron. It would also have no reason to need a minimum frequency.

The photon model explains all three. One photon is absorbed by one electron. The
electron needs a certain minimum energy to escape from the metal. This minimum
energy is the **work function** $\phi$ of the metal. If the photon energy $hf$
is less than the work function, the electron cannot escape, no matter how many
photons arrive. If $hf$ is larger than the work function, the electron escapes,
and the extra energy becomes its kinetic energy.

## 4. The photoelectric equation

The energy of the photon is shared between escaping from the metal and the
kinetic energy of the electron. The most energetic electrons escape with

$$ hf = \phi + E_{k(\text{max})} $$

The **threshold frequency** $f_0$ is the lowest frequency that releases an
electron. At this frequency the electron escapes with no kinetic energy, so
$hf_0 = \phi$. The corresponding **threshold wavelength** is

$$ \lambda_0 = \frac{hc}{\phi} $$

**Worked example 3.** Ultraviolet light of wavelength 250 nm falls on the
detector photocathode, which has a work function of 2.00 eV. Find the maximum
kinetic energy of the emitted electrons, in eV.

Find the photon energy first.

$$
\begin{aligned}
E &= \frac{hc}{\lambda}
   = \frac{6.63 \times 10^{-34} \times 3.00 \times 10^{8}}{250 \times 10^{-9}} \\
  &= 7.96 \times 10^{-19}\,\text{J} = \frac{7.96 \times 10^{-19}}{1.60 \times 10^{-19}}\,\text{eV} \\
  &= 4.97\,\text{eV}
\end{aligned}
$$

Then use the photoelectric equation.

$$
E_{k(\text{max})} = hf - \phi = 4.97 - 2.00 = 2.97\,\text{eV}
$$

The most energetic photoelectrons leave with $2.97\,\text{eV}$ of kinetic
energy.

## 5. The stopping potential

A photoelectron can be stopped by an opposing potential difference. The
**stopping potential** $V_s$ is the potential difference that brings the fastest
electron to rest. The work done against the electric field equals the maximum
kinetic energy, so

$$ eV_s = E_{k(\text{max})} \qquad V_s = \frac{E_{k(\text{max})}}{e} $$

If the maximum kinetic energy is measured in electronvolts, the stopping
potential in volts is the same number. A maximum kinetic energy of 2.97 eV needs
a stopping potential of 2.97 V.

**Worked example 4.** Find the threshold wavelength for the photocathode of
Worked example 3, whose work function is 2.00 eV.

$$
\begin{aligned}
\phi &= 2.00\,\text{eV} = 2.00 \times 1.60 \times 10^{-19} = 3.20 \times 10^{-19}\,\text{J} \\
\lambda_0 &= \frac{hc}{\phi} = \frac{6.63 \times 10^{-34} \times 3.00 \times 10^{8}}{3.20 \times 10^{-19}} \\
           &= 6.22 \times 10^{-7}\,\text{m}
\end{aligned}
$$

The threshold wavelength is 622 nm. Light of a longer wavelength, such as deep
red light, releases no electrons from this surface.

> **Watch out.** Intensity and photon energy are different things. Making the
> light brighter adds more photons each second, so more electrons are emitted
> and the photocurrent is larger. It does not change the energy of each photon,
> so it does not change the maximum kinetic energy of an electron. A common
> error is to think that a brighter red light will release electrons from a
> surface that needs green light. It will not. Check the frequency against the
> threshold before you use the intensity.

## 6. Try it: the photoelectric cell

The figure draws a photocell. Two sliders set the wavelength of the light and
the work function of the metal. The readout gives the photon energy, whether
emission happens, and the maximum kinetic energy.

**Predict first.** Do not move the sliders yet. Write down your answers.

1. If you make the light brighter without changing its colour, what happens to
   the maximum kinetic energy of the electrons?
2. If you increase the work function, does the threshold wavelength get longer
   or shorter?
3. For a fixed metal, which releases faster electrons: red light or blue light?

**Test.** Set the work function to 2.00 eV and the wavelength to 250 nm. Read
the photon energy and the maximum kinetic energy. Then increase the wavelength
past 622 nm and watch what happens. Change one slider at a time and check each
prediction.

**Explain.** Why does the emission stop when the wavelength passes the threshold
wavelength? Write two or three sentences. Use the idea that one photon is
absorbed by one electron, and that the photon must carry at least the work
function.

:::figure photoelectric-effect

## Progress check

Return to the hospital tracer. The gamma photons have an energy of 511 keV. The
detector photocathode has a work function of 2.00 eV. It is tested with
ultraviolet light of wavelength 250 nm.

1. Find the energy of one 511 keV gamma photon in joules, and its frequency.
2. Find the maximum kinetic energy of the electrons released by the 250 nm
   ultraviolet light, in eV.
3. Find the stopping potential for those electrons.
4. Explain why a brighter ultraviolet lamp does not increase the maximum kinetic
   energy of the electrons.
5. Explain why a red lamp of wavelength 700 nm releases no electrons from this
   photocathode.

If question 1 goes wrong, multiply the energy in eV by $1.60 \times 10^{-19}$,
then divide by $h$. If question 2 goes wrong, use $E_{k(\text{max})} = hf -
\phi$. If question 3 goes wrong, the stopping potential in volts is the maximum
kinetic energy in electronvolts. If question 5 goes wrong, compare 700 nm with
the threshold wavelength of 622 nm.

## You should now be able to

- describe a photon as a packet of electromagnetic energy;
- use $E = hf$ and $E = \dfrac{hc}{\lambda}$ to find a photon energy;
- convert between joules and electronvolts;
- use $hf = E_1 - E_2$ for an atomic transition and describe a line spectrum;
- state the three observations of the photoelectric effect;
- define the work function and the threshold frequency;
- use $hf = \phi + E_{k(\text{max})}$;
- find a threshold wavelength from a work function;
- find the stopping potential from the maximum kinetic energy;
- explain why intensity does not change the maximum kinetic energy.
