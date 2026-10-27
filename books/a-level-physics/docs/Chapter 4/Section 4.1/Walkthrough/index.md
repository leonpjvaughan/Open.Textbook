---
title: 4.1 Stress, strain and the Young modulus — Learn
chapter: 4
chapter_title: Materials
section: '4.1'
section_title: Stress, strain and the Young modulus
refs:
- AP4
kind: walkthrough
---

# 4.1 Stress, strain and the Young modulus — Learn

**Prerequisites:** SI units and prefixes from Section 1.1; the area of a circle;
standard form; rearranging a formula; the idea of a force in newtons.

**By the end of this section you can:** define tensile stress and tensile strain
and state their units; calculate a stress and a strain; define the Young
modulus; use the Young modulus to find a stress, a strain or an extension; and
explain why the Young modulus belongs to the material and not to the wire.

## 1. Why force is not enough

A force tells you only part of the story. Hang a 20 N weight on a thin wire and
the wire may snap. Hang the same weight on a thick bar of the same steel and
nothing happens. The force is the same, but the **cross-sectional area** is
different.

To compare materials you need a quantity that does not depend on the size of the
sample. The force per unit area does that job. It is called the **stress**.

$$ \text{stress} = \frac{\text{force}}{\text{cross-sectional area}} \qquad \sigma = \frac{F}{A} $$

Here $\sigma$ is the stress, $F$ is the force and $A$ is the cross-sectional area.

The unit of stress is the newton per square metre, $\text{N}\,\text{m}^{-2}$.
This unit has a name: the **pascal**, $\text{Pa}$. One pascal is one newton per
square metre. The pascal is also $\text{kg}\,\text{m}^{-1}\,\text{s}^{-2}$ in
base units.

The force must act along the wire and stretch it. A stress that stretches a
material is called a **tensile stress**. A stress that squeezes it is called a
compressive stress.

**Worked example 1.** A wire of cross-sectional area
$1.5 \times 10^{-5}\,\text{m}^2$ carries a tensile force of $240\,\text{N}$.
Find the stress.

$$ \sigma = \frac{F}{A} = \frac{240}{1.5 \times 10^{-5}} = 1.6 \times 10^{7}\,\text{Pa} $$

The stress is $1.6 \times 10^{7}\,\text{Pa}$, or $16\,\text{MPa}$.

**Worked example 2.** A wire has a diameter of $0.80\,\text{mm}$ and carries a
force of $50\,\text{N}$. Find the stress.

The cross-sectional area is the area of a circle. First change the diameter to
metres, then halve it to find the radius.

$$
\begin{aligned}
d &= 0.80\,\text{mm} = 8.0 \times 10^{-4}\,\text{m} \\
r &= 4.0 \times 10^{-4}\,\text{m} \\
A &= \pi r^2 = \pi \times (4.0 \times 10^{-4})^2 \\
  &= 5.0 \times 10^{-7}\,\text{m}^2
\end{aligned}
$$

Now divide the force by the area.

$$ \sigma = \frac{F}{A} = \frac{50}{5.0 \times 10^{-7}} = 1.0 \times 10^{8}\,\text{Pa} $$

The stress is $1.0 \times 10^{8}\,\text{Pa}$, or $100\,\text{MPa}$.

## 2. Strain measures the stretch

Stress alone does not tell you how far a wire stretches. A long wire stretches
further than a short wire under the same stress. The **strain** compares the
extension $\Delta L$ with the original length $L$.

$$ \text{strain} = \frac{\text{extension}}{\text{original length}} \qquad \varepsilon = \frac{\Delta L}{L} $$

Strain is a ratio of two lengths, so it has no unit. It is often written as a
percentage.

**Worked example 3.** A wire $2.50\,\text{m}$ long extends by $0.60\,\text{mm}$.
Find the strain.

$$
\begin{aligned}
\Delta L &= 0.60\,\text{mm} = 6.0 \times 10^{-4}\,\text{m} \\
\varepsilon &= \frac{\Delta L}{L} = \frac{6.0 \times 10^{-4}}{2.50} \\
            &= 2.4 \times 10^{-4}
\end{aligned}
$$

The strain is $2.4 \times 10^{-4}$, which is $0.024\%$.

> **Watch out.** A strain of $2.4 \times 10^{-4}$ has no unit. Writing it as
> $2.4 \times 10^{-4}\,\text{m}$ is a mistake, because a length divided by a
> length has no unit. Check by asking whether the top and the bottom of the
> fraction have the same unit. If they do, the unit cancels.

## 3. The Young modulus

For a wire that has not been stretched too far, the stress is proportional to
the strain. The constant in that proportion is the **Young modulus** $E$ of the
material.

$$ E = \frac{\text{stress}}{\text{strain}} = \frac{\sigma}{\varepsilon} $$

Because strain has no unit, the Young modulus has the same unit as stress: the
pascal. The Young modulus is a property of the **material**, not of the wire. A
steel wire and a steel bar have the same Young modulus. A steel wire and a
copper wire of the same size have different Young moduli.

The table gives typical values. They are approximate.

| Material | Young modulus / Pa |
|---|---|
| Steel | $2.0 \times 10^{11}$ |
| Copper | $1.2 \times 10^{11}$ |
| Aluminium | $7.0 \times 10^{10}$ |
| Glass | $7.0 \times 10^{10}$ |
| Nylon | $3.0 \times 10^{9}$ |

