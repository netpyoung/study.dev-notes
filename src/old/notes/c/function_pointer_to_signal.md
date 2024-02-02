# 함수포인터 - signal을 향해

## test01.c

``` c
#include <stdio.h>

void hellow(int a) {
    printf("hellow world\n%d\n", a);
}

int hellow2(void) {
    printf("hellow 2\n");
    return 2;
}

void hellow3(int a, int b) {
    printf("a+b = %d\n", a+b);
}

double hellow4(double a, int b) {
    return -1;
}

void hellow5(void) {
    printf("hi\n");
}

int main() {
    void (* p)(int) = hellow;
    p(1);

    int (* p2)(void) = hellow2;
    int i = p2();
    printf("%d\n", i);

    void (* p3) (int a , int b) = hellow3;
    p3(1 ,2 );

    double (* p4) (double a, int b) = hellow4;
    i = p4(1,2);
    printf("%d\n", i);

    void (* p5)() = hellow5;
    p5();

    return 0;
}
```

```sh
[pyoung@hwarang temp]$ ./test01
hellow world
1
hellow 2
2
a+b = 3
-1
hi
```


## test02.c

``` c
#include <stdio.h>

int hellow(int a, int b) {
    printf("hellow world\n");
    return 0;
};

int (*func(void)) (int, int) {
    return hellow;
}

int main() {
    func()(1 ,2);
    return 0;
}
```

```sh
[pyoung@hwarang temp]$ ./test02
hellow world
```

매번 느끼지만 스터디할때마다.. 신기하다는...

## 함수 포인터 선언

> 리턴 (* 함수)(인자값)

``` c
### test03.c
#include <stdio.h>

int multi(int one) {
    printf("multi called\n");
    return one;
}

void call_multi(int(*p)(int one)) {
    printf("%d, call_multi\n", p(777));
}

int main() {
    call_multi(multi);
    return 0;
}
```

```sh
pyoung@hwarang:~/myHome/signal$ ./test03
multi called
777, call_multi
```


## signal1.c

``` c
#include <stdio.h>
#include <signal.h>

void foo(void) {
    printf("foo called\n");
}

void bar(void) {
    printf("bar called\n");
}

void my_sig(int signo) {
    printf("my_sig called\n");
}

int main() {
    void (*p[])(void) = {foo, bar};
    int i;
    int choice = 0;
    
    for(i=0; i<2; ++i)
        p[i]();
    //foo(), bar() 호출

    for(choice; choice<2; ++choice) {
        switch(choice) {
        case 0:
            foo();
            break;
        case 1:
            bar();
            break;
        }

        p[choice]();
    }

    return 0;
}

/*
case 0: 에서 foo()호출
p[0](); 에서 foo()호출
case 1: 에서 bar()호출
p[1](); 에서 bar()호출
*/
```

```sh
pyoung@hwarang:~/myHome/signal$ ./signal1
foo called
bar called
foo called
foo called
bar called
bar called
```


## signal2.c

``` c
#include <stdio.h>

void aaa(void);
void bbb(void(*p)(void));

int main(void) {
    bbb(aaa);
    return 0;
}

void aaa(void) {
    printf("aaa called\n");
}

void bbb(void(*p)(void)) {
    p();
    printf("bbb called\n");
}
```

```sh
pyoung@hwarang:~/myHome/signal$ ./signal2
aaa called
bbb called
```


## signal3.c

``` c
#include <stdio.h>

void aaa(int a) {
    printf("aaa() called\n");
    printf("%d\n", a);
}

void (* bbb(void)) (int a) {
    printf("bbb() called\n");
    return aaa;
}

int main(void) {
    bbb()(1);
    return 0;
}
```

```sh
pyoung@hwarang:~/myHome/signal$ ./signal3
bbb() called
aaa() called
1
```

## signal4.c

``` c
#include <stdio.h>

void aaa(void) {
    printf("aaa called\n");
}

void (* bbb(void (*p) (void))) (void) {
    p();
    printf("bbb called\n");
    return aaa;
}

int main(void) {
    bbb(aaa)();
    return 0;
}
```

```sh
pyoung@hwarang:~/myHome/signal$ ./signal4
aaa called
bbb called
aaa called
```


## signal5.c

``` c
#include <stdio.h>

int (* aaa(void)) [2] {
    static int a[2][2] = { {1, 2}, {3, 4} };
    printf("aaa called\n");
    return a;
}

int (* (* bbb(void))(void))[2] {
    printf("bbb called\n");
    return aaa;
}


int main(void) {
    int (*ret)[2];
    int (* (* (*p[][2])(void)) (void))[2] = {
        {bbb, bbb}, {bbb, bbb}
    };

    int (* (* (* (*p1)[2]) (void))(void))[2] = p;

    ret = ((* (* (* (*p1)[2])))()());

    printf("%d\n", *ret[0]);
    return 0;
}
```

```sh
pyoung@hwarang:~/myHome/signal$ ./signal5
bbb called
aaa called
1
```


## signal6.c

``` c
#include <stdio.h>

typedef int (*FP1)[2];
typedef FP1 (*FP2)(void);
typedef FP2 (*FP3)(void);
typedef FP3 (*FP4)[2];

FP1 aaa(void) {
    static int a[2][2];
    printf("aaa called\n");
    return a;
}

FP2 bbb(void) {
    printf("bbb called\n");
    return aaa;
}

int main() {
    int (*ret)[2];
    FP3 p[][2] = { {bbb, bbb}, {bbb, bbb} };
    FP4 p1 = p;
    ret = ((* (* (* (*p1) [2])))()());
    printf("%d\n", *ret[0]);
    return 0;
}
```

```sh
pyoung@hwarang:~/myHome/signal$ ./signal6
bbb called
aaa called
0
```


## void  (*signal(int  signum,   void (*p)(int) ) )(int);

스터디장 왈 :

> signal은 signum이라는 int형 인자와 void (*)(int)형의 함수 포인터 p 인자를 가지는 함수이며,
> 리턴값은 void (*)(int)형의 함수 포인터입니다
>> (void(*)(int)) signal(int signum, (void (*) (int))p)
