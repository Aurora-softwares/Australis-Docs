---
title: "Checklist ownership audit"
---

> This technical reference came from the Australis OS `v0.0.7` Release snapshot. Check the [development project](https://github.com/orgs/Aurora-softwares/projects/3) for current status; a Release-era milestone label may lag the Development implementation.

This records the October 2026 cleanup pass across Australis and Hydrogen.
The detailed progress records now live in this documentation site, with current
task status on the development project. A red item here is still open, not a
release claim.

| Area | Correct owner and disposition |
| --- | --- |
| Boot image rejection, boot-mode keys, and missing GOP | Bootloader. AHCI/NVMe negative-image and no-GOP QEMU tests plus default/S/N mode checks now cover these paths. `D` and `R` have separate KMon/recovery tests. |
| Firmware allocation and `ExitBootServices` failure injection, kernel payload integrity, ACPI, boot arguments, configuration, Secure Boot, and additional architectures | Bootloader. These need fault-injection hooks, a versioned image/configuration contract, or new platform targets. They remain open in [the bootloader checklist](https://aurora-softwares.github.io/Australis-Docs/components/bootloader-gates/). |
| Cold boot, restart, and handoff on physical firmware and controllers | OS release validation. QEMU cannot close this hardware gate; it remains in the bootloader and [OS plan](https://aurora-softwares.github.io/Australis-Docs/development/active-plan/). |
| HyFS 2 allocation and consistency inspection | Storage. The kernel writer already protects both valid generations; the offline writer now reserves both too. The read-only `hyfs2.py check` command validates roots, objects, extents, and reports unreferenced nonzero blocks. See [the HyFS 2 plan](https://aurora-softwares.github.io/Australis-Docs/development/hyfs2-plan/). |
| KMon `status` and `bootinfo` | Kernel recovery console. Both now have command and QEMU coverage. Retained `log`, broader native syscalls, resource accounting, and fuller memory/permission policy remain kernel work in [its checklist](https://aurora-softwares.github.io/Australis-Docs/components/kernel-gates/). |
| Shell file and administration commands, persistent services, capability grants, login/session policy, and graphical programs | Userland, after their kernel APIs exist. `inspector` already covers the old `finfo` role; `cat` covers simple text display, while a paged `view` and real `hexview` remain separate work. See [the userland checklist](https://aurora-softwares.github.io/Australis-Docs/components/userland-plan/). |
| Native AUN1 source output, imports/package lookup, and compiler/runtime parity | Hydrogen compiler. A narrow AUN1 v2 compiler path now emits one static entry point; general native applications and syscall parity remain open. See the [Hydrogen development roadmap](https://hylang.co.uk/development/compiler-roadmap/). |
| Native compiler bootstrap memory and negative diagnostics | Hydrogen compiler. The SDK and native routes now accept `GC.Collect()` for the bootstrap source, which releases temporary parse and codegen data; the negative build suite requests diagnostic-only output. The repeated-generation proof passes with a documented 3 GiB address-space bound. |
| Installable `Hydrogen.*` and `Australis.*` packages | Hydrogen standard library. Its [design plan](https://hylang.co.uk/stdlib/design-plan/) distinguishes compiler prerequisites, OS contracts, and library implementation gates. Compiler builtins are not packages. |

The remaining red items are substantial target features or physical release
checks. Their checklist location is retained where it matches the owner; the
cross-layer dependencies above prevent a userland or library item from being
marked complete solely because a kernel or compiler primitive exists.
