# Australis OS

[![License](https://img.shields.io/badge/License-Apache%202.0-blue?style=flat-square)](https://github.com/Aurora-Softwares/Australis-OS/blob/main/LICENSE)
[![Status](https://img.shields.io/badge/status-pre--release-orange?style=flat-square)](https://github.com/Aurora-Softwares/Australis-OS)
[![Docs](https://img.shields.io/badge/docs-online-brightgreen?style=flat-square)](https://aurora-softwares.github.io/Australis-Docs/)

Australis OS is a from-scratch x86 operating system built by [Aurora Softwares](https://github.com/Aurora-Softwares). The goal is a usable, self-contained OS built entirely without inheriting an existing kernel or OS base.

> **Note:** The v0 source code has not yet been pushed to the public repository. These docs describe the v0 architecture and design as it stands internally. The repo will be updated when v0 is ready for public release.

## What v0 implements

The current v0 iteration is a real-mode proof-of-concept that validates the full boot pipeline and a working interactive shell:

- A two-stage bootloader written in NASM that loads the kernel from disk using CHS addressing
- A freestanding C++ kernel running in 16-bit real mode
- Screen clear and text output via BIOS interrupt `0x10`
- Keyboard input via BIOS interrupt `0x16`
- A read-eval-print loop (REPL) with line editing (backspace support)
- A command dispatch table (`foo`, `clear`, `help`)
- COM1 serial debug output at 38400 baud, visible in QEMU's stdio
- A 2 MB virtual disk image built and launched with QEMU

## Toolchain

| Tool            | Version | Purpose                                     |
|-----------------|---------|---------------------------------------------|
| NASM            | 2.16.01 | Assembles the bootloader and kernel wrapper |
| GCC (MinGW-w64) | 11.2.0  | Cross-compiles the freestanding C++ kernel  |
| QEMU            | 8.0.0   | Runs the disk image for testing             |

All three are bundled inside the repository under `bin/` — no separate installation is needed.

## Quick start

Clone the repository and open it in **Visual Studio Code**. Press **F5** to build and launch the OS in QEMU. See [Building and Running](building/building.md) for the full step-by-step details.

## What comes next

v0 is intentionally minimal. The rewrite targets **x86-64 long mode**, uses a modern firmware boot path (UEFI / Limine), and will be written primarily in **[Hylang](https://github.com/Aurora-Softwares/Hylang-Compiler)** once the language's systems programming model matures. See the [Roadmap](roadmap.md) for the full plan.
