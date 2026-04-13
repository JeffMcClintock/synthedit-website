---
title: 1 Pole Low Pass
description: Simple, efficient 6 dB/octave low-pass filter.
---


<!-- module-screenshot:begin -->
<img src="/images/modules/1-pole-lp.png" alt="1 Pole LP module" class="se-module-screenshot" />
<!-- module-screenshot:end -->


The **1 Pole Low Pass** is a simple, CPU-efficient low-pass filter with a gentle 6 dB/octave rolloff. Useful for smoothing control signals or subtle high-frequency reduction.

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
