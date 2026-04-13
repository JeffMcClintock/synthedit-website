---
title: Sample and Hold
description: Captures and holds an input voltage on a trigger.
---


<!-- module-screenshot:begin -->
<img src="/images/modules/sample-and-hold.png" alt="Sample And Hold module" class="se-module-screenshot" />
<!-- module-screenshot:end -->


The **Sample and Hold** captures the input voltage at the moment it receives a trigger and holds that value until the next trigger.

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| Audio | Audio | Signal to sample |
| Hold | Audio | Trigger input — samples on rising edge |

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| Output | Audio | Held voltage output |

## Usage

Classic use: connect a noise source to the Audio input and a clock/LFO to the Hold input to generate stepped random voltages — the classic sample-and-hold random melody or modulation effect.
