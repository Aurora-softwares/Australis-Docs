# Terminal

The current terminal is intentionally print-only. On boot, Australis OS writes one line to the UEFI console:

```text
Hello world from Hylang!
```

## Current Behavior

- Prints a fixed boot message.
- Returns to firmware after the write; QEMU/OVMF leaves the text visible.

## Not Yet Included

- Keyboard input
- Prompt rendering
- Command parsing
- Command history
- Built-in commands
- Serial mirroring

A real interactive shell is planned for a later milestone after the project has a stronger kernel runtime surface.
