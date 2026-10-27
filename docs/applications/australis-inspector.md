---
title: "Australis File Inspector"
---

> Development reference from [Australis-Inspector](https://github.com/Aurora-softwares/Australis-Inspector/tree/Development). Commands and source paths on this page are relative to that repository checkout. For current task status, use the [development project](https://github.com/orgs/Aurora-softwares/projects/3).

Inspector is an AUEX application for HyFS and HyFS 2 volumes. It accepts an
absolute path from the shell. With no argument it inspects `/hello.txt`.

```text
inspector /System/Bin/inspector.exec
inspector /System
```

For files, it reports the filesystem kind, size, object ID when available,
and creation or modification dates only when the volume marks them valid. It
reads the first 32 bytes through the checked AUEX file API. When those bytes
contain a complete AUEX header, it reports the format version, Australis
bytecode target, code and data sizes, entry offset, and stored CRC32 values.
Stored checksums are displayed as metadata; Inspector does not claim to
recompute them. Other files show their first bytes.

For directories, it lists each child name and checks for the explicit
end-of-directory result. The app uses `Files.ApiVersion()` version 1,
`Stat*`, `DirectoryCount`, `DirectoryName`, `OpenRead`, `ReadChecked`,
`ResultByte`, `ResultU32`, `CloseChecked`, and `Status`.

Build this checkout with the self-hosted Hydrogen compiler:

```sh
/path/to/hydrogen build Inspector.hyproj -o build/inspector.exec
```

The [Australis application platform guide](https://aurora-softwares.github.io/Australis-Docs/applications/platform/) describes the supported file APIs and packaging rules. The OS aggregate applications project installs Inspector in the HyFS 2 boot image, where it can be launched through `PATH` as `inspector`.
