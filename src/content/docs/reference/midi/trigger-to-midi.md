---
title: Trigger to MIDI
description: Converts gate and pitch voltages to MIDI note messages.
---

The **Trigger to MIDI** module converts gate and pitch control voltages back into MIDI note-on and note-off messages.

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| Gate | Audio | Triggers note-on (rising edge) and note-off (falling edge) |
| Pitch | Audio | Sets the MIDI note number |
| Velocity | Audio | Note velocity (0–10V = 0–127) |
| Channel | Control | MIDI channel to send on |

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| MIDI Out | MIDI | Generated MIDI messages |

## Parameters

| Property | Description |
|----------|-------------|
| Freq Scale | Pitch input scaling |
