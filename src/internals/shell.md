# Shell

The shell is a simple read-eval-print loop (REPL) inside `kernel_main`. It has no parsing, no variables, and no scripting — it matches typed input against a fixed command table and calls the corresponding function.

## Input loop

```
print prompt "> "
loop:
    read one character via BIOS
    if Enter  → dispatch command, restart loop
    if Backspace → remove last char from buffer, erase on screen
    else → append to buffer, echo to screen
```

The input buffer is 64 bytes. Characters beyond position 63 are silently dropped.

## Command dispatch

After Enter is pressed, the buffer is null-terminated and compared against each entry in `g_cmds` from `commands.hpp`. The first match wins and its function is called. If nothing matches, "Unknown command" is printed.

## Built-in commands

| Command | Output           |
|---------|------------------|
| `foo`   | Prints `bar`     |
| `clear` | Clears the screen |
| `help`  | Prints available commands |

## Limitations

- No command history
- No tab completion
- No argument parsing — commands are matched by full name only
- 64-byte line length limit
- Input and output are entirely BIOS-mediated (no VGA text mode driver yet)

These limitations are intentional for the v0 iteration and will be redesigned in the rewrite.
