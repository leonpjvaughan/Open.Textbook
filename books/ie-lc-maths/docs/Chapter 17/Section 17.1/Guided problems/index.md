---
title: 17.1 Chords and the centre — Practise with help
chapter: 17
chapter_title: 'Synthetic geometry: circles'
section: '17.1'
section_title: Chords and the centre
tier: O
refs:
- '2.1'
kind: guided-problems
---

# 17.1 Chords and the centre — Practise with help

## Warm-up: remember

1. Work out $\sqrt{25^2 - 7^2}$.
2. A right-angled triangle has a hypotenuse of $17$ cm and one side of $8$ cm. Find the
   third side.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $25^2 - 7^2 = 625 - 49 = 576$, and $\sqrt{576} = 24$.
2. $17^2 - 8^2 = 289 - 64 = 225$, and $\sqrt{225} = 15$ cm. Pythagoras' theorem gives the
   third side, because the triangle has a right angle.

Both answers use Pythagoras' theorem from Section 16.5. Every question in this section
uses it, because the perpendicular from the centre to a chord makes a right-angled
triangle.

</details>

:::figure warm-up-gate


## Practise with help

**1.** A chord of a circle is $16$ cm long. The radius is $10$ cm. Find the distance from
the centre to the chord.

<details markdown="1">
<summary>Hint</summary>

Use half the chord as one side of a right-angled triangle.

<details markdown="1">
<summary>Next step</summary>

The half-chord is $8$ cm. With $d$ the distance from the centre, Pythagoras gives
$d^2 + 8^2 = 10^2$.

<details markdown="1">
<summary>Full working</summary>

$$d^2 + 8^2 = 10^2$$

$$d^2 + 64 = 100$$

$$d^2 = 36$$

$$d = 6 \text{ cm}.$$

The distance is $6$ cm.

</details>
</details>
</details>

**2.** A chord lies $5$ cm from the centre of a circle of radius $13$ cm. Find the length
of the chord.

<details markdown="1">
<summary>Hint</summary>

Find the half-chord first, then double it.

<details markdown="1">
<summary>Next step</summary>

With $c$ the length of the chord, Pythagoras gives
$\left(\tfrac12 c\right)^2 + 5^2 = 13^2$.

<details markdown="1">
<summary>Full working</summary>

$$\left(\tfrac12 c\right)^2 + 25 = 169$$

$$\left(\tfrac12 c\right)^2 = 144$$

$$\tfrac12 c = 12$$

$$c = 24 \text{ cm}.$$

The chord is $24$ cm long.

</details>
</details>
</details>

**3.** A chord of length $30$ cm lies $8$ cm from the centre of a circle. Find the radius.

<details markdown="1">
<summary>Hint</summary>

The half-chord is $15$ cm, and the radius $r$ is the hypotenuse.

<details markdown="1">
<summary>Next step</summary>

$$r^2 = 8^2 + 15^2.$$

<details markdown="1">
<summary>Full working</summary>

$$r^2 = 64 + 225 = 289$$

$$r = 17 \text{ cm}.$$

The radius is $17$ cm.

</details>
</details>
</details>

**4.** Explain how to find the centre of a circle when only two chords are drawn.

<details markdown="1">
<summary>Hint</summary>

The centre lies on the perpendicular bisector of every chord.

<details markdown="1">
<summary>Next step</summary>

Two perpendicular bisectors are enough, because they cross at one point.

<details markdown="1">
<summary>Full working</summary>

Construct the perpendicular bisector of the first chord. Construct the perpendicular
bisector of the second chord. By part 2 of Theorem 21, each bisector passes through the
centre. So the point where the two bisectors cross is the centre.

The two chords must not be parallel. Parallel chords have parallel perpendicular
bisectors, and parallel lines do not cross.

</details>
</details>
</details>

**5.** In a circle of radius $13$ cm, one chord of length $24$ cm lies $5$ cm from the
centre. A second chord lies $12$ cm from the centre. Find the length of the second chord.

<details markdown="1">
<summary>Hint</summary>

Find the half-chord of the second chord from the radius.

<details markdown="1">
<summary>Next step</summary>

$$\left(\tfrac12 c\right)^2 + 12^2 = 13^2.$$

<details markdown="1">
<summary>Full working</summary>

$$\left(\tfrac12 c\right)^2 + 144 = 169$$

$$\left(\tfrac12 c\right)^2 = 25$$

$$\tfrac12 c = 5$$

$$c = 10 \text{ cm}.$$

The second chord is $10$ cm long. It is further from the centre than the first chord, and
it is shorter, which agrees with Example 4 of the section read the other way round.

</details>
</details>
</details>

**6.** Explain why the perpendicular from the centre to a chord bisects the chord.

<details markdown="1">
<summary>Hint</summary>

Both triangles have the radius as hypotenuse and the perpendicular as a common side.

<details markdown="1">
<summary>Next step</summary>

Pythagoras gives $|AC|^2 = r^2 - |OC|^2$ and $|CB|^2 = r^2 - |OC|^2$.

<details markdown="1">
<summary>Full working</summary>

Let the chord be $AB$, let the centre be $O$, and let $C$ be the foot of the
perpendicular from $O$ to $AB$. Both triangles $OCA$ and $OCB$ have a right angle at $C$.

Pythagoras' theorem gives $|AC|^2 = |OA|^2 - |OC|^2$ and
$|CB|^2 = |OB|^2 - |OC|^2$. The two radii are equal, so the two right-hand sides are
equal. So $|AC|^2 = |CB|^2$, and both are lengths, so $|AC| = |CB|$.

So $C$ is the midpoint of $AB$, and the perpendicular bisects the chord.

</details>
</details>
</details>

## A question from Section 15.6

**7.** A point $P$ is the same distance from $A$ as it is from $B$. Where must $P$ lie?
Explain how this fact helps you find the centre of a circle.

<details markdown="1">
<summary>Hint</summary>

Recall Property 2 of the perpendicular bisector.

<details markdown="1">
<summary>Next step</summary>

The centre of a circle is the same distance from every point of the circle.

<details markdown="1">
<summary>Full working</summary>

Every point that is the same distance from $A$ as from $B$ lies on the perpendicular
bisector of $[AB]$, by Property 2 of the perpendicular bisector from Section 15.6.

The centre of a circle is a radius away from every point of the circle. So for a chord
$AB$, the centre is the same distance from $A$ as from $B$, and it must lie on the
perpendicular bisector of $AB$.

That is the same statement as part 2 of Theorem 21, reached from the perpendicular
bisector property instead of from Pythagoras.

</details>
</details>
</details>
