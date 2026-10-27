---
title: "Australis Hex Viewer prototype"
---

> Development reference from [Australis-HexViewer](https://github.com/Aurora-softwares/Australis-HexViewer/tree/Development). Commands and source paths on this page are relative to that repository checkout. For current task status, use the [development project](https://github.com/orgs/Aurora-softwares/projects/3).

## Current status

The executable is packaged under `/System`, but its current source only prints `Hello, World!`. It does not open or display file bytes.

`HexViewer.hyproj` builds `system/hexviewer.exec`. The Australis OS aggregate includes
this project and installs the executable at `/System/hexviewer.exec` in the read-only
HyFS 2 boot image. Run it through its explicit `/System` path, or use `run /System/hexviewer.exec`.

## Planned direction

Implement bounded byte reads, offsets, and hexadecimal output through the checked file API. Do not treat installation as feature completion.

Build this checkout with:

```bash
mkdir -p build
hy build HexViewer.hyproj -o build/hexviewer.exec
```

AUEX `.exec` files run in the checked interpreter. Australis also has a bounded native AUN1 ring-3 path, while the normal text shell runs in userland. The boot root is
read-only; writable application data belongs on the separate `/data` volume.
For OS-level build, supported APIs, and packaging rules, see the [application platform guide](https://aurora-softwares.github.io/Australis-Docs/applications/platform/).
