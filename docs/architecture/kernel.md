# Kernel

The current v0 "kernel" is a tiny C# UEFI program. It is best understood as a bootable kernel seed rather than a complete operating-system kernel.

## Entry Code

```csharp
using System;

ClearScreen();
Console.WriteLine("Australis OS booted from C#");

while (true)
{
}

static void ClearScreen()
{
    for (int row = 0; row < 50; row++)
    {
        Console.SetCursorPosition(0, row);

        for (int column = 0; column < 160; column++)
        {
            Console.Write(' ');
        }
    }

    Console.SetCursorPosition(0, 0);
}
```

The program clears the visible UEFI text area, prints the boot message, and then stays alive so the VM screen remains visible.

## Runtime Model

The code is compiled ahead of time by bflat into a native EFI binary. It does not run on top of Windows, Linux, .NET, or another operating system.

The v0 runtime deliberately avoids features that would require a richer managed runtime contract, such as threads, reflection, dynamic loading, or general heap-heavy code.

## Not Implemented Yet

- Keyboard input
- Shell commands
- Interrupt handling
- Memory management
- Filesystems
- Drivers
- Userland
- Hydrogen integration
