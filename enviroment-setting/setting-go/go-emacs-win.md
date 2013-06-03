 Emacs를 이용한 Go 환경설정 - Windows편.
====================================


----------------------------------
# Go 환경설정
----------------------------------

## 목표
 - 30분안에, go "코딩환경 구축".

## 환경
 - Windows8-64bit

### go
- Go는 구글이 개발한 가비지 컬렉션 기능이 있는 컴파일, 병행성(concurrent) 프로그래밍 언어이다. -  [wiki:Go_(프로그래밍언어)](http://ko.wikipedia.org/wiki/Go_%28%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D_%EC%96%B8%EC%96%B4%29)

    ![go-character](http://golang.org/doc/gopher/frontpage.png)

- 공식사이트 : [lang:go](http://golang.org/)
- 참고서 : [An Introduction to Programming in Go](http://www.golang-book.com/)
- 예제들 : [Go by Example](https://gobyexample.com/)

## Go 설치
- [go:download_list](http://code.google.com/p/go/downloads/list)로 가서,
- Windows (x86 64-bit) MSI installer Featured 다운로드

## 환경변수
- 환경변수 추가는 [rapidee](http://www.rapidee.com/en/)를 이용하면 편하다.
- 다음을 추가해주자.
 - `PATH` : git.exe가 있는 위치. `C:\Program Files (x86)\Git\cmd\`
 - `GOPATH` : go가 설치된 위치. `C:\Go\`

## gocode 설치
- [gocode](https://github.com/nsf/gocode)를 설치할려면 [git](http://msysgit.github.io/)이 필

> go get -u github.com/nsf/gocode

## emacs 설치
- [kaist-ftp:emacs](http://ftp.kaist.ac.kr/gnu/gnu/emacs/windows/)에서 다운로드.

## emacs 환경설정
* `~/.emacs.d/init.el` 에 다음을 추가해주자.
 - emacs를 한번 껏다키면, `~/.emacs.d/`폴더가 생김(단 `~`는 `HOME`폴더임)

````lisp
;; [== packages ==]
(package-initialize)
(setq package-archives
      '(
	("ELPA" . "http://tromey.com/elpa/")
	("gnu" . "http://elpa.gnu.org/packages/")
	("marmalade" . "http://marmalade-repo.org/packages/")
	("melpa" . "http://melpa.milkbox.net/packages/")
	))
````

* `M-x load-file`를 한뒤,  `~/.emacs.d/init.el`
* `M-x list-packages`를 한 뒤, `init-loader`, `auto-complete`, `quickrun`, `auto-complete`, `go-autocomplete`를 설치해주자.
* `~/.emacs.d/init.el`에 다음을 추가해주자.

````lisp
;; [== init-loader ==]
(require 'init-loader)
(init-loader-load "~/.emacs.d/conf.d/")
```

* `~/.emacs.d/conf.d/0000_go.el`에 다음을 추가해주자.

```lisp
(require 'auto-complete)
(require 'go-autocomplete)
(require 'auto-complete-config)

(add-hook 'go-mode-hook 'auto-complete-mode)
```


## 확인.
* auto-complete 확인 : emacs를 껏다키고, `test.go`파일 열어서 자동완성이 되면 성공.
* quickrun 확인 : 다음을 입력하고, `F7`을 눌러, `Hello World`가 출력되면 성공.

```go
package main

import "fmt"

func main() {
	fmt.Println("Hello World")
}
```
