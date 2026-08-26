---
title: Keyboard
description: On-screen MIDI keyboard, superseded by Keyboard (MIDI).
---


<!-- module-screenshot:begin -->
<img src="../../../images/modules/keyboard.png" alt="Keyboard module" class="se-module-screenshot" />
<!-- module-screenshot:end -->


:::caution[Legacy module]
This is the original on-screen keyboard, kept under the **Old** category so older projects still
load. For new patches use **[Keyboard (MIDI)](../keyboard-midi/)** under **Controls**, which has
the same two plugs. There is also a **Keyboard (MPE)** for per-note expression, and an Old
**Keyboard (CV)** that puts out voltages instead of MIDI.
:::


The **Keyboard** module provides an on-screen piano keyboard, played with the mouse.

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| Channel | Control | MIDI channel to send on |

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| MIDI Out | MIDI | MIDI note data |

## Usage Notes

- The keyboard is resizable
- Clicking the keyboard starts SynthEdit playback if it isn't already running
- Playing from the computer keyboard is no longer supported — use the mouse, or a MIDI keyboard through [MIDI In](../midi-in/)
