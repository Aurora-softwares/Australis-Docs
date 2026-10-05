# Requirements

The current v0 build targets Linux-style tooling and boots under QEMU with OVMF.

## Required Software

| Software | Purpose |
|----------|---------|
| Built self-hosted Hylang compiler (`hydrogen-stage1`) | Compiles Hylang to the constrained `uefi-x64` EFI proof target |
| `qemu-system-x86_64` | Runs the VM |
| OVMF firmware | Provides UEFI firmware for QEMU |
| `mtools` | Creates and populates the FAT boot image |
| `xorriso` | Creates the UEFI-bootable ISO |
| `make` | Runs the build targets |

On Ubuntu, the system packages are typically:

```bash
sudo apt install make qemu-system-x86 ovmf mtools xorriso
```

Build the compiler before building Australis:

```text
cd ../Hylang-Compiler
cmake -S . -B build
cmake --build build --target hydrogen_stage1
```

## Firmware Path

The default Makefile expects OVMF at:

```text
/usr/share/OVMF/OVMF_CODE_4M.fd
```

If Hylang or OVMF live elsewhere, pass their paths when running make:

```bash
make run HYDROGEN=/path/to/hydrogen-stage1 OVMF_CODE=/path/to/OVMF_CODE.fd
```
