---
title: Ring Modulator
description: Multiplies two signals together with normalization.
---


<!-- module-screenshot:begin -->
<img src="../../../images/modules/ring-modulator.png" alt="Ring Modulator module" class="se-module-screenshot" />
<!-- module-screenshot:end -->


The **Ring Modulator** multiplies two input signals and normalizes the result. This produces sum and difference frequencies, creating metallic, bell-like, and inharmonic timbres.

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| Input 1 | Audio | First signal |
| Input 2 | Audio | Second signal |

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| Output | Audio | Modulated output (normalized: 5V × 2V = 1V) |

## Usage

- Ring modulation with two audio-rate signals creates metallic, clangorous timbres
- With one audio signal and one LFO, it produces tremolo effects
- The normalization means two 10V signals produce a 10V output (not 100V)
