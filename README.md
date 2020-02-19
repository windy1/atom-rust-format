# Atom rustfmt

A package for the Atom text editor that lets you format Rust source code using the `rustfmt` tool.

## Setup

This package requires that `rustfmt` be installed on your system. If `rustfmt` is installed, but not on your `PATH`, you
must set the value of the `Executable` configuration entry to point to `rustfmt`.

![atom-rust-format-1](https://raw.githubusercontent.com/windy1/atom-rust-format/96803d5c9e4a14bdd10eec20cf0608da9be38258/images/atom-rust-format-1.png)

You must enable `Format On Save` if you would like your Rust source code to be formatted every time you save. Otherwise,
`ctrl-shift-m` is the default keybinding to format the currently open file.

# Custom rustfmt configuration

`rustfmt` has a global default configuration, if you would like to override this global configuration, you should edit
`Config Path` in this package's configuration.

`rustfmt.toml` files local to your `src` directories will be prioritized over `Config Path` but `Config` will be
prioritized over local `rustfmt` configurations.

![atom-rust-format-2](https://raw.githubusercontent.com/windy1/atom-rust-format/96803d5c9e4a14bdd10eec20cf0608da9be38258/images/atom-rust-format-2.png)
