---
title: 9.4 Electromagnetic induction — Learn
chapter: 9
chapter_title: Fields
section: '9.4'
section_title: Electromagnetic induction
refs:
- AP9
kind: walkthrough
---

# 9.4 Electromagnetic induction — Learn

**Prerequisites:** magnetic flux and flux linkage from Section 9.3; the force on
a wire, $F = BIL$, from Section 9.3; work, energy and power from Section 3.3;
emf and current from Section 5.1; graphs and gradients from Section 3.1.

**By the end of this section you can:** explain electromagnetic induction; use
Faraday's law with flux linkage; state and apply Lenz's law; find the emf
induced in a moving conductor; describe an alternating-current generator and use
$\varepsilon_0 = NAB\omega$; and explain how a search coil, a transformer and
eddy currents use induction.

## 1. Induction

Move a magnet towards a coil connected to a galvanometer and the needle moves.
Move the magnet away and the needle moves the other way. Hold the magnet still
and the needle returns to zero. A changing magnetic field near a conductor
causes a current. This is **electromagnetic induction**, and the current is an
**induced current**. The emf that drives it is an **induced emf**.

Three things control the size of the induced emf:

- how fast the flux changes — a faster change gives a larger emf;
- how many turns the coil has — more turns give a larger emf;
- how strong the magnet is — a stronger field gives a larger change in flux.

Nothing is induced when the flux is steady, however large it is. Only a
**change** in flux induces an emf.

## 2. Faraday's law

The magnetic flux linkage of a coil is $N\Phi$. Faraday's law says that the
induced emf is equal to the rate of change of the flux linkage:

$$ \varepsilon = -N\frac{\Delta\Phi}{\Delta t} $$

The unit of emf is the volt. For a coil of $N$ turns and area $A$ in a field
that changes at a steady rate, this becomes

$$ \varepsilon = -NA\frac{\Delta B}{\Delta t} $$

The minus sign is the direction, and it comes from Lenz's law in the next
section.

**Worked example 1.** A coil of 50 turns has an area of
$0.020\,\text{m}^{2}$. The flux density through it rises from 0.10 T to 0.50 T
at a steady rate in 0.20 s. Find the induced emf.

First find the change in flux density and then the change in flux linkage.

$$
\begin{aligned}
\Delta B &= 0.50 - 0.10 = 0.40\,\text{T} \\
N\Delta\Phi &= NA\,\Delta B = 50 \times 0.020 \times 0.40 \\
            &= 0.40\,\text{Wb}
\end{aligned}
$$

Then divide by the time.

$$
\varepsilon = \frac{N\Delta\Phi}{\Delta t} = \frac{0.40}{0.20}
            = 2.0\,\text{V}
$$

The induced emf is 2.0 V.

## 3. Lenz's law

**Lenz's law** says that the induced current flows in the direction that opposes
the change that produced it. If the flux through a coil increases, the induced
current creates a field that opposes the increase. If the flux decreases, the
induced current creates a field that tries to keep it.

Lenz's law is a statement of the conservation of energy. If the induced current
helped the change, the change would grow, the current would grow with it, and we
would get energy from nothing. The induced current must instead oppose the
change, so work must be done to keep it going.

A magnet dropped through a copper tube falls slowly. The changing flux induces
**eddy currents** in the tube, and those currents oppose the motion of the
magnet. Energy is transferred from the falling magnet to the tube, which warms
up. The same effect is used in an electromagnetic brake on a train.

## 4. The emf induced in a moving conductor

A conductor moving through a magnetic field also has a changing flux through it,
so an emf is induced. Consider a straight rod of length $L$ moving at speed $v$
at right angles to a field of flux density $B$. In a time $\Delta t$ the rod
sweeps out an area $Lv\Delta t$, so the flux it cuts is $BLv\Delta t$. Faraday's
law gives

$$ \varepsilon = \frac{\Delta\Phi}{\Delta t} = \frac{BLv\Delta t}{\Delta t}
              = BLv $$

The rod acts like a battery of emf $BLv$. If the rod is part of a complete
circuit, the emf drives a current. That current feels a magnetic force
$F = BIL$ which, by Lenz's law, opposes the motion. To keep the rod moving you
must pull with a force $BIL$, doing work at a rate $Fv = BILv$. The electrical
power is $\varepsilon I = BLvI$, which is the same. Mechanical energy becomes
electrical energy, and no energy is created.

**Worked example 2.** The spacecraft's tether is 20 m long and moves at
$7.67 \times 10^{3}\,\text{m}\,\text{s}^{-1}$ at right angles to the Earth's
magnetic field, whose flux density is $3.0 \times 10^{-5}\,\text{T}$. Find the
emf induced across the tether.

$$
\begin{aligned}
\varepsilon &= BLv \\
            &= 3.0 \times 10^{-5} \times 20 \times 7.67 \times 10^{3} \\
            &= 4.6\,\text{V}
\end{aligned}
$$

The emf across the tether is 4.6 V. The tether drives a current of 0.80 A, so it
delivers a power of $\varepsilon I = 4.6 \times 0.80 = 3.7\,\text{W}$. The
current feels a magnetic force

$$
F = BIL = 3.0 \times 10^{-5} \times 0.80 \times 20 = 4.8 \times 10^{-4}\,\text{N}
$$

which opposes the spacecraft's motion. The mechanical power removed is
$Fv = 4.8 \times 10^{-4} \times 7.67 \times 10^{3} = 3.7\,\text{W}$, the same
as the electrical power. The tether is a generator that takes energy from the
orbit.

