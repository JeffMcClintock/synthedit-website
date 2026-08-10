---
title: Your First Synth
description: A step-by-step walkthrough that builds a basic subtractive synthesiser in SynthEdit.
---

This tutorial walks you through the basics of SynthEdit by building a simple subtractive synthesiser from scratch. By the end you'll have a patch that produces sound, lets you change the pitch and waveform with on-screen controls, and shapes the tone with a filter.

Along the way you'll learn how to:

- Create a new SynthEdit project
- Find your way around the interface
- Add modules and connect them with patch cords
- Change parameters with controls and the properties panel
- Save your work

## 1. Modules, plugs, and patch cords

A SynthEdit project is built from **modules**. A module can generate or process audio or MIDI, or it can be a control like a slider or knob. Some modules are even complete synthesisers.

Each module shows its **plugs** as coloured pin labels — inputs on the left, outputs on the right. You connect plugs together with **patch cords** to route signal between modules.

The colour of a plug indicates the kind of signal it carries (audio, MIDI, lists, etc.). SynthEdit will not let you connect plugs of incompatible types, so the wiring rules guide you as you work.

## 2. Start a new project

A SynthEdit project holds all the modules, controls, and patch cords that make up your virtual synth.

- Launch SynthEdit
- Choose **File → New** from the menu

SynthEdit creates an empty document. The large work area in the middle is called the **Structure View** — it shows every module in your synth and how they're wired together.

## 3. The Module Browser

Every module you add comes from the **Module Browser**, the panel down the left-hand side of the window. It has three parts:

- A **search box** at the top
- A **category tree** below it (Controls, Filters, Waveform, MIDI, and so on)
- The **module list** on the right, showing the modules in the selected category

Adding a module takes two clicks:

1. Click the module's name in the list. The pointer changes to a crosshair to show a module is ready to place.
2. Click an empty spot in the Structure View. The module is inserted there.

Searching is usually quicker than browsing the tree. Type into the search box and the list narrows as you type, with each result labelled by the category it came from. Press **Escape** to clear the search.

Modules listed under the **Old** category are kept only so that older projects still load. Always prefer the current module of the same name — this tutorial uses those throughout.

## 4. Add an oscillator

The first thing every synthesiser needs is a sound source. We'll add an **oscillator** — a module that produces a continuous waveform.

- Type `oscillator` into the search box
- Click **Oscillator (naive)** under the **Waveform** heading
- Click an empty spot in the Structure View to place it

<img src="../../images/tutorials/first-synth/01-oscillator.png" alt="Oscillator module in the structure view" />

The oscillator has several plugs. The most important ones for now are:

- **Pitch** (input) — controls the frequency
- **Waveform** (input) — selects the shape of the wave (Sine, Saw, Pulse or Tri)
- **Audio Out** (output) — the generated waveform

## 5. Add a sound out module

The oscillator produces a waveform, but to actually hear it you need a **Sound Out** module — this routes audio from your patch to your speakers (or your DAW, when running as a VST).

- Search for `sound out` and click **Sound Out** under **Input-Output**
- Click in the Structure View, a little to the right of the oscillator
- Drag the modules around by their title bars to lay them out neatly

Tip: turn on **Edit → Snap to Grid** to keep things tidy. (This option isn't in the Linux build yet.)

<img src="../../images/tutorials/first-synth/02-osc-and-soundout.png" alt="Oscillator and Sound Out side by side" />

## 6. Connect them with a patch cord

Now we'll wire the oscillator's audio into the sound out.

- Click the **Audio Out** plug on the oscillator
- Move to the **Out** plug on the **Sound Out** module and click again

A blue **patch cord** is drawn between them, with an arrow showing which way the signal flows. The cord follows the modules if you drag them around.

<img src="../../images/tutorials/first-synth/03-connected.png" alt="Oscillator connected to Sound Out" />

As you drag a cord across plugs, SynthEdit highlights the ones it can legally connect to. It will refuse to connect two inputs together or two outputs together. The Sound Out module also automatically grows a new spare input pin once you've wired one — handy when you want to mix several sources together.

## 7. Play the sound

You now have the minimum needed to make some noise.

> **Warning** — the oscillator produces a constant, fairly loud waveform. **Turn your speakers down before pressing play.**

- Choose **Audio → Start Audio** to start the audio engine
- Choose **Audio → Stop Audio** when you've heard enough

On Linux these are combined into a single **Audio → Run / Stop** item that toggles the engine on and off.

It's not exactly inspiring yet — just a continuous tone — but it's a start. The oscillator is producing a fixed waveform and pumping it straight into Sound Out.

This is a good moment to save: choose **File → Save**, then pick a folder and name the file `tutorial.synthedit`.

## 8. Add a control for pitch

To change the oscillator's pitch while it plays, we need a **control** module. Sliders are the most common choice.

- Search for `slider` and click **Slider2** under **Controls**
- Place it just to the left of the oscillator
- Connect the slider's output plug — labelled **Slider** — to the oscillator's **Pitch** input

<img src="../../images/tutorials/first-synth/04-with-slider.png" alt="Slider connected to the oscillator's pitch input" />

- Start the audio engine again
- Click the slider's knob and drag it up and down while the sound plays

The pitch follows the slider in real time. Most module parameters in SynthEdit can be controlled this way — just route a control's output to the parameter's input plug.

## 9. Module parameters: three ways to set them

What you just did is one of three ways to set a module's parameters:

1. **Use a control module** — like the slider you just added. Best for parameters you want to change while the synth plays (pitch, cutoff, volume, etc.).
2. **Use the module's properties panel** — best for parameters that stay fixed (the module's name, default values, etc.).
3. **Drive it from another module's output** — for example, an envelope's output can be wired to a filter's cutoff so that the envelope shapes the tone over time.

