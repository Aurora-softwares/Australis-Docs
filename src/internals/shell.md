# Terminal

The current terminal is intentionally print-only. On boot, Australis OS clears the UEFI console and writes one line:

```text
Australis OS booted from C#
```

## Current Behavior

- Clears the firmware text console before printing.
- Prints a fixed boot message.
- Waits forever so the message remains visible.

## Not Yet Included

- Keyboard input
- Prompt rendering
- Command parsing
- Command history
- Built-in commands
- Serial mirroring

A real interactive shell is planned for a later milestone after the project has a stronger kernel runtime surface.
