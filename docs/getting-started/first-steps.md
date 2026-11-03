---
title: First steps
description: Learn how to get Australis OS running safely in a virtual machine.
---

# Your first boot

Australis is a work-in-progress operating system. For now, the easiest and safest way to experience it is in **QEMU**, a virtual computer that runs in a window on your existing machine.

## 1. Prepare the tools

Start with the [requirements guide](../building/requirements/) for the current Linux toolchain, QEMU, OVMF, and the Hydrogen compiler. If a command in this guide does not match the latest **Development** branch, follow that branch's Makefile.

## 2. Get the source

Open the [Australis OS source repository](https://github.com/Aurora-softwares/Australis-OS), select **Development**, and clone it with its submodules.

~~~sh
git clone --recurse-submodules -b Development https://github.com/Aurora-softwares/Australis-OS.git
cd Australis-OS
~~~

Already cloned it? Run `git submodule update --init --recursive` before building.

## 3. Build and start

After setting up the required Hydrogen compiler, build the bootable image:

~~~sh
make iso
make run
~~~

This starts Australis inside QEMU using the project's default virtual display configuration. If you prefer serial output in your terminal, use:

~~~sh
make run-serial
~~~

## 4. Look around

On a text session, try `help` to see supported commands. The [explore guide](./explore/) suggests a few friendly places to begin.

:::note[What should I expect?]
The screen you see depends on the current development build and its boot mode. Features under active development may behave differently from older screenshots or tutorials.
:::

If boot fails, visit [Building and running](../building/building/) and [Debugging](../internals/debugging/). Keep in mind that physical hardware support has not been verified.
