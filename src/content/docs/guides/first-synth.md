---
title: Your First Synth
description: A step-by-step walkthrough that builds a basic subtractive synthesiser in SynthEdit.
---

This tutorial walks you through the basics of SynthEdit by building a simple subtractive synthesiser from scratch. By the end you'll have a playable instrument: notes from a keyboard, a filter you can sweep, an envelope shaping every note, and the whole thing packed into a container ready to export as a plugin.

Along the way you'll learn how to:

- Create a new SynthEdit project
- Find your way around the interface
- Add modules and connect them with patch cords
- Change parameters with controls and the properties panel
- Turn MIDI notes into pitch and gate signals
- Shape each note with an envelope
- Group a finished voice into a container
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
- Click **Oscillator HD** under the **Waveform** heading
- Click an empty spot in the Structure View to place it

<img src="../../images/tutorials/first-synth/01-oscillator.png" alt="Oscillator module in the structure view" />

The oscillator has several plugs. The most important ones for now are:

- **Pitch** (input) — controls the frequency
- **Waveform** (input) — selects the shape of the wave (Sine, Saw, Ramp, Triangle, Pulse, White Noise or Pink Noise)
- **Audio Out** (output) — the generated waveform

## 5. Add a sound out module

The oscillator produces a waveform, but to actually hear it you need a **Sound Out** module — this routes audio from your patch to your speakers (or your DAW, when running as a VST).

- Search for `sound out` and click **Sound Out** under **Input-Output**
- Click in the Structure View, a little to the right of the oscillator
- Drag the modules around by their title bars to lay them out neatly

Tip: turn on **Edit → Snap to Grid** to keep things tidy.

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

This is the same on Windows, macOS and Linux.

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

If the properties panel isn't visible, use **View → Properties Browser** to bring it back, or drag the panel's edge back out.

## 11. Add a List Entry control for the waveform

Setting the waveform from the properties panel is fine for a fixed value, but it would be nicer to switch waveforms while the synth plays. A **List Entry** module gives you a drop-down menu on the panel.

- Search for `list entry` and click **List Entry** under **Controls**
- Place it below the slider
- Connect the list entry's output — the plug labelled **Value Out** — to the oscillator's **Waveform** input

<img src="../../images/tutorials/first-synth/05-with-list-entry.png" alt="List Entry connected to the oscillator's waveform input" />

As soon as the cord is connected, the List Entry fills itself in with the oscillator's own choices — Sine, Saw, Ramp, Triangle, Pulse, White Noise and Pink Noise — and you can pick between them from the drop-down. If the module is too small, drag its bottom-right corner to resize it.

Notice that the new patch cord is **green**, not blue. SynthEdit uses different colours for different signal types — green is for list (enum) choices, blue is for audio. SynthEdit won't let you connect mismatched types, which catches a lot of mistakes early.

## 12. Add a filter

The oscillator on its own is a bit raw. A **filter** sits between the oscillator and the sound out, shaping the tone by removing or emphasising certain frequencies.

- Click the patch cord between the oscillator and sound out, and press **Delete** to remove it
- Search for `statevar` and click **StateVar Filter** under **Filters/VA**, then place it between the two modules
- Wire the oscillator's **Audio Out** → the filter's **Signal** input
- Wire the filter's **Output** → Sound Out's **Out** input
- Add a second **Slider2** and wire it to the filter's **Pitch** input so you can sweep the cutoff

<img src="../../images/tutorials/first-synth/06-with-filter.png" alt="Oscillator into StateVar Filter into Sound Out" />

StateVar Filter has a single **Output**, and its **Mode** pin chooses what that output carries — Low Pass, High Pass, Band Pass or Band Reject. It starts on **Low Pass**, which is what we want here. (You can wire a second List Entry to **Mode** to switch response while the synth plays, exactly as you did for the waveform.)

Start the audio engine and experiment. As you move the cutoff slider, the filter sweeps through the harmonic content of the oscillator — that classic synthesiser sound. Try different waveforms with the list entry too.

