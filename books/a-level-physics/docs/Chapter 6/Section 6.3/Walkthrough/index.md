---
title: 6.3 Stationary waves — Learn
chapter: 6
chapter_title: Waves
section: '6.3'
section_title: Stationary waves
refs:
- AP6
kind: walkthrough
---

# 6.3 Stationary waves — Learn

**Prerequisites:** the principle of superposition and the wave equation from
Section 6.1; the terms displacement, amplitude, period and frequency from
Section 3.6.

**By the end of this section you can:** explain how a stationary wave forms;
define a node and an antinode; find the node spacing; find the harmonics of a
string fixed at both ends; use $v = \sqrt{\dfrac{T}{\mu}}$ for a wave on a
string; and find the harmonics of an air column that is open or closed at one
end.

## 1. How a stationary wave forms

Send a wave along a rope and let it reflect from the far end. The reflected wave
travels back through the wave that is still arriving. The two waves have the same
frequency and, if the reflection is good, about the same amplitude, but they
travel in opposite directions.

Where they meet, the principle of superposition adds their displacements. The
result is a **stationary wave**, also called a standing wave. It does not travel
along the rope. Instead, some places stay still and others swing with the largest
amplitude.

- A **node** is a place where the displacement is always zero.
- An **antinode** is a place where the amplitude is largest.

Neighbouring nodes are **half a wavelength** apart. A node and the next antinode
are **a quarter of a wavelength** apart. So if you can measure the distance
between two nodes, you can find the wavelength.

All the points on the stationary wave oscillate with the same frequency. Only the
amplitude changes from place to place. Between two neighbouring nodes the points
move together, and they are in phase. Across a node the motion flips over.

A stationary wave stores energy, but on average it transfers no energy along the
rope. A progressive wave carries energy away; a stationary wave does not. This is
the main difference between the two.

## 2. Waves on a string

A guitar string is fixed at both ends, so both ends must be nodes. The string can
vibrate in several different shapes, called **harmonics**, and each shape must
fit a whole number of half wavelengths between the ends:

$$ L = n\frac{\lambda}{2} \qquad \lambda = \frac{2L}{n} $$

where $n = 1, 2, 3, \ldots$ The lowest frequency is the **fundamental**, or first
harmonic, with $n = 1$. It has one antinode in the middle. The second harmonic
has two antinodes and twice the frequency. The frequency of the $n$th harmonic is

$$ f_n = \frac{nv}{2L} $$

The speed of a wave on a stretched string depends on the tension $T$ and the mass
per unit length $\mu$:

$$ v = \sqrt{\frac{T}{\mu}} $$

Putting the last two equations together gives the frequency of the $n$th
harmonic:

$$ f_n = \frac{n}{2L}\sqrt{\frac{T}{\mu}} $$

A tighter string has a higher note, and a thicker string has a lower note. That is
why the thick strings of a guitar sound the lowest notes.

**Worked example 1.** A guitar string has a tension of 81 N and a mass per unit
length of $4.0 \times 10^{-4}\,\text{kg}\,\text{m}^{-1}$. Find the speed of a
wave on the string.

$$
\begin{aligned}
v &= \sqrt{\frac{T}{\mu}} = \sqrt{\frac{81}{4.0 \times 10^{-4}}} \\
  &= \sqrt{2.025 \times 10^{5}} = 450\,\text{m}\,\text{s}^{-1}
\end{aligned}
$$

The wave travels along the string at $450\,\text{m}\,\text{s}^{-1}$.

**Worked example 2.** The string in Worked example 1 is 0.650 m long and is fixed
at both ends. Find the frequency of its fundamental note.

$$
f_1 = \frac{v}{2L} = \frac{450}{2 \times 0.650} = 346\,\text{Hz}
$$

The fundamental frequency is 346 Hz, to three significant figures.

**Worked example 3.** A string sounds a note of 220 Hz when its tension is 60 N.
Find the tension needed for a note of 440 Hz.

The frequency is proportional to the square root of the tension, because
$f \propto \sqrt{T}$. So

$$
\begin{aligned}
\frac{f_2}{f_1} &= \sqrt{\frac{T_2}{T_1}} \\
T_2 &= T_1\left(\frac{f_2}{f_1}\right)^2 = 60 \times \left(\frac{440}{220}\right)^2 \\
    &= 60 \times 4 = 240\,\text{N}
\end{aligned}
$$

To double the frequency, the tension must be four times larger.

## 3. Air columns

A wind instrument contains a column of air. A stationary wave forms in the air,
and the note depends on the length of the column.

At an **open end** the air is free to move, so there is an antinode. At a
**closed end** the air cannot move, so there is a node.

