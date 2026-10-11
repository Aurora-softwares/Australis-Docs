# Shell and user programs

The shell appears as `australis> ` after the kernel mounts its root. Use `make run` for the framebuffer and USB keyboard, or `make run-serial` for the COM1 shell in your terminal. COM1 runs at 115200 8N1; the kernel receives bytes through an IRQ-fed ring and executes commands outside the interrupt handler.

Start with:

```text
australis> help
australis> ls
australis> cat /hello.txt
australis> run /user-demo.exec
australis> ps
```

The current registry includes `help`, `echo`, `ls`, `cat`, `devices`, `mounts`, `pwd`, `run`, `ps`, and `version`. `panic-test` deliberately triggers the fatal exception path. The line editor supports cursor movement, deletion, Ctrl-A/Ctrl-E, Ctrl-C, Ctrl-L, Ctrl-U, and eight history entries. Its line buffer holds 256 bytes. `cat` accepts files up to 64 KiB.

`run` loads a checked AUEX v1 `.exec` program from the mounted filesystem. Bundled applications are compiled from Hylang `type = "exec"` projects. Their code and data regions are bounded and checked; an invalid memory access or division by zero faults the application and returns control to the shell. `ps` reports the last program result. Application source can use terminal input/output, read-only files, and cooperative yield, within the supported compiler subset.

For a removable HyFS volume, use `make run-usb-storage`; it mounts at `/usb` and uses COM1 for input. The default root is read-only HyFS v1. HyFS v2 can be tried with `make run-hyfs2-serial`; it adds nested paths such as `/System` and `/Bin`.
