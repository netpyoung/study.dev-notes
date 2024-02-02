9/21스터디 내용 요약
======================================
http://cafe.naver.com/cmenia/1494
======================================

sys/types.h : 사용자정의 데이터 행식인 mode_t를 정의하고 있다.

sys/stat.h :  다양한 데이터형식이 정의되어 있다.

fcntl.h : 시스템 호출 open의 프로토 타입과 flags에 사용할수 있는 메크로 상수를 정의하고 있다.

MMU(Memory Management Unit) segment와 paging을 이용하여 가상메모리->물리메모리로 자동 맵핑


(스터디 내용과 Beginning linux programming 3rdE(page 1006)참조)

인터럽트 : 장치가 드라이버로부터 주목을 받고 장치가 어떤 처리를 필요로 함을 알리는 방식
arch/<아키텍처>/kernel/irq.c 에서 정보를 구할수 있음(장치 종속적)

리눅스 - idt_table이라는 배열에
0 ~ 31번까지 내부 인터럽트용
32 ~ 255번까지 외부 인터럽트 용

## ???
* 윈도우 같은 경우 특정 주소에 인터럽트가 지정되어 있자나요, 리눅스나 유닉스도 그런가요?
> 네.
> 128번 hex code로는 0x80에 매핑되어있습니다
> 0x80이라는 것은 System Call(인터럽트 번호) 입니다
>  Windows API(windows) == System Call(Linux, Unix)

* irq와는 어떻게 구분이 되나요?
> irq_desc라는 자료구조가 하나 더 있는데
> 특수한 자료구조로 관리를 해서
> 외부 인터럽트를 확장 시켜서 처리하는 것입니다.
> (ex.모니터 100개중 50개만 따로 처리할때)

* read함수는 헤더를 해석하지 않나보네요..
> 알아서 잡는 커널도 있습니다만, 좋은 코딩 습관은 아닙니다
> 파일 오프셋에 변동을 주고 나선 초기화를 해주셔야합니다


### write

``` c
#include <unistd.h>
size_t write(int fildes, const void *buf, size_t nbytes);
```

### read
``` c
#include <unistd.h>
size_t read(int fildes, void *buf, size_t nbytes);
```

### lseek
``` c
#include <unistd.h>
#include <sys/types.h>
off_t lseek(int fildes, off_t offset, int whence);
```

* whence
 - SEEK_SET 파일 절대위치
 - SEEK_CUR 상대적 위치
 - SEEK_END 파일 끝

실수로 파일의 마지막을 초과해서 lseek를 사용했을 경우 lseek에서 리턴을 하지는 않지만 write()혹은 read()에서 에러를 발생하게 되므로 주의
http://www.joinc.co.kr/modules/moniwiki/wiki.php/man/2/lseek

### unlink
``` c
#include <unistd.h>
int unlink(const char *path);
//int link(const char *path1, const char *path2);  ln할때 사용
//int syslink (const char *path1, const char *path2);
```

성공 0, ERROR -1
파일 디렉토리 항목에 포함된 모든 디렉토리에 대해서 쓰기 실행 권한일 가지고 있어야 한다.
개수 0 혹은 어떠한 프로세스도 파일을 열어 놓지 않으면 파일은 삭제
rm에서도 이 호출 사용

### close
``` c
#include <unistd.h>
int close(int fildes);
```

성공 0, ERROR -1
파일디스크립터와 파일간의 연결 종료
반환값검사

#### /proc/interrupts
```sh
[pyoung@localhost Study]$ cat /proc/interrupts
           CPU0       CPU1
  0:    4554572          0    IO-APIC-edge  timer
  1:          7          2    IO-APIC-edge  i8042
  6:          2          3    IO-APIC-edge  floppy
  7:          0          0    IO-APIC-edge  parport0
  8:          1          0    IO-APIC-edge  rtc
  9:          0          0   IO-APIC-level  acpi
 12:          3        113    IO-APIC-edge  i8042
 14:      18936       3234    IO-APIC-edge  ide0
 15:      39516        104    IO-APIC-edge  ide1
 51:       5808         56   IO-APIC-level  eth0
 59:          0          0   IO-APIC-level  Ensoniq AudioPCI
NMI:          0          0
LOC:    4554815    4555320
ERR:          0
MIS:          0
```

`14:      18936       3234    IO-APIC-edge  ide0`
> cpu0이 ide0에서 18936을 처리하였고
> cpu1이 3234을 처리하였다.
> 0은 특별한 특별한 타이머 인터럽트(x86에서는 그러하고 다른플렛폼은 다름)
> 시스템 처리방식 가리킴 IO-APIC-edge 인터럽트 처리방식(IO_APIC는 CPU사이에 인터럽트 분산, XT_PIC 표준 인터럽트 제어기)

#### /proc/stat
```sh
[pyoung@localhost Study]$ cat /proc/stat
cpu  2171 221 12423 891598 8175 368 355 0
cpu0 1322 54 7094 444275 4427 340 125 0
cpu1 849 166 5328 447322 3748 27 229 0
intr 4644739 4576688 9 0 3 3 0 5 0 1 0 0 0 116 0 22187 39818 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 5909 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
ctxt 137162
btime 1253456918
processes 3894
procs_running 1
procs_blocked 0
```

