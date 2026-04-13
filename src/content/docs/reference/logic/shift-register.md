---
title: Shift Register
description: Digital delay line that shifts data across stages on each clock pulse.
---


<!-- module-screenshot:begin -->
<img src="/images/modules/shift-register.png" alt="Shift Register module" class="se-module-screenshot" />
<!-- module-screenshot:end -->


The **Shift Register** is a digital delay line for binary data. On each clock pulse, data shifts from one stage to the next across 10 outputs.

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| Clock | Audio | Shifts data on rising edge |
| Input | Audio | Binary data input |
| Reset | Audio | Resets all stages to zero |

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| B0–B9 | Audio | 10 sequential outputs |
