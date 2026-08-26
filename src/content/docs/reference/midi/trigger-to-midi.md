---
title: Trigger to MIDI
description: Converts gate and pitch voltages to MIDI note messages.
---


<!-- module-screenshot:begin -->
<img src="../../../images/modules/trigger-to-midi.png" alt="Trigger To MIDI module" class="se-module-screenshot" />
<!-- module-screenshot:end -->


:::caution[Legacy module]
Kept under the **Old** category so older projects still load. For new patches use
**[Trigger To MIDI2](../trigger-to-midi2/)**, which adds a separate **Trigger** input for repeated
notes and takes **Gate** as a boolean.
:::


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
