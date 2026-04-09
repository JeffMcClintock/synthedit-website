---
title: Drum Sequencer
description: MIDI drum pattern sequencer.
---

The **Drum Sequencer** provides a grid-based drum pattern editor that outputs MIDI data for triggering drum sounds.

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| Channel | Control | MIDI channel |
| MIDI In | MIDI | External sync input |

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| MIDI Out | MIDI | Drum pattern MIDI output with timing |

## Parameters

| Property | Description |
|----------|-------------|
| Ignore Program Change | Prevent preset changes from altering the pattern |
| Clock Sync | Synchronization mode |
| Hint | Tooltip text |
