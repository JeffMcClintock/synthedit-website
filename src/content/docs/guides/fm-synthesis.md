---
title: FM Synthesis
description: Creating FM synthesis sounds using SynthEdit's oscillator modules.
---

Frequency Modulation (FM) synthesis produces complex timbres by using one oscillator to modulate the frequency (or phase) of another. Popularized by the Yamaha DX-7, FM synthesis excels at bell-like tones, electric pianos, basses, and metallic textures.

## Basic Concept

In FM synthesis, a **modulator** oscillator's output modulates the phase of a **carrier** oscillator:

- **Carrier** — The oscillator you hear. Its base frequency determines the pitch.
- **Modulator** — The oscillator that modulates the carrier. Its frequency and amplitude shape the timbre.

## Phase Modulation vs. Frequency Modulation

SynthEdit's oscillator uses **phase modulation** (PM) rather than true frequency modulation. Phase modulation produces the same results as FM synthesis but is simpler to control — the pitch stays stable regardless of modulation depth. This is the same approach used by the Yamaha DX-7.

## Building an FM Patch

### Simple Two-Operator FM

1. Insert two **Oscillator** modules
2. Connect **MIDI-to-CV** pitch output to both oscillators' Pitch inputs
3. Connect the modulator oscillator's output to the carrier's **Phase Mod** input
4. Use a control (slider or envelope) to adjust the carrier's **PM Depth** input
5. Connect the carrier's output to your VCA and audio output

### Adjusting the Sound

- **Modulator frequency** controls the harmonic spacing — try detuning by octaves or specific ratios (2:1, 3:2, 4:1)
- **Modulation depth** controls brightness — more modulation adds more harmonics
- **Envelopes on modulation depth** create evolving timbres — high modulation on attack that fades produces percussive, bell-like sounds

## Operator Configurations

FM synthesizers typically chain multiple oscillators (called "operators") in various arrangements called **algorithms**:

- **Stack** — Modulator > Modulator > Carrier (increasingly complex spectra)
- **Parallel** — Multiple modulators feeding one carrier (additive-like complexity)
- **Branch** — Combinations of stacked and parallel paths

In SynthEdit, you build these configurations by connecting oscillators together. There's no fixed algorithm structure — you have complete freedom to design your own operator topologies.

## Tips

- Use **sine waves** for the cleanest FM tones (as in classic DX-7 patches)
- Sawtooth or pulse modulators create harsher, more aggressive timbres
- Small frequency ratios (1:1, 2:1, 3:1) produce harmonic tones; non-integer ratios (1:1.41) produce inharmonic, bell-like sounds
- Modulate the modulation depth with an ADSR envelope for time-varying timbres
