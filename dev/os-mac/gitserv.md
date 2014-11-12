* optional 포트포워딩. 22 => xxxx

* brew로 깃 설치.

* system preference > account
  - 사용자 `git` 생성.

* system preference > share
  - remote login > 사용자 `git` 추가.


* git 저장소 설정.
```bash
su git

mkdir ~/hello.git && cd ~/hello.git
git init --bare


mkdir ~/.ssh
touch ~/.ssh/authorized_keys
```


* git 저장소 clone
```bash
git clone git@<git server ip>:hello.git
```


TODO
gitolite
gitlab
