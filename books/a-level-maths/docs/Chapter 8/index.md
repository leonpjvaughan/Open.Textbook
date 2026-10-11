---
title: 'Chapter 8: Integration'
chapter: 8
strand: pure
anchor: How much glass fills a curved window, and how fast does a hot drink cool?
---

# Chapter 8: Integration

## The chapter problem: the curved window and the cooling drink

A stained-glass window is the region enclosed between the curve $y = x^2$ and
the straight edge $y = x + 2$. The glass is cut to fill this region exactly.

The two edges meet where $x^2 = x + 2$. Integration finds the exact area of the
glass without counting squares, and it finds the two points where the edges
cross.

A cup of coffee is made at $90$°C in a room held at $20$°C. After $20$ minutes
the coffee has cooled to $55$°C. The coffee cools at a rate proportional to how
much hotter it is than the room:

$$
\frac{dT}{dt} = -k(T - 20).
$$

Integration turns this rate equation into a formula for the temperature at any
time. Then the formula answers a practical question: what is the temperature
after $40$ minutes, and how cool will the coffee become in the long run?

By the end of the chapter you will answer both parts exactly. You will find the
two crossing points of the window edges and integrate the difference between
them. You will separate the variables in the cooling equation, integrate both
sides, and use the two temperatures to find $k$.

> **First contact — no working needed yet.** Look at the window. The curve
> $y = x^2$ opens upwards and the line $y = x + 2$ cuts through it. Predict
> whether the enclosed area is larger or smaller than the rectangle of width
> $3$ and height $3$. Write your prediction down before you read on.
>
> Then look at the coffee. It starts $70$°C hotter than the room. After $20$
> minutes it is only $35$°C hotter. Predict the temperature after another $20$
> minutes. Write one sentence to explain your prediction.

<details markdown="1">
<summary>If you are not sure where to start</summary>

For the window, sketch both graphs. The line meets the curve at two points, and
the glass lies between them. Estimate the area by counting whole squares on your
sketch, then keep that estimate to compare with the exact answer later.

For the coffee, the gap above room temperature halves every $20$ minutes. After
$20$ minutes the gap is $35$°C. After $40$ minutes the gap halves again, so the
coffee is closer to room temperature than to its starting value.
</details>

## By the end of this chapter you will be able to

- explain integration as the reverse of differentiation, and use the Fundamental
  Theorem of Calculus;
- find an antiderivative, and explain what the constant of integration means;
- integrate powers of $x$, $e^{kx}$, $\dfrac{1}{x}$, $\sin kx$ and $\cos kx$,
  including sums, differences and constant multiples;
- evaluate a definite integral and use it to find the area under a curve;
- find the area between two curves, splitting the region where the curves cross;
- explain a definite integral as the limit of a sum of strips;
- integrate by substitution, and understand it as the chain rule in reverse;
- integrate by parts, including cases that need the method twice;
- integrate a rational function by splitting it into partial fractions;
- solve a separable first-order differential equation, including a particular
  solution from an initial condition;
- interpret a differential-equation solution in context, and name its
  limitations.

## Where it is used

Integration measures accumulation. It finds the area under a speed–time graph
to give distance travelled, and the area under a force–extension graph to give
energy stored. Engineers use it to find the volume of a curved tank, biologists
use it to model a population that grows without limit, and economists use it to
find total cost from a marginal cost. Every rate in Chapter 7 can be read
backwards with integration, and the differential equations of this chapter
describe how real systems change.

## Your turn to connect it

Think of a quantity that builds up from many small pieces. It could be the water
collected in a tank, the distance covered on a journey, the interest added to a
savings account, or the charge stored in a battery. Write down the quantity, the
rate at which it builds up, and whether you expect the total to grow quickly or
slowly over time. Keep your answer for the Review.

## Roadmap

1. [8.1 The Fundamental Theorem of Calculus and standard integrals](Section 8.1/Walkthrough/index.md)
2. [8.2 Definite integrals and the area under a curve](Section 8.2/Walkthrough/index.md)
3. [8.3 The area between two curves](Section 8.3/Walkthrough/index.md)
4. [8.4 Integration as the limit of a sum](Section 8.4/Walkthrough/index.md)
5. [8.5 Integration by substitution and by parts](Section 8.5/Walkthrough/index.md)
6. [8.6 Integrating with partial fractions](Section 8.6/Walkthrough/index.md)
7. [8.7 Separable first-order differential equations](Section 8.7/Walkthrough/index.md)
8. [8.8 Interpreting differential-equation solutions in context](Section 8.8/Walkthrough/index.md)
9. [Review](Review/index.md)
