# Aura OS

[![License](https://img.shields.io/badge/License-Apache%202.0-blue?style=flat-square)](https://github.com/Aurora-Softwares/Aura-OS/blob/main/LICENSE)
[![Version](https://img.shields.io/badge/version-0.0.1-green?style=flat-square)](https://github.com/Aurora-Softwares/Aura-OS)
[![Docs](https://img.shields.io/badge/docs-online-brightgreen?style=flat-square)](https://aurora-softwares.github.io/Aura-Docs/)

Aura OS is a from-scratch x86 operating system built by [Aurora Softwares](https://github.com/Aurora-Softwares). The goal is a usable, eventually graphical OS built entirely without relying on an existing kernel or OS base.

> **Note:** The current codebase (v0) is an early proof-of-concept that establishes the two-stage boot pipeline and a basic real-mode shell. A full ground-up rewrite is planned. These docs describe what exists today.

## What works today

- A two-stage bootloader written in NASM that loads the kernel from disk
- A freestanding C++ kernel running in x86 real mode
- Screen clear and text output via BIOS interrupts
- Keyboard input via BIOS interrupts
- A basic read-eval-print loop (REPL) with backspace support
- A command dispatch table (`foo`, `clear`, `help`)
- COM1 serial debug output at 38400 baud (visible in QEMU's stdio)
- A 2 MB virtual disk image built and launched with QEMU

## Toolchain

| Tool         | Version | Purpose                        |
|--------------|---------|--------------------------------|
| NASM         | 2.16.01 | Assembles the bootloader and kernel wrapper |
| GCC (MinGW)  | 11.2.0  | Cross-compiles the C++ kernel  |
| QEMU         | 8.0.0   | Runs the disk image for testing |

## Quick start

Clone the repository and open it in VS Code. Press **F5** to build and launch the OS in QEMU. See [Building and Running](building/building.md) for the full details.
