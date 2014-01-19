

소스코드 다운로드 : http://res.sysnet.pe.kr/book/source/index.html
6장에서 만드는 SQL 데이터베이스 파일 : http://res.sysnet.pe.kr/book/book_db_file.zip


공지: 도서: 시작하세요! C# 프로그래밍: 기본 문법부터 실전 예제까지 : http://www.yes24.com/24/goods/11257753?scode=032&OzSrank=1
 http://www.sysnet.pe.kr/Default.aspx?mode=2&sub=0&detail=1&pageno=0&wid=1490&rssMode=1&wtype=0


느낀점.
번역서보다는 국내 저작을 늘리시겠다는 위키북스 반규찬 대표님 및 그 뜻에 응하신 정성태님.
 1. 처음 프로그래밍을 접하는 독자
 2. C# 언어의 발전을 따라가지 못한 경력 개발자
 3. 다른 언어를 공부한 개발자.
 
 저자의 노력이 느껴진다.
 
 중요한, 닷넷 버전별 문법. 1.0 ~ 5.0
 Unity가 유행을 타는데, 신입사원 교육용으로 추천할만하다.(Unity가 현재(2013.12.30) Mono 2.6.5을 활용하고, 이는 .NET 3.5 까지인가 지원한다. https://github.com/Unity-Technologies/mono/blob/unity-staging/configure.in)
 책을 먼저보고,
 꽤 재미있다.
 책이 두꺼우면서 건질껀 하나없는 책들이 많다.
 GC에 대한 해설 또한 맘에 들었다.

 
 프로그래밍은 만드는 재미도 있고, 공부하는 재미도 있다.
 결정을 내렸다면 이제부터 그냥 재미에 푹 빠져들면 된다.


# 1부. C#


## 1장 ~ 4장.

복습용.

assembly는
- CIL code : CIL(Common Intermediate Language)코드
- type metadata : 모든 타입의 성격을 기술하는 meta데이터
- manifest : assembly 그 자체에 대한 정보를 기술하는 meta데이터

단일-파일 어셈블리
다수-파일 어셈블리(Multi-file assemblies)는 여러 .NET 바이너리로 구성됨(각각을 module이라 함)
으뜸되는 모듈은(primary module)은 assembly manifest를 포함해야함

code => [.NET 컴파일러] => .dll, .exe => [.NET 실행엔진 [Class Loader(여기에 Base Class Libraries가 들어오게됨]-> [Jitter]->[Platform-Specific Instructions] -> [Execute the member]]

idlasm.exe => .NET asembly에서 CIL code, metadata, manifest를 볼 수 있다.


* 디컴파일러
    http://www.telerik.com/products/decompiler.aspx

* new
 - 다형성 차원(virtual/override)이 아닌, 순수하게 독립적인 하나의 메서드로 정의. 

* implicit(암시적)/explicit(명시적)
 - 연산자 오버로딩에서 쓰임.


* out/ref
 1. out으로 지정된 인자에 넘길 변수는 초기화하지 않아도 된다. 초기화도 있더라도 out 인자를 받는 메서드에는 그 값을 사용할 수 없다.
 2. out으로 지정된 인자를 받는 메서드는 반드시 변수에 값을 넣어서 반환해야한다.


* enum
 - Enumeration Types (C# Programming Guide): http://msdn.microsoft.com/en-us/library/cc138362.aspx


* delegate
 - System.MulticastDelegate 타입은 System.Delegate 타입을 상속받고, 이는 다시 System.Object를 상속받는다.
 - Anonymous Methods (C# Programming Guide): http://msdn.microsoft.com/en-us/library/0yw3tz5k.aspx
 - Lambda Expressions (C# Programming Guide): http://msdn.microsoft.com/en-us/library/bb397687.aspx

* event
 - Events Tutorial: http://msdn.microsoft.com/en-us/library/aa645739%28v=vs.71%29.aspx


## 5장. C# 1.0 완성하기

* attribute
 - AttributeUsage (C# and Visual Basic): http://msdn.microsoft.com/en-us/library/tw5zxet9.aspx

* assembly 특성.
 - :TODO 음... 이건 좀 더 알아볼 필요.  참고. `CLR via C#`
 
* checked/unchecked
 - /checked 라는 옵션도 있구나..(비주얼 스튜디오, 프로젝트속성> 빌드> 고급> Check for arithmetic overflow/underflow)
 - Checked and Unchecked (C# Reference): http://msdn.microsoft.com/en-us/library/khy08726.aspx

* extern
 - 필요 정보.
  - 비관리 코드를 제공하는 DLL이름.
  - 비관리 코드의 함수 이름
  - 비관리 코드의 함수 형식(signature)
 - 보통 [DLLiImport("blabla.dll")]이랑 쌍으로 쓰임. c# 자료형이랑 맞춰줘야함.


* unsafe
 - 포인터 연산자(*, &)가 사용된 곳에는 반드시 unsafe 예약어를 지정해야 한다.
 - unsafe 예약어를 사용한 소스 코드는 반드시 /unsafe 옵션을 줘야한다(비주얼스튜디오 - Allow unsafe code).


* fixed
 - gc에 의해, 메모리 주소가 바뀌는 것을 방지하기 위한 예약어.


* stackalloc
 - c#에서 값 형식임에도 배열로 선언되면, 힙에 할당되나, stackalloc를 이용하연 스택에 할당됨.

* dll만들기 
 - csc /target:library LogWriter.cs >> LogWriter.dll
 - csc Program.cs /r:LogWriter.dll  >> Program.exe


* app.config
 - supportedRuntime - 닷넷 프레임 워크 호환성.(CLR의 초기화에 관여)
 - appSettings - System.Configuraton을 이용하여 접근할 수 있음.
 

* [Obsolete("이건 이제 안쓸꺼임")]
 - 해당 기능을 사용할시 CS0618 경고 발생.

* 문재발생 소스코드 라인 확인시 PDB(program database)파일이 필요.(/debug 옵션으로 생성)
 - csc Program.cs /debug:pdbonly

 
* Debug, Trace
 - DEBUG상수는 오로지 디버그 빌드에서만 정의.

    #if DEBUG
    #endif

    System.Diagnostics
    [Conditional("DEBUG")]

 - Debug.WriteLine
  - DebugView.exe

* 5.2.6 버전관리
 - dll에 대한 버전관리는 어떻게 할 것인가?
 - GAC(Global Assembly Cache) 이용.
 - 비주얼스튜디오에서 프로젝트 생성시 자동 포함되는 AssemblyInfo.cs
    [assembly: AssemblyVersion("1.0.0.0")]
 
 Sn.exe (Strong Name Tool): http://msdn.microsoft.com/en-us/library/k5b5tt23%28v=vs.110%29.aspx
    sn -k my.snk
    csc /keyfile:my.snk Program.cs
 비주얼스튜디오 - property> Signing> Sign the assembly> Choose a strong name key file> New> Key file name> Protect my key file with a password> OK
 
 GCG 등록.
 - 배포시 gacutil이 없이, GAC에 DLL 등록시키기 위해, MSI(Microsoft Installer)설치 파일로 만들어서 배포해야함.(번거로움)
 C:\Windows\assembly
 C:\Windows\Microsoft.NET\assembly - .NET 4.0 ~ 4.5
 
 gacutil /i ClassLibrary1.dll
 gacutil /u ClassLibrary1
 

 * throw
 try {
    HasProblem();
 }
 catch (System.Exception ex) {
    throw ex;  // 실제 예외가 발생한 호출 스택은 사라지고, throw ex코드가 발생한 시점부터 호출 스택에 남음.
    throw;     // 실제 예외가 발생한 호출 스택이 사라지지 않아, 오류의 원인을 좀 더 쉽게 파악 가능.
 }
    
* 소멸자가 구현된 객체.
 GC.SuppressFinalize 명시적으로 자원해제가 됐다면, 종류 큐에서 객체를 제거.

Garbage Collection: Automatic Memory Management in the Microsoft .NET Framework: http://msdn.microsoft.com/en-us/magazine/bb985010.aspx
Garbage Collector Basics and Performance Hints: http://msdn.microsoft.com/en-us/library/ms973837.aspx

## 6장. BCL (Base Class Library)

6.1.3 System.Diagnostics.Stopwatch

    var st = new Stopwatch();
    st.Start();
    Sum();
    st.Stop();

    st.ElapsedTicks
    
    
코드의 특정 구간에 대한 성능을 축정할 때 자주 사용.


* 직렬화
 - 6.3.5 System.Runtime.Serialization.Formatters.Binary.BinaryFormatter
  - [Serializable], [NonSerialized]
 - 6.3.6 System.Xml.Serialization.XmlSerializer
  - public 접근 제한자의 클래스. 기본 생성자를 포함. public 접근 제한자가 적용된 필드만 직렬화/역직렬화 가능.
 - 6.3.7 System.Runtime.Serialization.Json.DataContractJsonSerializer

 
6.6 스레딩.
  
static void threadFunc(object inst) {
    var pg = inst as Program;
    
    // Monitor 클래스 이용.
    Monitor.Enter(pg);
    try {
        pg.number = pg.number + 1;
    }
    finally {
        Monitor.Exit(pg);
    }
    
    // lock 키워드 이용.
    lock (pg) {
        pg.number = pg.number + 1;
    }
}


System.Threading.InterlockedSystem.Threading.Interlocked
 - Interlocked Class: http://msdn.microsoft.com/en-us/library/system.threading.interlocked(v=vs.110).aspx
 
 System.Threading.ThreadPool
 - ThreadPool Class: http://msdn.microsoft.com/en-us/library/system.threading.threadpool(v=vs.110).aspx
 
System.Threading.EventWaitHandle
 - ThreadPool을 살작 제어하고자 할때 쓰는가 보네..
 - EventWaitHandle Class:  http://msdn.microsoft.com/en-us/library/system.threading.eventwaithandle%28v=vs.110%29.aspx 


* System.Net

```csharp 
using System;
using System.Net;

public class Example
{
    public static void Main()
    {
        string url = "https://127.0.0.1:5";

        Uri uri = null;
        if (Uri.TryCreate(url, UriKind.Absolute, out uri)) {

            IPAddress ipaddr = null;
            if (IPAddress.TryParse(uri.Host, out ipaddr)) {

                IPEndPoint endPoint = new IPEndPoint(ipaddr, uri.Port);
                Console.WriteLine(uri.Scheme);        // https
                Console.WriteLine(endPoint.Address);  // 127.0.0.1
                Console.WriteLine(endPoint.Port);     // 5
            }
        }
    }
}
```

6.9 리플렉션

        var currentDomain = AppDomain.CurrentDomain;
        var asms = currentDomain.GetAssemblies();
        var modules = asms[0].GetModules();
        var types1 = modules[0].GetTypes();
        var types2 = asms[0].GetTypes();


        
Registry Class: http://msdn.microsoft.com/en-us/library/microsoft.win32.registry%28v=vs.110%29.aspx
BigInteger Structure: http://msdn.microsoft.com/en-us/library/system.numerics.biginteger%28v=vs.110%29.aspx
IntPtr Structure: http://msdn.microsoft.com/en-us/library/system.intptr%28v=vs.110%29.aspx


## 07 C# 2.0
* generic <T>
* where
* ??
* default
* yield return/break
* partial class
* nullable
* static class



## 08 C# 3.0
* var
* get/set
* partial method
* extension method
* LINQ



## 09 C# 4.0
* optional parameter
* dynamic



## 10 C# 5.0
* [CallerMemberName], [CallerFilePath], [CallerLineNumber]
 - using System.Runtime.CompilerServices;
* async, await



Application.DoEvents Method : http://msdn.microsoft.com/en-us/library/system.windows.forms.application.doevents%28v=vs.110%29.aspx

