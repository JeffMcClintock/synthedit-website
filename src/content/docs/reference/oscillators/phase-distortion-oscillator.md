---
title: Phase Distortion Oscillator
description: Oscillator using phase distortion synthesis for complex timbres.
---

The **Phase Distortion Oscillator** generates complex tones by modulating the playback phase of a waveform, producing filter-like timbral sweeps without a separate filter module.

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| Pitch | Audio | Note pitch (1V/octave, 5V = 440 Hz) |
| Modulation Depth | Audio | Amount of phase distortion (0–10V = 0–100%) |
| Wave1 | List | First waveform shape |
| Wave2 | List | Second waveform shape |

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| Audio Out | Audio | Phase-distorted audio output |

## Parameters

| Property | Description |
|----------|-------------|
| Freq Scale | Pitch input scaling: 1V/Octave or 1V/kHz |

## Usage

At zero modulation depth, the output is a pure sine wave. Increasing modulation adds harmonics progressively. Modulate the depth with an ADSR envelope for time-varying timbres similar to a filter sweep.

The module is sensitive to sudden modulation changes — filter abrupt control signals to avoid clicks.

See the [Phase Distortion Synthesis guide](/guides/phase-distortion-synthesis/) for detailed techniques.
