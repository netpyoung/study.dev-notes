

 

cpio 명령어 : 파일을 여러 테이프에 나눠 백업할 수 있다.

 

dump 명령어 : 변화가 발생한 파일만 백업하는 "부분 백업"명령어

 

iostat 명령어 : 시간에 대한 평균적인 입출력 통계를 보여줌

 

vmstat 명령어 : 커널이 가지고 있는 정보를 체크(프로세스, 디스크, CPU, 가상메모리등)

 

ulimit 명령어 : 리소스들 검색 및 사용 제한
-a : 리스트
-c : 코어덤프(512Byte단위)
-d : 스택세그먼트(kb)
-v : 가상메모리(kb)

 

trap 명령어 : 시그널 제어 명령어

    $ trap 'echo "hi"' SIGINT
    $ trap -p
    trap -- 'echo "hi"' SIGINT
    $ ^Chi
    $ trap SIGINT

 

ulimit 명령어

http://coffeenix.net/board_print.php?bd_code=146

    $ ulimit -c unlimited
    abort
    $ ulimit -c 0

 

nm 명령어

       nm - list symbols from object files

    $ nm -D /lib/libc.so.6 | grep epoll

 
