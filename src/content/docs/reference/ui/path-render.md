---
title: Path Render
description: Renders an SVG path string with configurable fill, stroke colour and stroke width.
---


<!-- module-screenshot:begin -->
<img src="../../../images/modules/path-render.png" alt="Path Render module" class="se-module-screenshot" />
<!-- module-screenshot:end -->


The **Path Render** module takes an SVG-style path string and draws it on the panel using the fill colour, stroke colour, and stroke width you supply. It is purely a renderer — there is no editing. Wire it to a [Path Editor](../path-editor/) or any other source of a path string (a [Patch Memory](../../../guides/midi-automation/), a Text Entry, a List Entry, etc.) to display the shape.

Path Render and Path Editor share the same `d`-string format, so the same path can be edited in one and displayed in the other.

## Pins

| Pin | Type | Default | Description |
|-----|------|---------|-------------|
| Path | Text | (empty) | The SVG `d`-string. Supports `M L H V C Z` (absolute) and `m l h v c z` (relative). Nothing is drawn while empty |
| Fill Color | Text | `EEEEEE` | Hex `RRGGBB` or `AARRGGBB`. An **empty string disables the fill** |
| Stroke Color | Text | `000000` | Hex `RRGGBB` or `AARRGGBB`. An **empty string disables the stroke** |
| Stroke Width | Float | `1.0` | Stroke width in pixels. Zero or negative disables the stroke |

Closed subpaths (those ending in `Z`) are filled. Open subpaths are not filled even when a fill colour is set — only their stroke is drawn.
