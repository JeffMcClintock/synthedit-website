---
title: All Pass Filter
description: Two-pole all-pass filter for phase manipulation effects.
---


<!-- module-screenshot:begin -->
<img src="../../../images/modules/all-pass.png" alt="All Pass module" class="se-module-screenshot" />
<!-- module-screenshot:end -->


The **All Pass Filter** passes all frequencies at equal amplitude but shifts the phase of the signal. This is useful for building phaser effects and other phase-based processing.

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| Signal | Audio | Audio input |
| Pitch | Audio | Center frequency (1V/octave) |
| Resonance | Audio | Bandwidth / resonance control |

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| Output | Audio | Phase-shifted output |

## Parameters

| Property | Description |
|----------|-------------|
| Freq Scale | Pitch input scaling: 1V/Octave or 1V/kHz |

## Usage

Chain multiple All Pass Filters at different frequencies and mix the output with the dry signal to create phaser effects. Modulate the Pitch input with an LFO for the classic sweeping phaser sound.
