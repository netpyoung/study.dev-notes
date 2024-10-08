# OS Windows

- 유틸
  - [HashMyFiles.exe](https://www.nirsoft.net/utils/hash_my_files.html)
  - [MobaXterm](https://mobaxterm.mobatek.net/)
  - [NeatDownloadManager](https://www.neatdownloadmanager.com/index.php/en/)
  - [MuMu Player](https://www.mumuplayer.com/index.html)
    - NetEase에서 만든 에뮬
    - `//192.168.1.100/Share/My project` 이런식으로 네트워크 주소가 들어갔는데 접속 못하면 크래쉬가 난다. 그럴때
      - C:\Program Files\MuMu9\emulator\nemu9\EmulatorShell\last_open_dir.ini
        ``` ini
        [General]
        last_apk_open_dir=C:/temp/My project
        ```
  - [Parsec](https://parsec.app/)
  - [Snipaste](https://www.snipaste.com/)
  - CoreDirector
  - yEd Graph Editor
  - 반디캠
  - RenderMonkey
  - UltraVNC Viewer
  - bruno
    - alternative Postman
    - <https://github.com/usebruno/bruno/discussions/269>
  - postman
    - [newman](https://learning.postman.com/docs/collections/using-newman-cli/command-line-integration-with-newman/)
  - wireshark

## Essential Program

- [TortoiseGit](https://tortoisegit.org/)
- [Adobe Reader](https://get.adobe.com/kr/reader/)
- [FileZilla](https://filezilla-project.org/)
- [7zip](http://7-zip.org/)
- [everything](http://www.voidtools.com/)
- [ConEmu](https://conemu.github.io/)
- [AstroGrep](http://astrogrep.sourceforge.net/)
  - 혹은 [dnGrep](https://github.com/dnGrep/dnGrep)
- [RapidEE](https://www.rapidee.com/en/about)
- [Visual Studio](https://www.visualstudio.com/ko/downloads/)
  - english, python, desktop
- [Notepad++](https://notepad-plus-plus.org/)
  - https://github.com/bruderstein/nppPluginManager/releases
- [Symlinker](https://github.com/amd989/Symlinker)
  - https://www.howtogeek.com/howto/16226/complete-guide-to-symbolic-links-symlinks-on-windows-or-linux/
- [PuTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/)
  - puttygen
  - pagent
- [ccleanr](https://www.piriform.com/ccleaner)
- [gow](https://github.com/bmatzelle/gow/releases)
- [dotpeek](https://www.jetbrains.com/decompiler/)
- [md5checker](http://getmd5checker.com/)
- [clover3](http://en.ejie.me/)
- [p4merge](https://www.perforce.com/downloads/visual-merge-tool)
  - <http://hotkoehls.com/2015/04/use-perforce-p4merge-with-tortoisegit/>
  - `TortoiseGit > Settings > DiffViewer > C:\Program Files\Perforce\p4merge.exe  %base %mine`
  - `TortoiseGit > Settings > DiffViewer > MergeTool > C:\Program Files\Perforce\p4merge.exe %base %theirs %mine %merged`
- [OSB](https://obsproject.com/ko)
- https://www.snipaste.com/
- https://www.grc.com/dns/benchmark.htm
  - [인터넷이 빨라지는 DNS 속도 테스트 (DNS benchmark)](https://qsurf.tistory.com/13)

## language

- ruby - <https://github.com/oneclick/rubyinstaller2>
- python - <https://www.python.org/downloads/>

## xx

- 코어격리
  - 컴퓨터 프로세스를 운영 체제 및 장치에서 분리하여 맬웨어 및 기타 공격으로부터 보호
  - VBS Visualization-Based Security
  - Hypervisor-Protected Code Integrity (HVCI)
 
## Windows 11

- [윈도우11 마우스 우클릭 메뉴를 윈도우10 스타일로 변경하기](https://playcraft.tistory.com/472)

``` cmd
reg.exe add "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" /f /ve
taskkill /f /im explorer.exe
explorer.exe
```

- [윈도우11 작업표시줄 그룹해제 및 위치, 오류 설정방법,Explorer Patcher 필요없음](https://bizstoryway.tistory.com/161)
  - 설정 > 개인설정 > 작업표시줄  > 작업 표시줄 동작 > 작업 표시줄 단추 합치기 및 레이블 숨기기 > 안함



## Ref

- <https://ikrima.dev/dev-notes/devbox/devbox-win-tools/>
