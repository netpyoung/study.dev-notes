# 18. Destructurning
Destructuring is a generalization of assignment.


`Destructuring` :일반화시킨 대입작업.

--------------------------------------------------------------------------------
## 목차

### 18.1 Destructuring on Lists
- destructuring 소개
- list를 destructruring하는 법.

### 18.2 Other Structures
- dbind(destructuing-bind)의 구현에 대해 설명
- 문자열, 벡터, 배열, 구조체를 destructuring하는 법.

### 18.3 Reference
- 인스턴스를 destructuring하는 법.

### 18.4 Matching
- 패턴매칭에 대해서
- if-match구현(1, 2) 및 활용에 대해 설명.

--------------------------------------------------------------------------------

## 18.1 Destructuring on Lists

* 대입(assign) : seq, setf

* 접근(access) & 대입(assign) : destructuring-bind


### Destructuring-bind
CLTL2에서, Common Lisp는 destructurning-bind란 새로운 매크로를 추가했다.


### Ex) destrucing-bind

    CLTL1에서는
```lisp
(let ((x (first lst))
      (y (second lst))
      (z (third lst)))
  (list x y z))
```

    CLTL2에 들어서는
```lisp
(destructuring-bind (x y z) lst
  (list x y z))
```

코드가 짧아질 뿐만아니라, 보다 명확해졌다.

### Destructuring
 
    Destructuring작업은 CLTL1 Common Lisp에서도 존재했었다.
    
    지금은 따로 분리가 됬지만, 사실 destructuring-bind은 매크로 매개변수 리스트를 분리시키는데 사용했던 코드이다.

--------------------------------------------------------------------------------
## 18.2 Other Structures
 리스트를 destructuring하는데에는 제한을 걸 필요가 없다.

그렇지만, 복잡한 객체에는 제한을 두어야 한다.

```lisp
(dbind (a (b . c) &rest d) '(1 "fribble" 2 3 4)
   (list a b c d))
;; (1 #\f "ribble" (2 3 4))
```

### 문자열과 백터

