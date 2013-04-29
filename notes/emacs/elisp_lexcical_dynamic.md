Emacs Lisp에서의 lexcial scoping과 dynamic scoping


원문 : http://yoo2080.wordpress.com/2011/12/31/lexical-scoping-and-dynamic-scoping-in-emacs-lisp/


본 문에서 설명할 것들:

1. `Emacs Lisp`에서의 **lexcial scoping**과 **dynamic scoping**의 차이점
2. **dynamic scoping**에서 주의해야할 점
3. **lexical scoping**과 **lexical closures**로 할 수 있는 것
4. **lexical scoping**코드와 **dynamic scoping**코드를 섞을시 발생하는 일


`Emacs Lisp`는 Emacs 23(포함)이하 버전에서는 항상 **dynamically scope**였습니다. Emacs 24에서 **lexical scoping**의 지원이 추가되었습니다. 많은 이들이 대부분의 경우 **dynamic scoping**보다 **lexical scoping이 낫다는데 동의하기에, 상당히 멋진 일입니다. 왜 그런지에 대해서는 본문에서 곧 확인하실 수 있을 것입니다.

**lexical scoping**으로 블러오고자 하는 el파일이 있다면, 첫줄에 `-*- lexical-binding: t -*-`을 추가하기만 하면 됩니다. 그러면, Emacs 24가 파일을 읽을시, 그 el파일속 코드에 **lexical scoping**을 적용하게 됩니다.
 

예를들어, 현재 init 파일의 첫줄은 다음과 같습니다.

```elisp
;; -*- coding: utf-8 -*-
```

그리고, 다음과 같이 바꾸겠습니다.

```elisp
;; -*- coding: utf-8; lexical-binding: t -*-
```

이리하면, 제 init파일에 있는 코드는 Emacs24에서 **lexically scope**가 될 것입니다. 자세한 것은 [file variables]를 확인해 보시기 바랍니다. 

**lexcial scoping**이 무엇인지 확인해보기 위해, 우선 빈 el파일을 만들어서 (`C-x C-f lexical-scratch.el RET`) 다음 라인을 추가해 봅시다:

```elisp
;; -*- lexical-binding: t -*-
```

저장한 후, 버퍼를 돌려놓습니다 (`M-x revert-buffer`). 이제 저희는 **lexical scoping**에 놓인 `scratch`버퍼처럼 사용할 수 있습니다.

**dynamic scoping**과 **lexical scoping**은 무엇일까요? 간단한 예제 파일을 살펴보도록 하겠습니다.

```elisp
(setq a 17)
(defun my-print-a ()
  (print a))
(setq a 1717)
(let ((a 8))
  (my-print-a))
```

`my-print-a`값 `a`가 정해지지 않았다는 사실을 주목하시기 바랍니다. 이러한 것을 것을 **"free variable"**이라 부릅니다.

 위 코드를 돌려보면 결과가 어떻게 나올까요? `1717`을 출력할까요? 아니면 `8`일까요? **dynamic scoping**이라면 `8`을 출력하고, **lexical scoping**이라면 `1717`을 출력합니다.  **dynamic scoping**에선, `my-print-a`에 있는 `a`는 `my-print-a`가 **호출될때(when my-print-a is called)**  결정됩니다. **lexical scoping**에선 `my-print-a`가 **정의된 장소(where my-print-a is defined)**에 의해 결정됩니다.

**dynamic scoping**에서의 코드는 `8`을 출력하는데, `my-print-a`가 호출될시 `a`를 `8`로 local bind한 let form에 있기 때문입니다. let form이후에 `my-print-a`을 호출한다면, `1717`을 출력할 것입니다..

**lexical scoping**에서의 코드는 `1717`을 출력합니다. 우선, `my-print-a`가 정의된 곳이 let form 밖이므로, `my-print-a`에 있는 `a`는 let form에서 생성된 **local binding**이 아닌 **global binding**된 `a`를 참조하기 때문입니다. 다음으로, `my-print-a`가 호출될시, `8`이된 **local value "a"**완 달리, **global value "a"**는 `1717`이기 때문입니다. 만약 `my-print-a`의 정의를 let form으로 옮긴다면, 출력된 값은 `8`이 될 것입니다. `my-print-a`에 있는 `a`가 let form에서 만들어진 **local binding된 a**를 참조할 것이기 때문입니다.