For a pipe open at both ends, both ends are antinodes. The distance between two
neighbouring antinodes is half a wavelength, so

$$ L = n\frac{\lambda}{2} \qquad f_n = \frac{nv}{2L} $$

with $n = 1, 2, 3, \ldots$, exactly as for a string. All the harmonics are
present.

For a pipe closed at one end, there is a node at the closed end and an antinode
at the open end. The shortest fit is a quarter of a wavelength:

$$ L = (2n - 1)\frac{\lambda}{4} \qquad f_n = \frac{(2n - 1)v}{4L} $$

with $n = 1, 2, 3, \ldots$. This gives only the **odd** harmonics: the
fundamental, the third, the fifth, and so on. The even harmonics are missing. A
clarinet, closed at the mouthpiece end, sounds the odd harmonics, which is part
of its characteristic tone.

**Worked example 4.** An organ pipe is open at both ends and is 0.800 m long. The
speed of sound is $340\,\text{m}\,\text{s}^{-1}$. Find the frequency of its
fundamental note and of its second harmonic.

$$
\begin{aligned}
f_1 &= \frac{v}{2L} = \frac{340}{2 \times 0.800} = 213\,\text{Hz} \\
f_2 &= \frac{2v}{2L} = \frac{2 \times 340}{1.60} = 425\,\text{Hz}
\end{aligned}
$$

The fundamental is 213 Hz and the second harmonic is 425 Hz.

**Worked example 5.** A pipe of the same length is closed at one end. Find the
frequency of its fundamental note and of its next possible harmonic.

$$
\begin{aligned}
f_1 &= \frac{v}{4L} = \frac{340}{4 \times 0.800} = 106\,\text{Hz} \\
f_3 &= \frac{3v}{4L} = \frac{3 \times 340}{3.20} = 319\,\text{Hz}
\end{aligned}
$$

The fundamental is 106 Hz and the next possible harmonic is the third, at 319 Hz.
The second harmonic is missing, because it would need an antinode at the closed
end, where the air cannot move.

> **Watch out.** A stationary wave is not a wave travelling along the string or
> the pipe. The nodes never move, and no energy is carried from one end to the
> other. Do not use $v = f\lambda$ with the distance between a node and an
> antinode as if it were a wavelength. A node-to-antinode distance is a quarter
> of a wavelength, so multiply it by four to get $\lambda$.
> **Re-check:** convert the node-to-antinode distance to a full wavelength before you use $v=f\lambda$.

## 4. Try it: harmonics on a string

The figure draws the stationary wave on a string fixed at both ends. The sliders
set the harmonic number, the length of the string and the phase of the motion.
The wave speed is fixed at $450\,\text{m}\,\text{s}^{-1}$, the speed on the
string from Worked example 1.

**Predict first.** Do not move the sliders yet. Write down your answers.

1. If you change from the first harmonic to the second, what happens to the
   number of nodes and antinodes?
2. If you double the length of the string, what happens to the fundamental
   frequency?
3. Where are the nodes always found, whatever the harmonic?

**Test.** Set the length to 0.65 m and work through the first three harmonics.
Read the wavelength and the frequency each time. Then drag the phase slider and
watch which points stay still.

**Explain.** Why does a longer string give a lower note? Write two or three
sentences. Use the idea that the string must fit a whole number of half
wavelengths, so a longer string allows a longer wavelength.

:::figure stationary-waves

## Progress check

Return to the concert hall. The guitar string is 0.650 m long, its mass per unit
length is $4.0 \times 10^{-4}\,\text{kg}\,\text{m}^{-1}$, and its tension is
81 N. It is meant to sound the note E₄, 330 Hz.

1. Find the speed of a wave on the string.
2. Find the frequency of its fundamental note.
3. The measured frequency is higher than 330 Hz. Decide whether the technician
   should tighten or slacken the string.
4. Find the tension needed for exactly 330 Hz.

If question 1 goes wrong, use $v = \sqrt{\dfrac{T}{\mu}}$. If question 2 goes
wrong, use $f = \dfrac{v}{2L}$. If question 4 goes wrong, use
$T_2 = T_1\left(\dfrac{f_2}{f_1}\right)^2$.

## You should now be able to

- explain how a stationary wave forms from two waves travelling in opposite
  directions;
- define a node and an antinode, and give the distances between them;
- explain how a stationary wave differs from a progressive wave;
- find the harmonics of a string fixed at both ends;
- use $v = \sqrt{\dfrac{T}{\mu}}$ for a wave on a string;
- find the tension needed for a given frequency;
- find the harmonics of an air column open at both ends;
- find the odd harmonics of an air column closed at one end;
- explain why the even harmonics are missing from a closed pipe.
