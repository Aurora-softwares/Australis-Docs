# Architecture Overview

Australis OS v0 is a real-mode x86 OS. Everything runs in 16-bit mode using BIOS services — there is no protected mode, paging, or memory management unit involvement yet.

## Boot sequence

```
BIOS
  └── loads sector 0 (bootloader.asm) to 0x7C00
        └── loads remaining sectors to 0x1000:0
              └── far-returns into kernel.asm
                    └── calls kernel_main() in kernel.cpp
                          └── REPL loop
```

## Memory layout

| Address         | Contents                                       |
|-----------------|------------------------------------------------|
| `0x7C00`        | Stage-1 bootloader (loaded by BIOS)            |
| `0x1000:0x0000` | Kernel image start (loaded by bootloader)      |
| `0x1000:entry`  | Kernel entry point (read from image header)    |
| `0xFFFE`        | Stack top (set by kernel wrapper)              |

## Source files

| File                   | Role                                              |
|------------------------|---------------------------------------------------|
| `src/bootloader.asm`   | Stage-1: loads the kernel from disk               |
| `src/kernel.asm`       | Stage-2: sets up stack, embeds C++ binary, calls `kernel_main` |
| `src/kernel.cpp`       | C++ kernel: screen, keyboard, shell, serial debug |
| `src/commands.hpp`     | Command dispatch table                            |
| `build.bat`            | Build and launch script                           |

## Toolchain flags

The C++ kernel is compiled with strict freestanding flags to produce raw machine code with no runtime dependencies:

```
-m16                          16-bit code generation
-ffreestanding                no standard library
-fno-exceptions               no C++ exception tables
-fno-rtti                     no runtime type info
-nostdlib                     no CRT startup
-fno-stack-protector          no canary overhead
-Os                           optimize for size
```

`objcopy` then strips the output to just the `.text` section, which `kernel.asm` embeds via `incbin`.
