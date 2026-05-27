---
title: Creating VST Plugins
description: How to export your SynthEdit project as a VST plugin.
---

One of SynthEdit's most powerful features is the ability to export your projects as standalone VST3 plugins. These plugins work in any DAW that supports the VST3 format.

<img src="../../images/guides/creating-vst-plugins/01-complete-synth.png" alt="A complete polyphonic synth ready for VST export: MIDI In feeds a Patch Automator (which exposes parameters to the host DAW), then on through MIDI to CV to drive an Oscillator and ADSR; the oscillator passes through an SV Filter and VCA, and a Voice Combiner before reaching Sound Out" />

A patch like this — MIDI In → Patch Automator → voice modules → Voice Combiner → Sound Out — is the typical shape of a VST instrument before export. The **Patch Automator** is what exposes your panel controls to the host DAW as automatable parameters.

## Designing the GUI

Before exporting, you'll want to create a user interface for your plugin:

1. Switch to the **Panel** view
2. Add controls — knobs, sliders, switches, labels
3. Connect controls to module parameters
4. Customize the appearance with colors, images, and layout

## Exporting as VST3

1. Go to **File > Export VST Plugin**
2. Choose a location to save the plugin
3. Set the plugin name, manufacturer, and unique ID
4. Click **Export**

SynthEdit generates a `.vst3` file that you can install in your DAW's plugin folder.

## Including Audio, MIDI and SoundFont Files

If your project uses external files — a sample loaded by a Wave Player, a MIDI file driving a MIDI Player, a SoundFont — those files need to ship inside the exported plugin too. SynthEdit looks for them in a folder next to your project named **`<project-name>.resources`**.

For example, if your project is `MySynth.synthedit`, create a folder called `MySynth.resources` alongside it and drop your `.wav`, `.mid`, `.sf2`, etc. files in there. When you pick one of those files in a module's File Name pin, SynthEdit will find it in `.resources/` first, then fall back to your global Audio / MIDI / SoundFont folders set in Preferences.

On export, the entire `.resources` folder is copied verbatim into the exported VST3 / AU bundle's Resources folder. The plugin finds the files at runtime by the same short filename, so the patch just works in any DAW on any machine.

### Why a dedicated folder?

Skin images and font assets get exported automatically — SynthEdit displays your GUI during export, which forces every panel control to register the images it needs. Audio, MIDI and SoundFont files can't be discovered the same way (the audio engine doesn't necessarily run during export), so putting them in `.resources` is the reliable way to make sure they travel with the plugin.

## Testing Your Plugin

1. Copy the `.vst3` file to your system's VST3 folder
2. Rescan plugins in your DAW
3. Load the plugin on a track
4. Test all controls and audio processing

## Distribution

You own full rights to the plugins you create with the licensed version of SynthEdit. You can:

- Distribute plugins for **free**
- **Sell** them commercially
- Include them in **commercial products**

No royalties or additional licensing fees apply.

## Tips for Professional Plugins

- Test in multiple DAWs (Cubase, Ableton, FL Studio, Reaper)
- Provide sensible default preset values
- Include a user manual or preset library
- Test with different sample rates (44.1kHz, 48kHz, 96kHz)
