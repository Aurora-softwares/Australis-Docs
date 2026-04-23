# Bootloader

The bootloader is split across two NASM files: a stage-1 that BIOS loads, and a stage-2 wrapper that embeds the C++ kernel.

## Stage 1 — `src/bootloader.asm`

The BIOS loads exactly 512 bytes from sector 0 of the boot drive to address `0x7C00` and jumps to it. The stage-1 bootloader's job is to load the rest of the OS.

### Startup

```nasm
cli
xor ax, ax
mov ds, ax  ; zero all segment registers
mov es, ax
mov ss, ax
mov sp, 0x7C00  ; stack grows down from 0x7C00
sti
```

### Loading the kernel

The kernel image is loaded at segment `0x1000` (physical address `0x10000`). The bootloader reads sectors sequentially using CHS addressing via BIOS interrupt `0x13`.

The first two words of the kernel image form a small header:

| Offset | Size | Meaning                                |
|--------|------|----------------------------------------|
| `+0`   | 2    | Total sector count of the kernel image |
| `+2`   | 2    | Entry point offset within the image    |

The bootloader reads this header from the first sector, then continues loading `total_sectors - 1` additional sectors.

### Handing off control

Once all sectors are loaded, execution transfers to the kernel via a far return:

```nasm
push word 0x1000       ; segment
push word [entry_offset]
retf                   ; jump to 0x1000:entry_offset
```

### Disk errors

If any sector read fails (carry flag set), execution falls through to a `disk_error` handler that prints an error message and halts.

## Stage 2 — `src/kernel.asm`

The stage-2 file is the target of the far return from stage 1. It provides the kernel header, sets up a fresh stack, and calls into the C++ kernel.

```nasm
kernel_header:
    dw (kernel_end - kernel_header + 511) / 512  ; sector count
    dw kernel_entry                               ; entry offset

kernel_entry:
    cli
    xor ax, ax
    mov ds, ax
    mov es, ax
    mov ss, ax
    mov sp, 0xFFFE
    sti
    call cpp_kernel_entry

halt_forever:
    hlt
    jmp halt_forever

align 16
cpp_kernel_entry:
    incbin "tmp\kernel_cpp.bin"  ; raw C++ .text section
```

The `incbin` directive embeds the stripped C++ binary directly into the assembled output so the kernel is a single flat image.
