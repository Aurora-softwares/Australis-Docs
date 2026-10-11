# Kernel

The freestanding kernel begins at `KernelMain.Run(long bootInfo)` after the UEFI bootloader has ended boot services. It runs a compiled Hylang method graph from a raw `AUKR` image. It does not use Linux, .NET, or firmware calls.

## Current services

- Physical pages, owned virtual mappings, and page-backed objects, arrays, and strings.
- A GDT, IDT, PIC/APIC interrupt handling, timer, and an allocation-free fatal exception report.
- PCI discovery, MMIO mappings, DMA buffers, and AHCI or NVMe block-device access.
- GPT validation, a VFS, and a read-only HyFS root. An opt-in HyFS v2 image adds directories and metadata.
- A COM1 shell, framebuffer terminal, USB keyboard input, and one USB mass-storage device mounted at `/usb`.
- A checked AUEX interpreter for `.exec` programs, with terminal and read-only file syscalls.

The kernel initializes its own page-table hierarchy and removes the null-page mapping. The panic path captures the exception frame and registers, writes a report directly to polled COM1 and the framebuffer, then halts. It can be exercised with the `panic-test` shell command; this intentionally stops the VM.

The current storage and USB paths are bounded bootstrap implementations. Native ring-3 processes, a general writable root filesystem, multiple simultaneous USB devices, and broad physical hardware validation are still in progress. See the [roadmap](../roadmap) for the remaining work.
