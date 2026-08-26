---
title: MIDI Player
description: Plays MIDI files with high-resolution timing.
---


<!-- module-screenshot:begin -->
<img src="../../../images/modules/midi-player.png" alt="MIDI Player module" class="se-module-screenshot" />
<!-- module-screenshot:end -->


:::caution[Legacy module]
Kept under the **Old** category so older projects still load. For new patches use
**[MIDI Player2](../midi-player2/)**, which follows the host's tempo by default and adds
**Trigger** and **Gate** inputs for driving playback from the patch.
:::


The **MIDI Player** loads and plays standard MIDI files (.mid) with high-resolution timing accuracy, better than routing through external software.

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| File Name | Text | Path to the .mid file |
| Tempo | Control | Playback tempo (10V = 100 BPM) |

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| MIDI Out | MIDI | MIDI playback data |

## Parameters

| Property | Description |
|----------|-------------|
| Ignore MIDI Tempo Changes | Override tempo changes embedded in the MIDI file |
| Loop Mode | Loop playback continuously |

## Usage

The MIDI Player is recommended for [Rendering to Disk](../../../guides/rendering-to-disk/) workflows, providing rock-solid timing without any real-time latency issues.
