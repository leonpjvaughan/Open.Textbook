---
title: 'Chapter 1: Suspension kinematics'
chapter: 1
strand: applied
---

# Chapter 1: Suspension kinematics

A car's wheel does not stay upright as it moves. This chapter works out how far it
tilts, using one mechanism and four static models of it, then a fifth with mass. It
is as much about the models as about the wheel.

## The chapter problem

**The chapter problem.** A wheel moves 40 mm up and 40 mm down. How far does its
camber change, and what is the simplest model that gives an answer you would trust
within a tenth of a degree?

The first half is arithmetic, once the model exists. The second half is the judgement.
The chapter's answer is that it is decided by comparing the size of
the effect a model leaves out with the tolerance the question asks for. When the
effect is smaller than the tolerance, the simpler model is the correct one.

**Where it is used:** every car on the road has a suspension linkage of this kind,
and its angles are measured or modelled before a manufacturer commits to a design.

## By the end of this chapter you will be able to

- turn a wheel's travel into the angle of every part of the linkage, from two
  circles meeting
- count a mechanism's degrees of freedom, and say why a good model has exactly one
  spare input
- say what a residual, a least-squares step and a singular value each tell you, and
  what none of them can
- replace a rigid joint with a spring and find where the mechanism settles — without
  simulating anything
- decide which of two models answers a question, by comparing a tolerance with an
  effect

## How to read it

The main thread is §1.1 to §1.5, in order, and it is complete on its own. Each of
those sections ends with an optional page marked **Going deeper**, and a reader who
skips every one of them has still read the chapter.

§1.6 and §1.7 both stand outside the main thread, and neither is needed for the chapter
problem. §1.6 is a finished section in its own right. It asks what the mechanism does on
the way to a position, and answers it with a model and a number. §1.7 is an outline of the
whole car, and says so, because a whole vehicle is a book rather than a section.

## Roadmap

| Section | The model | What it is for |
|---|---|---|
| 1.1 The question | — | the parts, the two angles, and the destination |
| 1.2 One rigid triangle | one degree of freedom | the model, and its closed-form answer |
| 1.3 Two legs, one contradiction | three equations, two unknowns | what an extra equation does |
| 1.4 The redundancy was ours | the same, diagnosed | which equation was spare, and how to tell |
| 1.5 Bushes are not rigid | a spring under load | when the simpler model stops being enough |
| 1.6 Mass and dampers | a mass and a rate | what changes when the mechanism has mass |
| 1.7 The full vehicle | outline | where these models sit in a whole car |

## Your turn to connect it

Think of something you use every day that is engineered rather than grown. What is
the one number you would want to know about it, and what would you have to measure
to find it?

:::figure relevance-prompt
