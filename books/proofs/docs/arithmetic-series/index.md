---
title: The sum of an arithmetic series
---

# The sum of an arithmetic series

Add the terms of an arithmetic sequence — a sequence that goes up by the same
amount each time — and you get

$$S_n = \tfrac{1}{2}n(a + l) = \tfrac{1}{2}n\left[2a + (n-1)d\right]$$

where $a$ is the first term, $l$ the last, $d$ the common difference and $n$ the
number of terms.

## The proof, and the six-year-old who found it

There is a story — probably not true, and told anyway — that a teacher set a class
the job of adding the numbers from $1$ to $100$ to keep them quiet. A pupil wrote
the answer down almost at once. Here is what he did, generalised.

**Write the sum down twice, the second time backwards.**

$$S = a + (a + d) + (a + 2d) + \dots + l$$

$$S = l + (l - d) + (l - 2d) + \dots + a$$

**Add the two lines, term by term.**

The first terms give $a + l$. The second terms give $(a + d) + (l - d) = a + l$. The
third terms give $(a + 2d) + (l - 2d) = a + l$ as well.

Every pair adds to the same thing, $a + l$, because the $d$ that one term gained the
other term has lost. There are $n$ pairs, so adding the two lines gives

$$2S = n(a + l)$$

and therefore

$$S = \tfrac{1}{2}n(a + l)$$

**Turning the last term into the common difference.** If you are not told $l$ but
are told $d$ instead, use $l = a + (n-1)d$, which is the rule for the $n$th term:

$$S = \tfrac{1}{2}n\left[a + a + (n-1)d\right] = \tfrac{1}{2}n\left[2a + (n-1)d\right]$$

which is the second form.

## Check it on the story

For $1 + 2 + \dots + 100$: $a = 1$, $l = 100$, $n = 100$, so
$S = \tfrac{1}{2} \times 100 \times 101 = 5050$.

## Check your understanding

1. Find the sum of the first $20$ terms of $3, 7, 11, \dots$.
2. Why must the two written-out sums be the same length?
3. A series has $a = 5$, $d = 4$ and $n = 30$. Which form of the rule would you use,
   and why?

<details markdown="1">
<summary>Answers</summary>

1. $a = 3$, $d = 4$, $n = 20$, so $S = \tfrac{1}{2}(20)[6 + 19 \times 4] = 10 \times 82 = 820$.
2. It is the same sum both times. Writing it backwards reorders the terms, and
   reordering does not change how many there are.
3. The second form, because $l$ is not given. Computing $l = 5 + 29 \times 4 = 121$
   first would also work.
</details>
