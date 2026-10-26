# Architecture overview

Australis has a UEFI bootloader and a separate freestanding Hylang kernel. The self-hosted Hydrogen compiler builds both from the `src/australis.hyproj` OS project.

```text
QEMU / OVMF
  → EFI/BOOT/BOOTX64.EFI (PE32+ bootloader)
  → EFI/AUSTRALIS/KERNEL.BIN (raw AUKR kernel)
  → kernel memory, paging, interrupts and devices
  → read-only HyFS 2 root through AHCI or NVMe
  → /System/Core/System.exec (PID 1)
  → Device and Storage readiness checks, then CommandShell.exec
  → checked AUEX programs or bounded native AUN1 children
```

The bootloader loads and validates the raw kernel, captures the final firmware memory map, exits UEFI boot services, switches to a dedicated kernel stack, and calls `KernelMain.Run(long bootInfo)`. After handoff, the kernel uses its own services; firmware text output is replaced by COM1 and direct framebuffer output. Recovery boot or a failed system image enters KMon without depending on PID 1.

## Source and image layout

| Path | Role |
| --- | --- |
| `src/bootloader/program.hy` | UEFI boot and kernel handoff |
| `src/kernel/KernelMain.hy` | Kernel entry and subsystem initialization |
| `src/kernel/` | Memory, interrupts, PCI, USB, storage, VFS, console and user runtime |
| `src/kernel/user/` | AUEX runtime, process records, and native ring-3 execution |
| `src/userland/system/` | PID 1 and service startup source |
| `src/applications/Applications.hyproj` | Aggregate for bundled `.exec` applications |
| `rootfs/` | Static HyFS root files |
| `build/australis-hyfs2.iso` | Default hybrid boot and root-filesystem image |

The default root is read-only HyFS 2, selected from the ISO's GPT partition table by type GUID. A separate HyFS 2 data disk can mount writable at `/data`; HyFS 1 has a compatibility image. AUEX programs run through a checked interpreter with bounded memory, process, terminal, file, and channel APIs. AUN1 is a small native format loaded from read-only `/System/Bin` into ring 3 with private user mappings, an unmapped stack guard, and supervisor-only kernel mappings. Native syscalls currently cover PID, exit, and bounded terminal writes; most application APIs still use AUEX.
