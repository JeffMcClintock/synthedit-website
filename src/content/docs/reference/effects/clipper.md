---
title: Clipper
description: Restricts signal voltage to a defined range.
---


<!-- module-screenshot:begin -->
<img src="/images/modules/clipper.png" alt="Clipper module" class="se-module-screenshot" />
<!-- module-screenshot:end -->


The **Clipper** restricts the input signal to a voltage range between two limits. Voltages above the high limit or below the low limit are clamped.

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| Signal In | Audio | Audio input |
| Hi Limit | Audio | Upper voltage limit |
| Lo Limit | Audio | Lower voltage limit |

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| Signal Out | Audio | Clipped output |

## Usage

- **Hard clipping distortion:** Set tight limits on an audio signal
- **Limiting control voltages:** Prevent CV signals from exceeding a safe range
