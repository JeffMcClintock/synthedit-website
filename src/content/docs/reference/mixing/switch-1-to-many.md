---
title: Switch (1 to Many)
description: Routes a single input to one of multiple outputs.
---


<!-- module-screenshot:begin -->
<img src="../../../images/modules/switch-1-many.png" alt="Switch (1 to Many) module" class="se-module-screenshot" />
<!-- module-screenshot:end -->


The **Switch (1 to Many)** routes a single input signal to one of several outputs based on a selection voltage.

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| Choice | Control | Selects which output receives the signal |
| Input | Audio | Signal to route |

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| Output 1–N | Audio | Multiple outputs (new outputs auto-created when connected) |

## Usage

New output pins are automatically created as you connect to them. Only the selected output receives the input signal; all others output silence.
