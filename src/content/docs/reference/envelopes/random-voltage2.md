---
title: Random Voltage2
description: Produces a new random voltage each time it is triggered.
---


<!-- module-screenshot:begin -->
<img src="../../../images/modules/se-random-voltage.png" alt="Random Voltage2 module" class="se-module-screenshot" />
<!-- module-screenshot:end -->


**Random Voltage2** puts out a fresh random value every time its trigger input rises. It's under
**Special** in the Module Browser, and replaces the **Old**-category
[Random Voltage](../random-voltage/).

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| Trigger in | Bool | A new random value is generated on each rising edge |

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| Output | Control | The current random value, held until the next trigger |

## Usage

Wire **Trigger in** from a [MIDI-CV 2](../../midi/midi-cv-2/)'s **Trigger** output and every note
gets its own random value — the standard way to add analogue-style variation to a patch. Route
the output at a small depth into an oscillator's Pitch for subtle detune per note, into a filter's
cutoff for a different tone colour each time, or into a VCA for varying accent.

The output is a control-rate value rather than an audio-rate signal: it changes only when
triggered, and stays flat in between. Where the old module put out an audio-rate signal, this one
does not, which is what lets downstream modules treat it as static and sleep — see
[Optimizing CPU](../../../guides/optimizing-cpu/).

For a random value that is captured from another signal rather than generated, see
[Sample and Hold2](../sample-and-hold2/).
