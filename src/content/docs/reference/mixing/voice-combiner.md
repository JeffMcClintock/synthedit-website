---
title: Voice Combiner
description: Merges polyphonic voices into a single monophonic signal.
---

The **Voice Combiner** sums all polyphonic voices into a single monophonic signal. Place it at the boundary between your polyphonic voice chain and monophonic effects (reverb, delay, chorus).

## Usage

Any modules placed after the Voice Combiner will not be cloned polyphonically, saving significant CPU. This is essential for efficient patch design — effects that don't need to be per-voice should always be placed after the Voice Combiner.

It can also be used to force a specific signal to monophonic operation, such as triggering a monophonic LFO from a polyphonic gate signal.
