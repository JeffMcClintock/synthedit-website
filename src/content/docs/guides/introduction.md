---
title: Introduction to SynthEdit
description: An overview of SynthEdit and what you can do with it.
---

SynthEdit is a visual, modular synthesizer editor that lets you design and build your own virtual instruments and audio effects. By connecting modules together on a virtual canvas, you can create anything from simple synthesizers to complex audio processors — and export them as VST plugins.

<img src="../../images/guides/introduction/01-modular-patch.png" alt="A complete subtractive synth in SynthEdit's Structure View: MIDI to CV feeds an Oscillator's Pitch and an ADSR envelope's Gate; the oscillator runs through an SV Filter into a VCA whose Volume is driven by the envelope; the VCA's output goes to Sound Out" />

This is what a working synthesiser looks like in SynthEdit — modules wired together with patch cords. Each box is a module that does one job (generate a tone, shape a note, control volume), and the cords show signal flowing from one module's output into another's input.

## What Can You Build?

- **Virtual synthesizers** — subtractive, additive, FM, wavetable, and hybrid designs
- **Audio effects** — reverbs, delays, distortion, chorus, EQ, and more
- **MIDI utilities** — arpeggiators, chord generators, MIDI filters
- **Experimental instruments** — granular processors, generative music tools, custom controllers

## How It Works

SynthEdit uses a **modular patching** approach:

1. **Place modules** on the canvas — oscillators, filters, envelopes, etc.
2. **Connect them** by dragging cables between module inputs and outputs
3. **Adjust parameters** using knobs, sliders, and other controls
4. **Design the GUI** with a built-in visual editor
5. **Export as VST** to use your creation in any DAW

## System Requirements

- Windows 10 or later (64-bit)
- A VST3-compatible DAW for testing exported plugins

## Next Steps

- [Install SynthEdit](/guides/installation/) to get started
- [Build your first synth](/guides/first-synth/) with a step-by-step tutorial
