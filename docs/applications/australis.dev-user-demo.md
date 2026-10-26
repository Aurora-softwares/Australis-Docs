---
title: "Australis.Dev-user-demo"
---

> Development reference from [Australis.Dev-user-demo](https://github.com/Aurora-softwares/Australis.Dev-user-demo/tree/Development). Commands and source paths on this page are relative to that repository checkout. For current task status, use the [development project](https://github.com/orgs/Aurora-softwares/projects/3).

A small **terminal input and root-file reading** demonstration for **Australis OS**.

This development application exercises the operating system's user-program runtime beyond printing a fixed message. It is intended as a reference for developers testing interactive console programs and filesystem access.

## Overview

The demo focuses on two user-facing operations:

- **Terminal input:** accept data entered by the user through the Australis terminal.
- **Root-file reading:** request and read a file from the root of the HyFS filesystem.

Together, these demonstrate how an application can communicate with the terminal and access OS-managed resources through the supported Australis executable interface.

This is a **development example**, not a general-purpose file viewer or terminal utility.

## Requirements

- A build of **Australis OS** with the user-program loader, terminal input, and file-reading operations.
- An **Australis-compatible `.exec` build** of the demo.
- A HyFS image containing both the executable and a suitable file for the demo to read.
- The **Hydrogen compiler** with the Australis target, if compiling from Hydrogen source.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Aurora-softwares/Australis.Dev-user-demo.git
cd Australis.Dev-user-demo
```

### 2. Build the executable

Compile the included project with a Hydrogen compiler that supports the
Australis target:

```bash
hy build UserDemo.hyproj -o user-demo.exec
```

### 3. Package the executable in HyFS 2

The standard Australis OS aggregate builds this project and installs
`user-demo.exec` under `/System/Bin` in the read-only HyFS 2 boot image. The image
must also contain `/hello.txt`, which the source reads:

```text
/
├── Bin/
│   └── user-demo.exec
└── hello.txt
```

The normal image build includes both files. Rebuild the OS image after changing
the application; the source expects `/hello.txt`.

### 4. Run in Australis OS

After booting the rebuilt image, invoke the program from the terminal:

```text
run /System/Bin/user-demo.exec
```

The bare command `user-demo` also resolves through the current recovery
shell's `PATH`.

Once launched, follow its input prompt (if present) and inspect the reported file data. Exact prompts and output depend on the implementation.

## How It Works

```text
Terminal command
      |
      v
Australis program loader
      |
      v
User demo (.exec)
      |            |
      v            v
Terminal input   HyFS root-file read
      |            |
      +------+-----+
             |
             v
       Demo output
```

The application is intended to use the services offered by the Australis runtime, rather than directly accessing the terminal hardware or filesystem storage.

## What This Tests

- Launching a user application from HyFS.
- Handling interactive terminal input.
- Resolving and reading a root-level file.
- Returning control to the Australis terminal after execution.

For memory-isolation and error-recovery testing, see [Australis.Dev-user-fault](https://github.com/Aurora-softwares/Australis.Dev-user-fault).

## Current Limitations

Australis OS and Hydrogen are under active development. Console input and text
file results are currently limited to 255 ASCII bytes. The demo reads
`/hello.txt`; that file must be present in the mounted filesystem.

## Related Projects

- [Australis OS](https://github.com/Aurora-softwares/Australis-OS) — operating system and runtime.
- [Australis-HelloWorld](https://github.com/Aurora-softwares/Australis-HelloWorld) — minimal Hydrogen application and build example.
- [Hydrogen Compiler](https://github.com/Aurora-softwares/Hylang-Compiler) — compiler and Australis backend.
- [Hydrogen website](https://hylang.co.uk/) — language information.

## Contributing

Bug reports, improvements, and contributions are welcome. For issues specific to the kernel or runtime, please use the Australis OS repository; for compiler issues, use the Hydrogen Compiler repository.

## License

See [LICENSE](https://github.com/Aurora-softwares/Australis.Dev-user-demo/blob/Development/src/applications/Australis.Dev-user-demo/LICENSE) for this repository's license.
