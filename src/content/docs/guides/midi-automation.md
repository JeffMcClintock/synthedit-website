---
title: MIDI Automation
description: Automating synth parameters with MIDI controllers and the Patch Automator.
---

MIDI automation lets you control your synthesizer's parameters from an external MIDI controller, sequencer, or DAW.

## Patch Automator

The **Patch Automator** module is what links MIDI controller messages to your synth's controls. Insert it into a container and the controls in that container can be assigned to MIDI CCs.

It is not what makes your controls automatable *by a host DAW* — they already are, simply by being inside the container you export. The Patch Automator is specifically about MIDI: CCs coming in, and CCs going back out when a control moves.

### Setup

1. Insert a **Patch Automator** module into your container
2. Connect your MIDI source to its **MIDI In**
3. Take its **MIDI Out** onward to your plugin's MIDI output — not into another module
4. Open its configuration dialog to assign controllers

<img src="../../images/guides/midi-automation/01-patch-automator.png" alt="MIDI In fans out to two branches: one to a MIDI-CV 2 that drives the oscillator's pitch, the other to a Patch Automator whose MIDI Out goes on to a MIDI Out module. A Slider2 controls the oscillator's pulse width." />

Wire it **across** the patch rather than **through** it. Your MIDI source branches: one cord to the MIDI-CV 2 that plays the notes, another to the Patch Automator's **MIDI In**. Assigned CC messages arriving there get translated into parameter changes for any control in the same container.

The **MIDI Out** side is the half that's easy to miss. The Patch Automator transmits a MIDI message whenever a parameter changes, so a knob moved on your panel sends its assigned CC out — to the host, or to external hardware. Running that output on to your plugin's MIDI output is what makes the Patch Automator span the whole plugin: MIDI in one side, MIDI out the other.

:::caution[Never feed another module from the Patch Automator]
Its **MIDI Out** should reach your plugin's MIDI output and nothing else. Do not run it into a
MIDI-CV 2, or into any other module — putting your note stream through the Patch Automator is
abnormal wiring, and not what the module is designed to do. Branch your MIDI source instead, as
above.
:::

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

A DAW can automate your controls whether or not a Patch Automator is present — they are exposed as plugin parameters because they sit inside the exported container. What the Patch Automator adds is the MIDI layer on top: your CC assignments keep working in the host, and parameter changes are transmitted back out as MIDI. See [Creating VST Plugins](../creating-vst-plugins/).

## Important Notes

- **Avoid feedback loops:** Don't connect controls or Patch Memory modules back into the Patch Automator's MIDI input — this creates a feedback loop.
- **Exception:** A simple List Entry connected to the Channel pin is safe.
- **Keep it out of the note path.** Branch your MIDI source to it; never wire its MIDI Out into another module.
- The Patch Automator sends MIDI messages when controls change, which is useful for controlling external MIDI hardware.
