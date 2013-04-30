-----------------------------------------
# dos ??
-----------------------------------------
# windows 95
# windows 98
# windows 7
# windows 8

-----------------------------------------
# redhat
yum
```
yum 설치 (Fedora)
출처 : 한국 LUG[출처] yum 명령어.|작성자 비몽(http://shkmanse.tistory.com/)
yum은 CentOS의 원격 업데이트툴이다.
1. 업데이트할 목록을 보려면?
# yum list updates
2. 업데이트 목록을 다운로드하고, 업데이트를 설치하려면?
# yum update -y
3. 설치된 rpm 패키지 목록을 보려면?
# rpm -qa
# yum list installed
4. gcc 패키지가 설치되어 있는지 확인 하려면?
# rpm -qa | grep gcc
# yum list installed gcc
5. gcc 패키지를 설치하려면?
# yum install gcc
6. gcc 패키지를 업데이트 하려면?
# yum update gcc
7. 패키지 이름으로 검색하려면?
# yum list 패키지명
# yum list 정규식
# yum list gcc
# yum list gcc*
8. 여러개의 패키지를 설치하려면?
# yum install gcc gcc-c++
9. 패키지를 삭제하려면?
# yum remove gcc gcc-c++
10. 설치가 가능한 모든 패키지를 보려면?
# yum list all
11. 패키지 그룹을 보려면?
# yum grouplist
12. 그룹 패키지를 모두 설치하려면?
# yum groupinstall "Development Tools"
13. 그룹 패키지를 업데이트 하려면?
# yum groupupdate "Development Tools"
14. 그룹 패키지를 삭제하려면?
# yum groupremove "Development Tools"
15. 아키텍처를 지정하여 설치하려면?
# yum install mysql.i386
16. 파일을 가지고 있는 패키지명을 알려면?
# rpm -qf /etc/passwd
# yum whatprovides /etc/passwd
17. 맨페이지를 보려면?
# man yum
```

# opensuse
zypper
```
zypper 설치 (Open Suse)
참조 http://en.opensuse.org/Zypper/Usage
zypper                           #옵션과 커맨드를 알려준다zypper help search#search커맨드 사용법을 알려준다
zypper lp                     #패치가 필요한걸 보여줌
zypper patch             # 패치를 적용함
zypper se sqlite        #sqlite을 찾아봄
zypper rm sqlite2   #sqlite2를 지운다
zypper in sqlite3     # sqlite3를 설치한다
zypper in yast*         # yast*과 매치되는걸 설치한다
zypper up                   #설치된 모든 패키지를 업데이트가 가능하면 업데이트한다.
```
# gentoo
Emerge (Gentoo)
http://linuxreviews.org/gentoo/emerge/


# ubuntu
apt-***
```

apt- get설치(Ubunto)-데비안계열
http://wiki.kldp.org/wiki.php/AptRpm-HOWTO#s-2

root 인 상테에서  rpm -ihv이나 rpm -Uhv으로 apt 패키지를 설치
#apt-get update : apt-get 로컬 데이터베이스를 서버의 pkglist 파일들로 갱신합니다.(apt-get -f install)
#apt-get check : apt를 사용하여 시스템의 무결성을 검사합니다.
#apt-get install some-package : 새로운 패키지를 설치하고, 의존적인 패키지들을 자동적으로 풀고 다운로드 합니다.
#apt-get upgrade : 시스템에서 오래된 것을 검사하고 그것들을 자동적으로 갱신합니다.
#apt-get dist-upgrade : apt-get upgrade와 같습니다. 그러나 모든 기본 패키지들을 설치하고 모든 갱신을 시도하며 필요한경우 새로운 패키지들을 설치합니다.
#apt-get remove some-package : 패키지와 이것에 의존적인 다른 모든 패키지들을 지웁니다.

```
# arch
pacman
