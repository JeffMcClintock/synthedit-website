---
title: Wavetable Osc
description: Wavetable oscillator with audio-rate pitch and table position, plus how it loads, band-limits and plays a wavetable.
---


<!-- module-screenshot:begin -->
<img src="../../../images/modules/wavetable-osc.png" alt="Wavetable Display showing a stack of single-cycle waveforms, the selected one highlighted in yellow" class="se-module-screenshot" />
<!-- module-screenshot:end -->


The **Wavetable Osc** plays a *wavetable*: a stack of single-cycle waveforms (frames) stored one after another in a `.wav` file. **Pitch** sets the note, and **Slot** chooses where in the stack you are listening. Sweep Slot and the timbre moves smoothly from one waveform to the next.

Both inputs are audio-rate, so an envelope, an LFO or another oscillator can move the table position every sample without stepping or zipper noise.

Its companion, the **Wavetable Display**, draws the loaded table as a 3D landscape for your plugin's panel.

Hear it in the [audio demos](../../../guides/audio-demos/).

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| Pitch | Audio | Note pitch (1V/octave, 5V = 440 Hz). Unconnected, it plays 440 Hz |
| Slot | Audio | Position in the table. 0V is the first frame, 10V is the last. Values outside 0–10V stop at the ends |
| WaveTableFile | Text | The wavetable `.wav` file, or the name of a [built-in waveform](#built-in-waveforms) |

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| Signal Out | Audio | The oscillator's output |

## Wavetable Display

A panel control. It draws the table and highlights the frame currently selected.

| Pin | Type | Description |
|-----|------|-------------|
| WaveTableFile | Text | The same file name the oscillator is given |
| Slot | Float | Which frame to highlight, 0 to 1 (first to last frame) |

Tables with more than 32 frames are drawn as 32 evenly spaced frames to keep the picture readable. The highlighted frame is always the exact one selected.

## Usage

### A basic patch

Add a **Wavetable Osc**, select it, and choose a wavetable file in the **WaveTableFile** field of the Properties panel (the **...** button opens a file browser). Then wire it like any other oscillator:

<a href="../../../images/modules/wavetable-osc-basic-patch.png"><img src="../../../images/modules/wavetable-osc-basic-patch.png" alt="MIDI-CV 2 feeds Pitch on the Wavetable Osc and gates two ADSR envelopes. One envelope drives the Slot input, the other drives a VCA on the oscillator's output. The Properties panel shows the WaveTableFile field with a wavetable chosen." /></a>

1. Connect [MIDI-CV 2](../../midi/midi-cv-2/)'s **Pitch** to the oscillator's **Pitch**.
2. Connect an [ADSR](../../envelopes/adsr2/) to **Slot**. Each note now travels through the table as it sounds. This is the classic wavetable sweep.
3. Send **Signal Out** through a [VCA](../../envelopes/vca/) controlled by a second envelope, then to [Sound Out](../../io/sound-out/).

Anything can drive Slot: a slider for a fixed timbre, an LFO for movement, key velocity for brighter loud notes, or a mix of several.

### Choosing the file from the panel, with a display

To let the user of your plugin load their own wavetable, and to show it, keep the file name in a **PatchMemory Text2** module. That makes the file name a parameter: it is saved with each preset, and one module can hand it to both the oscillator and the display.

<a href="../../../images/modules/wavetable-osc-display-patch.png"><img src="../../../images/modules/wavetable-osc-display-patch.png" alt="The basic patch with a file-loading row added. A PatchMemory Text2 named Wavetable File sends its Value Out to the oscillator's WaveTableFile pin and its Value to the Wavetable Display and a File Dialog. A button image triggers the File Dialog. The Slot envelope also runs through Poly to Mono and a PatchMemory Float Out, whose Animation Position output drives the display's Slot pin." /></a>

**The file name** (red wires)

- PatchMemory Text2 **Value Out** → Wavetable Osc **WaveTableFile**
- PatchMemory Text2 **Value** → Wavetable Display **WaveTableFile**
- PatchMemory Text2 **Value** and **File Extension** → **File Dialog** **File Name** and **File Extension**
- **File Dialog** **Trigger** → an **Image2** button's **Mouse Down**. Clicking the button opens the file browser, and the chosen file goes back into the PatchMemory.

**The highlighted frame** (light blue wires)

The display's Slot pin is a panel-side value, and the envelope is a per-voice audio signal, so it needs converting:

- Slot envelope **Signal Out** → **Poly to Mono** → **PatchMemory Float Out3** **Value In**
- PatchMemory Float Out3 **Animation Position** → Wavetable Display **Slot**

Use **Animation Position**, not **Value**. Animation Position is the 0-to-1 form the display expects. Value is in volts (0–10), which would pin the highlight to the last frame.

If Slot is set by a panel knob rather than an envelope, one **PatchMemory Float3** does both jobs: its **Value Out** goes to the oscillator's **Slot**, and its **Animation Position** goes to the display's **Slot** and to the knob image.

## Wavetable files

The oscillator reads `.wav` files: 8, 16, 24 or 32-bit PCM, or 32-bit float. Stereo files are mixed to mono. How the file is split into frames depends on what it contains.

| File | How it is read |
|------|----------------|
| Serum / Vital style (has a `clm ` chunk) | The file states its own frame size, so it is cut into exactly those frames. Up to 256 frames are used. A longer file is thinned evenly, keeping the first and last frames |
| Exactly 32,768 samples, no `clm ` chunk | Read as 64 frames of 512 samples |
| Any other `.wav` | Treated as a recording of a note and converted into a 64-frame wavetable (see below) |

Most wavetables exported from Serum, Vital and similar editors carry the `clm ` chunk and load frame for frame.

### Making a wavetable from a recording

Give the oscillator an ordinary recording, such as a single sustained note from an instrument or a synth sweep, and it builds a wavetable from it:

1. The level is normalised and silence is trimmed from both ends.
2. 64 points are spaced evenly through the sound.
3. At each point the pitch is detected and exactly one cycle is cut out and stored as a frame.
4. The harmonics of every frame are lined up in phase, so neighbouring frames blend cleanly instead of cancelling.
5. Loudness is evened out across the frames.

The result follows the changing tone of the recording from start to finish, at any pitch and at any speed you move Slot. It works best on a single pitched note. Chords, drums and noisy material have no clear cycle to find.

:::caution
A wavetable file that has frames but **no** `clm ` chunk, and is not exactly 32,768 samples long, is treated as a recording and analysed this way. If a table sounds unlike it does in the editor it came from, re-export it from a tool that writes the chunk.
:::

### Built-in waveforms

Type one of these names into **WaveTableFile**, braces included, for a table that needs no file:

`{Sine}` `{Saw}` `{Ramp}` `{Triangle}` `{Square}` `{Pulse15}` `{Pulse85}` `{Noise}` `{Silence}` `{DC}`

These are test waveforms. Every frame holds the same shape, so Slot has no effect on them (`{Noise}` holds a different short loop of noise in each frame).

### Missing files

- With **WaveTableFile** empty, the oscillator is silent and goes to sleep, so it costs no CPU.
- If the file can't be found or read, the oscillator plays a sine wave, so a broken path is audible rather than silent.

### Exporting a plugin

A wavetable is an external file, so it has to travel with your plugin. Put it in the project's `.resources` folder as described in [Including Audio, MIDI and SoundFont Files](../../../guides/creating-vst-plugins/#including-audio-midi-and-soundfont-files).

## How it works

### Loading

Reading a file and preparing it takes far too long to do while audio is running, so it happens on a background thread. When the file name changes, the oscillator goes silent, and starts playing the new table the moment it is ready.

When rendering offline there is no deadline, so the oscillator loads the table on the spot and no notes are lost at the start of a bounce.

A prepared table is shared. Every voice, and every Wavetable Osc using the same file at the same sample rate, reads one copy. A 64-frame table takes about 13 MB of memory, a 256-frame table about 51 MB, however many voices or oscillators are playing it. The table is freed when the last oscillator using it goes away.

### Staying clean at high pitches

Every frame is stored as a 512-sample cycle, which holds up to 256 harmonics. Played at a low pitch all of them are audible and wanted. Played high, the upper harmonics would land above the limit of what the sample rate can represent and fold back down as *aliasing*: harsh tones unrelated to the note.

To prevent that, each frame is analysed into its harmonics once, at load time, and rebuilt as a set of 65 copies, each with fewer harmonics than the last:

- Below about 78 Hz the full set of harmonics is used.
- From there up, roughly every semitone gets its own copy holding only the harmonics that fit below 20 kHz at that pitch.
- By the top of the keyboard only the fundamental is left, and above a 20 kHz fundamental the oscillator is silent.

Each copy is stored with four times as many samples as its harmonics strictly need, which keeps the top harmonics at full strength when they are read back.

While playing, the oscillator picks the copy that suits the current pitch. When a pitch bend or glide crosses into the next copy, it waits for the start of a cycle and crossfades between the two over 8 samples, so the change is inaudible. The boundaries sit halfway between notes, so vibrato around a note does not flip back and forth.

### Reading the table

For every output sample the oscillator:

1. Works out the frequency from **Pitch** and moves its position in the cycle forward.
2. Finds the two frames either side of the **Slot** position.
3. Reads both frames at the current position, using cubic interpolation between stored samples.
4. Mixes the two readings in proportion to how far Slot is between them.

Step 4 is a crossfade. A table with many gradually changing frames morphs smoothly. A table with a few very different frames fades from one shape to the next.

### Note start

The oscillator restarts its cycle from the beginning each time a voice starts a note, so every note has the same attack.

## Tips

- **Watch the level.** Frames play at the level stored in the file, and a full-scale file gives ±10V. That is twice the ±5V of SynthEdit's other oscillators. Turn it down with a [Level Adj](../../mixing/level-adj/) or the VCA if it overdrives what follows. Built-in waveforms and tables made from recordings are about ±5V.
- **Layer for unison.** Several Wavetable Oscs on the same file share one table in memory. Detune their pitches slightly for a thick unison sound, or give each a different Slot offset.
- **Changing tables mid-note.** Selecting a new file silences the oscillator for a moment while the new table loads. For an instant change between two tables, use two oscillators and crossfade between them.
- **Expect silence above 20 kHz.** Modulating Pitch far upwards eventually mutes the oscillator rather than letting it alias.

For conventional waveforms see the [Oscillator HD](../oscillator-hd/). For playing back whole recordings see the [Sample Oscillator](../sample-oscillator/).