동일한 코드를 Javascript로 옮겨봤습니다.

```elisp
var a;
a = 17;
function myPrintA() {
  console.log(a);
}
a = 1717;
(function () {
  var a = 8;
  myPrintA();
}());
```

위 코드는 `1717`을 출력합니다. 오늘날 프로그래밍 언어 대부분은 **lexically scoped**입니다.

여러분께서 Emacs 24를 사용하신다면, 다음 코드를 scratch버퍼에서 돌림으로써 `1717`을 출력하는 것을 확인해 볼 수 있습니다.

```elisp
(eval
 '(progn
    (setq a 17)
    (defun my-print-a ()
      (print a))
    (setq a 1717)
    (let ((a 8))
      (my-print-a)))
 t)
```

Emacs 24에서의 `eval`함수는 두번째 인자(optional)를 받습니다. 이게 `t`라면, **lexical scoping**으로 평가합니다. `(progn ...)`앞에 '를 붙이는 것을 잊지 마시기 바랍니다.

**Lexical scoping**은 **lecical closures**를 가능케 합니다. 그렇다면 **lexcial closure**는 무엇일까요? 다음 코드를 살펴보도록 하겠습니다.

```elisp
(setq a 0)
(let ((a 17))
  (defun my-print-a ()
    (print a))
  (setq a 1717))
(let ((a 8))
  (my-print-a))
```

**lexical scoping**에서, 위 코드는 `1717`을 출력합니다. 다음은 `Alice`가 생각한 것입니다:

> 처음에는 이상하지 않았는데, 다시보니 뭔가 좀 이상한데. 먼저, "**lexical scoping** 이므로, `my-print-a`에 있는 `a`가 첫번째 `let` form에의해 만들어진 **local binding** 을 참조해서 `1717`이 출력됬다" 라고 생각했지. 다시 살펴보니, `my-print-a`가 호출될시 첫번째 `let` form에 의해 만들어진 **local binding**이 만기될(expired)거라는 거야! 날짜 지난(expired) 우유를 먹을 순 없잖아! "미안, 나는 더이상 존재하지 않아" 대신 왜 `1717`이 출력된 거지? 에러는 커녕 **lexcial scope**로 돌아가는 이유가 뭐지?

첫번째 let form을 빠져나간 이후에도 첫번째 `a`에 **local biding**은 살아남아, `my-print-a`가 접근하기만을 기다립니다. `my-print-a`를 제외하고 첫번째 `a`에 `local biding`에 대한 모든 접근은 만료됩니다. 이는 Emacs는 뒤에서 여러가지 일들을 관리하며, **lexical scoping**은 **"기존것"**보다 더 많은 일을 할 수 있게되었다는 것을 의미합니다.

그러면, **lexcial closure**란 무엇일까요? 이는 "**lexical scoping**이 보다 더 많은 일을 할 수 있다"라는 것이 화면 뒤에서 어떻게 구현되는지와 관련있습니다. `(symbol-function 'my-print-a)`를 평가하면 볼 수 있는 것처럼, `my-print-a`의 함수 상자([function cell])은 a에 대한 만료된 binding에 대한 link를 담고 있습니다. 함수 정의와 함수 생성시 scope에 대한 link의 조합(combination)을 **lexical closure** 라 부릅니다. 혹은, 만료된 binding에 접근하는 **lexically scoped** 된 함수를 **lexical closure** 라 부를수도 있습니다. **lexical closures** 를 보통 단순하게 **closures** 라 불르기도 합니다. **lexically scoped** 언어들이 모두 **closures** 를 지원하는건 아닙니다.


**lexical scoping** 에서, 함수에 있는 `a`가 참조하는 것이 무엇인지 확인하기 위해선, 함수 본체 주변과 연관된 binding을 살펴보면됩니다. **lexical scoping** 은 코드에서 변수가 쓰여진 주변을 살펴보면 되기에 기억하기 쉬우며, 관계된 binding이 언제 만료되는지에 대해 걱정할 필요가 없습니다.