인터럽트의 총 개수를 포함하여 다른 항목을 포함. 이 파일을 이용하여 cpu사용률을 구할수 있음 http://kernelstudy.tistory.com/23 에서 자세히 볼수 있습니다.

#### CentOs5.3_2.6.18에서의 defines
``` c
===================================================
/usr/include/bits/types.h
108 #if __WORDSIZE == 32
111 # define __SWORD_TYPE       int
119 # define __STD_TYPE     __extension__ typedef
183 __STD_TYPE __SSIZE_T_TYPE __ssize_t; /* Type of a byte count, or error.  */
/usr/include/bits/typesizes.h
60 #define __SSIZE_T_TYPE      __SWORD_TYPE

=====================================
/usr/include/sys/types.h
 88 typedef __off_t off_t;

/usr/include/bits/types.h
106 #define __SLONGWORD_TYPE    long int
108 #if __WORDSIZE == 32
119 # define __STD_TYPE     __extension__ typedef
144 __STD_TYPE __OFF_T_TYPE __off_t;    /* Type of file sizes and offsets.  */

/usr/include/bits/typesizes.h
 37 #define __OFF_T_TYPE        __SLONGWORD_TYPE

======================================
/usr/include/unistd.h
 281 #ifndef _STDIO_H        /*  has the same definitions.  */
 282 # define SEEK_SET   0   /* Seek from beginning of file.  */
 283 # define SEEK_CUR   1   /* Seek from current position.  */
 284 # define SEEK_END   2   /* Seek from end of file.  */
 285 #endif

 300 #ifndef __USE_FILE_OFFSET64
 301 extern __off_t lseek (int __fd, __off_t __offset, int __whence) __THROW;

//__THROW는 cpp사용하거나할때 throw()함수 호출
=====================================
/usr/include/linux/limits.h

//POSIX정의에 따라 적어도 16은 되야함
  9 #define OPEN_MAX         256    /* # open files a process may have */
```


sys_call_open.c
``` c
#include <sys/types.h> //lseek
#include <fcntl.h>
#include <unistd.h>  //read, write, lseek
#include <stdio.h>
#include <string.h>

int main()
{
        int filedes, fdnew1, fdnew2;
        //fd를 담을 공간

        ssize_t nread; // int nread;
        off_t newpos; // long int newpos;

        char buf[1024] = "\0";
        char content[] = "Hello Os_Killer~!!\n";

        //filedes = open("data.txt" , O_RDONLY);
        
        filedes = open("data.txt" , O_RDWR);
        
        //읽기 전용으로 파일을 연다(저같은경우 RDONLY로할땐 안되서
        //RDWR(읽기쓰기)로 파일을 염
        //filedes = open("data.txt" , O_RDWR);
        //stdin -0, stdout -1, stderr 2
        //따라서 여기선 3이 저장됨

        nread = read(filedes, buf, 1024);
        printf("%s", buf);

        write(filedes, content, strlen(content));
        newpos = lseek(filedes, (off_t)0, SEEK_SET);

        nread= read(filedes, buf, 1024);
        printf("%s", buf);

        close(filedes);

        fdnew1 = open("newdata1.txt", O_RDWR | O_CREAT, 0644);
        //읽고쓰기 | 생성 0644퍼미션
        fdnew2 = open("newdata2.txt", 0644);

        close(fdnew1);
        close(fdnew2);
        unlink("newdata2.txt");
        //파일삭제
}
```

test revert input.txt
``` c
[pyoung@localhost :D]$ cat input.txt
=Hellow Practice=
open
close
read, write
lseek
[pyoung@localhost :D]$
[pyoung@localhost :D]$

 
[pyoung@localhost :D]$ cat test.c
#include <stdio.h>
#include <unistd.h>
#include <fcntl.h>
#include <sys/types.h>

#define BUFFERSIZE 1
#define FILE1 "input.txt"
#define FILE2 "output.txt"

int revFileString(const char *, const char *);

int main()
{
        return  revFileString(FILE1, FILE2);
}

int revFileString(const char * input, const char * output)
        {
        int fd1=0;
        int fd2=0;
        off_t start=0;
        off_t end=0;
        off_t cur=0;

        void * buffer = NULL;

        if( (fd1 = open(input, O_RDONLY)) == -1)
                return -1;
        if( (fd2 = open(output, O_WRONLY | O_CREAT | O_TRUNC, 0644)) == -1)
                {
                close(fd1);
                close(fd2);
                return -1;
                }

        start = lseek( fd1, 0, SEEK_SET);
        end = lseek( fd1, 0, SEEK_END);

        for(cur = end-2; cur >= start; cur--)
                {
                lseek( fd1, cur, SEEK_SET);
                if( read( fd1, (char*)&buffer, BUFFERSIZE ) < 0)
                        break;
                if( write( fd2, (char*)&buffer, BUFFERSIZE) < 0)
                        break;
                }

        close(fd1);
        close(fd2);
        return 1;
        }
[pyoung@localhost :D]$
[pyoung@localhost :D]$
[pyoung@localhost :D]$ cat output.txt
keesl
etirw ,daer
esolc
nepo
=ecitcarP wolleH=[pyoung@localhost :D]$
```