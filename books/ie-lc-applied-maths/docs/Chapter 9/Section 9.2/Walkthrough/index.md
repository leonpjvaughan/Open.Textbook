---
title: 9.2 Building the model and stating assumptions — Learn
chapter: 9
chapter_title: The modelling project
section: '9.2'
section_title: Building the model and stating assumptions
tier: O
refs:
- S1
kind: walkthrough
---

# 9.2 Building the model and stating assumptions — Learn

**Prerequisites:** Section 9.1, a question with a unit; Chapter 1, translating a
situation into symbols.

**Objectives:** choose letters and give each one a unit; write the relationship
between them; state every assumption and say what it leaves out; check the units
of the relationship.

A model is a small piece of mathematics that stands in for a real situation. It
is built from three things: letters, units and relationships. The assumptions
are what hold the three together, and they are the part a reader checks first.

## Letters carry units

Every letter in a model stands for a quantity, and every quantity has a unit.
Write the unit beside the letter, every time, from the first line.

For a cup of tea that cools, a model might use:

- $T$, the temperature of the tea, in degrees Celsius;
- $T_0$, the starting temperature, in degrees Celsius;
- $T_r$, the room temperature, in degrees Celsius;
- $t$, the time since the tea was poured, in minutes;
- $k$, the cooling rate, in each minute.

A letter with no unit is a letter a reader cannot check. When you write $k$, the
reader must be able to see that $k$ is measured in each minute, or the model
cannot be used by anyone else.

## Relationships

The relationship is the mathematics that joins the letters. For the cooling tea,
a simple model says that the temperature difference from the room shrinks by the
same fraction each minute.

$$T = T_r + (T_0 - T_r)e^{-kt}$$

Here $e$ is the number $2.718\ldots$.

The letters are defined above, so a reader can put the real values in. When you
write a relationship, do three things.

1. **Define every letter**, with its unit, above the relationship.
2. **Say what the relationship claims**, in one sentence of plain English.
3. **Check the units** of both sides, so the relationship balances.

## Assumptions, and what they cost

An assumption is something you decide to treat as true, even though the real
situation may not match it. A model cannot do without assumptions, because
without them the situation is too large to write down. What matters is that each
assumption is stated, and that you say what it leaves out.

For the cooling tea, the assumptions might be:

- The room stays at a steady $20$ degrees. **This leaves out** a room that warms
  up, and a window opened halfway through.
- The tea cools at the same rate throughout. **This leaves out** a faster drop
  in the first minute, when the tea is hottest.
- The cup loses heat only to the air. **This leaves out** the heat taken by the
  table and the cup itself.

Each assumption is a sentence, and each one ends with what it leaves out. A
reader who wants a different cup, or a different room, can then see which part
of the model to change.

## Keeping the model small

It is tempting to add a letter for every detail. More letters mean more
assumptions, more measurements, and more places for an error to hide. A model
with ten letters is not better than a model with three; it is harder to check.

Start with the smallest model that could answer the question. Add a letter only
when the data shows the model is wrong and the new letter would explain why. You
will do exactly that in Section 9.4.

> **Watch out.** Two errors are common at this stage.
>
> The first is a letter with no unit. Without the unit, nobody can tell whether
> $t$ is measured in minutes or in hours, and the answer is off by a factor of
> $60$ without the model looking wrong.
>
> The second is an assumption that is stated but not costed. "I assume the rate
> is steady" tells the reader what you did, but not what it leaves out. Write the
> second half: "so a rate that changes during the day is not modelled."

## Progress check

Back to the chapter problem, **your own model**. Build the first version of your
model now.

1. List every letter you need, and write its unit beside it.
2. Write one relationship that joins the letters.
3. State two assumptions, and finish each one with what it leaves out.
4. Check the units on both sides of your relationship.

Keep this first model. In Section 9.3 you will test it against data, and in
Section 9.4 you will change one assumption and see what happens.

## You should now be able to

- choose letters for a model and give every one a unit;
- write a relationship and say what it claims in one sentence;
- state an assumption and finish it with what it leaves out;
- check that the units balance on both sides of a relationship;
- keep a model as small as the question allows.
