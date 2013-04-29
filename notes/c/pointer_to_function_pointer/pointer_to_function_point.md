## 기본적인 포인터 개념

```c
#include <stdio.h>

int main(int argc, char *argv[])
{
  int a = 5;
  printf("\n  int a = 5; \n");
  printf("&a : 0x%06X\n", &a);
  printf("a {  %d  }\n", a);
  
  int *p = 0;
  printf("\n   int *p = 0; \n");
  printf("&p : 0x%06X\n", &p);
  printf("p {  %d  }\n", p);

  p = &a;
  printf("\n   p = &a; \n");
  printf("p { 0x%06X } == &a : 0x%06X\n", p, &a);

  printf("\n*p : %d\n", *p);
  
  return 0;
}
```

결과 : 

```
  int a = 5; 
&a : 0x22FF6C
a {  5  }

   int *p = 0; 
&p : 0x22FF68
p {  0  }

   p = &a; 
p { 0x22FF6C } == &a : 0x22FF6C

*p : 5
```

![pointer_basic]


## 포인터와 배열

```c
#include <stdio.h>

int main(int argc, char *argv[])
{
  int array[2] = { 1, 2 };
  printf("\n  int array[2] = { 1, 2 };\n");
  printf("array[0] { %d }\n", array[0]);
  printf("array[1] { %d }\n", array[1]);

  int *p_int = &array;
  printf("\n   int *p_int = &array;\n");
  printf("p_int { 0x%06X }\n", p_int);
  printf("p_int+1 { 0x%06X }\n", p_int+1);
  printf("\n");

  printf("&p_int[1] : 0x%06X | p_int[1] : %d\n", &p_int[1], p_int[1]);
  printf("p_int+1 :  0x%06X | *(p_int+1) : %d", p_int+1, *(p_int+1));
  return 0;
}
```

결과 : 
```
  int array[2] = { 1, 2 };
array[0] { 1 }
array[1] { 2 }

   int *p_int = &array;
p_int { 0x22FF64 }
p_int+1 { 0x22FF68 }

&p_int[1] : 0x22FF68 | p_int[1] : 2
p_int+1 :  0x22FF68 | *(p_int+1) : 2
```

![pointer_arr]


## 포인터와 파입 배열

이제 p_int +1의 +1은 단순히 1만 더한다는게 아니라는걸 알 수 있다.

자 이제 p_int+1과 p_double+1의 차이점을 유심히 보자

```c
#include <stdio.h>

int main(int argc, char *argv[])
{
  double array[2] = { 1, 2 };
  printf("\n  double array[2] = { 1, 2 };\n");
  printf("array[0] { %E }\n", array[0]);
  printf("array[1] { %E }\n", array[1]);

  double *p_double = &array;
  printf("\n   double *p_double = &array;\n");
  printf("p_double { 0x%06X }\n", p_double);
  printf("p_double+1 { 0x%06X }\n", p_double+1);
  printf("\n");

  printf("&p_double[1] : 0x%06X | p_double[1] : %E\n", &p_double[1], p_double[1]);
  printf("p_double+1 :  0x%06X | *(p_double+1) : %E", p_double+1, *(p_double+1));
  return 0;
}
```

결과 :
```
  double array[2] = { 1, 2 };
array[0] { 1.000000E+000 }
array[1] { 2.000000E+000 }

   double *p_double = &array;
p_double { 0x22FF48 }
p_double+1 { 0x22FF50 }

&p_double[1] : 0x22FF50 | p_double[1] : 2.000000E+000
p_double+1 :  0x22FF50 | *(p_double+1) : 2.000000E+00
```

![pointer_arr_with_type]

### 포인터 더 알아보기(1)
이제는 int array[2]와 int *p_array[2]의 차이점을 알아볼 차레이다.

```c
#include <stdio.h>

int main(int argc, char *argv[])
{
  int one = 1;
  int two = 2;

  int array[2] = { one, two };

  int (*p_array)[2] = &array;
  printf("p_array { %x }\n", p_array);
  printf("p_array+1 { %x }\n\n", p_array+1);
  
  printf("*p_array { %x }\n", *p_array);
  printf("(*p_array)+1 { %x }\n\n", (*p_array)+1);
  
  printf("*(*(p_array)+1)) { %x } \n", *(*(p_array)+1));
  printf("(*p_array)[1] = %d\n", (*p_array)[1]);
  return 0;
}
```

결과 :
```
p_array { 22ff5c }
p_array+1 { 22ff64 }

*p_array { 22ff5c }
(*p_array)+1 { 22ff60 }

*(*(p_array)+1)) { 2 } 
(*p_array)[1] = 2
```

p_array와 *p_array는 같은 값이지만 p_array같은 경우 int [2]를 가리키고 있고
*p_array는 int를 가리키고 있기 때문에 p_array+1과 (*p_array)+1과 차이가 생긴다.

