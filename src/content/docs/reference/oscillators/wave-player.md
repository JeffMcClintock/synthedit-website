---
title: Wave Player
description: Plays WAV audio files from disk with pitch control.
---


<!-- module-screenshot:begin -->
<img src="/images/modules/wave-player.png" alt="Wave Player module" class="se-module-screenshot" />
<!-- module-screenshot:end -->

The **Wave Player** streams WAV files from disk, supporting files of any size. It can play back samples with pitch shifting and supports loop points defined in external wave editors.

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| Gate | Audio | Triggers playback (> 0V = play) |
| Pitch Shift | Audio | Pitch offset (1V/octave) |
| File Name | Text | Path to the WAV file |

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| Left Out | Audio | Left channel output |
| Right Out | Audio | Right channel output |

## Usage Notes

- Files are streamed from disk, so there's no size limit
- The module assumes all samples are tuned to 440 Hz (Middle A). Add a pitch offset if your sample is at a different pitch.
- Loop points set in a wave editor (e.g., loop start/end markers in the WAV file) are respected
- Limited to approximately 50–100 Wave Player modules per patch due to Windows file handle limits
