
make에 필요한 Makefile은 3부분으로 구성되어있다.

```
target : defendency
           command	
```

* command앞에는 tab문자가 반드시 존재해야한다.
* 옵션으로 Macro라는게 존재한다


### 그렇다면 타겟이 존재하지 않으면어떻게 될까?

like.c
```c
#include

void lovecall();

char *getname()
        {
        static char name[128];


        printf("Input name: ");
        scanf("%s", name);
        return name;
        }

int main()
{
        char *str;
        str = getname();

        printf("I like You.\n");
        printf("%s", str);

        //lovecall();
        return 0;
}
```

love.c
```c
#include
#include

void lovecall()
        {
        double love;

        for(love=0; sin(love)+2; love++)
                printf("I love You.\n");
        }
```

Makefile ver.1
```makefile
CC      = gcc
CFLAGS  = -W -Wall -O2
LDFLAGS = -lm


like : like.c love.c
        $(CC) $(CFLAGS) -o $@ $^ $(LDFLAGS)

clean:
        @rm -rf *.o like
```

 
Makefile ver.2
```makefile
# 이것은 주석"#"
# 아레나온 것이 Macro 이다. 사용법은 쉘스크립트 변수처럼사용해주면된다.
CC      = gcc
CFLAGS  = -W -Wall -O2
LDFLAGS = -lm


# 타겟은 왼쪽에서 시작하고 ":"기호 붙는다. 여기서 타겟은 "like"
# like ":"옆에 의존성 갖는 파일 like.c, love.c
# target : defendency
# (탭문자) command(실행명령)
# 실행법 make [target(여기선 like)]

like : like.o love.o
        gcc -o like like.o love.o $(LDFLAGS)
like.o : like.c
        gcc -c -O like.c
love.o : love.c
        gcc -c -O love.c

# make clean명령을 내림으로써 실행되는 결과.
clean:
        @rm -rf *.o like
```

testing
```sh
[root@study02 studytemp]# ls
Makefile  like.c  love.c

[root@study02 studytemp]# make
gcc -c -O like.c
gcc -c -O love.c
gcc -o like like.o love.o -lm

[root@study02 studytemp]# ls
Makefile  like  like.c  like.o  love.c  love.o

[root@study02 studytemp]# ./like
Input name: kara
I like You.
kara[root@study02 studytemp]# make clean

[root@study02 studytemp]# ls
Makefile  like.c  love.c
```

### make에서는 타겟 생성 절차.
1. 타겟에서 의존하고 있는 파일에 해당하는 소스에 대하여 갱신되어 있는지 체크한다.
2. 갱신되지 않은 파일을 갱신한다.
3. 타겟에서 의존하는 파일이 갱신되어 있는지 체크한다.
4. 타겟중 갱신되지 않은 것이 있는 경우 새로운 버전으로 갱신한다.

### 타겟이 없는 경우
Makefile ver.3
```makefile
CC              = gcc
CFLAGS  = -W -Wall -O2
LDFLAGS = -lm

like : like.o love.o
        gcc -o like like.o love.o $(LDFLAGS)
#like.o : like.c 원본은 주석처리하고 사본에는 타겟을 지웠다.


like.o :
        gcc -c -O like.c
love.o : love.c
        gcc -c -O love.c

clean:
        @rm -rf *.o like
```

testing
```sh
[root@study02 studytemp]# make
gcc -c -O like.c
gcc -c -O love.c
gcc -o like like.o love.o -lm

[root@study02 studytemp]# ls
Makefile  like  like.c  like.o  love.c  love.o
```

* 정상적으로 컴파일 된것을 확인 할 수 있다.


> 타겟 파일이 없을 경우 디렉토리 검색이 수행되는데
> 
> 1. 타겟 파일이 makefile에서 지정한 패스에 존재하지 않으면 디렉토리 검색이 수행된다.
> 
> 2. 디렉토리 검색이 성공적이면 그 패스는 간직되고 이 파일은 시험적으로 타겟으로 저장된다.
> 
> 3. 이 타겟의 모든 종속물들은 이런 동일한 방법을 사용해서 시험된다.
> 
> 4. 종속물들을 처리한 후, 타겟은 재빌드가 될 필요가 있거나 그렇지 않다:
>  1. 타겟이 재빌드될 필요가 없다면, 디렉토리 검색 동안 찾아진 파일에 대한 경로는, 이런 타겟을 포함하는 임의의 종속물 리스트에 사용된다. 간단히 말해서 make가 타겟을 재빌드할 필요가 없다면 여러분은 디렉토리 검색을 통해서 찾아진 패스를 사용한다.
> 
>  2. 타겟이 재빌드될 필요가 있으면 (out-of-date이면), 디렉토리 검색동안 찾아진 경로명은 버려지고, 타겟은 makefile에서 지정된 파일 이름을 사용하여 재빌드된다. 간단히 말하면 make가 반드시 재빌드해야 한다면 타겟은 로컬로 재빌드되고 디렉토리 검색을 통해서 찾아진 디렉토리에서는 재빌드되지 않는다.

### 그렇다면 커맨드가 없으면 어떻게 될까?
Makefile ver.4
```makefile
CC      = gcc
CFLAGS  = -W -Wall -O2
LDFLAGS = -lm

like : like.o love.o
        gcc -o like like.o love.o $(LDFLAGS)
like.o : like.c
        #gcc -c -O like.c [==커맨드를 주석처리 했다.==]
love.o : love.c
        gcc -c -O love.c

clean:
        @rm -rf *.o like
```

testing
```sh
[root@study02 studytemp]# make
#gcc -c -O like.c
gcc -c -O love.c
gcc -o like like.o love.o -lm
gcc: like.o: 그런 파일이나 디렉토리가 없음
make: *** [like] 오류 1
[root@study02 studytemp]# ls
Makefile  like.c  love.c  love.o
```
* like.o가 생성되지 않는것을 볼 수 있다.

### 내부 매크로
* $@ : 현재 목표 파일의 이름
* $* : 확장자를 제외한 현제 목표
* $< : 현재 필수 조건 파일 중 첫번째 파일의 이름
* $^ : 현제 모든 필수 조건 파일들

# 참고자료
 - http://wiki.kldp.org/wiki.php/HowToMake
 - http://www.viper.pe.kr/docs/make-ko/make-ko_toc.html
 - http://jacking75.cafe24.com/Network/Unix_Linux/l-debugmake.htm
 - http://wiki.kldp.org/wiki.php/HowToMake
 - http://wiki.kldp.org/wiki.php/DocbookSgml/Autotools-KLDP
 - http://hyyoo.egloos.com/327319
