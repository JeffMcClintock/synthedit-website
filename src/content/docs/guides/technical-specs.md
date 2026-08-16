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
| **Block Size** | ~96 samples per processing block |

Audio signals, control voltages, and envelopes are all carried on **Audio pins**, and all process at the full sample rate — this eliminates "zipper noise" artifacts that can occur in systems that process control signals at a lower rate. There's no separate, slower "control rate" in the engine.

What keeps full-rate control voltages affordable is a cooperative optimization rather than a lower rate: a module can flag its output as static (steady rather than actively changing), and a module downstream can then assume every sample in the block equals that value instead of doing real per-sample work. See [Optimizing CPU Usage](../optimizing-cpu/#full-sample-rate-and-the-static-signal-optimization) for how this scales up to full Sleep Mode.

Separately, rarely-touched configuration values (a MIDI channel selector, a checkbox) use lighter-weight **Float pins**, which send a new value only when it changes rather than living in the audio-rate signal path — see the FAQ on [Audio pins vs. Float pins](../faq/#what-is-the-difference-between-audio-pins-and-float-pins).

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

Feedback loops are not directly supported due to the block-based processing architecture. Use the **Feedback - Volts** module to create feedback paths, which introduces a minimum delay of approximately one processing block. See [Feedback Paths](../feedback-paths/) for details.

## System Requirements

| Platform | Minimum |
|------------|---------|
| **Windows** | Windows 10 version 1809 (build 17763) or later, 64-bit |
| **macOS** | Apple Silicon (M1 or later), macOS Tahoe or later |
| **Linux** (experimental) | 64-bit x86, glibc 2.39+, a Wayland desktop session |
| **Processor** | Any modern 64-bit CPU |
| **RAM** | Depends on patch complexity |

See the [Installation](../installation/) page for the full per-platform requirements and download links.

## File Formats

| Format | Extension | Use |
|--------|-----------|-----|
| SynthEdit Project | `.synthedit` | Native project files |
| VST Plugin | `.vst3` | Exported plugins |
| Wave Audio | `.wav` | Audio rendering output |
| MIDI | `.mid` | Sequence input |
| SoundFont | `.sf2` | Sample-based oscillator source |
