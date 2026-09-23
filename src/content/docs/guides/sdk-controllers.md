---
title: SDK — Controllers and Patch Parameters
description: Write a GMPI Controller that reads, watches and sets the parameters of a whole SynthEdit patch — with ControllerBase, pins bound to parameters, and three example modules explained.
---

Most modules only care about their own pins. A few need to see the **whole patch**: a *Randomise* button that scrambles every knob, a debug readout that shows which parameter just moved, a list of every parameter and its handle. Those modules use a **Controller** — a third piece of a GMPI module, next to the DSP and the GUI, that works with patch parameters rather than audio or drawing.

This page explains how Controllers work, using three example modules that ship with SynthEdit under **Insert → SDK Examples**:

| Module | What it does | Shows how to |
|---|---|---|
| **Parameters Query** | Lists every parameter in the patch, with its type and handle | List parameters, and react when any of them changes |
| **Randomise Parameters** | A button that sets every parameter to a random value | Send a click from the GUI to the Controller, and set other modules' parameters |
| **Last Parameter Update** | Shows the name and value of the most recent parameter change | Watch every parameter change, and decode its value |

The full source of all three is in [`modules/Diagnostics2`](https://github.com/JeffMcClintock/SynthEditLib/tree/main/modules/Diagnostics2) of the SynthEditLib repo. They're short — under 200 lines each — and worth reading alongside this page.

:::caution[Editor only, for now]
GMPI Controllers currently run inside the SynthEdit editor only. They're ideal for editing tools and diagnostics, but a Controller does **not** run inside an exported VST3 plugin yet.
:::

If you haven't built a module before, start with the [C++ SDK guide](../sdk/) — it covers the build setup this page assumes.

## Where a Controller fits

A GMPI module can have up to three parts, each declared in the module's XML:

- **Processor** — the DSP, on the audio thread.
- **GUI** (`<GUI graphicsApi="GmpiUi">`) — draws the panel and handles the mouse.
- **Controller** (`<Controller/>`) — sits between the module and SynthEdit's patch manager, on the UI thread.

The GUI can only reach its own pins. The Controller can **list every parameter in the patch**, **subscribe** to changes on all of them, and — with the right host interface — **set** any of them. That's why all three examples do the patch-wide work in the Controller and keep the GUI as a thin display.

The GUI and the Controller talk through the module's own **private parameters**. The GUI has a pin bound to the parameter, and so does the Controller; when one side writes the pin, the other side's pin updates.

## ControllerBase

GUI modules derive from `PluginEditor`, which handles the routine work. Controllers have the matching base class, `ControllerBase`, in [`helpers/GmpiPluginController.h`](https://github.com/JeffMcClintock/gmpi_ui/blob/main/helpers/GmpiPluginController.h):

```cpp
#include "helpers/GmpiPluginController.h"

class MyController final : public gmpi::controller::ControllerBase
{
    Pin<std::string> pinText;   // bound to parameter 0
    Pin<bool>        pinFlag;   // bound to parameter 1
    ...
};
```

`ControllerBase` takes care of:

- **Connecting to the host.** After `initialize()` your class has `host` (the `IControllerHost`) and `handle` ready to use.
- **Pins bound to parameters.** Pins are the same `Pin<T>` class GUI modules use. They bind to the module's parameters **in declaration order** — the first pin is parameter `id="0"`, the second is `id="1"`, and so on. Assigning to a pin sets its parameter; when the parameter changes, the pin's value updates and its `onUpdate` callback fires.
- **Routing notifications.** Changes to your own parameters go to their pins. Changes to any *other* parameter go to the virtual `onParameter()`, which you override if you care.
- **The COM-style chores** — `queryInterface`, reference counting, `syncState()` and the registration hook — so you don't write any of it.

If you override `initialize()`, call `ControllerBase::initialize()` first:

```cpp
ReturnCode initialize(gmpi::api::IUnknown* phost, int32_t phandle) override
{
    ControllerBase::initialize(phost, phandle);

    host->subscribe();   // also get told about every other parameter
    return ReturnCode::Ok;
}
```

### Parameters are identified by handle

Inside a module, a parameter has an **index** — the `id` in its XML. Across the whole patch, every parameter has a unique **handle**. `onParameter()` gives you handles, and so does the parameter list. For your own pins, `getParameterHandle(pin)` returns the handle a pin is bound to, which is handy for spotting — and skipping — your own parameters when you loop over the patch.

## Listing the patch's parameters

`synthedit::ParameterInformation`, in `Extensions/ParameterIterator.h`, collects a snapshot of every parameter in the patch:

```cpp
#include "Extensions/ParameterIterator.h"

synthedit::ParameterInformation info(host.get());

for (auto& param : info.parameters)
{
    // param.handle         unique id within the patch
    // param.datatype       gmpi::PinDatatype of the value
    // param.shortName      e.g. "Cutoff"
    // param.longName       slash-separated path, e.g. "Filter/Cutoff"
    // param.isHostControl  true for parameters SynthEdit drives itself
}
```

Building the list reads several fields from every parameter, so it isn't free. Build it when you need it, not on every change — see how *Last Parameter Update* caches it below.

### Host controls

Some parameters aren't the user's knobs at all. **Host controls** — *Program Modified*, *Patch Commands*, *Polyphony* and friends — are parameters SynthEdit sets itself. `isHostControl` lets you leave them out. In the examples, *Randomise Parameters* skips them so it doesn't randomise the polyphony or fire patch commands. *Last Parameter Update* skips them because *Program Modified* updates after every other change and would always be the last one shown.

## Example: Parameters Query

The simplest of the three. The Controller builds the parameter list as text and writes it to a pin; the GUI draws the text.

```cpp
class ParametersQueryController final : public gmpi::controller::ControllerBase, public TimerClient
{
    Pin<std::string> pinText;
    bool parametersDirty{};

public:
    ReturnCode initialize(gmpi::api::IUnknown* phost, int32_t phandle) override
    {
        ControllerBase::initialize(phost, phandle);
        host->subscribe();
        refreshParams();
        startTimerHz(4);
        return ReturnCode::Ok;
    }

    void onParameter(int32_t parameterHandle, gmpi::Field fieldId, int32_t voice, std::span<const uint8_t> data) override
    {
        parametersDirty = true;   // debounce: rebuild on the next timer tick
    }
    ...
};
```

Two things to notice:

- **Debouncing.** Dragging a knob sends a stream of changes. Instead of rebuilding the list on each one, `onParameter()` just sets a flag, and a 4 Hz timer does the rebuild.
- **Writing a pin only sends a real change.** `pinText = infoText;` does nothing if the text is unchanged, so the Controller's own write doesn't cause another update.

## Example: Randomise Parameters

This one shows both directions: the GUI tells the Controller something happened, and the Controller changes other modules' parameters.

**The GUI** draws a button and drives a private `bool` parameter — `true` while the mouse is down, `false` on release:

```cpp
ReturnCode onPointerDown(Point point, int32_t flags) override
{
    pressed = true;
    inputHost->setCapture();
    pinTrigger = true;           // the Controller acts on the rising edge
    drawingHost->invalidateRect(&bounds);
    return ReturnCode::Ok;
}
```

**The Controller** has a pin on the same parameter, and acts when it goes from `false` to `true`. Reacting only to that rising edge means a repeated notification can't randomise twice:

```cpp
RandomiseParametersController()
{
    pinTrigger.onUpdate = [this](PinBase*) { onSetTrigger(); };
}

void onSetTrigger()
{
    const bool risingEdge = pinTrigger.value && !trigger;
    trigger = pinTrigger.value;

    if (risingEdge)
        randomise();
}
```

### Setting other parameters: IParameterSetter

`IControllerHost::setParameter()` — and pins — can only set the module's **own** parameters. To set any parameter by handle, ask the host for `gmpi::api::IParameterSetter`:

```cpp
gmpi::shared_ptr<gmpi::api::IParameterSetter> parameterSetter;
phost->queryInterface(&gmpi::api::IParameterSetter::guid, parameterSetter.put_void());
```

Then randomising is a loop over the parameter list, writing a random **normalized** value (0.0 to 1.0). Normalized values let one loop handle every type of parameter: SynthEdit maps them onto each parameter's own range.

```cpp
for (auto& param : info.parameters)
{
    if (param.isHostControl
        || param.datatype == gmpi::PinDatatype::Blob
        || param.handle == getParameterHandle(pinTrigger))
        continue;

    const float normalized = distribution(randomGenerator);
    parameterSetter->setParameter(param.handle, gmpi::Field::Normalized, 0,
        sizeof(normalized), (const uint8_t*)&normalized);
}
```

It skips **host controls**, **blobs** (a normalized value means nothing for raw data), and **its own trigger** — randomising that would press the button again.

## Example: Last Parameter Update

This one watches every change and displays the latest as `name: value`. It shows how to decode a raw value and how to avoid feedback loops.

**Only value changes count.** A parameter change also sends notifications for other fields — normalized value, "grab" state (mouse down) and so on. The Controller ignores everything except `gmpi::Field::Value`:

```cpp
void onParameter(int32_t parameterHandle, gmpi::Field fieldId, int32_t voice, std::span<const uint8_t> data) override
{
    if (gmpi::Field::Value != fieldId || updating)
        return;

    auto description = describe(parameterHandle);
    if (!description || description->isHostControl)
        return;

    ...
}
```

**Caching names.** `onParameter()` only gives a handle and raw bytes. To show a name, the Controller needs the parameter list, but building it on every change would be slow while dragging a knob. So it keeps a map from handle to name and datatype, and only rebuilds it when it meets a handle it hasn't seen.

**Decoding the value.** The raw bytes are interpreted by the parameter's datatype — `float`, `double`, `int32`, `int64`, `bool`, UTF-8 `string`, or a wide string for SynthEdit *text* parameters (converted with `gmpi::unicode::to_utf8`). Check the byte count before copying, rather than trusting it.

**Avoiding feedback.** The display text is itself a parameter. Put two of these modules in one patch and each would display the other's text, which updates the other's text, forever. A simple guard breaks the loop: while the Controller is writing its own pin, it ignores incoming updates.

```cpp
updating = true;
pinText = text;
updating = false;
```

Watch for this whenever a Controller writes a parameter in response to parameter changes.

## Declaring it in XML

A module with a Controller declares `<Controller/>`, and registers the Controller class under the same id as the module:

```cpp
auto r = Register<RandomiseParametersGui>::withXml(R"XML(
<?xml version="1.0" encoding="UTF-8"?>
<Plugin id="SE Randomise Parameters" name="Randomise Parameters" category="SDK Examples">
    <Parameters>
      <Parameter id="0" datatype="bool" name="Trigger" private="true" ignorePatchChange="true" persistant="false" />
    </Parameters>
    <GUI graphicsApi="GmpiUi">
        <Pin name="Trigger" datatype="bool" parameterId="0" isMinimised="true"/>
    </GUI>
    <Controller/>
</Plugin>
)XML");

auto rc = Register<RandomiseParametersController>::withId("SE Randomise Parameters");
```

The parameters the GUI and Controller use to talk to each other are usually:

- `private="true"` — hidden from the DAW's automation list.
- `ignorePatchChange="true"` — not part of presets, so changing preset doesn't press the button.
- `persistant="false"` — not saved with the project, so it starts fresh every time.

After changing a module's XML, rescan modules so SynthEdit picks up the new declaration. Modules hot-reloaded from the [staging folder](../sdk/#the-live-coding-loop) are rescanned automatically.
