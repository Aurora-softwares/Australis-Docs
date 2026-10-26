---
title: "Australis Hello World"
---

> Development reference from [Australis-HelloWorld](https://github.com/Aurora-softwares/Australis-HelloWorld/tree/Development). Commands and source paths on this page are relative to that repository checkout. For current task status, use the [development project](https://github.com/orgs/Aurora-softwares/projects/3).

## Current status

The source prints `Hello, World!` and exits successfully. This is a minimal AUEX application, not a shell or service.

`HelloWorld.hyproj` builds `hello-world.exec`. The Australis OS aggregate includes
this project and installs the executable at `/System/Bin/hello-world.exec` in the read-only
HyFS 2 boot image. Run it by its bare command name from the userland shell, or use `run /System/Bin/hello-world.exec`.

## Planned direction

Keep it as a small build and launch example while OS commands move into separate userland projects.

Build this checkout with:

```bash
mkdir -p build
hy build HelloWorld.hyproj -o build/hello-world.exec
```

AUEX `.exec` files run in the checked interpreter. Australis also has a bounded native AUN1 ring-3 path, while the normal text shell runs in userland. The boot root is
read-only; writable application data belongs on the separate `/data` volume.
For OS-level build, supported APIs, and packaging rules, see the [application platform guide](https://aurora-softwares.github.io/Australis-Docs/applications/platform/).
