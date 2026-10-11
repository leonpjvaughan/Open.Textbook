---
title: 7.10 Constructing differential equations — Learn
chapter: 7
chapter_title: Differentiation
section: '7.10'
section_title: Constructing differential equations
dfe:
- G6
- OT3
kind: walkthrough
---

# 7.10 Constructing differential equations — Learn

**Prerequisites:** the derivative as a rate of change from Section 7.1;
differentiating standard functions from Section 7.3; reading a word problem and
choosing a letter for each quantity.

**By the end of this section you can:** turn a description of a rate into a
differential equation; use proportionality and a sign to model growth, decay,
cooling, motion, price and demand; and eliminate a constant from a family of
curves to form a differential equation.

## 1. From words to an equation

A **differential equation** is an equation that links a derivative to the
quantities it describes. To build one, follow three steps.

1. Name the quantity and its rate. For a quantity $P$ that changes with time
   $t$, the rate is $\dfrac{dP}{dt}$.
2. Read the relationship. "Proportional to" introduces a positive constant $k$.
3. Get the sign right. "Grows" and "increases" need a positive term; "falls",
   "cools" and "decays" need a minus sign.

**Example 1.** A population of bacteria grows at a rate proportional to the
population. Write a differential equation for the population $P$ after $t$ hours.

The rate is $\dfrac{dP}{dt}$. It is proportional to $P$, with a positive
constant:

$$
\frac{dP}{dt} = kP, \qquad k > 0.
$$

**Example 2.** A cup of tea cools. The rate at which its temperature falls is
proportional to the difference between the temperature and the room temperature,
$20^\circ$C. Write a differential equation for the temperature $\theta$ after
$t$ minutes.

The rate is $\dfrac{d\theta}{dt}$. The temperature difference is
$\theta - 20$. The temperature falls, so the rate is negative:

$$
\frac{d\theta}{dt} = -k(\theta - 20), \qquad k > 0.
$$

The minus sign is the important part: the tea cools only while it is warmer than
the room.

**Example 3.** A stone falls under gravity. Its velocity $v$ increases at a rate
proportional to the constant $g$, directed downwards. Write a differential
equation for $v$ after $t$ seconds.

The rate of change of velocity is acceleration. The velocity increases downwards,
so with downwards taken as positive,

$$
\frac{dv}{dt} = g.
$$

If the stone also meets air resistance proportional to its speed, the equation
becomes

$$
\frac{dv}{dt} = g - kv, \qquad k > 0.
$$

**Example 4.** The price $P$ of a product falls at a rate proportional to the
amount by which the price exceeds $10$. Write a differential equation for $P$.

The price falls, so the rate is negative, and it is proportional to $P - 10$:

$$
\frac{dP}{dt} = -k(P - 10), \qquad k > 0.
$$

## 2. Forming a differential equation from a family of curves

A differential equation also describes a whole family of curves. Differentiate
the family and eliminate any constant.

**Example 5.** The curve $y = Ae^{2x}$ has a constant $A$. Form a differential
equation that does not contain $A$.

Differentiate:

$$
\frac{dy}{dx} = 2Ae^{2x}.
$$

But $Ae^{2x}$ is $y$, so

$$
\frac{dy}{dx} = 2y.
$$

The differential equation describes every curve in the family, whatever the value
of $A$.

**Example 6.** The curve $y = x^3 + C$ has a constant $C$. Form a differential
equation that does not contain $C$.

Differentiate once:

$$
\frac{dy}{dx} = 3x^2.
$$

The constant $C$ has vanished, so $\dfrac{dy}{dx} = 3x^2$ is the differential
equation. Every curve in the family has the same gradient at a given $x$.

> **Watch out.** Three mistakes are common when forming differential equations.
>
> **Forgetting the minus sign for a decrease.** "Cools" and "decays" mean the
> rate is negative. In Example 2 the equation
> $\dfrac{d\theta}{dt} = k(\theta - 20)$ would make the tea hotter, which is the
> wrong model.
>
> **Writing "proportional to" as an equals sign without the constant.** The
> phrase introduces an unknown constant $k$. Write $kP$, not $P$.
>
> **Keeping the wrong variable in the rate.** The rate of change of $P$ with
> respect to $t$ is $\dfrac{dP}{dt}$. Do not write $\dfrac{dt}{dP}$, which is the
> reciprocal. **Re-check:** after you write the equation, read it back in words
> and confirm that the sign and the rate match the sentence.

## You should now be able to

- name the rate in a description and write it as a derivative;
- use a constant $k$ for "proportional to";
- use a minus sign for cooling, decay and decrease;
- model population growth, cooling, motion, and price and demand;
- form a differential equation from a family of curves by eliminating a
  constant.
