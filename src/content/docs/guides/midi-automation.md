---
title: MIDI Automation
description: Automating synth parameters with MIDI controllers and the Patch Automator.
---

MIDI automation lets you control your synthesizer's parameters from an external MIDI controller, sequencer, or DAW.

## Patch Automator

The **Patch Automator** module is the primary way to enable MIDI control of your synth's parameters. Insert it into a container to make all controls in that container automatable.

### Setup

1. Insert a **Patch Automator** module into your container
2. Connect its MIDI input to your MIDI source
3. Open its configuration dialog to assign controllers

<img src="../../images/guides/midi-automation/01-patch-automator.png" alt="MIDI flows through the Patch Automator inline: MIDI Player to Patch Automator's MIDI In, Patch Automator's MIDI Out to a MIDI to CV module, then on to the oscillator and Sound Out" />

The Patch Automator sits **inline** in the MIDI chain — incoming MIDI passes through it, and assigned CC messages get translated into parameter changes for any controls within the same container.

### Assigning Controllers

The Patch Automator's configuration dialog provides:
- **Learn** — Move a physical MIDI controller, then click a parameter to assign it
- **Unlearn** — Remove a controller assignment
- **Edit** — Manually specify MIDI controller numbers

### MIDI Controller Types

You can automate parameters using:
- **Standard MIDI Controllers** (CC 0–127)
- **RPN / NRPN** messages for extended control ranges

### SYSEX Support

For advanced MIDI hardware, the Patch Automator supports SYSEX messages with special characters:
- `LL` — LSB of parameter value
- `MM` — MSB of parameter value
- `vv` — 7-bit value
- `SS` — Checksum

## VST Automation

When your patch is exported as a VST plugin, the Patch Automator's assignments become VST automation parameters. The DAW can then automate these parameters through its own automation lanes.

## Patch Memory

The **Patch Select** module stores and recalls up to 128 patches (preset configurations). It responds to MIDI Program Change messages, allowing you to switch presets from your MIDI controller or DAW.

## Important Notes

- **Avoid feedback loops:** Don't connect controls or Patch Memory modules back into the Patch Automator's MIDI input — this creates a feedback loop.
- **Exception:** A simple List Entry connected to the Channel pin is safe.
- The Patch Automator sends MIDI messages when controls change, which is useful for controlling external MIDI hardware.
