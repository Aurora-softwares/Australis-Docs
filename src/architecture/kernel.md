# Kernel

The C++ kernel (`src/kernel.cpp`) is a freestanding translation unit that runs in 16-bit real mode. It has no standard library, no runtime, and no OS below it — every hardware interaction goes through inline assembly or BIOS interrupts.

## Entry point

```cpp
extern "C" void kernel_main() {
    debug_init();   // set up COM1 serial port
    clear_screen();
    print_welcome();

    for (;;) {
        // read a line of input, dispatch a command
    }
}
```

`kernel_main` is declared `extern "C"` so the NASM wrapper can call it by name without C++ name mangling.

## Screen output — BIOS int 0x10

All text output uses the BIOS teletype service (interrupt `0x10`, function `0x0E`):

```cpp
static inline void print_char(char c) {
    asm volatile (
        "int $0x10\n"
        :
        : "a"(static_cast<uint16_t>(0x0E00 | static_cast<uint8_t>(c))),
          "b"(static_cast<uint16_t>(0x0007))   // page 0, white on black
        : "cc"
    );
}
```

Screen clearing uses function `0x06` (scroll up) to blank the entire 80×25 area, followed by function `0x02` to home the cursor.

## Keyboard input — BIOS int 0x16

Characters are read one at a time using BIOS keyboard service function `0x00`:

```cpp
static inline char bios_read_char() {
    uint16_t ax;
    asm volatile (
        "xor %%ah, %%ah\n"
        "int $0x16\n"
        : "=a"(ax)
        :
        : "cc"
    );
    return static_cast<char>(ax & 0x00FF);
}
```

The call blocks until a key is pressed. The low byte of `AX` is the ASCII character.

## Command system

Commands are defined in `src/commands.hpp` as a flat table of name/function-pointer pairs:

```cpp
struct Command {
    const char* name;
    void(*fn)();
};

static Command g_cmds[] = {
    { "foo",   &print_bar },
    { "clear", &bios_clear_screen },
    { "help",  &cmd_help },
};
```

The shell reads a line into a fixed 64-byte buffer, then walks `g_cmds` to find a matching name and calls its function.
