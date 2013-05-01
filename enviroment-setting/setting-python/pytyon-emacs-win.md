python-emacs-win
=========================================================================

# 목차
* gow설치
* emacs설치
* python설치
* python 환경변수 설정
* pip 설치
* pip jedi 설정
* emacs jedi 설정
* 확인

## gow 설치
 [gow download page]

## emacs 설치
 [kaist-ftp emacs]

## python 설치
 3버전이랑 64bit는 간혹 문제발생하는 경우가 있어, 아싸리 python 2.7.4 32bit 로 다운받았음.
 [python download]

## python 환경변수 설정
환경변수 `HOME`에 python 설치 위치와 script폴더위치를 지정해주자.

ex)
```
C:\Python27\
C:\Python27\Scripts
```

## pip 설치
cmd창을 열어서 다음을 입력

```
> curl http://python-distribute.org/distribute_setup.py | python
> curl --insecure https://raw.github.com/pypa/pip/master/contrib/get-pip.py | python
```

## pip jedi 설정
cmd창을 열어서 다음을 입력

```
> pip install jedi
> pip install epc
```

## emacs jedi 설정
참고 :  [github emacs-jedi]


el-get은 피하고 package를 가까이하자.

init.el에 다음을 추가.

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


`M-x list-packages`로 `jedi`패키지를 설치해주자.

다음을 init.el에 추가해주자.
```
(autoload 'jedi:setup "jedi" nil t)
(add-hook 'python-mode-hook 'jedi:setup)
(add-hook 'python-mode-hook 'jedi:ac-setup)
(setq jedi:setup-keys t)
```

## 확인
emacs를 띄워서, .py파일을 연다음. `M-x auto-complete-mode`를 하고 재대로 자동완성이 되면 잘 된것임.

 [gow download page]: https://github.com/bmatzelle/gow/downloads
 [kaist-ftp emacs]: http://ftp.kaist.ac.kr/gnu/gnu/emacs/windows/
 [python download]: http://www.python.org/download/
 [github emacs-jedi]: https://github.com/tkf/emacs-jedi