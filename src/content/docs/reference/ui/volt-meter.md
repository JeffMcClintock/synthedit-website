---
title: Volt Meter
description: Displays input voltage for debugging.
---

The **Volt Meter** shows the current voltage of the input signal as a numeric readout. Primarily a debugging tool.

## Inputs

| Pin | Type | Description |
|-----|------|-------------|
| Signal In | Audio | Signal to measure |

## Parameters

| Property | Description |
|----------|-------------|
| Mode | DC Average or AC RMS measurement |
| Update Rate | Display refresh speed |
| Hint | Tooltip text |

## Usage Notes

In a polyphonic container, the Volt Meter only shows one voice at a time. Set the container's polyphony to 1 to get a consistent single-voice reading.
