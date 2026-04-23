# Roadmap

## Current iteration — v0

The v0 codebase is a proof-of-concept that validates the two-stage boot pipeline and establishes that a freestanding C++ kernel can be assembled, loaded, and run from real hardware constraints. It is not the final design.

**What v0 proves:**

- A custom stage-1 NASM bootloader can load a multi-sector kernel from disk using CHS addressing
- A freestanding C++ translation unit can run in 16-bit real mode with no runtime or standard library
- BIOS interrupts (int 0x10, 0x13, 0x16) are sufficient for basic screen, disk, and keyboard I/O
- COM1 serial output works at 38400 baud for debug visibility in QEMU
- A flat command dispatch table is a workable starting structure for a shell

## The rewrite

The current codebase will be replaced from the ground up. The rewrite targets **x86-64 (long mode)** exclusively and will be written primarily in **[Hylang](https://github.com/Aurora-Softwares/Hylang-Compiler)**, Aurora Softwares' own systems programming language, once it reaches sufficient maturity.

### Target design

- **Architecture:** x86-64 only, long mode from the start
- **Primary language:** Hylang for kernel and userland code
- **Boot:** UEFI or a modern multiboot protocol (e.g., Limine)
- **Memory model:** proper virtual memory with paging
- **No real-mode dependency:** BIOS calls replaced by firmware-agnostic drivers

### Rough phase plan

| Phase | Goal |
|-------|------|
| 0 | Hylang matures enough to write kernel-adjacent code (unsafe model, pointer support, no-runtime profiles) |
| 1 | New bootloader and kernel skeleton in long mode, basic UEFI or Limine boot |
| 2 | Memory management: physical allocator, virtual memory, paging |
| 3 | Basic process model and kernel/user separation |
| 4 | VGA/framebuffer text output without BIOS |
| 5 | Keyboard and timer drivers |
| 6 | Filesystem (read-only to start) |
| 7 | First userland programs written in Hylang |
| 8 | Shell and core utilities |
| 9 | Graphical subsystem (long-term) |

The exact scope of each phase will be refined as Hylang's systems programming model matures. See the [Hylang roadmap](https://aurora-softwares.github.io/Hylang-Docs/roadmap.html) for the language-side prerequisites.

## What is not changing

The goal remains the same: a usable OS built entirely from scratch, without inheriting an existing kernel. The only change is the language (Hylang instead of C/C++), the architecture (x86-64 long mode instead of real mode), and the boot path (firmware-agnostic instead of BIOS-only).
