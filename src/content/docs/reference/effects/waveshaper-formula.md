---
title: Waveshaper (Formula)
description: Math formula-based waveshaper for precise transfer functions.
---


<!-- module-screenshot:begin -->
<img src="../../../images/modules/waveshaper-formula.png" alt="Waveshaper (Formula) module" class="se-module-screenshot" />
<!-- module-screenshot:end -->


The **Waveshaper (Formula)** applies a mathematical formula as a transfer function. The input signal value is substituted into the formula, and the result becomes the output. Internally, the formula is computed as a 512-point lookup table for efficiency.

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| Signal In | Audio | Audio input (range: -5.0 to +5.0V) |

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| Signal Out | Audio | Transformed audio output |

## Parameters

| Property | Description |
|----------|-------------|
| Ignore Program Change | Prevent MIDI program changes from altering the formula |
| Hint | Tooltip text |

## Supported Functions

`*`, `/`, `+`, `-`, `^` (power), `sin`, `cos`, `tan`, `asin`, `acos`, `atan`, `sinh`, `cosh`, `tanh`, `exp`, `log`, `log10`, `sqrt`, `floor`, `ceil`, `abs`, `hypot`, `deg`, `rad`, `sgn`, `min`, `max`

The input variable is `x` (representing the input voltage).

## Usage Notes

- Input range is -5.0 to +5.0V; values outside this range are clamped
- Leading negative signs require a `0-` prefix (e.g., `0-2^x` instead of `-2^x`)
- Example formulas:
  - `5*sin(x)` — Sine waveshaping
  - `x^3` — Cubic soft clipping
  - `5*sgn(x)` — Hard clipping
