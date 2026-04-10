---
title: Comparator
description: Outputs high or low based on comparing two signals.
---


<!-- module-screenshot:begin -->
<img src="/images/modules/comparator.png" alt="Comparator module" class="se-module-screenshot" />
<!-- module-screenshot:end -->

The **Comparator** outputs a high voltage if Input A is greater than Input B, otherwise outputs a low voltage.

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| Input A | Audio | Signal to compare |
| Input B | Audio | Reference signal |

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| Output | Audio | High or Low output voltage |

## Parameters

| Property | Description |
|----------|-------------|
| Hi Out Val | Voltage output when A > B (default: 5V) |
| Lo Out Val | Voltage output when A ≤ B (default: -5V) |
