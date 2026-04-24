# Architecture Overview

Australis OS v0 is a minimal x86_64 UEFI boot milestone. It is not yet a full kernel with drivers or a shell; it is a native C# UEFI application that proves the project can boot in a VM and draw text to the firmware console.

## Boot Sequence

```text
QEMU
  └── OVMF UEFI firmware
        └── loads EFI/BOOT/BOOTX64.EFI
              └── enters C# code compiled by bflat
                    └── clears the console
                    └── prints "Australis OS booted from C#"
                    └── waits forever
```

## Source Layout

| Path | Role |
|------|------|
| `src/boot/Program.cs` | C# UEFI entry code |
| `Makefile` | Build, image, run, and clean targets |
| `build/efi/EFI/BOOT/BOOTX64.EFI` | Generated UEFI application |
| `build/australis-uefi.img` | Generated FAT boot image |

## Design Boundaries

v0 uses UEFI firmware services through bflat's UEFI target and `System.Console` support. It does not use BIOS, real mode, GRUB, Limine, paging setup, a custom bootloader, or a C/C++ shim.

The immediate goal is confidence in the boot path and language direction. Later milestones can replace this tiny UEFI app with a more kernel-like runtime, then move toward Hydrogen once the language is ready for low-level work.
