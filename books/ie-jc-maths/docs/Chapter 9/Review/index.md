---
title: 'Chapter 9: Review'
chapter: 9
kind: review
---

# Chapter 9: Review

## The chapter problem, solved

**Three students save for the same school trip. Aoife saves 3 euro in week 1 and adds
3 euro each week. Ben saves 1 euro in week 1, then 4, then 9, and so on. Cara saves 1
euro in week 1 and doubles her saving each week. Which plan is largest in week 10, and
which plan reaches 50 euro in a single week first?**

Start by writing a general term for each plan.

| Plan | Pattern | Kind of growth | General term |
|---|---|---|---|
| Aoife | $3, 6, 9, 12, \ldots$ | linear | $3n$ |
| Ben | $1, 4, 9, 16, \ldots$ | quadratic | $n^2$ |
| Cara | $1, 2, 4, 8, \ldots$ | exponential | $2^{n-1}$ |

Aoife's pattern adds 3 each time, so it is linear. Ben's pattern has first differences
$3, 5, 7$ and a constant second difference of 2, so it is quadratic. Cara's pattern
doubles, so its multiplier is 2 and it is exponential.

Now put week 10 into each rule.

$$3(10) = 30 \qquad 10^2 = 100 \qquad 2^{9} = 512$$

**Cara saves the most in week 10, at €512.** Ben saves €100, and Aoife saves €30.

To find which plan reaches €50 in a single week first, find the first week for each.

- Cara: $2^6=64$ in week 7, and $2^5=32$ in week 6. So week 7.
- Ben: $7^2=49$ in week 7, and $8^2=64$ in week 8. So week 8.
- Aoife: $3n=50$ gives $n=16.67$, so the first whole week is week 17, at $51$ euro.

**Cara's plan reaches €50 in a single week first, in week 7.**

One more comparison from the chapter. Cara starts behind Aoife, but her plan doubles.
In week 4, Cara saves $2^3=8$ euro and Aoife saves $3(4)=12$ euro, so Aoife is still
ahead. In week 5, Cara saves $2^4=16$ euro and Aoife saves $3(5)=15$ euro. **Cara first
beats Aoife in week 5.**

Doubling overtakes a fixed step because multiplying by 2 makes the gap bigger every
week, while adding 3 keeps the gap the same. This is why exponential growth catches up
and then races away.

## Mixed practice — choose the method first

Work through these without notes. For each question, decide **which method applies**
and say why in a few words. Recognising the kind of pattern is the skill; the
arithmetic follows from it.

1. Find the general term of $6, 11, 16, 21, \ldots$.
2. Find the general term of $3, 9, 19, 33, \ldots$.
3. Which kind of pattern is $4, 8, 16, 32, \ldots$? Give its general term.
4. At position 4, which is larger, $2^{n-1}$ or $n^2$?
5. A pattern repeats $5, 9, 13, 5, 9, 13, \ldots$. What is the 20th term?
6. A graph passes through $(1, 2)$, $(2, 5)$ and $(3, 8)$. Find the rule.
7. Work out $2^5$.
8. Find the lowest common multiple and the highest common factor of 12 and 18.
9. Work out $15\%$ of 240.
10. A car travels 150 km in 3 hours. Find its average speed.
11. Work out $3+4\times5$.
12. Round 3.476 to two decimal places.

<details markdown="1">
<summary>Answers</summary>

1. The common difference is 5, so the rule is $5n+1$.
2. The first differences are $6, 10, 14$, so the second difference is 4 and the rule
   starts with $2n^2$. Subtracting gives $1, 1, 1, 1$, so the rule is $2n^2+1$.
3. Divide each term by the one before it: the multiplier is 2, so the pattern is
   exponential. Its general term is $4\times2^{n-1}$.
4. $n^2$. At position 4, $4^2=16$ and $2^3=8$.
5. The cycle has 3 terms, and $20=3\times6+2$, so the 20th term is the second term of
   a cycle: $9$.
6. The terms rise by 3 each step, so the rule starts with $3n$. At position 1,
   $3(1)=3$ and you need 1 less, so the rule is $3n-1$.
7. $32$.
8. $12=2^2\times3$ and $18=2\times3^2$, so the lowest common multiple is
   $2^2\times3^2=36$, and the highest common factor is $2\times3=6$.
9. $0.15\times240=36$.
10. $150\div3=50$, so the average speed is 50 km/h.
11. Multiplication first: $4\times5=20$, then $3+20=23$.
12. $3.48$. The third decimal is 6, which is 5 or more, so round the hundredths up.

</details>

## What you can now do

- describe a repeating pattern and find the term at any position;
- record a growing pattern in a table and find the change between terms;
- find the general term of a linear pattern, and use it to find any term;
- find the general term of a quadratic pattern from its second difference;
- tell linear, quadratic and exponential growth apart;
- move between words, a table, a graph and a rule.

## Thinking back

Look at what you wrote at the start of the chapter, where you described something in
your own week that grows in steps — saving money, a plant, a phone battery, or points
in a game.

Now that you can write a rule, work it out. Say where your pattern starts and what
happens each step. Then write the general term, and use it to find the value after ten
steps. If the answer surprises you, that is worth writing down: it usually means the
pattern is growing faster than you expected.
