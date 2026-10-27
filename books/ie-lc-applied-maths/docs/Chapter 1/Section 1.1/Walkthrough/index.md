---
title: 1.1 The problem-solving cycle — Learn
chapter: 1
chapter_title: What mathematical modelling is
section: '1.1'
section_title: The problem-solving cycle
tier: O
refs:
- S1
kind: walkthrough
---

# 1.1 The problem-solving cycle — Learn

**Prerequisites:** working with rates, such as litres each minute or kilometres
each hour, and dividing a total by a rate.

**Objectives:** name the five stages of the modelling cycle; say what each stage
does; use the cycle once on a simple situation.

By the end of this section you can describe how a model is built, and you can
use the same five stages on any situation in this book.

## What a model is

A **model** is a simplified description of a real situation, written in
mathematics. The word works the same way as in a model aeroplane or a model
village: it keeps the shape of the real thing and leaves out the detail.

A model leaves things out on purpose. A road map leaves out the hills. A network
diagram of the same roads leaves out the distances. Each one answers a different
question, and each one is useful because of what it leaves out.

## The five stages

The cycle has five stages, and then it starts again.

- **Formulate.** Decide the question, in one sentence, with a number and a unit
  in the answer.
- **Translate.** Choose letters for the quantities, and write the relationship
  between them as mathematics.
- **Compute.** Put the numbers in and work out the answer.
- **Evaluate.** Compare the answer with the real situation. Is it sensible? Does
  it match what you measure?
- **Refine.** Change one assumption and go round again.

The stages are in that order, but the cycle is a loop. Most real work goes round
two or three times before the answer is good enough.

**Example 1.** A tank holds 300 litres. A tap puts water in at 12 litres each
minute. A leak takes water out at 2 litres each minute. The tank starts empty.
How long does it take to fill?

*Formulate.* The question is the time to fill the tank, in minutes. The tank is
full when it holds 300 litres.

*Translate.* The tap adds 12 litres each minute. The leak removes 2 litres each
minute, so the net rate is

$$12 - 2 = 10$$

litres each minute. The time is the volume divided by the net rate, so

$$T = \frac{V}{r}$$

where $T$ is the time in minutes, $V$ is the volume in litres and $r$ is the
net rate in litres per minute.

*Compute.*

$$T = \frac{300}{10} = 30$$

The tank takes 30 minutes to fill.

*Evaluate.* Half an hour for a tank of 300 litres sounds reasonable. Check it:
in 30 minutes the tap adds $12 \times 30 = 360$ litres and the leak removes
$2 \times 30 = 60$ litres, which leaves 300 litres. The check passes.

*Refine.* Suppose the leak is larger, at 6 litres each minute. The net rate
becomes 6 litres each minute, and the time becomes $300 \div 6 = 50$ minutes.
The answer changed a great deal, so the size of the leak matters. That is the
kind of finding the cycle is for.

**Example 2.** A canteen till serves 10 students each minute. At 12:30 there are
40 students in the queue, and no new students join. How long until the queue is
gone?

The till serves 10 students each minute, so the time is

$$T = \frac{N}{s}$$

where $N$ is the number of students and $s$ is the service rate in students per
minute. Then

$$T = \frac{40}{10} = 4$$

The queue is gone after 4 minutes. Check it: $10 \times 4 = 40$, so all 40
students are served. The check passes.

**Example 3.** The canteen till serves 10 students each minute, and 5 new
students join the queue each minute. At 12:30 there are 40 students in the
queue. How long until the queue is gone?

The queue shrinks at the net rate

$$s - a = 10 - 5 = 5$$

students each minute, where $a$ is the arrival rate. The time to clear the queue
is

$$T = \frac{Q}{s - a} = \frac{40}{10 - 5} = \frac{40}{5} = 8$$

Here $Q$ is the number of students in the queue at 12:30. The queue is gone
8 minutes after 12:30, at 12:38. It takes longer than in Example 2, because
the till also has to serve the students who keep arriving.

> **Watch out.** A model gives an estimate, not an exact promise. The canteen
> model assumes that every student is served in exactly six seconds, and that
> students arrive exactly five times each minute. Neither is true. The model
> gives an average, and the real queue will be longer or shorter on the day.
> Write the answer as "about 8 minutes", not as "8 minutes exactly".
>
> A second trap is to use the wrong rate. Dividing 40 students by 5 students per
> minute gives 8, which is the time to clear the queue while students keep
> arriving. Dividing 40 students by 10 students per minute gives 4, which is the
> time to serve the 40 students already there. Both numbers are useful, and they
> answer different questions. Read the question again before you choose the
> rate.

## Progress check

Back to the chapter problem. At 12:30 there are 40 students in the queue. Five
students join each minute, and the till serves 10 each minute.

1. Will the queue get longer or shorter? Say why, using the two rates.
2. Will the queue ever be gone? If so, how long after 12:30?
3. Compare your answers with the two predictions you wrote at the start. Which
   prediction was right?

Keep these numbers. Section 1.3 uses them to find which assumption the answer
depends on most.

## You should now be able to

- say what a model is, and why it leaves things out on purpose;
- name the five stages of the cycle — formulate, translate, compute, evaluate,
  refine — and say what each one does;
- use the cycle on a situation with a rate, working out a net rate before you
  divide;
- check an answer by reversing the arithmetic.
