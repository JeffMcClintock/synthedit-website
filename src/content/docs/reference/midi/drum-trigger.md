---
title: Drum Trigger
description: Converts MIDI notes to individual drum trigger outputs.
---

The **Drum Trigger** converts MIDI note data into individual trigger signals for each drum sound, with velocity outputs and hi-hat decay control.

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| MIDI In | MIDI | MIDI drum data |
| Channel | Control | MIDI channel to respond to |
| Open HH Decay | Control | Open hi-hat decay time |
| Pedal HH Decay | Control | Pedal hi-hat decay time |
| Close HH Decay | Control | Closed hi-hat decay time |

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| Kick | Audio | Bass drum trigger |
| Snare | Audio | Snare drum trigger |
| Hi Hat | Audio | Hi-hat triggers (open, closed, pedal) |
| Tom 1–3 | Audio | Tom triggers |
| Cowbell, Clap, Crash, Tamb, Ride | Audio | Additional percussion triggers |
| User 1–4 | Audio | User-configurable triggers |
| Velocity outputs | Audio | Velocity for each drum |

## Parameters

| Property | Description |
|----------|-------------|
| User 1–4 Note # | MIDI note number for each user-configurable trigger |
