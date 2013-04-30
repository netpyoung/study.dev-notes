
쉘스크립트 써본 결과.

 쉘스크립트에서 함수를 써야한다면, 이미 쉘스크립트가 커졌다는걸 의미하고, 진짜 개발자라면 빨리 버리고, 다른 general한 언어로 쉘스크립트를 대체해라.
 
니마가 유지보수할게 아니라면...

왜 sh를 고집하는지?? 아놔.


--------------------------------------------------------------------------------

옵션
* sh -n "파일명"
 - 구문 에러만 체크하고 명령을 실행시키지 않는다.
* sh -v "파일명"
 - 명령을 실행하기 전에 읽어드린 스크립트를 화면에 출력한다.
* sh -x "파일명"
 - 스크립트에서 실제 실행한 명령을 츨력한다. 정의되지 않은 변수를 사용했을 때 에러를 출력한다.

 
:?, :=, :-, :+

참조 : http://www.grymoire.com/Unix/Sh.html#uh-36

```sh
    #!/bin/sh
    X=""
    Y="-l"
    ls ${X:-$Y} | head -2
    echo "\$X : $X"
    echo "\$Y : $Y"
    #X:=$Y 부분에서 할당이 되야하는데 할당이 되지 않는 것으로 나옴.
    ls ${X:=$Y} | head -2
    echo "\$X : $X"
    echo "\$Y : $Y"
    ls ${X:?"ERROR"} | head -2
```
 
