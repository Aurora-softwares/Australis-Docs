---
title: Explore Australis
description: A gentle tour of Australis OS and its current capabilities.
---

# Explore Australis

Australis is being built piece by piece. It has a real boot process, its own kernel and system components, and an expanding set of tools. Some graphical desktop work is still under development.

## Get comfortable with the shell

Depending on the build, the command shell appears with an `australis>` prompt. These commands are a friendly place to start:

| Command | What it does |
| --- | --- |
| `help` | Shows available commands. |
| `ls` | Lists files in a directory. |
| `cat /hello.txt` | Displays a sample text file, if included in the image. |
| `ps` | Shows process information when supported by the build. |
| `exit` | Leaves the current shell session. |

You can read about [applications](../applications/platform/) and the [shell](../components/shell/) whenever you want more detail.

## What's inside?

The **bootloader** prepares the machine, the **kernel** controls core resources, **HyFS** provides a filesystem, and **userland** supplies the programs you interact with. These parts are explained in the [architecture overview](../architecture/overview/).

## What isn't ready yet?

Australis is not ready to replace Windows, macOS, or Linux for day-to-day use. Desktop features, hardware compatibility, runtime APIs, and tests are under active development. The [roadmap](../development/os-roadmap/) describes planned work, not a promise that every item is available today.

Want to go deeper? See [the build guide](../building/building/) or [the OS repository](https://github.com/Aurora-softwares/Australis-OS/tree/Development).
