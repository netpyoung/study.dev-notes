backup
=========================================================================


```
    우아하고, 표현력이 좋은 코드
     '코드와 데이터의 형태가 같다'는 Lisp의 특성
    쉽고 간편하며 속도가 빠른 자바와의 상호작용
    모든 데이터 형태를 한 인터페이스로 다루게 해주는 시퀀스 라이브러리
    재사용성을 높이고 오류를 줄이는 함수형 프로그래밍
    락(lock)기반이 아닌, 고통 없는 병행 프로그래밍.

 

함수의 인자는 리스트()대신 벡터[]로 표현된다.

 

defn : 함수정의
def : 함수 뿐만 아니라 데이터도 정의.
defref : 레퍼런스가 참조하는 것을 살펴봄.(축약형 @)

#{} 빈 집합(set)을 표시

 

conj (conjoin)
 : 기존 컬렉션에 새 아이템을 추가하는데 사용.
(conj coll item)


ref (reference) : 참조
(ref initial-state)

alter :
(alter r update-fn & args)

dosync : 트랜잭션을 생성.
(dosync & exprs)

require : 클로저 라이브러리 로드
(require quoted-namespace-symbol)

refer : 현재 이름 공간의 모든 이름을 새로운 이름 공간으로 대응
(refer quoted-namespace-symbol)

use : require와 refer가 한꺼번에 이루어짐.
(use quoted-namespace-symbol)
:reload-all 플래그 : 강제로 라이브러리를 다시 로드.


doc : 주석이나 문서를 REPL에서 바로 봄
(doc name)

    (defn hello
      "Writes hello message to *out*. Calls you by username.
      Knows if you have been here before"
      [username]
      (dosync
        (let [past-visitor (@visitors username)]
          (if past-visitor
            (str "Welcom back, " username)
            (do
              (alter visitors conj username)
    (doc hello)


find-doc : 검색어가 되는 문자열 또는 정규식을 넘기면 해당 검색어를 포함하는 모든 문서를 찾아줌
(find-doc s)

' : 인용(quoting)부호.

Lancet : 의존성 기반 빌드 시스템
- 클로저 코드 그대로를 사용.
- 의존성을 따로 표시할 필요가 없다.
- 앤트의 태스크 라이브러리를 호출해서 활용할 수 도 있다.
```



```
자료형
nil - nil
boolean - true /false
character - \a
number - 1,2,3
string - "Hello"
keyword - :tag
symbol - user/foo, java.lang.String
list - (1,2,3)
set - #{:snap :crackle :pop}
map - {:name "Bill"}
vector - [1,2,3]

 

(class CLASS)
(rem REMAINDER)
(quot QUOTIENT)

 

Symbol
함수
연산자(결국에는 함수)
자바 클래스
자바 패키지
자료구조 및 레퍼런스(ref)

(print "hello") ==> hello | nil
//println
(str & args)
(str 1 2 3) ==> "123"
(.toUpperCase "hello") ==> "HELLO"
(apply f args* argseq) - args와 argseq를 풀어해쳐 f에 인자로 넘긴다.
(take-nth 2 ···) : 문자열로부터 첫 문자부터 두칸 단위로 문자를 추출.

boolean & nil
(find-doc #"\?$")
nil 비슷 false != true
클로져에서는 빈 리스트()를 true로 취급

(true? true) ==> true
(false? nil) ==> false
(nil? false) ==> false
(zero? 0) ==> true

    1:40 user=> (def inventors {"Lisp" "McCarthy" "Clojure" "Hickey"})
    #'user/inventors
    1:41 user=> (inventors "Lisp")
    "McCarthy"
    1:43 user=> (inventors "xxx")
    nil

 

    (get a-map key not-found-val?)
    1:44 user=> (get inventors "Lisp" "누구?")
    "McCarthy"
    1:45 user=> (get inventors "xxx" "누구?")
    "누구?"


keyword (콜론, :)
keyword를 평가하면 keyword자체가 반환.

    1:47 user=> (def inventors {:Lisp "McCarthy" :Clojure "Hickey"})
    #'user/inventors
    1:50 user=> (inventors :Clojure)
    "Hickey"
    1:51 user=> (:Clojure inventors)
    "Hickey"

 
구조체 정의

(defstruct name & keys)
(defstruct book :title :author)

    CL-USER> (defstruct book title author)
    STYLE-WARNING: redefining MAKE-BOOK in DEFUN
    BOOK
    CL-USER> (make-book :title "hi" :author "test")
    #S(BOOK :TITLE "hi" :AUTHOR "test")

 
구조체인스턴스 생성

(struct name & vals)
(def no1 (struct book "
(struct-map name & inits) - 속성에 없는 값을 추가 할 수 도 있다.
Reader Macro
;블라블라 - 주석
~ - 평가기호
~@ - 이음 평가기호
@form == (deref form) - deref
^form == (meta form) - meta
`x - 구문 따옴표
'form == (quote form) - 인용
#^metadata form - 메타데이터
#(.toUpperCase %) - 익명함수
#"foo" => a java.util.regex.Pattern - 정규표현식
#'x == (var x) - var-quote

