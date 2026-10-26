---
title: "Australis Calculator"
---

> Development reference from [Australis-Calculator](https://github.com/Aurora-softwares/Australis-Calculator/tree/Development). Commands and source paths on this page are relative to that repository checkout. For current task status, use the [development project](https://github.com/orgs/Aurora-softwares/projects/3).

## Current status

The current source prints `Hello, World!`; its commented argument loop is not executable calculator behavior.

`Calculator.hyproj` builds `calculator.exec`. The Australis OS aggregate includes
this project and installs the executable at `/System/Bin/calculator.exec` in the read-only
HyFS 2 boot image. Run it by its bare command name from the userland shell, or use `run /System/Bin/calculator.exec`.

## Planned direction

Add expression parsing and useful numeric output for the existing external-command shell.

Build this checkout with:

```bash
mkdir -p build
hy build Calculator.hyproj -o build/calculator.exec
```

AUEX `.exec` files run in the checked interpreter. Australis also has a bounded native AUN1 ring-3 path, while the normal text shell runs in userland. The boot root is
read-only; writable application data belongs on the separate `/data` volume.
For OS-level build, supported APIs, and packaging rules, see the [application platform guide](https://aurora-softwares.github.io/Australis-Docs/applications/platform/).
