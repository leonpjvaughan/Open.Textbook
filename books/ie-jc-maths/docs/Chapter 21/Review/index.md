---
title: 'Chapter 21: Review'
chapter: 21
kind: review
---

# Chapter 21: Review

## The chapter problem, solved

**The open-day game.** A player rolls a fair die and spins a spinner with four
equal sectors, A, B, C and D. A prize needs a 6 or an A. The star prize needs a 6
and an A.

**Step 1. The sample space.** Each of the 6 die results pairs with each of the 4
spinner sectors.

$$6\times4=24$$

There are 24 equally likely outcomes.

**Step 2. The star prize.** Exactly one outcome is a 6 with an A.

$$P(\text{star prize})=\frac{1}{24}\approx0.042$$

**Step 3. The two events on their own.**

$$P(6)=\frac{4}{24}=\frac16 \qquad P(A)=\frac{6}{24}=\frac14$$

**Step 4. A prize, using the addition rule.** The star prize outcome is in both
events, so it is subtracted once.

$$P(6\text{ or }A)=\frac{4}{24}+\frac{6}{24}-\frac{1}{24}=\frac{9}{24}=\frac38$$

Nine of the 24 outcomes give a prize.

**Step 5. No prize, using the complement.**

$$P(\text{no prize})=1-\frac38=\frac58$$

Because $\frac58$ is more than one half, a player is **more likely to win nothing
than to win a prize**. That answers the guess you wrote down at the start of the
chapter.

**Step 6. The multiplication rule as a check.** The die and the spinner are
independent, so the star prize is also

$$\frac16\times\frac14=\frac{1}{24}$$

The count and the multiplication rule agree.

<!-- tier:h -->
**Step 7. Expected frequency.** If the game is played 240 times, the organiser
expects

$$240\times\frac38=90 \qquad 240\times\frac{1}{24}=10$$

about 90 prizes, of which about 10 are star prizes.
<!-- /tier:h -->

Every section met this one game: the sample space, the scale, the count, the
complement, the addition rule, the multiplication rule, the table and the expected
number of prizes.

## Mixed practice — choose the method first

Work through these without notes. For each one, decide **which idea applies** and
say why in a few words. The idea might be the counting principle, equally likely
outcomes, a complement, the addition rule, the multiplication rule, a table, a
tree diagram, or an expected frequency.

1. A cafe offers 3 starters and 5 main courses. How many two-course meals are
   possible?
2. Two fair dice are rolled. How many outcomes are in the sample space?
3. Write $0.45$ as a fraction in its simplest form.
4. A die is rolled 60 times and shows a 6 on 11 of the rolls. Work out the
   relative frequency of a 6.
5. A fair die is rolled. Find the probability of an even number.
6. A bag holds 3 red and 7 blue counters. One counter is taken at random. Find the
   probability that it is red.
7. The probability that it rains is $0.25$. Find the probability that it does not
   rain.
8. A fair die is rolled. Find the probability that the result is not a 3.
9. A fair die is rolled. Find the probability of an even number or a 5.
10. A fair die is rolled. Find the probability of a 3 or a 5.
11. A fair coin is tossed twice. Find the probability of two heads.
12. A fair die is rolled twice. Find the probability of a 4 on both rolls.
13. A two-way table shows 40 students, and 12 of them are boys who walk to school.
    A student is chosen at random. Find the probability that the student is a boy
    who walks.
14. A fair coin is tossed twice. Use a tree diagram to find the probability of a
    head then a tail.
15. Work out 15% of 240.
16. Solve $3x+5=20$.
<!-- tier:h -->
17. A fair die is rolled 150 times. Work out the expected number of 6s.
18. A spinner lands on red with probability $\frac25$. It is spun 250 times. Work
    out the expected number of reds.
<!-- /tier:h -->

<details markdown="1">
<summary>Answers and concise solutions</summary>

1. $15$. Multiply the choices: $3\times5=15$.
2. $36$. Each die has 6 results, so $6\times6=36$.
3. $\frac{9}{20}$. The decimal $0.45$ is $\frac{45}{100}$, and dividing both
   numbers by 5 gives $\frac{9}{20}$.
4. $\frac{11}{60}$. Divide the number of sixes by the number of rolls. As a
   decimal this is about $0.183$.
5. $\frac12$. The even results are 2, 4 and 6, so $P=\frac36=\frac12$.
6. $\frac{3}{10}$. There are 10 counters and 3 are red.
7. $0.75$. The complement is $1-0.25=0.75$.
8. $\frac56$. The complement is $1-\frac16=\frac56$.
9. $\frac23$. The even results are 2, 4 and 6, and the result 5 does not overlap.
   So $\frac36+\frac16=\frac46=\frac23$.
10. $\frac13$. The results 3 and 5 are mutually exclusive, so
    $\frac16+\frac16=\frac13$.
11. $\frac14$. The tosses are independent, so $\frac12\times\frac12=\frac14$.
12. $\frac{1}{36}$. The rolls are independent, so $\frac16\times\frac16=\frac{1}{36}$.
13. $\frac{3}{10}$. Divide the cell by the grand total: $\frac{12}{40}=\frac{3}{10}$.
14. $\frac14$. Multiply along the branch: $\frac12\times\frac12=\frac14$.
15. $36$. Ten per cent of 240 is 24, and 5% is 12. Add them: $24+12=36$.
16. $x=5$. Subtract 5 from both sides to get $3x=15$, then divide by 3.
<!-- tier:h -->
17. $25$. The expected number is $150\times\frac16=25$.
18. $100$. The expected number is $250\times\frac25=100$.
<!-- /tier:h -->

</details>

## What you can now do

- list the outcomes of an experiment in a systematic way, and use the counting
  principle to count them;
- place a probability on the scale from 0 to 1 and write it as a fraction, a
  decimal or a percentage;
- find the probability of an event from equally likely outcomes;
- use the complement, $P(\text{not }A)=1-P(A)$, including for at least one;
- use the addition rule and say when two events are mutually exclusive;
- use the multiplication rule and say when two events are independent;
- read a probability from a two-way table or a tree diagram;
- work out an expected frequency and compare it with an observed frequency
  (Higher only).

## Thinking back

At the start of the chapter you guessed whether a player in the open-day game is
more likely to win a prize or to win nothing. Look back at your guess now.

The probability of a prize is $\frac38$, so the probability of no prize is
$\frac58$. A player is more likely to win nothing. If you guessed that, you read
the game well. The reason is that the prize needs a 6 or an A, and most of the 24
outcomes give neither.

You also wrote down a time when you or someone you know used a chance to make a
decision. Take that example now. Say whether the chance was written as a number or
described in words. Then say what a more accurate number would have changed about
the decision, if anything.

That is the whole of this chapter in one small piece of work: a chance, a number
for it, and a decision that follows from the number.
