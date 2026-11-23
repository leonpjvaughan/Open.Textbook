---
title: 'Chapter 16: Review'
chapter: 16
kind: review
---

# Chapter 16: Review

## The chapter problem, solved

**The stream that lights the village.** A stream turns a turbine, and the turbine
spins a generator coil of 180 turns. Each turn encloses an area of 0.020 m², and
the coil turns at 50 revolutions each second in a field of flux density 0.30 T. The
generator delivers 24 kW, and a cable of resistance 4.0 Ω carries the energy to the
village. A step-up transformer raises the voltage to 24 kV for the journey.

**Step 1: the flux through one turn.** With the plane of the coil at right angles
to the field, the flux is at its largest:

$$\Phi = BA = 0.30 \times 0.020 = 6.0 \times 10^{-3}\,\text{Wb}$$

**Step 2: the flux linkage.** Every turn links the same flux, so

$$N\Phi = 180 \times 6.0 \times 10^{-3} = 1.08\,\text{Wb}$$

**Step 3: the average emf over a quarter turn.** A quarter of a revolution takes

$$\frac{T}{4} = \frac{1}{4 \times 50} = 5.0 \times 10^{-3}\,\text{s}$$

so the average emf is

$$E = \frac{\Delta(N\Phi)}{\Delta t} = \frac{1.08}{5.0 \times 10^{-3}} = 216\,\text{V}$$

**Step 4: the peak and the r.m.s. values.** The flux changes most quickly where it
is zero, and there the emf is at its peak. The measured peak is 340 V, so the
r.m.s. value is

$$V_{\text{rms}} = \frac{V_0}{\sqrt{2}} = \frac{340}{1.414} = 240\,\text{V}$$

**Step 5: why the voltage is stepped up.** At 240 V the current would be

$$I = \frac{P}{V} = \frac{24\,000}{240} = 100\,\text{A}$$

and the cable would waste

$$P_{\text{lost}} = I^2R = 100^2 \times 4.0 = 40\,000\,\text{W}$$

which is more than the generator supplies. Stepped up to 24 kV, the current is

$$I = \frac{24\,000}{24\,000} = 1.0\,\text{A}$$

and the waste is

$$P_{\text{lost}} = I^2R = 1.0^2 \times 4.0 = 4.0\,\text{W}$$

The turns ratio is $\dfrac{N_s}{N_p} = \dfrac{24\,000}{240} = 100$, so a
100-turn primary needs a 10 000-turn secondary.

**Step 6: where the energy comes from.** The induced current in the coil sits in a
magnetic field, so it feels a force that opposes the turning. By Lenz's law the
turbine must do work against that force, and that work is the energy transferred
from the falling water to the circuit. Some of the current's energy is transferred
to the resistance of the coil and the cable, which is why they warm up.

**The answer.** The coil links 1.08 Wb of flux, and the average emf over a quarter
turn is 216 V. The peak output is 340 V and the r.m.s. output is 240 V. At that
voltage the current would be 100 A and the cable would waste 40 kW, so the voltage
is stepped up by a turns ratio of 100 to 24 kV, which cuts the current to 1.0 A and
the waste to 4.0 W. The energy all comes from the work the water does against the
opposing force.

## Mixed practice — choose the method first

Work through these without notes. For each one, decide **which relationship
applies** and say why. Four of them come from earlier chapters, and the last one
asks you to choose between two relations that look similar.

:::problems chapter-16-review

:::answers chapter-16-review

## What you can now do

- define magnetic flux and magnetic flux density, and use $\Phi = BA$ and the flux
  linkage $N\Phi$;
- use Faraday's law, $E = N\dfrac{\Delta\Phi}{\Delta t}$, to find an induced emf;
- state Lenz's law and explain, using conservation of energy, why the induced
  current opposes the change that produced it;
- describe the parts of an a.c. generator and a d.c. generator, and sketch the
  output voltage against time for each;
- use the transformer relation $\dfrac{V_s}{V_p} = \dfrac{N_s}{N_p}$, the ideal
  transformer relation $V_pI_p = V_sI_s$, and an efficiency;
- explain why electrical energy is transmitted at a high voltage, and calculate
  the power lost in a cable;
<!-- tier:h -->
- define the r.m.s. value, use $V_{\text{rms}} = \dfrac{V_0}{\sqrt{2}}$ and
  $I_{\text{rms}} = \dfrac{I_0}{\sqrt{2}}$, and use the r.m.s. values in the power
  equations.
<!-- /tier:h -->

## Thinking back

Look back at the place you named at the start of the chapter — the nearest place
that generates electricity, or the nearest large machine that turns without a
battery.

You can now describe the change inside the generator, and you can say why the
voltage on the cable is much larger than the voltage at the socket. Write down one
number from your own example: a voltage, a current or a power. Then work out what
happens to the energy wasted in a cable if that current is halved. If your estimate
is rough, write that down too. Saying how rough an estimate is belongs in the
physics, and it is exactly what the Physics In Practice Investigation asks you to
do.
