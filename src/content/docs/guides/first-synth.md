---
title: Your First Synth
description: A step-by-step guide to building a simple synthesizer in SynthEdit.
---

This tutorial walks you through building a basic subtractive synthesizer from scratch. By the end, you'll have a playable synth with an oscillator, filter, envelope, and volume control.

## Step 1: Create a New Project

Open SynthEdit and create a new blank project. You'll see an empty canvas — this is where you'll build your synth.

## Step 2: Add an Oscillator

Right-click on the canvas and select **Insert Module**. Search for **Oscillator** and add it to the canvas. This generates the raw waveform for your synth.

The oscillator module has several outputs for different waveforms:
- **Saw** — bright, buzzy tone
- **Square/Pulse** — hollow, reedy tone  
- **Sine** — pure, smooth tone

## Step 3: Add a Filter

Insert a **SV Filter** module. Connect the oscillator's **Saw** output to the filter's **Signal** input. The filter shapes the tone by removing frequencies above the cutoff point.

## Step 4: Add an Envelope

Insert an **ADSR Envelope** module. Connect it to the filter's **Cutoff** input. This gives the filter movement over time — the classic synthesizer "sweep."

## Step 5: Connect MIDI

Insert a **MIDI to CV** module. Connect:
- **Pitch** output to the oscillator's **Pitch** input
- **Gate** output to the envelope's **Gate** input

Now your synth responds to MIDI notes.

## Step 6: Add Output

Insert a **Sound Out** module and connect the filter's output to it. You should now be able to play your synth using a MIDI keyboard or the on-screen keyboard.

## Next Steps

- Experiment with different oscillator waveforms
- Add a second envelope for volume shaping
- Try adding effects like **Delay** or **Reverb**
- Read about [Working with Modules](/guides/modules/) for more detail
