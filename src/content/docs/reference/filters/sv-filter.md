---
title: SV Filter (State Variable)
description: Versatile 2-pole filter with four simultaneous output types.
---


<!-- module-screenshot:begin -->
<img src="/images/modules/sv-filter.png" alt="SV Filter module" class="se-module-screenshot" />
<!-- module-screenshot:end -->


The **SV Filter** (State Variable Filter) is a versatile 2-pole filter providing four simultaneous outputs. It offers 12 dB/octave rolloff for low-pass and high-pass, and 6 dB/octave for band-pass and band-reject modes.

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| Signal | Audio | Audio input to filter |
| Pitch | Audio | Cutoff frequency (1V/octave, 5V = 440 Hz) |
| Resonance | Audio | Resonance / Q amount (0–10V) |

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| Low Pass | Audio | Low-pass filtered output (12 dB/oct) |
| High Pass | Audio | High-pass filtered output (12 dB/oct) |
| Band Pass | Audio | Band-pass filtered output (6 dB/oct) |
| Band Reject | Audio | Band-reject / notch output (6 dB/oct) |

## Parameters

| Property | Description |
|----------|-------------|
| Freq Scale | Pitch input scaling: 1V/Octave or 1V/kHz |

## Usage

All four outputs are available simultaneously — you can use different filter types from the same module without duplicating it. Connect the desired output to the next module in your signal chain.

For a heavier, more "analog" filter sound, see the [Moog Filter](/reference/filters/moog-filter/).
