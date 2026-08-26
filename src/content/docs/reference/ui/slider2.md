---
title: Slider2
description: The standard slider control — a prefab that stores its value as a plugin parameter.
---


<!-- module-screenshot:begin -->
<img src="../../../images/modules/slider2.png" alt="Slider2 module" class="se-module-screenshot" />
<!-- module-screenshot:end -->


**Slider2** is the slider you'll use in practice: a draggable control that puts out a voltage, and
remembers its position in the patch. It's under **Controls** in the Module Browser.

Unlike most entries in the browser, Slider2 is a **prefab** rather than a single module — a small
ready-made container holding a slider sub-control wired to a patch-memory module. That detail
explains most of its behaviour, and one export gotcha.

## Plugs

| Pin | Type | Description |
|-----|------|-------------|
| Visible | Bool | Shows or hides the control on the panel |
| Slider | Control | The slider's value — wire this to whatever you want to control |
| Spare | — | The container's spare input, for adding your own connections inside |

## Usage

Connect **Slider** to the input you want to drive: an oscillator's Pitch, a filter's cutoff, a
VCA's Volume. [Your First Synth](../../../guides/first-synth/) uses one to sweep a filter.

The patch-memory module inside is what makes the slider more than a knob on screen:

- Its position is saved with the patch and restored with presets
- It is registered as a **parameter**, so a host DAW can automate it — with no
  [Patch Automator](../../midi/patch-automator/) needed
- The parameter takes its name from the pin it drives. Wire a Slider2 to a StateVar Filter's
  **Pitch** and the host sees a parameter called *StateVar Filter Pitch*.

## Parameters

Select the module and the properties panel shows the parameter behind it:

| Property | Description |
|----------|-------------|
| Value | The slider's current position, in volts |
| Low | Value at the bottom of travel (default 0.0) |
| High | Value at the top of travel (default 10.0) |
| Hint | Tooltip text |
| MIDI | MIDI controller assignment for the parameter |
| Ignore Program Change | Leave this control alone when the patch changes |
| Private | Hide the parameter from the host |
| Stateful | Save the value with the patch (on by default) |

**Low** and **High** are the ones you'll reach for most: a slider driving a filter cutoff wants the
full 0–10 V, while one trimming a level may want a much narrower range.

The container's own pins — **Controls on Module**, **Visible** and **Ignore Program Change** —
appear above the parameters, along with the usual container properties.

:::caution[A stray Slider2 is a stray container]
Because a prefab *is* a container, a Slider2 dropped on the master canvas instead of inside your
synth counts as a second exportable container — one of the standard ways to get
*"Many Containers in main window"* at export time. Keep your controls inside the container you
intend to export. See [Creating VST Plugins](../../../guides/creating-vst-plugins/#what-the-export-needs).
:::

:::note[Two things called Slider2]
A module search for `slider` can also turn up a **Slider2** in the **Debug** category. That one is
deprecated and isn't present in release builds — pick the **Controls** entry.
:::

For the older, plain slider module see [Slider](../slider/).
