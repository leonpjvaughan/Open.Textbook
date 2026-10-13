---
title: '5.3 The sine, cosine and tangent functions: graphs and periodicity — Learn'
chapter: 5
chapter_title: Trigonometry
section: '5.3'
section_title: 'The sine, cosine and tangent functions: graphs and periodicity'
refs:
- E3
kind: walkthrough
---

# 5.3 The sine, cosine and tangent functions: graphs and periodicity — Learn

**Prerequisites:** coordinates on the unit circle; radian measure; the shapes of
the sine and cosine curves from GCSE; reading a graph.

**By the end of this section you can:** sketch the graphs of sine, cosine and
tangent; state their period and symmetry; read an amplitude, a period and a
phase shift from a transformed wave; write down the range of each function.

## 1. The three graphs

The three functions are defined for an angle $x$. It is easiest to read them
from the unit circle. The point at angle $x$ has coordinates
$(\cos x, \sin x)$, so the height of the point is $\sin x$ and its horizontal
distance from the centre is $\cos x$.

The graph of $y = \sin x$ starts at $0$, rises to a peak of $1$ at
$x = \dfrac{\pi}{2}$, returns to $0$ at $\pi$, falls to a trough of $-1$ at
$\dfrac{3\pi}{2}$, and returns to $0$ at $2\pi$. The pattern then repeats.

The graph of $y = \cos x$ has the same shape, shifted left by
$\dfrac{\pi}{2}$. It starts at $1$, falls to $0$ at $\dfrac{\pi}{2}$, reaches
$-1$ at $\pi$, and rises back to $1$ at $2\pi$.

Both graphs repeat every $2\pi$ radians. The **period** of each is $2\pi$.

The graph of $y = \tan x$ is different. It has a period of $\pi$, not $2\pi$,
because $\tan x = \dfrac{\sin x}{\cos x}$ and both sine and cosine change sign
together. The tangent has vertical asymptotes where $\cos x = 0$, at
$x = \dfrac{\pi}{2}$ and $x = \dfrac{3\pi}{2}$.

| Function | Period | Range | Symmetry |
|---|---|---|---|
| $y = \sin x$ | $2\pi$ | $-1 \le y \le 1$ | odd: $\sin(-x) = -\sin x$ |
| $y = \cos x$ | $2\pi$ | $-1 \le y \le 1$ | even: $\cos(-x) = \cos x$ |
| $y = \tan x$ | $\pi$ | all real $y$ | odd: $\tan(-x) = -\tan x$ |

An **odd** function is unchanged by a half turn about the origin. An **even**
function is unchanged by a reflection in the $y$-axis.

## 2. Transforming the wave

A wave is often written in the form

$$
y = A\sin(Bx + C) + D.
$$

Each letter does one job.

- $A$ is the **amplitude**, the distance from the middle line to a peak. The
  graph is stretched vertically by a factor $|A|$.
- $B$ changes the period. The period is $\dfrac{2\pi}{B}$.
- $C$ is the **phase**. The graph is shifted horizontally by
  $-\dfrac{C}{B}$.
- $D$ is the vertical shift. The middle line of the wave is $y = D$.

The maximum value is $D + |A|$ and the minimum is $D - |A|$.

**Example 1.** For $y = 3\sin\left(2x\right) - 1$, state the amplitude, the
period, and the maximum and minimum values.

The amplitude is $3$. The period is $\dfrac{2\pi}{2} = \pi$. The middle line is
$y = -1$, so the maximum is $-1 + 3 = 2$ and the minimum is $-1 - 3 = -4$.

**Example 2.** Write down the period and the phase shift of
$y = \cos\left(3x - \dfrac{\pi}{2}\right)$.

Here $B = 3$ and $C = -\dfrac{\pi}{2}$. The period is $\dfrac{2\pi}{3}$. The
phase shift is $-\dfrac{C}{B} = \dfrac{\pi}{6}$, so the graph is shifted
$\dfrac{\pi}{6}$ to the right.

## 3. Try it: the wave explorer

**Predict first.** You will change the amplitude $A$, the wave number $B$, the
phase $C$ and the vertical shift $D$ in $y = A\sin(Bx + C) + D$. Before you touch
the controls, predict what happens to the number of complete waves when $B$
increases, and what happens to the peak height when $A$ is negative. Write both
predictions down.

:::figure ch5-wave-explorer

**Test.** Move each slider in turn and watch the curve. Check that the readout
period matches the distance between two peaks on the graph. Then set $A = 1$ and
$B = 2$ and count the complete waves between $x = 0$ and $x = 2\pi$.

**Explain.** Write two sentences. The first explains why doubling $B$ halves the
period. The second explains why a negative $A$ turns the wave upside down rather
than moving it.

> **Watch out.** Three mistakes are common with these graphs.
>
> **Using degrees on the horizontal axis.** The formulas in this chapter use
> radians. The period of $\sin x$ is $2\pi$, not $360$. Write the axis in
> multiples of $\pi$ unless a question asks for degrees.
>
> **Reading the period as $\dfrac{B}{2\pi}$.** The period is $\dfrac{2\pi}{B}$.
> A larger $B$ squeezes more waves into the same width, so a larger $B$ gives a
> smaller period. Test it with $B = 2$: the period must be $\pi$, not $4\pi$.
>
> **Forgetting the vertical shift in the range.** For $y = A\sin(Bx + C) + D$
> the range runs from $D - |A|$ to $D + |A|$. The middle line is $y = D$, not
> the $x$-axis. **Re-check:** find the maximum and minimum and confirm that they
> are equally far above and below the middle line.

## You should now be able to

- sketch $y = \sin x$, $y = \cos x$ and $y = \tan x$ over one period;
- state the period and range of each function;
- use the odd and even symmetry of sine, cosine and tangent;
- find the amplitude, period, phase shift and vertical shift of
  $y = A\sin(Bx + C) + D$;
- state the maximum and minimum of a transformed wave.
