---
title: 7.2 Ideal gases and molecular kinetic theory — Learn
chapter: 7
chapter_title: Thermal physics and matter
section: '7.2'
section_title: Ideal gases and molecular kinetic theory
dfe:
- AP7
kind: walkthrough
---

# 7.2 Ideal gases and molecular kinetic theory — Learn

**Prerequisites:** kinetic energy and momentum from Sections 3.3 and 3.4;
rearranging an equation from Section 2.2; SI prefixes and powers of ten from
Section 1.1.

**By the end of this section you can:** describe the ideal gas model; use the gas
laws for a fixed mass of gas; convert between Celsius and kelvin; explain
absolute zero; use $pV = nRT$ and $pV = NkT$; explain pressure in terms of
molecular collisions; use $pV = \dfrac{1}{3}Nm(c_{\text{rms}})^2$; find the
average molecular kinetic energy and the rms speed; and describe how to test
Boyle's law.

## 1. The ideal gas model

A gas is made of a very large number of particles. The **ideal gas model** treats
them in a simple way, so that we can work out how the gas behaves.

The assumptions are:

- the gas contains a very large number of identical molecules, moving at random;
- the volume of the molecules is negligible compared with the volume of the
  container;
- the forces between the molecules are negligible, except during a collision;
- every collision is elastic, so kinetic energy is conserved;
- a collision takes much less time than the gap between collisions.

The molecules hit the walls of the container and bounce off. Each collision
changes the momentum of a molecule, so the wall feels a force. Very many
collisions each second add up to a steady force on the wall. **Pressure** is that
force divided by the area of the wall.

This explains why a gas pushes outwards in every direction. It also explains why
warming a gas at constant volume raises its pressure: the molecules move faster,
hit the walls more often, and hit them with more momentum each time.

## 2. The gas laws

For a fixed mass of gas, three simple laws describe how the pressure, the volume
and the temperature are related.

**Boyle's law.** At constant temperature,

$$ pV = \text{constant} \qquad p_1V_1 = p_2V_2 $$

**Charles's law.** At constant pressure,

$$ \frac{V}{T} = \text{constant} \qquad \frac{V_1}{T_1} = \frac{V_2}{T_2} $$

**The pressure law.** At constant volume,

$$ \frac{p}{T} = \text{constant} \qquad \frac{p_1}{T_1} = \frac{p_2}{T_2} $$

In the last two laws, $T$ is the temperature in kelvin.

**Avogadro's law.** Equal volumes of any gas at the same temperature and pressure
contain the same number of molecules.

**Worked example 1.** A gas at a pressure of $1.0 \times 10^{5}\,\text{Pa}$
occupies a volume of 200 cm³. It is compressed at constant temperature to 50 cm³.
Find the new pressure.

$$
\begin{aligned}
p_1V_1 &= p_2V_2 \\
p_2 &= \frac{p_1V_1}{V_2} = \frac{1.0 \times 10^{5} \times 200}{50} \\
    &= 4.0 \times 10^{5}\,\text{Pa}
\end{aligned}
$$

The volume falls to one quarter, so the pressure rises to four times its original
value. The temperature was constant, so Boyle's law applies.

**Worked example 2.** A fixed mass of gas occupies 300 cm³ at 300 K. It is heated
at constant pressure to 450 K. Find its new volume.

$$
\begin{aligned}
\frac{V_1}{T_1} &= \frac{V_2}{T_2} \\
V_2 &= \frac{V_1T_2}{T_1} = \frac{300 \times 450}{300} \\
    &= 450\,\text{cm}^{3}
\end{aligned}
$$

The temperature rises by a factor of 1.5, so the volume rises by the same factor.

> **Watch out.** The gas laws need the temperature in kelvin, never in degrees
> Celsius. A temperature of 20 °C is 293 K, not 20. If you put 20 into a gas
> equation you will get an answer that is wrong by more than a factor of ten.
> Convert first: add 273.

## 3. Absolute zero and the kelvin scale

Cool a gas at constant pressure and its volume falls. If you plot volume against
temperature in degrees Celsius, the points lie on a straight line. Extend that
line backwards and it reaches zero volume at about **−273 °C**.

A gas cannot have a volume smaller than zero, so this is the lowest temperature
that is possible. It is called **absolute zero**. The kelvin scale starts there,
so absolute zero is 0 K.

$$ T(\text{K}) = \theta(\text{°C}) + 273 $$

The kelvin is the SI unit of temperature. A temperature **change** of 1 K is the
same size as a change of 1 °C, but the two scales have different zero points. In
the ideal gas equation the temperature must be in kelvin.

