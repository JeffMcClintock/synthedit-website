---
title: Patch Select
description: Stores and recalls up to 128 presets.
---

The **Patch Select** module stores and recalls up to 128 patches (preset configurations of all controls in the container). It responds to MIDI Program Change messages.

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| Channel | Control | MIDI channel to respond to |
| MIDI In | MIDI | Receives program change messages |

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| MIDI Out | MIDI | Transmits program change messages |

## Usage Notes

- Patches store control settings only, not the patch structure (module connections)
- The module uses hidden internal connections to read/write control values — don't connect controls directly to its pins
- Exception: a List Entry connected to the Channel pin is safe
