# Requirements

## Platform

The v0 build system targets **Windows 10 or later (64-bit)**. All toolchain binaries are bundled inside the repository under `bin/`, so no separate installation or PATH configuration is needed.

A cross-platform build system is planned for the rewrite.

## Required software

| Software           | Version | Notes                                        |
|--------------------|---------|----------------------------------------------|
| Windows 10+        | 64-bit  | Build scripts are `.bat` files               |
| Visual Studio Code | Latest  | Used to trigger the build via **F5**         |
| NASM               | 2.16.01 | Bundled in `bin/nasm-2.16.01/`               |
| QEMU               | 8.0.0   | Bundled in `bin/qemu-8.0.0/`                 |
| MinGW-w64 (GCC)    | 11.2.0  | Bundled in `bin/mingw64-11.2.0/`             |

Because the toolchain is bundled, cloning the repository and pressing **F5** in VS Code is all that is required to build and run.

## Disk space

The repository includes pre-built toolchain binaries. Expect several hundred MB of disk space after cloning.

## Repository status

> The v0 source has not yet been pushed to the public repository. These docs will remain accurate once it is released. Watch the [GitHub repository](https://github.com/Aurora-Softwares/Australis-OS) for updates.