자, JavaScript로 된 코드를 살펴봅시다:

```elisp
var a, myPrintA;
a = 0;
(function () {
  // local variable a
  var a = 17;
  myPrintA = function () {
    console.log(a);
  };
  a = 1717;
}());
(function () {
  // local variable a
  var a = 8;
  myPrintA();
}());
```

Javascript는 **lexical closures** 를 지원하기에 `1717`을 출력할 것입니다:

Emacs 24에서, **lexically scoped** (interpreted) 함수들은 `(closure ENV ARGS BODY...)`과 같은 함수 값 형태로 표현되는 반면, **dynamically scoped** 함수들은 익명함수(anonymous function)를 작성할때 사용한 것과 동일한 형태인 `(lambda ARGS BODY...)`와 같은 형태로 표현됩니다.

다음 코드는 **dynamic scoping**에서 `(lambda (x y) (+ x y))`을 두번 출력하는 코드입니다.

```elisp
(defun my-sum (x y)
  (+ x y))
;; print the contents of function cell of my-sum
(print (symbol-function 'my-sum))
;; print an anonymous function
(print (lambda (x y) (+ x y)))
```

 **lexical scoping** 이라면 이 코드는 `(closure (t) (x y) (+ x y))`을 두번 출력할 것입니다. **dynamic scoping**에선 `(lambda ...)`는 그 자체로 평가되지만, **lexical scoping** 에선 `(closure ...)`로 평가됩니다 

이제 좀더 파고들어 봅시다. **lexcial scoping** 에서, `함수 A`가 `함수 B`를 정의하고, `함수 B`가 `함수 C`가 정의하고, 그 `함수 C`가 `a`를 출력하면, `a`는 우선 `C`를 찾아보고 없으면, `B`를 등등을 찾아보게 됩니다.

 **dynamic scoping**에서 `my-func1`란 함수를 가졌다고 가정해봅시다. 이 함수는 `my-func2`라는 함수를 호출하고, `my-func2`는 `my-func3`을 `my-func3`은 `a`를 출력합니다. 그리고 `my-func2`는 `my-func3`을 호출할때 내부적으로 `a`를 `2`로 설정한다고 해봅시다. **dynamic scoping** 에서 `my-func1`를 호출하면 어떤일이 발생할까요? 이는 `2`를 출력합니다. `a`가 `1`인 환경에서 `my-func1`를 호출하면 어떨까요? 여전히 `1`대신 `2`를 출력합니다. 다음 코드를 돌려봅시다.

```elisp
(defun my-func1 ()
  (my-func2))
(defun my-func2 ()
  (let ((a 2))
    (my-func3)))
(defun my-func3 ()
  (print a))
(let ((a 1))
  (my-func1))
```

`my-func1`가 호출되고 `my-func2`가 호출되고 깊게 들어가는 동안, `a`를 `1`로 한 **local binding** 이 살아있습니다. `my-func2`는 `a`를 `1`로하여 이전 binding을 가리도록 또 다른 **local binding** 을 만들었습니다. 이 시점에서, 저희가 X라는 정소에 있다면 `(let ((a 1)) (let ((a 2)) X ))`에 있는 것과 같습니다. 이 지점에서 `my-func3`이 호출되어 `2`가 출력되게 됩니다.

**dynamic scoping** 에서 골치아프지만 여러분이 꼭 알아야만 할 것이 있습니다. 함수가 함수를 인자로 취하도록 만들길 원한다고 가정해 봅시다. 간단한 예제 함수가 준비되어있습니다.

```elisp
(defun my-call (f n)
  (funcall f n))

(my-call #'1+ 5) ; => 6
(my-call #'oddp 5) ; => t

(dolist (i (list 1 2 3))
  (print
   (my-call (lambda (x) (* i x)) 5))) ; prints 5 10 15
```

지금까진 놀랄만한게 없습니다. 다음으로 넘어가 보도록 하겠습니다.

