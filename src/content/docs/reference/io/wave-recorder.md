---
title: Wave Recorder
description: Records audio output to WAV files.
---


<!-- module-screenshot:begin -->
<img src="../../../images/modules/wave-recorder.png" alt="Wave Recorder module" class="se-module-screenshot" />
<!-- module-screenshot:end -->


The **Wave Recorder** records audio to WAV files on disk. It supports recording multiple tracks simultaneously and is essential for [Rendering to Disk](/guides/rendering-to-disk/).

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| Left (Mono) | Audio | Left channel / mono input |
| Right | Audio | Right channel input |
| File Name | Text | Output file path |

## Parameters

| Property | Description |
|----------|-------------|
| Format | Audio bit depth |
| Time Limit | Maximum recording length in seconds |
| Play Wavefile | Auto-play the file after recording |
| Report Stats | Display rendering statistics |
