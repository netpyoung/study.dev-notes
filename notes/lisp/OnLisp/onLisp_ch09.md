Variable Capture
=========================================================================

## 9.1 Variable Capture
- 매크로는 Variable Capture에 취약.
- Variable Capture란?
 - 변수 이름을 갖고 있는 것(??? 후에 설명)

### Variable capture 문제점
- macro expansion에서 이름 충돌 유발
- 어떤 심볼이 의도치 않게 다른 변수를 참조 
- 이러한 버그는(Variable Capture) 발견하기 힘들다.

### 9장
- Variable captrue의 종류
- 예측, 회피 방법
- (의도적으로 Variable Capture하는 것은 14장에서 나옴)


### Variable capture의 종류
1. argument capture
 - 매크로 내에서 선언되어 쓰여지는 variable과 매크로 argument와의 이름이 같음
2. free symbol capture
 - 매크로 expression내에서 binding되지 않았지만, 매크로 expression에서 symbol이 쓰여짐

--------------------------------------------------------------------------------

## 9.2 Macro Argument Capture

- 매크로 확장에 의해 생성된 variable의 symbol과 
- 매크로 argument로 넘겨진 symbol간의 이름 충돌.

### ex) for 매크로.
- 인자로 심볼 limit 를 넘기자, 매크로확장 이후 생성된 심볼 limit과 이름이 같아져서 문제 발생.

--------------------------------------------------------------------------------

## 9.3 free symbol capture

= 매크로 expression에 symbol이 있음.
- 근데, 매크로 expression내에서 binding되지 않음.

### Ex) 경고메시지를 취해 global list인 w에 추가하는 매크로 gripe

### Captuable Variable
- 그럼 variable capture를 일으키는 variable은?
- 언제 Capture가 가능(avaiable)한가?


### Capturable variable을 정의하기 앞서 선행 개념.

### Free
= 표현식에서 변수로 사용되지만, 표현식내에 binding되지 않은 symbol은 free이다.

### Ex) Free
```lisp
(let ((x y) (z 10))
  (list w x z))
```

- 표현식 `(list w x z)`에서는 binding이 없으므로` w`, `x`, `z` 모두 free 이다.
- 하지만, 확장하여 (let ~~~) 표현식까지 보면, `x`를 `y`에, `z`를 10에 binding함. `w`와 `y`는 free.

```lisp
(let ((x x)) ; (x <= binding x <= Free)
  x)
```

### Skeleton:
- 전체 macro expansion에서 macro call의 인자로 들어가 있는 부분을 뺀 것이다.

### Ex) Skeleton
```lisp
(defmacro foo (x y) ; 매크로 정의
  `(/ (+ ,x 1) ,y)) 

(foo (- 5 2) 6) ; 호출 / (- 5 2)와 6이 인자

(/ (+ (- 5 2) 1) 6) ; 매크로 확장

(/ (+         1)   ) ; skeleton
```

### Capturable:
1. macro expansion의 skeleton에 free symbol이 있다. ? cap1, gripe매크로

2. 또는 skeleton에 bind되었다.
 > 이미 다른 심볼이 bind된 skeleton에, argument가 bind되거나 evaluate된다.
 - Bind됬는데, skeleton에서 만든 binding범위 안이다. ? cap2, cap3, safe1, for 매크로
 - Bind됬는데, skeleton에서 만든 binding이 안에 있다. ? cap4
 - Evaluate됬는데, skeleton에서 만든 binding이 안에 있다. ? cap5, safe2, safe3, 125p before매크로

### Ex) captuable version
- (A) : Cap1
- (B) : Cap2, Cap3, Cap4, Cap5

### Ex) safe version
- safe1 : let을 나눔
- safe2 : argument를 evaluate시킴
- safe3 : 아에 사용할 var를 제공

### 예측, 회피 방법

- Better Name
- Prior Evaluation
- Gensym
- Package
- namespace

--------------------------------------------------------------------------------

## 9.4 더 좋은 이름으로 캡쳐 피하기

- free symbol capture 의 경우는 주로 전역변수에 구별되는 이름을 지어줘서 해결
gripe 매크로에서 w대신 `*warnings*`

- *package*는 현재 페키지를 나타내는 전역변수

--------------------------------------------------------------------------------

## 9.5 Avoiding Capture by Prior Evaluation

- argument capture의 위험에 있는 argument를 
- 매크로 확장에 생성된 binding 밖에서 평가(evaluation)

- 대개 반복을 위한 매크로의 경우, 새롭게 생성된 binding 내에서 평가되는 경우가 많다. 
- 그러면 이럴 때, Capture를 피하는 방법은?
- closure 안에 몸체를 감싸는 것!

- Ex) for - ((b #'(lambda (,var) ,@body))
> 즉, 뼈대에 의해 어떠한 binding 환경이 생성되기 전에 람다 내에서 평가됨.
만능은 아님 (let이나 do에 의해 2번 바인딩될 수 있는 위험이 존재한다.)

### example
- Let
- Do
 - Loop

### Let binding이 가능한 경우
1. 인자가 정확히 한번만 평가된다.
2. 매크로 skeleton에 정의된 binding scope 내에서는, 어떤 인자도 평가되서는 안된다.

### ex) argument capture ? before macro

--------------------------------------------------------------------------------

## 9.6 Avoding Capture with Gensyms
- Ex) gensym
- Ex) gentemp

--------------------------------------------------------------------------------

## 9.7 Avoding Capture with Package
- Ex) macros package

--------------------------------------------------------------------------------

## 9.8 Capture in Other Name-Spaces(함수 이름 공간)
- Capture는 변수뿐 아니라 함수에서도 문제가 될 수 있다.
- 함수 역시 Local에서 의도치 않게 binding될 수 있다.

= Ex) function namespace
= Ex) Block namespace

### scheme
- 이러한 함수-capture 문제는 single name-space 를 가진 스킴에서 더 심각한 문제다.
- 스킴에 대한 자세한 사항은 최신 레포트를 찾아봐라.

### Function namespace 해결책
* Argument capture
 - Variable에 gensym을 사용한 것처럼 function에도 gensym을 사용해라.
* Free symbol capture
 - 함수는 전역, 지역 구별이 없음. (모두 전역)
 - 가장 좋은 해결책은 다른 패키지 안에 넣어두는 것이다.

### Ex) block name

--------------------------------------------------------------------------------

## 9.9 Why Bother
"버그없이 프로그램을 작성할 수 있는데, 왜 버그를 놔둔체 프로그램을 짜느냐"