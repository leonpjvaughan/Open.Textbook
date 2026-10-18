---
title: 1.1 The question — Learn
chapter: 1
chapter_title: Suspension kinematics
section: '1.1'
section_title: The question
refs: []
kind: walkthrough
---

# 1.1 The question

## Where this chapter is going

A car's wheel does not stay upright as it moves up and down. The angle it leans
at, and the angle it points at, both change, because the wheel is held by a
linkage of arms that swing on the body.

That change is small — a couple of degrees over the whole travel — and it matters
enormously, because a tyre grips best at a particular angle. So a suspension
designer wants to know, before a single part is made, how the wheel's angles will
move and how much the design can be changed to suit.

**This chapter's question.** A wheel moves 40 mm up and 40 mm down. How far does
its camber change, and what is the simplest model that answers the question
within a tenth of a degree?

The second half of that question is the real subject. The first half has one
answer. The second half is a judgement, and the chapter's argument is that the
judgement can be made with numbers rather than with taste.

## The parts, and their names

Before the mathematics, the words. A car's front corner is a mechanism of seven
parts, and every one of them will be referred to by name for the rest of the
chapter.

:::figure wishbone-anatomy

Move through the parts with the buttons under the drawing. The names to keep are
**wishbone** (also called an A-arm, because of its shape), **upright**, **ball
joint** and **contact patch**.

The two wishbones each attach to the body at two points and to the upright at
one. The upright carries the hub, and the wheel is bolted to the hub, so the
upright and the wheel turn together. Everything in this chapter follows from that
sentence.

## Two angles that will be measured

A wheel has an angle in two different directions, and they have separate names
because they do separate jobs.

**Camber** is the angle of the wheel in the view from in front of the car. A wheel
standing straight up has zero camber. **Positive camber** means the top of the
wheel leans out, away from the car. Negative camber means the top leans in.

Sign conventions differ between books, so this one states its own and keeps to it:

$$ \text{positive camber} \;\Longleftrightarrow\; \text{the top of the wheel leans out.} $$

**Toe** is the angle in the view from above: whether the front of the wheel points
slightly in towards the car or slightly out. This chapter meets toe only in
passing, and §1.4 explains why: the front view is a projection, and a projection
loses one of the two angles.

## The chapter's four models

The mechanism stays the same all the way through. What changes is the model of
it, and each model is replaced only when the one before it has stopped answering
the question.

| Model | What it treats as rigid, and what as free | The question it can answer |
|---|---|---|
| One rigid triangle | the wishbone is one body, the upright another | where the wheel is, and at what angle |
| Two legs | the wishbone is written as its two legs | what a spare equation does to a model |
| Diagnosed | the same, read with a singular value decomposition | which equation was never needed |
| With a bush | the upper joint is a spring | how far the angles move under load |

The chapter's problem is answered at the end of §1.5, and §1.6 and §1.7 sketch
what lies beyond that — mass, dampers, and the rest of the car.

:::deeper the-four-models

## A first look

The next section builds the first model, and the figure there shows the mechanism
moving with the camber read off as it goes. It is worth knowing before then that
the answer is not obvious: the wheel leans one way as it rises and the other way
as it falls, and which way is a property of the linkage rather than a rule.

There is no agreement panel in this section, because there is nothing yet to
agree with. From §1.2 onwards, every section ends by putting a number on how far
the new model and the previous one differ.

## You should now be able to

- name the parts of a double wishbone suspension, and say which of them are rigid
- say what camber is, and which way a wheel leans when its camber is positive
- say why the chapter asks two questions rather than one

## Watch out

Positive camber leans the **top** of the wheel out. It is a common mistake to read it
the other way round, and a whole chapter of signs then comes out upside down.

The check that settles it: a wheel with positive camber looks like the top of an
`A` that has been pushed outwards at the top — `/ \` seen from the front of the
car, leaning away from the middle. Every sign in this chapter follows from that
one convention, and the code that computes camber uses the same definition.

## Where the mathematics lives

The model in this chapter is a small one, and it has been implemented in a
package that also solves the three-dimensional version. Each section shows the
mathematics as pseudocode and links to the file that implements it, so a reader
who wants the whole of it can find it:

- [`suspension-kinematics`](https://github.com/leonpjvaughan/suspension-kinematics) —
  the solver, its tests, and the data the later figures draw.
