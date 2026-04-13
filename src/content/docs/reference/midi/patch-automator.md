---
title: Patch Automator
description: Enables MIDI automation of container controls.
---


<!-- module-screenshot:begin -->
<img src="/images/modules/se-patch-automator.png" alt="Patch Automator module" class="se-module-screenshot" />
<!-- module-screenshot:end -->


The **Patch Automator** makes all controls in a container automatable via MIDI controllers. It also sends MIDI messages when controls change, useful for controlling external MIDI hardware.

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| Channel | Control | MIDI channel |
| MIDI In | MIDI | MIDI controller data |

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| MIDI Out | MIDI | MIDI messages sent when controls change |

## Parameters

| Property | Description |
|----------|-------------|
| Send all on Patch Change | Transmit all control values when switching patches |

## Usage Notes

- Do **not** connect controls or Patch Memory modules back into the Patch Automator's MIDI input — this creates a feedback loop
- Exception: a List Entry connected to the Channel pin is safe
- See the [MIDI Automation guide](/guides/midi-automation/) for setup details
