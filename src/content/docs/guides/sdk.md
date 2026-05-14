---
title: C++ SDK — Writing Your Own Modules
description: Extend SynthEdit by writing custom audio and GUI modules in C++ using the SEM v3 SDK.
---

SynthEdit ships with hundreds of built-in modules, and the community provides hundreds more — but sometimes you need behaviour nothing else gives you: an unusual filter topology, a third-party DSP library wrapper, a bespoke control widget. The **SEM v3 SDK** lets you build those modules in C++ and drop them straight into the editor alongside the factory library.

Modules you write with the SDK are first-class. They appear in the **Insert Module** browser, they wire into patches with cables, they get exported into VST3 plugins like any other module, and you can sell or freely distribute the plugins that use them.

## When to reach for the SDK

Reach for the SDK when:

- **No combination of built-in modules does what you need** — e.g. a specific oscillator algorithm, a proprietary DSP technique, a model-based filter.
- **You need to wrap an existing C/C++ library** — convolution engines, neural network inference, third-party reverbs.
- **You want a custom GUI widget** — a waveform display, an XY pad with non-trivial drawing, a meter with a particular ballistic.
- **Performance matters and a container of small modules is too slow** — a hand-rolled SEM avoids the per-module overhead.

If you can build it from existing modules and a [container](./containers/), do that first — it's faster to iterate and works without recompiling. The SDK is for the cases where containers run out of road.

## Prerequisites

- **A C++ compiler.** Visual Studio 2015 through 2022 on Windows (Community edition is fine), Xcode on macOS, or GCC. The SDK ships solution files for Visual Studio and an Xcode workspace for Mac.
- **CMake** if you want to build cross-platform or use the cloud build service.
- **A licensed copy of SynthEdit** installed locally — you'll be loading your module into it constantly while developing.
- **Working C++ knowledge.** The SDK is small and clean, but it's still C++ — pointers, headers, templates, the usual.

You do **not** need to compile SynthEdit itself. The SDK is a separate repo that links against headers and produces standalone `.sem` files (Windows) or `.bundle` files (Mac) that SynthEdit loads at startup.

## Getting the SDK

The SDK lives on GitHub:

```bash
git clone https://github.com/JeffMcClintock/SynthEdit_SDK
```

The repo contains the headers (`se_sdk3/`), a large library of example modules with full source, Visual Studio solution files, an Xcode workspace, and `CMakeLists.txt` for CMake builds. It uses a **BSD-style license** — you can redistribute it, ship it inside commercial plugins, and modify it freely.

If you'd rather grab a snapshot zip than clone, the [SDK page on synthedit.com](https://synthedit.com/software-development-kit/) has `se_sdk.zip` (latest) and `se_sdk_stable.zip` (last known-good release).

## Anatomy of an SEM v3 module

A module is two pieces of code working together:

- **The DSP side** — runs on the audio thread, processes samples and events block-by-block.
- **The GUI side** — runs on the UI thread, draws the module's panel face and handles mouse and keyboard input.

They live in the same binary but communicate through **parameters** (the recommended path) or low-level **message pipes** (for unusual cases). Parameters are automatically saved with the project, exposed to the host DAW for automation, and routed across the DSP/GUI boundary by the framework.

Each module also has a small **XML definition** describing it — its unique ID, display name, category, pin list, whether it's polyphonic, what graphics API its GUI uses. The XML is parsed by SynthEdit at load time so the module appears in the Insert Module browser without recompiling SynthEdit itself.

### Pins

Pins are typed. The SDK supports `float`, `int`, `bool`, `text`, `enum`, `blob` and `midi` pin types, each with input or output direction, and each running at either **audio rate** (one value per sample, streaming) or **event rate** (a value when it changes). Audio cables in the editor map to streaming `float` pins; the green "list" cables map to `enum` pins; the yellow MIDI cables map to `midi` pins.

See [Signal Types & Levels](./signal-types/) for a refresher on how those types appear in the editor.

## Bootstrapping a new module

Rather than write XML and C++ from scratch, let SynthEdit do it for you:

1. In the editor, right-click any existing module.
2. Pick **More → Build Code Skeleton**.
3. SynthEdit writes a starter project into `Documents\new_module\` containing the XML, a header, a `.cpp` file, and (for GUI modules) a GUI class — already wired up and compiling.

From there, you rename pins, add pins, fill in the processing function, and rebuild. The skeleton is the fastest path from "I have an idea" to "I'm changing C++ and hearing the result."

## The live-coding loop

The fastest development cycle uses SynthEdit's **staging folder** to pick up your latest build automatically. On Windows, add this as a post-build event to your Visual Studio project:

```
xcopy /c /y "$(OutDir)$(TargetName)$(TargetExt)" "C:\Program Files\Common Files\SynthEdit\modules-staged\"
```

Now every successful build drops the fresh `.sem` into a directory SynthEdit watches. Close and reopen the project (or restart SynthEdit) and your changes are live. No installer, no manual copy, no version-bumping the module's ID.

On Mac the equivalent is a `cp` step in the Xcode build phase, copying the `.bundle` into `~/Library/Application Support/SynthEdit/modules-staged/`.

## A minimal DSP module

The shape of a simple processing module looks like this — pins declared as members, initialized in the constructor, then `subProcess` does the work:

```cpp
class Gain : public MpBase {
public:
    Gain(IMpUnknown* host);
    void subProcess(int sampleFrames);
    void onSetPins() override;

private:
    FloatInPin  pinSignalIn;
    FloatInPin  pinGain;
    FloatOutPin pinSignalOut;
};

