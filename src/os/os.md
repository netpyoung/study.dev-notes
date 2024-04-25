# OS


virtual memory
PC(Program Counter):
IR(Instruction Register):
SP(Stack Pointer)

MMU(Memory Management Unit)
    TLB(Translation Lookaside Buffer)

## Program & Process & Thread & Core

Program - 어떤 작업을 위해 실행할 수 있는 파일
Process |Thread


동시 멀티스레딩 (SMT: Simultaneous Multi-Threading)
   인텔's HTT(Hyper-Threading Technology)
    - 물리상 실행 장치 한 개에 가상 실행 장치(virtual 또는 logical core) 두 개를 할당해 성능을 높이려는 기술이다
    - https://www.intel.co.kr/content/www/kr/ko/gaming/resources/hyper-threading.html


## 유저모드 & 커널모드

https://learn.microsoft.com/ko-kr/windows-hardware/drivers/gettingstarted/user-mode-and-kernel-mode

커널모드
모든 자원에 대한 접근 권한을 가진다. 드라이버, CPU, 메모리등 모든 접근이 가능하다.

유저모드에서 커널모드로

인터럽트
시스템 콜


크리티컬 섹션은 스레드 간 공유 자원에 대해서 배타적으로 접근해야 하는 작은 코드의 집합을 의미합니다.
 프로세스 간의 동기화 객체는 제어할 수 없습니다. 이럴 때는 커널 모드의 동기화 객체를 사용해야 합니다.



- [인터럽트와 시스템 콜을 설명합니다! 당연히 유저 모드, 커널 모드도 설명해야겠죠? 그런데 이 모든게 프로그래밍 언어와 무슨 상관이냐구요?? 상관있죠! 왜 상관있냐면요..! ](https://www.youtube.com/watch?v=v30ilCpITnY)