---
title: Denormal Detector
description: Diagnostic tool to detect denormal numbers in a signal.
---

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

Use this as a diagnostic tool to find modules that produce denormals, then apply a [Denormal Cleaner](/reference/math/denormal-cleaner/) at the source.
