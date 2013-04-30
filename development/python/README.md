BACKUP

http://www.python.org/

pypy - http://pypy.org/

 

package manager

http://packages.python.org/distribute/

http://doc.pypy.org/en/latest/getting-started.html#installing-pypy (for pypy)

 

clojure-py

https://github.com/halgari/clojure-py

 

emacs-for-python

https://github.com/gabrielelanaro/emacs-for-python

    for windows excute : https://bugs.launchpad.net/pyflakes/+bug/794331

 

Attest

http://packages.python.org/Attest/

 

Python을 배워야 하는 이유
http://kldp.org/node/77727

--------------------------------------------------------------------------------



```
한글 처리

소스 최상단에  >>> # -*- coding: euc-kr -*-

 

>> a = "Python"
>> print(a)
>> print("i eat %d apples. so i was %s" %(number, day))

 

종료예제
>>> import sys
>>> sys.exit()

 

변수 : 대소문자 구분, 이름크기 제약없음.
첫글자에 숫자나 특수기호 사용불가, 예약어 사용불가(확인하려면 import keyword후 keyword.kwlist)

 

리스트
리스트는 '[' 과 ']' 으로 둘러싼다
리스트는 값을 생성, 삭제, 수정이 가능하다
listName[start:end:step]
>>> a = [1,2,3]
>>> b = a // == >>> b = a[:]
>>> a[::-1]
[3, 2, 1]
>>> a[::2]
[1, 3]
>>>

 

터플
터플은 '('과 ')'으로 둘러싼다.
터플은 값을 변화시킬 수 없다.
콤마(,)를 생략하면 튜플이 아니라 단순한 정수형으로 정의된다.

 

딕셔너리(쌍 개념)
, Key와 Value쌍들이 여러개가 '{'과 '}'으로 둘러싸여있다.
 각각의 요소는 Key : Value형태로 이루어져 있고 쉼표(',')로 구분되어져 있다.
결론은 중복되는 Key를 사용하지 마라.
Key에 리스트는 쓸 수가 없다
.keys(), .values(), .items()

 

pass : 조건문에서 아무런 행동을 안하고 싶을 때

 

number = int(input(""))

>>> test_list = ['one', 'two', 'three']
>>> for i in test_list:
...     print i

a = [(1,2), (3,4), (5, 6)]
for (first, last) in a:
    print(first+last)

 

입력값이 몇 개가 될 지 모를 때
>>> def sum_many(*args):
. . .     sum = 0
. . .     for i in args:
. . .         sum = sum + i
. . .     return sum

초기화 시키고 싶은 입력 변수들은 항상 뒤쪽에 위치시켜야 함


문자열 띄어쓰기는 콤마로

print("Hellow")
print("Hellow", end = '')

==================================================

sys 모듈
#sys1.py
import sys

args = sys.argv[1:]
for i in args:
    print i

sys.path
sys.path.append

reload(모듈)
import 모듈 (모듈 전체를 불러온다.)
from 모듈 import 변수나 함수(모듈에서 필요한 것들만 불러온다.)
==================================================
# -*- encoding: euc-kr -*-

class Service:
    secret = "영구는 배꼽이 두개다."

pey = Service();
print(pey.secret)
==================================================
클래스내의 함수의 첫번째 인자는
"무조건 self로 사용을 해야 인스턴스의 함수로 사용할 수 있다."
(this와 비슷한 개념)
==================================================
상속
>>> class HouseKim(HousePark):
. . .      lastname = "김“
==================================================


__init__     생성자(Constructor), 인스턴스가 만들어 질 때 호출     

__del__     소멸자(Destructor) 인스턴스가 사라질 때 호출     

 __add__     연산자 "+"     X + Y
__or__     연산자 "|"     X | Y
__repr__     print     print X
__call__     함수호출 X()했을 때 호출     
__getattr__     자격부여     X.메소드
__getitem__     인덱싱     X[i]
__setitem__     인덱스 치환     X[key] = value
__getslice__     슬라이싱     X[i:j]
__cmp__     비교     X > Y

===================================================
직접 실행하면 작동, 대화형 인터프리터나 다른 모듈에서 불러올땐 작동안함.
if __name__ == "__main__":

 

 

import [module]
from [module] import [module function]

if __name__ == "__main__":

try
    ...
except [발생에러][,에러메시지변수]:
    ...


=====================================
에러처리하기

try:
    ...
except [발생에러[, 에러메시지변수]]:
    ...

=====================================
에러 발생시키기
raise
=====================================
내장함수
abs, chr
>>> pow(2,4)
16 (2의 4승)
=====================================
lambda 인수1, 인수2,,, : 인수를 이용한 표현식
>>> l = [lambda a,b:a+b, lambda a,b:a*b]
>>> l
[at 0x811eb2c>, at 0x811eb64>]
>>> l[0]
at 0x811eb2c>
>>> l[0](3,4)
7
>>> l[1](3,4)
12
======================================
map
>>> def two_times(x): return x*2
. . .
>>> map(two_times, [1,2,3,4])
[2, 4, 6, 8]
>>> map(lambda a: a*2, [1,2,3,4])
[2, 4, 6, 8]
def plus_one(x):
    return x+1
print(map(plus_one, [1,2,3,4,5]))
======================================
repr(object)은 객체를 출력할 수 있는 문자열 형태로 변환하여 돌려주는 함수
======================================
str(object)은 객체를 출력할 수 있는 문자열 형태로 변환하여 돌려주는 함수이다. 단 문자열 그 자체로만 돌려주는 함수이다.
======================================

zip 함수는 동일한 갯수의 요소값을 갖는 시퀀스 자료형을 묶어주는 역할을 한다.

 

import sys


atoi
atof

zfill
 
```