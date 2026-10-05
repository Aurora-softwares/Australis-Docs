# Roadmap

## Current Iteration: v0

The current v0 proves that Australis OS can boot as a 64-bit x86 UEFI application written in Hylang.

**What v0 proves:**

- Hylang can be compiled ahead of time into a native UEFI binary.
- QEMU + OVMF can boot `EFI/BOOT/BOOTX64.EFI`.
- Australis can print text through the UEFI firmware console without an existing OS underneath it.
- The project has a simple repeatable build surface through `make build`, `make iso`, and `make run`.

## Near-Term Milestones

| Phase | Goal |
|-------|------|
| 0 | Bootable Hylang UEFI app that prints a message |
| 1 | `Hydrogen.Uefi`: reusable console, keyboard, and boot-service bindings |
| 2 | Firmware-hosted command prompt and basic commands |
| 3 | Diagnostics, panic output, and memory-map inspection |
| 4 | Exit boot services and establish the kernel memory/runtime boundary |
| 5 | Kernel services: allocation, framebuffer, interrupts, input, and storage |

## Longer-Term Direction

Australis is intended to become a usable OS built from scratch. The long-term direction is:

- **Architecture:** x86_64 first.
- **Boot:** UEFI-first, with BIOS out of scope for the current line of work.
- **Language direction:** Hylang, beginning with a deliberately constrained firmware proof target.
- **Primary language:** Hydrogen/Hylang; it currently has a small UEFI proof target and will gain a firmware library incrementally.
- **Kernel goals:** memory management, drivers, shell, filesystem support, and eventually userland.

See the [Hydrogen roadmap](https://aurora-softwares.github.io/Hylang-Docs/roadmap) for the language-side prerequisites.
