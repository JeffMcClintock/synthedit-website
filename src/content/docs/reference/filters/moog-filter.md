---
title: Moog Filter
description: 4-pole low-pass filter with classic analog character and overdrive.
---


<!-- module-screenshot:begin -->
<img src="/images/modules/moog-filter.png" alt="Moog Filter module" class="se-module-screenshot" />
<!-- module-screenshot:end -->


The **Moog Filter** is a 4-pole (24 dB/octave) low-pass filter with a built-in overdrive stage. It produces the classic "fat" analog filter sound but uses more CPU than the SV Filter.

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| Signal | Audio | Audio input to filter |
| Pitch | Audio | Cutoff frequency (1V/octave, 5V = 440 Hz) |
| Resonance | Audio | Resonance amount (0–10V); high values produce self-oscillation |

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| Output | Audio | Filtered audio output |

## Parameters

| Property | Description |
|----------|-------------|
| Freq Scale | Pitch input scaling: 1V/Octave or 1V/kHz |

## Usage

The Moog Filter excels at bass sounds and leads where a thick, warm character is desired. The built-in overdrive adds saturation as input levels increase, contributing to the distinctive analog sound.

For lower CPU usage or when you need multiple filter types simultaneously, use the [SV Filter](/reference/filters/sv-filter/) instead.
