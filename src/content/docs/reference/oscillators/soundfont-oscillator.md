---
title: SoundFont Oscillator
description: Plays raw samples from SoundFont (.SF2) files as oscillator waveforms.
---

The **SoundFont Oscillator** uses samples from SoundFont 2 (.SF2) files as its waveform source, giving you access to realistic instrument sounds and complex multi-sampled patches.

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| Bank | Control | SoundFont bank number |
| Patch | Control | SoundFont patch/program number |
| Gate | Audio | Triggers sample playback (> 0V = play) |
| Pitch | Audio | Note pitch (1V/octave, 5V = 440 Hz) |
| Velocity | Audio | Selects velocity-split sample layers |

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| Left (Mono) | Audio | Left channel output |
| Right | Audio | Right channel output |

## Parameters

| Property | Description |
|----------|-------------|
| Freq Scale | Pitch input scaling |

## Usage Notes

- The entire SoundFont file is loaded into memory — large files will increase memory usage significantly
- The **Velocity** input selects between velocity-split sample layers but does not control volume. Use a VCA for volume control.
- For distributing VST plugins that use SoundFonts, see the [Creating VST Plugins guide](/guides/creating-vst-plugins/) for file path considerations
