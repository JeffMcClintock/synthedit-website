---
title: Peak Follower
description: Tracks the amplitude envelope of an audio signal.
---


<!-- module-screenshot:begin -->
<img src="../../../images/modules/peak-follower.png" alt="Peak Follower module" class="se-module-screenshot" />
<!-- module-screenshot:end -->


The **Peak Follower** outputs a control voltage that tracks the level (amplitude envelope) of the input signal. Useful for envelope following, ducking, and dynamics processing.

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| Signal In | Audio | Audio signal to analyze |
| Attack | Audio | Attack response time (10V = 200 ms) |
| Decay | Audio | Decay/release response time (10V = 200 ms) |

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| Signal Out | Audio | Envelope-following output |

## Usage Notes

- The Peak Follower is frequency-dependent: it responds slower to low frequencies and faster to high frequencies
- For consistent tracking across the frequency range, use longer attack and decay times
- Multiply the control voltage by 20 to get the time in milliseconds (1V = 20 ms)
