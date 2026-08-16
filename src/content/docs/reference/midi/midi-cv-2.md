---
title: MIDI-CV 2
description: Converts MIDI data to control voltages and gate signals, with zero-latency retriggering.
---

The **MIDI-CV 2** module converts incoming MIDI note data into control voltages (CV) and gate
signals, forming the bridge between MIDI input and the analog-style modular synthesis engine.
It's the current, recommended module for this — see [MIDI to CV](../midi-to-cv/) for the older
module it replaces and how the two differ.

Place it inside the container that holds your voice modules — it's what makes that container
polyphonic (see the [Polyphony guide](../../../guides/polyphony/)).

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| MIDI In | MIDI | MIDI data input |
| Channel | Control | MIDI channel to respond to (-1 = all channels) |

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| Trigger | Audio | A short pulse on every new note — including a repeated note while the gate is already high. Use this for retriggering an envelope with zero latency, instead of watching the Gate signal toggle. |
| Gate | Audio | Note on/off (high while a key is held, low on release) |
| Pitch | Audio | Note pitch (1V/octave, 5V = A440) |
| Velocity | Audio | Note velocity |
| Aftertouch | Audio | Channel aftertouch |

## Usage

This is an essential module for any playable synthesizer. Wire **Gate** to an envelope's Gate
input, **Pitch** to your oscillators' Pitch inputs, and — if you want percussion-tight
retriggering on repeated notes rather than relying on the Gate dropping to zero and rising
again — use **Trigger** instead of Gate to fire the envelope.

See the [Polyphony guide](../../../guides/polyphony/) for details on voice management, and the
[FAQ](../../../guides/faq/#what-is-the-difference-between-midi-cv-and-midi-cv2) for how this
compares to the older MIDI to CV module.
