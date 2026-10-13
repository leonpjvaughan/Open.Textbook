---
title: '2.12 Functions in modelling: limitations and refinements — Learn'
chapter: 2
chapter_title: Algebra and functions
section: '2.12'
section_title: 'Functions in modelling: limitations and refinements'
refs:
- B11
- OT3
kind: walkthrough
---

# 2.12 Functions in modelling: limitations and refinements — Learn

**Prerequisites:** completing the square and the discriminant from 2.3; solving
quadratics from 2.4; inequalities from 2.6; graph transformations from 2.11.

**By the end of this section you can:** build a function to model a real
situation; state the assumptions and the domain; work out and interpret the
greatest value and the zeros; use the model to answer a question in context; and
refine a model when a measurement disagrees.

## 1. The modelling cycle

A **model** is a mathematical description of a real situation. Modelling runs a
cycle.

1. **Translate.** Read the situation and choose a function that fits it.
2. **Solve.** Use the algebra to find what the question asks.
3. **Interpret.** Turn the answer back into the situation, with units.
4. **Refine.** Compare with data. If the model is wrong, change an assumption
   and repeat.

Every model makes **assumptions** that simplify the real world. A good answer
states them, because they are also the model's **limitations**.

## 2. A quadratic model

A thrown object, moving under gravity, has a height that is a quadratic in time.
This is the standard **projectile** model.

**Example 1.** A ball is thrown from $1.5$ m above the ground. Its height in
metres after $t$ seconds is

$$
h = 1.5 + 4t - 5t^2.
$$

The coefficient of $t^2$ is negative, so the graph is an upside-down parabola:
the ball rises and then falls. The constant $1.5$ is the height at $t = 0$, so
the throw starts from a hand $1.5$ m above the ground.

Find the greatest height. Complete the square:

$$
h = -5\left(t - \frac{2}{5}\right)^2 + \frac{23}{10}.
$$

The largest value is $\frac{23}{10} = 2.3$ m, reached at $t = \frac{2}{5} = 0.4$
s.

Find when the ball lands. Solve $h = 0$:

$$
5t^2 - 4t - 1.5 = 0.
$$

The discriminant is $16 + 30 = 46$, so

$$
t = \frac{4 \pm \sqrt{46}}{10}.
$$

The two values are about $-0.278$ and $1.078$. A negative time is outside the
situation, so the ball lands after about $1.08$ s. The **domain** of the model is
$0 \le t \le 1.078$, and the model is not meant to be used outside it.

## 3. Reading the model in context

Each feature of the graph has a meaning in the situation.

| Feature of the graph | What it says about the ball |
|---|---|
| the $y$-intercept | the height it was released from |
| the vertex | the greatest height and when it happens |
| the positive root | when it lands |
| the coefficient of $t^2$ | how fast the ball falls, from gravity |

**Example 2.** Use the model to find when the ball is $2$ m high.

Set $h = 2$:

$$
1.5 + 4t - 5t^2 = 2, \qquad 5t^2 - 4t + 0.5 = 0.
$$

The quadratic formula gives

$$
t = \frac{4 \pm \sqrt{6}}{10},
$$

so $t \approx 0.155$ s or $t \approx 0.645$ s. The ball is $2$ m high twice: once
on the way up and once on the way down. Two solutions are expected, and both are
realistic.

## 4. Refining the model

A model is tested by comparing its prediction with a measurement. If the numbers
disagree, an assumption is changed and the model is tried again.

**Example 3.** A sensor measures the ball at $2.28$ m when $t = 0.4$ s, but the
model predicts $2.3$ m.

The difference is

$$
|2.28 - 2.3| = 0.02 \text{ m}.
$$

Whether this matters depends on the **tolerance**: the size of error the question
allows. With a tolerance of $0.05$ m, a difference of $0.02$ m is acceptable, and
the model is not changed. With a tighter tolerance it would be.

> **Watch out.** A model answers only the question it was built for.
>
> **Using it outside its domain.** The height model stops when the ball lands.
> Substituting $t = 3$ gives a negative height, which is not a real position; the
> formula continues past the end of the situation, but the model does not. Always
> state the domain and check an answer against it.
>
> **Forgetting units.** $2.3$ is not an answer on its own; $2.3$ metres is. Write
> the unit into the final sentence.
>
> **Mistaking the model for reality.** A prediction that fits one measurement is
> not a proof that the model is right. **Re-check:** say what the model assumes,
> and compare more than one prediction with more than one measurement.

## Progress check

Return to the chapter problem. A survey measures the arch again. The height at
the centre is $4.2$ m, not $4$ m, and the arch still meets the road at
$x = \pm 4$.

1. Complete the refined model $y = 4.2 - \frac{4.2x^2}{16}$ and show that it is
   zero at $x = 4$.
2. Work out the height of the refined arch at $x = 1.25$.
3. The lorry roof is $3.2$ m. Work out the new clearance and compare it with the
   clearance from the original model.
4. Write one sentence about whether the extra $0.2$ m at the centre is worth the
   change in the model.

## You should now be able to

- translate a situation into a function;
- state the assumptions of a model and its domain;
- find a greatest value by completing the square and zeros by solving;
- check that each answer is inside the domain and give it a unit;
- compare a prediction with a measurement using a tolerance;
- refine a model when the data disagree, and say what the refinement changes.
