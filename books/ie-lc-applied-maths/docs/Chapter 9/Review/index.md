---
title: 'Chapter 9: Review'
chapter: 9
kind: review
---

# Chapter 9: Review

## The chapter problem, solved

**Your own model.** You chose a real situation, wrote a question with a unit,
built a model from letters and assumptions, tested it against measurements, and
improved it. That project is the chapter problem, and you have now solved it.

Here is the cooling tea carried through all six stages, as a model answer. Put
your own project beside it and check each stage.

**The question.** How many minutes does a cup of tea take to fall from 90 °C to
50 °C in a room at 20 °C?

**The assumptions.** The room stays at a steady 20 °C, so a room that warms up
is not modelled. The tea cools at the same rate throughout, so a faster drop in
the first minute is not modelled. The cup loses heat only to the air, so the
heat taken by the table and the cup is not modelled.

**The model.** $T$ is the temperature in °C, $t$ is the time in minutes, $T_0$ is
the starting temperature, $T_r$ is the room temperature and $k$ is the cooling
rate in each minute. Here $e$ is the number $2.718\ldots$.

$$T = T_r + (T_0 - T_r)e^{-kt}$$

**The solution.** The measurements gave $k = 0.12$ each minute. Setting
$T = 50$, $T_0 = 90$ and $T_r = 20$:

$$50 = 20 + 70e^{-0.12t} \quad\Rightarrow\quad e^{-0.12t} = \frac{30}{70} = \frac{3}{7}$$

$$-0.12t = \ln\frac{3}{7} \quad\Rightarrow\quad t = \frac{\ln(7/3)}{0.12} \approx 7.06$$

The tea takes about 7.1 minutes to fall to 50 °C.

**The evaluation.** The measurements were taken each 2 minutes for 10 minutes,
and the model with $k = 0.12$ fits them with a total squared error of about
$0.15$. The first model, with $k = 0.10$, had an error of about $82.6$ and every
residual was negative, which showed that the tea was cooling faster than the
model allowed.

**The conclusion.** The tea falls from 90 °C to 50 °C in about 7.1 minutes. The
answer depends most on the cooling rate, so a thinner cup would make it shorter.
The model was tested between 0 and 10 minutes, so it cannot say what happens
after an hour.

## Mixed practice — choose the method first

Work through these without notes. For each one, decide **which model or method
you will use, and why**, before you calculate anything. They mix this chapter
with every chapter before it.

1. A queue holds 60 students. Students join at 4 each minute and the till serves
   12 each minute. Find the clear time, in minutes. Which relationship from
   Chapter 1 did you use, and why?
2. A network has vertex degrees 4, 3, 3, 2. Find the number of edges, and say
   which lemma you used.
3. A model predicts a temperature of 8 °C and the measurement is 10 °C. Find the
   residual, and say whether the model is too high or too low.
4. Three residuals are $+1$, $-2$ and $+3$. Find the total squared error.
5. A model is tested between 0 and 5 minutes. A report uses it at 30 minutes.
   Name the error the report is making, and say what it should write instead.
6. A stone is dropped from rest and falls for 3 s. Find its speed, taking
   $g = 9.8$ m/s². Which equation of motion did you choose, and why?
7. A block of mass 5 kg rests on a rough horizontal plane with coefficient of
   friction 0.4. Find the friction force when the block is on the point of
   moving. Take $g = 9.8$ m/s².
8. A trolley of mass 2 kg moves at 3 m/s and sticks to a stationary trolley of
   mass 1 kg. Find their common speed. Which conservation law applies, and why?
9. A point moves in a circle of radius 0.5 m at 4 m/s. Find its centripetal
   acceleration.
10. A model predicts a clear time of 15.666 minutes. Report it to 3 significant
    figures, and say why the full number is misleading.
11. A population model gives $P = 200 \times 1.1^t$. Find $P$ after 2 years, and
    state one assumption the model makes.
12. Two models predict 7 minutes and 12 minutes. The measurement is 9 minutes.
    Find each error and say which model is closer.
13. A student changes two assumptions at once and the fit improves. Explain why
    the improvement cannot be attributed to either change.
14. Write the conclusion of a report in three sentences. It must give the
    answer with its unit, the assumption the answer depends on most, and one
    limit of the model.

## What you can now do

- read the SEC brief for its context, its task words and the data it allows;
- turn a broad context into a precise question with a unit;
- test a candidate problem for measurability, available data and size;
- build a model from letters, units and relationships, and keep it small;
- state each assumption and finish it with what it leaves out;
- collect data that can test a model, and compare a prediction with a
  measurement;
- read the sign and the size of a residual, and use the total squared error to
  compare two models;
- change one assumption at a time, measure what the change did, and find the
  assumption the answer depends on most;
- decide when a model is good enough to stop refining;
- write a report with its six parts, rounded once, with units in the tables and
  on the graph axes;
- evaluate a model, including your own, and say where it fails;
- explain why a model informs a decision without making it.

## Thinking back

Look again at the three notes you wrote at the start of the chapter: the
situation, what you would measure, and your first guess. Compare them with your
finished project.

- How far was your first guess from the model's answer?
- Which assumption did the data force you to change?
- Which part of the situation does your model still leave out?
- What would you measure next, if you had another week?

That comparison is the reflection the project asks for. Deciding what to leave
out is what makes a model useful, and saying what you left out is part of the
applied mathematics. It is also the last skill in this book: a model is a
simplified picture, and the person who knows what the simplification cost is the
person who can use it well.

The brief changes each year, but the process does not. Whatever context it sets,
the six stages are the same: choose the question, state the assumptions, build
the model, test it, refine it, and report it honestly. You have done all six.
