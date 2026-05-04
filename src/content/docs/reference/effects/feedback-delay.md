---
title: Feedback Delay
description: Enables feedback paths between modules by introducing a small delay.
---


<!-- module-screenshot:begin -->
<img src="../../../images/modules/feedback-delay.png" alt="Feedback - Volts module" class="se-module-screenshot" />
<!-- module-screenshot:end -->


The **Feedback Delay** module allows backward signal routing (feedback loops) that would otherwise not be possible due to SynthEdit's block-based processing. It introduces a delay of approximately 100 samples (~2 ms at 44.1 kHz).

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| Audio In | Audio | Signal from later in the chain |

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| Audio Out | Audio | Delayed signal routed back to earlier in the chain |
| Delay Time Out | Control | Reports the exact delay time in milliseconds |

## Usage

Use this module only when you need to create a feedback path between separate modules. The standard Delay module handles its own internal feedback without needing this module.

See the [Feedback Paths guide](/guides/feedback-paths/) for details.
