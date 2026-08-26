---
title: Volts to Float
description: Measures audio signal level and converts to a parameter value.
---


<!-- module-screenshot:begin -->
<img src="../../../images/modules/voltstofloat.png" alt="Volts to Float module" class="se-module-screenshot" />
<!-- module-screenshot:end -->


:::caution[Legacy module]
Kept under the **Old** category so older projects still load. For new patches use
**[Volts to Float2](../volts-to-float2/)** under **Conversion** — the plugs are identical.
:::


The **Volts to Float** module measures the level of an audio signal and converts it to a control parameter value. Used internally in VU meters and similar display modules.

## Usage Notes

- Multiple volume measuring methods are available
- Slower sample rates are more CPU-efficient but update the display less frequently
- Faster sample rates provide smoother meter response
