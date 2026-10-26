---
title: "Australis-Drivers"
---

> Development reference from [Australis-Drivers](https://github.com/Aurora-softwares/Australis-Drivers/tree/Development). Commands and source paths on this page are relative to that repository checkout. For current task status, use the [development project](https://github.com/orgs/Aurora-softwares/projects/3).

The repository has a `collection` project that includes a USB driver project.
Its current `DriverMain.Run(long context)` is a minimal entry-point check. It
does not implement a replacement USB stack. The current xHCI implementation
remains in the Australis kernel; see the [kernel criteria](kernel-gates) and
[loadable-driver contract](loadable-drivers).
