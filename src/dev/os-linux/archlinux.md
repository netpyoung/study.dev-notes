
* usb���� �������ϴ� ���α׷�
 - [rufus]
 - [universal-usb-installer]

* yaourt
 /etc/pacman.conf  
 #[archlinuxfr]
 #Server = http://repo.archlinux.fr/i686
 #Server = http://repo.archlinux.fr/x86_64
 $ sudo pacman -Sy yaourt

* �ѱۼ���

 - ���� : http://fehead.tistory.com/159

```
$ vi ~/.xinitrc
export LANG=ko_KR.UTF-8
export XIM="nabi"
export XIM_PROGRAM="/usr/bin/nabi"
export XIM_ARGS=
export GTK_IM_MODULE="xim"
export XMODIFIERS="@im=nabi"

$ vi /etc/locale.gen
ko_KR_.UTF-8 UTF-8 �ּ�����
$ locale-gen
```

* capslock�� ctrl��
 - xev ��ɾ �̿� Ű�ڵ带 Ȯ������.
 - http://efod.se/writings/linuxbook/html/caps-lock-to-ctrl.html

```
keycode 66 = Control_L
clear Lock
add Control = Control_L
keycode 117 = Caps_Lock
add Lock = Caps_Lock

```

* �α�ȭ�麯��
 - archbang �α� �Ŵ����� Slim : https://wiki.archlinux.org/index.php/SLiM
 - # pacman -S slim-themes archlinux-themes-slim
* ��Ÿ ��Ű��
  - �͹̳� : terminator, tilda
  
* ��
 - http://www.linuxandlife.com/2011/11/tips-to-use-archbang.html


[archwiki:Arch_Linux]: https://wiki.archlinux.org/index.php/Arch_Linux
[wiki:��ġ_������]: http://ko.wikipedia.org/wiki/��ġ_������
[rufus]: http://rufus.akeo.ie/
[universal-usb-installer]: http://www.pendrivelinux.com/universal-usb-installer-easy-as-1-2-3/