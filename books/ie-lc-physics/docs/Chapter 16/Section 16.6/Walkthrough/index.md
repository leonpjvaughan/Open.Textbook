---
title: 16.6 R.M.S. values of alternating current — Learn
chapter: 16
chapter_title: Electromagnetic induction
section: '16.6'
section_title: R.M.S. values of alternating current
tier: H
refs:
- '3.6'
kind: walkthrough
---

# 16.6 R.M.S. values of alternating current — Learn

**Prerequisites:** the a.c. generator from Section 16.4; electrical power from
Section 14.4; Ohm's law from Section 14.2.

**Objectives:** define the r.m.s. value of an alternating current or voltage; use
$V_{\text{rms}} = \dfrac{V_0}{\sqrt{2}}$ and $I_{\text{rms}} =
\dfrac{I_0}{\sqrt{2}}$; use the r.m.s. values in the power equations.

By the end of this section, you can find the steady value that transfers energy at
the same rate as an alternating supply, and use it to find a power.

## Why the mean value will not do

An alternating current rises to a peak in one direction, falls back through zero,
reaches a peak in the other direction, and returns to zero. Over one complete
cycle, the current spends as long negative as positive, so its **mean value is
zero**.

A mean of zero is useless for working out energy. A heater connected to an
alternating supply gets hot, and a mean current of zero would predict no heating at
all. The energy transferred depends on $I^2$, and a square is never negative, so
the square of the current has a positive mean even though the current itself does
not.

## The r.m.s. value

The value that describes the heating effect is the **root mean square** value, or
r.m.s. value.

> **The r.m.s. value of an alternating current** is the value of steady direct
> current that transfers energy at the same average rate in a given resistor.

It is called the root mean square because it is found by squaring the current at
every instant, taking the mean of those squares, and then taking the square root.

For a sine wave, the result of that calculation is

$$I_{\text{rms}} = \frac{I_0}{\sqrt{2}} \qquad V_{\text{rms}} = \frac{V_0}{\sqrt{2}}$$

where $I_0$ and $V_0$ are the peak values. The factor $\dfrac{1}{\sqrt{2}}$ is about
0.707, so the r.m.s. value is about 70% of the peak.

An a.c. meter and a mains label both give r.m.s. values. The 230 V of the mains
supply is an r.m.s. value, so the peak is

$$V_0 = \sqrt{2} \times 230 = 325\,\text{V}$$

## Power with r.m.s. values

If you use the r.m.s. values in the power equations from Chapter 14, they give the
correct **average** power:

$$P = V_{\text{rms}}I_{\text{rms}} \qquad P = I_{\text{rms}}^2R \qquad P =
\frac{V_{\text{rms}}^2}{R}$$

Using the peak values in these equations would give twice the correct power,
because the peak lasts for only an instant.

**Example 1.** The peak output of the generator is 340 V. Calculate the r.m.s.
output.

$$
V_{\text{rms}} = \frac{V_0}{\sqrt{2}} = \frac{340}{1.414} = 240\,\text{V}
$$

**Example 2.** An alternating current has a peak value of 3.0 A. Calculate its
r.m.s. value.

$$
I_{\text{rms}} = \frac{I_0}{\sqrt{2}} = \frac{3.0}{1.414} = 2.1\,\text{A}
$$

**Example 3.** A heater of resistance 60 Ω is connected to an r.m.s. voltage of
240 V. Calculate the r.m.s. current and the average power transferred to the
heater.

$$
I_{\text{rms}} = \frac{V_{\text{rms}}}{R} = \frac{240}{60} = 4.0\,\text{A}
$$

$$
P = I_{\text{rms}}^2R = 4.0^2 \times 60 = 16 \times 60 = 960\,\text{W}
$$

The same answer comes from $P = \dfrac{V_{\text{rms}}^2}{R} = \dfrac{240^2}{60} =
\dfrac{57\,600}{60} = 960$ W.

> **Watch out.** The power equations use the **r.m.s.** values, not the peak
> values and not the mean. The mean of an alternating current over a full cycle is
> zero, so it cannot be used at all. Using the peak value in $P = I^2R$ gives twice
> the true average power, because the current only reaches its peak for an instant.

## Progress check

Back to the chapter problem. The generator delivers 24 kW at an r.m.s. voltage of
240 V.

Calculate the r.m.s. current in the circuit, and then the peak current. Compare the
peak current with the current you found in Section 16.5 when the voltage was not
raised. Then explain, in one sentence, why the power is calculated with the r.m.s.
current rather than the peak current.

## You should now be able to

- explain why the mean value of an alternating current is not useful for finding
  energy;
- define the r.m.s. value of an alternating current or voltage;
- use $I_{\text{rms}} = \dfrac{I_0}{\sqrt{2}}$ and $V_{\text{rms}} =
  \dfrac{V_0}{\sqrt{2}}$, in either direction;
- use the r.m.s. values in $P = V_{\text{rms}}I_{\text{rms}}$, $P =
  I_{\text{rms}}^2R$ and $P = \dfrac{V_{\text{rms}}^2}{R}$ to find an average
  power.
