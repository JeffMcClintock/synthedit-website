---
title: Trigger To MIDI2
description: Turns gate, pitch and velocity voltages back into MIDI notes.
---


<!-- module-screenshot:begin -->
<img src="../../../images/modules/trigger-to-midi2.png" alt="Trigger To MIDI2 module" class="se-module-screenshot" />
<!-- module-screenshot:end -->


**Trigger To MIDI2** is the reverse of [MIDI-CV 2](../midi-cv-2/): it takes voltages from inside
your patch and emits MIDI notes. Use it to play external gear, or another part of the patch, from
a sequencer, an arpeggiator or logic you've built yourself. It's under **MIDI** in the Module
Browser, and replaces the **Old**-category [Trigger to MIDI](../trigger-to-midi/).

It adds a separate **Trigger** input, so a repeated note can be sent without the gate having to
fall and rise first, and its **Gate** input is a boolean rather than a voltage.

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| Trigger | Bool | Sends a new note-on on a rising edge, even while Gate is still true |
| Gate | Bool | Note on while true; note-off is sent when it goes false |
| Pitch | Audio | Pitch of the note (1 V/octave, 5 V = A440) |
| Velocity | Audio | Velocity of the note |
| Channel | Control | MIDI channel to send on (All, or 1–16) |

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| MIDI Out | MIDI | The generated MIDI stream |

## Usage

Feed **MIDI Out** to a [MIDI Out](../midi-out/) module to reach hardware, or straight into another
[MIDI-CV 2](../midi-cv-2/) to play a second voice inside the same patch.

Drive **Pitch** from a [Step Sequencer](../step-sequencer/) or a quantizer and clock **Trigger**
from an LFO to build an arpeggiator; the pitch voltage is read at the moment the trigger fires.