- read-macro `#\` - 문자를 표현하기 위해 사용됨

```repl
CL-USER> (coerce "123" 'list)
(#\1 #\2 #\3)
```

- read-macro `#(` - 벡터를 표현하기 위해 사용됨

```repl
CL-USER> (vector 1 2 3)
#(1 2 3)
CL-USER> (make-array 3 :initial-contents '(1 2 3))
#(1 2 3)
CL-USER> (make-array '(2 3) :initial-contents '((1 2 3) (4 5 6)))
#2A((1 2 3) (4 5 6))
```
 - `*print-array*`

### Dbind
- 지금까지 봐왔던 매크로들과 비교하자면, dbind는 규모가 큰 편이지만, Lisp 프로그래밍에 관한 general lesson을 담고있기에, 단순히 어떻게 동작하는지 이해하는데 그치는게 아니라, 이 매크로의 구현에 대해 공부할 가치가 있다.

### Ex) Dbind
```lisp
(defmacro dbind (pat seq &body body)
   (let ((gseq (gensym)))
     `(let ((,gseq ,seq))
        ,(dbind-ex (destruc pat gseq #'atom) body))))
```

  dbind는 destructuring-bind처럼 런타임시 주어진 시퀀스가 예상했던 원소를 얻지 못한다면, 에러를 발생한다
  
### Ex) with-
- with-matrix : 배열의 순서에 기반
- with-array  : 배열의 좌표에 기반
- with-struct : 구조체의 prefix와 필드 name에 기반

--------------------------------------------------------------------------------

## 18.3 Reference
 `let`대신 `symbol-macrolet`으로 확장되게 만듬으로써, call-by-name 버전의 destructuring 매크로를 만들 수 있다.
 
## ex) with-places
```lisp
(defmacro with-places (pat seq &body body)
   (let ((gseq (gensym)))
     `(let ((,gseq ,seq))
        ,(wplac-ex (destruc pat gseq #'atom) body))))
```

 wplac-ex 내부는 앞선 dbind-ex와 유사하며, let이 symbol-macrolet으로 바뀌었다.

-------------------------------------------------------------------------------
## 18.4 Matching
- destructuring이 일반화된 대입작업이라면, 패턴매칭은 일반화된 destructuring이다.
- `패턴매칭`이란 용어는 여러 의미를 지니고 있지만, 여기선, 변수를 포함하고 있는 두 자료구조를 비교하여, 두개가 동일하면 변수에 값을 대입하는 것을 의미하기로 한다.

### 단일화(Unification)
- 패턴매칭과 단일화는 다르다.
- 패턴매칭은 단방향, 단일화는 양방향

```ex
X = Y
X = 5
```
> 패턴매칭에선 첫번째 라인부터 에러(Y가 bind되지 않았기에) – Erlang
단일화에선 Y는 5의 값을 갖게됨. – Prolog
>

- http://stackoverflow.com/questions/4442314/differences-between-pattern-matching-and-unification

- Unification은 pattern matching을 제네럴하게….

### Match
- 인자로 받은것을 원소끼리 비교하여 변수에 값을 대입 할 수 있도록 만들어 줌(bindings).

```lisp
(match '(p ?x b ?y a) '(p ?y b c a))
```
> ((?Y . C) (?X . ?Y)) ;; 매치시 cons로 묶어줌
>
> T ;; 매치했는지 알려주는 flag

### Ex)match
```lisp
(defun match (x y &optional binds)
  (acond2
   ((or (eql x y) (eql x '_) (eql y '_)) (values binds t))
   ((binding x binds) (match it y binds))
   ((binding y binds) (match x it binds))
   ((varsym? x)       (values (cons (cons x y) binds) t))
   ((varsym? y)       (values (cons (cons y x) binds) t))
   ((and (consp x) (consp y) (match (car x) (car y) binds))
    (match (cdr x) (cdr y) it))
   (t                 (values nil nil))))
```

### if-match ( 1 )
```lisp
(defun abab (seq)
	(if-match (?x ?y ?x ?y) seq
		(values ?x ?y)
		nil))
```

앞선 match와 binding을 이용하여 if-match를 구현.

### Ex) if-match ( 1 )
```lisp
(defmacro if-match (pat seq then &optional else)
  `(aif2 (match ',pat ,seq)
	 (let ,(mapcar 
			#'(lambda (v) `(,v (binding ',v it)))
		          (vars-in then #'atom))
	   ,then)
	 ,else))
```

### If-match ( 2 ).1
- 앞선 if-match(1)은 짧지만, 런타임시 너무 많은 일을 함(비효율적임)
- 이번에 소개할 if-match(2)는 길지만, 컴파일시 많은 일을 함.
- If-match의 첫번째 인자로 들어오는 것을 “일반변수”가 아닌 “패턴변수”로 제한한다면, 컴파일시 Match에 관여하는변수를 알 수 있을 것이다.

### If-match ( 2 ).2
- `패턴변수`는 Quote되는게 아니라, 평가된다.
- `일반변수`와 `quote된 표현식`을 `패턴변수`로 이용할 수 있다.

### Ex) if-match ( 2 )

```lisp
(defmacro if-match2 (pat seq then &optional else)
  `(let ,(mapcar #'(lambda (v) `(,v ',(gensym)))
		      (vars-in pat #'simple?))
     (pat-match ,pat ,seq ,then ,else)))
```

```lisp
(defmacro pat-match (pat seq then else)
  (if (simple? pat)
      (match1 …..               ---- A
      (with-gensym ……       ---- B
```

* A : 뒤에 계속
* B : gensym에 의해 “패턴변수”는 bind되지 않았기에,  binding하는 코드를 생성함

### Ex) match1
```lisp
(defun match1 (refs then else)
   (dbind ((pat expr) . rest) refs
     (cond ((gensym? pat) …. -- A             ((var? pat) …..       -- B
```

* A : length-test
* B : binding작업

### 394p - 244
?x를 재활용하고자 한다면?
```lisp
(if-match (?x . ?rest1) lst1
	(if-match (?x . ?rest2) lst2
		?x))
```

추후에 나올 19장 with-answer과, 24장의  with-inference로 해결

--------------------------------------------------------------------------------
### 마치며

- 간단한? Destructuring에서 시작하여, 멋드러진 match까지 살펴봄.
- 나머지 장에서는 이러한 철학에 기반을 둔 프로그램에 대해 설명함.