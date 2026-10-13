---
title: 6.2 Diffraction and polarisation — Learn
chapter: 6
chapter_title: Waves
section: '6.2'
section_title: Diffraction and polarisation
dfe:
- AP6
kind: walkthrough
---

# 6.2 Diffraction and polarisation — Learn

**Prerequisites:** the wave equation and the idea of wavelength from Section 6.1;
using the sine of an angle and rearranging a formula from Section 2.2.

**By the end of this section you can:** describe diffraction and say what
controls how much a wave spreads; describe the single-slit pattern; use
$d\sin\theta = n\lambda$ for a diffraction grating; find the highest order a
grating can give; explain what polarisation is and why only transverse waves
show it; and work out what a polarising filter does to the light that reaches it.

## 1. Diffraction

**Diffraction** is the spreading of a wave when it passes through a gap or past
an edge. A wave does not travel only in straight lines. When part of a wavefront
is blocked, the rest bends into the space beyond.

How much the wave spreads depends on the size of the gap compared with the
wavelength.

- When the gap is **much wider** than the wavelength, the wave passes almost
  straight through. A little spreading happens at the edges.
- When the gap is **about the same size** as the wavelength, the wave spreads out
  strongly and the gap acts almost like a new source.

This explains why you can hear someone through a doorway from around a corner,
but you cannot see them. The wavelength of sound is about a metre, which is close
to the width of the doorway. The wavelength of light is about 500 nm, which is
far smaller than the doorway, so the light travels almost straight on.

> **Watch out.** Do not think that a wider gap makes more diffraction. The
> opposite is true. The larger the gap compared with the wavelength, the less the
> wave spreads. The clearest spreading happens when the gap is about one
> wavelength wide.
> **Re-check:** compare the gap with the wavelength and ask which is larger.

## 2. The single-slit pattern

Shine a laser through a narrow single slit and the light spreads into a pattern
of bright and dark bands. The middle band is the **central maximum**. It is twice
as wide as each of the bands on either side, and much brighter.

The width of the central maximum grows when:

- the wavelength is larger;
- the slit is narrower;
- the screen is further away.

So a narrower slit gives a wider pattern. This is the same rule as in Section 1,
read the other way round: the slit size compared with the wavelength decides how
much the wave spreads.

## 3. The diffraction grating

A **diffraction grating** is a slide with thousands of parallel slits, very close
together. A grating with $N$ lines per metre has a slit spacing

$$ d = \frac{1}{N} $$

For example, 500 lines per millimetre is $5.00 \times 10^5$ lines per metre, so
$d = \dfrac{1}{5.00 \times 10^5} = 2.00 \times 10^{-6}\,\text{m}$.

Light from every slit is coherent, because the same wave reaches all of them. The
bright maxima appear at the angles where the waves from all the slits arrive in
phase. The path difference between neighbouring slits is $d\sin\theta$, so the
**grating equation** is

$$ d\sin\theta = n\lambda $$

where $n$ is the **order** of the maximum: 0, 1, 2, …. The order $n = 0$ is the
straight-through direction, where every wavelength arrives in step.

The maxima from a grating are very narrow and very bright, much sharper than the
broad fringes from two slits. That is why a grating measures a wavelength so
precisely, and why it is used in a spectrometer to study the light from a star.

The largest possible value of $\sin\theta$ is 1, so the order cannot grow without
limit. The highest order a grating can give is the largest whole number $n$ with

$$ n\lambda \le d $$

**Worked example 1.** A grating has 600 lines per millimetre. It is lit by light
of wavelength 590 nm. Find the grating spacing, the angle of each order, and the
highest order the grating can give.

$$
\begin{aligned}
N &= 600\,\text{lines mm}^{-1} = 6.00 \times 10^{5}\,\text{lines m}^{-1} \\
d &= \frac{1}{N} = \frac{1}{6.00 \times 10^{5}} = 1.667 \times 10^{-6}\,\text{m}
\end{aligned}
$$

Now put $\lambda = 590 \times 10^{-9}\,\text{m}$ into the grating equation.

$$
\begin{aligned}
n = 1: \quad \sin\theta &= \frac{1 \times 590 \times 10^{-9}}{1.667 \times 10^{-6}} = 0.354
  \quad \Rightarrow \quad \theta = 20.7^\circ \\
n = 2: \quad \sin\theta &= \frac{2 \times 590 \times 10^{-9}}{1.667 \times 10^{-6}} = 0.708
  \quad \Rightarrow \quad \theta = 45.1^\circ
\end{aligned}
$$

For $n = 3$, $\sin\theta = 1.06$, which is greater than 1 and so impossible. The
highest order is 2. There are five maxima in all: the straight-through one, and
order 1 and order 2 on each side.

**Worked example 2.** A grating with a spacing of $2.00 \times 10^{-6}\,\text{m}$
gives its second-order maximum at $40.0^\circ$. Find the wavelength of the light.

