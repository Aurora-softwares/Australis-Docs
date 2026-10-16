# Roadmap

Australis currently boots a separate Hylang kernel in QEMU/OVMF, mounts a HyFS 2 root through AHCI or NVMe, starts `System.exec` as PID 1, and runs a text shell. Checked AUEX programs have process, terminal, file, and bounded channel APIs. The first AUN1 child path executes in ring 3 and contains faults without taking down PID 1 or KMon.

| Area | Working bootstrap | Next work |
| --- | --- | --- |
| Boot and kernel | PE32+ bootloader, raw `AUKR` kernel, selectable boot mode and KMon fallback | ACPI/configuration, more negative-path tests, physical-machine validation |
| Storage and files | AHCI/NVMe, GPT, read-only HyFS 2 root, optional writable `/data`, HyFS 1 compatibility | Broader recovery, physical-media and timeout testing |
| System userland | PID 1, ordered readiness checks, bounded shell retries, external AUEX commands | Persistent services, sessions, graphical userland |
| Processes and IPC | Bounded AUEX scheduling, process records, checked channel calls and grants | Native preemption, broader capability policy and resource accounting |
| Native user mode | AUN1 ring-3 children, private user mappings, guard page, PID/exit syscalls, contained faults | Native terminal/file/IPC syscalls and general launch policy |

The GUI remains a later userland subsystem. AUEX isolation is software-enforced; AUN1 has a limited hardware ring-3 path. Native preemption is not yet present. The [active OS plan](https://github.com/Aurora-Softwares/Australis-OS/blob/main/PLAN.md) tracks completion gates and runnable checks. The [Hydrogen roadmap](https://aurora-softwares.github.io/Hylang-Docs/roadmap/) covers compiler work. QEMU results do not establish a stable release or supported physical hardware.
