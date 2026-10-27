---
title: 18.4 X-ray production — Learn
chapter: 18
chapter_title: The photoelectric effect and X-rays
section: '18.4'
section_title: X-ray production
tier: O
refs:
- '4.2'
kind: walkthrough
---

# 18.4 X-ray production — Learn

**Prerequisites:** thermionic emission and the electron gun from Section 17.2; the
photon and $E = hf$ from Section 18.1; Einstein's equation from Section 18.3.

**Objectives:** describe how X-rays are produced in an X-ray tube; explain the
continuous spectrum and the shortest wavelength; use $eV = \dfrac{hc}{\lambda}$ to
find the shortest wavelength or the tube voltage.

By the end of this section, you can explain how an X-ray tube turns the energy of a
fast electron into a photon, and find the shortest wavelength it can produce.

## The X-ray tube

X-rays are produced when fast electrons strike a metal target. The tube that does
this has four parts.

- A **filament** is heated by a current. Electrons are released from it by thermionic
  emission, the same process that makes the electron beam in Chapter 17.
- A high **potential difference**, the tube voltage, accelerates those electrons
  towards the target. Each electron gains kinetic energy $eV$.
- A heavy metal **target**, often tungsten, stops the electrons.
- The tube is **evacuated**, so the electrons are not scattered by air on the way.

When a fast electron enters the target it slows down very quickly. The energy it
loses leaves the tube as an X-ray photon. Because the electron can lose any part of
its energy in this way, the tube gives out a **continuous spectrum** of X-ray
wavelengths.

The spectrum also carries a few sharp **characteristic lines**. These come from
electrons that knock an inner electron out of a target atom. An outer electron drops
into the vacancy and emits a photon of a fixed energy. That energy belongs to the
target element, so the lines depend on the metal and not on the tube voltage.

## The shortest wavelength

Most electrons lose their energy in several collisions, so most photons carry less
than $eV$. The shortest wavelength comes from the electron that gives **all** of its
energy to one photon in a single collision:

$$eV = \frac{hc}{\lambda_{\text{min}}}$$

Rearranged for the shortest wavelength:

$$\lambda_{\text{min}} = \frac{hc}{eV}$$

- $e$ is the charge on the electron, in coulombs (C);
- $V$ is the tube voltage, in volts (V);
- $\lambda_{\text{min}}$ is the shortest wavelength in the spectrum, in metres (m);
- $h$ is the Planck constant, $6.6 \times 10^{-34}$ J s;
- $c$ is the speed of light in a vacuum, $3.0 \times 10^{8}$ m/s.

The shortest wavelength therefore depends only on the tube voltage. Raise the voltage
and the whole continuous spectrum shifts to shorter wavelengths. Change the target and
the characteristic lines move, but the shortest wavelength stays where it was.

**Example 1.** An X-ray tube runs at 40 kV. Calculate the shortest wavelength it
produces.

$$
\lambda_{\text{min}} = \frac{hc}{eV}
$$

$$
\lambda_{\text{min}} = \frac{6.6 \times 10^{-34} \times 3.0 \times 10^{8}}{1.6
\times 10^{-19} \times 4.0 \times 10^{4}}
$$

$$
\lambda_{\text{min}} = 3.1 \times 10^{-11}\,\text{m}
$$

**Example 2.** Calculate the highest frequency of the X-rays from the same tube.

The shortest wavelength carries the highest frequency, because $c = f\lambda$. Using
$f_{\text{max}} = \dfrac{c}{\lambda_{\text{min}}}$:

$$
f_{\text{max}} = \frac{3.0 \times 10^{8}}{3.1 \times 10^{-11}}
$$

$$
f_{\text{max}} = 9.7 \times 10^{18}\,\text{Hz}
$$

**Example 3.** An X-ray tube must produce X-rays with a shortest wavelength of
$2.0 \times 10^{-11}$ m. Calculate the tube voltage needed.

Rearranging $eV = \dfrac{hc}{\lambda_{\text{min}}}$ for $V$:

$$
V = \frac{hc}{e\lambda_{\text{min}}}
$$

$$
V = \frac{6.6 \times 10^{-34} \times 3.0 \times 10^{8}}{1.6 \times 10^{-19} \times
2.0 \times 10^{-11}}
$$

$$
V = 6.2 \times 10^{4}\,\text{V}
$$

That is 62 kV.

> **Watch out.** The shortest wavelength is set by the **tube voltage**, not by the
> target metal. The characteristic lines are set by the target metal, not by the
> voltage. A student who raises the voltage moves the whole continuous spectrum to
> shorter wavelengths, but the sharp lines stay where they are.

## X-rays and the photoelectric effect

The two processes are inverse versions of the same idea, one electron and one photon
exchanging energy.

- In the photoelectric effect a **photon** gives its energy to an **electron**, which
  must pay the work function before it can escape.
- In an X-ray tube a fast **electron** gives its energy to a **photon**.

In both cases the exchange is all-or-nothing for one pair of particles. That is why
the photoelectric effect has a threshold frequency, and why the X-ray tube has a
shortest wavelength.

## Progress check

Back to the chapter problem. The blue light gave its electrons 0.75 eV each. An
X-ray tube runs at 40 kV instead, so its electrons carry far more energy.

Write down $eV = \dfrac{hc}{\lambda_{\text{min}}}$ and calculate the shortest
wavelength the tube can produce. Then write one sentence explaining why the same
single-photon idea sets both the threshold in Section 18.2 and this wavelength here.

## You should now be able to

- describe the filament, the accelerating voltage, the target and the vacuum of an
  X-ray tube;
- explain why the tube gives a continuous spectrum, and where the characteristic
  lines come from;
- use $eV = \dfrac{hc}{\lambda_{\text{min}}}$ to find the shortest wavelength from a
  tube voltage;
- find the highest frequency in the spectrum;
- find the tube voltage needed for a required shortest wavelength;
- explain how X-ray production is the inverse of the photoelectric effect.
