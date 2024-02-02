nodejs - eclipse설정
============================

# 설치시 환경

```
windows 8 - 64bit

nodejs v0.10.5 - 64bit

Eclipse IDE for Java EE Developers - 64bit
```


# 참고자료
 - [node.js는 무엇인가? #1]
 - http://nanstrong.tistory.com/entry/이클립스-Nodejs-연동하기-Eclipse-Nodejs

# nodejs && npm설치
http://nodejs.org/download/ 에서 설치파일을 다운 받는다.


# eclipse 다운로드
* http://www.eclipse.org/downloads/ 사이트로 이동
* `Eclipse IDE for Java EE Developers` 다운로드

# nodeclipse 설치.
* eclipse실행
* Help > Install New Software
* http://www.nodeclipse.org/updates 추가
* Nodeclipse아래있는 Nodeclipse만 체크 및 설치(따로 설치안하면 chrome때문에 오래걸림)


# 확인.
- eclipse실행
- New -> NodeProject 선택
- `hello-world-server.js`파일이 있을건데, 안의 내용 삭제.
- `console.log("hi") 입력`
- Run(Ctrl+F11) Node Application 실행.
- `hi`라는 글자가 출력되면 성공

[node.js는 무엇인가? #1]: http://blog.outsider.ne.kr/480?category=42