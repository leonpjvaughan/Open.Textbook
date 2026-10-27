---
title: 14.3 Series and parallel circuits — Learn
chapter: 14
chapter_title: Electric circuits
section: '14.3'
section_title: Series and parallel circuits
tier: O
refs:
- '3.3'
kind: walkthrough
---

# 14.3 Series and parallel circuits — Learn

**Prerequisites:** current, potential difference and resistance from Section 14.1;
Ohm's law from Section 14.2.

**Objectives:** state the rules for current, potential difference and resistance in
series and in parallel; use the resistance formulae; solve a circuit with more than one
component.

By the end of this section, you can work out a combined resistance and use it to find
the current from the supply.

## Series circuits

Two components are in **series** when they sit on the same path, one after the other.
There is only one route for the charge to take.

That single route gives the rules.

- The **current** is the same at every point. Charge is conserved, so the charge that
  leaves the cell must pass through every component in turn.
- The **potential differences** add up to the potential difference of the supply. Energy
  is conserved, so the energy given to each coulomb by the supply is shared out between
  the components.
- The **combined resistance** is the sum of the individual resistances:

$$R = R_1 + R_2 + R_3 + \ldots$$

This makes sense: adding another component to the same path gives the charge more to
get through, so the total opposition is larger.

**Example 1.** A 6.0 Ω resistor and a 3.0 Ω resistor are in series. Calculate the
combined resistance.

$$
R = R_1 + R_2 = 6.0 + 3.0 = 9.0\,\Omega
$$

**Example 2.** A 12 V supply is connected to a 4.0 Ω resistor and an 8.0 Ω resistor in
series. Calculate the current and the potential difference across each resistor.

The combined resistance is $4.0 + 8.0 = 12\,\Omega$, so

$$
I = \frac{V}{R} = \frac{12}{12} = 1.0\,\text{A}
$$

where $I$ is the current from the supply, $V$ its potential difference and $R$ the
combined resistance.

The current is the same through both resistors. Then

$$
V_1 = IR_1 = 1.0 \times 4.0 = 4.0\,\text{V}
$$

$$
V_2 = IR_2 = 1.0 \times 8.0 = 8.0\,\text{V}
$$

The two potential differences add to 12 V, which is the supply. Notice that the larger
resistor takes the larger share of the potential difference.

## Parallel circuits

Two components are in **parallel** when they sit on separate branches between the same
two points. There is more than one route for the charge.

- The **potential difference** is the same across every branch, because each branch is
  connected between the same two points.
- The **currents** in the branches add up to the current from the supply. Charge is
  conserved, so the charge arriving at a junction is shared between the branches.
- The **combined resistance** is given by

$$\frac{1}{R} = \frac{1}{R_1} + \frac{1}{R_2} + \frac{1}{R_3} + \ldots$$

The combined resistance is always **smaller** than the smallest individual resistance.
Adding a branch gives the charge another route, so the total opposition falls.

**Example 3.** A 6.0 Ω resistor and a 3.0 Ω resistor are in parallel. Calculate the
combined resistance.

$$
\frac{1}{R} = \frac{1}{R_1} + \frac{1}{R_2} = \frac{1}{6.0} + \frac{1}{3.0}
$$

$$
\frac{1}{R} = \frac{1}{6.0} + \frac{2}{6.0} = \frac{3}{6.0} = \frac{1}{2.0}
$$

$$
R = 2.0\,\Omega
$$

That is smaller than either resistor, as it must be.

**Example 4.** A 12 V supply is connected to a 4.0 Ω resistor and a 12 Ω resistor in
parallel. Calculate the current in each branch and the total current.

The potential difference across each branch is 12 V.

$$
I_1 = \frac{V}{R_1} = \frac{12}{4.0} = 3.0\,\text{A}
$$

$$
I_2 = \frac{V}{R_2} = \frac{12}{12} = 1.0\,\text{A}
$$

The total current from the supply is $3.0 + 1.0 = 4.0$ A. The combined resistance is
3.0 Ω, and $\dfrac{12}{3.0} = 4.0$ A, which checks the answer.

## Why homes are wired in parallel

Every appliance in a home is connected in parallel across the 230 V supply.

- Each appliance gets the full 230 V, which is the potential difference it was designed
  for.
- Each appliance has its own branch, so it can be switched on or off without affecting
  the others.
- If one appliance fails, the others keep working, because the current still has another
  path.

If they were wired in series, switching one appliance off would break the single path
and stop everything. Each appliance would also get only a share of the 230 V, so none
would work as designed. The current from the supply is the sum of the branch currents,
and that is the current the main fuse or circuit breaker has to carry.

> **Watch out.** Two mistakes are common here. The first is using the reciprocal formula
> for resistors in series, or adding resistors directly when they are in parallel. Check
> the arrangement before you choose the formula. The second is expecting the combined
> parallel resistance to be larger than the individual resistors: it is always smaller
> than the smallest one, so an answer of 8 Ω from a 6 Ω and a 3 Ω in parallel is wrong
> before you check any arithmetic.

## Progress check

Back to the chapter problem. The caravan battery has a 12 Ω lamp, a 6.0 Ω lamp and a
4.0 Ω heater, all connected in parallel across a 12 V supply.

Find the combined resistance of the three, then the total current from the battery.
Keep both numbers. Section 14.4 uses that current and those resistances to find the
power and the energy, and Section 14.5 asks what changes when the battery is old and its
internal resistance matters.

## You should now be able to

- state the current and potential difference rules for a series circuit, and use
  $R = R_1 + R_2 + \ldots$;
- state the current and potential difference rules for a parallel circuit, and use
  $\dfrac{1}{R} = \dfrac{1}{R_1} + \dfrac{1}{R_2} + \ldots$;
- check a parallel combined resistance against the smallest individual resistance;
- find the current from a supply from the combined resistance and the supply potential
  difference;
- explain why the appliances in a home are connected in parallel.
