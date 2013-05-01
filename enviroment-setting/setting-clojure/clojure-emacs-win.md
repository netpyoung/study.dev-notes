clojure-emacs-win
=========================================================================
# 목차
* gow 설치
* HOME 환경변수 설정
* leiningen??
* leiningen 설치
* JAVA 환경변수 설정
* Emacs 설치
* Emacs nrepl 설정
* 확인.

## gow 설치
- [gow download page]에서 exe를 받아 설치한다.

## HOME 환경변수 설정
- 앞으로 `홈폴더`로 삼을 폴더를 정해, 환경변수 `HOME`에 등록시켜준다.

## leiningen??

https://github.com/technomancy/leiningen

![!leiningen-banner.png]

Leiningen

Java 프로젝트 매니저인, ant와 maven은 XML을 가지고 프로젝트를 관리한다.
하지만, XML은 보고 수정하기 힘들다!

Leiningen은 프로젝트관리 파일 자체가 .clj 파일이다.


Leiningen으로 만든 샘플 project.clj
```clojure
(defproject first "0.1.0-SNAPSHOT"
    :description "FIXME: write description“
    :url "http://example.com/FIXME"
    :license {:name "Eclipse Public License"
               :url "http://www.eclipse.org/legal/epl-v10.html"}
    :dependencies [[org.clojure/clojure "1.4.0"]]
```

## leiningen 설치
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

## Emacs nrepl 설정
* init.el에 다음을 입력.

```elisp
;; [== packages ==]
(package-initialize)
(setq package-archives
      '(
	("ELPA" . "http://tromey.com/elpa/")
	("gnu" . "http://elpa.gnu.org/packages/")
	("marmalade" . "http://marmalade-repo.org/packages/")
	("melpa" . "http://melpa.milkbox.net/packages/")
	))
```

* `M-x list-packages`로, `nrepl`과 `ac-nrepl`패키지 설치.

## 확인.
* cmd 창에서 `lein new test`
* emacs로 `test/project.clj`파일을 열자.
* `M-x nrepl-jack-in`으로 user> 프롬프트가 뜨는지 확인.
* .clj파일에서 `M-x auto-complete-mode`하고, `M-x ac-nrepl-setup`를 해서, 자동완성이 되는지 확인.

 [gow download page]: https://github.com/bmatzelle/gow/downloads
 [kaist-ftp emacs]: http://ftp.kaist.ac.kr/gnu/gnu/emacs/windows/
 [github leiningen]: github.com/technomancy/leiningen
 [lein.bat]: https://raw.github.com/technomancy/leiningen/stable/bin/lein.bat
 [!leiningen-banner.png]: http://leiningen.org/img/leiningen-banner.png