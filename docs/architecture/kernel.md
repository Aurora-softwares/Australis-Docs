# Kernel

The freestanding kernel begins at `KernelMain.Run(long bootInfo)` after the UEFI bootloader has ended boot services. It runs a compiled Hylang method graph from a raw `AUKR` image. It does not use Linux, .NET, or firmware calls.

## Current services

- Physical pages, owned virtual mappings, and page-backed objects, arrays, and strings.
- A GDT, IDT, PIC/APIC interrupt handling, timer, and an allocation-free fatal exception report.
- PCI discovery, MMIO mappings, DMA buffers, and AHCI or NVMe block-device access.
- GPT validation, a VFS, and a read-only HyFS 2 root. An optional `/data` volume supports checked writes.
- A KMon recovery console with `status` and `bootinfo` inspection, a framebuffer terminal, USB keyboard input, and one USB mass-storage device mounted at `/usb`.
- A checked AUEX interpreter for `.exec` programs, with process records, cooperative scheduling, terminal/file calls, and bounded channel IPC.
- Bounded AUN1 ring-3 children with private user mappings, code/data/stack pages, a stack guard, TSS entry, PID/exit syscalls, and contained page or general-protection faults.

Australis uses hardware ring 0 for the kernel and ring 3 for AUN1 children. Rings 1 and 2 are unused. AUEX isolation is enforced by interpreter checks inside ring 0; it is not a third hardware privilege level. A native child fault releases its owned pages and records the fault while PID 1 and KMon continue.

The kernel initializes its own page-table hierarchy and removes the null-page mapping. The fatal panic path reports to polled COM1 and the framebuffer, then halts. The intentional `panic` command is available from KMon in `D` debug boot; `make test-kernel-panic` checks it in QEMU.

The current storage and USB paths are bounded bootstrap implementations. Native terminal/file/IPC syscalls, native preemption, multiple simultaneous USB devices, and broad physical hardware validation are still in progress. See the [roadmap](../roadmap) for remaining work.
