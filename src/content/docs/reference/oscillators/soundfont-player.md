---
title: SoundFont Player
description: Plays SoundFont 2 files directly from MIDI input.
---

The **SoundFont Player** plays SoundFont 2 (.SF2) files directly from MIDI data, providing a simple way to use sampled instruments without manual CV wiring.

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| MIDI In | MIDI | MIDI note and control data |
| Bank | Control | External bank selection |
| Patch | Control | External patch/program selection |

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| Left Out | Audio | Left audio channel |
| Right Out | Audio | Right audio channel |

## Usage Notes

- Bank and Patch changes only take effect during playback
- Unlike the SoundFont Oscillator, this module handles MIDI input directly — no MIDI-to-CV conversion needed
- The entire SoundFont file is loaded into memory
