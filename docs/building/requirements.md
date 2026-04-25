# Requirements

The current v0 build targets Linux-style tooling and boots under QEMU with OVMF.

## Required Software

| Software | Purpose |
|----------|---------|
| `bflat` v8.0.2 or compatible | Compiles C# to a native x86_64 UEFI application |
| `qemu-system-x86_64` | Runs the VM |
| OVMF firmware | Provides UEFI firmware for QEMU |
| `mtools` | Creates and populates the FAT boot image |
| `make` | Runs the build targets |

On Ubuntu, the system packages are typically:

```bash
sudo apt install make qemu-system-x86 ovmf mtools libc++1-18 libc++abi1-18 libunwind-18
```

If `bflat` is not installed globally, the OS repo can use a local copy at:

```text
tools/bflat/bflat
```

## Firmware Path

The default Makefile expects OVMF at:

```text
/usr/share/OVMF/OVMF_CODE_4M.fd
```

If your system uses a different path, pass it when running make:

```bash
make run OVMF_CODE=/path/to/OVMF_CODE.fd
```
