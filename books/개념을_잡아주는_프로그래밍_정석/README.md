개념을잡아주는프로그래밍정석
=========================================================================

 

http://www.acornpub.co.kr/book/practical-programming

 

    09-14 
        2틀에걸처 일단 4장까지 봤는데, 이제 python이란게 너무 버전 의존적인것 같고
        단순히 번역판이더라도 깔끔하게 환경설정부분의 각주는 차라리 같은라인에 해야지 이렇게 관례처럼 띄어놔버리면 처음 설정부분을 건너뛰게 되어(나와 같이 게으른사람들) 진행이 막힐 수 도 있다.(-0-// 4장진행시 환경설정 필수.. )
        또 이미지는 왜 안줘서 무조껀 책에 나오는것을 해야만 직성이 풀리는사람(me me) .. pdf꺼 캡쳐하게 만드냐구 ㅜㅜ
        프로그래밍을 아에 모르는 사람이 배우기엔 조금 오버인듯하지만 괜찮고 흥미를 지속적으로 일으킨다.

    09-16
        7장 연습문제 해결중

    09-20
        9장 연습문제 해결중

    09-22
        12장 연습문제 일시중지, 15장 환경설정에서 막힘 - 양이 적어 sqlbrowser로 했지만, eclipse를 써보는것도 나쁘진 않을듯

 
환경셋팅

    환경설정
        python "2.5"기반으로 설정(기타 모듈들도 버전 맞춰서 설치해줘야함 ex.numpy  )
        http://software-carpentry.org/

    WingIDE
        gulimche 12 가 한글도 안깨지고 고정폭이라 좋음.
        http://www.wingware.com/

    Document
        http://docs.python.org/modindex.html

    해답(짝수만 제공)
        http://www.cdf.toronto.edu/~pgries/pybook/pybook_exercises/

 

 

![pic207.jpg][!pic207.jpg] - pdf에 있는 사진캡쳐함
[!pic207.jpg]: ./img/pic207.jpg

--------------------------------------------------------------------------------

# p02.파이썬_소개


나머지 연산시 결과값의 부호는 두 번째 피연산자의 부호와 일치

 

내장함수
abs
round
pow
int, float

 
연습문제

 

참고 :

http://www.certforums.co.uk/forums/thread34400.html
http://www.calculateme.com/cGasMileage/MPGtoLitersPer100km.htm

 

    >>> def convert_mileage(mpg):
    ...     lpg = 3.785412
    ...     kmpm = 1.609344
    ...     lp100km = (100 * lpg)/(kmpm * mpg)
    ...     return lp100km

 

    >>> def liters_needed(distance, mpg):
    ...     return (distance * convert_mileage(mpg))/100

--------------------------------------------------------------------------------

# p03.문자열


 

    >>> help(str)

 

자주쓰는 문자열 메소드
capitalize()
find(s)
find(s, beg)
find(s, beg, end)
islower()
isupper()
lower()
replace(old, new)
split()
split(del)
strip()
strip(s)
upper()

 

    >>> '''one
    ... two
    ... three'''
    'one\ntwo\nthree'

 

raw_input() // 한줄 읽고 문자열로 리턴

    >>> name = raw_input("이름을 입력하세요 : ")
    이름을 입력하세요 : Darwin
    >>> print name
    Darwin

 

왜? "빈문자열 * 음수"는 오류가 아니라 빈문자열이 반환될까?

--------------------------------------------------------------------------------

# p04.모듈


모듈로드

    >>> import math
    >>> help(math) // 모듈정보확인
    >>> math.sqrt(9)
    >>> math.pi
    >>> math.pi = 3
    >>> print math.pi

 

선택적함수

    >>> from math import pi, sqrt
    >>> pi
    >>> sqrt(9)

 

모든함수

    >>> from math import *

 

내장함수

    __builtins__

 

목록확인

    >>> dir(__builtins__)

 

__name__과 __main__

    >>> After import, __name__ is __main__ and echo.__name__ is echo

 

    # -*- coding: utf-8 -*-
    ''' 온도 처리 함수. '''

    def to_celsius(t):
        '''화씨를 섭씨로 변환한다. '''
        return round((t-32.0) * 5.0 / 9.0)

    def above_freezing(t):
        '''온도가 섭씨 기준으로 어는 점보다 높으면 TRUE, 아니면 FALSE를 반환한다.'''
        return t > 0

    >>> import help_temp_with_doc
    >>> help (help_temp_with_doc)

 

 

이미지 라이브러리 (주의 - 사진불러올때 "한글or 공백" 때문에 오류나는듯)

    >>> import media
    >>> f = media.choose_file()
    >>> pic = media.load_picture(f)
    >>> media.crop_picture(pic, 150, 50, 450, 300)
    >>> media.add_text(pic, 115, 40, 'Madeleine', media.magenta)
    >>> media.show(pic)
    >>>

 

    >>> import media
    >>> pic = media.load_picture('pic207.jpg')
    >>> for p in media.get_pixels(pic):
    ...     new_blue = int(0.7 * media.get_blue(p))
    ...     new_green = int(0.7 * media.get_green(p))
    ...     media.set_blue(p, new_blue)
    ...     media.set_green(p, new_green)
    ...
    >>> media.show(pic)

 
get_color(pixel)
set_color(pixel, color)

darken(color)
lighten(color)
create_color(r,g,b)
distance(c1, c2)

 

테스트 코드

    # -*- coding: MS949 -*-
    import nose
    from temperature import to_celsius

    def test_roundoff():
        '''반올림 테스트'''
        assert to_celsius(100) == 37.8, '반올림하지 않은 결과를 반환'
       
    if __name__ == '__main__' :
        nose.runmodule()

 

윤년구하기

    >>> for i in range(2000, 2050) :
    ...     if calendar.isleap(i):
    ...         print i
    ...

 

요일구하기

    >>> days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
    >>> days[calendar.weekday(2016, 7, 29)]
    'Fr'

--------------------------------------------------------------------------------

# p05.리스트


len(L)
max(L)
min(L)
sum(L)

L.append(v)
L.insert(v)
L.remove(v)
L.reverse()
L.sort()
L.pop()

 

    >>> names = ["lemon", "lion", "littleman"]
    >>> slice_names = names[:]
    >>> alias_names = names
    >>> names[2] = "BIGMAN"
    >>> slice_names
    ['lemon', 'lion', 'littleman']
    >>> alias_names
    ['lemon', 'lion', 'BIGMAN']

 

None

    >>> x = None
    >>> x

 

수상한 함수

    def mystery_function(values) :
        '''[그룹들], [목록들],[목록들]... ==> [그룹,목록], [그룹,목록], [그룹, 목록]...'''
        result = []
        for i in range(len(values[0])):
            result.append(values[0][i])
           
            for j in range(1, len(values)):
                result[-1].append(values[j][i])
        return result
    >>> tmp1 = [[[1],[2],[3]], [[4,5,6],[5,6,7],[6,7,8]], [[7,8,9],[8,9,0],[9,0,1]], [[11,22,33],[22,33,44],[33,44,55]]]
    >>> tmp2 = mystery_function(tmp1)
    >>> tmp2
    [[1, [4, 5, 6], [7, 8, 9], [11, 22, 33]], [2, [5, 6, 7], [8, 9, 0], [22, 33, 44]], [3, [6, 7, 8], [9, 0, 1], [33, 44, 55]]]


--------------------------------------------------------------------------------

# p06.선택



스위치가없다니 이럴수가!!!

http://docs.python.org/faq/design.html#why-isn-t-there-a-switch-or-case-statement-in-python

 
조건문

    # -*- coding: MS949 -*-
    ph = 5
    if ph < 7.0 :
        print "산성"
    elif ph > 7.0 :
        print "염기성"
    else :
        print "중성"

 
두 피 연산자가 모두 참이면 and의 결과는 둘째값
```
>>> tmp = 1 and 2
>>> tmp
2
>>> tmp = 2 and 1
>>> tmp
1
```

두 피 연산자 가운데 하나라도 거짓이면 and의 결과는 첫째값
```
>>> tmp = 0 and False
>>> tmp
0
>>> tmp = False and 0
>>> tmp
False
```


참조
http://www.jclog.pe.kr/43

 

change_temperature.py

    # -*- coding: MS949 -*-

    def convert_temperature(t, source, target) :
        t = to_celsius(t, source)
        return celsius_to(t, target)
       
    def to_celsius(t, source) :
        '''if 문 노가다'''
        celsius = 0
        if (source == 'Celsius') :
            celsius = t
        elif (source =='Fahrenheit') :
            celsius = (t-32.0) *5/9
        elif (source =='Kelvin') :
            celsius = t -273.15
        elif (source =='Rankine') :
            celsius = (t -491.67) *5/9
        elif (source == 'Delsile') :
            celsius = 100.0 - t*2/3
        elif (source == 'Newton') :
            celsius = t*100/33
        elif (source == 'Reaumur') :
            celsius = t*5/4
        elif (source == 'Romer') :
            celsius = (t-7.5) *40/21
        return celsius
       
    def celsius_to(t, target) :
        '''if 대신 스위치 비슷하게 써봄'''
        temperature = {
            'Celsius' : lambda t : t ,
            'Fahrenheit' : lambda t: t * 9/5 +32,
            'Kelvin' : lambda t : t +273.15,
            'Rankine' : lambda t : (t + 273.15) * 9/5,
            'Delsile' : lambda t : (100.0 - t)*3/2,
            'Newton' : lambda t : t*33/100,
            'Reaumur' : lambda t : t*4/5,
            'Romer' : lambda t : t *21/40 +7.5
        }[target](t)
        return temperature

 

test_convert.py

    # -*- coding: MS949 -*-
    import nose
    from change_temperature import convert_temperature

    def test_convert_temperature() :
        '''온도 변환 테스트'''
        assert convert_temperature(260, 'Celsius', 'Kelvin') == 533.15, 'Celsius에서 Kelvin으로 온도 변환'

    if __name__ == '__main__' :
        nose.runmodule()

--------------------------------------------------------------------------------
 
# p07.반복


range
range(end) //0부터 end -1까지
range(start, end) //start부터 end-1까지
range(start, end, step) //step이 음수일경우 start가 end보다 커야한다.(그렇지 않으면 빈 리스트 반환)

 
for문

    values = [1,2,3]
    for i in range(len(values)) :
        values[i] *= 2
       
    print values

 


다중값 할당
x, y = 1, 2

    values = [11,22,33]
    for x in enumerate(values) :
        print x
    '''
    (0, 11)
    (1, 22)
    (2, 33)
    '''
       
    for pair in enumerate(values) :
        i = pair[0]
        v = pair[1]
        values[i] = 2*v

    print values #[22, 44, 66]
       
    for (i,v) in enumerate(values) :
        values[i] = 2*v
       
    print values #[44, 88, 132]

 
>>>>>>>>>>>>>>>>>>>>>

base + lake

    import media

    baseball = media.load_picture("baseball.jpg")
    width = media.get_width(baseball)
    height = media.get_height(baseball)

    lake = media.load_picture("lake.jpg")

    for y in range(0, height) :
        for x in range(0, width) :
            from_p = media.get_pixel(baseball, x, y)
            to_p = media.get_pixel(lake, 50 +x, 25 +y)
            media.set_color(to_p, media.get_color(from_p))
           
    media.show(lake)

 

count_flagments

    # -*- coding: MS949 -*-

    def count_fragments(flagment, dna) :
        count = -1
        last_match = 0
        index = 0
        while last_match != -1 :
            count += 1
            last_match = dna.find(flagment, index)
            index = last_match + 1
        return count

    print count_fragments('act', 'gttacgtggatg')
    print count_fragments('gt', 'gttacgtggatg')
    print count_fragments('gtt', 'gttacgtggatg')

 

break && continue

    # -*- coding: MS949 -*-
    earth_line = 1

    file = open("data.txt", "r")
    for line in file :
        line = line.strip()
        if line.startswith("#") :
            continue
        if line == "Earth" :
            break
        earth_line += 1
       
    print "Earth는 %d번째로 가벼운 행성" %earth_line

--------------------------------------------------------------------------------

# p08.파일처리

url로부터 문자열 얻어오기

    import urllib

    url = "http://google.com/"

    web_page = urllib.urlopen(url)
    for line in web_page  :
        line = line.strip()
        print line
       
    web_page.close()

 

특정 데이터포맷에 맞추어 읽어오기

    def read_weather_data(r) :
        '''
        입력 :
        4,2,2 YYYYMMDD - 날짜
        2,2,2 DDMMSS   - 위도
        2,2,2 DDMMSS   - 경도
        6,6,6 FF.FFF   - 온도, 섭씨; 습도, %; 기압, kPa
       
        반환 :
        (년, 월, 일, 도, 분, 초, 도, 분, 초, 온도, 습도, 기압)
        '''
        fields = ((4, int), (2, int), (2, int),
                  (2, int), (2, int), (2, int),
                  (2, int), (2, int), (2, int),
                  (6, float), (6, float), (6, float))
        result = []
       
        for line in r :
            start = 0
            record = []
           
            for (width, target_type) in fields :
                text = line[start:start+width]
                field = target_type(text)
                record.append(field)
                start += width
            result.append(record)
        return result

 


    '''
    흠... 이 방법 말고 따른 방법은 없을까???
    튜플이라서 한번 풀고
    역 변환(필드값을 계산하기위해)
    역 변환(계산후)
    리턴
    '''
    def wrapper(old_fields) :
        reverse_fields = []
        for record in old_fields :
            reverse_fields.append(list(record))
        reverse_fields.reverse()
        max_size = 38
       
        new_fields = []
        for (start, data_type) in reverse_fields :
            base = max_size - start
            new_fields.append(tuple([base, data_type]))
            max_size = start
        new_fields.reverse()
        return tuple(new_fields)

--------------------------------------------------------------------------------

# p09.집합과_사전


hash table - 자료구조
set

set(리스트 or 튜플)
단, set(2,3,4)와 같이는 안됨

 
add(원소)
remove(원소)
clear()

union(쎗) - 합집합(|)
intersection(쎗) - 교집합(&)
difference(쎗) - 차집합(-)
symmetric_deffernce(쎗) - 베타집합(^)

issubset(쎗) - 부분집합? (<=)
isupperset(쎗) - 포함집합? (>=)


해시 코드

    >>> hash((1,2,3))
    -378539185
    >>> hash([1,2,3])
    Traceback (most recent call last):
      File "<string>", line 1, in <fragment>
    TypeError: list objects are unhashable

 

집합 자체는 값을 추가하고 제거해야 함으로 불변적일 수 없으나
이 문제를 해결하기 위해 frozenset()이 있음.

 
dictionary

 

    birds = {'eagle' : 999, 'snow goose' :33}
    for x in birds :
        print x, birds[x]
    del birds['eagle']
    print birds # {'snow goose': 33}

 
clear()
keys()
values()

items() // (키, 값) 쌍의 리스트를 반환
iteritems() // 키, 값 하나씩 반환
get(키, 디폴트값) //키 존재 : 값반환 ? 디폴트값반환
update(사전)

 

    # -*- coding: MS949 -*-
    import sys

    count = {}
    for filename in sys.argv[1:] :
        infile = open(filename, 'r')
        for line in infile :
            name = line.strip()
            count[name] = count.get(name, 0) +1
        infile.close()
       
    #키와 값을 뒤집음.
    freq = {}
    for (name, times) in count.items() :
        if times in freq:
            freq[times].append(name)
        else :
            freq[times] = [name]
           
    #결과 출력
    for key in sorted(freq) :
        print key
        for name in freq[key] :
            print ' ', name
 

--------------------------------------------------------------------------------

# p10.알고리즘



하향식 설계 :
인간 언어로 서술하는 것으로 시작해, 프로그래밍 언어에 직접적으로 대응되는 구문으로 표시.
직접적으로 대응되지 않는 구문은 옴길수 있을 때까지 더 상세히 다시 작성

 

% 테스트로 코드의 동작 여부를 확인 하는 과정 필요. %

 

프로파일링(profiling) : 프로그램을 실행하는데 걸린 시간과 메모리의 양을 측정.

 

    # -*- coding: MS949 -*-
    counts = [809, 834, 477,478,307,122,96,102,324,476]

    # L리스트에서 가장 작은 두 값의 인덱스를 튜플로 반환한다.
    def find_two_smallest1(L) :
        '''찾고 제거하고 찾는다'''
        smallest = min(L)
        min1 = L.index(smallest)
        L.remove(smallest)
        next_smallest = min(L)
        min2 = L.index(next_smallest)
        L.insert(min1, smallest)
        if min1 <= min2 :
            min2 += 1
        return (min1, min2)

    def find_two_smallest2(L) :
        '''정렬후 최소값구하기'''
        tmp_list = L[:]
        tmp_list.sort()
        smallest = tmp_list[0]
        next_smallest = tmp_list[1]
        min1 = L.index(smallest)
        min2 = L.index(next_smallest)
        return (min1, min2)

    def find_two_smallest3(L) :
        '''리스트 순회'''
       
        if L[0] < L[1] :
            min1, min2 = 0, 1
        else :
            min1, min2 = 1, 0

        for i in range(2, len(L)) :
            if L[i] < L[min1] :
                min2 = min1
                min1 = i
            elif L[i] < L[min2] :
                min2 = i
        return (min1, min2)

    print find_two_smallest1(counts)
    print find_two_smallest2(counts)
    print find_two_smallest3(counts)

--------------------------------------------------------------------------------

# p11.탐색과_정렬



bisect모듈 - Array bisection algorithm

http://docs.python.org/library/bisect.html#module-bisect
bisect_left
insort_left
bisect_right
insort_right

 

이진탐색

    def binary_search(v, L) :
        i = 0
        j = len(L) -1
        while i != j+1 :
            m = (i +j) /2
            if L[m] < v :
                i = m +1
            else :
                j = m -1
               
        if 0 <= i < len(L) and L[i] == v :
            return i
        else :
            return -1

 

선택정렬

    def selection_sort(L) :
        i = 0
        while i != len(L) :
            smallest = find_min(L, i)
            L[i], L[smallest] = L[smallest], L[i]
            i += 1
           
    def find_min(L, b) :
        smallest = b
        i = b +1
        while i != len(L) :
            if L[i] < L[smallest] :
                smallest = i
            i += 1
        return smallest

 

 삽입정렬

    def insertion_sort(L) :
        i = 0
        while i != len(L) :
            insert(L, i)
            i += 1
           
    def insert(L, b) :
        i = b
        while i != 0 and L[i-1] >= L[b] :
            i -= 1
        value = L[b]
        del L[b]
        L.insert(i, value)

 

어딧는지 알아내기 log_2N
삽입하는 걸리는 시간 N에 비례
N개의 값을 넣어야 함으로 ==> N(N + log_2N)

    import binsect

    def bin_sort(values) :
        result = []
        for v in values :
            binsect.insort_left(result, v)
           
        return result

 

정렬된 두 리스트의 병합

    def merge(L1, L2) :
        newL = []
        i1 = 0
        i2 = 0
       
        while i1 != len(L1) and i2 != len(L2) :
            if L1[i1] <= L2[i2] :
                newL.append(L1[i1])
                i1 += 1
            else :
                newL.append(L2[i2])
                i2 += 1
    #i1이나 i2가 범위를 넘어설경우 다른 한쪽을 추가시켜주는 조건을 추가하면 extend를 사용할 필요가없음.
        newL.extend(L1[i1:])
        newL.extend(L2[i2:])
        return newL

 

병합정렬

http://sweeper.egloos.com/920985

http://www.iamcorean.net/110

http://www.hanb.co.kr/network/view.html?bi_id=1049

    def mergesort(L) :
        ''' L을 오름차순으로 정렬한다.'''
        workspace = []
       
        #항목이 하나인 리스트의 리스트를 만듬.
        for i in range(len(L)) :
            workspace.append([L[i]])
           
        # 병합할 두 리스트가 남아있는한 둘을 병합.
        # 새 리스트를 리스트의 리스트에 추가.
        i = 0
        while i < len(workspace) -1 :
            L1 = workspace[i]
            L2 = workspace[i +1]
            newL = merage(L1, L2)
            workspace.append(newL)
            i += 2
           
        #정렬된 리스트를 복사
        if len(workspace) != 0 :
            L[:] = workspace[-1][:]

 
--------------------------------------------------------------------------------

# p12.프로그램_제작

매개변수

기본 매개변수값

'''매개변수를 None이 아닌 len(values)를 넣을 수 는 없다'''

    def total(values, start =0, end=None) :
        ...
        if end is None :
            end = len(values)
        ...

 

별표붙이기

'''인자들을 튜플에 집어넣고 values란 이름을 할당'''

별표붙인 인자를 둘 이상 사용할 수 없음
별표붙인 인자 이후 '일반'매개변수 정의하는것도 허용하지 않음.

    def our_max(*values) :
        ...

 

명명된 매개변수.

    def what_abc(a, b, c) :
        return "a =%d, b =%d, c =%d" %(a,b,c)
       
    print what_abc(b = 30, c = 50, a = 10)

 

별표 2개

http://wiki.futuretoby.com/Parameter_List_Chaining_in_Python

 
예외처리

함수에서 발생한 오류는 항상 예외를 발생시켜 알려야 한다.
'낮은 곳에서 던지고 높은 곳에서 잡아라'

 

예외처리 -1

    values = [-1, 0, 1]
    for i in range(4) :
        try :
            r = 1.0 /values[i]
            print i, '지점의 값', values[i], '의 역수는', r,
        except IndexError, ie:
            print ie
        except ArithmeticError :
            print "에러!"
        else :
        #try블럭이 정상적으로 완료될 때만 수행
            print "[ 쿵짝 ]"

 

예외처리 -2

    def divide(top, bottom) :
        if bottom == 0:
            raise ValueError('제수가 0입니다.')
        else :
            return top/bottom

    for i in range(-1, 2) :
        try :
            print divide(1, i)
        except ValueError, ve:
            print ve, "i : ", i

 
테스트

용어

    기능테스트(functional test) : 최종 사용자의 입장에서 시스템 전체의 행위를 살핌
    단위테스트(unit test) : 프로그램의 격리된 구성 요소 하나를 시험함.
    블랙박스테스트 - 입출력만 고려할 뿐, 구현은 고려하지 않는다.
    글래스박스테스트- 테스터가 프로그램 내부와 동작방식을 살펴볼 수 있다.

    회귀테스트(regression testing) : 테스트를 다시 실행해 최근에 가한 변경 사항이 다른 무언가를 망가 뜨리지 않는지 확인하는 과정.
        (테스트가 자동화돼 있고 프로그램의 행위에 가하는 변경 사항이 비교적 드믄 경우에만 효과가 큼)


테스트 사항

    경계조건 (리스트가 비엇거나 하나인 경우)
    가장 단순하고, 중요한경우 (값이 둘인 리스트가 정렬하는 경우, 정렬된것과 정렬되지 않은것)
    일반적인 경우 (더 긴 리스트를 정렬하는 경우)

 

문제를 찾을때 도움되는 테스트

    수 테스트 (0, 최대값-+1, 최소값-+1)
    자료구조테스트(빈구조, 하나뿐인 구조, 최대갯수, 중복요소, 별칭이 생성된 값을 포함하는 구조)
    탐색테스트(일치하는 항목이 없는 경우, 하나만 일치, 여러 항목이 일치, 모든 항목이 일치)

 
StringIO || cStringIO

참고

    Docs
        http://docs.python.org/library/stringio.html

    cStringIO vs StringIO
        http://tuxpool.blogspot.com/2010/01/python-cstringio-vs-stringio.html

    cStringIO importError
        http://effbot.org/librarybook/cstringio.htm
        try:
            import cStringIO
            StringIO = cStringIO
        except ImportError:
            import StringIO

        print StringIO

 

StringIO와 cStringIO차이점

    import StringIO
    a = StringIO.StringIO(u"test")
    print a.read() #test

    import cStringIO
    b = cStringIO.StringIO(u"test")
    print b.read() #t\000e\000s\000t\000

--------------------------------------------------------------------------------

# p13.객체지향_프로그래밍


__ (밑줄 2개) : private

_ (밑줄 1개) : private by convention으로 취급. (protected와 유사)

 

__str과 __repr__ 의 차이점.http://kldp.org/node/95367

 

__str__ : 비공식적이며 사람이 읽을 수 있는 버전의 객체가 필요할 때 호출(print를 쓸때 호출)
__repr__ : 좀더 정확하지만, 가독성이 약간 떨어지는 출력 결과가 필요할 때
__add__ : + 연산
__sub__ : - 연산
__eq__ : == 연산

__dict__ : 파이썬은 사전을 이용해 인스턴스 변수를 구현. __dict__로 확인 할 수 있다.

 

bright + dark를 bright.__add__(dark) 이렇게 해석

    >>> white.__dict__
    {'blue': 255, 'green': 255, 'red': 255}

 

클래스 예제

    class Color(object) :
        def __init__(self, r, g, b) :
            '''생성자'''
            self.red = r
            self.green = g
            self.blue = b
           
        def __str__(self) :
            '''print출력'''
            return "(%s, %s, %s)" %(self.red, self.green, self.blue)
       
        def __add__(self, other) :
            ''' +연산 '''
            return Color(min(self.red +other.red, 255),
                         min(self.green +other.green, 255),
                         min(self.blue +other.blue, 255))
       
        def __sub__(self, other) :
            ''' -연산 '''
            return Color(max(self.red -other.red, 0),
                         max(self.green -other.green, 0),
                         max(self.blue -other.blue, 0))
       
        def __eq__(self, other) :
            ''' ==연산 '''
            return (self.red == other.red and \
                    self.green == other.green and \
                    self.blue == other.blue)
                        
        def lightness(self) :
            strongest = max(self.red, self.green, self.blue)
            weakest = min(self.red, self.green, self.blue)
            return 0.5 *(strongest+weakest) /255

 

상속 예제

    class Arthropod(Organism) : #괄호안에 부모클래스를 써준다.
        def __init__(self, name, x, y, legs) :
            Organism.__init__(self, name, x, y)
            self.legs = legs


--------------------------------------------------------------------------------

# p14.그래픽_사용자_인터페이스


http://wiki.python.org/moin/TkInter

http://www.tutorialspoint.com/python/python_gui_programming.htm

 
Frame
Menu
MenuButton
Label
Button
Canvas
Checkbutton
Listbox

Entry = 한줄짜리 텍스트 필드
Text = 여러줄짜리 텍스트 아레아
Message = 여러줄 짜리 Label과 같음
TopLevel = 추가 윈도우

 

Button
textvariable
borderwidth
relief = SUNKEN/ RAISED/ GROOVE/ RIDGE

Text
text = Text(frame, height=3, width=10)

 

pack()
label.pack(side="left")

grid()
label.grid(row=0, column =0)
row = 0부터 시작
column = 0부터 시작
rowspan = 기본값 1
columnspan = 기본값 1

 

프래임

     # -*- coding: MS949 -*-
    from Tkinter import *
    import time

    window = Tk()
    frame1 = Frame(window)
    frame2 = Frame(window, borderwidth=4, relief=GROOVE)
    frame1.pack()
    frame2.pack()

    data = StringVar()
    data.set("Data to display")

    first = Label(frame1, textvariable=data)
    second = Label(frame2, text="Second label")
    first.pack()
    second.pack()

    window.mainloop()

 

모델 - 뷰 - 컨트롤러

    from Tkinter import *

    #컨트롤러
    def click() :
        counter.set(counter.get() +1)
       
    if __name__ == "__main__" :
        window = Tk()
       
        #모델
        counter = IntVar()
        counter.set(0)
        #뷰
        frame = Frame(window)
        frame.pack()
       
        button = Button(frame, text="Click", command=click)
        button.pack()
       
        label = Label(frame, textvariable=counter)
        label.pack()
       
        window.mainloop()

 

lambda

    >>> lambda:3
    <function <lambda> at 0x00F4FB30>
    >>> (lambda:3) ()
    3
    >>> (lambda x: 2*x)(3)
    6

 

lambda예제

    from Tkinter import *

    window = Tk()
    counter = IntVar()
    counter.set(0)

    def click(variable, value) :
        variable.set(variable.get() + value)
       
    frame = Frame(window)
    frame.pack()

    button = Button(frame, text="Up", command=(lambda : click(counter, 1)))
    button.pack()

    button = Button(frame, text="Down", command=(lambda : click(counter, -1)))
    button.pack()

    label = Label(frame, textvariable=counter)
    label.pack()

    window.mainloop()

 

버튼 속성

    from Tkinter import *

    window = Tk()
    button = Button(window, text="hello", bg="white", fg="red", font=("Courier", 14, "bold italic"))
    button.pack()
    window.mainloop()

 

체크박스 예제

    from Tkinter import *

    window = Tk()

    #
    frame = Frame(window)
    frame.pack()

    red = IntVar()
    green = IntVar()
    blue = IntVar()

    for (name, var) in (('R', red), ('G', green), ('B', blue)) :
        check = Checkbutton(frame, text=name, variable=var)
        check.pack(side="left")
       
    def recolor(widget, r, g, b) :
        color = "#"
        for var in (r, g, b) :
            color += 'FF' if var.get() else '00'
        widget.config(bg=color)
       
    label = Label(frame, text="[            ]")
    button = Button(frame, text="update",
                    command=(lambda : recolor(label, red, green, blue)))
    button.pack(side="left")
    label.pack(side="left")

    window.mainloop()

 

파일 저장

    from Tkinter import *
    import tkFileDialog as dialog

    def save(root, text) :
        data = text.get('0.0', END)
        filename =dialog.asksaveasfilename(
            parent=root,
            filetypes=[('Text', '*.txt')],
            title="Save as...")
        writer = open(filename, 'w')
        writer.write(data)
        writer.close()
       
    def quit(root) :
        root.destroy()
       
    window = Tk()
    text = Text(window)
    text.pack()

    menubar = Menu(window)
    filemenu = Menu(menubar)
    filemenu.add_command(label="Save", command=(lambda : save(window, text)))
    filemenu.add_command(label="Quit", command=(lambda : quit(window)))

    menubar.add_cascade(label="File", menu=filemenu)
    window.config(menu=menubar)

    window.mainloop()




 
NULL - NoneType
INTEGER  - int, long
REAL - float
TEXT - unicode, str
BLOB - buffer

 

참조 :

    데이터베이스 Sqlite3 시작 하기
        http://blog.naver.com/rlaqt/10091836150

    sqlite
        http://www.sqlite.org/download.html

    sqlitebrowser
        http://sourceforge.net/projects/sqlitebrowser/

 

    import sqlite3 as dbapi

    #DB접속
    con = dbapi.connect('population.db')
    cur = con.cursor()

    # Table 생성
    cur.execute('CREATE TABLE PopByRegion(Region TEXT, Population INTEGER)')
    # 데이터 삽입
    cur.execute('INSERT INTO PopByRegion VALUES("Central Africa", 330993)')
    # 데이터베이스 변경사항 저장.
    con.commit()

    # Table 조회
    cur.execute('SELECT Region, Population FROM PopByRegion')

    # 출력
    '''
    # 하나 읽음
    print cur.fetchone()
    #모두 읽음
    print cur.fetchall()
    '''
    #테이블 삭제.
    cur.execute('DROP TABLE PopByRegion')

 

--------------------------------------------------------------------------------

# p15.데이터베이스

 
NULL - NoneType
INTEGER  - int, long
REAL - float
TEXT - unicode, str
BLOB - buffer

 

참조 :

    데이터베이스 Sqlite3 시작 하기
        http://blog.naver.com/rlaqt/10091836150

    sqlite
        http://www.sqlite.org/download.html

    sqlitebrowser
        http://sourceforge.net/projects/sqlitebrowser/

 

    import sqlite3 as dbapi

    #DB접속
    con = dbapi.connect('population.db')
    cur = con.cursor()

    # Table 생성
    cur.execute('CREATE TABLE PopByRegion(Region TEXT, Population INTEGER)')
    # 데이터 삽입
    cur.execute('INSERT INTO PopByRegion VALUES("Central Africa", 330993)')
    # 데이터베이스 변경사항 저장.
    con.commit()

    # Table 조회
    cur.execute('SELECT Region, Population FROM PopByRegion')

    # 출력
    '''
    # 하나 읽음
    print cur.fetchone()
    #모두 읽음
    print cur.fetchall()
    '''
    #테이블 삭제.
    cur.execute('DROP TABLE PopByRegion')

 

 

--------------------------------------------------------------------------------