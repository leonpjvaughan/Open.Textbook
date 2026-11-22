---
title: 'Chapter 1: Review'
chapter: 1
kind: review
---

# Chapter 1: Review

## The chapter problem, solved

**How long is the queue?** At 12:30, forty students are queuing at the school
canteen. Students join the back at a steady rate of five each minute. One till
serves students at a steady rate of ten each minute.

**The two predictions.** The queue shrinks, because the till serves 10 students
each minute and only 5 join. The queue does clear, because the service rate is
larger than the arrival rate. If you predicted that the queue would grow, look
back at the two rates: the till removes students faster than they arrive.

**The wait for one student.** A student who joins at 12:30 waits for the 40
students already in front. The till serves 10 of them each minute.

$$W = \frac{Q}{s} = \frac{40}{10} = 4$$

Here $W$ is the wait in minutes, $Q$ is the number of students in the queue,
$s$ is the service rate and $a$ is the arrival rate.

The wait is about 4 minutes, so the student is served at about 12:34.

**The clear time.** The queue drains at the net rate.

$$s - a = 10 - 5 = 5$$

The clear time is the queue divided by the net rate.

$$T = \frac{Q}{s - a} = \frac{40}{10 - 5} = \frac{40}{5} = 8$$

Here $T$ is the clear time in minutes.

The queue is gone about 8 minutes after 12:30, at about 12:38. The two answers
are different because the questions are different: the student at 12:30 waits
only for the 40 people in front, while the queue itself lasts until the last new
arrival has been served.

**A student who joins later.** The queue drains by 5 each minute. At 12:35 it
holds $40 - 5 \times 5 = 15$ students, so the wait is $15 \div 10 = 1.5$ minutes.
At 12:37 it holds 5 students, so the wait is 0.5 minutes. A student who joins at
12:39 finds the queue already gone.

**If the till serves only five each minute.** The net rate becomes
$5 - 5 = 0$. The till serves exactly as many students as arrive, so the queue
stays at 40 and never clears. This is the boundary case, and it shows how
sharply the answer depends on the gap between the two rates.

**Which assumption the answer depends on most.** The clear time depends on the
gap $s - a$. A small gap divides by a small number, so a small change in either
rate makes a large change in the answer. If the till serves 6 instead of 10, the
clear time becomes $40 \div 1 = 40$ minutes. The assumption that matters most is
therefore the one about the two rates, not the one about the starting queue. A
queue of 80 students only doubles the clear time to 16 minutes.

**The honest answer.** A student who joins at 12:30 waits about 4 minutes, and
the queue is gone at about 12:38. The model assumes steady rates, so the real
queue will be a little longer or shorter. The answer depends most on the service
rate, so if the till runs slower than expected, the clear time grows quickly.

## Mixed practice — choose the method first

Work through these without notes. For each one, decide **which stage of the
cycle you are in, and which method you will use**, before you calculate
anything. Some of them use ideas from earlier in your mathematics course, and
two of them ask you to choose the right rate rather than the right number.

:::problems chapter-01-review

:::answers chapter-01-review

## What you can now do

- describe the modelling cycle — formulate, translate, compute, evaluate,
  refine — and say what each stage does;
- turn a vague question into a precise one, and decompose it into inputs and an
  output;
- state the assumptions a model rests on, and say what each one leaves out;
- test how much an answer depends on an assumption, and name the assumption it
  depends on most;
- write a relationship in symbols, define every letter with its unit, and check
  the units of the result;
- rearrange a relationship to make another letter the subject;
- compute a solution, round it once at the end, and say what the number means;
- compare a model with data, refine one assumption at a time, and report the
  answer honestly as a range when the data is uncertain;
- write a modelling report with its six parts.

## Thinking back

Look again at the queue or delay you chose at the start of the chapter. You
wrote down what arrives or builds up, what is cleared or used, and how fast each
of those happens.

You can now model it. Write the question precisely, with a unit and a moment.
List the assumptions, and choose a letter for each quantity. Write the
relationship, check the units, and put the numbers in. Then compare the answer
with what you actually observe, and say which assumption the answer depends on
most.

If your measurements are rough, say so, and say which number you trust least.
If people arrive in bursts, or the service slows when someone takes longer, the
model leaves that out. That is worth writing down too. Deciding what to leave
out is what makes a model useful, and saying what you left out is part of the
applied mathematics, not an apology for it. It is also exactly what the
modelling project asks you to do.
