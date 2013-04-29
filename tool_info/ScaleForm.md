# actionscript 2.0 reference chm
http://onnerby.se/~daniel/chm/actionscript2/flash_as2lr/flash_as2lr.chm

# action script 3 한국 매뉴얼 pdf
http://help.adobe.com/ko_KR/ActionScript/3.0_ProgrammingAS3/flash_as3_programming.pdf


-----------------------------------------------------------------------------------------
CLIK : Common Lightweight Interface Kit
HUD : Heads Up Display


-- Adobe 설정 ---------------------------------------------------------------------------------------
# gfx 런처 설치
* 확장매니저 실행 : C:\Program Files\Adobe\Adobe Extension Manager CS5
* 새로운 확장 설치하기 : C:/Program Files/Scaleform/GFx SDK 3.1/Resources/CLIK Tools/ Scaleform CLIK.mxp
* Window > Other Panels > Scaleform Launcher
* +눌러서 플레이어 설치 : C:/Program Files/Scaleform/GFx SDK 3.1/Bin/FxMediaPlayerAMP.exe

# actionscript2 설정
* Edit -> Preference -> Actionscript -> Actionscript 2.0 Settings...
* + 버튼 눌러서 경로추가 : C:\Program Files\Scaleform\GFx SDK 3.1\Resources\CLIK\

# 폰트
* Text -> Font Embedding
* Family : Slate Mobile, Character ranges : Basic Latin (95/95 glyphs)선택후 +눌러서 추가

-- VC 프로젝트 설정---------------------------------------------------------------------------------------
GFx 3.1빌드시 빌드셋팅에서 D3D9_Debug_Static로 빌드(DXSDK_Aug08.exe설치해야함.)

# 프로젝트 설정
C/C++ > 일반
"$(DXSDK_DIR)\include";"$(GFXSDK)\Src\GRenderer";" $(GFXSDK)\Src\GKernel";"$(GFXSDK)\Src\GFxXML";" $(GFXSDK)\Include"

링커 > 일반
tutorial : "$(DXSDK_DIR)\Lib\x86";"$(GFXSDK)\3rdParty\expat-2.0.1\lib";"$(GFXSDK)\3rdParty\zlib-1.2.3\Lib\$(PlatformName)\Msvc90\$(ConfigurationName)";"$(GFXSDK)\3rdParty\jpeg-6b\Lib\$(PlatformName)\Msvc90\$(ConfigurationName)";"$(GFXSDK)\Lib\$(PlatformName)\Msvc90\$(ConfigurationName)"
//
"$(DXSDK_DIR)\Lib\x86";"$(GFXSDK)\3rdParty\expat-2.0.1\lib";"$(GFXSDK)\3rdParty\libpng\Lib\$(PlatformName)\Msvc90\$(ConfigurationName)";"$(GFXSDK)\3rdParty\zlib-1.2.3\Lib\$(PlatformName)\Msvc90\$(ConfigurationName)";"$(GFXSDK)\3rdParty\jpeg-6b\Lib\$(PlatformName)\Msvc90\$(ConfigurationName)";"$(GFXSDK)\Lib\$(PlatformName)\Msvc90\$(ConfigurationName)";"$(GFXSDK)\3rdParty\fmod\pc\$(PlatformName)\lib"

링커 > 입력
tutorial : libgfx.lib libjpeg.lib zlib.lib imm32.lib winmm.lib
//
libgfx.lib libjpeg.lib libpng.lib zlib.lib imm32.lib winmm.lib d3d9.lib d3dx9.lib XInput.lib fmodexL_vc.lib libgrenderer_d3d9.lib
-----------------------------------------------------------------------------------------




-----------------------------------------------------------------------------------------

MovieClipLoader, _root와 _lock

Variables in that movie can be accessed as _levelN.variableName (e.g., _level6.counter).


ASSetPropFlags 사용법
http://www.jowrney.com/xe/?mid=sas&listStyle=gallery&document_srl=8990

How to use ASSetPropFlags in ActionScript 2.0 
http://www.ryanjuckett.com/programming/actionscript/29-how-to-use-assetpropflags-in-actionscript-20
-----------------------------------------------------------------------------------------

$(GFXSDK)\gfxexport.exe
gfxexport -i DDS -c 파일명.swf

-i 옵션은 이미지 포맷을 정의. (DDS는 DirectX 플랫폼에선 가장 일반적인 형태인데 그 이유는 DXT 텍스처 압축이 가능, 일반적으로 4배 정도 런타임 텍스처 메모리를 절약)

-c 옵션은 압축을 정의한다. GFx 파일 내 벡터 및 액션스크립트 컨텐츠만이 압축된다. 이미지 압축은 선택한 이미지 출력 포맷과 DXT 압축 옵션에 따른다

-share_images 옵션은 서로 다른 SWF 파일 내 동일한 이미지를 찾아내서 하나의 공유 사본만을 로딩함으로써 메모리 사용을 절약
-----------------------------------------------------------------------------------------