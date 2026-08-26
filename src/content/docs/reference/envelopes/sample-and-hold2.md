---
title: Sample and Hold2
description: Captures the value of a signal on command and holds it steady.
---


<!-- module-screenshot:begin -->
<img src="../../../images/modules/sample-and-hold2.png" alt="Sample and Hold2 module" class="se-module-screenshot" />
<!-- module-screenshot:end -->


**Sample and Hold2** takes a snapshot of whatever is on its input and holds that value steady
until told to take another. It's under **Logic** in the Module Browser, and replaces the
**Old**-category [Sample and Hold](../sample-and-hold/).

The difference is the **Hold** input, which is now a plain boolean rather than a voltage — so it
wires directly to gates, comparators and logic modules without a conversion step.

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| Audio | Audio | The signal to sample |
| Hold | Bool | While true, the output freezes at the value captured when Hold went true |

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| Output | Audio | The held value |

## Usage

The classic use is stepped random modulation: feed
[Random Voltage2](../random-voltage2/) or a noise source into **Audio**, clock **Hold** from an
LFO or from a [MIDI-CV 2](../../midi/midi-cv-2/)'s **Trigger**, and the output becomes a new
random level on every note or every clock tick — a sample-and-hold filter sweep.

It's equally useful for freezing a control that would otherwise drift: latch a velocity, or hold a
pitch while the source keeps moving.
