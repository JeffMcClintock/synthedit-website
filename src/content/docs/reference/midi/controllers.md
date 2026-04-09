---
title: Controllers (MIDI Controllers)
description: Converts MIDI controller messages to control voltages.
---

The **Controllers** module converts MIDI Continuous Controller (CC) messages — such as mod wheel, joystick, and expression pedal — into control voltages.

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| MIDI In | MIDI | MIDI data input |
| Channel | Control | MIDI channel to respond to |
| Type 1–4 | List | Controller type selection (4 configurable slots) |

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| Aftertouch | Audio | Channel aftertouch voltage |
| Bender | Audio | Pitch bend voltage |
| Controller 1–4 | Audio | Control voltages from selected controllers |
