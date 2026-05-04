---
title: MIDI In
description: Receives MIDI data from a physical MIDI input port.
---


<!-- module-screenshot:begin -->
<img src="../../../images/modules/midi-in.png" alt="MIDI In module" class="se-module-screenshot" />
<!-- module-screenshot:end -->


The **MIDI In** module connects to a physical MIDI input port on your computer, receiving data from external keyboards, drum pads, or sequencers.

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| MIDI Data | MIDI | MIDI output stream |

## Usage Notes

- Only functions in the SynthEdit editor — inactive when running as a VST plugin
- Subject to latency depending on your MIDI hardware and driver setup
- For VST plugins, MIDI input is handled automatically by the host DAW
- Use a MIDI loopback driver to route MIDI from other software into SynthEdit