```elisp
(dolist (n (list 1 2 3))
  (print
   (my-call (lambda (x) (* n x)) 5))) ; prints 25 25 25 in dynamic scoping.
```

무슨일이 발생한 것일까요? 왜 이러한 행동을 할까요? 문제는 `(lambda (x) (* n x))`에서 사용된 `n`이 `my-call`의 인자의 이름중 하나와 같기 때문입니다. 인자 `n`이 `5`로 bind된 `my-call`내부에서, 익명함수 `(lambda (x) (* n x))`이 호출됩니다. **lexical scoping** 에선, 위 코드는 기대한대로 `5 10 15`을 출력합니다.

 * __발견한것 1__ - **dynamically scoped** 함수를 다른 함수의 인자로 넘겨주는 것은, 나중에 발목을 잡을 수 있다!

하나 더 발견해봅시다. `f`와 `g` 함수를 취해, `g`를 먼저 적용하고 `f`를 적용시킨 것과 동일한 합성함수를 반환하는 함수를 정의해 봅시다.

```elisp
;; in dynamic scoping
(defun my-compose (f g)
  (lambda (x)
    (funcall f (funcall g x))))

(funcall
 (my-compose (lambda (n) (+ n 3)) (lambda (n) (+ n 20)))
 100) ; results in error, Lisp error: (void-variable f)
```

에러는 `f`가 정의되지 않았다고 말해주고 있습니다. 왜 그럴까요? `my-compose`에서 함수가 합성되었지만, `f`와 `g`가 bind되지 않은 곳에서 호출되었습니다. 다시돌아와서, **lexical scoping** 에선, 위 코드는 기대한 대로 동작합니다.

 * __발견한것 2__ - **dynamically scoped** 함수에서 반환된 함수를 이용하는 것은, 나중에 발목을 잡을 수 있다.

Emacs 24에서, `defvar`는 special variables라 불리는 것을 생성합니다. Special variables는, **lexically scoped** 함수 안이라 할지라도 dynamically하게 bind되는, **dynamically scoped** 변수(variables)입니다. `case-fold-search`는 special variable의 한 예입니다. 대소문자를 구분하는 함수 `search-forward`는 special variable `case-fold-search`의 값에 영향을 받습니다. `(search-forward "hello")`는 `case-fold-search`가 `t`일때 `HELLO`를 찾지만, `case-fold-search`가 `nil`일때는 그렇지 않습니다. **lexically scoped el** 파일에서 대소문자를 결정하기 위해 `case-fold-search`를 이용하되 추가 옵션을 지닌, `my-search-forward` 함수를 정의한다고 가정해봅시다. `case-fold-search`가 special variable이기에, 다음을 호출하면

```elisp
(let ((case-fold-search t))
  (my-search-forward "hello"))
```

대소문자를 구분하지 않고 검색한다는 것을 확신할 수 있을 것입니다.

variable이 special인지 확인하기 위해, 함수 `special-variable-p`를 이용할 수 있습니다

```elisp
(special-variable-p 'print-level) ; => t
(special-variable-p 'print-length) ; => t
(special-variable-p 'debug-on-error) ; => t
(special-variable-p 'debug-on-quit) ; => t
```

