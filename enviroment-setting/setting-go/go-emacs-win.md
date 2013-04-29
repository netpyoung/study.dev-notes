:TODO

go language for windows

개발환경 설정
go 다운로드
http://golang.org/doc/install#download
http://code.google.com/p/go/downloads/list
 	go1.0.3.windows-amd64.msi 

[== emacs 환경설정 ==]
https://github.com/nsf/gocode
> go get -u github.com/nsf/gocode


go 첫인상
pros
그래도 c++보단 아직 간결하네..
오 그래도 emacs auto-complete지원은 되네...

cons
indent와 format에 제약을 주다니?
3항 연산자도 안돼?

go test는 좋아보이는데 왜 특정 파일만 테스트 하지 못해?(찾아보니 미지원)
generic은 어디로?(미지원이네..)
아나 range는 왜 지원하다만 느낌이지.
CLOS와 비슷한 메소드선언??, 근데 존나 쿨한데? method dispatch 따윈 없다?


??
멍미 이 이상한 상속은? http://golangtutorials.blogspot.kr/2011/06/anonymous-fields-in-structs-like-object.html
UTF-8 without BOM으로 해야 한글 저장된다?
완전 C언어 빠들이 만든 언어인듯?
C++, Java보다 저수준 언어라고 생각하고 접근하면 정신건강에 이로울듯.
하긴, 괴물이 되어버린 C++보다, 미성숙한게 나으려나.
On Go(http://cowlark.com/2009-11-15-go/). 역시 까야제맛.
그래도 지원군이 빵빵하고, 속도빠르겠다, c계열이라 커뮤니티가 커지겠지...



아 했갈려
Public은 대문자
private는 소문자