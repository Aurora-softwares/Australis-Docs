---
title: "Australis System Information"
---

> Development reference from [Australis-SysInfo](https://github.com/Aurora-softwares/Australis-SysInfo/tree/Development). Commands and source paths on this page are relative to that repository checkout. For current task status, use the [development project](https://github.com/orgs/Aurora-softwares/projects/3).

`sys-info.exec` reports read-only boot, kernel, display, and device summaries
through the versioned Australis system-information API. API 5 includes the
validated fixed framebuffer mode geometry, stride, pixel format, depth, and
flags without disclosing its physical address. It replaces the planned
standalone `cpu`, `cpuid`, and `timer` shell commands without exposing raw CPU
leaves or kernel addresses.

`SysInfo.hyproj` builds `sys-info.exec`. The Australis OS aggregate includes
this project and installs the executable at `/System/Bin/sys-info.exec` in the read-only
HyFS 2 boot image. Run `sys-info` from the userland shell,
or use `run /System/Bin/sys-info.exec`.

Build this checkout with:

```bash
mkdir -p build
hy build SysInfo.hyproj -o build/sys-info.exec
```

AUEX `.exec` files run in the checked interpreter. Australis also has a bounded native AUN1 ring-3 path, while the normal text shell runs in userland. The boot root is
read-only; writable application data belongs on the separate `/data` volume.
For OS-level build, supported APIs, and packaging rules, see the [application platform guide](https://aurora-softwares.github.io/Australis-Docs/applications/platform/).
