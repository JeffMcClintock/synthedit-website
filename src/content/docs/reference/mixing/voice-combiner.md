---
title: Voice Combiner
description: Merges polyphonic voices into a single monophonic signal.
---


<!-- module-screenshot:begin -->
<img src="../../../images/modules/voice-combiner.png" alt="Voice Combiner module" class="se-module-screenshot" />
<!-- module-screenshot:end -->


The **Voice Combiner** sums all polyphonic voices into a single monophonic signal.

:::note[A specialist module]
Most patches never need one. Voices are already mixed down to a single signal on their way to Sound Out, so the ordinary way to keep an effect monophonic is simply to place it **outside** the voice container — see [Polyphony](../../../guides/polyphony/). Reach for a Voice Combiner only when you need that merge to happen at a specific point *inside* a polyphonic container.

It also counts as a container-level module in its own right, so adding one you don't need is a way to complicate a patch for no gain.
:::

## Usage

Modules placed after the Voice Combiner are not cloned polyphonically. The case that genuinely calls for one is forcing a signal to monophonic operation partway through a voice — triggering a single monophonic LFO from a polyphonic gate signal, for example, rather than getting one LFO per voice.
