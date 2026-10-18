---
title: 1.7 The full vehicle — Learn
chapter: 1
chapter_title: Suspension kinematics
section: '1.7'
section_title: The full vehicle
refs: []
kind: walkthrough
---

# 1.7 The full vehicle

> **Outline.** A map of what lies beyond this chapter, and where the chapter's
> models sit in it. Nothing here is worked out, and nothing here is needed to
> answer the chapter's question.

## The corner is not the car

Four corners are joined by a body that can roll, pitch and heave, so what one
corner does depends on what the others are doing. A model of the whole car adds:

- **Four of these mechanisms**, one per corner, each with its own geometry.
- **A body with mass and inertia**, so the corners talk to each other through it.
- **A tyre model**, which turns slip angle and camber into a force. Tyres are where
  camber finally pays for itself: a tyre at the wrong camber makes less grip, and
  the amount depends on the load, the pressure and the surface.
- **A road**, which is the input: a bump on one side, a camber in the surface, a
  kerb.
- **Air**, pushing down, and pushing differently at speed.

## Where the small model goes

It stays. A full vehicle model calls a corner model, once per wheel, at every
evaluation, and the corner model it calls is the one this chapter built: the
kinematics that turn a wheel's travel into its camber and its track change.

That is the shape of every serious vehicle model, and it is the point of this
chapter's method. The big model is not the small model written larger. It is the
small model **used many times, and used honestly**, with its limits stated where it
is called.

The limits this chapter established are the ones to state:

- the model is kinematic, so a load changes the answer only through a bush;
- the bush's stiffness is a number that must be measured or assumed;
- the geometry is fixed, so nothing bends and nothing wears;
- the tyre is a black box that the kinematics know nothing about.

## What a bigger model still cannot do

It is worth saying, because the chapter's whole argument points this way: a bigger
model is not more true. A full vehicle model with a wrong tyre and a guessed bush
stiffness answers its own question, precisely, and may still be wrong about the car.

What makes a model trustworthy is not its size. It is that the smaller models inside
it have been checked, and that somebody has said which question it was built to
answer.

## You should now be able to

- say what a full vehicle model adds to a corner model, and what it does not
- say why the corner model is still used inside the larger one
- state the limits of this chapter's models without being asked

## Watch out

The temptation at this point is to think that the chapter was a warm-up for the
vehicle model. It is the other way round. The vehicle model is a way of using the
corner model many times, and it is only as good as the corner model and the honesty
of the limits around it.
