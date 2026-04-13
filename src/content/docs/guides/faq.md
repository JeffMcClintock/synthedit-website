---
title: Frequently Asked Questions
description: Common questions and troubleshooting tips for SynthEdit.
---

## General

### What platforms does SynthEdit run on?

SynthEdit requires **Windows 10 or later** (64-bit). A **macOS** version is also available. See the [Installation](/guides/installation/) page for download links. Plugins exported from SynthEdit work on Windows 7+ (VST) and macOS 10.8+ (Audio Unit).

### Can I distribute plugins I create with SynthEdit?

Yes. SynthEdit plugins are **royalty-free** — you can distribute or sell them without any ongoing fees.

### What plugin formats can SynthEdit export?

SynthEdit can export **64-bit VST3** and **Mac Audio Unit (AU)** plugins. Experimental JUCE export is also available for additional formats (AAX, CLAP, standalone apps).

### Do I need a Mac to create Audio Unit plugins?

No. SynthEdit on Windows can export Audio Unit plugins. However, you should test your plugin on a Mac before distributing it.

### Can I install multiple versions of SynthEdit side by side?

Yes. Major versions maintain separate settings and do not interfere with each other. You only need one license.

### Is my old SynthEdit license valid for newer versions?

Yes. A single license covers all current versions.

### What keyboard shortcuts are useful?

| Shortcut | Action |
|----------|--------|
| **Ctrl+F** | Search for modules by name |
| **Ctrl+A** | Select all modules |
| **Alt+click** on a wire | Disconnect it |
| **Shift+mousewheel** | Scroll horizontally |
| **Ctrl+mousewheel** | Zoom in/out |
| **Arrow keys** | Move selected objects |

---

## VST Plugin Creation & Distribution

### Can SynthEdit make effect plugins, not just synthesizers?

Yes. SynthEdit can create both instrument (VSTi) and effect (VST) plugins. If your project has no MIDI input, it will export as an effect plugin.

### My VST plugin file is large — why?

The minimum plugin file size is approximately **2 MB** because it includes SynthEdit's built-in module library. SoundFonts, images, and custom modules add to this size.

### Why does my exported plugin show no GUI or a plain interface?

Plugins created in demo mode switch to a plain GUI when SynthEdit is uninstalled. When distributing plugins, you must include the **entire plugin folder** (not just the DLL), as it contains the graphics files the plugin needs.

### Why does my exported plugin contain graphics from a different project?

When exporting, SynthEdit copies all resources loaded during that session. If you opened a different project before exporting, its resources may be included. **Close and reopen SynthEdit** before exporting to avoid this.

### How do I distribute SoundFonts with my VST?

Place the SoundFont file in the same folder as your plugin. Use **relative paths** (not full drive paths) for the SoundFont filename in your patch. Create an installer that copies both the VST and SoundFont together.

### Do my users need the Visual C++ Redistributable?

Yes. Plugins built with SynthEdit require the appropriate Visual C++ Redistributable on the end user's system. SynthEdit's installer bundles it, but your users may need to install it separately.

### Why do my users get virus warnings about my plugin?

This is a common **false positive**. The solution is to code-sign your plugin with a digital certificate. The signature verifies the software hasn't been tampered with, and antivirus software should respect it.

### Why does my VST3 plugin show a huge list of MIDI CC parameters in the DAW?

VST3 plugins don't support MIDI directly. SynthEdit creates hidden "MIDI" parameters to simulate MIDI CC input. These appear in the DAW's automation list but are a side-effect of the VST3 architecture — they're not intended to be used as regular parameters.

### For VST3 plugins, why are presets in alphabetical order instead of my saved order?

VST3 presets are stored as individual files on disk. When the plugin scans them, they appear alphabetically. Use **preset categories** (subfolders) to organize them logically.

### What is SE2JUCE?

SE2JUCE exports SynthEdit projects as JUCE-compatible source code, enabling additional formats (AAX, CLAP, standalone apps, and potentially Linux). It packages all resources into a single executable. It requires source code for all modules used.

---

## GUI & Panel Design

### How do I ensure fonts look consistent on all systems?

The safest approach is to draw the entire plugin background — including all text — as a **bitmap image**. This guarantees the same appearance everywhere, regardless of which fonts are installed on the user's system.

### Can I use uncommon fonts in my plugin's panel?

Avoid uncommon fonts — they may not be installed on your users' systems. Stick to standard Windows fonts, or bake text into bitmap images.

### How do I make a horizontal slider respond to horizontal mouse movement?

In your image's text file (.txt), set the `mouse_response` parameter to `h` for horizontal. Available options: `h` (horizontal), `v` (vertical), `c` (click), `r` (rotary), `s` (stepped).

