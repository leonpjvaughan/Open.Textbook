---
title: 9.4 Electromagnetic induction — Practise with help
chapter: 9
chapter_title: Fields
section: '9.4'
section_title: Electromagnetic induction
dfe:
- AP9
kind: guided-problems
---

# 9.4 Electromagnetic induction — Practise with help

Work each problem first. Open a hint only if you are stuck, and the full working
only to check. Find the change in the flux linkage before you divide by the
time, and use Lenz's law to check every direction.

## Warm-up: remember

1. A current of 1.5 A flows through a resistor of resistance $12\,\Omega$. Find
   the power dissipated.
2. A coil of area $0.010\,\text{m}^{2}$ is at right angles to a magnetic field
   of flux density 0.50 T. Find the magnetic flux through the coil.
3. A motor lifts a 2.0 kg mass through 3.0 m in 5.0 s. Find the useful power
   output.

<details markdown="1">
<summary>Answers</summary>

1. $P = I^{2}R = 1.5^{2} \times 12 = 27\,\text{W}$.
2. $\Phi = BA = 0.50 \times 0.010 = 5.0 \times 10^{-3}\,\text{Wb}$.
3. $P = \dfrac{mgh}{t} = \dfrac{2.0 \times 9.81 \times 3.0}{5.0}
   = 12\,\text{W}$.

If question 1 goes wrong, revisit electrical power in Section 5.2. If question 2
goes wrong, revisit magnetic flux in Section 9.3. If question 3 goes wrong,
revisit work, energy and power in Section 3.3.
</details>

## Practise with help

**1.** A coil of 100 turns has an area of $0.015\,\text{m}^{2}$. The flux
density through it rises steadily from 0.20 T to 0.60 T in 0.40 s. Find the
induced emf.

<details markdown="1">
<summary>Hint</summary>

Faraday's law uses the change in the flux linkage, not the final flux.
</details>

<details markdown="1">
<summary>Next step</summary>

Find $\Delta B$ first, then multiply by $N$ and $A$ to get the change in flux
linkage. Divide by the time last.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\Delta B = 0.60 - 0.20 = 0.40\,\text{T}
$$

$$
N\Delta\Phi = NA\,\Delta B = 100 \times 0.015 \times 0.40 = 0.60\,\text{Wb}
$$

$$
\varepsilon = \frac{N\Delta\Phi}{\Delta t} = \frac{0.60}{0.40}
            = 1.5\,\text{V}
$$

The induced emf is 1.5 V.
</details>

**2.** A rod of length 0.25 m moves at $6.0\,\text{m}\,\text{s}^{-1}$ at right
angles to a magnetic field of flux density 0.40 T. Find the emf induced across
the rod.

<details markdown="1">
<summary>Hint</summary>

A moving conductor is a generator. The emf depends on the length, the speed and
the field.
</details>

<details markdown="1">
<summary>Next step</summary>

Use $\varepsilon = BLv$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\varepsilon = BLv = 0.40 \times 0.25 \times 6.0 = 0.60\,\text{V}
$$

The emf across the rod is 0.60 V.
</details>

**3.** The rod in question 2 is part of a circuit of total resistance
$2.0\,\Omega$. Find the current and the magnetic force that opposes the motion.

<details markdown="1">
<summary>Hint</summary>

Use Ohm's law for the current, then the force on a current-carrying wire.
</details>

<details markdown="1">
<summary>Next step</summary>

Find $I = \dfrac{\varepsilon}{R}$ first, then use $F = BIL$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
I = \frac{\varepsilon}{R} = \frac{0.60}{2.0} = 0.30\,\text{A}
$$

$$
F = BIL = 0.40 \times 0.30 \times 0.25 = 0.030\,\text{N}
$$

The current is 0.30 A, and the opposing force on the rod is 0.030 N. By Lenz's
law this force points opposite to the velocity.
</details>

**4.** A search coil of 500 turns and area $2.0 \times 10^{-4}\,\text{m}^{2}$ is
in a magnetic field that changes at a rate of $0.30\,\text{T}\,\text{s}^{-1}$.
Find the emf induced in the coil.

<details markdown="1">
<summary>Hint</summary>

The rate of change of the field is already given, so you do not need a time
interval.
</details>

<details markdown="1">
<summary>Next step</summary>

Use $\varepsilon = NA\dfrac{\Delta B}{\Delta t}$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\begin{aligned}
\varepsilon &= NA\frac{\Delta B}{\Delta t} \\
            &= 500 \times 2.0 \times 10^{-4} \times 0.30 \\
            &= 0.030\,\text{V}
\end{aligned}
$$

The induced emf is 0.030 V, or 30 mV.
</details>

**5.** A generator coil of 150 turns and area $5.0 \times 10^{-3}\,\text{m}^{2}$
turns at $60\,\text{rad}\,\text{s}^{-1}$ in a field of flux density 0.20 T. Find
the peak emf.

<details markdown="1">
<summary>Hint</summary>

Use the peak value of the alternating emf, not the value at an instant.
</details>

<details markdown="1">
<summary>Next step</summary>

Use $\varepsilon_0 = NAB\omega$, and check that the angular speed is in radians
per second.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\begin{aligned}
\varepsilon_0 &= NAB\omega \\
              &= 150 \times 5.0 \times 10^{-3} \times 0.20 \times 60 \\
              &= 9.0\,\text{V}
\end{aligned}
$$

The peak emf is 9.0 V.
</details>

**6.** Explain why the induced current in a conductor always opposes the change
that produced it.

<details markdown="1">
<summary>Hint</summary>

Think about what would happen if the induced current helped the change.
</details>

<details markdown="1">
<summary>Next step</summary>

Use the conservation of energy, and say what would happen to the current if it
reinforced the change.
</details>

<details markdown="1">
<summary>Full working</summary>

If the induced current helped the change that produced it, it would make the
flux change faster, which would make the current larger, which would make the
flux change faster still. The current would grow without any input of energy,
which would break the conservation of energy. Lenz's law says the induced
current must instead oppose the change. Work must then be done to keep the
change going, and that work becomes electrical energy.
</details>

**7.** A transformer has 1200 turns on its primary coil and 100 turns on its
secondary coil. The primary coil is connected to a 240 V alternating supply.
Find the secondary voltage.

<details markdown="1">
<summary>Hint</summary>

The turns ratio sets the voltage ratio.
</details>

<details markdown="1">
<summary>Next step</summary>

Use $\dfrac{V_s}{V_p} = \dfrac{N_s}{N_p}$ and rearrange for $V_s$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
V_s = V_p \times \frac{N_s}{N_p}
    = 240 \times \frac{100}{1200}
    = 20\,\text{V}
$$

The secondary voltage is 20 V. This is a step-down transformer.
</details>

**8.** A magnet is dropped down a vertical copper tube and falls much more
slowly than the same magnet falls through the air. Explain why.

<details markdown="1">
<summary>Hint</summary>

The moving magnet changes the flux through the copper.
</details>

<details markdown="1">
<summary>Next step</summary>

Say what is induced in the copper, and then what Lenz's law says about the
force on the magnet.
</details>

<details markdown="1">
<summary>Full working</summary>

As the magnet moves, the magnetic flux through the copper changes. By Faraday's
law this induces eddy currents in the tube. By Lenz's law the induced currents
oppose the change that produced them, so they exert an upward force on the
magnet, opposing its fall. The magnet still falls, because it is not held, but
it reaches a much lower terminal speed. The kinetic energy lost by the magnet
becomes internal energy in the copper.
</details>
