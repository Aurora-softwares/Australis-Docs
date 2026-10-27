---
title: "Australis Clear"
---

> Development reference from [Australis-Clear](https://github.com/Aurora-softwares/Australis-Clear/tree/Development). Commands and source paths on this page are relative to that repository checkout. For current task status, use the [development project](https://github.com/orgs/Aurora-softwares/projects/3).

## Current status

`clear.exec` accepts no arguments and clears both the serial and framebuffer
terminals through the checked terminal operation.

`Clear.hyproj` builds `clear.exec`. The Australis OS aggregate includes
this project and installs the executable at `/System/Bin/clear.exec` in the read-only
HyFS 2 boot image. Run `clear` from the userland shell or use
`run /System/Bin/clear.exec` from KMon.

Build this checkout with:

```bash
mkdir -p build
hy build Clear.hyproj -o build/clear.exec
```

AUEX `.exec` files run in the checked interpreter. Australis also has a bounded native AUN1 ring-3 path. The boot root is
read-only; writable application data belongs on the separate `/data` volume.
For OS-level build, supported APIs, and packaging rules, see the [application platform guide](https://aurora-softwares.github.io/Australis-Docs/applications/platform/).