Special variables는 유용할 수 있습니다. [reddit의 gsg가 말할길][reddit's emacs_lisp_now_lexically_scoped]:

> Dynamic scope는 명시적으로 인자를 넘기지 않고도 코드를 제한할 수 있습니다. 이는 보통 좋지 않으나, 몇몇 코드는 이로부터 덕을 봅니다.

[kragensitaker가 말하길][reddit's emacs_lisp_now_lexically_scoped]:

> Thread-local variables, exception handlers, current locale, current clipping region, image transform들이 dynamically하게 scope하기에 좋은 예입니다 .

그럼 이제, **lexical closures** 로 할 수 있는 일을 살펴봅시다.

다음 코드를 **lexical scoping** 에서 돌려봅시다.

```elisp
(let (c)
  (defun my-get-c ()
    c)
  (defun my-set-c (new-c)
    (setq c new-c))
  (defun my-add-to-c (x)
    (setq c (+ x c))))
```

세개의 함수를 이용하는 다음 코드를 돌려봅시다. **lexical scoping** 에서 돌린거나 그렇지 않은 곳에서 돌린거나 결과는 같은데, **dynamically scoped** 환경에서 호출된 **lexically scoped** 함수들은 여전히 **lexically scoped** 함수이기 때문입니다.

```elisp
(my-set-c 10)
(my-add-to-c 5)
(print (my-get-c)) ; prints 15.
(my-add-to-c 1)
(print (my-get-c)) ; prints 16
(let ((c 0))
  (print c) ; prints 0
  (print (my-get-c))) ; prints 16.
```

`my-get-c`, `my-set-c`, `my-add-to-c`가 공유하는 `c`에 대한 binding은, private 변수처럼 행동하며 `(let ((c 0)) ...)`처럼 `c`에 대한 다른 binding에 대해 독립적입니다. 이는 세개의 `defun` form을 감싸는 `let `form에서 만들어진 `c`에 대한 binding이, 이 세개의 함수의 접근을 제외하고는 다 만료시키기 때문입니다.

이제 **lexical closure** 의 이용하여 C에서의 static 변수가 하는 일을 해봅시다.

```elisp
(require 'cl) ; for incf
(eval
 '(let ((i 0))
    (defun my-counter ()
      (prog1
          i
        (incf i))))
 t)
(my-counter) ; => 0
(my-counter) ; => 1
(my-counter) ; => 2
(let ((i 10))
  (my-counter)) ; => 3
(my-counter) ; => 4
```

위 코드가 어떻게 동작하는지 어려워하시는 분을 위해, 여기 자세한 예제코드가 있습니다.

```elisp
(eval
 '(let ((i1 0))
    (defun my-test ()
      (let ((i2 0))
        (prog1
            (list i1 i2)
          (incf i1)
          (incf i2)))))
 t)
(my-test) ; => (0 0)
(my-test) ; => (1 0)
(my-test) ; => (2 0)
```

`my-test`를 정의하고 3번 호출하였습니다. `my-test`속 (`let ((i2 0)) ..)` form은 `my-test`가 호출될때마다 실행되어 3번 호출되었습니다. 반면, `(let ((i1 0)) ... )` form은 `my-test`가 정의될때 단 한번만 실행됩니다. 도움되셨길 바랍니다.

이제 **lexical closure** 인 함수를 반환하는 함수를 테스트 해봅시다.

```elisp
(eval
 '(defun my-get-counter (start step)
    (let ((count start))
      (lambda ()
        (prog1
            count
          (setq count (+ count step)))))
    )
 t)

(setq my-get-even-numbers (my-get-counter 0 2)
      my-get-odd-numbers (my-get-counter 1 2))

(funcall my-get-even-numbers) ; => 0
(funcall my-get-even-numbers) ; => 2
(funcall my-get-even-numbers) ; => 4

(funcall my-get-odd-numbers) ; => 1
(funcall my-get-odd-numbers) ; => 3
(funcall my-get-odd-numbers) ; => 5

(funcall my-get-even-numbers) ; => 6
(funcall my-get-even-numbers) ; => 8

(setq my-get-even-numbers-2 (my-get-counter 0 2))
(funcall my-get-even-numbers-2) ; => 0
(funcall my-get-even-numbers-2) ; => 2
(funcall my-get-even-numbers-2) ; => 4

(funcall my-get-even-numbers) ; => 10
(funcall my-get-even-numbers) ; => 12
(funcall my-get-even-numbers) ; => 14
```

여러분들은 아마 `my-get-even-numbers`, `my-get-odd-numbers`, `my-get-even-numbers-2`가 `하나의 count`를 공유하는 대신 왜 `자기만의 count`를 가지고 있는지 혼란스러워 하실지도 모르겠습니다. 이들은 실제로 `자신만의 count`를 가지고 있습니다. 혼란스러우신 여러분을 위해, 다음 코드를 **lexical scoping** 에서 돌린다면 어떻게될까요?

```elisp
(let ((count 0))
  (setq my-count
        (lambda ()
          (prog1
              count
            (setq count (1+ count))))))
(let ((count 0))
  (setq my-count-2
        (lambda ()
          (prog1
              count
            (setq count (1+ count))))))
```

`my-count`와 `my-count-2`는 `자기만의 count`를 지니고있습니다. 각 `let` form은 각각 `(setq .. (lambda ...))` forms을 감싸고 있습니다. 이는 실제 `my-get-counter`가 하는 일과 같습니다. `(my-get-counter ..)`이 실행될 때마다, `(let ((count ..)) (lambda ..))`이 다시 실행되며, `count`에 대한 분리된 새로운 binding을 만들어내 새로운 함수만이 접근할 수 있도록 만들어 줍니다. `(my-get-counter ..)`을 3번 실행시키면, `(let ((count ..)) (lambda ..))`은 3번 실행되어, `count`에 대한 3개의 binding과 3개의 반환 함수를 만들어냅니다.

`Alice`는 지금 **lexically scope환경인 el** 파일에서 새로운 Emacs Lisp 코드를 작성하고있습니다. `Alice`가 새로운 작성한 **lexically scoped** 코드와 다른이가 작성한 **dynamically scoped** 코드를 섞는(interact)다면, 어떤일이 벌어질까요? 멈추는건 아닐까요?

간단한 예제로 해봅시다.

```elisp
(eval
 '(defun my-bah ())
 t)

(eval
 '(fset 'my-bah-2 (symbol-function 'my-bah))
 nil)
```

 `my-bah`함수는 **lexically scoped** 환경에서 정의되었습니다. 따라서 이는 **lexically scoped** 함수가 되어야만 합니다. 그러면 `my-bah-2`는 어떨가요?

> Alice : "`my-bah-2`는 **dynamically scoped** 환경에서 정의되었어. 따라서 이는 **dynamically scoped** 함수가 되어야만 해."

> Bob   : "`my-bah-2`의 함수 공간은 `my-bah`의 함수 공간(cell)을 복사했어. `my-bah`의 함수 공간은 **lexically scoped** 함수를 포함하고 있지. `my-bah-2`의 함수 공간에 있는 것은 **lexically scoped** 함수와 동일해"

> Alice : "잠깐. 이 함수들은 아무것도 하지 않잖아. 먼가 좀 해보도록 만들어보자. 반환값으로 **lexically scoped**인지 알려주도록 만들어보자."

 다음 코드는 **lexically scoped**환경에선 `t`를, 그렇지 않으면 `nil`을 반환합니다. [여기서 lexical-binding 값을 확인하는 것은 좋지 않은 생각입니다][yoo2080's how-to-check-dynamically].

```elisp
(let ((x nil)
      (f (let ((x t)) (lambda () x))))
  (funcall f))
```

Alice는 the my-bah & my-bah-2 코드를 수정했습니다.

```elisp
(eval
 '(defun my-bah ()
    (let ((x nil)
          (f (let ((x t)) (lambda () x))))
      (funcall f)))
 t)

(eval
 '(fset 'my-bah-2 (symbol-function 'my-bah))
 nil)
```

`my-bah-2`가 **lexically scoped** 함수인지 확인해 봅시다.

```elisp
(my-bah) ; => t
(my-bah-2) ; => t
```

그럼, `Bob`이 생각한게 맞은건가요? 이와 유사한, defun을 사용하지 않은 코드로 테스트해봅시다.

```elisp
(eval
 '(setq my-nah
        (lambda ()
          (let ((x nil)
                (f (let ((x t)) (lambda () x))))
            (funcall f))))
 t)

(eval
 '(setq my-nah-2 my-nah)
 nil)

(funcall my-nah) ; => t
(funcall my-nah-2) ; => t
```

 `(setq abc (+ 1 1))`를 돌리면, 덧셈을 기술하는 표현식 `(+ 1 1)`이 우선 평가되고, 평가결과 숫자 `2`는 변수 `abc`에 할당됩니다. 이처럼, `(setq my-nah (lambda ...))`을 돌리면, 익명함수를 기술하는 표현식 `(lambda ...`)이 먼저 평가됩니다. **lexical scoping** 에선, 평가결과는 **lexically scoped** 함수 값인 `(closure ....)`처럼 보입니다. 그리고 그 결과 `(closure ....)`가 변수 `my-nah`에 할당됩니다.

`(setq abc (+ 1 1))`을 돌린후 (`setq abc-2 abc)`을 돌리면, 표현식 `(+ 1 1)`에 대한 평가는 단 한번만 일어납니다. `(setq abc-2 abc)`는 `(+ 1 1)`를 또다시 평가하지 않고, 단지 이미 계산된 결과 `2`를 `abc-2`에 저장합니다. `(setq abc-2 abc)`에서 평가한 것은 symbol `abc` 자체이며, symbol `abc`를 평가하면 `2`입니다. 이처럼, `my-nah` & `my-nah-2` 예제코드에서 `(lambda ...)` 표현식의 평가는 단 한번만 일어나며, `(setq my-nah-2 my-nah)`를 돌릴때 결과 `(closure ...)`는 평가되지 않으며 단순히 `my-nah-2`에 저장됩니다. `(setq my-nah-2 my-nah)`가 **dynamically scoped** 환경에서 돌아갈 지라도, anonymous function 표현식에 대한 평가가 **lexically scoped** 환경에서 발생하기에, 변수 `my-nah-2`는 결국 **lexically scoped** 함수를 지니게 됩니다.

**lexically scoped** 함수가 만들어져 **dynamically scoped** 환경에 들어가게 되도, 함수는 여전히 **lexically scoped** 함수로 남아있습니다.

`defun my-bah` 예도 유사합니다. symbol `my-bah`의 함수 공간(cell)은 **lexically scoped** 함수를 담고있습니다. 다음 테스트를 살펴보겠습니다.

```elisp
(print my-nah-2)
(print (symbol-function 'my-bah-2))
```

**lexically scoped el** 파일에서 `defun`을 가지고 있고, 내부에서 free variable에 해당하는 것을 확인하려면, **dynamically scoped** 파일에 있는 또 다른 이름의 함수대신, el 파일에서 그 주변을 살펴보기만 하면 됩니다.

이제 `my-nah-2` & `my-bah-2` 예제를 이해했을 것입니다. `my-get-counter`를 다시 살펴보도록 하겠습니다. `(defun my-get-counter ...)`가 **lexically scoped el** 파일에 있는 동안, `my-get-counter`가 반환하는 함수들은 **lexically scoped** 입니다. 확인해봅시다.

```elisp
(eval
 '(progn
    (setq my-get-even-numbers (my-get-counter 0 2))
    (print (funcall my-get-even-numbers))
    (print (funcall my-get-even-numbers))
    (print (funcall my-get-even-numbers)))
 nil)
```

이는 `0 2 4`를 출력합니다. 여기서 `Alice`가 다시 "`my-get-even-numbers` 함수는 **dynamically scoped** 환경에서 정의됬어. 그런대 왜 **lexically scoped** 함수처럼 행동하는 거야?" 라고 의문을 표할지도 모릅니다. 변수 `my-get-even-numbers`는 `my-nah-2`와 마찬가지로 **lexically scoped** 함수를 지니고 있습니다. 이해가 어려우신 분들을 위해, 우선 `my-get-sum`을 살펴보도록 하겠습니다.

```elisp
(defun my-get-sum (x y)
  (+ x y))
```

`my-get-sum`에 있는 덧셈을 기술하는 `(+ x y)`는 표현식이며, `my-get-sum` 은 `(+ x y)`의 평가결과를 반환하지, 표현식 `(+ x y)`자체를 반환하지는 않습니다. `(my-get-sum 1 2)`을 돌려본다면, 표현식 `(+ x y)`그대로를 반환하지 않고, `my-get-sum`안에서 `(+ x y)`가 평가된 `3`을 반환합니다

`my-get-counter`로 돌아가봅시다. `my-get-counter`의 `(lambda ...)`은 익명 함수를 나타내는 표현식입니다. 이 표현식은 `my-get-counter` 내부에서 한번만 평가됩니다. 평가결과는 변수 `my-get-even-numbers`에 저장된 것을 반환받은 `(closure ...)`입니다. `(lambda ...)`의 평가는 단 한번만 이루어지며, 이는 **lexically scoped 함수** `my-get-counter`에서 이루어집니다. **lexically scoped** 함수에서의 `lambda` form의 평가는 항상 `(closure ...)`가 됩니다. 이것이 바로 어떻게 `my-get-even-numbers`가 **lexically scoped** 함수를 지닐수 있는지에 대한 이유입니다.

그건 그렇고, 어째서인지 무심코 `lambda` form의 평가를 막아버린다면, **lexically scoped** 함수는 **dynamically scoped** 함수를 생성하고 반환할 수 있습니다.

```elisp
(eval
 '(defun my-return-dynamically-scoped-function ()
    (list 'lambda '() 'a)
    )
 t)

(eval
 '(defun my-return-dynamically-scoped-function ()
    '(lambda () a) ; quoted lambda
    )
 t)
```

왜 이렇게 했는지, 의도는 잘 모르겠지만, 어쨋건 가능합니다.

이제 `my-call` 예를 다시 살펴보도록 하겠습니다.

```elisp
(eval
 '(defun my-call (f n)
    (funcall f n))
 nil)

(eval
 '(dolist (n (list 1 2 3))
    (print
     (my-call (lambda (x) (* n x)) 5)))
 t)
```

이는 `5 10 15`를 출력합니다. `Alice`가 다시 말하길 "함수 `f`는 **dynamically scoped**에서 정의되었잖아. 그런데 왜 **lexically scoped** 함수처럼 행동하는 거야?" `my-call`에 들어온 익명함수들은 **lexically scoped** 환경에서 정의되었기에, `my-call`에 들어온 후라도 **lexically scoped** 처럼 상태를 유지합니다. 그래도 이해가 어려우신 분들을 위해서. `(lambda ...)`가 평가되고 그 결과가 `my-call`에 들어갔습니다. `my-call`은 그 결과를 **지역변수(local variable)** `f`에 저장했습니다. 따라서 `f`는 **lexically scoped** 함수를 참조하게 됩니다.

`mapcar*` 함수는 함수를 인자로 받고, **dynamically scoped el** 파일에서 정의되었다는 점에서 `my-call`와 비슷합니다. 다음 **dynamic scoping** 예제는 [StackOverflow 답변]에서 나온 것입니다.

```elisp
(let ((cl-x 10))
  (mapcar* (lambda (elt) (* cl-x elt)) '(1 2 3)))
```

 name `cl-x`는 `mapcar*`의 정의에서 argument name으로 사용됩니다. 따라서 **dynamically scoped** 환경에서 이 코드를 돌리면 깜짝 놀라게 될 것입니다(발견한것 1). 하지만 **lexically scoped** 환경에서 코드를 돌리면, 정상적으로 동작하는데 `mapcar*`에 들어온 **lexically scoped** 익명 함수는 여전히 **lexically scoped** 함수를 유지하기 때문입니다.

이 예제로 보아, **lexically scoped** 코드가 잘 어울리는것 같습니다. 이제 **lexical scoping** 을 즐기러 나가볼 시간입니다!


 [file variables]: http://www.gnu.org/software/emacs/manual/html_node/emacs/File-Variables.html
 [function cell]: http://www.gnu.org/software/emacs/manual/html_node/elisp/Function-Cells.html
 [yoo2080's how-to-check-dynamically]: http://yoo2080.wordpress.com/2011/12/30/how-to-check-dynamically-if-lexical-scoping-is-active-in-emacs-lisp/
 [reddit's emacs_lisp_now_lexically_scoped]: http://www.reddit.com/r/programming/comments/ggmc2/emacs_lisp_now_lexically_scoped_oh_very_funny_no/c1nfngv
 [StackOverflow 답변]: http://stackoverflow.com/a/3791877/37664