---
title: "Australis Version"
---

> Development reference from [Australis-Version](https://github.com/Aurora-softwares/Australis-Version/tree/Development). Commands and source paths on this page are relative to that repository checkout. For current task status, use the [development project](https://github.com/orgs/Aurora-softwares/projects/3).

## Current status

The current source prints a fixed `Version: 0.0.1`. It launches as an AUEX program but does not yet query the running OS version.

`Version.hyproj` builds `version.exec`. The Australis OS aggregate includes
this project and installs the executable at `/System/Bin/version.exec` in the read-only
HyFS 2 boot image. Run it by its bare command name from the userland shell, or use `run /System/Bin/version.exec`.

## Planned direction

For userland Stage 2, replace the fixed string with a read-only version query and test the external command over both storage paths.

Build this checkout with:

```bash
mkdir -p build
hy build Version.hyproj -o build/version.exec
```

AUEX `.exec` files run in the checked interpreter. Australis also has a bounded native AUN1 ring-3 path, while the normal text shell runs in userland. The boot root is
read-only; writable application data belongs on the separate `/data` volume.
For OS-level build, supported APIs, and packaging rules, see the [application platform guide](https://aurora-softwares.github.io/Australis-Docs/applications/platform/).
