---
title: Oscillator
description: Generates basic waveforms and noise for synthesis.
---

The **Oscillator** generates simple waveforms (sawtooth, pulse, sine, triangle) and noise (white/pink). It also supports Yamaha DX-style frequency modulation synthesis via its phase modulation input.

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| Pitch | Audio | Note pitch (1V/octave, 5V = 440 Hz) |
| Pulse Width | Audio | Width of the pulse waveform (0–10V) |
| Waveform | List | Waveform selection |
| Sync | Audio | Hard sync input — resets oscillator phase |
| Phase Mod | Audio | Phase modulation input for FM synthesis |
| PM Depth | Audio | Phase modulation depth |

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| Audio Out | Audio | Generated waveform output |

## Parameters

| Property | Description |
|----------|-------------|
| Freq Scale | Pitch input scaling: 1V/Octave or 1V/kHz |
| Smooth Peaks | Reduces Gibbs effect ringing on sharp waveforms |
| Sync X-Fade | Anti-aliasing for hard sync |

## Usage

The oscillator is typically the first module in a synthesizer signal chain. Connect a **MIDI-to-CV** module's pitch output to the oscillator's Pitch input for keyboard tracking.

For FM synthesis, connect a second oscillator's output to the **Phase Mod** input and control the modulation amount with **PM Depth**. See the [FM Synthesis guide](/guides/fm-synthesis/) for details.
