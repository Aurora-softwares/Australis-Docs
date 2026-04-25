# Roadmap

## Current Iteration: v0

The current v0 proves that Australis OS can boot as a 64-bit x86 UEFI application written in C#.

**What v0 proves:**

- C# can be compiled ahead of time into a native UEFI binary.
- QEMU + OVMF can boot `EFI/BOOT/BOOTX64.EFI`.
- Australis can clear the screen and print text without an existing OS underneath it.
- The project has a simple repeatable build surface through `make build`, `make image`, and `make run`.

## Near-Term Milestones

| Phase | Goal |
|-------|------|
| 0 | Bootable C# UEFI app that clears the screen and prints a message |
| 1 | Keyboard input and character echo |
| 2 | Minimal command prompt |
| 3 | Basic diagnostics and panic output |
| 4 | Early memory/runtime strategy for kernel work |
| 5 | Prepare the path for Hydrogen-authored kernel code |

## Longer-Term Direction

Australis is intended to become a usable OS built from scratch. The long-term direction is:

- **Architecture:** x86_64 first.
- **Boot:** UEFI-first, with BIOS out of scope for the current line of work.
- **Language direction:** C# now as a practical bridge toward Hydrogen.
- **Future primary language:** Hydrogen once its systems programming model is ready.
- **Kernel goals:** memory management, drivers, shell, filesystem support, and eventually userland.

See the [Hydrogen roadmap](https://aurora-softwares.github.io/Hylang-Docs/roadmap) for the language-side prerequisites.
