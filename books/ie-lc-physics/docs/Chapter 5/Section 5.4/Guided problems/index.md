---
title: "5.4 Investigating Hooke's law — Practise with help"
chapter: 5
chapter_title: Stretching and compressing
section: "5.4"
section_title: Investigating Hooke's law
tier: O
refs: ['1.3']
kind: guided-problems
---

# 5.4 Investigating Hooke's law — Practise with help

## Warm-up: remember

1. State Hooke's law.
2. What is the weight of a 200 g mass? Take $g = 9.8\,\text{N/kg}$.

<details markdown="1">
<summary>Answers and feedback</summary>

1. The extension of a spring is directly proportional to the force applied, provided
   the limit of proportionality is not exceeded. In symbols, $F = kx$.
2. $W = mg = 0.200 \times 9.8 = 1.96\,\text{N}$, so about 2.0 N.

The second one is the conversion the investigation depends on: a mass in grams must
become a weight in newtons before it can be plotted.

</details>

:::figure warm-up-gate


## Practise with help

**1.** A student records the pointer at 0.150 m with no masses, and at 0.210 m with a
mass hung on. State the extension.

<details markdown="1">
<summary>Hint</summary>

The extension is the change in position, not the new position.

<details markdown="1">
<summary>Next step</summary>

$0.210 - 0.150$.

<details markdown="1">
<summary>Full working</summary>

$0.210 - 0.150 = 0.060\,\text{m}$, which is 60 mm.

The most common mistake in this investigation is to write 0.210 m. That is the
**length**, and using it makes every extension too large by the natural length —
so the gradient, and the spring constant, both come out wrong.

</details>
</details>
</details>

**2.** A mass of 150 g is hung on a spring. Calculate the force on the spring.

<details markdown="1">
<summary>Hint</summary>

Convert grams to kilograms first, then use $W = mg$.

<details markdown="1">
<summary>Next step</summary>

$m = 0.150\,\text{kg}$, so $W = 0.150 \times 9.8$.

<details markdown="1">
<summary>Full working</summary>

$$W = mg = 0.150 \times 9.8 = 1.47\,\text{N}$$

So about 1.5 N to two significant figures.

Using the mass directly as a force would give 150 "newtons", which is wrong by a factor
of about 100 — and it would still plot as a straight line, so the graph alone would not
reveal it.

</details>
</details>
</details>

**3.** In an experiment, a force of 1.0 N gives an extension of 0.025 m, and a force of
5.0 N gives 0.125 m. Calculate the spring constant from the gradient.

<details markdown="1">
<summary>Hint</summary>

Gradient $= \dfrac{\Delta F}{\Delta x}$, using the two points.

<details markdown="1">
<summary>Next step</summary>

$\dfrac{5.0 - 1.0}{0.125 - 0.025}$.

<details markdown="1">
<summary>Full working</summary>

$$k = \frac{5.0 - 1.0}{0.125 - 0.025} = \frac{4.0}{0.100} = 40\,\text{N/m}$$

Taking the points as far apart as possible limits the effect of a small reading error.
Using 0 and 5.0 N with the same line would give the same answer here, since the line
passes through the origin.

</details>
</details>
</details>

**4.** A spring's force-extension graph is a straight line for the first five points and
then curves upwards for the last three. State what this tells you, and which points you
should use to find the spring constant.

<details markdown="1">
<summary>Hint</summary>

What does a straight line mean, and what does the curve mean?

<details markdown="1">
<summary>Next step</summary>

The straight part shows Hooke's law holding; the curve shows it has stopped.

<details markdown="1">
<summary>Full working</summary>

The straight line shows that, for the first five readings, extension was proportional
to force — so the spring obeyed Hooke's law. The curve shows the spring passed its
**limit of proportionality** somewhere between the fifth and sixth points.

Use **only the straight part** to find the gradient, and therefore $k$. Including the
curved points would tilt the line of best fit and give a spring constant that is too
large.

It is worth reporting where the straight part ended: that is a real measurement about
the spring.

</details>
</details>
</details>

**5.** An extension is measured as 0.040 m with a metre stick read to the nearest
millimetre. Calculate the percentage uncertainty in the extension.

<details markdown="1">
<summary>Hint</summary>

The reading uncertainty is $\pm 0.001\,\text{m}$. Divide it by the reading.

<details markdown="1">
<summary>Next step</summary>

$\dfrac{0.001}{0.040} \times 100\%$.

<details markdown="1">
<summary>Full working</summary>

$$\frac{0.001}{0.040} \times 100\% = 2.5\%$$

So the extension is $0.040\,\text{m} \pm 2.5\%$.

Compare with the 0.050 m extension in the section, which gave 2%. A shorter extension
carries a larger percentage uncertainty, which is why the smallest readings are the
least reliable.

</details>
</details>
</details>

**6.** A student plots force against extension but labels the horizontal axis "length of
spring". Explain why the graph is misleading and what the student should do.

<details markdown="1">
<summary>Hint</summary>

What would the line look like if the axis really were the total length?

<details markdown="1">
<summary>Next step</summary>

With no masses, the length is not zero — so the line would not pass through the origin.

<details markdown="1">
<summary>Full working</summary>

If the axis were really the total length, the graph would be a straight line that does
**not** pass through the origin: with no load the length is the natural length, not
zero. And its gradient would not be the spring constant in N/m of extension.

The student has almost certainly plotted the total length but called it the extension.
The fix is to subtract the natural length from every reading, and to label the axis
"extension / m".

The tell is a straight line with a non-zero intercept: Hooke's law gives a line through
the origin, so an intercept means the axis is offset.

</details>
</details>
</details>

## A question from Section 5.3

**7.** Using the spring constant you found in question 3, calculate the energy stored
when the spring is stretched by 0.125 m.

<details markdown="1">
<summary>Hint</summary>

$E = \tfrac{1}{2}kx^2$, with $k = 40\,\text{N/m}$.

<details markdown="1">
<summary>Next step</summary>

$E = 0.5 \times 40 \times 0.125^2$.

<details markdown="1">
<summary>Full working</summary>

$$E = \tfrac{1}{2}kx^2 = 0.5 \times 40 \times 0.015625 = 0.31\,\text{J}$$

To two significant figures, $0.31\,\text{J}$.

Notice that this is the energy at the **largest** extension you measured, which is
where the spring is nearest its limit of proportionality. Past that point
$\tfrac{1}{2}kx^2$ would not give the stored energy.

</details>
</details>
</details>
