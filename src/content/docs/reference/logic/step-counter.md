---
title: Step Counter
description: Sequential counter that activates outputs one at a time.
---


<!-- module-screenshot:begin -->
<img src="/images/modules/step-counter.png" alt="Step Counter (old?) module" class="se-module-screenshot" />
<!-- module-screenshot:end -->


The **Step Counter** activates each output in sequence on every clock pulse. Only one output is active (5V) at a time.

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| Clock | Audio | Advances to next step on rising edge |
| Reset | Audio | Returns to first step |

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| Out 1–N | Audio | Sequential step outputs (configurable count) |

## Usage Notes

For reliable step reset, use a **Feedback Delay** module in the reset path to avoid timing issues.
