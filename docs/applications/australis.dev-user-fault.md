---
title: "Australis.Dev-user-fault"
---

> Development reference from [Australis.Dev-user-fault](https://github.com/Aurora-softwares/Australis.Dev-user-fault/tree/Development). Commands and source paths on this page are relative to that repository checkout. For current task status, use the [development project](https://github.com/orgs/Aurora-softwares/projects/3).

A **user-memory isolation and recovery** test fixture for **Australis OS**.

This development application is intended to help verify that failures in a user program are contained, reported, and handled by the operating system without bringing down the kernel.

## Overview

The fixture targets a key operating-system boundary: **user programs must not be able to corrupt kernel memory or destabilise the rest of the system**.

The intended test scenario is a user-program memory fault. The operating system should recognise the invalid access, stop or reject the offending application, and preserve control of the terminal and kernel.

**A fault is the expected test condition, not an indication that the OS test itself failed.**

## What This Tests

- **Memory isolation:** the running application is limited to memory accesses permitted by the OS.
- **Fault handling:** an invalid memory access is detected and handled.
- **Containment:** one faulty application should not crash the kernel or compromise other applications.
- **Recovery:** the terminal or program launcher remains usable once the faulty program has been handled.

These are the *intended* behaviours to verify; the test should not be treated as proof that all isolation guarantees are already implemented.

## Requirements

- A development build of **Australis OS** with the appropriate user-memory checks and fault handling.
- An **Australis-compatible `.exec` build** of the fault fixture.
- A HyFS boot image containing the fixture.
- A disposable **QEMU or other development VM** for testing operating-system failures.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Aurora-softwares/Australis.Dev-user-fault.git
cd Australis.Dev-user-fault
```

### 2. Prepare the test fixture

The included `src/Program.hy` announces a protected write, then calls
`System.Australis.Memory.StoreByte(4096, 65)`. That address is outside the
AUEX data region, so the runtime should fault this program while keeping the
kernel console usable. Build it with:

```bash
hy build UserFault.hyproj -o user-fault.exec
```

### 3. Package the executable in HyFS 2

The default Australis OS application aggregate installs the compiled fixture
at `/System/Bin/user-fault.exec` in the read-only HyFS 2 boot image:

```text
/
└── Bin/
    └── user-fault.exec
```

The normal image build includes this project. Rebuild the image after changing
the fixture.

### 4. Run the fault test

Boot Australis OS in a development VM. From its terminal, launch the fixture:

```text
run /System/Bin/user-fault.exec
```

The bare command `user-fault` also resolves through the current recovery
shell's `PATH`.

Observe the response to the invalid memory operation, then check whether the OS is still responsive and able to accept another command. Avoid assuming a particular diagnostic message or exit code until the fixture implementation defines one.

## Expected Behaviour

| Condition | Expected result |
| --- | --- |
| Valid executable is launched | The OS loads the fixture and begins execution. |
| Fixture attempts a prohibited memory operation | The OS detects and rejects the invalid operation. |
| Fault is handled | The offending application is stopped or otherwise safely contained. |
| Control returns | The kernel and terminal remain responsive. |
| Another command is entered | The OS continues accepting commands normally. |

A kernel crash, hang, uncontrolled memory modification, or silent continuation after an invalid operation would indicate a potential runtime or memory-protection problem worth investigating.

## How It Works

```text
Terminal command
       |
       v
Australis program loader
       |
       v
User fault fixture (.exec)
       |
       v
Prohibited memory operation
       |
       v
Runtime / memory-boundary check
       |
       +--> Fault detected --> Contain application
                                |
                                v
                         Return control to OS
```

This fixture tests **the OS's handling of a bad user operation**, not ordinary successful application output. Actual enforcement mechanisms depend on the Australis runtime version; the current `.exec` format is interpreted rather than a conventional native x86-64 process.

## Safety and Scope

Run this test in a development VM or other controlled environment. It deliberately exercises failure-handling paths and may expose bugs in early versions of Australis OS.

A passing test of one bad access does not establish complete process isolation: additional cases such as out-of-bounds reads and writes, invalid pointers, and malformed executable input should be tested separately as those features become available.

## Current Limitations

Australis OS is under active development. This fixture covers one checked
write fault in the AUEX interpreter; it does not prove native ring-3 isolation
or every malformed memory access. The OS smoke tests define the current
diagnostic and recovery expectations.

## Related Projects

- [Australis OS](https://github.com/Aurora-softwares/Australis-OS) — kernel and user-program runtime.
- [Australis.Dev-user-demo](https://github.com/Aurora-softwares/Australis.Dev-user-demo) — terminal input and root-file reading example.
- [Australis-HelloWorld](https://github.com/Aurora-softwares/Australis-HelloWorld) — minimal application and build workflow.
- [Hydrogen Compiler](https://github.com/Aurora-softwares/Hylang-Compiler) — compiler and Australis executable backend.

## Contributing

Reports of unexpected kernel crashes, missing fault diagnostics, or recovery failures are welcome. Include the OS revision, the fixture version, and the observed behaviour when filing an issue.

## License

See [LICENSE](https://github.com/Aurora-softwares/Australis.Dev-user-fault/blob/Development/src/applications/Australis.Dev-user-fault/LICENSE) for this repository's license.
