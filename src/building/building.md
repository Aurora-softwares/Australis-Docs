# Building and Running

## The quick way — VS Code

1. Clone the repository.
2. Open the folder in **Visual Studio Code**.
3. Press **F5**.

VS Code triggers `build.bat`, which compiles the bootloader and kernel, assembles the disk image, and launches QEMU. The OS boots automatically in the QEMU window.

## What the build does

`build.bat` runs the following steps in order:

1. **Assemble the bootloader** — NASM compiles `src/bootloader.asm` to `out/bootloader.bin` in flat binary format.
2. **Compile the C++ kernel** — MinGW GCC cross-compiles `src/kernel.cpp` in 16-bit freestanding mode, then `objcopy` strips it to a raw `.text` binary at `tmp/kernel_cpp.bin`.
3. **Assemble the kernel wrapper** — NASM compiles `src/kernel.asm` (which `incbin`s `tmp/kernel_cpp.bin`) to `out/kernel.bin`.
4. **Combine** — `bootloader.bin` and `kernel.bin` are concatenated into `iso/Australis-OS-0.0.1.bin`.
5. **Create the disk image** — A 2 MB raw disk image is created (or resized) at `iso/Australis-OS-disk-2MB.img` via PowerShell, then the OS image is written to its start.
6. **Boot** — QEMU is launched with the disk image as an IDE drive.

## Running without recompiling

```bat
build.bat --no-compile
```

Skips steps 1–4 and goes straight to step 5/6, reusing whatever is already in `out/`.

## QEMU serial output

The kernel writes debug messages to COM1 at 38400 baud. QEMU is launched with `-serial stdio`, so these messages appear directly in the terminal window that VS Code opens alongside QEMU.

## Build outputs

| Path                           | Description                         |
|--------------------------------|-------------------------------------|
| `out/bootloader.bin`           | Assembled stage-1 bootloader        |
| `out/kernel.bin`               | Assembled stage-2 kernel wrapper    |
| `tmp/kernel_cpp.bin`           | Raw C++ kernel `.text` section      |
| `iso/Australis-OS-0.0.1.bin`        | Combined OS image                   |
| `iso/Australis-OS-disk-2MB.img`     | Virtual disk with OS at sector 0    |
