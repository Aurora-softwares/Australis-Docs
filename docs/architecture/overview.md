# Architecture overview

Australis has a UEFI bootloader and a separate freestanding Hylang kernel. The self-hosted Hydrogen compiler builds both from the `src/australlis.hyproj` OS project.

```text
QEMU / OVMF
  → EFI/BOOT/BOOTX64.EFI (PE32+ bootloader)
  → EFI/AUSTRALIS/KERNEL.BIN (raw AUKR kernel)
  → kernel memory, paging, interrupts and devices
  → HyFS root mounted through AHCI or NVMe
  → shell and checked .exec programs
```

The bootloader loads and validates the raw kernel, captures the final firmware memory map, exits UEFI boot services, switches to a dedicated kernel stack, and calls `KernelMain.Run(long bootInfo)`. After handoff, the kernel uses its own services; firmware text output is replaced by COM1 and direct framebuffer output.

## Source and image layout

| Path | Role |
| --- | --- |
| `src/bootloader/program.hy` | UEFI boot and kernel handoff |
| `src/kernel/KernelMain.hy` | Kernel entry and subsystem initialization |
| `src/kernel/` | Memory, interrupts, PCI, USB, storage, VFS, console and user runtime |
| `applications/Applications.hyproj` | Aggregate for bundled `.exec` applications |
| `rootfs/` | Static HyFS root files |
| `build/australis-hylang.iso` | Hybrid boot and root-filesystem image |

The default root is read-only HyFS v1, selected from the ISO's GPT partition table by type GUID. HyFS v2 is an opt-in image with directories and metadata. The checked AUEX runtime gives `.exec` programs bounded code and data regions, terminal and read-only file operations, and an instruction limit. It is currently software-enforced isolation rather than native ring-3 execution.
