---
title: VCA
description: Voltage Controlled Amplifier for volume and amplitude control.
---


<!-- module-screenshot:begin -->
<img src="../../../images/modules/vca.png" alt="VCA module" class="se-module-screenshot" />
<!-- module-screenshot:end -->


The **VCA** (Voltage Controlled Amplifier) controls the volume of an audio signal. It is a core module in nearly every synthesizer patch, typically paired with an ADSR envelope.

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| Signal | Audio | Audio input |
| Volume | Audio | Volume control (10V = full volume, 0V = silence) |

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| Output | Audio | Amplitude-controlled output |

## Parameters

| Property | Description |
|----------|-------------|
| Response Curve | Volume response: Linear, Exponential, or Decibel |

## Usage

Connect an ADSR envelope to the Volume input to shape note amplitude over time. The VCA is specifically optimized for sleep mode detection — when its volume input reaches zero, it signals upstream modules to suspend processing, saving significant CPU.

For this reason, **always use a VCA** (not Level Adj or Ring Modulator) for amplitude envelopes in your synth voice chain.
