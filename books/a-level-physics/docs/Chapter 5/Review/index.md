---
title: 'Chapter 5: Review'
chapter: 5
kind: review
---

# Chapter 5: Review

## The chapter problem, solved

A defibrillator stores energy in a capacitor of capacitance $100\,\mu\text{F}$
charged to $2000\,\text{V}$. The paddles and the chest have a resistance of
$50\,\Omega$. The copper leads are $1.2\,\text{m}$ long and $2.0\,\text{mm}$ in
diameter, with a resistivity of $1.7 \times 10^{-8}\,\Omega\,\text{m}$.

**1. The charge stored.**

$$ Q = CV = 100 \times 10^{-6} \times 2000 = 0.200\,\text{C} $$

The capacitor stores $0.200\,\text{C}$.

**2. The energy stored.**

$$
\begin{aligned}
E &= \frac{1}{2}CV^2 \\
  &= \frac{1}{2} \times 100 \times 10^{-6} \times (2000)^2 \\
  &= 200\,\text{J}
\end{aligned}
$$

The capacitor stores $200\,\text{J}$.

**3. The resistance of the leads.** The radius is
$1.0 \times 10^{-3}\,\text{m}$, so the cross-sectional area is

$$ A = \pi r^2 = \pi (1.0 \times 10^{-3})^2 = 3.14 \times 10^{-6}\,\text{m}^2 $$

$$ R_{\text{leads}} = \frac{\rho L}{A} = \frac{1.7 \times 10^{-8} \times 1.2}{3.14 \times 10^{-6}} = 6.5 \times 10^{-3}\,\Omega $$

The leads have a resistance of about $0.0065\,\Omega$.

**4. The total resistance of the discharge path.** The leads and the chest are
in series.

$$ R_{\text{total}} = 50 + 0.0065 = 50.0065\,\Omega $$

To three significant figures this is still $50.0\,\Omega$. The leads add only
about $0.013\%$ to the total, so they make no practical difference.

**5. The initial current.** At the first instant the full pd is across the
resistance.

$$ I_0 = \frac{V_0}{R_{\text{total}}} = \frac{2000}{50.0065} = 40.0\,\text{A} $$

The current starts at about $40\,\text{A}$.

**6. The time constant.**

$$ \tau = R_{\text{total}}C = 50.0065 \times 100 \times 10^{-6} = 5.00 \times 10^{-3}\,\text{s} $$

The time constant is $5.0\,\text{ms}$.

**7. The potential difference after one time constant.**

$$ V = V_0 e^{-t/\tau} = 2000 \times e^{-1} = 7.4 \times 10^{2}\,\text{V} $$

After one time constant the pd has fallen to about $740\,\text{V}$.

**8. The duration of the pulse.** After five time constants the pd has fallen to
about $1\%$ of its starting value, and the discharge is treated as finished.

$$ 5\tau = 5 \times 5.0 = 25\,\text{ms} $$

The pulse lasts about $25\,\text{ms}$.

**9. The terminal pd of the battery.** While the unit charges, it draws
$2.0\,\text{A}$ from a battery of emf $12\,\text{V}$ and internal resistance
$0.15\,\Omega$.

$$ V = \varepsilon - Ir = 12 - (2.0 \times 0.15) = 11.7\,\text{V} $$

The terminal pd is $11.7\,\text{V}$.

**10. The judgement.** The leads add a negligible resistance, so almost all the
$200\,\text{J}$ is delivered to the chest, not to the leads. The pulse is over in
tens of milliseconds. This is why the capacitor, not the battery, supplies the
energy: a battery cannot deliver $200\,\text{J}$ in $25\,\text{ms}$. This final
reasoning is not something a computer can check, so compare it with the evidence
above.

## Mixed practice — choose the method first

For each question, say which rule or equation you will use before you calculate.
The set mixes this chapter with earlier chapters, so read each question carefully.

:::problems chapter-05-review

:::answers chapter-05-review

## What you can now do

- define electric current and find a charge, a current or a number of charge
  carriers;
- use the emf, the internal resistance and the terminal potential difference of a
  source;
- calculate energy and power in a circuit;
- define resistance and use Ohm's law;
- describe and compare the $I$–$V$ characteristics of a resistor, a filament lamp
  and a diode;
- use resistivity and $R = \dfrac{\rho L}{A}$;
- find equivalent resistances in series and in parallel;
- use Kirchhoff's laws and the potential divider equation;
- define capacitance and use $C = \dfrac{Q}{V}$;
- find the energy stored in a capacitor;
- describe the exponential discharge of a capacitor and use $\tau = RC$;
- solve a multi-stage circuit problem and judge whether a result is significant.

## Your relevance reflection

Return to the prompt from the chapter opener: *think of a device that holds
charge and then releases it.* Write one more example now that you have finished
the chapter. Explain what the charge is used for, and whether the discharge is
slow or fast. Has the chapter changed how you think about the capacitors in the
devices you use?