Gain::Gain(IMpUnknown* host) : MpBase(host) {
    initializePin(0, pinSignalIn);
    initializePin(1, pinGain);
    initializePin(2, pinSignalOut);
    setSubProcess(&Gain::subProcess);
}
```

`onSetPins()` fires when a pin's value changes — typically used to switch between processing variants or update internal state. `subProcess()` runs every audio block (typically 96 samples) and is where you actually multiply, filter, or oscillate.

The SDK repo's `examples/` folder has fuller versions of this pattern — a Gain, a Filter, a Wavetable Oscillator, an Envelope Generator — that you can copy and modify.

## Letting unused modules sleep

CPU matters in synths. The SDK has a built-in cooperative sleep system: a module marks its output as streaming or silent, and the host puts the whole module to sleep when its inputs are quiet. For modules with audio tails — reverbs, delays — this means zero CPU while the tail isn't ringing.

```cpp
bool active = pinSignalIn.isStreaming();
pinSignalOut.setStreaming(active);
setSleep(!active);
```

A reverb signals `streaming = true` while its tail is decaying, then `false` once the level drops below silence, and SynthEdit reclaims the CPU.

## DSP-to-GUI communication

The recommended pattern is a **parameter with an output pin on the DSP side and an input pin on the GUI side**, both referencing the same `parameterId` in the XML. Write to the DSP-side pin like you would any output:

```cpp
pinDisplayLevel = currentRms;   // DSP side, audio thread
```

The GUI side gets a callback when the value arrives:

```cpp
void onValueInChanged() {       // GUI side, UI thread
    repaint();
}
```

This is how meters, scopes, and any "DSP-driven display" widget work. The framework throttles updates to ~60 Hz so you can't accidentally swamp the GUI thread.

For unusual cases — large blobs, custom protocols — the SDK exposes a raw message pipe in both directions (`sendMessageToAudio`, `receiveMessageFromGui`). Use it sparingly; parameters are the right answer 95% of the time.

## Graphics

GUI modules draw with an API closely modelled on **Microsoft Direct2D**. The same drawing code compiles and runs on both Windows (native Direct2D) and Mac (an emulation layer that maps to Core Graphics) — so you write your widget once and it works on both platforms with no `#ifdef`s.

```cpp
Color black(Color::Black);
auto brush = g.CreateSolidColorBrush(black);
g.DrawRectangle(Rect(0, 0, 10, 10), brush);
```

If you've used Direct2D directly, the API will feel familiar; if you haven't, the example modules are a quick way in.

## Building for Mac without a Mac

You don't need to own a Mac to ship Mac builds. The **Community Modules build service** on Azure DevOps compiles both Windows and macOS targets in the cloud for free. You hand it a CMake project and source, and it returns built `.sem` and `.bundle` artifacts.

If you do have a Mac, the SDK's Xcode workspace builds Universal Binaries (Intel + Apple Silicon) directly.

## Distribution and licensing

Modules you write with the SDK are yours. There are no royalties, no per-copy fees, no "powered by" requirements. You can:

- Distribute your `.sem` files for free on the [community forum](https://synthedit.com/community/) or your own site.
- Ship them inside commercial VST3 plugins built with SynthEdit.
- Include them in commercial sample libraries, soundpacks, or kits.

The SDK's BSD license also lets you fork it, modify the headers, and ship the modified SDK alongside your modules — useful if you need to extend the framework itself.

## Where to go next

- **The SDK's example modules** — `examples/` in the [SynthEdit_SDK repo](https://github.com/JeffMcClintock/SynthEdit_SDK). Start by reading a small one (Gain), then a medium one (an oscillator), then a GUI module.
- **The SEM v3 reference documentation** at [synthedit.com/software-development-kit](https://synthedit.com/software-development-kit/) — the full API surface, every XML attribute, every pin flag.
- **The [mailing list](https://groups.io/g/synthedit)** — active community of module developers. Beginner questions are welcome; the people answering have shipped commercial plugins built on this SDK for over twenty years.
- **The [FAQ section on SDK & Custom Modules](./faq/#sdk--custom-modules)** for short answers to common questions.

For ideas, the [Music DSP archive](https://www.musicdsp.org/) is a goldmine of public-domain algorithms — many existing community modules started life as a Music DSP snippet pasted into a fresh SDK skeleton.
