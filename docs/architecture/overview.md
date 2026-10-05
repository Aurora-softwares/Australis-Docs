# Architecture Overview

Australis OS v0 is a minimal x86_64 UEFI boot milestone. It is not yet a full kernel with drivers or a shell; it is a native Hylang UEFI application that proves the language can boot in a VM and draw text to the firmware console.

## Boot Sequence

```text
QEMU
  └── OVMF UEFI firmware
        └── loads EFI/BOOT/BOOTX64.EFI
              └── enters Hylang code compiled by `hydrogen-stage1 compile --target uefi-x64`
                    └── prints "Hello world from Hylang!"
                    └── returns to the firmware after printing
```

## Source Layout

| Path | Role |
|------|------|
| `src/boot/Program.hy` | Hylang UEFI entry code |
| `Makefile` | Build, raw-image, ISO, run, and clean targets |
| `build/efi/EFI/BOOT/BOOTX64.EFI` | Generated UEFI application |
| `build/australis-hylang-hello.iso` | Generated UEFI-bootable ISO |

## Design Boundaries

v0 uses the UEFI text-output protocol through Hylang's deliberately constrained `uefi-x64` target. It does not use BIOS, real mode, GRUB, Limine, paging setup, a custom bootloader, C#, bflat, or a C/C++ shim.

The immediate goal is confidence in the boot path and language direction. Later milestones grow the Hydrogen compiler and the planned `Hydrogen.Uefi` library together, then replace this tiny firmware app with a kernel-like runtime.
