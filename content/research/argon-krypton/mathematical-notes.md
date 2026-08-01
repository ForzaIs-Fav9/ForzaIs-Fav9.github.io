---
title: Mathematical Notes
lastUpdated: August 2026
summary: Complete mathematical derivations developed throughout the investigation.
---

# Mathematical Notes

This notebook contains the technical development of the investigation.

Unlike the Research Journal, which records the chronological evolution of the project, this notebook focuses exclusively on the mathematics. Every derivation is reconstructed independently wherever possible before being compared against the published literature.

---

# Contents

1. Polarization Potential
2. Zero-Energy Radial Equation
3. Exact Zero-Energy Solution
4. Jost Transformation
5. Volterra Integral Equation
6. Perturbation Expansion
7. Scattering Length
8. Comparison with O'Malley (1961)

---

# Polarization Potential

## Starting Point

$$
V(r)=-\frac{C_4}{r^4}
$$

For convenience,

$$
\beta^2=\frac{2mC_4}{\hbar^2}
$$

giving

$$
V(r)=-\frac{\hbar^2\beta^2}{2mr^4}.
$$

---

## Physical Meaning

The long-range interaction between an incident electron and a neutral noble-gas atom is dominated by the induced polarization potential.

...

---

# Zero-Energy Radial Equation

Starting from

$$
u''+\left[k^2-\frac{2m}{\hbar^2}V(r)\right]u=0
$$

the zero-energy limit gives

$$
u''+\frac{\beta^2}{r^4}u=0.
$$

...

---

# Exact Zero-Energy Solution

Introduce

$$
x=\frac{\beta}{r}.
$$

After substitution,

...

Eventually,

$$
u_1=r\sin\frac{\beta}{r},
$$

$$
u_2=r\cos\frac{\beta}{r}.
$$

Boundary conditions select the physical solution.

...

---

# Jost Transformation

...

---

# Volterra Integral Equation

...

---

# Perturbation Expansion

Current status:

🟡 Under revision

Current issue:

The perturbation expansion originally began around

$$
m(r)=1
$$

rather than

$$
m_0(r)=\cos\frac{\beta}{r}.
$$

The latter corresponds to the exact zero-energy solution and produces the appropriate distorted-wave expansion discussed by O'Malley.

---

# Comparison with O'Malley (1961)

| Topic | Independent Derivation | O'Malley |
|---------|-----------------------|----------|
| Starting point | ... | ... |
| Exact solution | ... | ... |
| Matching | ... | ... |
| Special functions | None | Modified Mathieu |
| Current agreement | ... | ... |
