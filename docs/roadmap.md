# Roadmap

Australis has moved beyond the initial UEFI print proof. The current development build boots a raw Hylang kernel with a shell, storage drivers, a HyFS root, USB input or mass storage, and checked `.exec` user programs.

| Area | Working bootstrap | Next work |
| --- | --- | --- |
| Boot and kernel | PE32+ bootloader, raw `AUKR` kernel, post-UEFI handoff | Broader firmware and physical-machine validation |
| Memory and interrupts | Owned mappings, page allocation, exception reports, PIC/APIC timer | Broader cache policy and vector allocation |
| Storage and files | AHCI/NVMe, GPT, VFS, read-only HyFS v1; opt-in HyFS v2 | Persistent writes and recovery in the live kernel |
| Input and shell | COM1, framebuffer, one USB keyboard or storage device | Hubs, multiple devices, layouts, richer shell behavior |
| Applications | Checked AUEX `.exec` programs, terminal and read-only file calls | Versioned process ABI, external userland services, native privilege separation |

The GUI remains a later userland subsystem. The current AUEX boundary is software-enforced; native ring-3 execution and preemptive threads are not yet present. The [active OS plan](https://github.com/Aurora-Softwares/Australis-OS/blob/main/PLAN.md) tracks subsystem completion criteria and runnable checks. The [Hydrogen roadmap](https://aurora-softwares.github.io/Hylang-Docs/roadmap/) covers the language and compiler side.
