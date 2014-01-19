http://nsis.sourceforge.net/Simple_tutorials
http://hasu0707.tistory.com/entry/NSIS-Pages-%EC%97%90-%EB%8C%80%ED%95%98%EC%97%AC2

--------------------------------------------------------------------------------
makensis script.nsi 
/V
0=no output
1=errors only
2=warnings and errors
3=info, warnings, and errors
4=all output.
/O
콘솔출력 대신 로그 출력
/PAUSE
작업종료전에 일시정지



installer.exe
/S : step창 띄우지 않음
/D="설치될 장소"

3.2.2 Uninstaller Specific Options
_?= sets $INSTDIR. It also stops the uninstaller from copying itself to the temporary directory and running from there. It can be used along with ExecWait to wait for the uninstaller to finish. It must be the last parameter used in the command line and must not contain any quotes, even if the path contains spaces.
uninstaller.exe /S _?=C:\Program Files\NSIS
# uninstall old version
ExecWait '"$INSTDIR\uninstaller.exe" /S _?=$INSTDIR'
--------------------------------------------------------------------------------

!define

$DESKTOP : 데스트탑
$INSTDIR : 설치되는_경로
$SMPROGRAMS : 스타트메뉴-프로그램즈

outFile "b1.exe"
section
sectionEnd


messageBox MB_OK "hello"

fileOpen $0 "$DESKTOP\Hello_world.txt" w
fileWrite $0 "hello world!"
fileClose $0



installDir $DESKTOP
section
setOutPath $INSTDIR
file b1.nsi # OutPath로 설정한 폴더에 있는 파일을 복사한다.
sectionEnd


# 언인스톨러 섹션 이름은 항상 Uninstall
section
writeUninstaller "$INSTDIR\uninstall.exe"
sectionEnd
section "Uninstall"
delete $INSTDIR\uninstaller.exe
delete $INSTDIR\test.txt
sectionEnd

# 멀티플 언인스톨러 세션에는 un.을 붙여야함
section "un.Hello"

# 바로가기 생성
createShortCut "$SMPROGRAMS\링크명.lnk" "실행파일명"

# 레지스터확인
readRegStr $0 HKLM "SOFTWARE\JavaSoft\Java Runtime Environment" CurrentVersion

# 어떠한 seciton보다도 일찍 시작되는 콜백함수.
Function .onInit



!include LogicLib.nsh # 로직라이브러리 if case for while 등등
# MUI2 (Mordern UI 2) : http://nsis.sourceforge.net/Docs/Modern%20UI%202/Readme.html

var로 선언한건 어디서나 접근가능 global

register들
$0, $1, $2, $3, $4, $5, $6, $7, $8, $9, $R0, $R1, $R2, $R3, $R4, $R5, $R6, $R7, $R8, $R9
push, pop영향받음


Detail버튼 누르면 나오는 메시지
DetailPrint "블라블라"


# 주석
;, #, /* */


plugin::command [parameters]

문자열 escape quote: $\
escape 문자들 : $$, $\r, $\n, $\t 

var /GLOBAL blabla ; 전역변수 blabla


$EXEDIR, $EXEFILE, $EXEPATH
$DESKTOP, $WINDIR, $SYSDIR
$QUICKLAUNCH, $STARTMENU, $SMPROGRAMS
$PROGRAMFILES, $PROGRAMFILES32, $PROGRAMFILES64
$COMMONFILES, $COMMONFILES32, $COMMONFILES64


File /r something
Rename $INSTDIR\file.ext $INSTDIR\file.dat


!include
!addincludedir
!addplugindir

!execute


SetCompressor [/SOLID] [/FINAL] zlib|bzip2|lzma
zlib가 디폴트이며,  압축효율은 lzma가 가장높다