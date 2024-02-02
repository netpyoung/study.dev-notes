
make�� �ʿ��� Makefile�� 3�κ����� �����Ǿ��ִ�.

```
target : defendency
           command	
```

* command�տ��� tab���ڰ� �ݵ�� �����ؾ��Ѵ�.
* �ɼ����� Macro��°� �����Ѵ�


### �׷��ٸ� Ÿ���� �������� �������� �ɱ�?

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
# �̰��� �ּ�"#"
# �Ʒ����� ���� Macro �̴�. ������ ����ũ��Ʈ ����ó��������ָ�ȴ�.
CC      = gcc
CFLAGS  = -W -Wall -O2
LDFLAGS = -lm


# Ÿ���� ���ʿ��� �����ϰ� ":"��ȣ �ٴ´�. ���⼭ Ÿ���� "like"
# like ":"���� ������ ���� ���� like.c, love.c
# target : defendency
# (�ǹ���) command(������)
# ����� make [target(���⼱ like)]

like : like.o love.o
        gcc -o like like.o love.o $(LDFLAGS)
like.o : like.c
        gcc -c -O like.c
love.o : love.c
        gcc -c -O love.c

# make clean����� �������ν� ����Ǵ� ���.
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

### make������ Ÿ�� ���� ����.
1. Ÿ�ٿ��� �����ϰ� �ִ� ���Ͽ� �ش��ϴ� �ҽ��� ���Ͽ� ���ŵǾ� �ִ��� üũ�Ѵ�.
2. ���ŵ��� ���� ������ �����Ѵ�.
3. Ÿ�ٿ��� �����ϴ� ������ ���ŵǾ� �ִ��� üũ�Ѵ�.
4. Ÿ���� ���ŵ��� ���� ���� �ִ� ��� ���ο� �������� �����Ѵ�.

### Ÿ���� ���� ���
Makefile ver.3
```makefile
CC              = gcc
CFLAGS  = -W -Wall -O2
LDFLAGS = -lm

like : like.o love.o
        gcc -o like like.o love.o $(LDFLAGS)
#like.o : like.c ������ �ּ�ó���ϰ� �纻���� Ÿ���� ������.


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

* ���������� ������ �Ȱ��� Ȯ�� �� �� �ִ�.


> Ÿ�� ������ ���� ��� ���丮 �˻��� ����Ǵµ�
> 
> 1. Ÿ�� ������ makefile���� ������ �н��� �������� ������ ���丮 �˻��� ����ȴ�.
> 
> 2. ���丮 �˻��� �������̸� �� �н��� �����ǰ� �� ������ ���������� Ÿ������ ����ȴ�.
> 
> 3. �� Ÿ���� ��� ���ӹ����� �̷� ������ ����� ����ؼ� ����ȴ�.
> 
> 4. ���ӹ����� ó���� ��, Ÿ���� ����尡 �� �ʿ䰡 �ְų� �׷��� �ʴ�:
>  1. Ÿ���� ������ �ʿ䰡 ���ٸ�, ���丮 �˻� ���� ã���� ���Ͽ� ���� ��δ�, �̷� Ÿ���� �����ϴ� ������ ���ӹ� ����Ʈ�� ���ȴ�. ������ ���ؼ� make�� Ÿ���� ������� �ʿ䰡 ���ٸ� �������� ���丮 �˻��� ���ؼ� ã���� �н��� ����Ѵ�.
> 
>  2. Ÿ���� ������ �ʿ䰡 ������ (out-of-date�̸�), ���丮 �˻����� ã���� ��θ��� ��������, Ÿ���� makefile���� ������ ���� �̸��� ����Ͽ� �����ȴ�. ������ ���ϸ� make�� �ݵ�� ������ؾ� �Ѵٸ� Ÿ���� ���÷� �����ǰ� ���丮 �˻��� ���ؼ� ã���� ���丮������ �������� �ʴ´�.

### �׷��ٸ� Ŀ�ǵ尡 ������ ��� �ɱ�?
Makefile ver.4
```makefile
CC      = gcc
CFLAGS  = -W -Wall -O2
LDFLAGS = -lm

like : like.o love.o
        gcc -o like like.o love.o $(LDFLAGS)
like.o : like.c
        #gcc -c -O like.c [==Ŀ�ǵ带 �ּ�ó�� �ߴ�.==]
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
gcc: like.o: �׷� �����̳� ���丮�� ����
make: *** [like] ���� 1
[root@study02 studytemp]# ls
Makefile  like.c  love.c  love.o
```
* like.o�� �������� �ʴ°��� �� �� �ִ�.

### ���� ��ũ��
* $@ : ���� ��ǥ ������ �̸�
* $* : Ȯ���ڸ� ������ ���� ��ǥ
* $< : ���� �ʼ� ���� ���� �� ù��° ������ �̸�
* $^ : ���� ��� �ʼ� ���� ���ϵ�

# �����ڷ�
 - http://wiki.kldp.org/wiki.php/HowToMake
 - http://www.viper.pe.kr/docs/make-ko/make-ko_toc.html
 - http://jacking75.cafe24.com/Network/Unix_Linux/l-debugmake.htm
 - http://wiki.kldp.org/wiki.php/HowToMake
 - http://wiki.kldp.org/wiki.php/DocbookSgml/Autotools-KLDP
 - http://hyyoo.egloos.com/327319
