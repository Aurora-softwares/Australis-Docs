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

`make run-serial` shows the shell in the launching terminal. Use `make run-serial-nvme` to exercise the NVMe root instead of AHCI. At the prompt, `devices`, `mounts`, `ls`, and `cat /hello.txt` check device discovery and the mounted HyFS root. `run /user-demo.exec` and `ps` check the user-program path.

The repository also provides host and QEMU smoke tests. Useful entry points include `make test-stage2`, `make test-stage2-boot`, `make test-stage3`, `make test-stage4`, `make test-stage5`, and `make test-kernel-panic`. The last target expects the kernel to halt after an intentional fault; the shell command `panic-test` does the same in a manual boot.

Storage, USB, HyFS and terminal tests have more targeted Makefile targets. See the OS repository's `README.md` and `Makefile` for their current matrix and expected devices.
