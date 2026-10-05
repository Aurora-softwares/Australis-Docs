# Building and Running

Run these commands from the `Australis-OS` repository.

## Build

```bash
make build
```

This compiles the Hylang source:

```text
src/boot/Program.hy
```

into:

```text
build/efi/EFI/BOOT/BOOTX64.EFI
```

The output should identify as a PE32+ x86_64 EFI application:

```bash
file build/efi/EFI/BOOT/BOOTX64.EFI
```

## Create the Bootable ISO

```bash
make iso
```

This creates:

```text
build/australis-hylang-hello.iso
```

The ISO contains a FAT EFI boot image at its UEFI El Torito boot entry. Use `make image` as well when a raw FAT disk image is useful.

## Run in QEMU

```bash
make run
```

The VM should boot through OVMF and print:

```text
Hello world from Hylang!
```

## Clean

```bash
make clean
```

This removes generated build artifacts under `build/`.
