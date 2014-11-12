Common Lisp 환경설정
=========================================================================


# Common Lisp 개발 환경 구축
- slime??
- slime역활
- clisp설치
- quicklisp설치
- emacs설치
- slime 단축키
- 번외
 - slimv??
 - slimv 단축키

--------------------------------------------------------------------------------

## [slime][slime]??
![!slime.png]

Common Lisp 개발을 위한 Emacs Mode.
* 역사
 - Eric Marsden : SLIM을 만듬(2003. 중반쯤)
 - Luke Gorrie, Helmut Eller : 이를 확장시킴.
 - SLIME ( Extension of SLIM )
 - Superior Lisp Interaction Mode for Emacs
* 기능
 - Slime-mode
 - SLDB : debugger 인터페이스
 - REPL기능 강화
 - 자동완성기능 제공
 - Inspector기능

--------------------------------------------------------------------------------

## slime역활
* 에디터상의 코딩환경을 만들어 주고, Lisp 구현체와 데이터를 주고받을 수 있는 서버 제공

* 에디터 >> `에디터 확장 -> Swank`  >> Lisp 구현체

![!slime-architecture.jpg]

--------------------------------------------------------------------------------

## clisp설치
* [clisp] 에서 설치파일을 다운로드 받아 설치한다.

--------------------------------------------------------------------------------

## quicklisp설치
* 윈도우즈 환경변수 : HOME 설정해준다.

* [quicklisp.lisp]을 다운로드 받는다.

다운받은 폴더를 tmp라 가정하면

* quiclisp 설치.

```
tmp> ls
quicklisp.lisp

tmp> clisp
* (load "quicklisp.lisp")
* (quicklisp-quickstart:install)
* (ql:add-to-init-file)
* (quit)
```

* quicklisp-slime-helper 설치.

```
> clisp
* (ql:quickload :quicklisp-slime-helper)
* (quit)
```


--------------------------------------------------------------------------------

## emacs설치
[kaist-ftp emacs] 에서 다운로드 받아 설치한다.

임시 폴더경로가 c:/tmp라 가정.

* ~/.emacs.d/init.el을 수정.
```
(load (expand-file-name "~/quicklisp/slime-helper.el"))
;; Replace "sbcl" with the path to your implementation
(setq inferior-lisp-program "clisp")
(setq temporary-file-directory "C:/tmp")
```

* 동작확인
 - emacs에서 `M-x slime`을 해서 `CL-USER>`프롬프트가 뜨면 정상작동.

--------------------------------------------------------------------------------

## slime 단축키
참조 : http://www.pchristensen.com/blog/articles/public-beta-open-for-ultimate-n00b-slimeemacs-cheat-sheet/

* 에디터
 - C-M-i : 자동완성
 - C-M-x : eval-defun
 - C-cz : go to repl
 - C-cm : macro expand
 - C-cdd : describe symbol
 - C-cd  h : hyperspec

* 디버깅
 - a    : Abort
 - q    : Quit
 - n    : contiNue

--------------------------------------------------------------------------------

## 번외
### Slimv??
- SLIMV : Superior Lisp Interaction Mode for Vim
- 다운로드 : http://www.vim.org/scripts/script.php?script_id=2531
- 튜토리얼 : http://kovisoft.bitbucket.org/tutorial.html
- prerequire
 - python 2.7 다운로드 : http://www.python.org/download/

ex) windows slimv _vimrc
```
let g:slimv_swank_cmd = '!start "C:\Program Files\clisp-2.49\clisp.EXE" “C:\myHome\vimfiles/slime/start-swank.lisp“’
```

### Slimv 단축키
참조 : http://kovisoft.bitbucket.org/tutorial.html

* 에디터
 - ,c    : slime에 접속
 - ,(    : toggle paredit
 - <Tab> : 자동완성
 - ,d    : eval-defun
 - ,e    : eval-curr-exp
 - ,r    : eval-regin
 - ,b    : eval-buff
 - ,v    : interactive-eval
 - ,h    : HyperSpec (Common Lisp 도움말)

* 디버깅
 - ,a    : Abort
 - ,q    : Quit
 - ,n    : contiNue



 [kaist-ftp emacs]: http://ftp.kaist.ac.kr/gnu/gnu/emacs/windows/
 [slime]: http://common-lisp.net/project/slime/
 [!slime.png]: ./imgs/slime.png
 [!slime-architecture.jpg]: ./imgs/slime-architecture.jpg
 [clisp]: http://sourceforge.net/projects/clisp/
 [quicklisp.lisp]: http://beta.quicklisp.org/quicklisp.lisp