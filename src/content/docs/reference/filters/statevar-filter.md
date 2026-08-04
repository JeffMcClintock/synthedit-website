---
title: StateVar Filter
description: Virtual-analogue state variable filter with audio-rate cutoff and resonance, built on a topology-preserving transform.
---


<!-- module-screenshot:begin -->
<img src="../../../images/modules/statevar-filter.png" alt="StateVar Filter module" class="se-module-screenshot" />
<!-- module-screenshot:end -->


The **StateVar Filter** is SynthEdit's virtual-analogue state variable filter. It uses a topology-preserving transform (TPT), which keeps the filter's tuning accurate and its behaviour stable even while the cutoff is being swept — including close to the Nyquist frequency, where older designs lose accuracy and start to sound muffled.

Both **Pitch** (cutoff) and **Resonance** are audio-rate inputs, recalculated every sample rather than once per processing block. At high resonance this is what keeps a swept cutoff smooth instead of stepping audibly.

Hear it in the [audio demos](../../../guides/audio-demos/).

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| Signal | Audio | Audio input to filter |
| Pitch | Audio | Cutoff frequency (1V/octave, 5V = 440 Hz) |
| Resonance | Audio | Resonance / Q amount |

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| Output | Audio | Filtered output, in the selected mode |

## Parameters

| Property | Description |
|----------|-------------|
| Mode | Low Pass, High Pass, Band Pass or Band Reject |
| Strength | `1-Stage` (6 dB/octave) or `2-Stage` (12 dB/octave) rolloff |

## Usage

Patch an envelope or LFO into **Pitch** for a swept filter. Because **Pitch** is an ordinary audio-rate pin, you can also patch an audio oscillator into it — the filter will track it at full rate.

Raising **Resonance** emphasises the frequencies around the cutoff. Combined with an envelope sweep and `2-Stage` strength, this gives the classic subtractive-synth filter sweep.

If you need several filter types from the same input at once, the **StateVar Filter (multi)** variant provides low-pass, high-pass, band-pass and band-reject outputs simultaneously.

For a heavier, more saturated character see the [Moog Filter](../moog-filter/). The older [SV Filter](../sv-filter/) remains available for compatibility with existing projects.
