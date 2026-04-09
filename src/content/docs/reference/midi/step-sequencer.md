---
title: Step Sequencer
description: Simple MIDI pattern sequencer.
---

The **Step Sequencer** provides a simple step-based pattern sequencer that outputs MIDI data.

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| Channel | Control | MIDI channel |
| MIDI In | MIDI | External sync input (for tempo sync) |

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| MIDI Out | MIDI | Sequencer output with timing data |

## Parameters

| Property | Description |
|----------|-------------|
| Ignore Program Change | Prevent preset changes from altering the pattern |
| Clock Sync | Synchronization mode |
| Hint | Tooltip text |
