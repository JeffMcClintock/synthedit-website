---
title: Random Voltage
description: Generates a random voltage on each trigger.
---


<!-- module-screenshot:begin -->
<img src="../../../images/modules/random.png" alt="Random Voltage module" class="se-module-screenshot" />
<!-- module-screenshot:end -->


:::caution[Legacy module]
Kept under the **Old** category so older projects still load. For new patches use
**[Random Voltage2](../random-voltage2/)**, which is the same idea with a control-rate output that
lets downstream modules sleep between triggers.
:::


The **Random Voltage** module generates a new random voltage each time its trigger input goes high. This is a convenient alternative to using a noise source with a Sample and Hold module.

## Usage

Connect a clock or gate signal to trigger random voltage changes. Useful for random modulation, generative patches, and adding variation to parameters like filter cutoff or pitch.
