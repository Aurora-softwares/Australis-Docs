---
title: Australis roadmap
---

Australis currently boots a separate Hydrogen kernel in QEMU/OVMF, mounts a HyFS 2 root through AHCI or NVMe, starts `System.exec` as PID 1, and runs a text shell. The display service and window system are in development. QEMU results do not establish physical-hardware support or release readiness.

For the current development version and release gates, see [Versioning](development/versioning). The [active OS plan](development/active-plan) records boot, userland, and validation gates. The [GUI roadmap](development/gui-roadmap) records each graphics phase and its completion requirements. The [development project](https://github.com/orgs/Aurora-softwares/projects/3) is the live task board.

The [Hydrogen roadmap](https://hylang.co.uk/roadmap/) covers compiler work.
