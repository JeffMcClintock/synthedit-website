---
title: Monostable
description: Produces a fixed-length pulse when triggered.
---


<!-- module-screenshot:begin -->
<img src="/images/modules/monostable.png" alt="Monostable module" class="se-module-screenshot" />
<!-- module-screenshot:end -->


The **Monostable** produces a single pulse of a fixed duration each time it is triggered. Also known as a "one-shot."

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| Signal In | Audio | Trigger input (fires on rising edge) |
| Pulse Length | Audio | Duration of output pulse (10V = 1 second) |

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| Signal Out | Audio | Pulse output (0V or 5V) |
