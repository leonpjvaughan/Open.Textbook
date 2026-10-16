---
title: 'Chapter 8: Review'
chapter: 8
kind: review
---

# Chapter 8: Review

## The chapter problem, solved

**The club fair.** A year group of 32 students signs up for Chess (C), Drama (D)
and Science (S). The sheet gives $n(C)=15$, $n(D)=13$, $n(S)=12$, $n(C\cap D)=6$,
$n(C\cap S)=5$, $n(D\cap S)=4$ and $n(C\cap D\cap S)=2$. Find how many students
joined each club on its own, how many joined at least one club, and how many joined
none.

**Step 1. Start with the students in all three clubs.** That number is 2, and it
sits in the middle of the Venn diagram.

**Step 2. Find each pair that shares two clubs only.** Take the pair totals and
remove the 2 who are in all three.

$$n(C\cap D\text{ only}) = 6-2 = 4$$

$$n(C\cap S\text{ only}) = 5-2 = 3$$

$$n(D\cap S\text{ only}) = 4-2 = 2$$

**Step 3. Find each club on its own.** Take the club total and remove the students
who are also in another club.

$$n(C\text{ only}) = 15-(4+3+2) = 15-9 = 6$$

$$n(D\text{ only}) = 13-(4+2+2) = 13-8 = 5$$

$$n(S\text{ only}) = 12-(3+2+2) = 12-7 = 5$$

**Step 4. Count the students who joined at least one club.** Add the seven regions
of the diagram.

$$n(C\cup D\cup S) = 2+4+3+2+6+5+5 = 27$$

The inclusion–exclusion formula gives the same total, which is the check:

$$n(C\cup D\cup S) = 15+13+12-6-5-4+2 = 40-15+2 = 27$$

**Step 5. Count the students who joined none.** They are the rest of the year
group.

$$32-27 = 5$$

**Five students joined no club at all.**

The answer to the prediction is now clear. Most students joined at least one club,
but the year group was not fully covered. Every figure came from one idea: a
student counted twice must be removed once, and a student counted three times must
be put back once.

## Mixed practice — choose the method first

Work through these without notes. For each one, decide **which idea applies** and
say why in a few words. The idea might be set notation, a subset, an intersection,
a union, a set difference, a Venn region, or a rule from an earlier chapter.

1. Write the set of even numbers from 2 to 12 in roster form, and state its
   cardinality.
2. Is $\{2, 4\}$ a subset of $\{2, 4, 6, 8\}$? Give a reason.
3. Find $\{1, 2, 3, 4\} \cap \{3, 4, 5, 6\}$.
4. Find $\{1, 2, 3, 4\} \cup \{3, 4, 5, 6\}$.
5. Find $\{1, 2, 3, 4\} \setminus \{3, 4, 5, 6\}$.
6. A set has 5 elements. How many subsets does it have?
7. In the club fair, how many students joined Chess but not Drama?
8. In the club fair, how many students joined Drama or Science, or both?
9. Write 84 as a product of its prime factors. Then find the highest common factor
   of 84 and 60.
10. Work out $\frac{3}{4}+\frac{1}{6}$, and give the answer in its simplest form.

## What you can now do

- write a set in roster form and count its elements with $n(A)$ or $|A|$;
- use $\in$ and $\notin$, and tell an element from a set;
- say whether one set is a subset of another;
- find the intersection, the union and the difference of two sets;
- use the universal set and the complement of a set;
- read and draw a Venn diagram for two or three sets, and fill its regions from a
  description;
- work out an expression such as $(A\cap B)\cup C$ in the correct order;
- use the commutative and associative properties of union and intersection.

## Thinking back

At the start of the chapter you predicted whether every student joined at least one
club, and how many joined none.

The answer was 27 students in at least one club and 5 in none. The sign-up sheet
looked as though it might cover everyone, because the three club totals add to 40.
The 40 double-counts the students in two clubs and triple-counts the 2 in all
three, and the inclusion–exclusion steps put that right.

Now return to the example you wrote at the start, where something in your own week
belongs to two groups. Name the two sets and write down one member of each of the
four regions: in the first only, in the second only, in both, and in neither. That
is the whole of this chapter in one small piece of work.
