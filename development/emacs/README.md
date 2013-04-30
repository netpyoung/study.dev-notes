
```
windows를 위한 emacs 키바인딩 프로그램

http://www.cam.hi-ho.ne.jp/oishi/indexen.html

 

unicad 인코딩문제 해결 : http://blog.kaisyu.com/2011/01/emacs-encoding-unicad.html

 
gdb

gdb for visual studio keys : http://dreamstorm.tistory.com/16

gnu emacs cheat sheet : http://tulrich.com/geekstuff/emacs.html

gdb etag cscope : http://wiki.kldp.org/wiki.php/EmacsGdbEtagsCscope

watch expression : http://www.gnu.org/software/emacs/manual/html_node/emacs/Watch-Expressions.html

 

tdm-gcc : http://tdm-gcc.tdragon.net/

mingw32 : http://www.mingw.org/

 

 

정규식 관련

http://emacs.kldp.net/wiki/doku.php?id=emacs_doc:regular_expressions#%EB%A7%88%EC%B9%A8%ED%91%9C

http://www.emacswiki.org/emacs/RegularExpression

 

Gmail보내보자
http://www.gnu.org/software/gnutls/news.html

http://josefsson.org/gnutls4win/

 

http://kaisyu.springnote.com/pages/575011

http://msmtp.sourceforge.net/

 

키보드 관련(ctrl-capslock)

http://rhdxmr.tistory.com/45

http://www.lug.or.kr/files/docs/LINUX/KLDP/HOWTOs/html/Keyboard-and-Console-HOWTO-html/Keyboard-and-Console-HOWTO-15.html

http://youlsa.com/79

http://kldp.org/node/45965

 

폰트 : http://habib.posterous.com/how-to-change-emacs-default-fo

reload dot emacs : http://hermian.tistory.com/195

 

 
잊어먹어선 안될 명령어

 

http://stackoverflow.com/questions/64360/how-to-copy-text-from-emacs-to-another-application-on-linux

 

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