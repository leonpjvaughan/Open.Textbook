---
title: 12.6 The sine and cosine rules — Learn
chapter: 12
chapter_title: Trigonometry
section: '12.6'
section_title: The sine and cosine rules
tier: O
refs:
- '2.3'
kind: walkthrough
---

# 12.6 The sine and cosine rules — Learn

**Prerequisites:** Sections 12.1 to 12.4 — the ratios, Pythagoras' theorem and angles of
any size.

**Objectives:** use the sine rule to find a side or an angle; use the cosine rule to find
a side or an angle; choose the right rule; recognise the two-answer case.

By the end of this section you can solve any triangle, whether or not it has a right
angle.

## Labelling a triangle

Write the angles as capitals $A$, $B$ and $C$. Write the side opposite each angle as the
matching small letter $a$, $b$ or $c$.

So side $a$ is opposite angle $A$, side $b$ is opposite angle $B$, and side $c$ is
opposite angle $C$. A side and its matching angle form a **pair**. Getting the pairing
right is most of the work.

## The sine rule

> **The sine rule.** In any triangle,
> $$\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C}$$
> The Formulae and Tables booklet gives this formula.

**Why it is true.** Drop a perpendicular from $C$ to the side $AB$, and call its length
$h$. In the right triangle on the $A$ side, $\sin A = \dfrac{h}{b}$, so $h = b\sin A$. In
the right triangle on the $B$ side, $\sin B = \dfrac{h}{a}$, so $h = a\sin B$. The height
is the same both ways:

$$b\sin A = a\sin B \quad\Rightarrow\quad \frac{a}{\sin A} = \frac{b}{\sin B}$$

The same argument from another vertex gives the third fraction.

Use the sine rule when you know **a side and its opposite angle**, together with one more
side or angle.

**Example 1.** In a triangle, $A = 40^\circ$, $B = 60^\circ$ and $a = 10$ cm. Find $b$.

$$\frac{b}{\sin 60^\circ} = \frac{10}{\sin 40^\circ}$$

$$b = \frac{10\sin 60^\circ}{\sin 40^\circ} = \frac{8.660}{0.6428} = 13.47 \text{ cm}$$

**Example 2.** In a triangle, $a = 8$ cm, $b = 11$ cm and $A = 35^\circ$. Find $B$.

$$\frac{\sin B}{11} = \frac{\sin 35^\circ}{8} \qquad \sin B = \frac{11 \times 0.5736}{8} = 0.7887$$

$$B = \sin^{-1}(0.7887) = 52.1^\circ \quad\text{or}\quad 180^\circ - 52.1^\circ = 127.9^\circ$$

Both are possible. This is the **two-answer case**, and it happens when you use the sine
rule to find an angle. Both angles have the same sine, and both fit inside a triangle if
the third angle stays positive.

## The cosine rule

> **The cosine rule.** In any triangle,
> $$a^2 = b^2 + c^2 - 2bc\cos A$$
> The Formulae and Tables booklet gives this formula.

**Why it is true.** Drop the perpendicular from $C$ to $AB$ again, and let the foot be
$D$. Let $AD = x$. In the right triangle $ACD$, $x = b\cos A$ and $CD^2 = b^2 - x^2$. The
other part of the base is $DB = c - x$. Pythagoras in triangle $BCD$ gives

$$a^2 = CD^2 + DB^2 = b^2 - x^2 + (c - x)^2 = b^2 + c^2 - 2cx$$

Putting $x = b\cos A$ gives $a^2 = b^2 + c^2 - 2bc\cos A$.

When $A = 90^\circ$ the last term disappears, because $\cos 90^\circ = 0$, and the cosine
rule becomes Pythagoras' theorem. So the cosine rule is Pythagoras with a correction for
an angle that is not a right angle.

Use the cosine rule when you know **two sides and the angle between them**, or **all
three sides**.

**Example 3.** In a triangle, $b = 8$ cm, $c = 11$ cm and $A = 35^\circ$. Find $a$.

$$a^2 = 64 + 121 - 2(8)(11)\cos 35^\circ = 185 - 176 \times 0.8192 = 40.83$$

$$a = \sqrt{40.83} = 6.39 \text{ cm}$$

**Example 4.** A triangle has sides $5$ cm, $7$ cm and $9$ cm. Find the largest angle.

The largest angle is opposite the largest side, so find $C$, opposite $c = 9$.

$$9^2 = 5^2 + 7^2 - 2(5)(7)\cos C$$

$$81 = 74 - 70\cos C \qquad 70\cos C = -7 \qquad \cos C = -0.1$$

$$C = \cos^{-1}(-0.1) = 95.7^\circ$$

The answer is obtuse, which fits: the largest side is more than enough to make the
triangle wide open at $C$.

> **Watch out.** The cosine rule is safer than the sine rule when you are finding an
> angle, because $\cos^{-1}$ gives exactly one answer between $0^\circ$ and $180^\circ$.
> The sine rule can give two.
>
> **Re-check:** after finding any angle, add the three angles. They must total
> $180^\circ$. If they do not, you have taken the wrong branch of the two-answer case.

## Choosing the rule

| You know | Use |
|---|---|
| a side and its opposite angle, plus one more | sine rule |
| two sides and the angle between them | cosine rule |
| all three sides | cosine rule |

## Progress check

Back to the chapter problem. The triangle $CLY$ has $CL = 8$ km, and the angles at $C$ and
$L$ are $42^\circ$ and $60^\circ$.

The third angle is $180^\circ - 42^\circ - 60^\circ = 78^\circ$, at the yacht.

Use the sine rule to find $CY$, the distance from the Coast Guard station to the yacht,
and $LY$, the distance from the lighthouse to the yacht. Give each to three significant
figures.

$$\frac{CY}{\sin 60^\circ} = \frac{8}{\sin 78^\circ}$$

Then check one of the two answers with the cosine rule, using the side you found. The two
rules must agree, and if they do not, the error is in the pairing.

## You should now be able to

- label a triangle and pair each side with its opposite angle;
- state the sine rule and use it for a side or an angle;
- state the cosine rule and use it for a side or an angle;
- choose the rule from the information given;
- find both possible angles in the two-answer case, and check them.