Let's try the second one.

## 10. Use the properties panel

- Click the oscillator to select it. Its properties appear in the panel on the right, listing the module's name at the top and its **PINS** below.
- Find the **Waveform** row and change it from **Saw** to **Pulse** using the drop-down
- Optionally, change the module's name at the top of the panel to `OSC1` so it's easier to identify

Start the audio engine. The oscillator now produces a pulse wave, which has a more hollow, reedy character than a sawtooth. Try the other waveforms to hear the difference.

Notice that the **Pitch** row has no editable value — that's because the slider is driving it now. A pin fed by a patch cord takes its value from the cord, not from the panel.

If the properties panel isn't visible, use **View → Show Properties** (Linux), or drag the panel's edge back out.

## 11. Add a List Entry control for the waveform

Setting the waveform from the properties panel is fine for a fixed value, but it would be nicer to switch waveforms while the synth plays. A **List Entry** module gives you a drop-down menu on the panel.

- Search for `list entry` and click **List Entry** under **Controls**
- Place it below the slider
- Connect the list entry's **Choice** output to the oscillator's **Waveform** input

<img src="../../images/tutorials/first-synth/05-with-list-entry.png" alt="List Entry connected to the oscillator's waveform input" />

As soon as the cord is connected, the List Entry fills itself in with the oscillator's own choices — Sine, Saw, Pulse and Tri — and you can pick between them from the drop-down. If the module is too small, drag its bottom-right corner to resize it.

Notice that the new patch cord is **green**, not blue. SynthEdit uses different colours for different signal types — green is for list (enum) choices, blue is for audio. SynthEdit won't let you connect mismatched types, which catches a lot of mistakes early.

## 12. Add a filter

The oscillator on its own is a bit raw. A **filter** sits between the oscillator and the sound out, shaping the tone by removing or emphasising certain frequencies.

- Click the patch cord between the oscillator and sound out, and press **Delete** to remove it
- Search for `sv filter` and click **SV Filter2** under **Filters**, then place it between the two modules
- Wire the oscillator's **Audio Out** → the filter's **Signal** input
- Wire the filter's **Output** → Sound Out's **Out** input
- Add a second **Slider2** and wire it to the filter's **Pitch** input so you can sweep the cutoff

<img src="../../images/tutorials/first-synth/06-with-filter.png" alt="Oscillator into SV Filter2 into Sound Out" />

SV Filter2 has a single **Output**, and its **Mode** pin chooses what that output carries — Low Pass, High Pass, Band Pass or Band Reject. It starts on **Low Pass**, which is what we want here. (You can wire a second List Entry to **Mode** to switch response while the synth plays, exactly as you did for the waveform.)

Start the audio engine and experiment. As you move the cutoff slider, the filter sweeps through the harmonic content of the oscillator — that classic synthesiser sound. Try different waveforms with the list entry too.

Save your work again before moving on.

## Summary

Congratulations — you've just built your first software synthesiser! This patch is a textbook example of **subtractive synthesis**: start with a harmonically rich waveform and use a filter to carve away frequencies.

You now know how to:

- Create a new project and find your way around the Structure View
- Find modules in the Module Browser and place them on the canvas
- Connect modules with patch cords
- Set parameters from the properties panel
- Drive parameters in real time with control modules
- Use different signal types (audio vs. lists) and let SynthEdit's colour-coding guide your wiring

## Next steps

- Read [Working with Modules](../modules/) for more on inserting, connecting, and configuring modules
- Learn about [Signal Types & Levels](../signal-types/) to understand SynthEdit's voltage conventions
- Add an [envelope generator](../modules/) so the filter sweep happens automatically with each note
- When you're ready to play your synth from a MIDI keyboard, see [MIDI Automation](../midi-automation/)
- Once it sounds the way you want, [export it as a VST plugin](../creating-vst-plugins/)
