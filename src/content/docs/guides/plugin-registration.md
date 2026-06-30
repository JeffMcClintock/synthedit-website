---
title: Registration System for your Plugins
description: Add a basic serial-number registration system to your SynthEdit plugins using the Registration Check, Registration Serial Generator, and User Setting modules.
---

SynthEdit includes a set of modules that let you add a basic **registration system** to a
commercial plugin. You issue each customer a serial number tied to their name (or email),
the plugin checks that serial on load, and you unlock features — or remove a "demo"
limitation — only when a valid serial is present.

This is intentionally a *lightweight* scheme: it discourages casual copying, not a
determined attacker. It needs no internet connection and no licence server.

## The modules involved

| Module | Category | Role |
| --- | --- | --- |
| **Registration Serial Generator** | Special | *Your* tool for creating serials. **Never ship this to customers.** |
| **Registration Check** | Special | Lives inside your plugin. Verifies a name + serial and outputs a `Is Valid` boolean. |
| **User Setting - Text** | Sub-Controls | Stores a piece of text (the name, the serial) on disk so it survives a restart. |

The **Registration Check** module has these pins:

- **Rego Name** — the registered user's name.
- **Serial** — the serial number to check.
- **Random Seed** — a whole number unique to *your* product (see below).
- **Is Valid** *(output)* — `true` only when the serial matches the name for that seed.

The **Registration Serial Generator** has the matching **Rego Name**, **Random Seed**, and a
**Serial** *(output)* pin that produces the correct serial for that name + seed.

## How it works

1. The plugin reads the saved **name** and **serial** from two **User Setting - Text** modules.
2. It feeds them into a **Registration Check** module along with your secret **Random Seed**.
3. If **Is Valid** is `true`, you enable the full plugin (e.g. drive an LED indicator, bypass a
   noise/mute, or unlock a feature). If not, the plugin runs in demo mode.

Because the serial is derived from the name and the seed, the same name always produces the
same serial — so you can re-issue a customer's serial at any time just by running the
generator again.

## Storing the name and serial

Use **two** *User Setting - Text* modules — one for the name, one for the serial. Each has:

- **Product** — a name **unique to your plugin** (e.g. `Acme SuperSynth`). This decides which
  file on disk the value is saved in.
- **Key** — identifies the setting *within* that file, e.g. `Registration Name` and `Serial`.
- **Default** — the value used before the user has entered anything.
- **value in** — connect this to your text-entry control so the user can type their details.
- **Value** *(output)* — the saved value, read back on the next load.

The settings are written to a small XML file:

- **Windows:** `C:\Users\<UserName>\AppData\Local\<Product>\Preferences.xml`
- **macOS:** `~/Library/Preferences/<Product>/Preferences.xml`

:::caution[Use a unique Product name and a unique Random Seed]
Give **every** product its own **Product** name *and* its own **Random Seed**. If two plugins
share a seed, a serial issued for one will also unlock the other. If they share a Product name,
their settings collide in the same file.
:::

## Setting it up

1. Add two **User Setting - Text** modules — set their **Product** to your plugin's unique name,
   and their **Key** to `Registration Name` and `Serial` respectively.
2. Add a text-entry (or similar) control on your panel for each, feeding the **value in** pins,
   so customers can paste in the name and serial you send them.
3. Add a **Registration Check** module. Wire the two saved **Value** outputs into its **Rego
   Name** and **Serial** pins, and set its **Random Seed** to your secret number.
4. Use the **Is Valid** output to gate your plugin — light an LED, un-mute the audio, enable a
   feature, etc.

## Issuing a serial to a customer

1. In a *separate* SynthEdit project (one you keep private), drop in a **Registration Serial
   Generator**.
2. Set its **Random Seed** to the **same** number you used in the Registration Check.
3. Type the customer's name into **Rego Name**.
4. Read the **Serial** output and send that name + serial to the customer.

Serials are generated one at a time, by hand — there is no batch/automatic issuing built in.

## A note on sandboxed DAWs (macOS)

On macOS, many hosts run plugins inside a **sandbox** — a security feature that gives the
plugin its own private, walled-off storage area instead of the user's real home folder.
Logic Pro, GarageBand, and all AUv3 (Audio Unit v3) plugins are sandboxed; most other
DAWs (Reaper, Live, Cubase, Bitwig, Studio One…) are not.

The practical consequence for registration: a sandboxed host keeps its **own private copy**
of the settings file, separate per host. So a customer who registers your plugin in one
sandboxed app may be asked to register **again** when they load it in a different app,
because the second app can't see the first one's saved serial.

This is a platform limitation, not a bug in the modules. If a single machine-wide
registration matters to you, the robust options are to store the licence somewhere shared
across hosts (written by your installer, or in the macOS Keychain) rather than relying on
per-host settings — or to simply accept that the user registers once per host. On Windows,
and in non-sandboxed macOS DAWs, the saved registration is shared normally and this does not
arise.

## Limitations

- It's a deterrent, not strong copy protection — the check happens entirely on the user's machine.
- Serials are issued manually, one per customer.
- On sandboxed macOS hosts the registration is per-host (see above).
