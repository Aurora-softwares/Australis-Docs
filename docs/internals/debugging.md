# Debugging

## Check build artifacts

```bash
make build
test -f build/efi/EFI/BOOT/BOOTX64.EFI
test -f build/efi/EFI/AUSTRALIS/KERNEL.BIN
file build/efi/EFI/BOOT/BOOTX64.EFI
```

The bootloader should identify as a PE32+ x86-64 EFI application. The separate `KERNEL.BIN` is a raw `AUKR` image, not another EFI application.

## Check the live boot

`make run-serial` shows the normal `australis> ` shell in the launching terminal. Use `make run-nvme-serial` to exercise the NVMe root instead of AHCI. `ls`, `cat /hello.txt`, and `ps` check the mounted HyFS root and process path. Enter `exit` for `kmon> `, where `status`, `bootinfo`, `devices`, and `mounts` inspect kernel-owned state. Press `R` during the boot selection window to enter KMon directly.

The repository also provides host and QEMU smoke tests. Useful entry points include `make test-bootloader-negative`, `make test-boot-modes`, `make test-stage2-boot`, `make test-userland-system-boot`, `make test-userland-stage4-supervision`, `make test-userland-stage5-ipc`, `make test-native-user-mode`, and `make test-kernel-panic`. The native test checks ring-3 launch, kernel-memory denial, privileged-instruction denial, and continued PID 1/KMon operation on AHCI and NVMe. The panic target expects a kernel halt; use KMon's `panic` command in a manual `D` debug boot to exercise that path.

Storage, USB, HyFS and terminal tests have more targeted Makefile targets. See the OS repository's `README.md` and `Makefile` for their current matrix and expected devices.
