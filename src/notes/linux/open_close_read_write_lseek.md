9/21���͵� ���� ���
======================================
http://cafe.naver.com/cmenia/1494
======================================

sys/types.h : ��������� ������ ����� mode_t�� �����ϰ� �ִ�.

sys/stat.h :  �پ��� ������������ ���ǵǾ� �ִ�.

fcntl.h : �ý��� ȣ�� open�� ������ Ÿ�԰� flags�� ����Ҽ� �ִ� ��ũ�� ����� �����ϰ� �ִ�.

MMU(Memory Management Unit) segment�� paging�� �̿��Ͽ� ����޸�->�����޸𸮷� �ڵ� ����


(���͵� ����� Beginning linux programming 3rdE(page 1006)����)

���ͷ�Ʈ : ��ġ�� ����̹��κ��� �ָ��� �ް� ��ġ�� � ó���� �ʿ�� ���� �˸��� ���
arch/<��Ű��ó>/kernel/irq.c ���� ������ ���Ҽ� ����(��ġ ������)

������ - idt_table�̶�� �迭��
0 ~ 31������ ���� ���ͷ�Ʈ��
32 ~ 255������ �ܺ� ���ͷ�Ʈ ��

## ???
* ������ ���� ��� Ư�� �ּҿ� ���ͷ�Ʈ�� �����Ǿ� ���ڳ���, �������� ���н��� �׷�����?
> ��.
> 128�� hex code�δ� 0x80�� ���εǾ��ֽ��ϴ�
> 0x80�̶�� ���� System Call(���ͷ�Ʈ ��ȣ) �Դϴ�
>  Windows API(windows) == System Call(Linux, Unix)

* irq�ʹ� ��� ������ �ǳ���?
> irq_desc��� �ڷᱸ���� �ϳ� �� �ִµ�
> Ư���� �ڷᱸ���� ������ �ؼ�
> �ܺ� ���ͷ�Ʈ�� Ȯ�� ���Ѽ� ó���ϴ� ���Դϴ�.
> (ex.����� 100���� 50���� ���� ó���Ҷ�)

* read�Լ��� ����� �ؼ����� �ʳ����׿�..
> �˾Ƽ� ��� Ŀ�ε� �ֽ��ϴٸ�, ���� �ڵ� ������ �ƴմϴ�
> ���� �����¿� ������ �ְ� ���� �ʱ�ȭ�� ���ּž��մϴ�


### write
```c
#include <unistd.h>
size_t write(int fildes, const void *buf, size_t nbytes);
```

### read
```c
#include <unistd.h>
size_t read(int fildes, void *buf, size_t nbytes);
```

### lseek
```c
#include <unistd.h>
#include <sys/types.h>
off_t lseek(int fildes, off_t offset, int whence);
```

* whence
 - SEEK_SET ���� ������ġ
 - SEEK_CUR ����� ��ġ
 - SEEK_END ���� ��

�Ǽ��� ������ �������� �ʰ��ؼ� lseek�� ������� ��� lseek���� ������ ������ ������ write()Ȥ�� read()���� ������ �߻��ϰ� �ǹǷ� ����
http://www.joinc.co.kr/modules/moniwiki/wiki.php/man/2/lseek

### unlink
```c
#include <unistd.h>
int unlink(const char *path);
//int link(const char *path1, const char *path2);  ln�Ҷ� ���
//int syslink (const char *path1, const char *path2);
```

���� 0, ERROR -1
���� ���丮 �׸� ���Ե� ��� ���丮�� ���ؼ� ���� ���� ������ ������ �־�� �Ѵ�.
���� 0 Ȥ�� ��� ���μ����� ������ ���� ���� ������ ������ ����
rm������ �� ȣ�� ���

### close
```c
#include <unistd.h>
int close(int fildes);
```

���� 0, ERROR -1
���ϵ�ũ���Ϳ� ���ϰ��� ���� ����
��ȯ���˻�

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
> cpu0�� ide0���� 18936�� ó���Ͽ���
> cpu1�� 3234�� ó���Ͽ���.
> 0�� Ư���� Ư���� Ÿ�̸� ���ͷ�Ʈ(x86������ �׷��ϰ� �ٸ��÷����� �ٸ�)
> �ý��� ó����� ����Ŵ IO-APIC-edge ���ͷ�Ʈ ó�����(IO_APIC�� CPU���̿� ���ͷ�Ʈ �л�, XT_PIC ǥ�� ���ͷ�Ʈ �����)

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

���ͷ�Ʈ�� �� ������ �����Ͽ� �ٸ� �׸��� ����. �� ������ �̿��Ͽ� cpu������ ���Ҽ� ���� http://kernelstudy.tistory.com/23 ���� �ڼ��� ���� �ֽ��ϴ�.

#### CentOs5.3_2.6.18������ defines
```c
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

//__THROW�� cpp����ϰų��Ҷ� throw()�Լ� ȣ��
=====================================
/usr/include/linux/limits.h

//POSIX���ǿ� ���� ��� 16�� �Ǿ���
  9 #define OPEN_MAX         256    /* # open files a process may have */
```


sys_call_open.c
```c
#include <sys/types.h> //lseek
#include <fcntl.h>
#include <unistd.h>  //read, write, lseek
#include <stdio.h>
#include <string.h>

int main()
{
        int filedes, fdnew1, fdnew2;
        //fd�� ���� ����

        ssize_t nread; // int nread;
        off_t newpos; // long int newpos;

        char buf[1024] = "\0";
        char content[] = "Hello Os_Killer~!!\n";

        //filedes = open("data.txt" , O_RDONLY);
        
        filedes = open("data.txt" , O_RDWR);
        
        //�б� �������� ������ ����(��������� RDONLY���Ҷ� �ȵǼ�
        //RDWR(�б⾲��)�� ������ ��
        //filedes = open("data.txt" , O_RDWR);
        //stdin -0, stdout -1, stderr 2
        //���� ���⼱ 3�� �����

        nread = read(filedes, buf, 1024);
        printf("%s", buf);

        write(filedes, content, strlen(content));
        newpos = lseek(filedes, (off_t)0, SEEK_SET);

        nread= read(filedes, buf, 1024);
        printf("%s", buf);

        close(filedes);

        fdnew1 = open("newdata1.txt", O_RDWR | O_CREAT, 0644);
        //�а��� | ���� 0644�۹̼�
        fdnew2 = open("newdata2.txt", 0644);

        close(fdnew1);
        close(fdnew2);
        unlink("newdata2.txt");
        //���ϻ���
}
```

test revert input.txt
```c
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