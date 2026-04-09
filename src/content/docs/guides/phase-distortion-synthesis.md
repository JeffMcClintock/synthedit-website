---
title: Phase Distortion Synthesis
description: Creating sounds using phase distortion synthesis in SynthEdit.
---

Phase Distortion (PD) synthesis is a technique pioneered by Casio in the CZ-series synthesizers (CZ-1000, CZ-5000). It produces rich, filter-like timbres by distorting the phase of a waveform during playback.

## How It Works

A standard oscillator reads through a sine wave at a constant rate. In phase distortion synthesis, the readback speed is varied within each cycle — parts of the waveform play faster, parts slower. This "distortion" of the phase reshapes the waveshape itself, producing new harmonics.

By modulating the amount of distortion, you can sweep through timbres in a way that sounds similar to a resonant filter sweep — without using an actual filter module.

## The Phase Distortion Oscillator

SynthEdit's **Phase Distortion Oscillator** module implements this technique:

### Inputs

| Pin | Description |
|-----|-------------|
| Pitch | Note pitch (1V/octave, 5V = 440 Hz) |
| Modulation Depth | Amount of phase distortion (0–10V = 0–100%) |
| Wave1 | First waveform shape |
| Wave2 | Second waveform shape |

### Output

| Pin | Description |
|-----|-------------|
| Audio Out | The phase-distorted audio signal |

## Creating PD Sounds

1. Insert a **Phase Distortion Oscillator**
2. Connect pitch from **MIDI-to-CV**
3. Use an **ADSR envelope** to modulate the **Modulation Depth** — this sweeps the timbre over time, much like a filter envelope
4. At zero modulation, the output is a pure sine wave; at full modulation, the waveform is heavily distorted with rich harmonics

## Tips

- The Phase Distortion Oscillator is sensitive to sudden changes in modulation. If you hear clicks, filter the modulation signal to smooth out abrupt transitions.
- Velocity control works naturally here — use MIDI velocity (from MIDI-to-CV) to scale the envelope amount, giving harder key strikes a brighter, more distorted tone.
- PD synthesis uses less CPU than equivalent filter-based patches since no separate filter module is needed.
