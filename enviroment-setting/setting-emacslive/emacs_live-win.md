Windows에서 Emacs Live환경 꾸미기.
=============================

 참고 : [Clojure, EMACS Live installation tutorial for Windows]

# 목표
 포맷한 Windows에서 emacs live셋팅을 해보자.

## gow 설치
- [gow download page]에서 exe를 받아 설치한다.

## HOME path 설정
- 앞으로 `홈폴더`로 삼을 폴더를 정해, 환경변수 `HOME`에 등록시켜준다.

## leiningen설치
- [github leiningen]에서 [lein.bat]을 다운 받는다.
- 받은 lein.bat을 적절한 폴더에 넣고 환경변수 `PATH`에 등록시켜준다.
- cmd창을 열어 다음을 입력한다.

```
lein self-install
```

## JAVA 환경변수 설정
- JAVA_HOME
- CLASSPATH
- PATH

## Emacs 설치
- [kaist-ftp emacs]에서 zip을 받는다.
- 압축을 풀고, bin폴더를 환경변수 `PATH`에 등록시켜준다.
- `runemacs`명령어로 emacs를 한번 켜본다(중요, home포더 .emacs.d 디렉토리 만들 용도)
- emacs를 끈다.

## Emacs Live 설치
- git clone도 좋지만, 여기선 그냥 [zip파일][emacs-live zip]을 다운받는다.
- 압축을 풀고, `%HOME%/.emacs.d/`에 붙여놓은다.

## Enjoy Emacs Live
- 이제 emacs를 실행시켜 emacs live를 즐기자.
- [Quick Intro to Live Programming with Overtone]


 [gow download page]: https://github.com/bmatzelle/gow/downloads
 [Clojure, EMACS Live installation tutorial for Windows]: http://vimeo.com/56318159
 [github emacs-live]: github.com/overtone/emacs-live
 [kaist-ftp emacs]: http://ftp.kaist.ac.kr/gnu/gnu/emacs/windows/
 [github leiningen]: github.com/technomancy/leiningen
 [lein.bat]: https://raw.github.com/technomancy/leiningen/stable/bin/lein.bat
 [emacs-live zip]: https://github.com/overtone/emacs-live/archive/master.zip
 [Quick Intro to Live Programming with Overtone]: http://vimeo.com/22798433