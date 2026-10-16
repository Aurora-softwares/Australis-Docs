# Shell and user programs

The shell appears as `australis> ` after the kernel mounts its root. Use `make run` for the framebuffer and USB keyboard, or `make run-serial` for the COM1 shell in your terminal. COM1 runs at 115200 8N1; the kernel receives bytes through an IRQ-fed ring and executes commands outside the interrupt handler.

Start with these commands at the normal system shell:

```text
australis> help
australis> ls
australis> cat /hello.txt
australis> run /System/Bin/hello-world.exec
australis> ps
```

The normal shell supports built-in commands, quoted arguments, relative paths, `cd`, `pwd`, `set`, `export`, `unset`, and `path`, as well as external commands from `/System/Bin`. `exit` or Ctrl-D returns to KMon. KMon provides a separate recovery command set and a `panic` command only in `D` debug boot. The line editor has eight history entries and a 256-byte line buffer; KMon's `cat` accepts files up to 64 KiB.

`run /System/Bin/name.exec` loads a packaged program. Bundled Hylang `type = "exec"` projects compile to AUEX v1, which runs through checked kernel interpretation. AUEX supports terminal, file, process, and bounded channel calls; a program fault returns to the shell. The optional `/data` mount supports checked writes, while the system root remains read-only. AUN1 is a separate small native format: these programs run in ring 3 with private memory and a guarded stack. Their syscall surface currently has PID and exit only, and native faults do not take down PID 1 or KMon.

For a removable HyFS volume, use `make run-usb-storage`; it mounts at `/usb` and uses COM1 for input. The default root is read-only HyFS 2 with nested paths such as `/System/Bin`. HyFS 1 is available through explicit compatibility targets.
