# Chicken On Tree Screaming on Terminal Error - VS Code Extension

A VS Code extension that plays a "chicken-on-tree-screaming" sound every time a command fails in the terminal.

## Features

- Plays the **chicken-on-tree-screaming** sound when a terminal command exits with a non-zero exit code
- Toggle the sound on/off via command palette
- Adjustable volume (0.0 to 1.0)
- Works on Linux, macOS, and Windows

## Requirements

- VS Code 1.93 or later
- **Linux**: `ffplay` (from ffmpeg), `paplay` (PulseAudio), or `aplay` (ALSA)
- **macOS**: `afplay` (built-in)
- **Windows**: PowerShell (built-in)

## Commands

| Command | Description |
|---------|-------------|
| `Chicken On Tree Screaming: Toggle Error Sound` | Enable/disable the sound |
| `Chicken On Tree Screaming: Test Sound` | Play the sound to test it |

## Settings

| Setting | Default | Description |
|---------|---------|-------------|
| `chickenOnTreeScreaming.enabled` | `true` | Enable/disable the sound |
| `chickenOnTreeScreaming.volume` | `0.5` | Volume level (0.0 to 1.0) |

## Installation (Production)

### Install the .vsix file

1. Open VS Code.
2. Press `Ctrl+Shift+P` and search for `Extensions: Install from VSIX...`.
3. Select the `chicken-on-tree-screaming-1.0.0.vsix` file from this folder.
4. Reload VS Code if prompted.

Or use the command line:

```bash
code --install-extension chicken-on-tree-screaming-1.0.0.vsix
```

### Audio tool setup

#### Linux
- For best results, install at least one of these tools:
  - `ffplay` (from ffmpeg):
    ```bash
    sudo apt install ffmpeg
    ```
  - `paplay` (PulseAudio):
    ```bash
    sudo apt install pulseaudio-utils
    ```
  - `aplay` (ALSA):
    ```bash
    sudo apt install alsa-utils
    ```
- The extension will try all three automatically.

#### macOS
- No setup needed. `afplay` is built-in and used by the extension.

#### Windows
- No setup needed. PowerShell is used to play the sound.

## How to package

```bash
npm install -g @vscode/vsce
vsce package
```

This will create a `.vsix` file you can install in VS Code.
