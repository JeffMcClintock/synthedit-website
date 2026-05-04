---
title: Technical Specifications
description: Internal audio specifications and technical details of SynthEdit.
---

## Audio Processing

| Specification | Detail |
|--------------|--------|
| **Internal Bit Depth** | 32-bit floating point |
| **Output Bit Depth** | 16-bit or 32-bit |
| **Sample Rate** | Supports any sample rate; all signals processed at the same rate |
| **Block Size** | ~100 samples per processing block |

All signals — audio, control voltages, and envelopes — are processed at the full sample rate. This eliminates "zipper noise" artifacts that can occur in systems that process control signals at a lower rate.

SynthEdit generates waveforms at runtime (not from pre-recorded samples), so oscillators work correctly at any sample rate without aliasing issues.

## Latency

Audio latency depends on your driver and buffer settings:

| Driver | Typical Latency |
|--------|----------------|
| **ASIO** | Very low (depends on hardware) |
| **DirectSound** | Adjustable via Play Ahead buffer setting |

Configure audio drivers and buffer sizes in **Edit > Preferences > Audio & MIDI**.

## Polyphony

| Setting | Value |
|---------|-------|
| **Default Voices** | 6 |
| **Maximum Voices** | 128 |
| **Voice Management** | Automatic sleep mode for inactive voices |

## Feedback Loops

Feedback loops are not directly supported due to the block-based processing architecture. Use the **Feedback Delay** module to create feedback paths, which introduces a minimum delay of approximately one processing block.

## System Requirements

| Requirement | Minimum |
|------------|---------|
| **Operating System** | Windows 10 or later (64-bit) |
| **Processor** | Any modern 64-bit CPU |
| **RAM** | Depends on patch complexity |

## File Formats

| Format | Extension | Use |
|--------|-----------|-----|
| SynthEdit Project | `.synthedit` | Native project files |
| VST Plugin | `.vst3` | Exported plugins |
| Wave Audio | `.wav` | Audio rendering output |
| MIDI | `.mid` | Sequence input |
| SoundFont | `.sf2` | Sample-based oscillator source |