A larger Young modulus means a stiffer material. Steel is stiffer than nylon,
so a steel wire stretches less than a nylon wire of the same size under the same
force.

## 4. Using the Young modulus to find an extension

Rearranging the definition gives a formula for the extension. Start from the
definition and put in the expressions for stress and strain.

$$
\begin{aligned}
E &= \frac{\sigma}{\varepsilon} = \frac{F/A}{\Delta L/L} = \frac{FL}{A\,\Delta L} \\
\Delta L &= \frac{FL}{AE}
\end{aligned}
$$

**Worked example 4.** A steel wire has length $2.00\,\text{m}$ and
cross-sectional area $4.0 \times 10^{-7}\,\text{m}^2$. A force of $60\,\text{N}$
stretches it. The Young modulus of steel is $2.0 \times 10^{11}\,\text{Pa}$.
Find the stress, the strain and the extension.

$$
\begin{aligned}
\sigma &= \frac{F}{A} = \frac{60}{4.0 \times 10^{-7}} = 1.5 \times 10^{8}\,\text{Pa} \\
\varepsilon &= \frac{\sigma}{E} = \frac{1.5 \times 10^{8}}{2.0 \times 10^{11}} = 7.5 \times 10^{-4} \\
\Delta L &= \varepsilon L = 7.5 \times 10^{-4} \times 2.00 = 1.5 \times 10^{-3}\,\text{m}
\end{aligned}
$$

The wire stretches by $1.5\,\text{mm}$.

**Worked example 5.** A wire $2.00\,\text{m}$ long and of area
$1.0 \times 10^{-7}\,\text{m}^2$ extends by $2.0\,\text{mm}$ under a force of
$20\,\text{N}$. Find the Young modulus.

$$
\begin{aligned}
E &= \frac{FL}{A\,\Delta L} \\
  &= \frac{20 \times 2.00}{1.0 \times 10^{-7} \times 2.0 \times 10^{-3}} \\
  &= \frac{40}{2.0 \times 10^{-10}} = 2.0 \times 10^{11}\,\text{Pa}
\end{aligned}
$$

The value is $2.0 \times 10^{11}\,\text{Pa}$, which is the Young modulus of
steel.

## 5. A quick check on the unit

The definition of the Young modulus gives a way to check its unit. Stress is a
force divided by an area, and strain has no unit.

$$ \text{unit of } E = \frac{\text{N}\,\text{m}^{-2}}{1} = \text{kg}\,\text{m}^{-1}\,\text{s}^{-2} $$

That is the pascal. The check is the same as the homogeneity argument from
Section 1.1: the two sides of $E = \sigma/\varepsilon$ must have the same base
units.

## 6. Try it: the gradient of a stress–strain graph

A stress–strain graph shows the Young modulus directly. The line passes through
the origin while the stress is proportional to the strain, so its gradient is

$$ E = \frac{\text{stress}}{\text{strain}} $$

**Predict first.** Do not move the sliders yet. Write down your answers.

1. The table gives steel as stiffer than aluminium. On the same axes, which line
   is steeper?
2. A wire is made thicker but the force is kept the same. Does the gradient of
   the stress–strain line change?
3. The point on the line marks one force and one area. If the force is doubled
   at the same area, does the point stay on the same line or move to a new line?

**Test.** Set the material to steel and the force to $40\,\text{N}$. Move the
area slider from $0.3\,\text{mm}^2$ to $1.2\,\text{mm}^2$ and watch the point.
Then change the material to copper and to aluminium, and watch the line. Check
that the gradient matches the Young modulus in the table.

**Explain.** Why does changing the thickness of the wire move the point along
the line but leave the gradient alone? Write two or three sentences. Use the idea
that both the stress and the strain depend on the sample, but their ratio is the
Young modulus of the material.

:::figure stress-strain-graph

## Progress check

Return to the chapter problem. The beam has a mass of $2500\,\text{kg}$, and the
cable has a cross-sectional area of $1.5 \times 10^{-4}\,\text{m}^2$. Take
$g = 9.81\,\text{N}\,\text{kg}^{-1}$.

1. Find the weight of the beam, and then the stress in the cable.
2. The Young modulus of the steel is $2.0 \times 10^{11}\,\text{Pa}$. Find the
   strain in the cable.
3. The cable is $20.0\,\text{m}$ long when it is unstretched. Find the extension
   of the cable.
4. The working stress must not exceed $3.0 \times 10^{8}\,\text{Pa}$. Is the
   cable safe for this beam?

If question 1 goes wrong, remember that weight is $mg$, not $m$. If question 2
goes wrong, divide the stress by the Young modulus. If question 3 goes wrong,
multiply the strain by the original length. If question 4 goes wrong, compare
the stress from question 1 with the limit.

## You should now be able to

- explain why engineers use stress rather than force;
- calculate a tensile stress from a force and a cross-sectional area;
- find a cross-sectional area from a diameter;
- calculate a tensile strain, and state that it has no unit;
- define the Young modulus and state its unit;
- use $E = \dfrac{FL}{A\,\Delta L}$ to find an extension or a Young modulus;
- explain why the Young modulus is a property of the material.
