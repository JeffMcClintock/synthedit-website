---
title: ADSR
description: Standard four-stage envelope generator.
---

The **ADSR** is a standard four-stage envelope generator (Attack, Decay, Sustain, Release) used to shape how a sound evolves over time.

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| Gate | Audio | Trigger signal — envelope starts on rising edge, enters release on falling edge |
| Attack | Audio | Attack time |
| Decay | Audio | Decay time |
| Sustain | Audio | Sustain level (0–10V) |
| Release | Audio | Release time |
| Overall Level | Audio | Scales the entire envelope output |

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| Signal Out | Audio | Envelope output (0–10V) |

## Usage

Connect the Gate input to a **MIDI-to-CV** module's Gate output. The envelope rises during Attack, falls to the Sustain level during Decay, holds at Sustain while the key is held, then falls to zero during Release when the key is released.

Envelope times use an exponential voltage scale — each 1V increase approximately doubles the time. Negative voltages produce shorter times.

Typical connections:
- **Amplitude envelope:** ADSR output to VCA volume input
- **Filter envelope:** ADSR output to filter cutoff frequency
- **FM envelope:** ADSR output to oscillator PM Depth
