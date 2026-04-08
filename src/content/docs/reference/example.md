---
title: Oscillator
description: Reference for the Oscillator module.
---

The **Oscillator** module generates basic waveforms used as the foundation of most synthesizers.

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| Pitch | Control | Note pitch in volts/octave format |
| Pulse Width | Control | Width of the pulse waveform (0-1) |
| Phase Mod | Audio | Phase modulation input for FM synthesis |

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| Saw | Audio | Sawtooth waveform |
| Pulse | Audio | Pulse/square waveform |
| Sine | Audio | Sine waveform |
| Triangle | Audio | Triangle waveform |

## Parameters

- **Frequency** — Base frequency in Hz (when no pitch CV is connected)
- **Pulse Width** — Default pulse width (0.5 = square wave)

## Usage

The oscillator is typically the first module in a synthesizer signal chain. Connect a **MIDI to CV** module's pitch output to the oscillator's pitch input for keyboard tracking.

For richer sounds, use multiple oscillators with slight detuning, or use the phase modulation input for FM synthesis tones.
