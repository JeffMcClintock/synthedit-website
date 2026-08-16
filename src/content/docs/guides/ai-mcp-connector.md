---
title: AI Assistant (MCP Connector)
description: Drive SynthEdit from an AI assistant — build patches, render screenshots, and bounce audio with natural-language prompts.
---

The SynthEdit MCP connector lets an AI assistant — Claude Code, Claude Desktop, Cursor, or any host that speaks the [Model Context Protocol](https://modelcontextprotocol.io) — drive the editor on your behalf. Ask for "a screenshot of an oscillator going through a low-pass filter" or "render the sound of the Phase Distortion oscillator" and the assistant builds the patch, takes a screenshot, or bounces a WAV file — without you opening the SynthEdit UI.

It's a thin wrapper around the headless `SynthEditCL` command-line tool, exposing each operation as a tool the assistant can call.

## What you can do with it

- **Build patches by description** — "wire an LFO into a filter's cutoff and render to a 96 kHz stereo WAV"
- **Take screenshots** — for documentation, blog posts, or sharing on the forum
- **Render audio offline** — at any sample rate, mono or stereo
- **Inspect projects** — load an existing `.synthedit` file and have the assistant explain its structure
- **Reproduce bugs** — give the assistant a repro recipe and let it generate the screenshot or audio sample

## Prerequisites

You need three things, all installed normally — **no source checkout, no compilation**:

1. **The headless `SynthEditCL` tool** — any 1.6.x build.
   - **macOS:** `SynthEditCL` ships inside `SynthEdit.app`. Just install SynthEdit and you're done — no extra step. (A standalone [SynthEditCL_mac.zip](https://synthedit.com/release_1_6/SynthEditCL_mac.zip) exists if you don't want the GUI.)
   - **Windows:** install the separate [SynthEditCL Installer](https://synthedit.com/release_1_6/SynthEditCL-Installer.exe) (small, standalone). See the [installation guide](../installation/#ai-assistant-support) for details.
   - **Linux:** download and extract [SynthEditCL for Linux](https://synthedit.com/release_1_6/SynthEditCL-linux-x64.tar.gz). Fully headless — no Wayland session or GPU needed, works over ssh and in CI. Extract it into `/opt` or your home directory and the server finds it automatically (see below).
2. **[Node.js 18 or later](https://nodejs.org/)** — needed to run the MCP server. The LTS download is fine.
3. **An MCP host** — e.g. [Claude Code](https://claude.com/claude-code) or [Claude Desktop](https://claude.ai/download).

## Configure your AI host

The MCP server is published on npm as [`@synthedit/mcp`](https://www.npmjs.com/package/@synthedit/mcp). Both Claude Code and Claude Desktop accept the same four-line JSON snippet — they just store it in different places.

### Claude Code

Add this to your project's `.mcp.json` (recommended — sits with the project) or to your user-scope `~/.claude.json`:

```json
{
  "mcpServers": {
    "synthedit": {
      "command": "npx",
      "args": ["-y", "@synthedit/mcp"]
    }
  }
}
```

Restart Claude Code (fully quit, not just close the window). On reopen, approve the `synthedit` server when prompted — or run `/mcp` and enable it. The `se_*` tools then appear in the assistant's toolbox.

### Claude Desktop

Same JSON, but it goes in `claude_desktop_config.json`:

- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

Restart Claude Desktop after editing.

### Other hosts

Any MCP-compatible host accepts the same `command` / `args` shape. Consult the host's documentation for where its server config lives.

## How the server finds SynthEdit

The MCP server auto-detects your installed SynthEdit on all three platforms. You don't need to point it at anything in the common case. It checks, in order:

1. **Standard install locations:**
   - **macOS**: `/Applications/SynthEdit.app/Contents/MacOS/SynthEditCL`
   - **Windows**: `%ProgramFiles%\SynthEdit\SynthEditCL.exe` or `%ProgramFiles%\SynthEditCL\SynthEditCL.exe` (whichever the SynthEditCL installer used). Also tries `(x86)` variants.
   - **Linux**: `/opt/SynthEditCL/SynthEditCL` and `~/SynthEditCL/SynthEditCL` — extracting the tarball into `/opt` or your home directory is enough.
2. **Your `PATH`**: `SynthEditCL` (`SynthEditCL.exe` on Windows) in any `PATH` directory — like `which`/`where`. So ticking "Add to PATH" in the Windows installer, or symlinking the executable into a `bin` directory on Linux/macOS, works no matter where the install actually lives.

If your install is somewhere the above can't see — a portable copy, a development build, an MSIX-sandboxed install on Windows, etc. — set the `SE_CLI` environment variable in the host config with the full path:

```json
{
  "mcpServers": {
    "synthedit": {
      "command": "npx",
      "args": ["-y", "@synthedit/mcp"],
      "env": {
        "SE_CLI": "/full/path/to/SynthEditCL"
      }
    }
  }
}
```

> **Windows MSIX tip:** MSIX installs drop the binary in `%ProgramFiles%\WindowsApps\<long-id>\`, which the auto-detect can't reach. Run `Get-Command SynthEditCL` in PowerShell after launching SynthEdit once to find the actual path, then put it in `SE_CLI`.

## Try it

In a chat with your assistant:

> Show me a screenshot of an oscillator going through a low-pass filter.

The assistant should:

1. Call `se_list_modules` once to discover module IDs and pin layouts.
2. Call `se_script` with a sequence like:
   - `--new`
   - `--add-module "SE Oscillator (naive)" 100,100 --as osc`
   - `--add-module "1 Pole LP" 400,100 --as filt`
   - `--connect $osc:"Audio Out" $filt:"Signal"`
   - `--screenshot ~/Desktop/osc_filt.png --view structure --transparent`
3. Hand you back the PNG.

A more involved task:

> Render two seconds of the Phase Distortion oscillator at 96 kHz with the Reso2 waveform.

The assistant builds the patch, sets the `Wave1` enum to 6 (Reso2), and calls `se_render_audio` with a duration and sample rate.

## Available tools

Each tool maps to one or more `SynthEditCL` verbs. Names are stable across versions.

| Tool | Purpose |
|---|---|
| `se_list_modules` | Dump the factory module catalogue (IDs, pin schemas) as XML. The assistant reads this to discover what to build with. |
| `se_load`, `se_save_as` | Open / persist `.synthedit` files. |
| `se_new` | Create an empty document. |
| `se_add_module` | Insert a module by unique ID. |
| `se_set_pin` | Set a pin's parameter value (filenames, floats, enums). |
| `se_get_param`, `se_set_param` | Read/write a live parameter value (by module + parameter id) — how you put a plugin into a specific state before rendering or screenshotting it. |
| `se_connect` | Wire two pins together. |
| `se_select`, `se_deselect_all`, `se_delete`, `se_rename`, `se_containerise` | Document edits. |
| `se_screenshot` | Render a PNG of the panel, structure view, module browser, or properties pane. |
| `se_render_audio` | Bounce a WAV file (mono or stereo, any sample rate). |
| `se_audio` | Start/stop/query the audio engine on a running editor (`se_attach`'d, not the headless CLI, which has no audio device). |
| `se_dump` | Read out the current document's modules + cables as JSON. |
| `se_rescan` | Rebuild SynthEdit's plugin cache so a module you just built or installed becomes visible to the other tools. |
| `se_reset` | Discard the headless session and start fresh — cheap, useful after a crash or to get back to a known-clean state. |
| `se_attach`, `se_detach` | Point every tool at a *running* editor window instead of the headless session, so edits appear live in front of the user, then hand control back. |
| `se_hover`, `se_drag`, `se_pointer`, `se_pointer_move`, `se_pointer_up`, `se_key`, `se_type` | Low-level GUI interaction — hover, drag, click and type directly on the live panel, for exercising controls (sliders, dropdowns, in-place editors) the way a user would. |
| `se_script` | Run a multi-line script of any of the above in one shot. Document state now persists across every tool call in a session automatically (see below) — reach for `se_script` as a batching convenience once a sequence is longer than ~5 calls, or when you need to wire a pin by name (see tip below), not because it's required to share state. |

## Tips for prompting

- **Be specific about output paths**: include a full absolute path like `~/Desktop/out.png` or `C:/Users/me/Desktop/out.png`. Relative paths are interpreted by SynthEdit's file resolver, which may not pick the directory you expect.
- **Ask for stereo when you want it**: "render stereo" → assistant uses both `from` and `from_r` arguments. Otherwise you'll get mono.
- **High-DPI for documentation**: ask for "2× scale" or "300 DPI" when you need crisp screenshots — the renderer bumps internal resolution rather than upscaling.
- **Inspect before changing**: ask the assistant to "dump the current document and show me the module list" to learn what's there before asking for edits.
- **Wire prefabs (Slider2, Knob2, and other Controls) by pin name, via `se_script`**: `se_list_modules` only publishes the pin schema for factory modules, not for prefabs — a placed Slider2 has no listed pins to look an index up in. `se_script`'s `--connect` accepts an exact pin name (e.g. `"$slider:Slider"`), which resolves immediately; the atomic `se_connect` tool only takes numeric indices, which means guessing.
- **Select more than one module before containerising**: `se_select` adds to the current selection rather than replacing it, so calling it once per module (call `se_deselect_all` first to start clean) and then `se_containerise` groups all of them — there's no separate "multi-select" tool or flag.
- **A pin's on-screen label isn't always its lookup name**: a few modules render a friendlier caption than their internal pin name (e.g. List Entry's output is captioned "Value Out" in the structure view, but its real name — what `se_connect`/`se_script` need — is "Choice"). If a named connect fails, the error message lists every real pin name, type and direction on that module; use that rather than what a screenshot shows.
- **A documented pin that's missing from a properties screenshot may just be hidden**: some pins are minimised by default (e.g. a container's own `Polyphony` pin) and never appear in an `se_screenshot` of the Properties pane. You can usually still set them blind with `se_set_pin` using the pin's name from a saved project's XML.

## Known limitations

- **A plugin's own configuration dialog is out of reach.** Something like the Patch Automator's MIDI-learn/assign dialog is drawn and driven by the module itself; synthetic clicks from `se_pointer`/`se_drag` don't reach it (the panel view treats the click as a selection instead). Drive the underlying patch data directly with `se_set_pin`/`se_set_param` rather than trying to operate the dialog.
- **A native dropdown's open list isn't visible to `se_screenshot`.** Clicking a List Entry's combo box doesn't change the captured bitmap — the expanded option list is a native OS popup rendered outside whatever surface gets captured. To confirm a control's available choices or change its selection, drive the value directly with `se_set_param`/`se_get_param` and screenshot the *closed* control before/after, rather than trying to see the list open.
- **`se_script`'s batched `--screenshot` doesn't take `--crop`.** The atomic `se_screenshot` tool's `crop`/`crop_margin` options aren't exposed as CLI flags inside a script. Call the atomic `se_screenshot` tool on its own when you need a cropped image.

## Updating

The npm package is a thin wrapper. The SynthEdit engine — modules, DSP, file format — lives inside your installed copy of SynthEdit. **Updating SynthEdit through the regular installer is enough**; new modules and engine bug fixes flow through automatically with no `npm update` and no Claude restart needed.

The wrapper itself only changes when its own behaviour does — a path-resolution fix, a new ergonomic tool surface, an MCP SDK upgrade. Realistic cadence: a couple of wrapper releases per year.

## Troubleshooting

**The `se_*` tools don't appear in the assistant** — the MCP server didn't start. Check that Node.js is installed (`node --version` should print `v18.x` or higher), and that `npx -y @synthedit/mcp` runs from a terminal without errors. Then fully quit and reopen your AI host.

**"SynthEditCL not found" error** — the auto-detect didn't locate the executable. Add `SE_CLI` to the `env` block of your MCP config with the full path to `SynthEditCL` (or `SynthEditCL.exe` on Windows). See "How the server finds SynthEdit" above.

**`se_screenshot` or `se_render_audio` produces output in the wrong place** — most likely the assistant used a relative path. Always ask for absolute output paths.

**Atomic edit tools say "no document loaded"** — the tools share one long-lived session now, so this shouldn't happen in normal use: `se_new`/`se_load` followed by any number of separate `se_add_module`, `se_connect`, etc. calls all see the same document, even across many individual tool calls with no `se_script` involved. If you do hit this, the session was most likely discarded by an `se_rescan` (which ends it deliberately, so a rebuilt plugin cache doesn't get adopted by a stale process) or by a crash — call `se_new`/`se_load` again to start a fresh session, or `se_reset` to force a clean one.

## Advanced: build from source

If you want to contribute to the MCP server itself or run an unreleased version, clone the SynthEdit repo and point the host at your local build instead of the npm package:

```bash
git clone --depth 1 https://github.com/JeffMcClintock/SynthEdit
cd SynthEdit/SynthEditMcp
npm install
npm run build
```

```json
{
  "mcpServers": {
    "synthedit": {
      "command": "node",
      "args": ["/path/to/SynthEdit/SynthEditMcp/dist/index.js"]
    }
  }
}
```

The server walks up from its own file location looking for a sibling `build/` folder — so if you also have a CMake build of SynthEditCL in the same checkout, no env var is needed.

## More

- **npm package:** [@synthedit/mcp](https://www.npmjs.com/package/@synthedit/mcp)
- **Source code:** [github.com/JeffMcClintock/SynthEdit/tree/master/SynthEditMcp](https://github.com/JeffMcClintock/SynthEdit/tree/master/SynthEditMcp)
- **MCP specification:** [modelcontextprotocol.io](https://modelcontextprotocol.io)
