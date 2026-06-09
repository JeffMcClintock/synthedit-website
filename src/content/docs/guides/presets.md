---
title: Presets
description: How VST3 and Audio Unit plugins built with SynthEdit store, scan, and share presets — and what does (and doesn't) sync with your DAW.
---

Plugins you build with SynthEdit include a built-in **preset browser**. Presets are stored as ordinary files on disk in the standard operating-system locations, which means they can be shared between the VST3 and Audio Unit versions of your plugin, and — for most DAWs — discovered by the host as well.

Most DAWs already provide comprehensive preset management of their own, so the plugin's built-in browser is **purely optional**. If your DAW's preset system does what you need, using *its* browser gives the most seamless integration — the plugin's own browser is there for preset management that travels with the plugin from one host to another.

This page explains exactly where presets live, how the browser finds them on macOS and Windows, and the limits of preset syncing with your DAW.

## Where presets are stored

The browser looks in two places: a **per-user** folder (presets you save) and an **all-users / shared** folder (presets installed for everyone on the machine, e.g. by an installer). Both use the `Vendor` and `Plugin` names from your exported plugin.

### macOS

The VST3 and Audio Unit versions use the **same** location, so a preset saved by one is seen by the other.

| Scope | Folder |
| --- | --- |
| Per-user | `~/Library/Audio/Presets/<Vendor>/<Plugin>/` |
| All users (shared) | `/Library/Audio/Presets/<Vendor>/<Plugin>/` |

### Windows

Audio Unit is a macOS-only format, so on Windows this applies to the VST3 plugin.

| Scope | Folder |
| --- | --- |
| Per-user | `Documents\VST3 Presets\<Vendor>\<Plugin>\` |
| All users (shared) | `C:\Users\Public\Documents\VST3 Presets\<Vendor>\<Plugin>\` |

These are the standard preset locations defined by the VST3 and Audio Unit specifications, so other plugins and hosts use them too.

## What the browser scans

When the plugin builds its preset list, it:

- **Scans both folders** — the per-user folder *and* the all-users shared folder.
- **Searches sub-folders** — folders inside those locations are scanned recursively. Use them as **categories** to organize large preset libraries (see [Organizing presets](#organizing-presets-into-categories)).
- **Reads every SynthEdit preset format**, regardless of which plugin format is running:
  - `.xmlpreset` — SynthEdit's own portable format (what the *Save Preset* command writes)
  - `.vstpreset` — the VST3 format
  - `.aupreset` — the Audio Unit format
- **Merges duplicates** — the same preset can exist in more than one format or in both folders. The browser collapses these into a single entry so you never see a name twice. When the same preset appears in more than one place, the **per-user copy wins over the shared copy**, and the **plugin's own native format wins over the others**.

## Sharing presets between VST3 and Audio Unit

Each version saves presets in its own format — the VST3 plugin writes `.vstpreset` files, the Audio Unit plugin writes `.aupreset` files — but **both versions can read the other's format**. Combined with the shared folder location, that means presets are shared automatically: a preset you save while using the VST3 plugin in one DAW is read directly by the Audio Unit plugin in another, and vice-versa. No duplicate files are created — the browser simply understands every format.

## Factory presets

A factory preset bank is the set of presets you ship with your plugin. SynthEdit keeps factory presets in the **standard preset folders** — the same places the browser scans and the DAW reads — rather than inside the plugin bundle. That way the DAW lists them in its own preset menu just like any other preset.

**During development.** When you export your plugin (**File > Save As VST**), SynthEdit writes your project's presets into your **per-user** preset folder, so you can audition them in your DAW straight away. It uses the per-user folder because the system folder normally can't be written without administrator rights.

**Shipping to end users.** Have your installer copy the preset files into the **system (all-users)** preset folder, in the format(s) each host reads:

| Platform | Install factory presets to |
| --- | --- |
| macOS | `/Library/Audio/Presets/<Vendor>/<Plugin>/` — both `.aupreset` (for Logic and other AU hosts) and `.vstpreset` (for VST3 hosts) |
| Windows | `C:\Users\Public\Documents\VST3 Presets\<Vendor>\<Plugin>\` — `.vstpreset` |

Because the system folder requires administrator rights to change, factory presets installed there are effectively **read-only** for the user: they can load and audition them, but choosing *Save* writes a copy into the user's own per-user folder, leaving the factory bank untouched. Both the plugin's browser (which scans the system folder) and the DAW's own preset menu will list them.

## Working with your DAW

Most DAWs have their *own* preset menu, separate from the plugin's built-in browser. How well the two stay in sync depends on the DAW:

**Saving from the DAW shows up in the plugin browser.** The plugin watches its preset folder. When your DAW saves a preset to the standard location above, the plugin notices the new file on disk and adds it to its own browser automatically — no rescan needed.

**The plugin browser does *not* update the DAW's preset name.** If you save, rename, or modify a preset using the plugin's *own* browser, the DAW's separate preset display will **not** change to match. The two preset systems are independent, and the plugin cannot push a name back into the host's preset menu. This is a limitation of the plugin formats themselves, not of SynthEdit.

**Some DAWs don't use the standard locations.** A few hosts — **Ableton Live** is the notable example — store presets inside their own library or project instead of the standard OS preset folders. Presets saved that way are **invisible to the plugin's browser**, because the browser only scans the standard locations listed above. You can still recall those presets through the DAW's own menu; they just won't appear in the plugin's list.

## Ignore Program Change

Many of SynthEdit's controls — sliders, list boxes, text entry, and containers — offer an **Ignore Program Change** property. When you enable it on a control, that control keeps its current value when the user switches presets, instead of being overwritten by the loaded preset. Use it for settings that should persist across presets: a master output level, global tuning, or a "mix"/"amount" control the performer sets by ear.

**This applies only to preset changes made *inside* the plugin** — loading a preset from the browser, or a MIDI Program Change. It deliberately does **not** apply when the *DAW* restores the plugin's state, such as reopening a saved project or stepping through undo/redo. In those cases every control is restored exactly as it was stored, so your sessions reload faithfully and the DAW's undo/redo behaves as expected.

## Organizing presets into categories

Sub-folders inside a preset folder act as categories. For example, a preset saved at:

```
~/Library/Audio/Presets/Acme/SuperSynth/Bass/Deep House.vstpreset
```

appears under the **Bass** category in the browser. This is the recommended way to keep a large library tidy — see the related [FAQ entry](./faq/#for-vst3-plugins-why-are-presets-in-alphabetical-order-instead-of-my-saved-order).
