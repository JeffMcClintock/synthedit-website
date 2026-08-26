---
title: Denormal Cleaner
description: Removes denormal numbers to prevent CPU spikes.
---


<!-- module-screenshot:begin -->
<img src="../../../images/modules/denormal-cleaner.png" alt="Denormal Cleaner module" class="se-module-screenshot" />
<!-- module-screenshot:end -->


:::note[Rarely needed now]
SynthEdit scrubs denormals automatically, using the CPU's floating-point register flags — the
processor is simply told to flush these values to zero, across the whole engine, at no cost. You
should not need to place denormal modules in a patch. They remain for the unusual case of a
third-party module that manages to produce denormals anyway.
:::


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

Denormal handling is engine-wide and automatic, so in practice this module has nothing left to do. It is kept for older patches that already contain one, and for the rare third-party module that still manages to emit denormals.

Use the [Denormal Detector](../../../reference/math/denormal-detector/) to identify where denormals occur in your patch.
