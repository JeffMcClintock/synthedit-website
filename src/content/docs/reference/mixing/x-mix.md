---
title: X-Mix (Crossfade)
description: Crossfades between two input signals.
---


<!-- module-screenshot:begin -->
<img src="../../../images/modules/x-mix.png" alt="X-Mix module" class="se-module-screenshot" />
<!-- module-screenshot:end -->


The **X-Mix** (Cross Mix) smoothly blends between two input signals.

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| Input A | Audio | First signal |
| Input B | Audio | Second signal |
| Mix | Audio | Crossfade position (+5V = 100% A, -5V = 100% B) |

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| Signal Out | Audio | Blended output |

## Parameters

| Property | Description |
|----------|-------------|
| Fade Law | Crossfade curve type |
