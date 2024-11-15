`상명대학교` 자료 참고

## $연산자.

- $? : 최근 수행된 명령의 반환값.
- $$ : shell's PID
- $0 : shell script name
- $1 ... $n : number of command
- $* : All the positional parameters (as a single word) * // A B C => "A B C"
- $@ : All the positional parameters (as separate strings) // A B C => "A" "B" "C"

## 따옴표.

- single 따옴표 ' : whitespaces(' ', '\t', '\n')가 포함된 스트링을 하나의 스트링으로 만들기 우하여 사용됨
- double 따옴표 " : whitespaces가 포함된 하나의 스트링으로 만들기 위하여 사용되나, 내부에 
`'$'dollor`, `'\'backslash`, ``'backquote`들의 의미에 따라 substiution이 일어남.

## 입력과 출력

- 리디렉션 : 입력 [n]<n생략시 표준입력
- 출력 : `[n]>`, `[n]>>` n생략시 표준출력

``` bash
# ex)표준에러 출력
2>
```

## subshell 예제

``` bash
[pyoung@localhost c]$ i=10;
[pyoung@localhost c]$ j=20;
[pyoung@localhost c]$ echo $i $j
10 20
[pyoung@localhost c]$ (echo $i; echo $j; i=30; j=40)
10
20
[pyoung@localhost c]$ echo $i $j
10 20
[pyoung@localhost c]$
```

## 그룹명령 ( '{' 다음에 space가 있어야 됨)

``` bash
[pyoung@localhost c]$ i=10;
[pyoung@localhost c]$ j=20;
[pyoung@localhost c]$ echo $i $j
10 20
[pyoung@localhost c]$ { echo $i; echo $j; i=30; j=40; }
10
20
[pyoung@localhost c]$ echo $i $j
30 40
[pyoung@localhost c]$
```

## 명령 대치( '''따옴표와 '`'를 주의)

``` bash
[pyoung@localhost c]$ pwd
/home/pyoung/myHome/c
[pyoung@localhost c]$ old=`pwd`
[pyoung@localhost c]$ cd ..
[pyoung@localhost myHome]$ cd $old
[pyoung@localhost c]$ ls
ex1  ex1.c  file  nice  nice.c  test
[pyoung@localhost c]$ cd ..
[pyoung@localhost myHome]$ pwd
/home/pyoung/myHome
[pyoung@localhost myHome]$ cd ..
[pyoung@localhost ~]$ cd $old
[pyoung@localhost c]$
```

## 연산대치

``` bash
[pyoung@localhost c]$ i=10; j=20; echo $i $j
10 20
[pyoung@localhost c]$ l=$(($i*$j)); echo $l
200
[pyoung@localhost c]$ let m=$l-100; echo $m
100
[pyoung@localhost c]$
```

## '{', '}' 중괄호(Brace)의 이용

``` bash
[pyoung@localhost c]$ echo a{b, c, d}e
a{b, c, d}e
[pyoung@localhost c]$ echo a{ b, c, d }e
a{ b, c, d }e
[pyoung@localhost c]$ echo a {b,c,d} e
a b c d e
[pyoung@localhost c]$ echo a{b,c,d}e
abe ace ade
[pyoung@localhost c]$
```

## 함수(function)

``` bash
[function] name () { 리스트; }
[pyoung@localhost c]$ function add() { echo $(($1+$2)); }
[pyoung@localhost c]$ function hello() { echo Hello world! $*; }
[pyoung@localhost c]$ add 100 200
300
[pyoung@localhost c]$ hello 1 2 3
Hello world! 1 2 3
[pyoung@localhost c]$
```

## String test

- [[ 식 ]] or [ 식 ]
- 결과값 0(=true) or 1(=false)
- 괄호 앞뒤 space가 읽어야함

``` bash
[pyoung@localhost c]$ i=10; j=20; [[ "$i" -eq "$j" ]]; echo $?
1
[pyoung@localhost c]$ [[ "$i" -lt "$j" ]]; echo $?
0
[pyoung@localhost c]$
```

연산자와 피연산자 사이도 띄어줘야 한다.

``` bash
[pyoung@localhost c]$ str1=boy; str2=girl; [[ "$str1"=="$str2" ]]; echo $?
0
[pyoung@localhost c]$ str1=boy; str2=girl; [[ "$str1" == "$str2" ]]; echo $?
1
[pyoung@localhost c]$
```

## 정수연산자

- -eq(==)
- -ne(!=)
- -gt(>)
- -ge(>=)
- -lt(<)
- -le(<=)

## 문자열 연산자

- ==, !=
- <, >
- -z(null)
- -n(nc null)

## 논리 연산자

- -a(and)
- -o(or)
- !(not)

