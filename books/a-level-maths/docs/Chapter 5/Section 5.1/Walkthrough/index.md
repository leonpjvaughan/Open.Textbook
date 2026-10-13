---
title: 5.1 The sine and cosine rules and the area of a triangle — Learn
chapter: 5
chapter_title: Trigonometry
section: '5.1'
section_title: The sine and cosine rules and the area of a triangle
refs:
- E1
kind: walkthrough
---

# 5.1 The sine and cosine rules and the area of a triangle — Learn

**Prerequisites:** right-angled trigonometry with sine, cosine and tangent;
Pythagoras' theorem; rearranging a formula; using a calculator in degree mode.

**By the end of this section you can:** use the sine rule to find a side or an
angle; use the cosine rule to find a side or an angle; find the area of any
triangle from two sides and the included angle; decide which rule a question
needs.

## 1. Labelling a triangle

The rules in this section work for every triangle, not only right-angled ones.
Label the sides with lower-case letters and the angles with the matching
capital letters. Side $a$ is opposite angle $A$, side $b$ is opposite angle
$B$, and side $c$ is opposite angle $C$.

The names matter. The sine rule pairs each side with the angle opposite it.

## 2. The sine rule

For any triangle,

$$
\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C}.
$$

Use the sine rule when you know a matching side and angle, and one more piece of
the triangle. There are two shapes of question:

- two angles and any side, to find another side;
- two sides and an angle opposite one of them, to find another angle.

Turn the rule upside down when you are finding an angle:

$$
\frac{\sin A}{a} = \frac{\sin B}{b} = \frac{\sin C}{c}.
$$

**Example 1.** In triangle $ABC$, angle $A = 40^\circ$, angle $B = 65^\circ$ and
side $a = 8$ cm. Find side $b$.

The angle opposite $b$ is $B$, so pair $a$ with $A$ and $b$ with $B$:

$$
\frac{b}{\sin 65^\circ} = \frac{8}{\sin 40^\circ}.
$$

Multiply both sides by $\sin 65^\circ$:

$$
b = \frac{8\sin 65^\circ}{\sin 40^\circ} \approx \frac{8 \times 0.9063}{0.6428} \approx 11.3 \text{ cm}.
$$

The side opposite the larger angle is longer, which agrees with the answer.

**Example 2.** In triangle $ABC$, side $a = 7$ cm, side $b = 9$ cm and angle
$A = 35^\circ$. Find angle $B$.

Use the angle form of the rule:

$$
\frac{\sin B}{9} = \frac{\sin 35^\circ}{7}.
$$

Multiply by $9$:

$$
\sin B = \frac{9\sin 35^\circ}{7} \approx \frac{9 \times 0.5736}{7} \approx 0.7375.
$$

So $B \approx \sin^{-1}(0.7375) \approx 47.5^\circ$.

## 3. The cosine rule

For any triangle,

$$
a^2 = b^2 + c^2 - 2bc\cos A.
$$

Use the cosine rule when you cannot use the sine rule:

- two sides and the angle between them, to find the third side;
- all three sides, to find an angle.

Rearrange the formula to make the angle the subject:

$$
\cos A = \frac{b^2 + c^2 - a^2}{2bc}.
$$

**Example 3.** In triangle $ABC$, side $b = 6$ cm, side $c = 9$ cm and the
included angle $A = 55^\circ$. Find side $a$.

Substitute the three known values:

$$
a^2 = 6^2 + 9^2 - 2 \times 6 \times 9 \times \cos 55^\circ.
$$

Work out each term:

$$
a^2 = 36 + 81 - 108 \times 0.5736 \approx 117 - 61.9 = 55.1.
$$

So $a \approx \sqrt{55.1} \approx 7.4$ cm.

**Example 4.** A triangle has sides $a = 8$ cm, $b = 10$ cm and $c = 12$ cm.
Find angle $A$.

Rearrange the cosine rule with $a$ on its own:

$$
\cos A = \frac{10^2 + 12^2 - 8^2}{2 \times 10 \times 12} = \frac{100 + 144 - 64}{240} = \frac{180}{240} = 0.75.
$$

So $A = \cos^{-1}(0.75) \approx 41.4^\circ$.

## 4. The area of a triangle

The area is half the product of two sides and the sine of the angle between
them:

$$
\text{area} = \tfrac{1}{2}ab\sin C.
$$

The angle must be the one inside the two sides you choose.

**Example 5.** Find the area of the triangle with $a = 7$ cm, $b = 10$ cm and
included angle $C = 50^\circ$.

$$
\text{area} = \tfrac{1}{2} \times 7 \times 10 \times \sin 50^\circ
= 35 \times 0.7660 \approx 26.8 \text{ cm}^2.
$$

## 5. Try it: does the information fit one triangle or two?

**Predict first.** Sometimes two different triangles share the same two sides
and the same non-included angle. In a triangle you know angle $A$, side $a$ and
side $b$. For which values of $a$ do two triangles fit these measurements, and
for which values does none fit? Write your prediction down before you touch the
sliders.

:::figure ch5-ambiguous-case

**Test.** Move the sliders for angle $A$ and side $a$. The circle has radius $a$
and centre $C$, so each place it meets the ray from $A$ is a possible position of
$B$. The panel reports the height and how many triangles fit.

**Explain.** Find a setting where the circle meets the ray twice. What do the two
angles at $B$ add up to, and why can the calculator give only one of them? Write
two sentences.

## Progress check

Return to the chapter problem. The survey gives $SL = 10$ km, with angle
$30^\circ$ at $S$ and angle $105^\circ$ at $L$.

1. Work out the angle at $B$.
2. Use the sine rule to find the side $LB$, opposite the $30^\circ$ angle.
3. Use the sine rule to find the side $SB$, opposite the $105^\circ$ angle.
4. Find the area of triangle $SLB$.

The exact value of $\sin 105^\circ$ is not yet on your list of special angles.
Section 5.8 will prove that $\sin 105^\circ = \dfrac{\sqrt{6} + \sqrt{2}}{4}$.
For now, use your calculator and give each answer to three significant figures.

> **Watch out.** Three mistakes are common with these rules.
>
> **Pairing the wrong side and angle.** In the sine rule every side is paired
> with the angle opposite it. Writing $\dfrac{a}{\sin B}$ uses the wrong angle.
> Draw the triangle and mark which side faces which angle before you substitute.
>
> **Choosing the sine rule when the cosine rule is needed.** If the angle you
> know sits between the two sides you know, use the cosine rule. The sine rule
> cannot start without a matching side and angle.
>
> **The ambiguous case.** When you use the sine rule to find an angle, two angles
> between $0^\circ$ and $180^\circ$ can share the same sine. The calculator gives
> only the acute one. Check whether the obtuse answer $180^\circ - B$ also fits
> the triangle. If the angles would then add to more than $180^\circ$, it does
> not fit. **Re-check:** after finding an angle, add all three angles and confirm
> that they total $180^\circ$.

## You should now be able to

- label a triangle so that each side is opposite its matching angle;
- use the sine rule to find a side or an angle;
- use the cosine rule to find a side or an angle;
- decide between the two rules from the information given;
- find the area of a triangle from two sides and the included angle;
- check an angle answer by adding the three angles to $180^\circ$.
