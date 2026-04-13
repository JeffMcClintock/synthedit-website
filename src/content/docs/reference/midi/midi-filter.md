---
title: MIDI Filter
description: Filters MIDI data by channel, velocity, and note range.
---


<!-- module-screenshot:begin -->
<img src="/images/modules/midi-filter.png" alt="MIDI Filter module" class="se-module-screenshot" />
<!-- module-screenshot:end -->


The **MIDI Filter** selectively passes MIDI data based on channel, note range, and velocity range. Useful for keyboard splits, velocity switching, and channel routing.

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| MIDI In | MIDI | MIDI data to filter |
| Channel Lo/Hi | Control | MIDI channel range (1–16) |
| Note Lo/Hi | Control | Note number range (0–127) |
| Velocity Lo/Hi | Control | Velocity range (0–127) |

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| MIDI Out | MIDI | Filtered MIDI data |

## Usage

- **Keyboard split:** Set Note Lo/Hi to divide the keyboard between two synth patches
- **Velocity switching:** Route soft notes to one sound and hard notes to another
- **Channel filtering:** Isolate specific MIDI channels
