# Boot Path

Australis OS v0 boots as a custom UEFI application. There is no BIOS boot sector, no stage-1/stage-2 loader, and no GRUB dependency in the current implementation.

## UEFI Entry

The generated binary is placed at:

```text
EFI/BOOT/BOOTX64.EFI
```

That path is the standard removable-media fallback path for x86_64 UEFI firmware. OVMF discovers and runs it automatically when QEMU exposes the build directory as a FAT drive.

## Build Command

The EFI application is compiled from C# with bflat:

```bash
bflat build --stdlib:zero --os:uefi --arch:x64 \
  -o build/efi/EFI/BOOT/BOOTX64.EFI \
  src/boot/Program.cs
```

`--stdlib:zero` keeps the runtime surface tiny, and `--os:uefi --arch:x64` emits a PE32+ x86_64 EFI application.

## QEMU and OVMF

The run target boots with OVMF firmware:

```bash
qemu-system-x86_64 \
  -machine q35 \
  -m 256M \
  -drive if=pflash,format=raw,readonly=on,file=/usr/share/OVMF/OVMF_CODE_4M.fd \
  -drive format=raw,file=fat:rw:build/efi \
  -net none
```

The FAT drive contains `EFI/BOOT/BOOTX64.EFI`, so the firmware can boot directly into Australis OS.
