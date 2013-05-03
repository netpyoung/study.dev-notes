

# 설치시 환경

```
windows 8 - 64bit

nodejs v0.10.5 - 64bit
```


# 참고자료
 - [node.js는 무엇인가? #1]
 - [github swank-js]
 - [connect to nodejs and chrome from emacs]
 - [emacsrocks e11]

# nodejs && npm설치
http://nodejs.org/download/ 에서 설치파일을 다운 받는다.

# swank-js설치
cmd창을 열어 `npm install -g swank-js`로 swank-js를 설치해준다.


# emacs설정

* `init.el`을 수정하자.

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

* `M-x list-packages`에서 다음을 설치해주자
 - `js2-mode`
 - `slime-js`
 - `auto-complete`
 - `ac-slime`

* `init.el`에 다음을 추가해주고, emacs를 껏다 켜주자.

```elisp
;; [== swank-js ==]
(add-to-list 'auto-mode-alist '("\\.js$" . js2-mode))

(require 'auto-complete)
(add-to-list 'ac-modes 'slime-repl-mode)
(add-to-list 'ac-modes 'js2-mode)

(defun refresh-swank-js-autocomplete ()
  (interactive)
  (set-up-slime-ac)
  (auto-complete-mode t)
  (slime-js-minor-mode 1))

(global-set-key [f5] 'refresh-swank-js-autocomplete)
```

# 브라우져와 emacs연결시켜주기.
- cmd 창에서 `swank-js`로 서버를 띄워주자
- emacs상에서 `M-x slime-connect`후 Host: `127.0.0.1`, Port: `4005`에 접속.
- 브라우져를 띄워서 http://127.0.0.1:8009/swank-js/test.html 로 이동.
- emacs상에서 `,`후, Command: `select-remote`, Remote: `브라우져명`

# 확인
* swank-js가 제대로 동작하는지 테스트.

```
Remote selected: (browser) Firefox20.0
NODE> alert("test!")
undefined
FIREFOX-20.0> 
```
* `.js`창과 `repl`창에서 f5를 누른후, 자동완성이 활성화됬는지 확인.
* `.js`창에서 `C-M-x`로 평가식이 제대로 반영되는지 확인.

 [nodejs]: http://nodejs.org/download/
 [node.js는 무엇인가? #1]: http://blog.outsider.ne.kr/480?category=42
 [github swank-js]: https://github.com/swank-js/swank-js
 [connect to nodejs and chrome from emacs]: http://e-arrows.sakura.ne.jp/2011/06/connect-to-nodejs-and-chrome-from-emacs.html
 [emacsrocks e11]: http://emacsrocks.com/e11.html