---
title: 18.3 Einstein's photoelectric equation — Learn
chapter: 18
chapter_title: The photoelectric effect and X-rays
section: '18.3'
section_title: Einstein's photoelectric equation
tier: O
refs:
- '4.2'
kind: walkthrough
---

# 18.3 Einstein's photoelectric equation — Learn

**Prerequisites:** the photon and $E = hf$ from Section 18.1; the work function and
the threshold frequency from Section 18.2; kinetic energy from Chapter 4.

**Objectives:** use Einstein's equation $hf = \Phi + \tfrac{1}{2}mv_{\text{max}}^2$;
find a work function, a maximum kinetic energy or a stopping voltage; explain the
graph of maximum kinetic energy against frequency.

By the end of this section, you can work out how much energy a photoelectron leaves
with, and you can read the Planck constant from a graph.

## Einstein's photoelectric equation

A photon gives all of its energy to one electron. The electron spends the work
function $\Phi$ to escape from the metal surface, and keeps whatever is left as
kinetic energy. Written as an equation:

$$hf = \Phi + \tfrac{1}{2}mv_{\text{max}}^2$$

- $hf$ is the energy of the photon, in joules (J);
- $\Phi$ is the work function of the metal, in joules (J);
- $\tfrac{1}{2}mv_{\text{max}}^2$ is the **maximum** kinetic energy of the emitted
  electron, in joules (J).

The equation is conservation of energy for one photon and one electron.

The word **maximum** matters. An electron at the surface needs only the work function
to escape. An electron deeper in the metal loses some energy on the way out, so it
leaves with less. The equation gives the energy of the fastest electrons, the ones
that needed only $\Phi$.

## The stopping voltage

You can measure the maximum kinetic energy with a stopping voltage. Apply a small
reverse potential difference across the photocell and increase it until the current
falls to zero. At that point the field has stopped the fastest electrons, so

$$eV_s = \tfrac{1}{2}mv_{\text{max}}^2$$

where $V_s$ is the **stopping voltage** in volts.

**Example 1.** Light of wavelength 500 nm falls on a metal of work function
$3.3 \times 10^{-19}$ J. Calculate the maximum kinetic energy of the emitted
electrons.

First find the photon energy:

$$
\frac{hc}{\lambda} = \frac{6.6 \times 10^{-34} \times 3.0 \times 10^{8}}{5.0 \times
10^{-7}} = 3.96 \times 10^{-19}\,\text{J}
$$

Then use Einstein's equation:

$$
E_k = hf - \Phi
$$

$$
E_k = 3.96 \times 10^{-19} - 3.3 \times 10^{-19}
$$

$$
E_k = 6.6 \times 10^{-20}\,\text{J}
$$

**Example 2.** A photoelectron leaves a surface with a maximum kinetic energy of
$1.2 \times 10^{-19}$ J. Calculate its maximum speed.

Rearranging $E_k = \tfrac{1}{2}mv^2$ for $v$:

$$
v = \sqrt{\frac{2E_k}{m}}
$$

$$
v = \sqrt{\frac{2 \times 1.2 \times 10^{-19}}{9.1 \times 10^{-31}}}
$$

$$
v = 5.1 \times 10^{5}\,\text{m/s}
$$

**Example 3.** For the same electron, calculate the stopping voltage.

$$
eV_s = E_k
$$

$$
V_s = \frac{E_k}{e} = \frac{1.2 \times 10^{-19}}{1.6 \times 10^{-19}}
$$

$$
V_s = 0.75\,\text{V}
$$

Working in electronvolts saves a conversion. In electronvolts, Einstein's equation
reads

$$E_k = E_{\text{photon}} - \Phi$$

with every term in electronvolts. A 2.8 eV photon and a 2.1 eV work function give a
0.7 eV electron.

> **Watch out.** Einstein's equation gives the **maximum** kinetic energy, not the
> energy of a typical electron. Electrons from deeper in the metal come out slower.
> Also check which energy you have before you substitute: $hf$ and $\Phi$ must be in
> the same unit, both joules or both electronvolts.

## The graph of maximum kinetic energy against frequency

Einstein's equation is the equation of a straight line. Write it as

$$E_k = hf - \Phi$$

Compare it with $y = mx + c$:

- the gradient $m$ is the **Planck constant** $h$;
- the intercept on the vertical axis is $-\Phi$, so the work function is the size of
  that intercept;
- the intercept on the frequency axis is the **threshold frequency** $f_0$, because
  there $E_k = 0$ and $hf_0 = \Phi$.

The line is straight, and it does not pass through the origin. The gradient is the
same for every metal; only the intercept moves with the work function.

## Guided investigation: reading the Planck constant from a graph

A student uses a photocell and a set of lamps of known frequency. For each lamp she
measures the stopping voltage and works out the maximum kinetic energy of the
photoelectrons. Her results are in the table.

| Frequency $f$ / $10^{14}$ Hz | Maximum kinetic energy / $10^{-19}$ J |
|---|---|
| 6.0 | 0.66 |
| 7.0 | 1.32 |
| 8.0 | 1.98 |
| 9.0 | 2.64 |
| 10.0 | 3.30 |

**Predict.** Before you plot anything, write down what you expect the graph of
$E_k$ against $f$ to look like. Will it be straight? Will it pass through the
origin? Where will it meet the frequency axis? Give a reason for each answer.

**Test.** Plot the five points with $f$ on the horizontal axis. Draw the best
straight line through them. Find its gradient, and read off both intercepts. Then
compare your prediction with what you plotted.

**Explain.** Write two or three sentences of your own. Say why the graph is a
straight line, why the gradient comes out as the Planck constant, and what the
intercept on the frequency axis means. This is the explanation the experiment is
for, so write it in your own words.

## Progress check

Back to the chapter problem. The blue lamp has a wavelength of 450 nm and the work
function is 2.0 eV. Its photon energy is 2.8 eV, from Section 18.1.

Write down Einstein's equation, then find the maximum kinetic energy of the emitted
electrons, in electronvolts. Then find the stopping voltage. Keep both answers:
Section 18.4 uses the same single-photon exchange of energy in an X-ray tube.

## You should now be able to

- state Einstein's photoelectric equation and name each term;
- use it to find a work function, a maximum kinetic energy or a stopping voltage;
- explain why the equation gives the maximum kinetic energy and not an average;
- describe the graph of maximum kinetic energy against frequency, and say what its
  gradient and both intercepts represent;
- use the stopping voltage to find the maximum kinetic energy of a photoelectron.
