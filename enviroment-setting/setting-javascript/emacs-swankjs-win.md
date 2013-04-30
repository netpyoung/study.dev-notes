설치시 환경

nodejs v0.10.5 - 64bit
windows 8 - 64bit

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

`M-x package-list`에서 다음을 설치해주자
- js2-mode
- swank-js


# 브라우져와 emacs연결시켜주기.
- emacs상에서 `M-x slime-connect`후 Host: `127.0.0.1`, Port: `4005`에 접속.
- 브라우져를 띄워서 http://127.0.0.1:8009/swank-js/test.html 로 이동.
- emacs상에서 `,`후, Command: `select-remote`, Remote: `브라우져명`

동작하는지 테스트.

```
Remote selected: (browser) Firefox20.0
NODE> alert("test!")
undefined
FIREFOX-20.0> 
```

# .js파일에서 바로 eval하고 싶다고?
- js파일을 아무거나 열고, 
- major로 `M-x js2-mode` 켜주고,
- minor로 `M-x slime-js-minor-mode`를 켜주자.

 [nodejs]: http://nodejs.org/download/
 [node.js는 무엇인가? #1]: http://blog.outsider.ne.kr/480?category=42
 [github swank-js]: https://github.com/swank-js/swank-js
 [connect to nodejs and chrome from emacs]: http://e-arrows.sakura.ne.jp/2011/06/connect-to-nodejs-and-chrome-from-emacs.html
 [emacsrocks e11]: http://emacsrocks.com/e11.html