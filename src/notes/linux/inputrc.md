 /etc/inputrc 혹는 $HOME/.inputrc

http://kldp.org/node/35944

http://linux.die.net/man/3/readline

http://www.softpanorama.org/Scripting/Shellorama/inputrc.shtml

$ bind -l
$ bind -p

BASH가 기본적으로 emacs editing모드를 지원하는데
이걸 vi모드로 셋팅하려면

```.bashrc
set editing-mode vi
set keymap vi
```