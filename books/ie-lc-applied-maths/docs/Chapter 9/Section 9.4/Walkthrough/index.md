---
title: 9.4 Iterating and improving — Learn
chapter: 9
chapter_title: The modelling project
section: '9.4'
section_title: Iterating and improving
tier: O
refs:
- S1
kind: walkthrough
---

# 9.4 Iterating and improving — Learn

**Prerequisites:** Section 9.3, a model tested against data.

**Objectives:** change one assumption at a time; measure what the change did to
the total squared error; find which assumption the answer depends on most;
decide when to stop refining.

A first model is almost never the last one. The data tells you where the model
is wrong, and the residuals tell you which way to move. This section shows how
to improve a model without fooling yourself.

## Change one assumption at a time

When the model disagrees with the data, change one thing and work the model
again. Compare the new total squared error with the old one.

If the error falls, the change helped, and you keep it. If the error rises, the
change made the model worse, and you put the assumption back. Either way, you
know which change caused which effect.

If you change two assumptions at once, you cannot tell which one helped. The
model may be better, but you have learned nothing about the situation, and the
report cannot say what the improvement means.

## An iteration on the cooling tea

In Section 9.3 the model used $k = 0.10$ each minute. Every residual was
negative and they grew with time, so the tea was cooling faster than the model
allowed.

The fix is to raise $k$. Try $k = 0.12$.

| Time / min | Measured / °C | Model / °C | Residual / °C |
|---|---|---|---|
| 0 | 90 | 90.0 | 0.0 |
| 2 | 75 | 75.1 | -0.1 |
| 4 | 63 | 63.3 | -0.3 |
| 6 | 54 | 54.1 | -0.1 |
| 8 | 47 | 46.8 | +0.2 |
| 10 | 41 | 41.1 | -0.1 |

The total squared error falls from about $82.6$ to about $0.15$. The residuals
are now spread around zero, with no growing pattern. One change, one assumption,
and the model now follows the data.

## Which assumption matters most

Not every assumption changes the answer by the same amount. The one that changes
it most is the one the answer depends on, and it is worth naming in the report.

To find it, change each assumption in turn, by as much as the measurement could
plausibly be wrong, and see how far the answer moves.

- If the room temperature could be $20$ or $22$ degrees, try both and compare
  the predictions.
- If the starting temperature could be $88$ or $92$ degrees, try both.

The assumption that moves the answer furthest is the one to measure most
carefully. A small error in it produces a large error in the result.

## When to stop refining

Refinement must stop somewhere, and the data tells you where. A model is good
enough when a further change moves the prediction by less than the measurements
themselves vary.

If repeating a reading changes it by 2 degrees, then a change that moves the
model by half a degree is smaller than the noise. Improving it further is work
that the data cannot see, and the report should say so.

> **Watch out.** Two errors undo the value of the iteration.
>
> The first is changing several assumptions at once. The new model may fit
> better, but the report cannot say which change earned the improvement.
>
> The second is adding a number for every measurement until the curve passes
> through every point. A model with as many knobs as data points can fit the data
> perfectly and predict nothing. That is called **overfitting**, and it is a
> trap: the model has learned the measurements, not the situation.

## Progress check

Back to the chapter problem, **your own model**. Improve it now, one assumption
at a time.

1. Look at the residuals from Section 9.3 and write down what their pattern
   suggests.
2. Change one assumption to fit that pattern, and work the model again.
3. Find the new total squared error, and compare it with the old one.
4. Write one sentence that says whether the change helped, and why.
5. Name the assumption your answer depends on most.

Keep the improved model and both error totals. Section 9.5 writes them into the
report.

## You should now be able to

- change one assumption at a time and re-work the model;
- compare the new total squared error with the old one;
- explain why changing two assumptions at once teaches you nothing;
- find the assumption the answer depends on most;
- stop refining when the change is smaller than the variation in the data;
- explain why a model that fits every point may predict nothing.