**Worked example 3.** The steam in a pressure cooker is at 121 °C. Write this
temperature in kelvin.

$$ T = 121 + 273 = 394\,\text{K} $$

## 4. The ideal gas equation

The three gas laws, together with Avogadro's law, can be combined into one
equation. For an ideal gas,

$$ pV = nRT $$

where $p$ is the pressure in pascals, $V$ is the volume in cubic metres, $n$ is
the number of moles, $T$ is the temperature in kelvin, and $R$ is the **molar gas
constant**, $8.31\,\text{J}\,\text{K}^{-1}\,\text{mol}^{-1}$.

The number of moles is the amount of gas. One mole contains the **Avogadro
constant**, $N_A = 6.02 \times 10^{23}$ molecules. If $N$ is the number of
molecules, then $n = \dfrac{N}{N_A}$, and the equation becomes

$$ pV = NkT $$

where $k$ is the **Boltzmann constant**, $k = 1.38 \times 10^{-23}\,\text{J}\,\text{K}^{-1}$.
The two constants are linked by $R = N_A k$.

**Worked example 4.** The steam in the pressure cooker is at
$2.00 \times 10^{5}\,\text{Pa}$ and 121 °C, in a space of volume
$2.00 \times 10^{-3}\,\text{m}^{3}$. Treat the steam as an ideal gas and find the
number of moles. Use $R = 8.31\,\text{J}\,\text{K}^{-1}\,\text{mol}^{-1}$.

$$
\begin{aligned}
pV &= nRT \\
n &= \frac{pV}{RT} = \frac{2.00 \times 10^{5} \times 2.00 \times 10^{-3}}{8.31 \times 394} \\
  &= 0.122\,\text{mol}
\end{aligned}
$$

**Worked example 5.** Use $pV = NkT$ to find the number of steam molecules in
the same space. Use $k = 1.38 \times 10^{-23}\,\text{J}\,\text{K}^{-1}$.

$$
\begin{aligned}
N &= \frac{pV}{kT} = \frac{2.00 \times 10^{5} \times 2.00 \times 10^{-3}}{1.38 \times 10^{-23} \times 394} \\
  &= 7.36 \times 10^{22}
\end{aligned}
$$

The space holds $7.36 \times 10^{22}$ molecules. You can check this with
$N = nN_A$: using the unrounded $n$, $N = 0.12217 \times 6.02 \times 10^{23} = 7.36 \times 10^{22}$, which is the same value.

## 5. Kinetic theory and molecular speeds

The kinetic theory model puts numbers to the picture. The pressure of a gas
depends on how many molecules there are, how heavy they are, how fast they move,
and the volume:

$$ pV = \frac{1}{3}Nm(c_{\text{rms}})^2 $$

Here $N$ is the number of molecules, $m$ is the mass of one molecule, and
$c_{\text{rms}}$ is the **root-mean-square speed**. The molecules in a gas move
at a wide range of speeds, and $c_{\text{rms}}$ is the square root of the mean of
the squares of those speeds.

Putting this together with $pV = NkT$ gives

$$ \frac{1}{2}m(c_{\text{rms}})^2 = \frac{3}{2}kT $$

The left side is the average random kinetic energy of one molecule. So the
average molecular kinetic energy depends only on the temperature. It does not
depend on the gas. At the same temperature, a heavy molecule and a light molecule
have the same average kinetic energy, but the lighter one moves faster.

The rms speed can also be written with the molar mass $M$:

$$ c_{\text{rms}} = \sqrt{\frac{3kT}{m}} = \sqrt{\frac{3RT}{M}} $$

**Worked example 6.** A gas contains $5.0 \times 10^{22}$ molecules, each of mass
$4.8 \times 10^{-26}\,\text{kg}$, in a volume of $2.0 \times 10^{-3}\,\text{m}^{3}$.
The rms speed is $500\,\text{m}\,\text{s}^{-1}$. Use
$pV = \dfrac{1}{3}Nm(c_{\text{rms}})^2$ to find the pressure.

$$
\begin{aligned}
p &= \frac{Nm(c_{\text{rms}})^2}{3V} \\
  &= \frac{5.0 \times 10^{22} \times 4.8 \times 10^{-26} \times 500^{2}}{3 \times 2.0 \times 10^{-3}} \\
  &= 1.0 \times 10^{5}\,\text{Pa}
\end{aligned}
$$

The pressure is $1.0 \times 10^{5}\,\text{Pa}$, about one atmosphere.

