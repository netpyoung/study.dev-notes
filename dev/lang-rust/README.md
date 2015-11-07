https://github.com/reidarsollid/RustyCage

https://github.com/kud1ing/awesome-rust#ides

http://areweideyet.com/

https://github.com/phildawes/racer

https://github.com/RustDT/RustDT




# Cargo
Cargo - 화물 - Cargo is a tool that allows Rust projects to declare their various dependencies, and ensure that you'll always get a repeatable build.


Crate - 상자 - A crate is synonymous with a ‘library’ or ‘package’ in other languages.

module - Modules allow you to partition your code within the crate itself.

```
$ cargo new hello_world --bin
$ cd hello_world
$ tree .
.
├── Cargo.toml
└── src
    └── main.rs
```


`Cargo.toml` - manifest. it contains all of the metadata that Cargo needs to compile your project. - http://doc.crates.io/manifest


`Cargo.lock` It contains information about our dependencies
http://doc.crates.io/guide.html



## http://doc.crates.io/guide.html#cargotoml-vs-cargolock

    Cargo.toml is about describing your dependencies in a broad sense, and is written by you.
    Cargo.lock contains exact information about your dependencies, and is maintained by Cargo.
    If you're building a library, put Cargo.lock in your .gitignore.
    If you're building an executable, check Cargo.lock into git.


project layout
http://doc.crates.io/manifest.html#the-project-layout



# TOML (Tom's Obvious, Minimal Language)
INI와 비슷하지만,
TOML aims to be a minimal configuration file format that's easy to read due to obvious semantics. TOML is designed to map unambiguously to a hash table. TOML should be easy to parse into data structures in a wide variety of languages.

https://github.com/toml-lang/toml