![pointer_adv_01]

### 포인터 더 알아보기(2)

```c
#include <stdio.h>

int main(int argc, char *argv[])
{
  int one = 1;
  int two = 2;
  printf("one { %x }\n", one);
  printf("two { %x }\n", two);
  printf("&one { %x }\n", &one);
  printf("&one { %x }\n", &two);
  
  int *p_one = &one;
  int *p_two = &two;
  printf("p_one { %x }\n", p_one);
  printf("p_two { %x }\n", p_two);
  
  int *p_array[2] = { p_one, p_two };

  printf("p_array[0] { %x }\n", p_array[0]);
  printf("p_array[1] { %x }\n\n", p_array[1]);
  
  printf("*(p_array[0]) { %x }\n", *(p_array[0]));
  printf("*(p_array[1]) { %x }\n\n", *(p_array[1]));
  
  return 0;
}
```

결과 :
```
one { 1 }
two { 2 }
&one { 22ff64 }
&one { 22ff60 }
p_one { 22ff64 }
p_two { 22ff60 }
p_array[0] { 22ff64 }
p_array[1] { 22ff60 }

*(p_array[0]) { 1 }
*(p_array[1]) { 2 }
```

```c
#include <stdio.h>

int main()
{
  int array[8] = {10, 20, 30, 40, 50, 60, 70, 80};
  printf("array = 0x%X\n", array);
  printf("array[1]  = %d\n", array[1]);
  printf("*array = %d\n", *array);
  printf("*(array) = %d\n", *(array));
  printf("(*array) = %d\n", (*array));
  printf("*array+1 = %d\n", *array+1);
  printf("(*array+1) = %d\n", (*array+1));
  printf("*(array+1) = %d\n", *(array+1));

  return 0;
}
```

결과 :

```
array = 0xBFC876E4
array[1]  = 20
*array = 10
*(array) = 10
(*array) = 10
*array+1 = 11
(*array+1) = 11
*(array+1) = 20
```

![pointer_adv_02]

괄호를 넣는 위치도 중요하다.

```c
int main()
{
  int array[10] = {0,1,2,3,4,5,6,7,8,9};
  int * p_array = array;
  printf("*p_array = %d\n", *p_array);
  printf("p_array[0] = %d\n", p_array[0]);
  printf("*(p_array + 0) = %d\n", *(p_array + 0));

  printf("\n--------------------\n");
  printf("p_array[5] = %d\n", p_array[5]);
  printf("*(p_array + 5] = %d\n", *(p_array + 5));
  printf("*(5 + p_array) = %d\n", *(5 + p_array));
  printf("5[p_array] = %d\n", 5[p_array]);
  return 0;
}
```

결과 :

```
*p_array = 0
p_array[0] = 0
*(p_array + 0) = 0

--------------------
p_array[5] = 5
*(p_array + 5] = 5
*(5 + p_array) = 5
5[p_array] = 5
```

이런 식으로 앞뒤를 바꾸는 것도 가능하다.

### 포인터 더 알아보기(3)
자 이제 마지막으로 함수 포인터이다.

```c
#include <stdio.h>

void printHellow(int);

int main(int argc, char *argv[])
{
  void (* pHellow)(int);

  printf("printHellow : 0x%X\n", printHellow);
  printf("&pHellow : 0x%X\n", &pHellow);
  pHellow = printHellow;
  printf("\n  pHellow = &printHellow;\n");
  printf("&pHellow : 0x%X\n", &pHellow);
  printf("&printHellow : 0x%X\n", &printHellow);
  printf("pHellow { 0x%X }\n\n", pHellow);
  printHellow(5);
  pHellow(5);
  return 0;
}

void printHellow(int number)
{
  printf("Hellow [%d]\n", number);
}
```

결과 :

```
printHellow : 0x401456
&pHellow : 0x22FF6C

  pHellow = &printHellow;
&pHellow : 0x22FF6C
&printHellow : 0x401456
pHellow { 0x401456 }

Hellow [5]
Hellow [5]
```

![pointer_adv_03]


이상으로 포인터에 대해서 알아 보았습니다.
http://netpyoung.tistory.com/72에서 더 나아가 볼 수 있습니다.

 [pointer_basic]: ../imgs/pointer_to_function_pointer/pointer_basic.jpg
 [pointer_arr]: ../imgs/pointer_to_function_pointer/pointer_arr.jpg
 [pointer_arr_with_type]: ../imgs/pointer_to_function_pointer/pointer_arr_with_type.jpg
 [pointer_adv_01]: ../imgs/pointer_to_function_pointer/pointer_adv_01.jpg
 [pointer_adv_02]: ../imgs/pointer_to_function_pointer/pointer_adv_02.jpg
 [pointer_adv_03]: ../imgs/pointer_to_function_pointer/pointer_adv_03.jpg