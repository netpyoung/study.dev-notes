The Rust Programming Language
https://github.com/killercup/trpl-ebook

https://github.com/reidarsollid/RustyCage

https://github.com/kud1ing/awesome-rust#ides

http://areweideyet.com/

https://github.com/phildawes/racer

https://github.com/RustDT/RustDT

<<<<<<< HEAD

# etc
https://www.packtpub.com/application-development/rust-essentials
https://www.kickstarter.com/projects/1712125778/rust-programming-concepts-book/description



oakes/rust_for_clojurists.md
https://gist.github.com/oakes/4af1023b6c5162c6f8f0


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



# JAVA interop
jna
https://github.com/jnr/jnr-ffi
http://openjdk.java.net/projects/panama/

https://github.com/Monnoroch/RustJni
=======
Visual Studio Code 로 Rust 개발하기 
http://m.blog.naver.com/futurewave01/220539718530

https://www.youtube.com/watch?v=O5vzLKg7y-k

http://rustbyexample.com/

https://doc.rust-lang.org/nomicon/


https://www.penflip.com/sarojaba/rust-doc-korean

https://github.com/kud1ing/awesome-rust

Rust Guidelines 
http://aturon.github.io/

rust-learning
https://github.com/ctjhoa/rust-learning


소유권
http://rustbyexample.com/scope.html
https://www.penflip.com/sarojaba/rust-doc-korean/blob/master/ownership.md


String Types in Rust
http://www.suspectsemantics.com/blog/2016/03/27/string-types-in-rust/

rustup
http://www.rustup.rs/

rusty-tags
https://github.com/dan-t/rusty-tags

rust-clippy
https://github.com/Manishearth/rust-clippy

Felix Klock - Rust: A type system you didn't know you wanted - Curry On

https://www.youtube.com/watch?v=Q7lQCgnNWU0
http://pnkfelix.github.io/curry-on2015.html#/thanks

https://www.youtube.com/watch?v=d1uraoHM8Gg
==========
언어
언어 버전 관리자
패키지매니져
태그
포맷팅
linting

testing
quick-check
https://github.com/BurntSushi/quickcheck

bench
debugging


http://hackr.io/
http://aml3.github.io/RustTutorial/html/toc.html
https://jaredonline.svbtle.com/roguelike-tutorial-in-rust-part-1
https://stepic.org/lesson/Rust-The-Basics-9268/step/1?unit=undefined
>>>>>>> 23872c7e6571969f130f02eaf9f312791944e420
