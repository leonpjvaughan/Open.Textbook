---
title: 10.5 The diffraction grating — Learn
chapter: 10
chapter_title: Reflection, refraction and diffraction
section: '10.5'
section_title: The diffraction grating
tier: H
refs:
- '2.3'
kind: walkthrough
---

# 10.5 The diffraction grating — Learn

**Prerequisites:** diffraction and interference from Section 10.4; angles and the
sine of an angle from earlier work.

**Objectives:** describe what a diffraction grating is; find the slit spacing from
the number of lines per millimetre; use $n\lambda = d\sin\theta$; explain why the
maxima are sharp; find the largest visible order.

By the end of this section, you can use a grating to find the angle of a maximum and
to measure the wavelength of light.

## Many slits instead of two

A **diffraction grating** is a sheet of glass or plastic with many thousands of
equally spaced parallel slits ruled on it. A typical grating has 300 lines in every
millimetre, so the distance between neighbouring slits is a few millionths of a
metre.

The **slit spacing** $d$ is the distance between the centres of neighbouring slits.
If a grating has $N$ lines in one millimetre, then

$$d = \frac{1\,\text{mm}}{N} = \frac{1 \times 10^{-3}\,\text{m}}{N}$$

**Example 1.** A grating has 300 lines per millimetre. Calculate the slit spacing.

$$d = \frac{0.001}{300} = 3.33 \times 10^{-6}\,\text{m}$$

Each slit is a source of diffracted light. Light from every slit interferes with
light from every other slit, and the pattern is much sharper than the pattern from
two slits.

## The grating equation

Light from neighbouring slits travels a different distance to the screen. The path
difference between light from two neighbouring slits is $d\sin\theta$, where
$\theta$ is the angle from the normal. A bright maximum appears whenever this path
difference is a whole number of wavelengths.

> **The grating equation.**
>
>
> $$n\lambda = d\sin\theta$$
>
>
>
> - $n$ is the **order** of the maximum, a whole number: 0, 1, 2, 3, …;
> - $\lambda$ is the wavelength of the light, in metres (m);
> - $d$ is the slit spacing, in metres (m);
> - $\theta$ is the angle between the maximum and the normal.

The order $n = 0$ is the central maximum, in line with the beam. The first-order
maxima are on either side at $n = 1$, and so on.

**Example 2.** Light of wavelength 650 nm falls on a grating with 300 lines per
millimetre. Calculate the angle of the first-order maximum.

The slit spacing is $d = 3.33 \times 10^{-6}$ m. For the first order, $n = 1$:

$$\sin\theta = \frac{\lambda}{d} = \frac{6.50 \times 10^{-7}}{3.33 \times 10^{-6}}
= 0.195$$

$$\theta = 11.2^\circ$$

**Example 3.** For the same grating and the same light, calculate the angle of the
second-order maximum.

For the second order, $n = 2$:

$$\sin\theta = \frac{2\lambda}{d} = \frac{2 \times 6.50 \times 10^{-7}}
{3.33 \times 10^{-6}} = 0.390$$

$$\theta = 23.0^\circ$$

The second-order maximum is further from the centre than the first-order maximum,
because the path difference must now be two wavelengths.

**Example 4.** Light of unknown wavelength falls on a grating with 500 lines per
millimetre. The first-order maximum is at 18.0°. Calculate the wavelength of the
light.

The slit spacing is $d = \dfrac{0.001}{500} = 2.0 \times 10^{-6}$ m. For the first
order, $n = 1$:

$$\lambda = d\sin\theta = 2.0 \times 10^{-6} \times \sin 18.0^\circ
= 2.0 \times 10^{-6} \times 0.3090 = 6.18 \times 10^{-7}\,\text{m}$$

That is 618 nm, which is orange-red light.

## The largest visible order

The largest possible value of $\sin\theta$ is 1, because the sine of an angle cannot
be greater than 1. So the order cannot exceed $\dfrac{d}{\lambda}$.

**Example 5.** Light of wavelength 650 nm falls on a grating with 300 lines per
millimetre. Calculate the largest order that can be seen.

$$\frac{d}{\lambda} = \frac{3.33 \times 10^{-6}}{6.50 \times 10^{-7}} = 5.13$$

The largest whole number below 5.13 is 5, so five orders are visible on each side of
the centre. A sixth order would need $\sin\theta$ to be greater than 1, which is
impossible.

## Why the maxima are sharp

A grating with two slits gives broad fringes. A grating with many hundreds of slits
gives very narrow, very bright maxima, with wide dark regions between them.

At an angle that satisfies $n\lambda = d\sin\theta$, light from every slit arrives in
step. The hundreds of waves add together, so the maximum is bright. Move a little to
one side and the light from the first slit and the last slit are no longer in step.
The many waves cancel almost completely, so the maximum is narrow and the region
between maxima is dark.

This is why a grating is used in a **spectrometer** to measure wavelengths. The
maxima are sharp enough to separate two wavelengths that are very close together. A
grating also splits white light into a spectrum, and the red end of each spectrum
lies further from the centre than the violet end, because red light has the longer
wavelength.

> **Watch out.** In the grating equation, $n$ is the **order** of the maximum, not a
> refractive index. It is a whole number, and it has no unit. The slit spacing $d$
> must be in metres, so convert lines per millimetre first. The angle $\theta$ is
> measured from the normal.
> **Re-check:** ask whether the question is asking for an order (a whole number) or a
> refractive index (a ratio near 1.5).

## Progress check

Back to the chapter problem. The student now sends the laser, of wavelength 650 nm,
through a diffraction grating with 300 lines per millimetre.

1. Calculate the slit spacing of the grating.
2. Calculate the angle of the first-order maximum.
3. Calculate the angle of the second-order maximum.
4. Calculate the largest order that can be seen, and explain why no larger order is
   possible.
5. The student replaces the grating with two slits of the same spacing. State one
   difference the student sees in the pattern, and explain why.

Keep your answers. The Review brings the block, the slit and the grating together.

## You should now be able to

- describe a diffraction grating and find its slit spacing from the lines per
  millimetre;
- use $n\lambda = d\sin\theta$ to find an angle, a wavelength or a slit spacing;
- explain what the order of a maximum is;
- find the largest visible order;
- explain why a grating gives sharp maxima, and why it is used in a spectrometer.
