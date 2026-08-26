---
title: ADSR2
description: Four-stage envelope generator with a separate Trigger input for retriggering.
---


<!-- module-screenshot:begin -->
<img src="../../../images/modules/adsr2.png" alt="ADSR2 module" class="se-module-screenshot" />
<!-- module-screenshot:end -->


**ADSR2** is the current four-stage envelope generator — Attack, Decay, Sustain, Release — and
the one to reach for in new patches. It sits under **Waveform** in the Module Browser.

It's the older [ADSR](../adsr/) plus a dedicated **Trigger** input, which is what lets an
envelope restart cleanly on a repeated note instead of waiting for the gate to fall and rise
again.

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| Trigger | Audio | Restarts the envelope from its attack stage on a rising edge, even while Gate is still high |
| Gate | Audio | Note on/off — the envelope attacks on a rising edge and releases on a falling one |
| Attack | Audio | Attack time |
| Decay | Audio | Decay time |
| Sustain | Audio | Sustain level (0–10 V) |
| Release | Audio | Release time |
| Overall Level | Audio | Scales the whole envelope output |

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| Signal Out | Audio | Envelope output (0–10 V) |

## Usage

Wire a [MIDI-CV 2](../../midi/midi-cv-2/)'s **Gate** to **Gate**, and the envelope's **Signal
Out** to a [VCA](../vca/)'s **Volume**. That pair — envelope into VCA — is how a note gets a
beginning and an end; [Your First Synth](../../../guides/first-synth/) builds it step by step.

Attack, Decay and Release are *times*, expressed as voltages on an exponential scale: each extra
volt roughly doubles the time, and negative voltages give shorter times. Sustain is a *level*,
0–10 V. See [Signal Types & Levels](../../../guides/signal-types/).

Typical destinations for the output:

- **Amplitude envelope** — into a [VCA](../vca/)'s Volume input
- **Filter envelope** — into a filter's Pitch (cutoff) input
- **FM envelope** — into an oscillator's Phase Mod depth, see [FM Synthesis](../../../guides/fm-synthesis/)

### Trigger versus Gate

Drive **Gate** alone and a note played while the previous key is still held has no rising edge to
attack on — the envelope simply carries on. Drive **Trigger** as well, from MIDI-CV 2's
**Trigger** output, and every new note restarts the envelope with no latency. That's what makes
repeated notes sound articulated rather than smeared together.
