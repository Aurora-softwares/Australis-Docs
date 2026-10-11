---
sidebar_position: 1
---

# Australis OS

Australis OS is an experimental x86-64 operating system written in Hylang. A UEFI bootloader loads a separate raw kernel, leaves firmware boot services, and starts a freestanding kernel. The current development build has an interactive shell, AHCI and NVMe storage, a mounted HyFS root, USB keyboard or storage support, and checked `.exec` user programs.

The default image is a hybrid UEFI ISO. In QEMU with OVMF, it boots from optical media and attaches the same image as a disk so the kernel can read its HyFS partition.

## Try the current build

From the `Australis-OS` repository, after building the self-hosted Hydrogen compiler and installing the [required tools](building/requirements):

```bash
make iso
make run
```

Click the QEMU display to give its USB keyboard focus. At the `australis> ` prompt, enter `help`, `ls`, or `cat /hello.txt`. For a shell in the launching terminal, use `make run-serial` instead. See [Building and running](building/) for the other boot and storage modes.

## Current scope

- The Hylang bootloader is a PE32+ EFI application; the kernel is a position-independent `AUKR` raw image and uses no firmware calls after handoff.
- The kernel owns memory, paging, interrupts, a framebuffer console, COM1 input, and a bounded shell.
- AHCI or NVMe supplies the boot filesystem. HyFS v1 is the default read-only root; HyFS v2 is available as an opt-in image.
- Bundled Hylang `exec` projects compile to checked AUEX programs that run through a software-enforced user address space.

This remains a bootstrap operating system. Native ring-3 processes, preemptive threads, broad hardware coverage, and a general application runtime are still future work. See the [architecture](architecture/overview) and [roadmap](roadmap).
