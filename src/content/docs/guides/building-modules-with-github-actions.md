---
title: Building modules with GitHub Actions
description: Compile your own SynthEdit C++ module for Windows and macOS with GitHub Actions, build installers, and publish them to a GitHub Release every time you push a version tag. Covers the GMPI SDK and how the legacy SDK3 differs.
---

When you write a SynthEdit module in C++ — a custom oscillator, a filter, a DSP-library
wrapper — shipping it means compiling it for **both** Windows and macOS and giving users an
installer. Doing that by hand needs two machines and a fiddly toolchain on each.

This tutorial hands the whole job to **GitHub Actions**. When you push a version tag, GitHub
will:

```
   git tag v1.0.0  ─►  GitHub Actions
                         ├─ Windows runner ─►  CMake/MSVC  ─► Gain.gmpi ─► Inno Setup ─► TutorialGain-1.0.0-Windows.exe
                         ├─ macOS runner   ─►  CMake/clang ─► Gain.gmpi ─► pkgbuild   ─► TutorialGain-1.0.0-macOS.pkg
                         └─ release job ───►  GitHub Release  ◄── both installers attached
```

You don't need a build server, and you **don't need a Mac** — GitHub provides both runners,
and CMake downloads the SDK for you. Everything below is a working example you can fork:
**[github.com/JeffMcClintock/synthedit-module-example](https://github.com/JeffMcClintock/synthedit-module-example)**.

> This is the module counterpart to [Distributing plugins with GitHub Actions](../distributing-with-github-actions/).
> That one exports a whole `.synthedit` *project* as a VST3; this one compiles a C++
> *module* that other patches (and that exporter) can use. If you're new to writing modules,
> read the [C++ SDK guide](../sdk/) first.

## What you'll need

- A free **GitHub** account.
- A C++ module. We use a minimal **Gain** module written with the **GMPI SDK**, but any
  module works.
- Basic C++ and CMake familiarity. The build machines and the SDK are all in the cloud.

## How the example is laid out

```
synthedit-module-example/
├─ CMakeLists.txt                       ← master recipe (fetches the GMPI SDK)
├─ Gain/
│  ├─ CMakeLists.txt                    ← one gmpi_plugin() call
│  └─ Gain.cpp                          ← the module: pins, DSP, and its XML
├─ .github/workflows/build-module.yml   ← the pipeline
├─ installer/
│  ├─ windows/gain.iss                  ← Inno Setup script
│  └─ macos/build-pkg.sh                ← pkgbuild script
└─ assets/license.txt
```

## Step 1 — The module

A GMPI module is a C++ class plus a scrap of XML that tells SynthEdit about it. Here's the
whole `Gain.cpp`:

```cpp
#include "Processor.h"
using namespace gmpi;

struct Gain final : public Processor
{
    AudioInPin  pinInput;
    AudioOutPin pinOutput;
    FloatInPin  pinGain;

    Gain() { setSubProcess(&Gain::subProcess); }

    void subProcess(int sampleFrames)
    {
        auto input  = getBuffer(pinInput);
        auto output = getBuffer(pinOutput);
        const float gain = pinGain;

        for (int i = 0; i < sampleFrames; ++i)
            output[i] = gain * input[i];
    }
};

namespace {
auto r = Register<Gain>::withXml(R"XML(
<Plugin id="SynthEdit Tutorial Gain" name="Tutorial Gain" category="Examples" vendor="SynthEdit Tutorial">
  <Parameters>
    <Parameter id="0" name="Gain" datatype="float" default="0.8"/>
  </Parameters>
  <Audio>
    <Pin name="Input"  datatype="float" rate="audio"/>
    <Pin name="Output" datatype="float" rate="audio" direction="out"/>
    <Pin parameterId="0"/>
  </Audio>
</Plugin>
)XML");
}
```

- The class derives from **`Processor`** and declares its **pins** as members.
- **`subProcess`** runs once per audio block — this is where the DSP lives.
- **`Register<Gain>::withXml(...)`** registers the module and describes it. The `id` must be
  unique and stable across versions — it's how SynthEdit and saved projects identify your
  module.

## Step 2 — Building it

The build is plain **CMake**. The module's own `CMakeLists.txt` is a single call:

```cmake
gmpi_plugin(
    PROJECT_NAME Gain
    HAS_DSP
    FORMATS_LIST GMPI
    SOURCE_FILES Gain.cpp
)
```

The master `CMakeLists.txt` pulls the GMPI SDK from GitHub automatically with
`FetchContent` — so a fresh clone builds with no SDK to install by hand:

```cmake
FetchContent_Declare(gmpi
    GIT_REPOSITORY https://github.com/JeffMcClintock/GMPI
    GIT_TAG origin/main
    SOURCE_SUBDIR Core)
FetchContent_MakeAvailable(gmpi)
```

Build it the same way on either platform:

```bash
cmake -B build -DCMAKE_BUILD_TYPE=Release -S .
cmake --build build --config Release
```

You need **CMake 3.30+** and a **C++20** compiler (the SDK uses some C++20 types). The build
produces `Gain.gmpi` under the `build` folder (in a `Release/` subfolder with Visual Studio
or Xcode; directly under `build/Gain/` with Unix Makefiles).

A `.gmpi` looks slightly different per platform:

- **Windows** — a single `Gain.gmpi` file (it's a DLL with a `.gmpi` extension).
- **macOS** — a `Gain.gmpi` **bundle** (a folder, `Contents/MacOS/Gain`), built **universal**
  (Intel + Apple Silicon) thanks to `CMAKE_OSX_ARCHITECTURES` in the master CMakeLists.

## Step 3 — Wrapping it in an installer

A module is installed by dropping it into SynthEdit's modules folder — which the editor
scans recursively, so a per-vendor subfolder keeps things tidy:

| | Modules folder |
|---|---|
| **Windows** | `C:\Program Files\Common Files\SynthEdit\modules\<Vendor>\` |
| **macOS** | `/Library/Audio/Plug-Ins/GMPI/<Vendor>/` |

**Windows** uses [Inno Setup](https://jrsoftware.org/isinfo.php) (pre-installed on GitHub's
Windows runners):

```ini
[Setup]
DefaultDirName={commoncf}\SynthEdit\modules\SynthEdit Tutorial
...
[Files]
Source: "..\..\build\Gain\Release\Gain.gmpi"; DestDir: "{app}"; Flags: ignoreversion
```

> `{commoncf}` is **64-bit** Common Files in Inno — exactly where SynthEdit looks. (If you
> write a WiX installer instead, use `CommonFiles64Folder`, *not* `CommonFilesFolder`, which
> resolves to the 32-bit folder SynthEdit never scans.)

**macOS** uses `pkgbuild` to drop the bundle into the GMPI folder:

```bash
pkgbuild --root pkgroot --install-location / \
         --identifier com.example.gain --version "$VERSION" \
         TutorialGain-$VERSION-macOS.pkg
```

## Step 4 — The workflow

Everything is tied together by
[`.github/workflows/build-module.yml`](https://github.com/JeffMcClintock/synthedit-module-example/blob/main/.github/workflows/build-module.yml),
which triggers on any `v*` tag (plus a manual button), with three jobs:

- **`windows`** (`windows-latest`) — `cmake` build → Inno `.exe`.
- **`macos`** (`macos-latest`) — sets up the latest Xcode, `cmake` build (universal) → `.pkg`.
- **`release`** — waits for both, then attaches the installers to a GitHub Release using the
  built-in `GITHUB_TOKEN`, so there are **no secrets to configure**.

The build steps are just the two `cmake` commands — CMake and a compiler are pre-installed
on both runners:

```yaml
  macos:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v4
      - uses: maxim-lobanov/setup-xcode@v1
        with: { xcode-version: latest-stable }
      - run: |
          cmake -B build -DCMAKE_BUILD_TYPE=Release -S .
          cmake --build build --config Release
      - run: ./installer/macos/build-pkg.sh "${{ steps.ver.outputs.version }}"
      # ... upload artifact
```

> The first `cmake` configure downloads the GMPI SDK over the network. For faster builds you
> can cache CMake's `FetchContent` directory (`build/_deps`) between runs.

## Step 5 — Ship a release

```bash
git tag v1.0.0
git push origin v1.0.0
```

Open the **Actions** tab and watch the two builds run in parallel, then the release job
collect their installers. When it finishes, your installers are on the **Releases** page —
you can see a real run of exactly this on the example repo:
[**its latest release**](https://github.com/JeffMcClintock/synthedit-module-example/releases/latest)
and the [**Actions run**](https://github.com/JeffMcClintock/synthedit-module-example/actions)
that built it.

## Installing and loading the module

Run the installer, restart SynthEdit, and the module appears in the **Insert** browser under
the category its XML declares (*Examples* here). Because the installers are **unsigned**:

- **Windows** — SmartScreen shows "Windows protected your PC" → **More info → Run anyway**.
- **macOS** — right-click the `.pkg` → **Open**, or `xattr -dr com.apple.quarantine TutorialGain-1.0.0-macOS.pkg` first.

(The `.gmpi` itself needs no signing — SynthEdit loads modules from its own folder without
Gatekeeper involvement. Only the installer triggers the warnings.)

## The legacy SDK (SDK3) — what's different

SynthEdit has two C++ SDKs, and it loads modules from both:

- **GMPI** — the modern SDK (this tutorial). Output: `.gmpi`. Cross-platform GUI, optional
  VST3/AU/CLAP export from the same source, less boilerplate.
- **SDK3** — the long-standing SDK. Output: `.sem`. Still supported and still builds; most
  existing community modules use it.

**The build and packaging in this tutorial are identical for both** — CMake compiles either
one, and the installers just ship a different file extension. The differences are in the C++.
Here's the same Gain module in each:

```cpp
// GMPI                                    // SDK3
#include "Processor.h"                     #include "mp_sdk_audio.h"
struct Gain : public Processor {           class Gain : public MpBase2 {
    AudioInPin  pinInput;                      AudioInPin  pinInput;
    AudioOutPin pinOutput;                     AudioOutPin pinOutput;
    FloatInPin  pinGain;                       FloatInPin  pinGain;
    Gain() {                                   Gain() {
        setSubProcess(&Gain::subProcess);          initializePin(pinInput);   // every pin
    }                                              initializePin(pinOutput);
                                                   initializePin(pinGain);
                                               }
                                               void onSetPins() override {
                                                   setSubProcess(&Gain::subProcess);
                                               }
    // subProcess() identical                   // subProcess() identical
};                                         };
// XML inline in Register<>::withXml()      // XML in a separate Gain.xml file
```

| | GMPI | SDK3 |
|---|---|---|
| Header | `Processor.h` | `mp_sdk_audio.h` |
| Base class | `Processor` | `MpBase2` |
| Pin setup | automatic | `initializePin(pin)` for each |
| Pick process fn | in the constructor | in `onSetPins()` |
| Metadata XML | inline (or separate) | separate `.xml` file |
| Output | `.gmpi` | `.sem` |
| GUI | cross-platform (`PluginEditor::render`) | Windows GDI, or the cross-platform path |
| Multi-format | VST3 / AU / CLAP from one source | `.sem` only |

For new work, prefer **GMPI** — it's cross-platform end to end and less code. Reach for SDK3
when you're maintaining an existing `.sem`. The legacy SDK lives at
[github.com/JeffMcClintock/SynthEdit_SDK](https://github.com/JeffMcClintock/SynthEdit_SDK);
GMPI lives at [github.com/JeffMcClintock/GMPI](https://github.com/JeffMcClintock/GMPI).

## Going further

- **A custom GUI** — add `HAS_GUI` and a GUI class (`PluginEditor`) drawing with the
  cross-platform `gmpi::drawing` API; CMake then also fetches the GMPI-UI SDK.
- **Standalone plugin formats** — add `VST3 AU CLAP` to `FORMATS_LIST` and the same source
  also builds `.vst3`, `.component`, and `.clap`.
- **A universal bundle** — instead of two installers, merge the Windows DLL and the macOS
  bundle into one cross-platform `.gmpi` (see the [CommunityModules repo](https://github.com/JeffMcClintock/CommunityModules)).
- **Code signing** — sign the installer with a code-signing certificate (Windows) or a
  Developer ID + `notarytool` (macOS) to remove the first-run warnings.

---

Fork the example and push your first tag:
**[github.com/JeffMcClintock/synthedit-module-example](https://github.com/JeffMcClintock/synthedit-module-example)**.
