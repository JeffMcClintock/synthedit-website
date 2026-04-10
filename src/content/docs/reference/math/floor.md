---
title: Floor
description: Rounds down to the next whole voltage value.
---


<!-- module-screenshot:begin -->
<img src="/images/modules/floor.png" alt="Floor module" class="se-module-screenshot" />
<!-- module-screenshot:end -->

The **Floor** module rounds the input voltage down to the next whole number (e.g., 4.7V becomes 4.0V).

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| Signal In | Audio | Signal to round |

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| Signal Out | Audio | Rounded-down output |

## Note

May give unexpected results with very large numbers due to floating-point precision limits.
