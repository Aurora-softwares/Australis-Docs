# Kernel

The current v0 "kernel" is a tiny Hylang UEFI program. It is best understood as a bootable kernel seed rather than a complete operating-system kernel.

## Entry Code

```hylang
public class Program {
    public static void Main(string[] args) {
        System.Console.WriteLine("Hello world from Hylang!");
    }
}
```

The program prints a boot message and returns to the UEFI firmware. QEMU/OVMF leaves the text visible, which makes it suitable for this proof.

## Runtime Model

The code is compiled ahead of time by Hylang's `uefi-x64` target into a native EFI binary. It does not run on top of Windows, Linux, .NET, or another operating system.

The v0 target deliberately avoids features that would require a richer firmware runtime contract, such as threads, reflection, dynamic loading, general heap allocation, and arbitrary method calls.

## Not Implemented Yet

- Keyboard input
- Shell commands
- Interrupt handling
- Memory management
- Filesystems
- Drivers
- Userland
- A `Hydrogen.Uefi` library and broader firmware bindings
