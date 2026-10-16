---
title: 7.5 Hooke's law and elastic strings — Learn
chapter: 7
chapter_title: Circular motion and oscillation
section: '7.5'
section_title: Hooke's law and elastic strings
tier: O
refs:
- S3
kind: walkthrough
---

# 7.5 Hooke's law and elastic strings — Learn

**Prerequisites:** Section 4.1, forces and Newton's laws; Section 4.3, using
$F = ma$; Section 5.1, the normal reaction and equilibrium.

**Objectives:** state Hooke's law; use $T = kx$ and $T = \dfrac{\lambda x}{L}$;
find an extension, a tension or a stiffness; use Hooke's law in equilibrium and
with $F = ma$.

A spring pushes back when you stretch it. Pull it a little and the pull is small;
pull it further and the pull grows. This section puts a number on that pull, so
the spring can take its place among the forces in a diagram.

## Hooke's law

The **extension** of a spring or an elastic string is how much longer it is than
its natural length:

$$\text{extension} = \text{stretched length} - \text{natural length}$$

**Hooke's law** says that the tension in an elastic string or spring is
proportional to its extension, as long as the elastic limit is not passed:

$$T = kx$$

Here $T$ is the tension in newtons, $x$ is the extension in metres, and $k$ is
the **stiffness** of the spring in newtons per metre, N/m. A stiff spring has a
large $k$, so a small extension gives a large tension.

The law holds while the spring returns to its natural length when the force is
removed. Beyond the **elastic limit** the spring is permanently stretched, and
the law no longer applies. In this chapter every spring stays within its limit.

**Example 1.** A spring of stiffness $200$ N/m is extended by $0.15$ m. Find the
tension.

$$T = kx = 200 \times 0.15 = 30\ \text{N}$$

## The modulus of elasticity

The stiffness $k$ depends on the whole spring. A longer spring of the same
material is easier to stretch. A second form of Hooke's law separates the
material from the length, using the **modulus of elasticity** $\lambda$ (the
Greek letter lambda) and the natural length $L$:

$$T = \frac{\lambda x}{L}$$

The modulus $\lambda$ is measured in newtons, and it is a property of the string
or spring itself. The two constants are related by $\lambda = kL$, so the two
forms are the same law written two ways.

**Example 2.** An elastic string has natural length $0.5$ m and modulus $60$ N.
It is stretched to a length of $0.8$ m. Find the tension.

The extension is $x = 0.8 - 0.5 = 0.3$ m, so

$$T = \frac{\lambda x}{L} = \frac{60 \times 0.3}{0.5} = 36\ \text{N}$$

## Hooke's law in equilibrium

When a mass hangs at rest from a spring, the tension balances the weight. The
mass is in equilibrium, so the resultant force is zero:

$$T = mg$$

Combining this with Hooke's law gives the extension:

$$kx = mg, \qquad x = \frac{mg}{k}$$

**Example 3.** A mass of $2$ kg hangs at rest from a spring of stiffness
$400$ N/m. Find the extension.

$$x = \frac{mg}{k} = \frac{2 \times 9.8}{400} = \frac{19.6}{400} = 0.049\ \text{m}$$

The spring is about $4.9$ cm longer than its natural length.

**Example 4.** A mass of $2$ kg hangs from a spring of stiffness $500$ N/m in a
lift that accelerates upwards at $2$ m/s². Find the tension and the extension.

Taking upwards as positive, the resultant force is $T - mg = ma$:

$$T = m(g + a) = 2 \times (9.8 + 2) = 2 \times 11.8 = 23.6\ \text{N}$$

$$x = \frac{T}{k} = \frac{23.6}{500} = 0.0472\ \text{m}$$

The spring is longer than it would be at rest, because the tension must do two
jobs: support the weight and accelerate the mass upwards.

> **Watch out.** Hooke's law uses the extension, not the length. A common error
> is to put the stretched length into $T = kx$ and get a tension that is far too
> large. Subtract the natural length first. A second error is to mix up the two
> constants: $k$ is the stiffness in N/m, while $\lambda$ is the modulus in N,
> and they are related by $\lambda = kL$. Use one form throughout a question.

## A guided investigation: the tension and the extension

:::figure hookes-law

**Predict.** A spring has stiffness $200$ N/m. If you double the extension, what
happens to the tension? Write your prediction down.

**Test.** Move the stiffness slider and the extension slider. Watch the readout
for the tension, and watch the graph of tension against extension.

**Explain.** Write two sentences that explain the shape of the graph. Say what
the gradient of the line represents, and what happens to the line when you change
the stiffness.

## Progress check

Back to the chapter problem. The car rests on four springs, which together have
stiffness $120000$ N/m. The car has mass $1200$ kg, so its weight is

$$mg = 1200 \times 9.8 = 11760\ \text{N}$$

At rest the springs support the weight. Find the compression, which is the
extension in the other direction:

$$x = \frac{mg}{k} = \frac{11760}{120000} = \underline{\hspace{2cm}}\ \text{m}$$

Keep this number. Section 7.6 uses the same spring and the same mass to find the
period of the car's bounce.

## You should now be able to

- define the extension as the stretched length minus the natural length;
- state Hooke's law as $T = kx$;
- use $T = \dfrac{\lambda x}{L}$ and the relation $\lambda = kL$;
- find a tension, an extension or a stiffness;
- use Hooke's law with equilibrium, $T = mg$;
- use Hooke's law with Newton's second law when the mass accelerates;
- explain what the elastic limit is and why the law fails beyond it.
