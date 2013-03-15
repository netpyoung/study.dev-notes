 Emacs를 이용한 Haskell 환경설정 - Windows편.
====================================

----------------------------------
# Hasekll 환경설정
----------------------------------
## 목표
 - 30분안에, haskell "코딩환경 구축".

### Hasekll
 - ![200px-Haskell-Logo.svg.png](http://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Haskell-Logo.svg/200px-Haskell-Logo.svg.png "")

 - Haskell is a standardized, general-purpose purely functional programming language, with non-strict semantics and strong static typing. - wiki
 - [haskell] : http://en.wikipedia.org/wiki/Haskell_(programming_language)
 
### Cabal
 - ![Cabal-dark.png](http://hackage.haskell.org/images/Cabal-dark.png "")
 - Cabal is a system for building and packaging Haskell libraries and programs
  Hackage: the Haskell Package Database.
 - [cabal] : http://www.haskell.org/cabal/

### Emacs
 - ![splash-small.png](http://www.gnu.org/software/emacs/tour/images/splash-small.png "")
 - [emacs] : http://www.gnu.org/software/emacs/
 
### ghc-mod
 - "ghc-mod" is a backend command to enrich Haskell programming on editors including Emacs and Vim. The ghc-mod package on Hackage includes the "ghc-mod" command and Emacs front-end. Its source repository is on github.
 - [ghc-mod] : http://www.mew.org/~kazu/proj/ghc-mod/en/
 - [ghc-mod-github] : https://github.com/kazu-yamamoto/ghc-mod
 - [ghcmod-vim] : https://github.com/eagletmt/ghcmod-vim
 
### auto-complete-mode
 - ![ac.png](http://cx4a.org/software/auto-complete/ac.png "")
 - The most intelligent auto-completion extension for GNU Emacs
 - [auto-complete-moe] : http://cx4a.org/software/auto-complete/

----------------------------------
## 본격 설치
----------------------------------

### Haskell Platform for Windows
 * 다운로드주소. [http://www.haskell.org/platform/windows.html]

````cmd
$ cabal update
$ cabal install cabal-install
$ cabal install gch-mod
````

###  Emacs
 * 다운로드주소. [http://ftp.gnu.org/pub/gnu/emacs/windows]
 * "~/.emacs.d/init.el"파일을 만들고, 다음을 추가해주자.

````elisp
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
 * `M-x list-packages`를 한 뒤, `init-loader`, `auto-complete`, `haskell-mode`, `ghc`, `ghci-completion`를 설치해주자.
 * `~/.emacs.d/init.el`에 다음을 추가해주자.

````elisp
;; [== init-loader ==]
(require 'init-loader)
(init-loader-load "~/.emacs.d/conf.d/")
````

 * `~/.emacs.d/conf.d/0000_haskell.el`파일을 만들고, 다음을 추가해주자.

````elisp
;; [== Haskell Setting ==]
;; :Ref http://d.hatena.ne.jp/kitokitoki/20111217/p1

(require 'auto-complete)

(add-hook 'haskell-mode-hook 'turn-on-haskell-indentation)

;; [==:INIT ghc-mod==]
(autoload 'ghc-init "ghc" nil t)
(add-hook 'haskell-mode-hook
	  (lambda ()
	    (ghc-init)))

;; [==:INIT auto-complete==]
(ac-define-source ghc-mod
  '((depends ghc)
    (candidates . (ghc-select-completion-symbol))
    (symbol . "s")
    (cache)))

(defun my-ac-haskell-mode ()
  (setq ac-sources '(ac-source-words-in-same-mode-buffers
		     ac-source-dictionary
		     ac-source-ghc-mod)))

(add-hook 'haskell-mode-hook 'my-ac-haskell-mode)

;; [==:INIT fnd-file-hook==]
(defun my-haskell-ac-init ()
  (when (member (file-name-extension buffer-file-name) '("hs" "lhs"))
    (auto-complete-mode t)
    (setq ac-sources '(ac-source-words-in-same-mode-buffers
		       ac-source-dictionary
		       ac-source-ghc-mod))))
(add-hook 'find-file-hook 'my-haskell-ac-init)
````

----------------------------------
## 조작키
----------------------------------
:TODO

----------------------------------
## 팁
----------------------------------
:TODO

# 참고자료.

 * [[Haskell][emacs] Haskell 用の emacs カスタマイズ例] : http://d.hatena.ne.jp/kitokitoki/20111217/p1
 * [haskellの環境を構築(ubuntu10.10)] : http://d.hatena.ne.jp/podhmo/20101208/1291793953
 * [init-loader] : https://github.com/emacs-jp/init-loader
 * [github-markdown] : https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet