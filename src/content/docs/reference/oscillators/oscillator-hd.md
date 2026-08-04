---
title: Oscillator HD
description: High-definition band-limited oscillator with audio-rate pitch, sync and phase modulation.
---


<!-- module-screenshot:begin -->
<img src="../../../images/modules/osc-hd.png" alt="Oscillator HD module" class="se-module-screenshot" />
<!-- module-screenshot:end -->


The **Oscillator HD** is SynthEdit's high-definition waveform generator. It produces band-limited waveforms, so the harmonic series stays clean at high pitches instead of folding partials back down the spectrum as inharmonic aliasing artefacts.

Its pitch, pulse width, sync and phase modulation inputs are all audio-rate, so the oscillator can be modulated as fast as the signal driving it — including by another oscillator, which is what makes it usable as an FM operator.

Hear it in the [audio demos](../../../guides/audio-demos/).

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| Pitch | Audio | Note pitch (1V/octave, 5V = 440 Hz) |
| Pulse Width | Audio | Width of the pulse waveform |
| Waveform | List | Sine, Saw, Ramp, Triangle, Pulse, White Noise or Pink Noise |
| Sync | Audio | Hard sync input — resets oscillator phase |
| Phase Mod | Audio | Phase modulation input for FM synthesis |
| Disable | Bool | Silences and stops the oscillator to save CPU |

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| Audio Out | Audio | Generated waveform output |

## Parameters

| Property | Description |
|----------|-------------|
| Reset Mode | `VCO (Freerun)` keeps the phase running between notes; `DCO (Sync)` resets phase on each note for a consistent attack |

## Usage

Connect a [MIDI to CV](../../midi/midi-to-cv/) module's pitch output to the **Pitch** input for keyboard tracking, then feed **Audio Out** into a filter or [VCA](../../envelopes/vca/).

For FM synthesis, patch a second oscillator's output into **Phase Mod**. See the [FM Synthesis guide](../../../guides/fm-synthesis/).

Use **Reset Mode** to choose the character of the attack: `DCO (Sync)` gives every note an identical, punchy transient, while `VCO (Freerun)` gives the subtle variation of free-running analogue oscillators.

For the older, simpler generator see the [Oscillator](../oscillator/) module.
