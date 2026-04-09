---
title: Waveshaper
description: Custom transfer function for distortion and waveform modification.
---

The **Waveshaper** applies a custom transfer function to the input signal using draggable control points. It maps each input voltage to an output voltage according to the curve you define.

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| Signal In | Audio | Audio input |

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| Signal Out | Audio | Shaped audio output |

## Parameters

| Property | Description |
|----------|-------------|
| Ignore Program Change | Prevent MIDI program changes from altering the curve |
| Hint | Tooltip text |

## Usage

- **Distortion:** Create S-curves for soft clipping or hard-knee curves for aggressive distortion
- **Waveform modification:** Reshape oscillator waveforms into new shapes
- **Custom CV curves:** Create non-linear control voltage mappings

Keep the center control point centered to avoid introducing DC offset into your signal.
