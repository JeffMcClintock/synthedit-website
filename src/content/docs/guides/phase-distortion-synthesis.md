---
title: Phase Distortion Synthesis
description: Creating sounds using phase distortion synthesis in SynthEdit.
---

Phase Distortion (PD) synthesis is a technique pioneered by Casio in the CZ-series synthesizers (CZ-1000, CZ-5000). It produces rich, filter-like timbres by distorting the phase of a waveform during playback.

## How It Works

A standard oscillator reads through a sine wave at a constant rate. In phase distortion synthesis, the readback speed is varied within each cycle — parts of the waveform play faster, parts slower. This "distortion" of the phase reshapes the waveshape itself, producing new harmonics.

By modulating the amount of distortion, you can sweep through timbres in a way that sounds similar to a resonant filter sweep — without using an actual filter module.

## The Phase Distortion Oscillator

SynthEdit's **Phase Dist Osc** module implements this technique:

<img src="../../images/guides/phase-distortion-synthesis/01-pd-osc.png" alt="The Phase Dist Osc module showing its Pitch and Modulation Depth audio inputs, Wave1 and Wave2 enum inputs, and Audio Out" />

### Inputs

| Pin | Description |
|-----|-------------|
| Pitch | Note pitch (1V/octave, 5V = 440 Hz) |
| Modulation Depth | Amount of phase distortion (0–10V = 0–100%) |
| Wave1 | First waveform shape (Saw, Square, Pulse, Dbl Sine, Saw-Pulse, Reso1–3) |
| Wave2 | Second waveform shape (same options plus None) |

### Output

| Pin | Description |
|-----|-------------|
| Audio Out | The phase-distorted audio signal |

## Creating PD Sounds

Wire the oscillator into a complete patch like this:

<img src="../../images/guides/phase-distortion-synthesis/02-pd-patch.png" alt="A PD patch: MIDI to CV provides Pitch to the Phase Dist Osc and Gate to an ADSR envelope; the envelope's Signal Out drives the oscillator's Modulation Depth; the oscillator's Audio Out goes to Sound Out" />

1. Insert a **Phase Dist Osc**
2. Add a **MIDI to CV** module — connect its **Pitch** output to the oscillator's **Pitch** input so the patch tracks your keyboard
3. Add an **ADSR** envelope and connect MIDI to CV's **Gate** to the envelope's **Gate** input — this triggers the envelope on each note
4. Connect the envelope's **Signal Out** to the oscillator's **Modulation Depth** — this sweeps the timbre over time, much like a filter envelope
5. Connect the oscillator's **Audio Out** to a **Sound Out** module

At zero modulation, the output is a pure sine wave; at full modulation, the waveform is heavily distorted with rich harmonics.

## Tips

- The Phase Distortion Oscillator is sensitive to sudden changes in modulation. If you hear clicks, filter the modulation signal to smooth out abrupt transitions.
- Velocity control works naturally here — use MIDI velocity (from MIDI to CV) to scale the envelope amount, giving harder key strikes a brighter, more distorted tone.
- PD synthesis uses less CPU than equivalent filter-based patches since no separate filter module is needed.
- Try different combinations of **Wave1** and **Wave2** — each pair gives a distinctly different harmonic character. The "Reso" shapes mimic resonant filter sweeps especially convincingly.
