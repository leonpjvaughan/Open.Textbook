---
title: 25.5 Comparing distributions and outliers — Learn
chapter: 25
chapter_title: 'Statistics: spread, grouped data and correlation'
section: '25.5'
section_title: Comparing distributions and outliers
tier: H
dfe: [S4]
kind: walkthrough
---

# 25.5 Comparing distributions and outliers — Learn

**Prerequisites:** find medians, ranges and IQRs, and read box plots.

**Objectives:** compare distributions using suitable measures and discuss possible outliers. This section covers S4.

Compare the **average** to describe a typical value. The median resists the effect of an unusually high or low value. Compare the **spread** using range or IQR. The range uses the extremes; the IQR describes the middle half.

**Example 1.** Group A has median 18 and IQR 6. Group B has median 21 and IQR 10.

Group B has the higher typical value because $21>18$.

Group B has greater spread in its middle half because $10>6$.

Use the context in a comparison: “Group B's typical time is higher, and its middle half varies more.”

An **outlier** is a value far from most others. A common rule flags values below $Q_1-1.5\times\mathrm{IQR}$ or above $Q_3+1.5\times\mathrm{IQR}$. This is a rule for spotting possible outliers, not proof that a measurement is wrong.

**Example 2.** For the travel times, $Q_1=17.5$, $Q_3=26.5$, so IQR $=9$.

Lower fence $=17.5-1.5\times9=4$.

Upper fence $=26.5+1.5\times9=40$.

The value 42 is above 40, so it is a possible outlier. Check the original record before deciding what it means.

> **Watch out.** A larger range can come from one unusual value. Compare the IQR as well, and explain what each measure says about the data.

## Progress check

The possible outlier 42 minutes may affect the range more than the IQR. Explain why the IQR uses only the middle half.

## You should now be able to

- compare typical values and spread using suitable measures;
- interpret differences in the context of the data;
- identify a possible outlier using the IQR rule;
- explain why an unusual value needs checking.
