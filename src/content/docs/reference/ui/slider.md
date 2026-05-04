---
title: Slider
description: Adjustable slider control for direct voltage output.
---


<!-- module-screenshot:begin -->
<img src="../../../images/modules/slider.png" alt="Slider module" class="se-module-screenshot" />
<!-- module-screenshot:end -->


The **Slider** provides a draggable control for setting a voltage value directly. It can be configured for different visual appearances and can send MIDI controller messages.

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| Signal Out | Audio | Control voltage output |

## Parameters

| Property | Description |
|----------|-------------|
| MIDI Controller ID | Assign a MIDI CC number for external control |
| Ignore Program Change | Prevent preset changes from affecting this slider |
| MIDI NRPN | Use NRPN instead of standard CC |
| Lo Value | Minimum output voltage |
| Hi Value | Maximum output voltage |
| Appearance | Visual style |
| Show Readout | Display the current value |
| Show Title On Panel | Display the slider name on the panel |
| Hint | Tooltip text |
