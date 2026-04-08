---
title: Creating VST Plugins
description: How to export your SynthEdit project as a VST plugin.
---

One of SynthEdit's most powerful features is the ability to export your projects as standalone VST3 plugins. These plugins work in any DAW that supports the VST3 format.

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
