---
title: Denormal Cleaner
description: Removes denormal numbers to prevent CPU spikes.
---


<!-- module-screenshot:begin -->
<img src="../../../images/modules/denormal-cleaner.png" alt="Denormal Cleaner module" class="se-module-screenshot" />
<!-- module-screenshot:end -->


The **Denormal Cleaner** removes denormal numbers (extremely small floating-point values) from audio signals. Denormal values are inaudible but cause the CPU to switch to a slower processing mode, resulting in spikes and glitchy audio.

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| Signal In | Audio | Signal to clean |

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| Signal Out | Audio | Cleaned signal |

## Usage Notes

SynthEdit's built-in filters and delay modules already include denormal cleaning. This module is mainly needed when using third-party or custom modules that don't handle denormals internally.

Use the [Denormal Detector](/reference/math/denormal-detector/) to identify where denormals occur in your patch.
