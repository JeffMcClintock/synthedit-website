---
title: MIDI to CV
description: Converts MIDI data to control voltages and gate signals.
---


<!-- module-screenshot:begin -->
<img src="../../../images/modules/midi-to-cv.png" alt="MIDI to CV module" class="se-module-screenshot" />
<!-- module-screenshot:end -->


The **MIDI to CV** module converts incoming MIDI note data into control voltages (CV) and gate signals, forming the bridge between MIDI input and the analog-style modular synthesis engine.

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| MIDI In | MIDI | MIDI data input |
| Channel | Control | MIDI channel to respond to (0 = all channels) |
| Bend Range | Control | Pitch bend range in semitones (0–12) |
| Portamento Time | Control | Glide time between notes |

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| Gate | Audio | Note on/off (5V while key held, 0V on release) |
| Pitch | Audio | Note pitch (1V/octave, 5V = A440) |
| Velocity | Audio | Note velocity |
| Aftertouch | Audio | Channel aftertouch |

## Usage

This is an essential module for any playable synthesizer. Place it inside the container that holds your voice modules — it controls polyphonic voice allocation.

See the [Polyphony guide](/guides/polyphony/) for details on voice management.
