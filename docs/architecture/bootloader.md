# Boot Path

Australis OS v0 boots as a custom UEFI application. There is no BIOS boot sector, no stage-1/stage-2 loader, and no GRUB dependency in the current implementation.

## UEFI Entry

The generated binary is placed at:

```text
EFI/BOOT/BOOTX64.EFI
```

That path is the standard removable-media fallback path for x86_64 UEFI firmware. The ISO build places it in a FAT EFI boot image and exposes that image through an El Torito UEFI boot entry.

## Build Command

The EFI application is compiled from Hylang with the self-hosted compiler:

```bash
hydrogen-stage1 compile src/boot/Program.hy --target uefi-x64 \
  -o build/efi/EFI/BOOT/BOOTX64.EFI
```

The constrained target emits a PE32+ x86_64 EFI application with no managed runtime.

## QEMU and OVMF

The run target boots with OVMF firmware:

```bash
qemu-system-x86_64 \
  -machine q35 \
  -m 256M \
  -drive if=pflash,format=raw,readonly=on,file=/usr/share/OVMF/OVMF_CODE_4M.fd \
  -cdrom build/australis-hylang-hello.iso \
  -net none
```

The ISO's FAT boot image contains `EFI/BOOT/BOOTX64.EFI`, so the firmware can boot directly into Australis OS.
