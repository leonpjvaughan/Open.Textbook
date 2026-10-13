---
title: 5.3 Elastic potential energy — Learn
chapter: 5
chapter_title: Stretching and compressing
section: '5.3'
section_title: Elastic potential energy
tier: O
refs: ['1.3']
kind: walkthrough
---

# 5.3 Elastic potential energy — Learn

**Prerequisites:** $F = kx$, work as force times distance, and the energy stores from
Chapter 4.

**Objectives:** calculate the energy stored in a stretched spring; explain why the
formula has a $\tfrac{1}{2}$ in it.

By the end of this section, you can find the elastic potential energy of a spring and
say why doubling the extension stores four times the energy.

## Where the energy goes

Stretch a spring and you do work on it. That work is stored, and it comes back when you
let go. The store is called the **elastic potential energy**.

For a constant force, work is force times distance. But the force here is **not**
constant: at the start you are pulling with almost no force, and by the end you are
pulling hard. Using the final force for the whole distance would overcount badly.

The average force is the useful idea. The force rises in a straight line from zero to
$F$, so its average is $\tfrac{1}{2}F$.

$$E = \text{average force} \times \text{extension} = \tfrac{1}{2}F \times x$$

And since $F = kx$:

$$E = \tfrac{1}{2}kx^2$$

- $E$ is the elastic potential energy, in joules (J);
- $k$ is the spring constant, in newtons per metre (N/m);
- $x$ is the extension, in metres (m).

The $\tfrac{1}{2}$ is there because the force starts at zero. It is the same $\tfrac{1}{2}$
that appears in $\tfrac{1}{2}mv^2$, and for the same reason: a quantity rising steadily
from zero has an average of half its final value.

**Example 1.** A spring of spring constant 200 N/m is stretched by 0.10 m. Calculate the
energy stored.

$$
E = \tfrac{1}{2}kx^2
$$

$$
E = 0.5 \times 200 \times 0.10^2
$$

$$
E = 0.5 \times 200 \times 0.010
$$

$$
E = 1.0\,\text{J}
$$

**Example 2.** A spring stores 4.0 J when stretched by 0.20 m. Calculate the energy
stored when it is stretched by 0.40 m.

You could find $k$ first, but there is a quicker way. The energy depends on $x^2$, so
doubling $x$ multiplies the energy by $2^2 = 4$.

$$E = 4 \times 4.0 = 16\,\text{J}$$

> **Watch out.** The extension is **squared**, so the energy does not double when the
> extension doubles — it goes up four times. Every year, answers of $8.0\,\text{J}$ or
> $2.0\,\text{J}$ appear for Example 2. The first comes from doubling rather than
> squaring; the second comes from halving. Write $x^2$ out in full before you
> substitute, and the square cannot catch you.

## The area under the graph

The energy stored is also the **area under the force-extension graph**.

Below the limit of proportionality that graph is a triangle, with base $x$ and height
$F$:

$$\text{area} = \tfrac{1}{2} \times \text{base} \times \text{height} = \tfrac{1}{2} \times x \times F$$

which is $\tfrac{1}{2}kx^2$ once you put $F = kx$ in. The two routes agree, and the
triangle picture is the reason for the $\tfrac{1}{2}$.

Past the limit of proportionality the graph is no longer straight, so the area is no
longer a triangle and $\tfrac{1}{2}kx^2$ no longer gives the energy. That is another
reason to check the spring is behaving before you use the formula.

## Progress check

Back to the chapter problem. You have a force-extension graph with a straight part and a
bend.

Explain why you cannot use $E = \tfrac{1}{2}kx^2$ to find the energy stored in the
spring at an extension beyond the bend. Then say what you **could** do with the graph
to find it — you have met the idea in this section.

Write your answer down. It is the same idea as finding the area under a velocity-time
graph to get a distance, which you met in Chapter 2.

## You should now be able to

- calculate elastic potential energy with $E = \tfrac{1}{2}kx^2$;
- explain why the formula contains $\tfrac{1}{2}$;
- say what happens to the stored energy when the extension is doubled, and why;
- find the energy from the area under a force-extension graph, and say when
  $\tfrac{1}{2}kx^2$ stops being valid.
