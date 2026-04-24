# Debug Output

The kernel initializes a serial debug channel over COM1 at startup. This lets you observe kernel output in QEMU's terminal without relying on the VGA display, which is useful when the screen state is unclear.

## Serial port setup

COM1 is initialized at 38400 baud (8N1) during `kernel_main`:

```cpp
#define COM1 0x3F8

static inline void debug_init() {
    debug_outb(COM1 + 1, 0x00);  // disable interrupts
    debug_outb(COM1 + 3, 0x80);  // enable DLAB to set baud
    debug_outb(COM1 + 0, 0x03);  // divisor low  → 115200 / 3 = 38400
    debug_outb(COM1 + 1, 0x00);  // divisor high
    debug_outb(COM1 + 3, 0x03);  // 8 data bits, no parity, 1 stop bit
    debug_outb(COM1 + 2, 0xC7);  // enable FIFO, 14-byte threshold
    debug_outb(COM1 + 4, 0x0B);  // set OUT2, RTS, DTR
}
```

## Writing to serial

Characters are sent by polling the Line Status Register until the transmit holding register is empty:

```cpp
static inline void debug_putc(char c) {
    while (!(debug_inb(COM1 + 5) & 0x20)) {}  // wait for THRE bit
    debug_outb(COM1, (uint8_t)c);
}
```

`\n` is automatically preceded by `\r` to produce proper CRLF on the receiving end.

## Helper functions

| Function | Purpose |
|----------|---------|
| `debug_puts(str)` | Write a null-terminated string |
| `debug_write(buf, len)` | Write a raw byte buffer |
| `debug_hexdump(buf, len)` | Write bytes as `<HEX: XX XX ...>` |

## Viewing output in QEMU

QEMU is launched with `-serial stdio`, so serial output appears directly in the terminal window alongside the QEMU display. A confirmation message is written immediately after `debug_init()` returns, confirming the serial channel is live before any screen interaction.
