---
title: "Australis Memory Information"
---

> Development reference from [Australis-MemInfo](https://github.com/Aurora-softwares/Australis-MemInfo/tree/Development). Commands and source paths on this page are relative to that repository checkout. For current task status, use the [development project](https://github.com/orgs/Aurora-softwares/projects/3).

`mem-info.exec` reports read-only physical-page availability, kernel heap use,
and memory health through the versioned Australis system-information API. It
replaces the planned standalone `heap` recovery command without exposing raw
allocator addresses.

`MemInfo.hyproj` builds `mem-info.exec`. The Australis OS aggregate includes
this project and installs the executable at `/System/Bin/mem-info.exec` in the read-only
HyFS 2 boot image. Run `mem-info` from the userland shell,
or use `run /System/Bin/mem-info.exec`.

Build this checkout with:

```bash
mkdir -p build
hy build MemInfo.hyproj -o build/mem-info.exec
```

AUEX `.exec` files run in the checked interpreter. Australis also has a bounded native AUN1 ring-3 path, while the normal text shell runs in userland. The boot root is
read-only; writable application data belongs on the separate `/data` volume.
For OS-level build, supported APIs, and packaging rules, see the [application platform guide](https://aurora-softwares.github.io/Australis-Docs/applications/platform/).
