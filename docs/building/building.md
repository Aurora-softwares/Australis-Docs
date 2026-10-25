# Building and running

Run these commands from the `Australis-OS` repository. Check [Requirements](requirements) first.

## Build the boot images

```bash
make build
```

This builds `src/australis.hyproj`, an `os` project that references separate `efi` and `kernel` projects. The outputs are:

```text
build/efi/EFI/BOOT/BOOTX64.EFI
build/efi/EFI/AUSTRALIS/KERNEL.BIN
```

The first file is a PE32+ UEFI bootloader; the second is a raw `AUKR` kernel image. You can inspect them with `file` and build the project directly with `hy build src/australis.hyproj -o build/efi` when using a compatible compiler.

## Package the root filesystem and ISO

```bash
make iso
```

The build compiles application projects from `applications/Applications.hyproj` to `.exec` files, stages them with `rootfs/`, creates a read-only HyFS 2 image, and produces `build/australis-hyfs2.iso`. The hybrid ISO contains a UEFI boot entry, GPT EFI System Partition, and HyFS 2 partition.

`make image` creates `build/australis-hylang-uefi.img`, a FAT-only image containing the EFI files. Use the ISO for a live HyFS root. HyFS 1 remains available through `make iso-hyfs1` for compatibility tests.

## Run in QEMU

| Command | Boot and console |
| --- | --- |
| `make run` | HyFS 2 ISO boot, AHCI root, graphical framebuffer and USB keyboard |
| `make run-serial` | ISO boot, AHCI root, COM1 shell in the terminal |
| `make run-nvme` | ISO boot, NVMe root, graphical framebuffer and USB keyboard |
| `make run-nvme-serial` | ISO boot, NVMe root, COM1 shell |
| `make run-disk` | Boot from the ISO's GPT EFI partition as an AHCI disk |
| `make run-usb-storage` | AHCI root plus a second read-only HyFS volume at `/usb` |
| `make run-data-ahci` / `make run-data-nvme` | Separate writable HyFS 2 data disk at `/data` |

Normal boot reaches `australis> `. Try `help`, `ls`, `cat /hello.txt`, or `ps`. `run /System/Bin/name.exec` launches a packaged checked AUEX program or a bounded native AUN1 image. `exit` returns to `kmon> `; `R` during the boot selection window enters KMon directly. The USB storage mode uses COM1 input because the live xHCI path currently owns one root-port device.

The explicit HyFS 2 commands are `make run-serial-hyfs2` and `make run-nvme-serial-hyfs2`. A separate persistent data disk is available through `make data-disk-hyfs2` and `make run-data-ahci` or `make run-data-nvme`; see the OS repository's `docs/hyfs-v2.md` for its format and recovery rules.

For a standalone raw HyFS 2 image, `python3 tools/hyfs2.py check volume.img` reads both superblock generations and reports invalid records plus unreferenced nonzero blocks. It does not repair the image; old copy-on-write data and leaked writes can look the same without an allocation bitmap.

## Check the boot and isolation paths

```bash
make test-userland-system-boot
make test-userland-stage5-ipc
make test-native-user-mode
make test-kernel-panic
```

These QEMU tests exercise AHCI/NVMe system startup, checked IPC, native ring-3 launch and fault containment, and the debug panic path. They do not replace physical-machine validation.

## Clean

```bash
make clean
```

This removes `build/`, including a data disk kept at the default `build/hyfs2-data.img` path. Put `HYFS2_DATA_DISK` outside `build/` if you need to retain it across cleans.
