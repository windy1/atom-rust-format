# Atom rustfmt

A package for the Atom text editor that lets you format Rust source code using the `rustfmt` tool.

## Setup

This package requires that `rustfmt` be installed on your system. If `rustfmt` is installed, but not on your `PATH`, you
must set the value of the `Executable` configuration entry to point to `rustfmt`.

You must enable `Format On Save` if you would like your Rust source code to be formatted every time you save. Otherwise,
`ctrl-shift-m` is the default keybinding to format the currently open file.
