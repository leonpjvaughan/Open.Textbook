---
title: 21.1 Listing outcomes and the sample space — Learn
chapter: 21
chapter_title: Probability
section: '21.1'
section_title: Listing outcomes and the sample space
tier: O
refs:
- SP.1
kind: walkthrough
---

# 21.1 Listing outcomes and the sample space — Learn

**Prerequisites:** reading a table, and the multiplication tables.

**Objectives:** write down the outcomes of an experiment in a system; build the
sample space as a list or a table; use the fundamental principle of counting to
count the outcomes without listing them.

By the end of this section you can list every result an experiment can give, and
count them when the list is long.

## Outcomes, events and the sample space

An **outcome** is one result of an experiment. Rolling a die and getting a 3 is an
outcome. Tossing a coin and getting heads is an outcome.

An **event** is a group of outcomes that you can describe. "The die shows an even
number" is an event, and it contains the three outcomes 2, 4 and 6.

The **sample space** is the list of every possible outcome. It is the complete
list, with nothing left out and nothing counted twice.

A good list is a **systematic** list. You follow a rule, so you can see that you
have not missed anything. Writing outcomes down in any order that comes to mind is
how outcomes get lost.

## A list and a table

**Example 1.** A fair coin is tossed twice. Write down the sample space.

Work from the first toss to the second, and take the two second tosses in the same
order each time:

$$HH, \quad HT, \quad TH, \quad TT$$

There are 4 outcomes. The two middle ones, $HT$ and $TH$, are different, because
the first letter is the first toss. Writing them in this order is what shows the
list is complete.

**Example 2.** A fair six-sided die is rolled and a spinner with four equal
sectors, A, B, C and D, is spun. Write down the sample space.

A table with the die down the side and the spinner across the top puts every
outcome in a cell:

| Die | A | B | C | D |
|---|---|---|---|---|
| 1 | 1A | 1B | 1C | 1D |
| 2 | 2A | 2B | 2C | 2D |
| 3 | 3A | 3B | 3C | 3D |
| 4 | 4A | 4B | 4C | 4D |
| 5 | 5A | 5B | 5C | 5D |
| 6 | 6A | 6B | 6C | 6D |

There are 6 rows and 4 columns, so there are 24 outcomes. This is the sample
space of the open-day game from the chapter problem.

## The fundamental principle of counting

You do not always need the whole list. You often need only the number of
outcomes.

**The fundamental principle of counting.** If one choice can be made in $m$ ways
and a second choice in $n$ ways, then the two choices together can be made in
$m\times n$ ways.

The rule works because each of the $m$ first choices can be paired with each of
the $n$ second choices. The number of pairs is a product, not a sum.

**Example 3.** A cafe offers 3 starters, 4 main courses and 2 desserts. How many
different three-course meals are possible?

Multiply the choices at each stage:

$$3\times4\times2=24$$

There are 24 meals. For each of the $3\times4=12$ starter-and-main pairs, there
are 2 desserts, which gives $12\times2=24$.

**Example 4.** Two fair dice are rolled. How many outcomes are in the sample
space?

$$6\times6=36$$

The first die has 6 results and the second has 6, so there are 36 outcomes. The
pair $(2,5)$ and the pair $(5,2)$ are different outcomes, because the dice are
separate.

## Watch out

> **Watch out.** The counting principle gives you the **number** of outcomes. It
> does not write the list for you, and some questions ask for the list.
>
> For example, two dice give 36 outcomes, but the question "list the outcomes
> with a total of 7" still needs the six pairs written out: $(1,6)$, $(2,5)$,
> $(3,4)$, $(4,3)$, $(5,2)$ and $(6,1)$.
>
> **Re-check:** read the question again. Does it want a count, or does it want the
> outcomes themselves?

A second trap is a pair such as $HT$ and $TH$. They look similar, but the order
of the two stages makes them different outcomes. Only $HH$, $HT$, $TH$ and $TT$
is the complete list for two tosses.

## Progress check

Return to the chapter problem, the open-day game. A player rolls a die and spins
a spinner with sectors A, B, C and D.

1. How many outcomes are in the sample space?
2. Write the product from the counting principle that gives your answer.
3. Which one outcome is the star prize?

In Section 21.2 you will place the chance of the star prize on the scale from 0
to 1.

## You should now be able to

- say what an outcome, an event and the sample space are;
- list the sample space of an experiment in a systematic way, as a list or as a
  table;
- use the fundamental principle of counting to multiply the numbers of choices;
- tell a pair such as $HT$ from a pair such as $TH$;
- say whether a question wants the list of outcomes or only the number of them.
