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

The panel's size becomes the plugin window's size. If you want the user to be able to scale that window up or down inside the DAW, see [Resizable Plugin Windows](../resizable-plugin-windows/).

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

## Code-signing and notarization on macOS

**Before you share a macOS plugin with anyone else, it has to be code-signed and notarized.** This applies to both the Audio Unit (`.component`) and the macOS VST3 — it isn't optional, and it isn't something SynthEdit can do for you.

SynthEdit signs exported plugins so they run **on your own machine** while you're developing. That signature is not enough for distribution. Once a file has been downloaded — from your website, a mailing list, anywhere — macOS attaches a quarantine flag, and Gatekeeper refuses to load anything that isn't signed with a **Developer ID Application** certificate *and* notarized by Apple. For an Audio Unit the failure is especially unhelpful: sandboxed hosts like **Logic Pro** and **GarageBand** simply won't list your plugin, with no error explaining why. `auval` may pass on your machine and still fail on your customer's.

What's involved:

1. **Join the [Apple Developer Program](https://developer.apple.com/programs/)** (currently US$99/year) and create a *Developer ID Application* certificate. There's no free path to a distributable macOS plugin.
2. **Sign** each bundle with that certificate, using the hardened runtime and a timestamp.
3. **Notarize** — upload the signed plugin (usually wrapped in a `.pkg` installer or `.dmg`) to Apple with `notarytool`. Apple scans it and returns a ticket.
4. **Staple** the ticket to the installer with `stapler`, so it validates even offline.

Two references worth reading before you start:

- [**How to code sign and notarize macOS audio plugins in CI**](https://melatonin.dev/blog/how-to-code-sign-and-notarize-macos-audio-plugins-in-ci/) — Sudara's walkthrough, written specifically for audio plugin developers. It covers the certificate types, the exact `codesign` / `notarytool` / `stapler` invocations, and the mistakes that produce silently-missing AUs.
- [Apple: Notarizing macOS software before distribution](https://developer.apple.com/documentation/security/notarizing-macos-software-before-distribution) — the official reference.

The whole sequence automates well. If you're already publishing releases from CI, see [Distributing plugins with GitHub Actions](../distributing-with-github-actions/) for where the signing and notarization steps slot in.

Windows has a parallel-but-milder problem: nothing blocks an unsigned plugin outright, but SmartScreen and antivirus scanners will flag it. See [the FAQ on virus warnings](../faq/#why-do-my-users-get-virus-warnings-about-my-plugin).

## Distribution

You own full rights to the plugins you create with the licensed version of SynthEdit. You can:

- Distribute plugins for **free**
- **Sell** them commercially
- Include them in **commercial products**

No royalties or additional licensing fees apply.

> **Automate your releases** — rather than exporting and packaging by hand each time, you can have GitHub Actions export the plugin and build Windows + macOS installers automatically whenever you push a version tag. See [Distributing plugins with GitHub Actions](../distributing-with-github-actions/).

## Tips for Professional Plugins

- Test in multiple DAWs (Cubase, Ableton, FL Studio, Reaper)
- Provide sensible default preset values
- Include a user manual or preset library
- Test with different sample rates (44.1kHz, 48kHz, 96kHz)
