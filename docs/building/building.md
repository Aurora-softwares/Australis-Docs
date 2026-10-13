# Building and running

Run these commands from the `Australis-OS` repository. Check [Requirements](requirements) first.

## Build the boot images

```bash
make build
```

This builds `src/australlis.hyproj`, an `os` project that references separate `efi` and `kernel` projects. The outputs are:

```text
build/efi/EFI/BOOT/BOOTX64.EFI
build/efi/EFI/AUSTRALIS/KERNEL.BIN
```

The first file is a PE32+ UEFI bootloader; the second is a raw `AUKR` kernel image. You can inspect them with `file` and build the project directly with `hy build src/australlis.hyproj -o build/efi` when using a compatible compiler.

## Package the root filesystem and ISO

```bash
make iso
```

The build compiles application projects from `applications/Applications.hyproj` to `.exec` files, stages them with `rootfs/`, creates a read-only HyFS image, and produces `build/australis-hylang.iso`. The hybrid ISO contains a UEFI boot entry, GPT EFI System Partition, and HyFS partition.

`make image` creates `build/australis-hylang-uefi.img`, a FAT-only image containing the EFI files. Use the ISO for a live HyFS root. For the optional HyFS v2 directory format, use `make iso-hyfs2`.

## Run in QEMU

| Command | Boot and console |
| --- | --- |
| `make run` | ISO boot, AHCI root, graphical framebuffer and USB keyboard |
| `make run-serial` | ISO boot, AHCI root, COM1 shell in the terminal |
| `make run-nvme` | ISO boot, NVMe root, graphical framebuffer and USB keyboard |
| `make run-serial-nvme` | ISO boot, NVMe root, COM1 shell |
| `make run-disk` | Boot from the ISO's GPT EFI partition as an AHCI disk |
| `make run-usb-storage` | AHCI root plus a second read-only HyFS volume at `/usb` |

Wait for `kmon> `, then try `help`, `ls`, `cat /hello.txt`, or `run /user-demo.exec`. The `run` command launches a checked user program; `ps` reports its last result. The USB storage mode uses COM1 input because the live xHCI path currently owns one root-port device.

For HyFS v2, run `make run-hyfs2-serial` or `make run-hyfs2-nvme-serial`. A separate persistent data disk is available through `make hyfs2-data-disk` and `make run-hyfs2-data-ahci` or `make run-hyfs2-data-nvme`; see the OS repository's `docs/hyfs-v2.md` for its format and recovery rules.

## Clean

```bash
make clean
```

This removes `build/`, including a data disk kept at the default `build/hyfs2-data.img` path. Put `HYFS2_DATA_DISK` outside `build/` if you need to retain it across cleans.
