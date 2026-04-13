---
title: Sound In
description: Captures audio from the soundcard input.
---


<!-- module-screenshot:begin -->
<img src="/images/modules/sound-in.png" alt="Sound In module" class="se-module-screenshot" />
<!-- module-screenshot:end -->


The **Sound In** module captures audio from your soundcard's input (line in, microphone, etc., as configured in Preferences).

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| Channel 1–12 | Audio | Up to 12 audio input channels |

## Usage Notes

- Only one Sound In module is allowed per project
- Only functions in the SynthEdit editor — inactive when running as a VST plugin (VST plugins receive audio from the host DAW's routing)
- The active input source is configured in **Edit > Preferences > Audio & MIDI**
