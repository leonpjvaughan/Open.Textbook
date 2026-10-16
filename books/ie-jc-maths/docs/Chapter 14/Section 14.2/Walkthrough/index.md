---
title: 14.2 Function notation and evaluating functions — Learn
chapter: 14
chapter_title: Functions and graphs
section: '14.2'
section_title: Function notation and evaluating functions
tier: O
refs:
- AF.7
kind: walkthrough
---

# 14.2 Function notation and evaluating functions — Learn

**Prerequisites:** the idea of a function from Section 14.1, and substituting values
into expressions from Section 10.2.

**Objectives:** read and write function notation; find the output for a given input;
find the input that gives a chosen output; name the domain and the range in notation;
use a function to model the garden bed.

By the end of this section, you can use function notation to find an output, and to
find the input that gives it.

## Naming a function

A function needs a name, so you can talk about it. We use a letter, usually $f$.

The notation $f(x)$ means "the output of the function $f$ for the input $x$". You read
$f(x)$ as "$f$ of $x$".

$$f(x) = 3x-2$$

This is the rule **multiply by 3, then subtract 2**, with the name $f$. The same rule
can be written in three ways, and they all mean the same thing.

- $f(x)=3x-2$
- $y=3x-2$
- $f:x\mapsto 3x-2$

The last one uses an arrow and reads "the function $f$ maps $x$ to $3x-2$".

## Finding an output

To find $f(4)$, replace every $x$ in the rule with 4.

$$f(4) = 3\times4-2 = 12-2 = 10$$

The output is 10. The number inside the bracket is always the input.

**Example 1.** The function $f$ is given by $f(x)=3x-2$. Find $f(-2)$.

$$f(-2) = 3\times(-2)-2 = -6-2 = -8$$

Put a negative input in brackets, so the sign stays attached to the number.

**Example 2.** The function $g$ is given by $g(x)=x^2+1$. Find $g(5)$.

$$g(5) = 5^2+1 = 25+1 = 26$$

Work out the index before the addition.

**Example 3.** The function $g$ is given by $g(x)=x^2+1$. Find $g(-3)$.

$$g(-3) = (-3)^2+1 = 9+1 = 10$$

The square of a negative number is positive.

## Finding the input

Sometimes you know the output and want the input. You solve an equation.

**Example 4.** The function $f$ is given by $f(x)=2x+7$. Find the input $x$ for which
$f(x)=19$.

Write the rule equal to the output, and solve.

$$2x+7 = 19$$

Subtract 7 from both sides.

$$2x = 12$$

Divide both sides by 2.

$$x = 6$$

The input is 6, because $2\times6+7=19$.

**Example 5.** The function $h$ is given by $h(x)=x^2-4$. Find both inputs for which
$h(x)=0$.

$$x^2-4 = 0$$

$$x^2 = 4$$

$$x = -2 \quad \text{or} \quad x = 2$$

A square hides the sign of its input, so both $-2$ and 2 give the output 0.

## Domain and range in notation

The **domain** is the set of inputs the function allows. The **range** is the set of
outputs it produces.

For $f(x)=2x+1$ with the domain $\{1, 2, 3\}$, the range is $\{3, 5, 7\}$.

For $f(x)=x^2$ with the domain of all real numbers, the range is every number from 0
upwards. A square cannot be negative, so no output is below 0.

In a real problem the domain is often limited by the situation. The garden bed cannot
have a negative width, and it cannot be wider than 6 m, so its domain is $0$ to $6$.

## The garden bed

The area of the garden bed is a function of its width. Write it with the name $A$.

$$A(x) = x(12-2x) = 12x-2x^2$$

**Example 6.** Find $A(3)$.

$$A(3) = 12\times3-2\times3^2 = 36-18 = 18$$

The area is $18\ \text{m}^2$ for a width of 3 m.

**Example 7.** Find the widths for which the area is $16\ \text{m}^2$.

$$12x-2x^2 = 16$$

This is a quadratic equation. Move every term to one side and divide by 2.

$$x^2-6x+8 = 0$$

Factorise.

$$(x-2)(x-4) = 0$$

So $x=2$ or $x=4$. Both widths give an area of $16\ \text{m}^2$, which is the pair you
met in Section 14.1.

## Two functions that meet

Two functions can have the same output for one input. That input is where their graphs
cross.

**Example 8.** The functions are $f(x)=2x+1$ and $g(x)=x+5$. Find the input for which
$f(x)=g(x)$.

$$2x+1 = x+5$$

Subtract $x$ from both sides.

$$x+1 = 5$$

$$x = 4$$

Check: $f(4)=2\times4+1=9$ and $g(4)=4+5=9$. Both functions give 9, so the graphs
cross at the point $(4,9)$.

> **Watch out.** The notation $f(4)$ does not mean $f$ multiplied by 4. It means the
> output of the function $f$ when the input is 4.
>
> For $f(x)=3x-2$, the common error is to write $f(4)=3x-2\times4=3x-8$. That mixes the
> letter $x$ with the input. The correct step replaces every $x$ with 4:
> $f(4)=3\times4-2=10$.
>
> **Re-check:** after you substitute, the letter $x$ should not appear anywhere in your
> answer. If an $x$ is left, you have not finished.

## Progress check

Return to the chapter problem. The area of the garden bed is $A(x)=12x-2x^2$ square
metres, where $x$ is the width in metres.

1. Find $A(2)$ and $A(4)$.
2. Both answers are the same. What does that tell you about the graph of $A$?
3. Find the width for which the area is $18\ \text{m}^2$.

In Section 14.3 you will draw the graph of the fenced length.

## You should now be able to

- read and write a function in the forms $f(x)$, $y$ and $f:x\mapsto$;
- find the output for a given input, including a negative input;
- find the input that gives a chosen output by solving an equation;
- name the domain and the range of a function;
- use a function to model a real situation such as the garden bed.
