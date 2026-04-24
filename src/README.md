# Australis OS

[![Status](https://img.shields.io/badge/status-v0_booting-green?style=flat-square)](https://github.com/Aurora-Softwares/Australis-OS)
[![Docs](https://img.shields.io/badge/docs-online-brightgreen?style=flat-square)](https://aurora-softwares.github.io/Australis-Docs/)

Australis OS is a from-scratch x86_64 operating system project by [Aurora Softwares](https://github.com/Aurora-Softwares). The current milestone is deliberately small: boot a 64-bit UEFI virtual machine from C# and print a message to the screen.

## Current v0 State

Australis OS v0 currently implements:

- A 64-bit x86 UEFI application compiled from C#.
- A `BOOTX64.EFI` entry at the standard removable-media path, `EFI/BOOT/BOOTX64.EFI`.
- A QEMU + OVMF boot path.
- A clean screen followed by:

```text
Australis OS booted from C#
```

The current terminal is print-only. Keyboard input, commands, filesystems, interrupts, drivers, process management, and Hydrogen integration are intentionally out of scope for this first boot milestone.

## Why C#

The kernel entry is written in C# because C# is close enough to Hydrogen's planned feel to let the project explore OS structure while Hydrogen continues to mature. For v0, C# is compiled ahead of time with `bflat` using its tiny `zero` standard library profile, so the result is a native UEFI binary rather than a normal managed application that depends on an existing OS.

## Quick Start

From the `Australis-OS` repository:

```bash
make build
make run
```

See [Building and Running](building/building.md) for the full flow.
