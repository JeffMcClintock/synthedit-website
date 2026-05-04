---
title: Level Adj
description: Multiplies and normalizes two signals for amplitude modulation.
---


<!-- module-screenshot:begin -->
<img src="../../../images/modules/level-adj.png" alt="Level Adj module" class="se-module-screenshot" />
<!-- module-screenshot:end -->


The **Level Adj** multiplies two input signals with normalization, similar to the Ring Modulator. Useful for ring modulation, amplitude modulation, and signal scaling.

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| Input 1 | Audio | First signal |
| Input 2 | Audio | Second signal |

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| Output | Audio | Multiplied and normalized output |

## Usage Notes

For amplitude envelopes (shaping note volume), use the [VCA](/reference/envelopes/vca/) instead — it's optimized for sleep mode detection and provides better CPU efficiency.
