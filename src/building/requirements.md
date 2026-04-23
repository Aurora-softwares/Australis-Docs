# Requirements

## Platform

The current build system is **Windows 10 or later (64-bit)**. All toolchain binaries are supplied inside the repository under `bin/`, so no separate installation is required beyond the items listed below.

A cross-platform build system is a goal for the rewrite.

## Required software

| Software           | Version   | Notes                                      |
|--------------------|-----------|--------------------------------------------|
| Windows 10+        | 64-bit    | Build scripts are `.bat` files             |
| Visual Studio Code | Latest    | Used to trigger the build via F5           |
| NASM               | 2.16.01   | Supplied in `bin/nasm-2.16.01/`            |
| QEMU               | 8.0.0     | Supplied in `bin/qemu-8.0.0/`              |
| MinGW-w64 (GCC)    | 11.2.0    | Supplied in `bin/mingw64-11.2.0/`          |

Because the toolchain is bundled in the repo, cloning and pressing F5 in VS Code is sufficient — no PATH configuration is needed.

## Disk space

The repository includes pre-built toolchain binaries which are large. Expect several hundred MB after cloning.
