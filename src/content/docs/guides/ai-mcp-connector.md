---
title: AI Assistant (MCP Connector)
description: Drive SynthEdit from an AI assistant — build patches, render screenshots, and bounce audio with natural-language prompts.
---

The SynthEdit MCP connector lets an AI assistant (Claude Code, Claude Desktop, Cursor, or any host that speaks the [Model Context Protocol](https://modelcontextprotocol.io)) drive the editor on your behalf. Ask for "a screenshot of an oscillator going through a low-pass filter" or "render the sound of the Phase Distortion oscillator" and the assistant builds the patch, takes a screenshot, or bounces a WAV file — all without you opening the SynthEdit UI.

It's a thin wrapper around the headless `SynthEditCL.exe` command-line tool, exposing each operation as a tool the assistant can call.

## What you can do with it

- **Build patches by description** — "wire an LFO into a filter's cutoff and render to a 96 kHz stereo WAV"
- **Take screenshots** — for documentation, blog posts, or sharing on the forum
- **Render audio offline** — at any sample rate, mono or stereo
- **Inspect projects** — load an existing `.synthedit` file and have the assistant explain its structure
- **Reproduce bugs** — give the assistant a repro recipe and let it generate the screenshot or audio sample

## Prerequisites

1. **SynthEdit** installed (any 1.6.x build).
2. **`SynthEditCL.exe`** — the headless command-line tool. On Windows it ships alongside SynthEdit; on macOS download from [synthedit.com/release_1_6](https://synthedit.com/release_1_6/) or build from source.
3. **Node.js 18+** — required to run the MCP server. Get it from [nodejs.org](https://nodejs.org/) (LTS is fine).
4. **An MCP host** — e.g. [Claude Code](https://claude.com/claude-code) or [Claude Desktop](https://claude.ai/download).

## Install

The MCP server lives in the [SE16 repo](https://github.com/JeffMcClintock/SynthEdit) under `SynthEditMcp/`. Until prebuilt releases are available, build it from source:

```bash
git clone --depth 1 https://github.com/JeffMcClintock/SynthEdit
cd SynthEdit/SynthEditMcp
npm install
npm run build
```

The compiled server lands at `SynthEditMcp/dist/index.js`.

## Configure your AI host

### Claude Code

Add this to your project's `.claude/settings.json` or your user `~/.claude/settings.json`:

```json
{
  "mcpServers": {
    "synthedit": {
      "command": "node",
      "args": ["C:/path/to/SynthEdit/SynthEditMcp/dist/index.js"],
      "env": {
        "SE_CLI": "C:/path/to/SynthEditCL.exe"
      }
    }
  }
}
```

Adjust both paths for your install. **Restart Claude Code** so the new server is registered. After restart, type `/mcp` to confirm `synthedit` shows up — and you'll see new tools like `se_screenshot`, `se_render_audio`, and `se_script` in the assistant's toolbox.

### Claude Desktop

Same JSON, but in `claude_desktop_config.json`:

- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

Restart the app after editing.

### Other hosts

Any MCP-compatible host accepts the same `command` / `args` / `env` shape. Consult the host's docs for where the config lives.

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
   - `--screenshot C:/Users/.../osc_filt.png --view structure --transparent`
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
| `se_connect` | Wire two pins together. |
| `se_select`, `se_deselect_all`, `se_delete`, `se_containerise` | Document edits. |
| `se_screenshot` | Render a PNG of the panel or structure view. |
| `se_render_audio` | Bounce a WAV file (mono or stereo, any sample rate). |
| `se_dump` | Read out the current document's modules + cables as JSON. |
| `se_script` | Run a multi-line script of any of the above in one shot — preferred for multi-step flows. |

## Tips for prompting

- **Be specific about output paths**: include a full absolute path like `C:/Users/me/Desktop/out.png`. Relative paths are interpreted by SynthEdit's file resolver, which may not pick the directory you expect.
- **Ask for stereo when you want it**: "render stereo" → assistant uses both `from` and `from_r` arguments. Otherwise you'll get mono.
- **High-DPI for documentation**: ask for "2× scale" or "300 DPI" when you need crisp screenshots — the renderer bumps internal resolution rather than upscaling.
- **Inspect before changing**: ask the assistant to "dump the current document and show me the module list" to learn what's there before asking for edits.

## Troubleshooting

**"se_list_modules" hangs or fails** — usually means `SynthEditCL.exe` can't find the factory `.sem` modules. Check the `SE_CLI` path and that SynthEdit is installed in the standard location. If you built SynthEditCL yourself, set `SE_BUILD_FOLDER` env var on the MCP server to point at your `build/` directory.

**The assistant says "no document loaded"** — atomic edit tools like `se_add_module` only operate within a single CLI invocation. Use `se_script` for any multi-step flow that builds a graph then renders it. (The assistant should reach for `se_script` automatically.)

**Output WAV / PNG isn't where you asked** — most likely the path was relative. Always pass absolute paths.

## More

- Source: [github.com/JeffMcClintock/SynthEdit/tree/master/SynthEditMcp](https://github.com/JeffMcClintock/SynthEdit/tree/master/SynthEditMcp)
- The CLI behind it: [SynthEditCL/CLAUDE.md](https://github.com/JeffMcClintock/SynthEdit/blob/master/SynthEditCL/CLAUDE.md) — every verb, output shape, and edge case
- MCP spec: [modelcontextprotocol.io](https://modelcontextprotocol.io)