$$
\begin{aligned}
d\sin\theta &= n\lambda \\
\lambda &= \frac{d\sin\theta}{n} = \frac{2.00 \times 10^{-6} \times \sin 40.0^\circ}{2} \\
        &= \frac{2.00 \times 10^{-6} \times 0.6428}{2} = 6.43 \times 10^{-7}\,\text{m}
\end{aligned}
$$

The wavelength is $6.43 \times 10^{-7}\,\text{m}$, or 643 nm. This is red light.

## 4. Polarisation

A transverse wave can be **polarised**. Light is a transverse wave, and its
electric field vibrates at right angles to the direction in which the light
travels. In ordinary, **unpolarised** light the direction of vibration is random
and changes from moment to moment.

A **polarising filter** lets through only the part of the vibration along one
line, called its **axis**. The light that leaves the filter is **plane
polarised**: its electric field now vibrates in one plane only.

A second filter, called an **analyser**, can test this.

- If its axis is **parallel** to the first, the light passes through.
- If its axis is **perpendicular** to the first, no light passes through. The
  filters are crossed.

At an angle $\theta$ between the axes, the transmitted amplitude is the component
of the electric field along the analyser axis:

$$ E = E_0\cos\theta $$

The intensity of the light is proportional to the square of the amplitude, so

$$ I = I_0\cos^2\theta $$

Only transverse waves can be polarised. Sound is longitudinal, so it has no
direction to filter out, and you cannot polarise a sound wave. This is direct
evidence that light is a transverse wave.

Polarisation has many uses. The light reflected from a wet road or from water is
partly polarised in the horizontal direction. Polarising sunglasses have a
vertical axis, so they cut that glare. A television aerial is turned to match the
polarisation of the broadcast signal.

> **Watch out.** A grating is not the same as two slits. With two slits the
> bright fringes are at $s\sin\theta = n\lambda$, but the pattern is broad and few
> fringes are seen. A grating has thousands of slits, and its maxima are narrow
> and sharp. Use the grating equation with the slit spacing $d = 1/N$, and
> remember that the order $n$ can only be a whole number.
> **Re-check:** ask whether the order $n$ in your answer is a whole number.

**Worked example 3.** Plane-polarised light of amplitude $40\,\text{V}\,\text{m}^{-1}$
falls on an analyser whose axis is at $60^\circ$ to the plane of polarisation.
Find the amplitude of the transmitted light and the fraction of the intensity
that passes.

$$
\begin{aligned}
E &= E_0\cos\theta = 40 \times \cos 60^\circ = 40 \times 0.50 = 20\,\text{V}\,\text{m}^{-1} \\
\frac{I}{I_0} &= \cos^2\theta = \cos^2 60^\circ = 0.25
\end{aligned}
$$

The transmitted amplitude is $20\,\text{V}\,\text{m}^{-1}$, and one quarter of
the intensity passes through the analyser.

## 5. Try it: a diffraction grating

The figure draws the maxima from a diffraction grating. Two sliders set the
wavelength of the light and the number of lines per millimetre.

**Predict first.** Do not move the sliders yet. Write down your answers.

1. If you use light of a longer wavelength, does the first-order maximum move
   further from the centre, or closer to it?
2. If you use a grating with more lines per millimetre, does the pattern spread
   out or become more tightly packed?
3. What happens to the highest order that the grating can give when the
   wavelength is long?

**Test.** Set the wavelength to 600 nm and the grating to 300 lines per
millimetre. Read the angle of each order. Then change one slider at a time and
check each prediction.

**Explain.** Why does a grating with more lines per millimetre produce maxima at
larger angles? Write two or three sentences. Use the grating equation and the
fact that $d = 1/N$.

:::figure grating-orders

## Progress check

Return to the concert hall. The laser has a wavelength of 633 nm, and the
diffraction grating has 300 lines per millimetre.

1. Find the grating spacing $d$, in metres.
2. Find the angle of the first-order maximum.
3. Find the highest order the grating can give.
4. The light then passes through two polarising filters whose axes are at $60^\circ$
   to each other. Find the fraction of the light that passes through both.

If question 1 goes wrong, convert the lines per millimetre to lines per metre
first, then use $d = 1/N$. If question 2 goes wrong, use
$\sin\theta = \dfrac{n\lambda}{d}$. If question 3 goes wrong, find the largest
whole number $n$ with $n\lambda \le d$. If question 4 goes wrong, use
$\cos^2\theta$ with $\theta = 60^\circ$.

## You should now be able to

- describe diffraction, and say how the gap size changes the amount of spreading;
- describe the single-slit pattern and its central maximum;
- find the slit spacing of a grating from the number of lines per metre;
- use $d\sin\theta = n\lambda$ to find an angle, a spacing or a wavelength;
- find the highest order a grating can give;
- explain the difference between the pattern from two slits and from a grating;
- explain what is meant by unpolarised and plane-polarised light;
- describe what a polarising filter does, and what happens with two filters;
- work out the transmitted amplitude and intensity through an analyser;
- explain why sound cannot be polarised.
