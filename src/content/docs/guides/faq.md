---
title: Frequently Asked Questions
description: Common questions and troubleshooting tips for SynthEdit.
---

## General

### What platforms does SynthEdit run on?

SynthEdit runs on **Windows 10 and later** (64-bit). A **macOS** version is also available. See the [Installation](/guides/installation/) page for download links.

### Can I distribute plugins I create with SynthEdit?

Yes. SynthEdit plugins are **royalty-free** — you can distribute or sell them without any ongoing fees.

## Audio Issues

### I'm getting clicks or glitches during playback

- **Increase the audio buffer size** in Edit > Preferences > Audio & MIDI
- **Use ASIO drivers** for lower and more consistent latency
- **Close other applications** that may be competing for CPU
- **Reduce polyphony** if your patch is CPU-heavy
- Check the CPU meter in the toolbar — if it's near 100%, your patch needs optimization

### Notes are getting "stuck" (playing forever)

This usually happens when an envelope gate signal doesn't close properly:
- Make sure the **ADSR Gate input** is connected to the MIDI-to-CV module's **Gate output**
- Verify the **VCA** is connected to the envelope — without amplitude control, the oscillator plays continuously
- Try using the **Trigger to MIDI** module if buttons or triggers are causing stuck notes

### The Volt Meter shows unexpected values in a polyphonic patch

The Volt Meter only displays one voice at a time. In a polyphonic container, set the Volt Meter's container **Polyphony to 1** to see a consistent reading from a single voice.

## VST Plugins

### My VST plugin file is large

The minimum VST file size is approximately **2 MB** because it includes all of SynthEdit's built-in modules. Soundfonts, images, and custom modules add to this size.

### How do I distribute SoundFonts with my VST?

Place the SoundFont file in the same folder as your VST plugin (e.g., `C:\Program Files\Common Files\VST3\MyPlugin\`). Use **relative paths** (not full drive paths) for the SoundFont filename in your patch. Create an installer that copies both the VST and SoundFont together.

### Can I use uncommon fonts in my plugin's panel?

Avoid uncommon fonts — they may not be installed on your users' systems. Stick to standard Windows fonts for reliable display.

## Performance

### How can I reduce CPU usage?

See the full [Optimizing CPU Usage](/guides/optimizing-cpu/) guide. Key tips:
- Minimize modules in the audio signal path
- Place effects outside the polyphonic voice container
- Use VCA modules for proper sleep mode activation
- Mute unused modules during development

### Why does my patch use more CPU when no notes are playing?

Some modules don't enter sleep mode if they receive a non-zero constant signal. Check that your signal chain properly drops to zero when no notes are active. The **Denormal Detector** module can help identify modules processing very small (inaudible) values that prevent sleep mode.
