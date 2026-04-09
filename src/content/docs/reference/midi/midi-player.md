---
title: MIDI Player
description: Plays MIDI files with high-resolution timing.
---

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

The MIDI Player is recommended for [Rendering to Disk](/guides/rendering-to-disk/) workflows, providing rock-solid timing without any real-time latency issues.
