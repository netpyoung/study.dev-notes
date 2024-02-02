
* usb부팅 가능케하는 프로그램
 - [rufus]
 - [universal-usb-installer]

* yaourt
 /etc/pacman.conf  
 #[archlinuxfr]
 #Server = http://repo.archlinux.fr/i686
 #Server = http://repo.archlinux.fr/x86_64
 $ sudo pacman -Sy yaourt

* 한글설정

 - 참고 : http://fehead.tistory.com/159

```
$ vi ~/.xinitrc
export LANG=ko_KR.UTF-8
export XIM="nabi"
export XIM_PROGRAM="/usr/bin/nabi"
export XIM_ARGS=
export GTK_IM_MODULE="xim"
export XMODIFIERS="@im=nabi"

$ vi /etc/locale.gen
ko_KR_.UTF-8 UTF-8 주석해재
$ locale-gen
```

* capslock을 ctrl로
 - xev 명령어를 이용 키코드를 확인하자.
 - http://efod.se/writings/linuxbook/html/caps-lock-to-ctrl.html

```
keycode 66 = Control_L
clear Lock
add Control = Control_L
keycode 117 = Caps_Lock
add Lock = Caps_Lock

```

* 로긴화면변경
 - archbang 로긴 매니져는 Slim : https://wiki.archlinux.org/index.php/SLiM
 - # pacman -S slim-themes archlinux-themes-slim
* 기타 패키지
  - 터미널 : terminator, tilda
  
* 팁
 - http://www.linuxandlife.com/2011/11/tips-to-use-archbang.html


[archwiki:Arch_Linux]: https://wiki.archlinux.org/index.php/Arch_Linux
[wiki:아치_리눅스]: http://ko.wikipedia.org/wiki/아치_리눅스
[rufus]: http://rufus.akeo.ie/
[universal-usb-installer]: http://www.pendrivelinux.com/universal-usb-installer-easy-as-1-2-3/