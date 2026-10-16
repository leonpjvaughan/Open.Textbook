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

1. A coil of area 0.025 m² lies at right angles to a field of flux density 0.40 T.
   Calculate the flux through it.
2. A coil of 80 turns has a flux change of 0.015 Wb through each turn in 0.050 s.
   Calculate the average induced emf.
3. A bar magnet is pushed towards a coil, and then pulled away. Explain why the
   induced current reverses direction.
4. A generator turns at 25 revolutions each second and its peak output is 12 V.
   Calculate the period of the output and its r.m.s. value.
5. A transformer has 400 turns on the primary and 100 turns on the secondary. The
   primary voltage is 240 V. Calculate the secondary voltage.
6. An alternating current has a peak value of 6.0 A and flows through a 5.0 Ω
   resistor. Calculate the r.m.s. current and the average power transferred to the
   resistor.
7. A 6.0 Ω resistor and a 3.0 Ω resistor are connected in parallel across a 12 V
   supply. Calculate the combined resistance, the current from the supply and the
   total power.
8. A straight wire of length 0.30 m carries a current of 2.5 A at right angles to
   a field of flux density 0.20 T. Calculate the force on the wire.
9. A spring of spring constant 250 N/m is stretched by 0.12 m. Calculate the energy
   stored in it.
10. A transformer has a primary voltage of 240 V, a primary current of 2.0 A and
    500 turns on the primary. The secondary has 50 turns. Calculate the secondary
    voltage and the secondary current.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $\Phi = BA = 0.40 \times 0.025 = 0.010\,\text{Wb}$. Use $\Phi = BA$: the
   question gives a flux density and an area, and asks for a flux.
2. $E = N\dfrac{\Delta\Phi}{\Delta t} = 80 \times \dfrac{0.015}{0.050} = 80 \times
   0.30 = 24\,\text{V}$. Use Faraday's law, because the flux changes in a time.
3. When the magnet approaches, the flux increases, so the induced current opposes
   the increase. When the magnet moves away, the flux decreases, so the induced
   current opposes the decrease. Opposing an increase and opposing a decrease need
   opposite currents, so the direction reverses.
4. $T = \dfrac{1}{25} = 0.040\,\text{s}$, and $V_{\text{rms}} =
   \dfrac{12}{1.414} = 8.5\,\text{V}$. Use the frequency for the period, then the
   r.m.s. relation for the voltage.
5. $V_s = V_p \times \dfrac{N_s}{N_p} = 240 \times \dfrac{100}{400} = 60\,\text{V}$.
   Use the transformer equation: the turns ratio fixes the voltage ratio.
6. $I_{\text{rms}} = \dfrac{6.0}{1.414} = 4.2\,\text{A}$, and $P = I_{\text{rms}}^2R
   = 4.2^2 \times 5.0 = 17.64 \times 5.0 = 88\,\text{W}$. Use the r.m.s. current in
   the power equation, never the peak.
7. The combined resistance is $\dfrac{1}{R} = \dfrac{1}{6.0} + \dfrac{1}{3.0} =
   \dfrac{1}{6.0} + \dfrac{2}{6.0} = \dfrac{3}{6.0}$, so $R = 2.0\,\Omega$. The
   current is $I = \dfrac{12}{2.0} = 6.0\,\text{A}$, and the total power is
   $P = VI = 12 \times 6.0 = 72\,\text{W}$. Check the parallel answer: 2.0 Ω is
   smaller than the smallest resistor, 3.0 Ω.
8. $F = BIL = 0.20 \times 2.5 \times 0.30 = 0.15\,\text{N}$. Use the force
   equation from Chapter 15, because the wire carries a current in a field.
9. $E = \dfrac{1}{2}kx^2 = \dfrac{1}{2} \times 250 \times 0.12^2 = 125 \times 0.0144
   = 1.8\,\text{J}$. Use the elastic potential energy, not $F = kx$: the question
   asks for an energy.
10. $V_s = 240 \times \dfrac{50}{500} = 24\,\text{V}$. An ideal transformer
    transfers all the power, so $I_s = \dfrac{V_pI_p}{V_s} = \dfrac{240 \times
    2.0}{24} = \dfrac{480}{24} = 20\,\text{A}$. Use the transformer equation for the
    voltage, then the power relation for the current. Check: $240 \times 2.0 = 480$
    W and $24 \times 20 = 480$ W, so the power is unchanged.

</details>

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
