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
�ܼ���� ��� �α� ���
/PAUSE
�۾��������� �Ͻ�����



installer.exe
/S : stepâ ����� ����
/D="��ġ�� ���"

3.2.2 Uninstaller Specific Options
_?= sets $INSTDIR. It also stops the uninstaller from copying itself to the temporary directory and running from there. It can be used along with ExecWait to wait for the uninstaller to finish. It must be the last parameter used in the command line and must not contain any quotes, even if the path contains spaces.
uninstaller.exe /S _?=C:\Program Files\NSIS
# uninstall old version
ExecWait '"$INSTDIR\uninstaller.exe" /S _?=$INSTDIR'
--------------------------------------------------------------------------------

!define

$DESKTOP : ����Ʈž
$INSTDIR : ��ġ�Ǵ�_���
$SMPROGRAMS : ��ŸƮ�޴�-���α׷���

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
file b1.nsi # OutPath�� ������ ������ �ִ� ������ �����Ѵ�.
sectionEnd


# ���ν��緯 ���� �̸��� �׻� Uninstall
section
writeUninstaller "$INSTDIR\uninstall.exe"
sectionEnd
section "Uninstall"
delete $INSTDIR\uninstaller.exe
delete $INSTDIR\test.txt
sectionEnd

# ��Ƽ�� ���ν��緯 ���ǿ��� un.�� �ٿ�����
section "un.Hello"

# �ٷΰ��� ����
createShortCut "$SMPROGRAMS\��ũ��.lnk" "�������ϸ�"

# ��������Ȯ��
readRegStr $0 HKLM "SOFTWARE\JavaSoft\Java Runtime Environment" CurrentVersion

# ��� seciton���ٵ� ���� ���۵Ǵ� �ݹ��Լ�.
Function .onInit



!include LogicLib.nsh # �������̺귯�� if case for while ���
# MUI2 (Mordern UI 2) : http://nsis.sourceforge.net/Docs/Modern%20UI%202/Readme.html

var�� �����Ѱ� ��𼭳� ���ٰ��� global

register��
$0, $1, $2, $3, $4, $5, $6, $7, $8, $9, $R0, $R1, $R2, $R3, $R4, $R5, $R6, $R7, $R8, $R9
push, pop�������


Detail��ư ������ ������ �޽���
DetailPrint "�����"


# �ּ�
;, #, /* */


plugin::command [parameters]

���ڿ� escape quote: $\
escape ���ڵ� : $$, $\r, $\n, $\t 

var /GLOBAL blabla ; �������� blabla


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
zlib�� ����Ʈ�̸�,  ����ȿ���� lzma�� �������