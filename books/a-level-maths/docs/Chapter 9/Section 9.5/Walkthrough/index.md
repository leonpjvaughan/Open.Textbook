---
title: 9.5 Numerical methods in context — Learn
chapter: 9
chapter_title: Numerical methods
section: '9.5'
section_title: Numerical methods in context
refs:
- I4
- OT2
kind: walkthrough
---

# 9.5 Numerical methods in context — Learn

**Prerequisites:** the change-of-sign test from Section 9.1; simple iteration
from Section 9.2; Newton–Raphson from Section 9.3; the trapezium rule from
Section 9.4.

**By the end of this section you can:** choose a numerical method for a problem
in context; decide what accuracy the problem needs; carry the method through to
an answer with units; and explain the limits of a model.

## 1. A method for a problem in context

A problem in context rarely says which method to use. You decide. These four
questions cover most situations.

1. **Is the unknown a root of an equation?** Write the equation as $f(x) = 0$.
2. **Can you write down the derivative?** If so, Newton–Raphson is fast.
   If not, a simple rearrangement may be better.
3. **Is the unknown an area under a curve or under a set of readings?** Use the
   trapezium rule.
4. **What accuracy does the problem need?** A landing time may need three decimal
   places. A river flow rate may only need two significant figures.

The same four questions work whether the context is a drone, a drug or a river.
Decide first, calculate second, and interpret the answer third.

**Bracket the root first.** A change of sign proves that a root exists in an
interval, and it needs only the function values. Use it first to bracket the root
whenever you can. It also guards against a method that converges to the wrong
root, because the bracket tells you which root you are aiming for.

## 2. Worked example: the landing drone

The chapter problem asks when the drone lands. Its height is

$$
h(t) = 40e^{-t/4} - 2t,
$$

and it lands when $h(t) = 0$.

**Step 1. Bracket the root.** Substitute $t = 5$ and $t = 6$:

$$
h(5) = 40e^{-1.25} - 10 = 1.4602 > 0,
\qquad
h(6) = 40e^{-1.5} - 12 = -3.0748 < 0.
$$

The signs differ and $h$ is continuous, so the landing time lies in $(5, 6)$.

**Step 2. Choose the method.** The function is smooth and its derivative is
straightforward to write down, so Newton–Raphson is the quickest choice.
Differentiate:

$$
h'(t) = -10e^{-t/4} - 2.
$$

