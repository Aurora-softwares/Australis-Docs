---
title: "Australis rescue plan"
---

> Development reference from [Australis-Rescue](https://github.com/Aurora-softwares/Australis-Rescue/tree/Development). Commands and source paths on this page are relative to that repository checkout. For current task status, use the [development project](https://github.com/orgs/Aurora-softwares/projects/3).

Recovery has two layers with different dependencies:

| Layer | Location | Purpose |
| --- | --- | --- |
| KMon | Kernel-resident monitor | Minimal diagnostics and control even when the root volume or PID 1 fails. |
| `rescue.exec` | Optional AUEX userland program | Additional file and repair tools when a valid volume and process runtime are available. |

Press `R` during the bootloader's two-second selection window to enter the
kernel-resident monitor at the `rescue>` prompt. The selection is carried in
`KernelBootInfo`; the kernel enters Rescue before controller, GPT, HyFS, USB,
or AUEX startup. The emitted handoff also skips PCI, MMIO, DMA, and storage
bootstrap for this mode. It therefore remains usable when HyFS metadata is
corrupt or the HyFS partition is absent. AHCI and NVMe QEMU tests exercise
`help` with a valid root, damaged root metadata, and an EFI-only image.

The monitor currently uses the same bounded command implementation as the
`rescue>` recovery shell. Commands that need a mounted filesystem report
ordinary errors when Rescue entered before mounting. This project still has
an empty `program.hy`; it does not yet provide the optional disk-backed
`rescue.exec`. A future `rescue.exec` must never be the only way to recover
from a missing or corrupt root image.

KMon should keep bounded terminal input over COM1, report boot and storage
failure causes, inspect mounts, memory, devices, and recent process faults,
and allow a controlled retry, reboot, or halt. In the current early `R` Rescue,
`continue` resets into a fresh normal boot because the bootloader skipped
controller and storage setup. `reboot` resets and `halt` stops the processor.
The `trace` command shows boot diagnostics and recent monitor commands;
`registers` shows a live CPU snapshot. `panic` is available only in `D` Debug
boot. Destructive commands such as
memory writes require an explicit debugging mode. Ordinary userland commands
and service policy belong in [the userland shell](https://aurora-softwares.github.io/Australis-Docs/components/shell/) and
[system manager](https://aurora-softwares.github.io/Australis-Docs/components/system-startup/), not in KMon.

Before normal PID 1 startup is enabled, add automatic fallback to this monitor
for missing, malformed, and corrupt `System.exec`, plus damaged root metadata
during a normal boot. COM1 must remain usable in every case. The
[active plan](https://aurora-softwares.github.io/Australis-Docs/development/active-plan/) tracks that gate.

The planned normal-boot fallback is deterministic: if the root cannot be
validated, `System.exec` is missing or fails image validation, or PID 1 exits
or faults before declaring startup ready, the kernel records the cause,
releases any partially opened process resources, and enters KMon on COM1.
It must not automatically retry a failing PID 1. `R` remains an independent
entry path that skips storage and userland initialization entirely. Automatic
fallback is a Stage 3/4 implementation gate; the current kernel only supports
the explicit `R` path and the normal `kmon>` recovery shell after a
successful root mount.
