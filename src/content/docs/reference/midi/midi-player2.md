---
title: MIDI Player2
description: Plays a MIDI file into a patch, following the host's tempo.
---


<!-- module-screenshot:begin -->
<img src="../../../images/modules/midi-player2.png" alt="MIDI Player2 module" class="se-module-screenshot" />
<!-- module-screenshot:end -->


**MIDI Player2** plays a standard MIDI file into your patch — a hands-free way to audition a
synth, demo a preset, or feed a render. It's under **MIDI** in the Module Browser, and replaces
the **Old**-category [MIDI Player](../midi-player/).

Two things are new. Playback has its own **Trigger** and **Gate** inputs, so the transport can be
driven from the patch, and tempo follows the host by default instead of being dialled in on a
Tempo pin.

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| File Name | Filename | The `.mid` file to play |
| Trigger | Audio | Restarts playback from the beginning on a rising edge |
| Gate | Audio | Playback runs while this is high |
| Tempo from | List | `Host` (default) follows the host's tempo; `MIDI File` uses the tempo map stored in the file. Minimised by default. |
| Loop Mode | Bool | Repeat the file instead of stopping at the end |

## Outputs

| Pin | Type | Description |
|-----|------|-------------|
| MIDI Out | MIDI | The file's MIDI stream |

## Usage

Wire **MIDI Out** to a [MIDI-CV 2](../midi-cv-2/)'s **MIDI In**, exactly as you would an on-screen
[Keyboard (MIDI)](../keyboard-midi/).

:::caution[Set a real file path first]
**MIDI Player2 plays nothing until its File Name pin points at a MIDI file that exists.** There's
no error and no warning — the patch simply runs silent, which is easy to mistake for a broken
synth or a broken render. If you get silence, check this pin before anything else.
:::

If the file is part of a project you intend to export, put it in the project's `.resources`
folder so it travels inside the plugin — see
[Including Audio, MIDI and SoundFont Files](../../../guides/creating-vst-plugins/#including-audio-midi-and-soundfont-files).

For rendering a MIDI performance straight to a WAV rather than playing it live, see
[Rendering to Disk](../../../guides/rendering-to-disk/).
