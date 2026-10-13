---
title: 3.2 Prime numbers and prime factorisation — Learn
chapter: 3
chapter_title: Factors, multiples and primes
section: '3.2'
section_title: Prime numbers and prime factorisation
tier: O
refs: [N.1]
kind: walkthrough
---

# 3.2 Prime numbers and prime factorisation — Learn

**Prerequisites:** listing the factors of a number, and the divisibility rules from
Section 3.1.

**Objectives:** say whether a number is prime; write a number as a product of its
prime factors in index form; use a factorisation to count the factors of a number.

By the end of this section, you can break any whole number into prime factors and
write the result in index form.

## Prime and composite numbers

A **prime number** has exactly two factors: 1 and itself.

$$2, 3, 5, 7, 11, 13, 17, 19, 23, \ldots$$

A number with more than two factors is called **composite**. So 12 is composite,
because it has six factors.

Two facts catch people out, and both are worth saying plainly:

- **1 is not prime.** It has only one factor, itself. A prime needs two distinct
  factors, and 1 does not have them.
- **2 is the only even prime.** Every other even number divides by 2 as well as by
  itself, so it has at least three factors.

**Example 1.** Which of 21, 23, 25 and 29 are prime?

- $21=3\times7$, so composite.
- $25=5\times5$, so composite.
- 23 and 29 have no factor other than 1 and themselves, so they are prime.

To test a number, try dividing it by each prime up to its square root. Once the
square of the prime you are trying is bigger than the number, there is nothing left
to check. For 29, the square root is about 5.4, so you only need to try 2, 3 and 5.

## Writing a number as a product of primes

Every whole number greater than 1 is either prime, or can be written as a product of
primes. That product is unique — there is only one correct answer, up to the order of
the factors.

**Example 2.** Write 360 as a product of its prime factors.

Divide by the smallest prime that goes in, and keep going.

$$
360 \div 2 = 180 \qquad 180 \div 2 = 90 \qquad 90 \div 2 = 45
$$

Three 2s so far, and 45 is odd, so 2 will not divide again. Move to the next prime, 3.

$$
45 \div 3 = 15 \qquad 15 \div 3 = 5
$$

Two 3s, and 5 is prime, so you stop.

$$360 = 2\times2\times2\times3\times3\times5 = 2^3\times3^2\times5$$

**Index form** means writing repeated factors as powers. $2\times2\times2$ is $2^3$.
Always give the answer in index form unless the question says otherwise.

**Example 3.** Write 700 as a product of its prime factors.

$$
700 \div 2 = 350 \qquad 350 \div 2 = 175
$$

175 is odd, so move on. It ends in 5, so divide by 5.

$$
175 \div 5 = 35 \qquad 35 \div 5 = 7
$$

$$700 = 2^2\times5^2\times7$$

> **Watch out.** A factorisation with a composite number left in it is not finished.
> $360 = 8\times45$ is true, but 8 and 45 are not prime. Keep dividing until every
> factor is prime. Check your answer by multiplying back out — if it does not give the
> number you started with, something was missed.

## Counting the factors from the factorisation

Once you have the prime factorisation, you can count the factors without listing them.

If a number is $2^3\times3^2\times5$, then a factor of it uses some number of copies of
each prime. It can use 0, 1, 2 or 3 copies of 2; 0, 1 or 2 copies of 3; and 0 or 1
copy of 5. Each different choice gives a different factor, so the number of factors is

$$(3+1)\times(2+1)\times(1+1) = 4\times3\times2 = 24$$

**Example 4.** How many factors does $84 = 2^2\times3\times7$ have?

$$(2+1)\times(1+1)\times(1+1) = 3\times2\times2 = 12$$

So 84 has 12 factors. You can check a few of them: $1, 2, 3, 4, 6, 7, 12, 14, 21, 28,
42$ and $84$ — and that is all twelve.

## Progress check

Back to the chapter problem. The two lighthouses flash every 12 seconds and every 18
seconds. Write each of those numbers as a product of primes.

$$12 = 2^2\times3 \qquad 18 = 2\times3^2$$

Keep those two factorisations. In Section 3.3 you will compare them — and the
comparison is what answers the question.

## You should now be able to

- say whether a number is prime, and explain why 1 is not;
- write any whole number as a product of prime factors in index form;
- check a factorisation by multiplying it back out;
- count the factors of a number from its prime factorisation.
