---
sidebar_position: 1
---

# Australis OS

Australis OS is an experimental x86-64 operating system written in Hydrogen (Hylang). A UEFI bootloader enters a separate freestanding kernel, which mounts a read-only HyFS 2 root from AHCI or NVMe storage. Normal boot starts `System.exec` as PID 1; it runs readiness checks and starts the text command shell. KMon remains a kernel-owned recovery console.

The default hybrid UEFI ISO boots in QEMU with OVMF. The current AHCI and NVMe tests cover system startup, shell commands, IPC, native user-mode fault containment, and KMon recovery. Physical-machine boot and release readiness have not been established.

## Try the current build

From the `Australis-OS` repository, after building the development Hydrogen compiler and installing the [required tools](building/requirements):

```bash
make iso
make run-serial
```

Normal boot reaches `australis> `. Enter `help`, `ls`, `cat /hello.txt`, or `ps`. `exit` returns to `kmon> `. Use `make run` for a QEMU window with framebuffer output and USB keyboard input. Press `R` during the boot window to enter KMon directly. See [Building and running](building/) for other boot and storage modes.

## Current scope

- The Hylang bootloader is a PE32+ EFI application; the kernel is a position-independent `AUKR` raw image and uses no firmware calls after handoff.
- The kernel owns memory, paging, interrupts, framebuffer/COM1 terminals, VFS, and KMon recovery.
- HyFS 2 is the default read-only root. An optional separate HyFS 2 data volume mounts writable at `/data`. HyFS 1 remains for compatibility tests.
- Bundled Hylang `exec` projects compile to checked AUEX programs. Their process, file, terminal, and channel APIs run through a software-enforced interpreter.
- Bounded AUN1 programs from the read-only `/System/Bin` tree run in hardware ring 3 with private mappings and a guarded stack. Native `int 0x80` currently provides PID and exit; terminal, file, and IPC syscalls have yet to move to this path.

This remains a bootstrap operating system. Native preemption, broad hardware coverage, and a general native application runtime are still future work. See the [architecture](architecture/overview) and [roadmap](roadmap).
