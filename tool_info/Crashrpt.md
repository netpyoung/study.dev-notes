Crashrpt
under the New BSD license.
http://crashrpt.sourceforge.net/docs/html/getting_started.html

윈도우 어플리케이션(MS vc++) 크래쉬 리포트 프로그램.

Dr. Watson(XP)
Dr. Watson is able to intercept unhandled SEH (Structured Exception Handling, SEH) exceptions in user-mode programs, and in OS modules.
Dr.Watson -> MS 서버 -> 개발자
에러 리포트를 저장하기 위한 서드-파티 서버 이용에 불편함.
디버거 유저 인터페이스나, 리포트 내용을 커스톰하기에 불편함.

WER(Windows Error Reporting)(Vista)
단점
    클로즈 소스
	로컬 서버상 리포트를 저장할수 없고, 에러 리포트를 볼려면 돈내야함(USD1500)

Crashrpt
CrashRpt is the fact that you have to distribute additional binaries (dbghelp.dll, CrashRpt.dll, CrashSender.exe)

CrashRptdll, CrashSender.exe || CrashRptProbe.dll, crprober.exe


C runtime libraries (CRT) as a Multi-threaded DLL (/MD compiler flag
All modules in the client application must be linked to the same version of CRT DLL in order to use CrashRpt

--------------------------------------------------------------------------------------
예외 핸들링 : http://crashrpt.sourceforge.net/docs/html/exception_handling.html