``` bash
[pyoung@localhost ~]$ [ -e /etc/motd ]; echo $?
0
[pyoung@localhost ~]$ [ -h /etc/motd ]; echo $?
1
[pyoung@localhost ~]$ [ /etc/motd -nt /etc/passwd ]; echo $?
1
[pyoung@localhost ~]$ [ ! /etc/motd -nt /etc/passwd ]; echo $?
0
[pyoung@localhost ~]$
```

## 파일(File) 테스트

- `[[ 식 ]]` or `[ 식 ]`

### 파일연산자

- -e(exist)
- -f(file?)
- -d(directory?)
- -p(pipe?)
- -h(symbolic link?)
- -S(socket?)
- -s(zeroSize?)
- -r(readable?)
- -w(writeable?)
- -x(executeable?)
- -g(set gid?)
- -u(set uid?)
- -nt(newer than?)
- -ot(older than?)


## if사용형식 

```sh
if test;
then list;
[ elif 리스트; then 리스트; ]
...
[ else 리스트; ]
fi
```

## for사용형식

```sh
for name [ in word ]; do 리스트; done
```

## while사용형식

```sh
while 테스트;
do 리스트;
done
```

``` bash
[pyoung@localhost ~]$ i=10; j=20;
[pyoung@localhost ~]$ if [ "$i" -lt "$j" ]; then echo i is less than j; else echo i is not less than j; fi
i is less than j
[pyoung@localhost ~]$ for file in *; do mv $file $file.txt; done
[pyoung@localhost ~]$ sum=0; i=1
[pyoung@localhost ~]$ while [ "$i" -le 10 ]; do let sum=$sum+$i; let i=$i+1; done
[pyoung@localhost ~]$ echo $sum
55
[pyoung@localhost ~]$
```

## 기타명령어

- read 변수
- echo 식
- return 식
- exit 정수



## 셸프로그램(Shell Programs)

첫줄

```sh
#!/bin/bash
```

```sh
$sh 파일이름 인수 ...
$chmod 755 파일이름; ./파일이름 인수 ...
```

args Test

```sh
[pyoung@localhost bash]$ cat ./args.sh
#/bin/bash

for i in $*
do
        echo $i
done

echo ========


for i in $@
do
        echo $i
done

echo ========

for i in "$*"
do
        echo $i
done

echo ========

for i in "$@"
do
        echo $i
done

exit 0
```

```sh
[pyoung@localhost bash]$ sh ./args.sh one two "long three"
one
two
long
three
========
one
two
long
three
========
one two long three
========
one
two
long three
```

replace suffix

```sh
[pyoung@localhost bash]$ cat rfe.sh
#!/bin/bash

if [ $# -ne 2 ]
then
        echo "Usage: $0 old_suffix new_suffix"
        exit 1
fi

for file in *.$1
do
        mv $file `basename $file $1 `$2
done

exit 0
[pyoung@localhost bash]$ touch a.c b.c c.c
[pyoung@localhost bash]$ sh ./rfe.sh c d
[pyoung@localhost bash]$ ls
a.d  args.sh  b.d  c.d  rfe.sh
```

small test

``` bash
[pyoung@localhost hw-01]$ cat small.sh
#!/bin/bash

if [ "$1" -lt "$2" ];
then
        echo "$1";
else
        echo "$2";
fi
[pyoung@localhost hw-01]$ sh small.sh 10 20
10
[pyoung@localhost hw-01]$ sh small.sh 500 100
100
[pyoung@localhost hw-01]$ sh small.sh 10 -100
-100
```

sum test

``` bash
[pyoung@localhost hw-01]$ cat sum.sh
#!/bin/sh

sum=0;

for i in $*
do
        let sum=$sum+i;
done

echo $sum;
[pyoung@localhost hw-01]$ sh sum.sh 1 2 3 4 5
15
[pyoung@localhost hw-01]$ sh sum.sh 1 2 3 4 5 6 7 8 9 10
55
[pyoung@localhost hw-01]$ sh sum.sh -100 1 2 3 4 5 6 7 8 9 10
-45
```

test file, directory count
```sh
[pyoung@localhost hw-01]$ cat count.sh
#!/bin/sh
d=0;
f=0;

isFile()
        {
        if [ ! -d $f -a -f $1 ]
        then
                let f=$f+1;
                echo d=$d f=$f;
                exit 0;
        fi
        countAll $1;
        }




countAll()
        {
        for file in $1*
                do
                        if [ -d $file ]
                        then
                        let d=$d+1;
                        countAll $file/;
                        elif [ -f $file ]
                        then
                        let f=$f+1;
                        fi
                done
        }
isFile $@;
        echo d=$d f=$f;
[pyoung@localhost hw-01]$ sh count.sh /etc/passwd
d=0 f=1
[pyoung@localhost hw-01]$ sh count.sh /etc/shadow
d=0 f=1
[pyoung@localhost hw-01]$ sh count.sh /bin/
d=0 f=110
[pyoung@localhost hw-01]$ sh count.sh ./
d=2 f=6
```
