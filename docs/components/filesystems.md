---
title: "Australis-Filesystems"
---

> Development reference from [Australis-Filesystems](https://github.com/Aurora-softwares/Australis-Filesystems/tree/Development). Commands and source paths on this page are relative to that repository checkout. For current task status, use the [development project](https://github.com/orgs/Aurora-softwares/projects/3).

The repository has a `collection` project for HyFS 1 and HyFS 2 driver
projects. Their current `DriverMain.Run(long context)` methods are minimal
entry-point checks; they do not replace the kernel's filesystem
implementations. See the [system architecture](../architecture/system-layout)
for the current filesystem boundary.
