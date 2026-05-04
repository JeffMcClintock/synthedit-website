---
title: Optimizing CPU Usage
description: Tips for reducing CPU usage in SynthEdit patches.
---

Audio processing is computationally expensive. Understanding how SynthEdit handles CPU resources helps you build more efficient patches.

## Audio vs. Control Rate

Audio-rate signals (blue patch cords) are processed at the full sample rate (e.g., 44,100 times per second). Control-rate signals update much less frequently. The key to optimization: **minimize the number of modules in the audio signal path.**

## Sleep Mode

SynthEdit's most powerful optimization is **sleep mode**. When a module's input signal flatlines (becomes a constant value), the module suspends processing and uses almost no CPU.

### How Sleep Mode Works

Consider a VCA controlled by an ADSR envelope:
- While a note plays, both the VCA and everything before it are active
- When the envelope's release phase completes and the output reaches 0V, the VCA detects a flat-line input
- The VCA and all upstream modules enter sleep mode
- CPU usage drops to near zero for that voice

### Designing for Sleep Mode

- **Use VCA modules** for amplitude control — they properly trigger sleep mode when volume reaches zero
- **Avoid Level Adj for volume envelopes** — while functionally similar, the VCA is specifically optimized for sleep detection
- Place the VCA early in the signal chain so that upstream modules also sleep

<img src="../../images/guides/optimizing-cpu/01-vca-placement.png" alt="A sleep-friendly voice: Oscillator into SV Filter into VCA into Sound Out, with the ADSR's Signal Out driving the VCA's Volume input. When the envelope ends, the VCA's output flatlines and every upstream module enters sleep mode" />

When the ADSR's release phase ends, the VCA's output flatlines at zero. The VCA detects the flat-line input and goes to sleep — and because the oscillator and filter are upstream of the VCA, they sleep too. CPU for that voice drops to near zero until the next note arrives.

## Reducing Module Count

- Use the simplest module that does the job — a **1 Pole LP** filter uses less CPU than an **SV Filter**
- Avoid unnecessary monitoring modules (Scope, Volt Meter) in finished patches
- Remove any unused modules

## Polyphony Optimization

- **Place effects outside the voice container.** Reverb, chorus, and delay should be monophonic (after the Voice Combiner), not cloned for each voice.
- **Set appropriate voice counts.** Don't set 128 voices if your patch only needs 8. While unused voices sleep, the overhead isn't zero.
- SynthEdit analyzes signal flow and only clones modules that actually need to be polyphonic.

## Muting Modules

You can mute individual modules in Structure View to temporarily disable them. This is useful for debugging CPU usage — mute modules to see which ones are consuming the most resources.

Access via right-click > **Mute** in the Structure View.