### What causes banding in gradient Rectangle modules?

Banding is caused by 8-bit-per-channel color limitations combined with no dithering. For smoother gradients, create them in an image editor (Photoshop, GIMP) that performs dithering, then use them as bitmap images.

### Can I change the appearance of dropdown menus in my plugin?

No. Dropdown menus are drawn by the operating system, not by SynthEdit, so their appearance cannot be customized.

### How do project-specific skin folders work?

SynthEdit supports a **project-specific skin folder** that lets you keep skin resources alongside your project file. If your project is named `MySynth.synthedit`, create a folder named `MySynth.skin` in the same directory. Resources in this folder are searched **before** the global skins folder.

**Search order for skin resources:**
1. `MySynth.skin/` (project-specific folder, if it exists)
2. `skins/<current-skin>/` (e.g., `skins/Blue/`)
3. `skins/default/`
4. `skins/_fallback/`

This allows you to override specific images for a single project without modifying the global skins folder.

### What is the `_fallback` skin folder for?

The `_fallback` folder is the last location searched for skin resources. It's useful for providing default graphics that all projects can use, without cluttering the `default` skin folder (which is typically meant for user content).

---

## Audio & Signal Processing

### I'm getting clicks or glitches during playback

- **Increase the audio buffer size** in Edit > Preferences > Audio & MIDI
- **Use ASIO drivers** for lower and more consistent latency
- **Close other applications** that may be competing for CPU
- **Reduce polyphony** if your patch is CPU-heavy
- Check the CPU meter in the toolbar — if it's near 100%, your patch needs optimization

### How can I tell if glitches are from CPU overload or a bug?

Use the **Wave Recorder** module. It is immune to CPU overload. If you hear glitches during live playback but the Wave Recorder output is clean, you have a **CPU overload**. If both show glitches, it's likely a bug.

### Why does my synth sound muddy at 44.1 kHz but fine at higher sample rates?

The older SV Filters cannot reach close to the Nyquist frequency (22 kHz at 44.1 kHz), so they may sound muffled. Newer filter modules (e.g., VA/StateVar) perform better at standard sample rates. **Oversampling** can also help.

### How does oversampling work?

Place an **Oversampling** module in a container to enable oversampling for that container and its sub-containers. It's generally recommended to oversample the entire synth rather than individual modules.

### What happens when I connect multiple signals to the same pin?

SynthEdit automatically inserts an **Adder** to sum the signals. This means values get added together, which may produce higher-than-expected voltages (e.g., pitch being higher when two signals feed the same pitch pin).

### My plugin produces an extremely loud siren-like sound — what's happening?

This is almost always caused by **NaN** (Not a Number) or **Infinity** values in your signal chain. Common causes:

- **Division by zero** — `1 / 0` produces Infinity; `0 / 0` produces NaN
- **Negative square roots** — only valid for positive real numbers
- **Filter instability** — driving a filter's cutoff to illegal values (0 Hz or above Nyquist)

**How to fix it:**
1. **Fix the source** — don't just put a clipper on the output. Track down where the bad values originate.
2. **Use the Monitor module** (under Diagnostics) to inspect signals at various points in your chain
3. **Clamp divisors** so they never reach zero (e.g., use a Clipper to ensure the denominator stays above a small threshold like 0.001)
4. **Avoid fast audio-rate modulation of Biquad filters** — Biquad (Direct Form) filters are not designed for fast cutoff modulation and can become unstable. Use State Variable filters for modulated cutoffs instead.

### What is the difference between Audio pins and Float pins?

**Audio pins** (blue) require a sample buffer (~256 bytes each) and process at full sample rate. **Float pins** (light blue) send only one value at a time and are much lighter. Use Float pins for values that change infrequently (button states, slider positions, musical timing). Use Audio pins for signals that need to change more than ~1000 times per second.

---

## MIDI

### How do I set up MIDI Learn on my plugin's controls?

Insert a **Patch Automator** module with a MIDI connection in your instrument. Right-clicking a control in the exported plugin will show the MIDI Learn option.

### What is the difference between MIDI-CV and MIDI-CV2?

The original MIDI-CV retriggers by toggling the Gate signal (high to low to high), introducing a slight latency. **MIDI-CV2** has a dedicated **Trigger** pin that retriggers with zero latency without toggling the gate.

### Does SynthEdit support MPE (MIDI Polyphonic Expression)?

Yes. SynthEdit converts MPE to MIDI 2.0 internally, so MPE controllers work seamlessly. Existing VST3 plugins are already compatible.

### How does "All Notes Off" (CC 123) work?

CC 123 works provided the value is non-zero and the hold pedal is off. For more reliable results, use **CC 120 (All Sound Off)** which immediately stops all sound regardless of pedal state.

---

