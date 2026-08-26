---
title: Denormal Detector
description: Diagnostic tool to detect denormal numbers in a signal.
---


<!-- module-screenshot:begin -->
<img src="../../../images/modules/denormal-detector.png" alt="Denormal Detector module" class="se-module-screenshot" />
<!-- module-screenshot:end -->


:::note[Rarely needed now]
SynthEdit scrubs denormals automatically, using the CPU's floating-point register flags — the
processor is simply told to flush these values to zero, across the whole engine, at no cost. You
should not need to place denormal modules in a patch. They remain for the unusual case of a
third-party module that manages to produce denormals anyway.
:::


The **Denormal Detector** indicates whether denormal numbers are present in the input signal. Connect its output to an LED Indicator for visual detection.

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| Signal In | Audio | Signal to analyze |

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| Signal Out | Audio | Detection output (high when denormals present) |

## Usage

Use this as a diagnostic tool to find modules that produce denormals, then apply a [Denormal Cleaner](../../../reference/math/denormal-cleaner/) at the source.