* 따옴표
 - single 따옴표 ( ' ) : whitespaces(' ', '\t', '\n')가 포함된 스트링을 하나의 스트링으로 만들기 위해 사용
 
 - double 따옴표 ( " ) : whitespaces가 포함된 하나의 스트링으로 만들기 위하여 사용되나, 내부에 ('$':dollor, '\':backslash, '`':backquote) 의미에 따라 substiution이 일어남

 
* 딸러( $)
 * $# : 명령라인 입력된 인수의 개수
 * $* : 입력된 인수 전체의 내용($1 ~ $n)
 * $$ : (쉘프로그램이 실행되면서) 사용된 프로세스 ID
 * $! : (쉘프로그램이 실행시킨)백그라운드 프로세스 ID
 * $? : 이전 수행 종료 값

 
```sh
    !/bin/sh
    echo "grep을 위한 쉘 프로그램이 실행되었습니다."
    echo "사용된 PID : $$"
    echo "인자 : $#"
    echo "인수 : $*"
    ls -al &
    echo "실행시킨 PID : $!"
    echo "종료 코드 : $?"
```
 
```
* 연산자
- 정수연산자
-eq(==), -ne(!=),
 -gt(>), -ge(>=),
 -lt(<), -le(<=)

문자열 연산자
==, !=,
 <, >,
 -z(null),
 -n(nc null)

논리 연산자
-a(and), -o(or), !(not)

파일(File) 테스트
[[ 식 ]] or [ 식 ]
파일연산자
-e(exist),
 -f(file?),  -d(directory?),  -p(pipe?),  -h(symbolic link?),  -S(socket?),
 -s(zeroSize?),
 -r(readable?), -w(writeable?), -x(executeable?),
 -g(set gid?), -u(set uid?),
 -nt(newer than?),  -ot(older than?)

 
기본문법

함수
함수이름 () { 내용; }

 

if
if 테스트문장;
then 내용;
[ elif 테스트; then 내용; ]
...
[ else 내용; ]
fi

 

for
for 문장담을공간 [ in 문장들 ];
do 내용;
done

 

while
while 테스트;
do 내용;
done

 

case
case $변수 in
    문장1)
        행동1 ;;
    문장2)
        행동2 ;;
    *)
        기본행동 ;;
esac

 

continue , break , return, exit

 

read, readonly

    echo "Input a: \c" # \c를하면 동일 라인
    read a #사용자로부터 입력 요구
    readonly a
    readonly b
    readonly c
    readonly #변수명 없이 readonly단독으로 사용하면 읽기전용으로 된 상수들이 모두 화면에 출력.

 ```

--------------------------------------------------------------------------------

# [쉘 스크립트에서의 사칙연산](http://kldp.org/node/41111#comment-141571)

```sh
i=`expr $i + 3`
i=$(expr $i + 3)
```

```sh
i=$(($i+3))
let i+=3
```

# 참고자료

* 유닉스시스템&네트워크프로그래밍 - 신재호저
* [정적 라이브러리와 ar, ranlib, nm](http://pro.cug.kr/220)
* [Awk란?](http://wiki.kldp.org/wiki.php/Awk)
* [고급 Bash 스크립팅 가이드](http://wiki.kldp.org/HOWTO/html/Adv-Bash-Scr-HOWTO/)
 
# AR
```
cc -c makeMsg.c
ar crv libMsg.a makeMsg.o //오브젝트를 라이브러리로.
cc -o useMsg useMsg.c libMsg.a ==> cc -o useMsg useMsg.c -L. -lMsg
```
 
# Awk
Aho, Weinberger, Kernigham

awk는 데이터 양식의 문서나 또는 자료를 처리하여 다른 형태의 문서 또는 결과물을 출력하는데 쓰인다

 

"-f"  : awk문법으로 작성된 파일을 불러옴

address.txt
```
강아지|11-111-1111|222-2222-2222|개집
호랑이|33-333-3333|444-4444-4444|동굴
거북이|55-555-5555|666-6666-6666|용궁
```

awkTest.sh 
```sh
    #!/bin/sh
    /usr/bin/awk '\
    BEGIN {FS="|"} \
    BEGIN{print "====주소록 출력===\n"} \
    {name = $1} {tel=$2} {phone=$3} {address=$4} {n+=1} \
    {print "<" name ">" } \
    {print "전화번호 : " tel} \
    {print "핸드폰   : " phone} \
    {print "주소     : " address "\n"}\
    END {print "총" n"명"}\
    ' address.txt
```
 
출력결과
```
sh ./awkTest.sh
====주소록 출력===

<강아지>
전화번호 : 11-111-1111
핸드폰   : 222-2222-2222
주소     : 개집

<호랑이>
전화번호 : 33-333-3333
핸드폰   : 444-4444-4444
주소     : 동굴

<거북이>
전화번호 : 55-555-5555
핸드폰   : 666-6666-6666
주소     : 용궁

총3명
```
 

"-F[구분자]"
* FS    필드 구분자 - Fields Seperator
* RS    레코드 구분자 - Records Seperator
* NF    현재 레코드의 필드수(Number of Fields)
* NR    현재 파일에서 레코드 넘버(Number of Records)
* FNR    입력파일이 여러개인 경우에 현재 파일에서의 NF를 표시한다.
* OFS    출력시의 FS(Output Fields Seperator). 이 값을 변경하게 되면, 출력시의 FS 가 바뀌게 된다.
* ORS    출력시의 RS(Output Records Seperator). 이 값을 변경하게 되면, 출력시의 RS 가 바뀌게 된다.


# SED (Stream EDitor)
 사용되는 명령어키워드는 vi와 비슷함(i-문자열삽입, a-행추가, d-행삭제, s-치환, c-행변환, p-출력)

```
#!/bin/sh
/bin/sed \
    s/동굴/동굴밖으로빠져나옴/g \
    address.txt \
    > newAddress.txt
```
 
# getopt사용
```
#!/bin/sh
while getopts ":ab:c" Option
do
    case $Option in
        a) echo "A옵션으로 실행" ;;
        b) echo "$OPTARG데이터와 함께 B옵션으로 실행" ;;
        c) echo "C옵션으로 실행" ;;
    esac
done
exit 0
```
 
# $ vi /bin/which 해봐서 쉘스크립트코드 한번 봐볼것

