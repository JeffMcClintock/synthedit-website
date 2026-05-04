---
title: List Entry
description: Drop-down selection for list-type signal plugs.
---


<!-- module-screenshot:begin -->
<img src="../../../images/modules/list-entry.png" alt="List Entry module" class="se-module-screenshot" />
<!-- module-screenshot:end -->


The **List Entry** module provides a drop-down control for selecting a value from a list (e.g., oscillator waveform selection). It connects to list-type signal plugs on other modules.

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| Choice | List | Selected list value |

## Parameters

| Property | Description |
|----------|-------------|
| MIDI Controller ID | Assign a MIDI CC for external control |
| Ignore Program Change | Prevent preset changes from affecting selection |
| Appearance | Visual style |
| Hint | Tooltip text |

## Usage

The module is resizable using its sizing handle. Connect to any list-type input (green plugs) on other modules to provide user selection.
