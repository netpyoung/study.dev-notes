 Common Lisp 환경설정
==========================

대상 : Common Lisp를 처음 접하는 windows 사용자.

# What is CLISP
- 참조) http://www.clisp.org/summary.html
- Common Lisp는 고수준, 범용성, 객체지향, 다이나믹, 함수형 프로그래밍 언어입니다.
- CLISP는 Karlsruhe대학의 Bruno와, Munich 대학의 Michael에 의해 만들어진  Common Lisp 구현체(implementation)입니다. 모두 독일인 입니다.
- 이는  [ANSI Common Lisp standard][HyperSpec]에 나온 언어 스펙을 구현하였습니다. 

# 환경 설정
- [clisp:download] 에서 clisp를 다운받아 설치한다.
- [LispIDE:download]에서 LispIDE를 다운받아 설치한다.
- LispIDE를 실행시키고, 먼저 설치한 clisp의 위치를 찾아 등록시켜준다.
 - 예) 기본 경로 : ` C:\Program Files (x86)\clisp-2.49\clisp.exe`

# 확인.
- `LispIDE`를 실행시킨다.
- `File > New`로 `test.lisp`를 만든다.
- `test.lisp` 에 다음을 입력한다.
    ```lisp
    (+ 1 1)
    ```
- 괄호 끝에 커서키를 둬서 `Shift + Enter`를 누른다.
- 하단 창에 숫자 `2`가 찍히면 정상 동작.

# 단축키.
- `F1` : 도움말(영어 [HyperSpec])
- `Shift + Enter` : 표현식 평가하기.

# 입문자 추천 문서
- 영어가 부족하신 분
 -  만들면서 배우는 리스프 프로그래밍: Land of LISP  : http://www.hanb.co.kr/book/look.html?isbn=978-89-7914-875-6
- 영어가 되시는 분
 - land of lisp : http://landoflisp.com/
 - Common Lisp: A Gentle Introduction to Symbolic Computation : http://www.cs.cmu.edu/~dst/LispBook/ 
 - Successful Lisp : http://psg.com/~dlamkins/sl/contents.html
 - Practical Common Lisp : http://www.gigamonkeys.com/book/

 [clisp]: http://clisp.sourceforge.net/
 [clisp:download]: http://sourceforge.net/projects/clisp/files/latest/download
 [HyperSpec]: http://www.lispworks.com/documentation/HyperSpec/Front/

 [LispIDE]: http://www.daansystems.com/lispide/
 
 [LispIDE:download]: http://www.daansystems.com/lispide/LispIDE.zip