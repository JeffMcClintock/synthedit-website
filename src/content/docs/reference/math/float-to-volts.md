---
title: Float to Volts
description: Smoothly converts parameter values to audio-rate signals.
---

The **Float to Volts** module converts a control parameter value into a smoothly interpolated audio-rate signal. This is used internally in the Knob prefab and similar controls to prevent clicks when adjusting values.

## Usage Notes

- Multiple smoothing methods are available
- Faster smoothing rates use more CPU but respond more quickly
- Slower rates are more CPU-efficient but may introduce audible lag
