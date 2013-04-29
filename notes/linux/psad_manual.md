
이번엔 psad을 배우면서 그냥 번역해봤습니다.
오역이 있을지도 모릅니다. 공식 사이트의 manual을 참조하는것을 추천드립니다.
본디 있던 목차는 너무 하단에 있어 위로 올렸습니다.
updated : 2010-04-30,2010-05-12,2010-08-14 - by netPyoung

# PSAD
섹션: 유지보수 명령(8)
업데이트: 3월 2009년
색인 목차로 돌아가기  
목차

이름
사용법
설명
옵션
파일
PSAD 환경 변수
예제
의존성
진단
참고
저자
공헌자
버그
배포

 
## 이름
psad - The Port Scan Attack Detector(포트 스캔 공격 탐지기)  

## 사용법
psad [옵션]  

## 설명

psad는 iptables 로그 메시지를 이용하여 탐지, 경고, 그리고 (선택적으로) 포트 스캔 과 른 의심스러운 트래픽 방지을 방지합니다. TCP스캔을 위해 psad는 TCP플래그를 분석하여 스캔의 타입(syn, fin, xmas, 기타.)를 구분하고, nmap이 제공하는 명령 라인 옵션에 상응하는 스캔을 생성합니다. 추가적으로, psad는 Snort 침입 탐지 시스템 (see http://www.snort.org/)에 포함된 많은 TCP, UDP, ICMP 서명을 ,일반적으로 백도어나, DDoS툴, OS 핑거프린팅 시도나 다른 많은 의심스러운 네트워크 트래픽 을 탐지하기 위해 이용합니다. 기본적으로 psad는 또한 fwsnort(http://www.cipherdyne.org/fwsnort/)에 의해 생성된 규칙모음을 이용하여 iptables에서 직접적으로 탐지된 스노트 규칙에 대한 경고를 제공합니다. 이것은 psad로 하여금 어플리케이션 계층 공격에 대해 경고를 보내는것을 가능케 합니다. psad 는 위험 임계값을 (센스있게 제공된 기본값과 함께)높게 설정할 수 있는 특징을 가집니다. 이것은 관리자가 포트 스캔 혹은 다른 의심스러운 트래픽의 구성 정의를 허용한다는 것입니다. psad에 의해 보내지는 Email 경고는 스캔된 ip, 각 포트에 보낸 패킷의 수, (일치되는 어떤 TCP, UDP, ICMP 서명(예. "NMAP XMAS 스캔") ), 스캔된 포트 범위, 현제 위험 레벨(1에서 5), 역방향 dns 정보, 그리고 whois 정보를 포함합니다. psad는 또한 스캔의 근원지로 수동적 원격 운영체제 핑거프린팅하기 위해 (방법에 있어서는p0f 핑거프린팅과 유사합니다) TCP SYN패킷과 관련된 다양한 패킷 헤더 필드를 이용합니다. 로깅 정책을 위해 --log-tcp-options이 필요합니다.; 만약 이 옵션이 사용되지 않는다면, psad는 packet 길이, TTL와 TOS 값, IP ID, 그리고 TCP window sizes사용하는 핑거프린팅 방법에 무너질 것입니다.

psad는 모든 kern.info 메세지를 파이프로 명명된/var/lib/psad/psadfifo 에 작성하도록 하여 syslog를 설정합니다. 그런다음 파이프 밖의 , 방화벽에 의해 기록된(그리고 아마 드롭된), 어떤 패킷을 잡도록 디자인된 문자열과 일치하는, 모든 메세지를 읽습니다. 이러한 경우에 psad는, 방화벽이 네트워크에 들어오는게 부적절하다고 간주한 패킷들을 제외한 순수한 데이타 스트림을 제공합니다. psad는 3개의 데몬으로 구성되어 있습니다 : psad, kmsgsd, 그리고 psadwatchd. psad는, 어떤 파입의 스캔이 머신 과/혹은 네트워크에 적용되었는지 판단할 목적으로 서명 로직이 적용되고, 방화벽에 의해 기록된 모든 패킷들을 처리할 책임이 있습니다. kmsgsd는 지정된 파이프 /var/lib/psad/psadfifo에 쓰여진 모든 메세지를 읽고, 특정 정규 표현식(혹은 문자열)과 일치하는 어떤 메시지를 /var/log/psad/fwdata에 작성합니다. psadwatchd는 데몬이 어떤 이유에 의해 죽으면 다른 두 데몬들을 재시작시켜주는 경비견 소프트웨어입니다.  

## 옵션

-A, --Analyze-msgs

    스캔을 위한 iptables로그 파일을 분석하고 종료합니다. 정상적인 psad프로세스가 탐지한 모든 로그와 같은 경고 email 생성합니다. 기본적으로 이전 탐지에 대한 구문 분석된 psad데이터 파일은 /var/log/psad/fwdata이나, --messages-file 명령 라인 옵션을 통해 다른 파일을 지정할 수 있습니다. 예를들어, 여러분의 /var/log/messages파일을 지정하는 것도 상당히 유용할 것입니다. 

-i, --interface <인터페이스>

    psad가 iptables 로그메시지를 검사할 인터페이스를 지정합니다. IN=은 INPUT과 FORWARD체인에 로그된 패킷을 위한 인터페이스이고, OUT=은 OUTPUT체인에 로그된 패킷을 위한 것입니다. 

--sig-update

    psad에게 http://www.cipherdyne.org/psad/signatures로부터 최신 스노트 서명을 다운로드 하도록 지시합니다. 이로서 psad는새로운 릴리즈가 만들어지기전에 서명을 업데이트할 수 있는 이점이 있습니다. 

-O, --Override-config <파일>

    보통 /etc/psad/psad.conf 파일로 읽어들여지는 환경변수 값을 지정한 파일의 값으로 대처합니다. 설정파일을 중접하면 콤마로 구분합니다. 

-D, --Dump-conf

    현제 psad 설정을 STDOUT으로 덤프후 종료합니다. home network, alert email 주소, DShield 유저 ID와 같은 정보는 출력결과에서 제외됨으로, 다른이에게 이것을 보내도 안전합니다. 

-F, --Flush

    만약 psad가 자동적으로 scan에 응답하도록 설정되었다면, 자동 생성된 방화벽 정책을 제거합니다. (psad.conf에 있는 ENABLE_AUTO_IDS 변수를 확인합니다.). 

-S, --Status

    동작하는지 그렇지 않은지에 대한 psad 프로세스 상태를 보여줍니다. 상태 출력물은, psad가 동작할때 모든 처리한 IP 주소와 네트워크에서 감지된 현제 위험레벨을 포함한, 패킷들을 나열합니다. 

--status-ip <ip>

    iptables에 기록된 최근 10개의 프로토콜 패킷 카운터와같은 ip에 관련된 정보를 보여줍니다. 

--status-dl <dl>

    탐지된것이 최소 dl의 위험레벨에 도달했을 경우 상태 정보를 보여줍니다. 

--status-summary

    psad에게 --Status와 --Analyze모드로부터 자세한 IP정보를 출력하도록 지시합니다. 

-m, --messages-file <파일>

    이 옵션은 분석모드에 있어 구문 분석될 파일을 지정합니다(참조 --Analyze-msgs 옵션). 기본 경로는 psad 데이터 파일 /var/log/psad/fwdata. 입니다. 

--CSV

    psad에게 iptables 로그 메시지를 구문 분석하여 /var/log/messages로 보내라고 지시합니다. (기본적으로, 이 경로는 -m옵션으로 변경할 수 있다.) 그리고 STDOUT으로 콤마로 구분된 형식으로 패킷 필드를 출력합니다. 이것은 AfterGllow와 함께 iptables 로그 데이터를 그래프화 할때 유용합니다. (참고 http://afterglow.sourceforge.net/index.html). 

--CSV-fields <tokens>

    psad에게 특정 iptables 로그 메시지 필드의 셋을 CSV출력에 포함하도록 지시합니다. AfterGlow는 데이터 그래프를 위해 3개의 인자를 허용합니다. 보통 출발지와 목적지 IP주소와 목적지 포트 번호를 출력하기 위해 "src dst dp" 옵션을 사용합니다. 

-K, --Kill

    현제 psad프로세스를 psadwatchd, kmsgsd와 함께 종료합니다. 이것은 모든 psad프로세스를 죽이는 프로세스 테이블 찾아보거나 psad-init 스크립트에 매달릴 필요가 없는 빠르고 쉬운 길을 제공합니다. 

-R, --Restart

    현제 동작하는 psad 프로세스를 재시작 합니다. 이 옵션은 기존 psad프로세스에 적용한 명령 라인 옵션을 유지합니다. 

-U, --USR1

    동작중인 psad프로세스에게 USR1 signal을 보냅니다. 이것은 psad로 하여금 "/var/log/psad/scan_hash.$$"파일에 있는 %Scan 해쉬를 덤프하도록 합니다. "$$"는 psad프로세스 pid를 나타냅니다. 이것은 디버깅 작업에 매우 유용하고, 관리자가 시스템 메모리에 있는 스캔 데이터에 사용되던 주 데이터 구조인 %Scan hash를 자세히 들여다 보는것을 허용합니다 

-H, --HUP

    운영중인 모든 psad데몬에게 HUP 시그널을 보냅니다. 이것은 데몬에게 프로세스에서 탐지한 데이터의 손실 없이 각각의 설정 파일을 다시 읽도록 지시합니다 

-B, --Benchmark

    psad를 벤치마크 모드로 실행합니다. 기본 벤치마크 모드는 10,000개의 패킷 스캔을 시뮬레이션하고(참조 --packets 옵션), 경과시간을 보고합니다. 이것은 psad가 특정 머신에서 얼마나 빨리 패킷을 처리할 수 있는지 알아보는데 유용합니다. 

-p, --packets <패킷>

    벤치마크 모드에서 사용할 패킷의 수를 지정합니다. 기본은 10,000패킷 입니다. 

-d, --debug

    psad를 디버깅 모드로 실행합니다. 이것은 psad가 자동적으로 데몬으로 실행되는것을 방지하고, psad 실행에 있어 %Scan 해쉬와 몇몇 다른 중요한 점을 STDOUT에 출력합니다. 

-c, --config <설정-파일>

    기본적으로 모든 psad는 대다수의 환경 변수들을 위해 /etc/psad/psad.conf 설정파일을 이용합니다. psad는 명령라인 --config 옵션으로 다른 특정파일을 지정하여 덮어쓸 수 있습니다. 

--signatures <서명-파일>

    linux 2.4.x kernel 시리즈에 포함된 iptables 방화벽 코드는 방화벽 인터페이스에서 돌아다니는 TCP패킷들의 flag를 분간할 능력을 가지고 있습니다. psad 는 이러한 로그 능력을 사용하여 특정 타입의 TCP스캔 서명을 /etc/psad/signatures.에 포함하였습니다. 이 서명은 본디 스노트 침입 탐지 시스템에 포함되어 있었습니다. 새로운 서명들을 추가하거나 이미 존제하는 서명을 수정하여 파일로 만들 수 있습니다. 그리고 psad가 HUP 시그널(--HUP 명령 라인 옵션 참조)을 받으면 프로시저를 재시작없이 수정사항을 가져올 것입니다. 또한 psad는본디 스노트에 포함되었던 많은 UDP와 ICMP서명을 탐지합니다. 

-e, --email-analysis

    --Analyze-msgs로 실행될때 경고 email을 보냅니다. --email-analysis옵션은, iptables 로그 파일크기에 의존적이고, 탐지된 IP주소에 대한 일반적인 DNS와 whois조회와 더블어 psad의 실행시간을 증가시킬 수 도 있습니다. 보통 이러한 조회는 --no-rdns 와 --no-whois옵션으로 각각 사용하지 않을 수 있습니다. 

-w, --whois-analysis

    기본적으로 psad는 --Analyze-msgs 모드로 동작하고 있을경우 whois조회를 하지 않습니다. --whois-analysis옵션은 이러한 속성을 추가하고, psad에게 스캔이나 다른 수상한 트래픽을 유발한 IP주소에 대한 whois 조회를 하도록 지시합니다. 

--snort-type <타입>

    스노트 sid타입을 타입으로 제한합니다. 허가된 매치 타입의 파일 이름은 "ddos", "backdoor", 와 "web-attacks"같은 스노트 규칙파일로 부터 얻습니다. 

--snort-rdir <스노트-규칙-파일>

    직접 스노트 규칙 파일이 위차하고 있는 디렉토리를 지정합니다. 기본 값은 /etc/psad/snort_rules입니다. 

--passive-os-sigs <수동적-os-서명-파일>

    직접 수동적 운영체제 핑거프린팅 서명 파일의 위치를 지정합니다. 기본 값은 /etc/psad/posf입니다. 

-a, --auto-dl <자동-위험레벨-파일>

    때때로 특정 IP주소가 공격자로써 반복해서 나타나면 일반적으로 할당된 위험레벨을 자동적으로 높게 설정됩니다. 추가적으로, 몇몇 IP주소는 항상 무시하게 됩니다(좋은 예로 루프백 인터페이스 127.0.0.1이 있습니다). /etc/psad/auto_dl는 psad 에게 스캐닝 IP 위험 레벨을 자동적으로 증가/감소/무시하는 인터페이스를 제공합니다. auto_dl(기본적으로 /etc/psad에 설치됨)을 통해 수정이 가능하고, psad는 'psad -H'나 psad 프로세스를 재시작할때 그것을 추가합니다. 

--fw-search <fw_search-file>

    기본적으로 모든 psad는 방화벽 검색모드와 문자열 검색을 위해 방화벽 검색 설정 파일로 /etc/psad/fw_search.conf를 이용합니다. psad는 --fw-search option으로 이러한 경로를다른 파일로 대처할 수 있습니다. 

--fw-list-auto

    iptables채인에 있는 모든 정책을 psad 자동-차단 모드로 이용합니다. 

--fw-analyze

    로컬 iptables 정책을 분석하고, 에러가 발견된다면 경고를 보내고, 종료합니다. 

--fw-del-chains

    일반적으로, ENABLE_AUTO_IDS 가 "Y"로 설정되었으면 psad는 --Flush옵션을 주지않는한 자동생성된 iptables 체인들을 제거하지 않습니다(psad.conf에 있는 IPT_AUTO_CHAIN참조) . --fw-del-chains 옵션은 이러한 속성을 무효로하고, 동작중인 iptables 방화벽에서 auto-blocking 체인들을 제거합니다. 

--fw-dump

    psad에게 로컬 시스템에서 운영중인 iptables 규칙 내용을 덤프하도록 지시합니다. 모든 IP 주소들이 결과 출력에는 제거가 되고, 따라서 이것은 psad list 혹은 다른이와 소통할때 안전합니다. 이 옵션은 주로 --Dump-conf와 함께 사용됩니다. 

--fw-block-ip <ip>

    psad에 의해 자동 생성된 iptables 컨트롤에 추가될 IP주소 혹은 네트워크를 지정합니다. 이것은 psad에게 rule timeout을 관리하는것을 허가케 합니다. 

--fw-rm-block-ip <ip>

    psad에 의해 자동 생성된 iptables 컨트롤에서 제거할 IP주소 혹은 네트워크를 지정합니다. 

--fw-file <정책-파일>

    현제 로컬 시스템에 로드된 ruleset대신에 정책-파일에 포함된 iptables ruleset을 분석합니다. 

--CSV-regex <정규식>

    psad에게 제공된 정규식에 부합되는 CSV데이터만 출력하도록 지시합니다. 이 정규식은 전체 iptables 로그 메시지 각각에 이용되어집니다. 

--CSV-neg-regex <정규식>

    psad에게 제공된 정규식에 부합되지 않는 CSV데이터만 출력하도록 지시합니다.. 이 정규식은 전체 iptables 로그 메시지 각각에 이용되어집니다. 

--CSV-uniq-lines

    psad에게 고유 CSV데이터만 출력하도록 지시합니다. 따라서, --CSV 모드로 출력되는 각 라인은 고유한 것이 됩니다. 

--CSV-max-lines <번호>

    psad가 STDOUT에 생성할 CSV-포맷 라인 수를 제한합니다. 이것은 AfterGlow 그래프가너무 복잡하지 않도록 만드는것을 도와줍니다. 

--CSV-start-line <번호>

    --CSV 출력 모드의 iptables 로그 파일을 분석하여 나오는 시작 라인 번호를 지정합니다 로그 파일이 상당히 클때와, 여러분이 파일의 특정 위치에서 분석하길 원할때 매우 우용합니다. 기본값은 파일의 시작 부분입니다. 

--CSV-end-line <번호>

    --CSV 출력 모드의 iptables 로그 파일을 분석을 중단할 마지막 라인 번호를 지정합니다. 이것은 로그 파일이 상당히 크고, psad가 전체 작업을 진행하기 원하지 않을때 유용합니다. 

--gnuplot

    psad가 ptables로그 파일을 분석한 것에 대해 Gnuplot 모드로 진입하고, Gnuplot의 그래프작업에 적합하도록 .gnu 와 .dat 파일을 생성합니다 다양한 --CSV명령 라인 인자들로 하여금 iptables로그와 Gnuplot를 엮어서 적용 합니다 

--gnuplot-template <파일>

    Gnuplot 그래핑 지시어를 위한 템플릿 파일을 이용합니다(이것은 보통 .gnu파일로 변환된 것입니다). 보통, --gnuplot 명령 라인 인자를 기초로 하여 psad는 그래핑 지시어를 구축하지만, --gnuplot-template은 이러한 것을 덮어쓰도록 하는것을 허용합니다. 

--gnuplot-file-prefix <파일>

    --gnuplot모드에 의해 생성될 접두사 gnu, .dat, and .png파일를 지정합니다. 따라서, iptables로그 파일에 의해 잡은 공격들을 시각화할때, psad는 portscan.dat, portscan.gnu 두 파일을 생성하고, Gnuplot는 portscan.gnu파일이 로드될 portscan.png 파일을 추가적으로 생성하는데에서 여러분은 이 옵션을 이용할 수 있습니다. 

--gnuplot-x-label <레이블>

    x-축과 관련된 레이블을 설정합니다.. 

--gnuplot-x-range <범위>

    x-축의 범위를 설정합니다. 

--gnuplot-y-label <레이블>

    y-축과 관련된 레이블을 설정합니다.. 

--gnuplot-y-range <범위>

    y-축의 범위를 설정합니다. 

--gnuplot-z-label <레이블>

    z-축과 관련된 레이블을 설정합니다. (--gnuplot-3D를 사용할 때만) 

--gnuplot-z-range <범위>

    z-축의 범위를 설정합니다. (--gnuplot-3D를 사용할 때만) 

--gnuplot-3D

    Gnuplotsplot그래프를 생성합니다. 결과물은 3-차원 그래프입니다. 

--gnuplot-view

    --gnuplot-3D그래프 데이터모드일때 시점을 설정합니다. 

--gnuplot-title <표제>

    Gnuplot 그래프의 표제를 답니다. 

-I, --Interval <초>

    psad가 방화벽에 의해 패킷이 로그되었는지 확인하는 간격(초단위)을 지정합니다 특정 값을 지정하지 않으면 psad는 기본값으로 15초를 이용합니다. 

-l, --log-server

    이 옵션은 psad가 syslog 로깅 서버에서 실행될때 사용됩니다. 로깅서버에서 운영중인 psad는, 방화벽은 아마 로컬로 실행되지 않기 때문에, check_firewall_rules()와 auto_psad_response()가 실행되지 않습니다. 

-V, --Version

    psad의 버전을 출력하고 종료합니다. 

--no-daemon

    psad를 데몬상태에서 실행시키지 않습니다. 이 옵션은 스캔 경고를 이메일해서 보내는 대신 STDOUT으로 보여줍니다. 

--no-ipt-errors

    때때로 syslog에 의해 쓰여진 iptables 메세지 /var/lib/psad/psadfifo혹은 /var/log/messages는 klogd가 사용하고있는 커널링 버퍼가 가득차면 일반 방화벽 로깅 형식을 따르지 않을 수 있습니다. psad는 기본적으로 이러한 메시지를 /var/log/psad/errs/fwerrorlog에 씁니다. --no-ipt-errors 옵션을 통해서 psad가 잘못된 모든 방화벽 메세지를 무시하도록 만듭니다. 

--no-whois

    기본적으로 psad는 스캔한 곳의 ip에 대해서 whois쿼리를 발생하게 되고, 명령 라인 인자 --no-whois 로 이러한 것을 사용하지 않을 수 있습니다. 

--no-fwcheck

    psad는 방화벽 ruleset에 대해 머신의 방화벽의 설정이 psad와 호환성이 있는지에 대한 기초적인 검사를 수행합니다 (즉. iptables 은 패킷을 기록하도록 구성되었습니다). --no-fwcheck 나--log-server 옵션을 통해 이러한 검사를 하지 않습니다. 

--no-auto-dl

    자동 위험 레벨 보조를 사용하지 않습니다. 이것은 어떤 ID주소나 네트워크를 파일로부터 추가하지 않습니다. /etc/psad/auto_dl. 

--no-snort-sids

    스노트 sid 프로세싱 모드를 사용하지 않습니다. 이것은 psad에게 스노트 규칙( fwsnort에 의해 생성된 정책에 있는 스노트 SID 매칭)을 포함하지 않도록 지시합니다 

--no-signatures

    psad 서명 작업을 하지 않습니다. 이것은 fwsnort 에 의해 생성된 iptables 메시지 속 snort SID 매칭과 ICMP 타입/코드 유효성에 대해 의존적입니다. 

--no-icmp-types

    ICMP타입과 코드 필드 유효성을 사용하지 않습니다. 

--no-passive-os

    기본적으로 psad는 스캔의 근원지 원격 운영체제에 대해 수동적 핑거프린팅을 시도합니다. --no-passive-os 옵션을 통해 이 기능을 사용하지 않습니다. 

--no-rdns

    psad는 보통 IP 주소 스캐닝을 통해 이름을 얻도록 시도합니다. 그러나 이 기능은 명령 라인 인자 --no-rdns로 사용하지 않을 수 있습니다. 

--no-kmsgsd

    kmsgd를 시작하지않습니다. 이 옵션은 개인의 iptables메시지와 함께 디버깅할때 매우 유용합니다. 왜냐하면 새로운 메시지는 /var/log/psad/fwdata에 추가되지 않기 때문입니다. 

--no-netstat

    기본적으로 iptables 방화벽 psad는 어느 TCP서명이 일치하면 여러분의 머신의 port 리스닝 여부를 결정합니다 --no-netstat을 지정하면 이 기능을 사용하지 않습니다. 

-h, --help

    psad의 사용 정보를 출력하고 종료합니다. 

 
## 파일

/etc/psad/psad.conf

    아레에 있는 단락의 환경변수를 포함하는 psad의 주 설정파일 입니다. 

/etc/psad/fw_search.conf

    psad와 kmsgsd의 iptables메세지를 분석하는 전략을 정하는데 이용됩니다. 이 파일의 구성 지침을 이용하여, psad는 모든 iptables의 구문분석이나 특정 로그문자열의 접두사의 일치를 구성할 수 있습니다(참조 iptables의 --log-prefix 옵션). 

/etc/psad/signatures

    psad 가 위험한 트래픽을 인지하기 위해 사용하는 서명을 포함합니다. 서명은 스노트 IDS에서 아용되었던 *lib서명 파일과 유사한 방식으로 쓰여졌습니다. 

/etc/psad/icmp_types

    RFC 792에 정의된 모든 유효환 ICMP타입코드와 응답코드를 포함하고 있습니다. 기본적으로 ICMP 패킷들이 이 값에 대해 유효하지만, iptables에 의해 기록된 ICMP패킷이 일치하지 않는다면 경고를 생성합니다. 

/etc/psad/snort_rules/*.rules

    --no-snort-sids 명령 라인 인자를 주지 않는한, 기본적으로 참고하는 스노트 규칙 파일입니다. 

/etc/psad/auto_dl

    할당된 위험 레벨에 기반으로 방화벽에의해 기록된 트래픽의 IP주소를 포함하고 있습니다. 문법은 "<IP 주소> <위험 레벨>" 입니다. <위험 레벨> 은 0에서 5사이의 정수이며, 0은 <IP 주소>로 부터 모든 트래픽을 무시하는것을 의미합니다. 그리고 5는 <IP 주소>에 최고 위험 레벨을 할당합니다. 

/etc/psad/posf

    모든 수동적 운영체제 핑거프린팅 서명 리스트를 포함하고 있습니다. 이러한 서명은 다양한 운영체제의 고유한 패킷의 길이, ttl, tos, IP ID, 그리고 TCP widow size 값을 포함하고 있습니다. 

 
## PSAD 환경 변수

이번 단락에서는 중요 psad환경 변수이 각각의 어떤 일을 하는지, 그리고 어떻게 여러분이 필요를 만족하게 바꿀수 있는지에 대해 설명합니다. 대다수의 변수들이 psad설정파일 /etc/psad/psad.conf 에 위치하고 있지만, FW_SEARCH_ALL 와FW_MSG_SEARCH 변수는/etc/psad/fw_search.conf에 위치하고 있습니다. 각각의 변수는 설치 과정동안, 대부분의 네트워크 구성에 대해 합리적인 기본값이 할당됩니다. psad설정 키워드에 대해 더 많은 정보를 다음에서 찾을 수 있습니다 : http://www.cipherdyne.org/psad/config.html

EMAIL_ADDRESSES

    경고 메일이 보내질 콤마로-구분된 이메일 주소 목록을 포함하고 있습니다. 기본값으로는 "root@localhost"입니다. 

HOSTNAME

    psad를 운영하는 머신의 호스트네임을 정의합니다. 이것은 psad에의해 생성된 경고 메일에서 사용됩니다. 

HOME_NET

    로컬 시스템에 연결되어있는 내부 네트워크(들)를 정의합니다. 이것은 항상 출발지와 목적지 네트워크를 포함하고 있고, 어떤 트래픽이 스노트 규칙에 부합하는지 판단하기 위해, 서명 매칭 코드에 이용되어 집니다. 다수의 네트워크들이 콤마로 구분된 목록으로 구성되고, 각각 네트워크들은 CIDR 표기법으로 기술되었습니다. 보통 HOME_NET변수에 있는 네트워크(들)는 psad를 운영중인 머신에 직접적으로 연관되어 있습니다. 

IMPORT_OLD_SCANS

    psad를 재시작하거나, 심지어 장치를 재부팅시킬때 스캔 데이터를 유지합니다 이것은 psad가 작성한 파일시스템캐쉬에 있는 데이터내용을 importing하여, psad가 시작할때 메모리에 올려놓습니다. 파일 시스템 캐쉬 데이터는 /var/log/psad디렉토리에 보관되어있습니다. 

FW_SEARCH_ALL

    iptables 메세지를 분석하기 위해 사용하는 psad의 탐색모드를 정의합니다. 대다수의 사람들이 스캔 방식을 분석하기 위해 모든 iptables로그 메시지를 원하기 때문에, 기본적으로 FW_SEARCH_ALL 는 "Y"로 설정되었습니다. 그러나, 만약 FW_SEARCH_ALL가 "N"로 설정돼었다면, psad는 오직 --log-prefix옵션과 함께 iptables 로그에서 보이는 특정 문자열 검색 로그 메세지만 분석합니다. 이것은 psad를 오직 특정 iptables 체인이나 정책의 동작에 관해 제한하는데에 있어 유용합니다. 찾을 문자열은 FW_MSG_SEARCH변수에 정의되었습니다(아레를 참조합니다). FW_SEARCH_ALL 변수는 /etc/psad/fw_search.conf파일에 정의되었고, 이것은 psad와 kmsgsd에 참조되어 집니다. 

FW_MSG_SEARCH

    스캔 방식을 분석할 수 있도록, psad가 iptables메세지를 식별하는데 사용할 검색 문자열을 설정합니다. 이런 검색 문자열들은 --log-prefix옵션과 함께 iptables룰셋에 서술되어있는 log prefix문자열과 비교하고, FW_MSG_SEARCH의 기본값은 "DROP"입니다. 참고하자면, psad는 일반적으로 모든 iptables메세지들을 분석하고, FW_MSG_SEARCH변수는 FW_SEARCH_ALL (위에 보이는)가 "N"으로 설정되어있을 때만 필요합니다. FW_MSG_SEARCH변수는 psad 와 kmsgsd에 참조되어지며, 이것은 /etc/psad/fw_search.conf파일에 있습니다. 

SYSLOG_DAEMON

    psad와 소통할 특정 syslog데몬을 정의합니다. Psad는 3개의 syslog 데몬들을 지원합니다 : syslogd, syslog-ng, 그리고 metalog. SYSLOG_DAEMON의 기본 값은 syslogd입니다. 

IGNORE_PORTS

    psad가 철저히 무시할, 포트 범위와/혹은 개별 포트 목록과 상응하는 프로토콜을 지정합니다. 이것은 종종 포트노킹 문법(fwknop와 같은http://www.cipherdyne.org/fwknop/))에 사용되는 포트를 무시할때 유용합니다. (노크 순서에 의해 생성된) network 인증을 위한 로그 메시지들이 스캔에 의해 다르게 해석되어질지도 모릅니다. 멀티 포트들 과/혹은 포트 범위는 콤마-구분자로 분리되있습니다. 예시."tcp/22, tcp/61000-61356, udp/53". 

ENABLE_PERSISTENCE

    만약 "Y"로 되어있으면, psad는 메모리에 있는 모든 검사를 유지하면서 그것들이 timeout전까지 놔주지 않습니다. IDS 임계값 아레로 슬그머니 들어가려고 공격자가 시도할때, 단지 몇몇 포트를를 오랫동안 스캐닝 하는것으로 스탤스 스캔을 탐지할때 도움을 줍니다. ENABLE_PERSISTENCE는 기본적으로 "Y"로 설정되었습니다. 

SCAN_TIMEOUT

    만일 ENABLE_PERSISTENCE가 "N" 으로 되면, psad는 SCAN_TIMEOUT에 설정된 값을 이용하여 스캔 임계값 계산을 통해 패킷을 제거합니다. 기본값은 3600초(1시간)입니다. 

DANGER_LEVEL{1,2,3,4,5}

    psad는 초과시간에 도달한("danger level"을 나타냅니다) 스캔에 대한, 심각도를 추적하기 위해 스코잉 시스템을 사용합니다. DANGER_LEVEL{n}값은, psad가 스캔에 대해 각각의 위험레벨을 할당하기전에, 방화벽에 의해 버려질 패킷의 수를 정의합니다. 만일 서명파일에 있는 특정 서명과 일치한다면, 스캔에 대해 위험레벨 또한 할당할 수도 있습니다. 다섯가지의 위험 레벨이 있습니다(최소1, 최대 5). 위험레벨을 계산하는데 있어 영향을 미칠수 있는 여러 요인들: /etc/psad/signatures에 있는 서명과 일치하는지, PORT_RANGE_SCAN_THRESHOLD값(아레 참조), 스캔된 IP가 /etc/psad/auto_dl파일에 있는지, 마지막으로 scans의 timeout이, (위에)SCAN_TIMEOUT에 정의된 것에 대해, 허용되는지. 만약 서명이 일치하거나 스캐닝 IP가 /etc/psad/auto_dl에 있으면, 그에 상응하는 위험레벨이 자동적으로 할당될 것입니다. 

PORT_RANGE_SCAN_THRESHOLD

    경고를 보내기전 하위 포트와 상위포트 사이에서 스캔된 최소 차이를 정의합니다(기본값은 1인데, 이것이 의미는 적어도 2개의 포트에서 스캔되어야 경고를 생성합니다). 예를들면, signature속에 특정한 서명이 없고, 하나의 ip가 반복하여 단일 포트에서 스캔된다고 가정합니다. 만일 PORT_RANGE_SCAN_THRESHOLD=1이라면, psad는 얼마나 많은 패킷들이 이 포트로 보내졌는지 상관치않고 이 스캔에 대해 결코 경고를 보내지 않습니다.(DANGER_LEVEL1값과는 아무런 상관이 없습니다) 기본값이 1인 이유는, 보통 "스캔"이 의미하는 것은 적어도 두 포트 이상에서 감지된 것입니다. 그러나 만일 여러분이 약간의 편집증적(paranoid)으로, 원한다면 psad에게PORT_RANGE_SCAN_THRESHOLD=0으로 설정함으로써 단일 포트에 대한 스캔에 대한 경고도 설정할 수 있습니다.(DANGER_LEVEL1을 초과할만한 긴 패킷수) 

SHOW_ALL_SIGNATURES

    만일 "Y"로 되어있다면, psad는 처음 탐지 된 단일 스캐닝 IP로부터 단순히 새로-발견한 규칙을 보여주는 대신에 모든 규칙들을 보여줄 것입니다. SHOW_ALL_SIGNATURES은 기본적으로 "N"로 설정되었습니다. 모든 규칙들이 리스트된 파일은 /etc/psad/signatures입니다. 

SNORT_SID_STR

    kmsgsd가 찾을 ,스노트규칙을 탐지하게 설계된 iptables 룰에 의해 생성된, iptables로그 메시지 문자열을 정의합니다 기본값은 "SID"입니다. fwsnort(http://www.cipherdyne.org/fwsnort/).를 봅니다. 

ENABLE_DSHIELD_ALERTS

    dshield경고 모드를 활성화시킵니다. 이것은 iptables로그의 분석된 버전을 dshiled.org((무료) 분산 공격 탐지 서비스)로 보냅니다. 더 자세한 정보를 원한다면, http://www.dshield.org/를 봅니다. 

IGNORE_CONNTRACK_BUG_PKTS

    만약 "Y"로 되어있으면, ACK나 RST플래그비트를 가진 모든 TCP 패킷들은 psad에 의해 무시되어질 것입니다 우리는 종종 iptables connection tracking bug의 결과로 위와 같은 패킷들이 막히는 것을 볼 수 있습니다.안내- RST플래그를 이용하는 규칙은 없고, ACK플래그를 이용하는건 매우 드뭅니다. 

ALERT_ALL

    만일 "Y"로 되어있으면, 모든 안좋은 패킷들을 단순히 위험레벨을 올릴 뿐만아니라 email도 보냅니다. ALERT_ALL은 기본적으로 "Y"로 설정되었습니다. 

PSAD_EMAIL_LIMIT

    단일 스캐닝 IP에 대하여 보내질 최대 email갯수를 정의합니다(기본값 50). 이 값은, 여러분의 머신에 IP가 지속적으로 스캔된다면, psad로 부터 보내지는 셀 수 없을 정도로 보내지는 경고로부터, 여러분을 보호합니다. IP가 email한계를 초과하면 psad는 특정한 경고를 발송할 것입니다.. 만일 PSAD_EMAIL_LIMIT이 0으로 설정되면, psad는 한계를 무시하고, 스캐닝된 ip에 대해 경고 메일을 발송할 것입니다. 

EMAIL_ALERT_DANGER_LEVEL

    어느 경보(alert)에 도달해야 메일을 보내는 위험레벨을 정의합니다. 값은 기본적으로 1로 설정되었습니다. 

ENABLE_AUTO_IDS

    psad는, iptables나 tcpwrapper 정책설정을 통해 위험레벨(설정가능)에 도달한, IP에 대해 모든 트래픽을 유동적으로 방어할 수 있는 기능을 가지고 있습니다. IMPORTANT: 이 기능은 기본적으로 사용안함으로 되어 있습니다. 왜냐하면 공격자가 잘 알려진 (웹)사이트의 패킷을 속임으로써 여러분의 머신을 스캐닝하는 것이 가능하기 때문입니다. 따라서 psad는 그것에 대한 모든 접근을 차단합니다. 또한, psad는 방화벽이 이미 버린 패킷들을 위해 방화벽 메시지들을 분석하기도 하는데, 이러한 "스캔"은 어찌됏건 실패하게 됩니다. 그러나 몇몇 관리자는 이러한 위험을 떠안는것을 선호하기도 하는데, 그들은 항상 블록된 사이트들을 분석하고, 필요하다면 수동적으로 블록된것을 지우기도 합니다(--Flush옵션 참고). Your mileage will vary. 

AUTO_IDS_DANGER_LEVEL

    스캔이 위험 레벨에 도달하기 전에 psad가 자동으로 IP를 막도록 정의합니다(ENABLE_AUTO_IDS 가"Y"로 설정되어야 합니다). 

 
## 예제
다음 나오는 예제들은 몇몇 상황에서 psad가 제공하는 명령 라인 인자를 설명합니다 :

서명 체킹, 수동적 OS핑거프린팅, 그리고 자동 IP 위험레벨 할당들은 명령 라인 인자를 지정 할 필요 없이 기본적으로 사용가능합니다(대부분의 상황에 적합):

```
# psad
```

위에 나온 것과 같지만, 이번에는 init 스크립트를 사용하여 psad를 실행해 보겠습니다 :

```
# /etc/init.d/psad start
```

psad를 포렌식 도구로 이전 iptables 로그 파일을 분석합니다(-m 옵션을 지정하지 않으면 psad는 기본적으로 /var/log/messages파일을 분석합니다.):

```
# psad -A -m <iptables logfile>
```

psad를 포렌식 모드로 실행하지만, 특정 IP주소 "10.1.1.1"로 제한합니다 :

```
# psad -A -m <iptables logfile> --analysis-fields src:10.1.1.1
```

AfterGlow를 이용하여 스캔 데이터 그래프를 생성합합니다 :

```
# psad --CSV --CSV-fields src dst dp --CSV-max 1000 -m <iptables logfile> | perl afterglow.pl -c color.properties | neato -Tgif -o netfilter_graph.gif
```

psad.conf,signatures,와auto_dl 파일은 일반적으로 /etc/psad/ 폴더에 위치하지만, 각각의 위치를 바꿀 수 있습니다 :

```
# psad -c <config file> -s <signatures file> -a <auto ips file>
```

방화벽 체크와 로컬 포트 조회 서브루틴을 이용하지 않습니다; syslog 로깅서버에서 psad를 개발할때 매우 유용합니다 :

```
# psad --log-server --no-netstat
```

스캐닝된 IP주소에 대한 역방향 dns와 whois조회를 이용하지 않습니다; psad의 속도를 중시한다면 매우 유용합니다 :

```
# psad --no-rdns --no-whois  
```

## 의존성
psad는 iptables가 명시적으로 통과가 허용되지 않은 어떤 트래픽을 위해 "drop과 log" 정책으로 설정되는것을 요구합니다 이것은 방화벽정책에 의해 차단시키는 모든 트래픽(명시적으로 허용되지 않은)에 대하여 일관성(보안네트워크 구성과 함께)이 있습니다. 기본적으로, psad는 방화벽이 이런 방식으로 구성되었는지 확인합니다. 이 기능은 --no-fwcheck혹은 --log-server 옵션으로 사용하지 않을 수 있습니다. --log-server 옵션은 psad가 방화벽에서 분리된 syslog 로깅서버위에서 운영중일때 유용합니다. iptables ruleset호환에 관한 더 많은 정보를 원한다면, psad 소스 배포본에 동봉된 FW_EXAMPLE_RULES파일을 보십시오.

psad는 또한, 모든 kern.info메세지를 지정된 파이프 /var/lib/psad/psadfifo에게 작성하여, 설정된 syslog가 필요합니다. 간단히

    echo -e 'kern.info |/var/lib/psad/psadfifo' >> /etc/syslog.conf 

이렇게 합니다. 이 파일을 바꾸고 syslog를 재시작 하는것을 기억합니다.  

## 진단
--debug옵션은, 스캔이 방화벽 로그 메시지를 생성하는 동안, psad 데이터 구조에 관한 중요한 정보를 STDOUT으로 보여주는데 이용합니다. --debug는 데몬 모드 실행을 사용하지 않습니다.

다른 더 효과적인 방법은 실행중인 psad에게 (루트 상태에서) USR1시그널을 보내는 것입니다. 그러면 psad는 %Scan 해쉬 내용을 /var/log/psad/scan_hash.$$에 덤프뜰것입니다. $$는 psad프로세스의 pid를 나타냅니다.  

## 참고
iptables(8) kmsgsd(8) psadwatchd(8) fwsnort(8) snort(8) nmap(1) p0f(1) gnuplot(1)  

## 저자
Michael Rash <mbr@cipherdyne.org>  

## 공헌자
오픈 소스 공동체에서 활동하는 많은 이들이 psad에 공헌해 주었습니다. psad소스에 있는 CREDITS파일을 보거나, http://www.cipherdyne.org/psad/docs/contributors.html를 방문하여 공헌자들을 볼 수 있습니다.  

## 버그
mbr@cipherdyne.org로 버그 리포트를 보내주십시오. 제안 혹은 지적 또한 항상 환영합니다.

리눅스 커널 버전 2.4.26의 iptables 방화벽에서, ip_conntrack모듈이 로드되고(혹은 커널속에 컴파일되었으면) 방화벽이 연결 상태를 유지하도록 구성되었으면, firewall state timeouts의 버그때문에 가끔 일반적인 TCP트래픽으로 생각되어질 패킷들을 정확히 인식할 수 없게 되고, 버려지게 됩니다. 이러한 패킷들이 psad에 의해 해석되어질때, 악의적인 행동의 일부가 아니라고 판단해 버립니다. 다행스럽게도, 이러한 문제를 잠정적으로 고치는 것은 단순히 linux/net/ipv4/netfilter/ip_conntrack_proto_tcp.c에 있는TCP_CONNTRACK_CLOSE_WAIT 타임아웃값을 60초에서 2분으로 확장시키는 것입니다. 커널 패치에 관련된 patches/ 디렉토리에 있는 psad소스가 이것을 수정합니다. (커널 재 컴파일이 필요합니다; Kernel-HOWTO를 봅니다.) 또한, 기본적으로 psad.conf에 있는 IGNORE_CONNTRACK_BUG_PKTS값이 "Y"로 되어 있는데, 특정 서명에 일치하는 패킷말고 ACK비트가 설정되어 있는 모든 TCP패칫들을 무시합니다.  

## 배포
psad는 GNU General Public License (GPL)하에 배포되며, 최신 버전은 다음 사이트에서 다운로드 받으실 수 있습니다 : http://www.cipherdyne.org/ Snort는 Sourcefire사의 등록 상표입니다. 