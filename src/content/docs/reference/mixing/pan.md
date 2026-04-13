---
title: Pan
description: Stereo panning and volume control.
---


<!-- module-screenshot:begin -->
<img src="/images/modules/pan.png" alt="Pan module" class="se-module-screenshot" />
<!-- module-screenshot:end -->


The **Pan** module distributes a mono signal between left and right outputs with adjustable volume.

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| Input | Audio | Mono audio input |
| Pan | Audio | Pan position (-5V = full left, 0V = center, +5V = full right) |
| Volume | Audio | Output volume (10V = original level) |

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| Left Out | Audio | Left channel output |
| Right Out | Audio | Right channel output |

## Parameters

| Property | Description |
|----------|-------------|
| Fade Law | Panning curve type |
