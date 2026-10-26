---
title: "Australis Change Directory prototype"
---

> Development reference from [Australis-ChangeDirectory](https://github.com/Aurora-softwares/Australis-ChangeDirectory/tree/Development). Commands and source paths on this page are relative to that repository checkout. For current task status, use the [development project](https://github.com/orgs/Aurora-softwares/projects/3).

## Current status

The current source prints `Hello, World!` and does not change directories.

`ChangeDirectory.hyproj` builds `change-directory.exec` as a historical sample.
The normal OS image no longer includes it. An executable cannot change its
parent shell's working directory; `cd` belongs in `CommandShell.exec`.

## Planned direction

Keep this project only as an example of the old placeholder. The implemented
`cd` command lives in the userland shell.

Build this checkout with:

```bash
mkdir -p build
hy build ChangeDirectory.hyproj -o build/change-directory.exec
```

AUEX `.exec` files run in the checked interpreter. Australis also has a bounded native AUN1 ring-3 path. The boot root is
read-only; writable application data belongs on the separate `/data` volume.
For OS-level build, supported APIs, and packaging rules, see the [application platform guide](https://aurora-softwares.github.io/Australis-Docs/applications/platform/).