Save your work again before moving on.

## 13. Play it from a keyboard

Everything so far has been a drone. The oscillator runs continuously, and its pitch comes from a slider you drag by hand — fine for exploring, but not an instrument. A real synth takes its pitch from notes, and two modules are what turn note messages into something the patch understands.

- Search for `keyboard` and click **[Keyboard (MIDI)](../../reference/midi/keyboard-midi/)** under **Controls**. Place it near the bottom-left. It's an on-screen piano you can play with the mouse — start the audio engine first, the same **Audio → Start Audio** as before.
- Search for `midi` and click **[MIDI-CV 2](../../reference/midi/midi-cv-2/)** under **MIDI** — the current module, not the similarly-named **MIDI to CV** under **Old**. Place it to the right of the keyboard.
- Connect the keyboard's **MIDI Out** to the MIDI-CV 2's **MIDI In**

That cord is **yellow** — a third signal colour, this one for MIDI.

**MIDI-CV 2** is the bridge between MIDI and the rest of your patch. Notes go in; plain voltages come out, on five separate output plugs — top to bottom on the module:

- **Trigger** — a short pulse at the start of every new note
- **Gate** — high for as long as a key is held down, low when it's released
- **Pitch** — the note's pitch, at **1 volt per octave** (5 V is A440)
- **Velocity** — how hard the key was struck
- **Aftertouch** — pressure applied after the key is down

Now hand the pitch over to the keyboard:

- Click the cord running from the pitch **Slider2** to the oscillator, and press **Delete**
- Click the slider itself and delete that too — the keyboard sets the pitch now
- Connect MIDI-CV 2's **Pitch** output to the oscillator's **Pitch** input

<img src="../../images/tutorials/first-synth/07-with-keyboard.png" alt="Keyboard (MIDI) feeding MIDI-CV 2 with a yellow MIDI cord; MIDI-CV 2's Pitch output drives the oscillator's Pitch input" />