**Step 3. Iterate.** Use $t_{n+1} = t_n - \dfrac{h(t_n)}{h'(t_n)}$ with
$t_0 = 5$:

$$
t_1 = 5 - \frac{1.4602}{-4.8650} = 5.3001,
$$

$$
t_2 = 5.3001 - \frac{0.0315}{-4.6579} = 5.3069,
\qquad
t_3 = 5.3069 - \frac{0.00002}{-4.6535} = 5.3069.
$$

**Step 4. Interpret.** The landing time is $5.307$ seconds to three decimal
places. In context, the answer is about $5.3$ seconds. The third decimal place
is not what the operator needs, but the method reaches it in three steps.

**Step 5. State the limits.** The model assumes the drone descends smoothly and
that the height formula stays valid. Real air movement makes the landing time
uncertain by more than $0.001$ seconds, so the extra decimal places do not
describe the real landing.

## 3. Worked example: the concentration of a drug

A drug's concentration in the blood, $t$ hours after a dose, is modelled by

$$
C(t) = 6te^{-0.4t} \quad \text{milligrams per litre.}
$$

Find the time when the concentration is $2$ milligrams per litre.

**Step 1. Form an equation.** Set $C(t) = 2$:

$$
6te^{-0.4t} = 2.
$$

Divide both sides by $2$:

$$
3te^{-0.4t} = 1.
$$

Multiply both sides by $e^{0.4t}$:

$$
3t = e^{0.4t}.
$$

So the unknown time is a root of $f(t) = 3t - e^{0.4t} = 0$.

**Step 2. Bracket the root.** Substitute $t = 0.35$ and $t = 0.4$:

$$
f(0.35) = 1.05 - e^{0.14} = -0.1003 < 0,
\qquad
f(0.4) = 1.2 - e^{0.16} = 0.0265 > 0.
$$

The root lies in $(0.35, 0.4)$.

**Step 3. Iterate.** Differentiate to get $f'(t) = 3 - 0.4e^{0.4t}$. Use
Newton–Raphson with $t_0 = 0.4$:

$$
t_1 = 0.4 - \frac{0.0265}{2.5306} = 0.3895,
\qquad
t_2 = 0.3895 - \frac{-0.00001}{2.5326} = 0.3895.
$$

**Step 4. Interpret.** The concentration reaches $2$ milligrams per litre after
$0.390$ hours, which is about $23.4$ minutes. The model ignores how the drug is
absorbed, so the answer guides a dose plan but does not fix it.

## 4. Worked example: distance from a speed trace

A car's speed is recorded every two seconds for ten seconds.

| Time (s) | $0$ | $2$ | $4$ | $6$ | $8$ | $10$ |
|---|---|---|---|---|---|---|
| Speed (m/s) | $0$ | $5$ | $9$ | $12$ | $14$ | $15$ |

The distance travelled is the area under the speed–time graph. The readings do
not follow a formula, so use the trapezium rule with $h = 2$:

$$
s \approx \frac{2}{2}\Bigl[0 + 15 + 2\left(5 + 9 + 12 + 14\right)\Bigr]
= 15 + 2(40) = 95.
$$

The car travels about $95$ metres.

The speed increases throughout, so the smaller height on each strip is on the
left. The lower sum is $2(0 + 5 + 9 + 12 + 14) = 80$, and the upper sum is
$2(5 + 9 + 12 + 14 + 15) = 110$. The distance lies between $80$ and $110$
metres, and the trapezium estimate is the midpoint of that range.

## 5. Accuracy, and what the answer means

A numerical answer is only as good as the accuracy the problem needs. Two ideas
keep the answer honest.

**Report the accuracy the context justifies.** A time in seconds may need three
decimal places. A flow rate in cubic metres per second often needs two
significant figures. Extra digits cost work and suggest a precision the model
does not have.

**Use the bracket as a check.** If your iteration settles outside the bracket you
found by change of sign, something is wrong. Either the iteration has found a
different root, or the arithmetic has slipped. Re-check against the bracket.

> **Watch out.** Three mistakes are common.
>
> **Choosing a method with no bracket.** An iteration can settle on a root you
> did not want. **Re-check:** bracket the root by change of sign first, so you
> know which root you are aiming for.
>
> **Reporting every digit the calculator shows.** A model answer of
> $5.3068986\ldots$ seconds is not more useful than $5.31$ seconds. **Re-check:**
> decide the accuracy from the context before you round.
>
> **Treating an estimate as exact.** The trapezium rule with six readings, or a
> model fitted to a few measurements, gives an estimate. **Re-check:** state
> whether the answer is exact, and give a limit or a tolerance when you can.

## Progress check

Return to the chapter problem. The drone lands at $5.307$ seconds, and the river
has cross-sectional area about $20.2$ square metres.

1. The river flows at $0.8$ metres per second. Estimate the flow rate, and give
   the units.
2. A second drone has height $h(t) = 30e^{-t/3} - 3t$. Show that it lands between
   $3$ and $4$ seconds.
3. For the second drone, choose a method to find the landing time to two decimal
   places, and say why you chose it.

## You should now be able to

- decide whether a context needs a root-finding method or the trapezium rule;
- bracket a root by change of sign before you iterate;
- choose between Newton–Raphson and a simple rearrangement;
- carry a numerical method through to an answer with units;
- decide the accuracy the context needs and round to it;
- explain how the limitations of a model affect the answer.
