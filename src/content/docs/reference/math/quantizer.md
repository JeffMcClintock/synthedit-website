---
title: Quantizer
description: Constrains a signal to discrete voltage steps.
---

The **Quantizer** rounds the input signal to the nearest discrete step, producing a staircase-like output. Useful for creating stepped sequences from smooth signals or quantizing pitch to semitones.

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| Signal In | Audio | Signal to quantize |
| Step Size | Audio | Voltage interval between steps |

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| Signal Out | Audio | Quantized output |

## Usage

To quantize pitch to semitones, set the step size to 1/12 V (approximately 0.0833V), since SynthEdit uses 1V per octave and there are 12 semitones per octave.
