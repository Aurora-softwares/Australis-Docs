# Debugging

Debugging for v0 is focused on proving that Hylang compiles to a UEFI binary which boots.

## Build Checks

Confirm the EFI binary exists:

```bash
make build
test -f build/efi/EFI/BOOT/BOOTX64.EFI
```

Confirm it is an x86_64 UEFI application:

```bash
file build/efi/EFI/BOOT/BOOTX64.EFI
```

Expected output includes:

```text
PE32+ executable for EFI (application), x86-64
```

## Boot Checks

Run:

```bash
make run
```

The QEMU window should show `Hello world from Hylang!` after OVMF starts the EFI application.

## Current Limits

There is no serial debug channel, logging framework, panic handler, debugger stub, or test harness yet. Those will become useful once v0 grows beyond a print-only boot milestone.
