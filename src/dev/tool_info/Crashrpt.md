Crashrpt
under the New BSD license.
http://crashrpt.sourceforge.net/docs/html/getting_started.html

������ ���ø����̼�(MS vc++) ũ���� ����Ʈ ���α׷�.

Dr. Watson(XP)
Dr. Watson is able to intercept unhandled SEH (Structured Exception Handling, SEH) exceptions in user-mode programs, and in OS modules.
Dr.Watson -> MS ���� -> ������
���� ����Ʈ�� �����ϱ� ���� ����-��Ƽ ���� �̿뿡 ������.
����� ���� �������̽���, ����Ʈ ������ Ŀ�����ϱ⿡ ������.

WER(Windows Error Reporting)(Vista)
����
    Ŭ���� �ҽ�
	���� ������ ����Ʈ�� �����Ҽ� ����, ���� ����Ʈ�� ������ ��������(USD1500)

Crashrpt
CrashRpt is the fact that you have to distribute additional binaries (dbghelp.dll, CrashRpt.dll, CrashSender.exe)

CrashRptdll, CrashSender.exe || CrashRptProbe.dll, crprober.exe


C runtime libraries (CRT) as a Multi-threaded DLL (/MD compiler flag
All modules in the client application must be linked to the same version of CRT DLL in order to use CrashRpt

--------------------------------------------------------------------------------------
���� �ڵ鸵 : http://crashrpt.sourceforge.net/docs/html/exception_handling.html