## Polyphony & Voices

### Why do unused polyphonic voices not consume CPU?

SynthEdit **sleeps** (suspends processing for) inactive voices. Having 32 voices configured but only playing 2 means only 2 voices consume CPU.

### What is the difference between Hard Steal, Soft Steal, and Overlap modes?

- **Hard Steal** — Stolen voices restart from zero immediately (good for sample playback)
- **Soft Steal / Mono** — Envelopes smoothly transition from their current level (reduces clicks)
- **Overlap** — New notes play alongside existing ones without cutting off

### Why do I hear clicks when new notes start after changing presets?

When voices are sleeping, filter and oscillator settings don't update. If the user changes a preset while voices sleep, the changes apply abruptly when a new note triggers. Enable **Voice Refresh** (via the Polyphony Control module) to periodically wake sleeping voices and process parameter changes, settling filters before they play.

### Why does my filter prevent voices from releasing properly?

When an LFO modulates a filter's cutoff, the filter receives a continuous signal and "thinks" it's still producing sound, preventing the voice from being reused. **Solution:** Place the filter *before* the VCA in the chain: `Osc → Filter → VCA`. Alternatively, add a **Silence Gate** after the filter.

### Notes are getting "stuck" (playing forever)

This usually happens when an envelope gate signal doesn't close properly:
- Make sure the **ADSR Gate input** is connected to the MIDI-to-CV module's **Gate output**
- Verify the **VCA** is connected to the envelope — without amplitude control, the oscillator plays continuously
- Try using the **Trigger to MIDI** module if buttons or triggers are causing stuck notes

---

## Containers & Organization

### Why is it important where the MIDI-CV module is placed?

The MIDI-CV module makes its container (and sub-containers) polyphonic. If placed in the wrong container, voices won't work correctly. It should be in the same container as the modules you want cloned polyphonically.

### Can I put multiple MIDI-CV modules in one container?

You can, but both will receive the exact same notes. For separate MIDI channels (e.g., drum triggers), use **separate containers** with their own MIDI-CV modules.

### The Volt Meter shows unexpected values in a polyphonic patch

The Volt Meter only displays one voice at a time. In a polyphonic container, set the Volt Meter's container **Polyphony to 1** to see a consistent reading.

---

## Performance

### How can I reduce CPU usage?

See the full [Optimizing CPU Usage](/guides/optimizing-cpu/) guide. Key tips:
- Minimize modules in the audio signal path
- Place effects outside the polyphonic voice container
- Use **VCA modules** for proper sleep mode activation
- Mute unused modules during development
- Close unnecessary panel windows (each consumes GPU memory)

### Why does my patch use more CPU when no notes are playing?

Some modules don't enter sleep mode if they receive a non-zero constant signal. Check that your signal chain properly drops to zero when no notes are active. The **Denormal Detector** module can help identify modules processing very small (inaudible) values that prevent sleep mode. The **Silence Gate** module can clamp near-silent signals to zero.

### How do I speed up SynthEdit when working on large projects?

- Close unnecessary windows (each consumes GPU RAM)
- Organize your project into containers to reduce visible modules
- Turn off the DSP (Power button) when patching
- Disable Undo if it's causing slowdowns

---

## Platform & Compatibility

### Does SynthEdit support Apple Silicon (M1/M2/M3) Macs?

Yes. SynthEdit builds **Universal Binaries** that work on both Intel and ARM Macs. Custom SDK modules need to be recompiled as Universal, but no code changes are typically required.

### How do I upgrade old projects to newer versions?

SynthEdit is generally forward-compatible. For very old projects, upgrade in stages: load into an intermediate version and save, then load into the latest. Save the original file as a backup before upgrading.

### Can projects made in SynthEdit 1.5 be opened in 1.4?

SE 1.5 projects saved in `.se1` format are broadly compatible with 1.4. However, modules that only exist in 1.5 will be inactive in 1.4.

---

## SDK & Custom Modules

### Where is the SynthEdit SDK?

The SDK is on GitHub at [github.com/JeffMcClintock/SynthEdit_SDK](https://github.com/JeffMcClintock/SynthEdit_SDK). It's updated with each SynthEdit release and uses a BSD-style license permitting redistribution for both commercial and open-source projects.

### What graphics API does the SDK use?

The SDK uses an API closely based on **Microsoft Direct2D**. The same graphics code works on both Mac and PC (Mac uses an emulation layer).

### How can I get custom modules compiled for Mac without owning one?

The Community Modules build system on Azure DevOps can compile Windows and macOS modules in the cloud for free. You provide the source code and a CMake file.

### What compiler should I use for building SEMs?

Visual Studio 2015 through 2022 all work. GCC is also supported. For Mac builds, Xcode is required.
