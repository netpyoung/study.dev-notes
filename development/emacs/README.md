unicad 인코딩문제 해결 : http://blog.kaisyu.com/2011/01/emacs-encoding-unicad.html

# gdb
gdb for visual studio keys : http://dreamstorm.tistory.com/16

gnu emacs cheat sheet : http://tulrich.com/geekstuff/emacs.html

gdb etag cscope : http://wiki.kldp.org/wiki.php/EmacsGdbEtagsCscope

watch expression : http://www.gnu.org/software/emacs/manual/html_node/emacs/Watch-Expressions.html


# 정규 표현식
http://emacs.kldp.net/wiki/doku.php?id=emacs_doc:regular_expressions#%EB%A7%88%EC%B9%A8%ED%91%9C

http://www.emacswiki.org/emacs/RegularExpression

```
 

정렬문제

M-x align

M-x align-regexp

 

M-x list-colors-display
M-x byte-compile-file

 

입력 변환

Ctrl-\

 

http://www.cinsk.org/emacs/emacs-comments.html 참조

주석정렬

M-q or M-x fill-paragraph


인덴트모드
C-C C-A
C-C C-T

오토인덴트
C-C C-Q (일부 언어 한정)

C-M-\ (이걸 추천)


코딩스타일
c-set-style

tab 문자
C-q Tab

언어설정
(set-language-environment "Korean")

인코딩바꾸기
C-X-M f
C-X-M r

 

Tab된것을 space로 바꾸기

M-x untabify


[출처] emacs 백업파일 생성 안하기 |작성자 날아라붕어빵
(setq auto-save-default nil)
(setq make-backup-files nil)

 

 

M-x cwarm-mode

if( i = 1)

for ( ; ; ) ;



 /usr/src에 texinfo받고 설치(구글검색해서 소스받고 make하면됨)
 >> cedet설치 http://wiki.kldp.org/wiki.php/EmacsAutoCompletionQuickNote
 >> ecb 설치 http://jasonpa.springnote.com/pages/2589

 

C-i == <tab>
계산기 켜기
C-x **

x키 == M-x clac-

10
s t a <RET> // 스택에 a란 변수로 저장(sTore)한다.
s r a <RET> // 스택에서 a란 변수를 불러(Recall)온다.

w = why

picture-mode
artist-mode

마지막 명령어 반복.
C-x z

원하는 line
M-x goto-line == M-g M-g


 C-x (
kmacro-start-macro 레코딩을 시작
C-x )
kmacro-end-macro 레코딩을 마침

 

C-x e
kmacro-end-and-call-macro 레코딩한것 재실행

 

M-x ff-find-other-file vim 에서는 :A plugin


M-x apply-macro-to-region-lines
매크로를 region 내의 각 line 에 실행

 

M-x iswitchb-mode  // C-x b 할때 버퍼간 이동이 손쉬워진다
```


*compilation* 버퍼에 나오는 문자열을 regexp를 이용하여 색깔 바꾸기.
http://vimeo.com/20780018

신성국님의 Emacs 스크린캐스트 및 ppt
http://www.cinsk.org/emacs/


```
Dired mode
C-x d

+ : 디렉토리 생성 - add
= : 파일 비교 - diff

c-x f
g : 디렉토리 업데이트
C : 복사 - Copy
D : 삭제 - Delete
R : 이름바꾸기 - Rename
Z : 압축하기 - Zip
M : 모드 바꾸기 - change Mode
T : 타임스탬프 바꾸기 - change Timestamp

t : 마크 토글 - mark Toggle
m : 마크하기 - Mark
u : 마크 해제 - Unmark
U : 전체 마크 해제 - Unmark All
%-m : regexp로 마크하기

C-x C-q : dired editable 모드로 바꾸기
C-c C-c : 적용시키기 - commit
C-c Esc : 취소하기
```


```
orgmode
1 Introduction
* Preface: Welcome
* 누구를 위해?
Organize
    1. (어떤 일을) 준비하다
    2. (특정한 순서*구조로) 정리하다, 체계화하다
    3. (일의) 체계를 세우다 

2 Document Structure
* Headlines
*
**
***

#+STARTUP: indent
#+STARTUP: hidestars odd


* Visibility cycling
TAB
FOLDED -> CHILDREN -> SUBTREE -> FOLDED

Shift-TAB
OVERVIEW -> CONTENTS -> SHOWALL -> OVERVIEW

keywords(overview, content, showall)
#+STARTUP: content


* Motion
C-c n, p, f, b

Structure edit
M- UP, DOWN,  LEFT, RIGHT

Subtree
M-S- UP, DOWN,  LEFT, RIGHT

C-c *     (org-toggle-heading)


* Plain lists
move
S- UP, DOWN
change
S- LEFT, RIGHT
-, +, 1., 1)


editing source
C-c '
    Edit the source code e
     #+STARTUP: hideblocks
     #+STARTUP: nohideblocks


2.10 Footnotes
2.11 The Orgstruct minor mode 
C-c C-z

#+STARTUP: overview
#+STARTUP: content
#+STARTUP: showall
#+STARTUP: showeverything


Exporting and Publishing




-Expand
* hellow &TAB
** world
*** !!

* hellow... &TAB

* hellow &TAB
** world...

* hellow
** world
*** !!


-Move Cursor
between subject
C-c
Next, Previous, Forward, Backward

-higher level
C-c 
Up

-Jump
C-c C-j




Footnotes
C-c C-x f
C-c C-c && C-c C-o

PlainLists
- | &Meta + ENTER
- |

+ | &Meta + ENTER
+ |

-Check
- [ ] &괄호 안에서 C-c C-c
- [X] &괄호 안에서 C-c C-c
- [ ]

Links
C-c C-l => http://orgmode.org/ => org
[[http://orgmode.org/][org]]

-Open
org &C-c C-o


C-u C-c C-l
로컬 파일

Table

M-x org-create-table나 C-c |
|   |   |   |   |   |
|---+---+---+---+---|
|   |   |   |   |   |


Tag
* Some Subject &C-c C-c
* Some Subject &C-c C-c  :FIRST-TAG:
* Some Subject           :FIRST-TAG:SECOND-TAG:

C-c C-q 는 현재 Subject에 대해 Tag를 담


-Search
C-c \

TODO
M-shift-RET

* Some Subject &C-c C-t
* TODO Some Subject &C-c C-t
* DONE Some Subject &C-c C-t
* Some Subject

-Setting
#+SEQ_TODO: TODO TEST | PASS DONE &C-c C-c

빨간색 TODO -> TEST ->초록색 PASS -> DONE 


Date+Time
C-c .

Schedule
C-c C-s

DeadLine
C-c C-d

NOTE
C-C C-z
C-c C-c는 확인 C-c C-k는 취소
    - Note taken on [2011-07-17 일 23:03] \\
      asdf

URL
Get Organized with Emacs Org-mode
http://www.linuxjournal.com/article/9116

The Org Manual
http://orgmode.org/manual/

============================
#+STARTUP:
hidestarts : 별표를 하나만
showstarts : 모든 별표를 보여준다
indent : 별표는 하나 인덴트 적용

odd
oddeven




     #+STARTUP: overview
     #+STARTUP: content
     #+STARTUP: showall
     #+STARTUP: showeverything


10 까지
===================
for Vim
http://vimeo.com/user5149406/videos

color-theme
http://orgmode.org/worg/color-themes-screenshot.html


http://orgmode.org/manual/Literal-examples.html#Literal-examples
```