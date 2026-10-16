---
title: 4.7 Simultaneous equations in two variables — Learn
chapter: 4
chapter_title: 'Algebra: expressions and equations'
section: '4.7'
section_title: Simultaneous equations in two variables
tier: O
refs:
- '4.2'
kind: walkthrough
---

# 4.7 Simultaneous equations in two variables — Learn

**Prerequisites:** Section 4.4 — finding a common value; Section 4.6 — solving a
linear equation.

**Objectives:** solve two linear equations in two unknowns by substitution and by
elimination; interpret the solution as a point of intersection.

By the end of this section you can find the pair of values that satisfies two
equations at the same time.

## Two conditions, one pair of values

An equation such as $x + y = 10$ has many solutions: $x = 1$ with $y = 9$,
$x = 4$ with $y = 6$, and so on. A single equation in two unknowns does not pin
the values down.

Two equations do. A pair of values that satisfies **both** equations at once is
called a **simultaneous solution**, and the two equations are a **system**.

There are two standard methods, and the shape of the equations decides which is
quicker.

## Method 1: substitution

Use one equation to write one unknown in terms of the other, then substitute into
the second equation.

**Example 1.** The cost and income of the candle business are

$$C = 240 + 4n \qquad R = 10n$$

The break-even point is where the cost equals the income, so $C = R$. Substitute
the expression for $C$:

$$240 + 4n = 10n$$

This is the equation solved in Section 4.6, so $n = 40$. Then

$$R = 10(40) = 400$$

The solution is $n = 40$, with $C = R = 400$, which is €400. Substitution suits a system where one
unknown is already the subject of an equation.

## Method 2: elimination

Add or subtract the equations to remove one unknown.

**Example 2.** Solve

$$x + y = 10 \qquad x - y = 4$$

The $y$ terms are $+y$ and $-y$, so adding the equations removes $y$:

$$2x = 14 \quad\Rightarrow\quad x = 7$$

Substitute back into the first equation: $7 + y = 10$, so $y = 3$.

Check in the second equation: $7 - 3 = 4$. Correct.

**Example 3.** Solve

$$2x + 3y = 12 \qquad x - y = 1$$

The second equation rearranges quickly: $x = y + 1$. Substitute into the first:

$$2(y + 1) + 3y = 12$$

$$2y + 2 + 3y = 12 \quad\Rightarrow\quad 5y = 10 \quad\Rightarrow\quad y = 2$$

Then $x = 2 + 1 = 3$. Check: $2(3) + 3(2) = 6 + 6 = 12$. Correct.

When elimination needs the equations scaled first, multiply one equation by a
number so that the coefficients of one unknown match. Then subtract.

> **Watch out.** A solution is a **pair** of values. Finding $n = 40$ and stopping
> leaves the answer incomplete, because the question asks for the point where the
> two lines meet. Always find both values, and check the pair in the equation you
> did not use.

## What the solution means

On a graph, each linear equation is a line. The solution of the system is the
point where the two lines cross, because that point lies on both lines at once.

- one solution means the lines cross at a single point;
- no solution means the lines are parallel;
- infinitely many solutions means the two equations describe the same line.

## Progress check

Back to the chapter problem. Write the cost and the income as the system

$$C = 240 + 4n \qquad R = 10n$$

Solve it for the break-even point, giving both values. Then compare your answer
with the estimate you read from the graph in Section 4.2, and say why the exact
method is worth having.

## You should now be able to

- solve a system of two linear equations by substitution;
- solve a system by elimination, scaling an equation when needed;
- find both values of the solution and check them;
- explain the solution as the intersection of two lines.
