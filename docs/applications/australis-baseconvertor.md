---
title: "Australis Base Convertor"
---

> Development reference from [Australis-BaseConvertor](https://github.com/Aurora-softwares/Australis-BaseConvertor/tree/Development). Commands and source paths on this page are relative to that repository checkout. For current task status, use the [development project](https://github.com/orgs/Aurora-softwares/projects/3).

## Current status

The current source prints `Hello, World!`; it does not convert numeric bases.

`BaseConvertor.hyproj` builds `base-convertor.exec`. The Australis OS aggregate includes
this project and installs the executable at `/System/Bin/base-convertor.exec` in the read-only
HyFS 2 boot image. Run it by its bare command name from the userland shell, or use `run /System/Bin/base-convertor.exec`.

## Planned direction

Implement a bounded argument-driven base conversion utility through the current command and error-result APIs.

Build this checkout with:

```bash
mkdir -p build
hy build BaseConvertor.hyproj -o build/base-convertor.exec
```

AUEX `.exec` files run in the checked interpreter. Australis also has a bounded native AUN1 ring-3 path, while the normal text shell runs in userland. The boot root is
read-only; writable application data belongs on the separate `/data` volume.
For OS-level build, supported APIs, and packaging rules, see the [application platform guide](https://aurora-softwares.github.io/Australis-Docs/applications/platform/).
