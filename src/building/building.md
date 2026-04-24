# Building and Running

Run these commands from the `Australis-OS` repository.

## Build

```bash
make build
```

This compiles:

```text
src/boot/Program.cs
```

into:

```text
build/efi/EFI/BOOT/BOOTX64.EFI
```

The output should identify as a PE32+ x86_64 EFI application:

```bash
file build/efi/EFI/BOOT/BOOTX64.EFI
```

## Create the Boot Image

```bash
make image
```

This creates:

```text
build/australis-uefi.img
```

The image contains the generated EFI binary at `EFI/BOOT/BOOTX64.EFI`.

## Run in QEMU

```bash
make run
```

The VM should boot through OVMF, clear the screen, and print:

```text
Australis OS booted from C#
```

## Clean

```bash
make clean
```

This removes generated build artifacts under `build/`.
