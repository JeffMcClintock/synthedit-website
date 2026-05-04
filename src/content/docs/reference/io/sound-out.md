---
title: Sound Out
description: Sends audio to the soundcard output.
---


<!-- module-screenshot:begin -->
<img src="../../../images/modules/sound-out.png" alt="Sound Out module" class="se-module-screenshot" />
<!-- module-screenshot:end -->


The **Sound Out** module sends audio to your soundcard's output for monitoring.

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| Channel 1–12 | Audio | Up to 12 audio output channels |

## Usage Notes

- Only one Sound Out module is allowed per project
- Only functions in the SynthEdit editor — inactive when running as a VST plugin
- Unregistered SynthEdit is limited to 2 output channels
- For offline rendering, replace Sound Out with a [Wave Recorder](/reference/io/wave-recorder/)
