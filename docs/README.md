---
sidebar_position: 1
---

# Australis OS

Australis OS is a from-scratch x86_64 operating system project by [Aurora
Softwares](https://github.com/Aurora-Softwares). The current milestone is a
small but concrete proof: boot a 64-bit UEFI virtual machine from Hylang and
print a message to the firmware console.

## Current milestone

v0 proves that the following path works end to end:

- A Hylang source file compiles to a native PE32+ x86_64 UEFI application.
- QEMU and OVMF boot it from a UEFI El Torito ISO.
- The program prints:

```text
Hello world from Hylang!
```

This does not yet make Australis a general-purpose kernel. The initial
`uefi-x64` compiler target intentionally supports `System.Console.WriteLine`
ASCII string literals in `Main`; that small scope keeps the proof independent
of a managed runtime, C#, bflat, an assembler, or a linker. The ISO is emitted
by the self-hosted Hydrogen compiler.

## Why Hylang

The project uses Hylang to establish a real firmware boot path for the language
while its broader systems runtime is designed. The resulting EFI binary runs
directly on UEFI firmware rather than atop Linux, Windows, .NET, or any other
existing operating system.

The next stages need explicit UEFI ABI bindings, allocation, memory ownership,
and kernel-handoff design before expanding beyond this proof.
