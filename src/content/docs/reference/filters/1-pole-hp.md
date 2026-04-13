---
title: 1 Pole High Pass
description: Simple, efficient 6 dB/octave high-pass filter.
---


<!-- module-screenshot:begin -->
<img src="/images/modules/1-pole-hp.png" alt="1 Pole HP module" class="se-module-screenshot" />
<!-- module-screenshot:end -->


The **1 Pole High Pass** is a simple, CPU-efficient high-pass filter with a gentle 6 dB/octave rolloff. Useful for removing DC offset or low-frequency rumble.

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| Signal | Audio | Audio input |
| Pitch | Audio | Cutoff frequency |

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| Output | Audio | Filtered output |

## Parameters

| Property | Description |
|----------|-------------|
| Freq Scale | Pitch input scaling: 1V/Octave or 1V/kHz |
