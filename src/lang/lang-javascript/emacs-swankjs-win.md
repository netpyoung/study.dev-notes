

# ��ġ�� ȯ��

```
windows 8 - 64bit

nodejs v0.10.5 - 64bit
```


# �����ڷ�
 - [node.js�� �����ΰ�? #1]
 - [github swank-js]
 - [connect to nodejs and chrome from emacs]
 - [emacsrocks e11]
 - [emacsrocks e11-�ѱ������]

# nodejs && npm��ġ
http://nodejs.org/download/ ���� ��ġ������ �ٿ� �޴´�.

# swank-js��ġ
cmdâ�� ���� `npm install -g swank-js`�� swank-js�� ��ġ���ش�.


# emacs����

* `init.el`�� ��������.

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

* `M-x list-packages`���� ������ ��ġ������
 - `js2-mode`
 - `slime-js`
 - `auto-complete`
 - `ac-slime`

* `init.el`�� ������ �߰����ְ�, emacs�� ���� ������.

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

# �������� emacs��������ֱ�.
- cmd â���� `swank-js`�� ������ �������
- emacs�󿡼� `M-x slime-connect`�� Host: `127.0.0.1`, Port: `4005`�� ����.
- �������� ����� http://127.0.0.1:8009/swank-js/test.html �� �̵�.
- emacs�󿡼� `,`��, Command: `select-remote`, Remote: `��������`

# Ȯ��
* swank-js�� ����� �����ϴ��� �׽�Ʈ.

```
Remote selected: (browser) Firefox20.0
NODE> alert("test!")
undefined
FIREFOX-20.0> 
```
* `.js`â�� `repl`â���� f5�� ������, �ڵ��ϼ��� Ȱ��ȭ����� Ȯ��.
* `.js`â���� `C-M-x`�� �򰡽��� ����� �ݿ��Ǵ��� Ȯ��.

 [nodejs]: http://nodejs.org/download/
 [node.js�� �����ΰ�? #1]: http://blog.outsider.ne.kr/480?category=42
 [github swank-js]: https://github.com/swank-js/swank-js
 [connect to nodejs and chrome from emacs]: http://e-arrows.sakura.ne.jp/2011/06/connect-to-nodejs-and-chrome-from-emacs.html
 [emacsrocks e11]: http://emacsrocks.com/e11.html
 [emacsrocks e11-�ѱ������]: http://www.amara.org/ko/videos/uk3T9Gk3NXQ5/info/emacs-rocks-episode-11-swank-js/