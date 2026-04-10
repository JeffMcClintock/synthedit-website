---
title: Delay
description: Audio delay/echo effect with modulation and feedback.
---


<!-- module-screenshot:begin -->
<img src="/images/modules/delay.png" alt="Delay module" class="se-module-screenshot" />
<!-- module-screenshot:end -->

The **Delay** module creates delay and echo effects with adjustable delay time, feedback, and optional time modulation for chorus and flanger effects.

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| Signal In | Audio | Audio input |
| Modulation | Audio | Delay time modulation (0–10V sweeps from 0 to max delay time) |
| Feedback | Audio | Feedback amount — portion of output fed back into input |

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| Signal Out | Audio | Delayed audio output |

## Parameters

| Property | Description |
|----------|-------------|
| Delay Time | Maximum delay time (up to 10 seconds) |
| Interpolate Output | Smooths output when modulating delay time (reduces clicks) |

## Usage

- For simple echo: set a fixed delay time and adjust feedback for the number of repeats
- For chorus: use a slow LFO on the Modulation input with a short delay time (10–30 ms)
- For flanger: use a slow LFO on the Modulation input with a very short delay time (1–10 ms) and moderate feedback
- The Feedback input handles internal feedback — no need for a Feedback Delay module
