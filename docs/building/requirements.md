# Requirements

The development build uses Linux-style tools and boots under QEMU with OVMF.

| Tool | Purpose |
| --- | --- |
| Self-hosted Hydrogen compiler | Builds the Hylang OS and application projects |
| `make` | Runs build and test targets |
| `mtools` (`mformat`, `mmd`, `mcopy`) | Builds the FAT EFI image |
| `xorriso` | Builds the hybrid UEFI ISO |
| Python 3 | Packs the HyFS root and runs smoke tests |
| `qemu-system-x86_64` and OVMF | Run and test the image |

On Ubuntu, the system packages are typically:

```bash
sudo apt install make python3 qemu-system-x86 ovmf mtools xorriso
```

The Makefile defaults to `../Hylang-Compiler/build/self_hosting/hydrogen-stage1`. Build the compiler from the adjacent source checkout if needed:

```bash
cd ../Hylang-Compiler
cmake -S . -B build
cmake --build build --target hydrogen_stage1
cd ../Australis-OS
```

Alternatively, set `HYDROGEN` to a compiler binary that supports the current `os`, raw `kernel`, and `exec` project formats:

```bash
make iso HYDROGEN=/path/to/hy
```

The default OVMF path is `/usr/share/OVMF/OVMF_CODE_4M.fd`. Override it when running QEMU:

```bash
make run OVMF_CODE=/path/to/OVMF_CODE.fd
```

The published Hydrogen `alpha-0.0.2` release predates some Australis project features. For this development build, use a compiler checkout with the raw-kernel and `.exec` support described above.