:::caution[Delete the old cord, don't just add the new one]
An input plug accepts more than one patch cord, and SynthEdit [adds the signals together](../faq/#what-happens-when-i-connect-multiple-signals-to-the-same-pin) when you do that. Leaving the slider wired to **Pitch** alongside the keyboard would stack its voltage on top of every note — at 1 V per octave, a slider sitting mid-travel transposes the whole keyboard five octaves up.
:::

Start the audio engine and click a few keys. The pitch follows the keyboard, and the cutoff slider still works. But the sound never stops between notes — nothing in the patch yet knows when a note begins and ends. That's the last piece.

## 14. Give each note a beginning and an end

Notes don't switch on and off square; they swell and fade. That shape is the job of two modules working as a pair:

- An **envelope generator** turns the keyboard's gate into a rising-and-falling control voltage
- A **VCA** (voltage controlled amplifier) multiplies the audio by that voltage, so the note follows the shape

Add them:

- Search for `adsr` and click **ADSR2** under **Waveform**. Place it below the oscillator.
- Search for `vca` and click **VCA** under **Modifiers**. Place it between the filter and Sound Out.
- Connect MIDI-CV 2's **Gate** output → ADSR2's **Gate** input
- Delete the cord from the filter's **Output** to Sound Out
- Connect the filter's **Output** → the VCA's **Signal** input
- Connect ADSR2's **Signal Out** → the VCA's **Volume** input
- Connect the VCA's **Output** → Sound Out's **Out** input

<img src="../../images/tutorials/first-synth/08-with-envelope.png" alt="The full voice: MIDI-CV 2's Gate drives ADSR2, whose Signal Out drives the VCA's Volume; the filter's Output feeds the VCA's Signal, and the VCA's Output goes to Sound Out" />

**ADSR** stands for the four stages the envelope moves through, each with its own input plug:

| Stage | What it does |
|-------|--------------|
| **Attack** | How long the note takes to reach full level after the key goes down |
| **Decay** | How long it then takes to fall back to the sustain level |
| **Sustain** | The level it holds at while you keep the key held |
| **Release** | How long it takes to fade to silence after you let go |

Attack, Decay and Release are times expressed as voltages, on an exponential scale — every extra volt roughly doubles the time. Sustain is a level, 0–10 V. Set them from the properties panel, or wire sliders to them exactly as you did for the cutoff.

Start the audio engine and play. Each key press is now a note that starts, sustains while you hold it, and fades when you let go. Try a long **Attack** for a soft pad, or a short **Decay** with **Sustain** at zero for a plucked sound.

:::tip[Use a VCA, not a Level Adj]
The VCA is built to notice when its volume input reaches zero, and that's what lets SynthEdit put a finished note to sleep — the oscillator and filter upstream of it stop using CPU until the next note. See [Optimizing CPU](../optimizing-cpu/).
:::

MIDI-CV 2's **Trigger** output is the alternative to **Gate** here: it pulses at the start of every note, even one played while the previous key is still down, so an envelope wired to **Trigger** restarts cleanly on repeated notes instead of waiting for the gate to drop.

## 15. Wrap the voice in a container

Your synth works. One step turns it into something you can export.

A **container** is a module that holds other modules — it collapses a whole section of a patch into a single block. It's also the unit SynthEdit exports as a plugin, and the unit that polyphony works on, so a finished synth normally lives inside one.

- Select every module *except* **Keyboard (MIDI)** and **Sound Out** — drag a box around them, or click each one with **Shift** held
- Choose **Edit → Containerize Selection**
- With the new container selected, give it a name in the properties panel — `TutorialSynth` will do. [Exporting](../creating-vst-plugins/) takes the plugin's name from the container, so it's worth setting now.

<img src="../../images/tutorials/first-synth/09-in-container.png" alt="The top level after containerising: Keyboard (MIDI) feeds a single block named TutorialSynth through its MIDI In pin, and the container's Output pin feeds Sound Out" />

The whole synth is now one block, and the two cords that crossed the boundary have become plugs on its outside: a **MIDI In** on the left and an **Output** on the right. That's not a coincidence — it's exactly the pair of connections a DAW makes to an instrument plugin. Double-click the container's title bar to go inside and see your modules; the breadcrumb above the Structure View brings you back out.

Two modules deliberately stayed outside:

- **Sound Out** is how the patch reaches your speakers. It belongs at the top level, above the plugin, not inside it.
- **Keyboard (MIDI)** is there so *you* can play the synth while you work in the editor. Leaving it outside is what gives the container its **MIDI In** plug — and in a DAW, that's the plug the host delivers its notes to.

Because MIDI-CV 2 is now inside a container, that container can also play more than one note at a time. See [Polyphony](../polyphony/) for how to set its voice count.

Save one last time.

## Summary

Congratulations — you've just built your first software synthesiser! This patch is a textbook example of **subtractive synthesis**: start with a harmonically rich waveform, carve frequencies away with a filter, and shape what's left with an envelope.

You now know how to:

- Create a new project and find your way around the Structure View
- Find modules in the Module Browser and place them on the canvas
- Connect modules with patch cords
- Set parameters from the properties panel
- Drive parameters in real time with control modules
- Use different signal types (audio, lists, MIDI) and let SynthEdit's colour-coding guide your wiring
- Convert MIDI notes into pitch and gate with **MIDI-CV 2**
- Shape each note with an **ADSR** envelope and a **VCA**
- Collapse a finished voice into a **container** with MIDI in and audio out

## Next steps

- Read [Working with Modules](../modules/) for more on inserting, connecting, and configuring modules
- Learn about [Signal Types & Levels](../signal-types/) to understand SynthEdit's voltage conventions
- Add a second [ADSR2](../../reference/envelopes/adsr2/) and wire it to the filter's **Pitch** so the tone sweeps by itself on every note
- Set the container's voice count so it plays chords — see [Polyphony](../polyphony/)
- To drive your controls from a hardware MIDI controller's knobs, see [MIDI Automation](../midi-automation/)
- Once it sounds the way you want, [export it as a VST plugin](../creating-vst-plugins/)
