---
title: 2.5 Simultaneous equations by elimination and substitution — Learn
chapter: 2
chapter_title: Algebra and functions
section: '2.5'
section_title: Simultaneous equations by elimination and substitution
dfe:
- B4
kind: walkthrough
---

# 2.5 Simultaneous equations by elimination and substitution — Learn

**Prerequisites:** solving a linear equation; expanding and factorising from 2.3;
solving quadratics from 2.4; plotting a straight line and a curve.

**By the end of this section you can:** solve two linear equations by
elimination; solve one linear and one quadratic equation by substitution; and
interpret the solution as the point or points where the graphs meet.

## 1. Two equations at once

Two equations are **simultaneous** when they must be true at the same time. A
solution is a pair of values $(x, y)$ that satisfies both equations. On a graph,
each equation is a curve or a line, and each solution is a point where the two
meet.

$$
\text{two straight lines} \quad \Rightarrow \quad 0, 1 \text{ or infinitely many meetings.}
$$

$$
\text{a line and a curve} \quad \Rightarrow \quad 0, 1 \text{ or } 2 \text{ meetings.}
$$

A line and a parabola can meet twice, touch once, or miss each other. This is the
same discriminant idea as 2.3, seen on a graph.

## 2. Elimination

Use **elimination** when both equations are linear. Scale one or both equations
so that one variable has the same coefficient in each, then add or subtract to
remove it.

**Example 1.** Solve $3x + 2y = 16$ and $2x - y = 6$.

The second equation has a single $y$, so multiply it by $2$ to match the $2y$ in
the first:

$$
4x - 2y = 12.
$$

Now the $y$ terms have the same size and opposite signs. Add the equations to
remove $y$:

$$
(3x + 2y) + (4x - 2y) = 16 + 12,
$$

$$
7x = 28.
$$

So $x = 4$. Substitute into $2x - y = 6$:

$$
8 - y = 6, \qquad y = 2.
$$

The solution is $(4, 2)$. Check it in the other equation: $3 \times 4 + 2 \times 2 = 16$.

## 3. Substitution

Use **substitution** when one equation is linear and the other is quadratic.
Rearrange the linear equation to make one variable the subject, substitute it into
the quadratic, and solve the resulting quadratic.

**Example 2.** Solve $y = x + 1$ and $x^2 + y^2 = 25$.

The first equation already gives $y$ in terms of $x$. Substitute $x + 1$ for $y$:

$$
x^2 + (x + 1)^2 = 25.
$$

Expand the bracket:

$$
x^2 + x^2 + 2x + 1 = 25.
$$

Collect terms and move $25$ to the left:

$$
2x^2 + 2x - 24 = 0.
$$

Divide by $2$, then factorise:

$$
x^2 + x - 12 = 0, \qquad (x + 4)(x - 3) = 0.
$$

So $x = 3$ or $x = -4$. Find $y$ from $y = x + 1$ each time:

$$
x = 3 \Rightarrow y = 4, \qquad x = -4 \Rightarrow y = -3.
$$

The two solutions are $(3, 4)$ and $(-4, -3)$: the points where the line meets
the circle.

## 4. A line and a parabola

**Example 3.** Solve $y = x^2$ and $y = 2x + 3$.

Both expressions equal $y$, so set them equal to each other:

$$
x^2 = 2x + 3.
$$

Rearrange to a quadratic in standard form:

$$
x^2 - 2x - 3 = 0.
$$

Factorise:

$$
(x - 3)(x + 1) = 0,
$$

so $x = 3$ or $x = -1$. Use $y = x^2$ to find each $y$:

$$
x = 3 \Rightarrow y = 9, \qquad x = -1 \Rightarrow y = 1.
$$

The solutions are $(3, 9)$ and $(-1, 1)$.

## 5. A symmetric pair

**Example 4.** Solve $x + y = 5$ and $xy = 6$.

Rearrange the linear equation to make $y$ the subject:

$$
y = 5 - x.
$$

Substitute into the second equation:

$$
x(5 - x) = 6.
$$

Expand and rearrange:

$$
5x - x^2 = 6, \qquad x^2 - 5x + 6 = 0, \qquad (x - 2)(x - 3) = 0.
$$

So $x = 2$ or $x = 3$. From $y = 5 - x$, the pairs are $(2, 3)$ and $(3, 2)$.
The two answers are the same pair written in the two orders, because both
equations treat $x$ and $y$ in the same way.

> **Watch out.** Three slips cost marks here.
>
> **A sign error when subtracting.** Multiplying an equation by a negative number
> changes every term. Write the scaled equation on its own line and check it
> before you add or subtract.
>
> **Stopping at $x$.** A solution to two equations is a pair, so a value of $x$
> is not an answer on its own. Find the value of $y$ for each $x$.
>
> **Dividing by a variable.** Dividing by $x$ can remove the solution $x = 0$.
> Factorise instead. **Re-check:** substitute both coordinates into *both* of the
> original equations, not into the rearranged one.

## Progress check

A straight service pipe runs through the tunnel along the line $y = \frac{x}{2} + 1$. The arch is $y = 4 - \frac{x^2}{4}$.

1. Write the two equations as a system and substitute the first into the second.
2. Solve the resulting quadratic.
3. The tunnel exists only for $-4 \le x \le 4$. Decide which solution lies inside
   the tunnel, and explain what happens to the other one.
4. Solve $x + y = 3$ and $xy = 2$ to check the method from Example 4.

## You should now be able to

- decide whether elimination or substitution fits a pair of equations;
- eliminate a variable by scaling and adding or subtracting;
- substitute a linear expression into a quadratic equation;
- solve the resulting quadratic and find both coordinates;
- interpret two solutions as two points where the graphs meet.