새로운 리더 매크로를 정의할 수 있도록 허용하지 않음.

 
Function

(defn name doc-string? attr-map?
  [params*] body)

(defn name doc-string? attr-map?
  ([params*] body))

anonymouse function

    함수가 너무나 간단하여, 함수에 이름을 붙이는것이 코드를 더 읽게 어렵게 만드는 경우
    다른 함수의 내부에서만 쓰이는 함수라 최상위 레벨에서 이름을 가질 필요가 없을때.
    함수 내부에서 데이터를 이용해 동적으로 함수를 만들어 내는 경우.

(fn [params*] body) ==> #(body)
인자는 %1, %2등으로 표시가능(첫번째 인자인 경우 %사용 가능)

(defn make-greeter [greeting-prefix]
  (fn [username] (str greeting-prefix ", " username)))

1:1 user=> (def hello-greeting (make-greeter "Hello"))
#'user/hello-greeting
1:2 user=> (hello-greeting "world")
"Hello, world"

make-greeter가 반환하는 함수는 greeting-prefix값에 대한 Closure.

 
Var

(var a-symbol)
Binding

(let [bindings*] exprs*)
Destructuring

바인딩이 되는 이름이 들어갈 자리에 대신 벡터나 맵을 넣어 원하는 부분만 바인딩.

(defn greet-author-1 [author]
  (println "Hello, " (:first-name author)))

(defn greet-author-2 [{fname :first-name}]
  (println "Hello, " fname))

(greet-author-1 {:last-name "Vinge" :first-name "Vernor"})
(greet-author-2 {:last-name "Vinge" :first-name "Vernor"})


언더스코어(_) - 이 바인딩에는 신경쓰지 않겠다는 의미를 표현하기 위해 쓰이는 관용적으로 사용되는 심벌
(let [[_ _ z] [1 2 3]]
  z)

:as - 디스트럭처링 표현식 내에서 사용하면 컬렉션 전체를 바인딩 할 수 있다.
(let [[x y :as coords] [1 2 3 4 5 6]]
  (str " x: " x " y: " y " total count:" (count coords)))

 
Name space

(resolve sym)
 : 심벌이 현제 이름 공간에서 가리키는 변수나 클래스 등을 반환한다.
(in-ns name)
 : in-namespace. 이름 공간을 변경하거나 새 이름공간을 만들 수 있다.
(import '(package Class+))
 : 자바클래스를 현재 이름 공간으로 import해온다.
(use 'xxx)
 : 현재 이름 공간으로 가져온다.

(use '[clojure.contrib.math :only (round)])
(round 1.2)


(use :reload 'examples.exploring) - 이름공간을 다시 로딩
(use :reload-all 'examples.exploring) - 관련된 이름공간까지 다시 로딩.

(ns name & reference)
 : 현재 이름공간(*ns*로 참조가능한)을 name에 해당하는 이름 공간으로 바꾼다.

if, do

(defn is-small? [number]
  (if (< number 100)
    "yes"
    (do
      (println "Saw a big number:" number)
      "no")))

(loop [bindings *] exprs*)
(recur exprs*)

(loop [result [] x 5]
  (if (zero? x)
    result
      (recur (conj result x) (dec x))))

Metadata

'객체들의 논리적인 값과는 무관한 데이터'
(with-meta object metadata)

(def stu {:name "Stu" :email "stu@thinkrelevance.com"})
(def serializable-stu (with-meta stu {:serializable true}))
(= stu serializable-stu)
(meta stu)
(meta serializable-stu)
= 은 값의 같음을 판단.
identical? 은 ref의 같음을 판단.(java의 ==)

(assoc map k v & more-kvs)
기존 맵에 키&값을 추가한 맵을 얻을 수 있다.


Reader Metadata

:arglists - 인자 정
:doc - 문서
:file - 소스 파일
:line - 소스 줄 번호
:macro - 매크로 여부
:name - 지역 이름
:ns - 이름 공간
:tag - 예상되는 인자 or 반환 타입


(meta #'str)
==>
{:ns #<Namespace clojure.core>,
 :name str, :file "clojure/core.clj",
 :line 356, :arglists ([] [x] [x & ys]),
 :tag java.lang.String,
 :doc "With no args, returns the empty string. With one arg x, returns\n  x.toString().  (str nil) returns the empty string. With more than\n  one arg, returns the concatenation of the str values of the args."}
```