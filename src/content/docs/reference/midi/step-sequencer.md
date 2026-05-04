---
title: Step Sequencer
description: Simple MIDI pattern sequencer.
---


<!-- module-screenshot:begin -->
<img src="../../../images/modules/step-sequencer.png" alt="Step Sequencer module" class="se-module-screenshot" />
<!-- module-screenshot:end -->


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