## 5. The alternating-current generator

A coil rotating in a magnetic field is a generator. As the coil turns, the flux
linkage through it changes continuously. When the plane of the coil is at right
angles to the field, the flux linkage is largest but its rate of change is zero,
so the emf is zero. When the plane of the coil is parallel to the field, the
flux linkage is zero but its rate of change is largest, so the emf is largest.

The emf follows a sine curve. Its peak value is

$$ \varepsilon_0 = NAB\omega $$

where $\omega$ is the angular speed of the coil in radians per second. The emf at
any instant is $\varepsilon = \varepsilon_0 \sin\omega t$. This is how a power
station generator produces alternating current.

**Worked example 3.** A generator coil has 200 turns and an area of
$4.0 \times 10^{-3}\,\text{m}^{2}$. It turns at 50 rad s⁻¹ in a field of flux
density 0.25 T. Find the peak emf.

$$
\begin{aligned}
\varepsilon_0 &= NAB\omega \\
              &= 200 \times 4.0 \times 10^{-3} \times 0.25 \times 50 \\
              &= 10\,\text{V}
\end{aligned}
$$

The peak emf is 10 V, and the emf at any instant is $10\sin 50t$ volts.

## 6. Other applications of induction

- A **search coil** is a small coil of many turns used to measure a changing
  magnetic field. Its emf is $\varepsilon = NA\dfrac{\Delta B}{\Delta t}$, so a
  measurement of the emf gives the rate of change of the field. This is a
  required practical: move a search coil through a known field, or use it to
  measure the field near a Helmholtz pair.
- A **transformer** has two coils wound on the same iron core. An alternating
  current in the primary coil makes an alternating flux in the core, and this
  flux links the secondary coil, where it induces an alternating emf. The turns
  ratio sets the voltage: $\dfrac{V_s}{V_p} = \dfrac{N_s}{N_p}$. A transformer
  only works with a changing current, so it cannot change a direct voltage.
- **Eddy currents** are induced in any piece of metal in a changing field. They
  can be useful, as in an induction hob or an electromagnetic brake, or wasteful,
  as in a transformer core. Laminating the core cuts the eddy currents down.
- An **electromagnetic flowmeter** measures the emf induced across a conducting
  fluid moving through a magnetic field, and uses $\varepsilon = BLv$ to find the
  speed of the fluid.

> **Watch out.** The induced emf depends on the **rate of change** of the flux
> linkage, not on the flux linkage itself. A coil sitting in a strong steady
> field has zero induced emf, because nothing is changing. A second trap is to
> drop the number of turns: the flux linkage is $N\Phi$, so a 200-turn coil
> induces 200 times the emf of a single turn. A third trap is a sign error with
> Lenz's law. The induced current opposes the **change**, not the field. Check
> the direction by asking what the change is and which way a current would have
> to flow to oppose it.

## 7. Try it: the moving rod

The figure shows a conducting rod sliding along two rails through a magnetic
field. Four sliders set the flux density, the length of the rod, its speed and
the resistance of the circuit. The readout gives the induced emf, the current,
the force that opposes the motion, and the mechanical and electrical power.

**Predict first.** Do not move the sliders yet. Write down your answers.

1. If the rod stops moving, what happens to the induced emf?
2. Compare the mechanical power you supply with the electrical power in the
   circuit. Which is larger?
3. If you double the speed, what happens to the emf and to the opposing force?

**Test.** Set a flux density, a length, a speed and a resistance, and read all
five values. Then double the speed and check prediction 3. Compare the two
powers at every setting.

**Explain.** The two powers are always equal. Explain why, using Lenz's law and
the conservation of energy. Then explain why you must keep pulling the rod to
keep it moving at a steady speed. Write three or four sentences.

:::figure motional-emf

## Progress check

Return to the spacecraft. Its tether is 20 m long and moves at
$7.67 \times 10^{3}\,\text{m}\,\text{s}^{-1}$ at right angles to the Earth's
field of flux density $3.0 \times 10^{-5}\,\text{T}$. It drives a current of
0.80 A.

1. Find the emf induced across the tether.
2. Find the electrical power delivered.
3. Find the magnetic force that opposes the motion, and show that the
   mechanical power removed from the orbit equals the electrical power.
4. Explain why the tether slows the spacecraft down instead of speeding it up.
5. A search coil of 2000 turns and area $1.5 \times 10^{-4}\,\text{m}^{2}$ is in
   a field that changes at 0.20 T s⁻¹. Find the emf induced in it.

If question 1 goes wrong, use $\varepsilon = BLv$. If question 2 goes wrong, use
$P = \varepsilon I$. If question 3 goes wrong, use $F = BIL$ and $P = Fv$. If
question 4 goes wrong, apply Lenz's law to the current in the tether. If
question 5 goes wrong, use $\varepsilon = NA\dfrac{\Delta B}{\Delta t}$.

## You should now be able to

- describe electromagnetic induction and the factors that control the induced
  emf;
- state and use Faraday's law, $\varepsilon = -N\dfrac{\Delta\Phi}{\Delta t}$;
- state and apply Lenz's law, and explain it with the conservation of energy;
- find the emf induced in a moving conductor, $\varepsilon = BLv$;
- explain the opposing force and the energy transfer in an induced current;
- describe an alternating-current generator and use
  $\varepsilon_0 = NAB\omega$;
- explain how a search coil, a transformer and eddy currents use induction;
- use the transformer turns ratio $\dfrac{V_s}{V_p} = \dfrac{N_s}{N_p}$.
