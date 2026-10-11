# Boot path

Australis boots through 64-bit UEFI. Its bootloader is `EFI/BOOT/BOOTX64.EFI`, the removable-media fallback path. The hybrid ISO exposes a FAT EFI image through an El Torito UEFI entry and also has a GPT EFI System Partition for disk boot.

`src/bootloader/program.hy` clears the firmware console, prints progress, and loads `EFI/AUSTRALIS/KERNEL.BIN` from the same FAT volume. The bootloader validates the raw image's `AUKR` header and exact size, places its code in executable loader memory, captures the final memory map, exits boot services, switches to a dedicated 64 KiB kernel stack, and enters the kernel.

The 16-byte little-endian `AUKR` header contains the magic, version 1, code length, and entry offset 16. The kernel code is position independent. The kernel does not call UEFI services after the handoff.

Build both images with:

```bash
make build
```

Their output paths come from the `efi` and `kernel` manifests referenced by `src/australlis.hyproj`. See [Building and running](../building/) for ISO packaging and QEMU modes.