**Worked example 7.** Find the average random kinetic energy of a steam molecule
at 121 °C, and its rms speed. The mass of a water molecule is
$2.99 \times 10^{-26}\,\text{kg}$ and $k = 1.38 \times 10^{-23}\,\text{J}\,\text{K}^{-1}$.

$$
\begin{aligned}
\text{average kinetic energy} &= \frac{3}{2}kT \\
  &= 1.5 \times 1.38 \times 10^{-23} \times 394 = 8.16 \times 10^{-21}\,\text{J} \\
c_{\text{rms}} &= \sqrt{\frac{3kT}{m}} \\
  &= \sqrt{\frac{3 \times 1.38 \times 10^{-23} \times 394}{2.99 \times 10^{-26}}} \\
  &= 739\,\text{m}\,\text{s}^{-1}
\end{aligned}
$$

A steam molecule moves at about 740 m s⁻¹ on average. That is faster than the
speed of sound in air.

> **Watch out.** The average speed of the molecules is lower than the rms speed.
> When you square the speeds, the fastest molecules count for more, so the mean
> of the squares is larger than the square of the mean. Use $c_{\text{rms}}$ in
> the kinetic theory equation, not an ordinary average speed.

## 6. Testing Boyle's law

You can test Boyle's law with a sealed syringe and a pressure gauge.

1. Trap a fixed mass of air in the syringe. Record the volume from the scale and
   the pressure from the gauge.
2. Push the plunger in small steps. At each step, record the new volume and
   pressure.
3. Wait a few seconds after each step, so the air returns to room temperature.
   Compressing the air warms it.
4. Plot $p$ against $\dfrac{1}{V}$. If Boyle's law holds, the points lie on a
   straight line through the origin.

The gradient of the line is the constant $pV$. A straight line through the origin
shows that $p \propto \dfrac{1}{V}$, which is Boyle's law. If the line does not
pass through the origin, the volume of the connecting tube may be adding a fixed
extra volume to every reading.

The pressure gauge reads to a certain resolution, so each pressure has an
uncertainty. Use several readings and a line of best fit rather than one pair of
values.

## 7. Try it: molecules in a box

The figure shows a fixed number of gas molecules in a box with a piston. Two
sliders set the temperature and the volume. The readout gives the pressure, the
average molecular kinetic energy, and the rms speed.

**Predict first.** Do not move the sliders yet. Write down your answers.

1. If you double the temperature at constant volume, what happens to the
   pressure?
2. If you halve the volume at constant temperature, what happens to the pressure?
3. If you double the temperature, what happens to the average kinetic energy of
   a molecule?

**Test.** Set the temperature to 300 K and the volume to $2.0 \times 10^{-3}\,\text{m}^{3}$.
Read the pressure. Then double the temperature and read it again. Next, return
the temperature to 300 K and halve the volume. Check each prediction.

**Explain.** Why does halving the volume at constant temperature double the
pressure? Write two or three sentences. Use the idea that the molecules have the
same average speed, but they are squeezed into half the space, so each unit of
wall is hit twice as often.

:::figure ideal-gas

## Progress check

Return to the pressure cooker. The steam is at $2.00 \times 10^{5}\,\text{Pa}$
and 121 °C, in a space of volume $2.00 \times 10^{-3}\,\text{m}^{3}$.

1. Write 121 °C in kelvin.
2. Find the number of moles of steam. Use $R = 8.31\,\text{J}\,\text{K}^{-1}\,\text{mol}^{-1}$.
3. Find the average kinetic energy of a steam molecule. Use
   $k = 1.38 \times 10^{-23}\,\text{J}\,\text{K}^{-1}$.
4. Explain why heating the sealed cooker raises the pressure of the steam.

If question 1 goes wrong, add 273. If question 2 goes wrong, use
$n = \dfrac{pV}{RT}$. If question 3 goes wrong, use $\dfrac{3}{2}kT$. If question
4 goes wrong, say what happens to the speed of the molecules and to the rate of
collisions with the walls.

## You should now be able to

- describe the ideal gas model and its assumptions;
- explain the pressure of a gas in terms of collisions between molecules and the
  walls;
- state and use Boyle's law, Charles's law and the pressure law;
- convert a temperature between degrees Celsius and kelvin;
- explain what absolute zero is;
- use $pV = nRT$ and $pV = NkT$;
- explain the link between the gas constant and the Boltzmann constant;
- use $pV = \dfrac{1}{3}Nm(c_{\text{rms}})^2$;
- find the average molecular kinetic energy from the temperature;
- find the rms speed of a gas molecule;
- describe how to test Boyle's law, and how to read the graph.
