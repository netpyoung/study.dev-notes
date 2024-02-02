
Emacs를 이용한 Go 환경설정 - Windows편.
====================================

## 목표
 - 30분안에, go "코딩환경 구축".


## 테스트환경
- Windows8-64bit
- 인터넷에 접속 가능.


### Golang
- Go는 구글이 개발한 가비지 컬렉션 기능이 있는 컴파일, 병행성(concurrent) 프로그래밍 언어이다. -  [wiki:Go_(프로그래밍언어)](http://ko.wikipedia.org/wiki/Go_%28%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D_%EC%96%B8%EC%96%B4%29)

    ![go-character](http://golang.org/doc/gopher/frontpage.png)

- 공식사이트 : [lang:go](http://golang.org/)
- 참고서 : [An Introduction to Programming in Go](http://www.golang-book.com/)
- 예제들 : [Go by Example](https://gobyexample.com/)
- slides:
 - [Concurrency is not Parallelism](http://talks.golang.org/2012/waza.slide)
 - [Twelve Go Best Practices](http://talks.golang.org/2013/bestpractices.slide)


## Go 설치
- [go:download_list](http://code.google.com/p/go/downloads/list)로 가서,
- Windows (x86 64-bit) MSI installer Featured 다운로드


## 버전컨트롤
- [git](http://msysgit.github.io/)
- [hg](http://tortoisehg.bitbucket.org/)


## 환경변수
- 환경변수 추가는 [rapidee](http://www.rapidee.com/en/)를 이용하면 편하다.
- 다음을 추가해주자.
 - `GOROOT` : go가 설치된 위치. `C:\Go\`
 - `GOPATH` : go 패키지를 설치할 위치. `C:\GoPath\`
 - `PATH` : git이 있는 위치, hg가 있는 위치, %GOROOT%\bin, %GOPATH%\bin


## gocode 설치

```
go get -u github.com/nsf/gocode
go get -u github.com/dougm/goflymake
go get -u code.google.com/p/rog-go/exp/cmd/godef
```


## emacs 설치
- [kaist-ftp:emacs](http://ftp.kaist.ac.kr/gnu/gnu/emacs/windows/)에서 다운로드.


## emacs 환경설정
* `~/.emacs.d/init.el` 에 다음을 추가해주자.
 - emacs를 한번 껏다키면, `~/.emacs.d/`폴더가 생김(단 `~`는 `HOME`폴더임)

``` lisp
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

* `M-x load-file`를 한뒤,  `~/.emacs.d/init.el`
* `M-x list-packages`를 한 뒤, `init-loader`, `auto-complete`, `quickrun`, `go-autocomplete`, `go-eldoc`, `flycheck`를 설치해주자.
* `~/.emacs.d/init.el`에 다음을 마져 추가시켜주자.

``` lisp
;; [== init-loader ==]
(require 'init-loader)
(init-loader-load "~/.emacs.d/conf.d/")
```

* `~/.emacs.d/conf.d/0000_go.el`에 다음을 추가해주자.

``` lisp
(require 'auto-complete)
(require 'go-autocomplete)
(require 'auto-complete-config)

(add-hook 'go-mode-hook
          (lambda ()
            (auto-complete-mode)
            (go-eldoc-setup)
            (flycheck-mode)))
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


## Tips
* `C-c C-a`: go-import-add
* `C-c C-j` : godef-jump
* `M-*` : pop-tag-mark
* `M-x gofmt`: apply go fmt
* [quickrun](https://github.com/syohex/emacs-quickrun)
* [flycheck](https://github.com/flycheck/flycheck)


## comment
- go-errcheck 는 별로임


## 나중에 확인해 볼것.
* [golint](https://github.com/golang/lint)
 - go get -u github.com/golang/lint/golint
