---
title: Polyphony
description: How polyphonic voice management works in SynthEdit.
---

SynthEdit supports polyphonic synthesis, allowing you to play multiple notes simultaneously — just like a real keyboard.

## How Polyphony Works

By default, SynthEdit provides **6 voices** of polyphony (configurable up to 128). When a container includes a **MIDI-CV 2** module, SynthEdit automatically clones all the necessary modules to create multiple independent voices.

There's also an older module simply named **MIDI to CV**, kept under the **Old** category so older projects still load. It works differently (see the [FAQ](../faq/#what-is-the-difference-between-midi-cv-and-midi-cv2)) and isn't the one to reach for here — search for "MIDI" and pick **MIDI-CV 2** from the current **MIDI** category, not the Old-category match of a similar name.

SynthEdit analyzes the signal flow within a container and only clones the modules that actually need to be polyphonic. Effects that belong to the instrument as a whole rather than to one note — reverb, chorus, delay — go **outside** the voice container, where they run once on the combined output instead of once per voice.

## Setting Up Polyphony

1. Place a **MIDI-CV 2** module inside the container that holds your synth voice
2. Connect its outputs (Gate, Pitch, Velocity) to your synthesis modules
3. Set the container's **Polyphony** property to the desired voice count

The MIDI-CV 2 module acts as the "voice allocator" — it receives MIDI notes and distributes them across the available voices.

<img src="../../images/guides/polyphony/01-polyphonic-voice.png" alt="A polyphonic voice: MIDI-CV 2's Pitch drives an Oscillator HD and its Gate drives an ADSR2 envelope; the oscillator runs into a VCA whose Volume is controlled by the envelope, and the VCA's output reaches Sound Out" />

Every module in this chain — oscillator, filter, envelope, VCA — is cloned per voice, because each one has to do something different for each note being held. The voices are mixed back down to a single signal on their way to Sound Out, so anything you place outside the voice container works on that one mix, once. That's the per-voice / global split.

## Voice Count

Configure the number of voices in the container's properties:
- **Default:** 6 voices
- **Maximum:** 128 voices
- Higher voice counts use more CPU proportionally

## Sleep Mode

SynthEdit automatically suspends voices that are not currently active. When a note finishes its release phase and the signal drops to silence, that voice enters "sleep mode" and uses almost no CPU. This means setting a high polyphony count has minimal impact when fewer voices are actually sounding.

## Reserve Voices

You can reserve a number of voices to prevent voice-stealing clicks. When all voices are in use and a new note arrives, SynthEdit steals the oldest voice. Reserved voices provide a buffer so that releasing notes can complete their release phase naturally.

## Mono Mode

For lead synths and bass sounds, you can set polyphony to **1** for monophonic operation. This provides:
- Single-voice behavior
- **Portamento** (pitch glide between notes) via the MIDI-CV 2 module's Portamento setting

## Common Pitfalls

- **Place MIDI-CV 2 in the correct container.** It must be inside the container whose modules you want cloned polyphonically.
- **Keep effects outside the voice container.** Reverb, delay, and chorus should sit outside it, so they aren't cloned — and paid for — once per voice.
- **Don't put MIDI-CV 2 alone in its own container.** It needs to be alongside the modules it controls.
