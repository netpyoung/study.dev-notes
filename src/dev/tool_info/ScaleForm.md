# actionscript 2.0 reference chm
http://onnerby.se/~daniel/chm/actionscript2/flash_as2lr/flash_as2lr.chm

# action script 3 �ѱ� �Ŵ��� pdf
http://help.adobe.com/ko_KR/ActionScript/3.0_ProgrammingAS3/flash_as3_programming.pdf


-----------------------------------------------------------------------------------------
CLIK : Common Lightweight Interface Kit
HUD : Heads Up Display


-- Adobe ���� ---------------------------------------------------------------------------------------
# gfx ��ó ��ġ
* Ȯ��Ŵ��� ���� : C:\Program Files\Adobe\Adobe Extension Manager CS5
* ���ο� Ȯ�� ��ġ�ϱ� : C:/Program Files/Scaleform/GFx SDK 3.1/Resources/CLIK Tools/ Scaleform CLIK.mxp
* Window > Other Panels > Scaleform Launcher
* +������ �÷��̾� ��ġ : C:/Program Files/Scaleform/GFx SDK 3.1/Bin/FxMediaPlayerAMP.exe

# actionscript2 ����
* Edit -> Preference -> Actionscript -> Actionscript 2.0 Settings...
* + ��ư ������ ����߰� : C:\Program Files\Scaleform\GFx SDK 3.1\Resources\CLIK\

# ��Ʈ
* Text -> Font Embedding
* Family : Slate Mobile, Character ranges : Basic Latin (95/95 glyphs)������ +������ �߰�

-- VC ������Ʈ ����---------------------------------------------------------------------------------------
GFx 3.1����� ������ÿ��� D3D9_Debug_Static�� ����(DXSDK_Aug08.exe��ġ�ؾ���.)

# ������Ʈ ����
C/C++ > �Ϲ�
"$(DXSDK_DIR)\include";"$(GFXSDK)\Src\GRenderer";" $(GFXSDK)\Src\GKernel";"$(GFXSDK)\Src\GFxXML";" $(GFXSDK)\Include"

��Ŀ > �Ϲ�
tutorial : "$(DXSDK_DIR)\Lib\x86";"$(GFXSDK)\3rdParty\expat-2.0.1\lib";"$(GFXSDK)\3rdParty\zlib-1.2.3\Lib\$(PlatformName)\Msvc90\$(ConfigurationName)";"$(GFXSDK)\3rdParty\jpeg-6b\Lib\$(PlatformName)\Msvc90\$(ConfigurationName)";"$(GFXSDK)\Lib\$(PlatformName)\Msvc90\$(ConfigurationName)"
//
"$(DXSDK_DIR)\Lib\x86";"$(GFXSDK)\3rdParty\expat-2.0.1\lib";"$(GFXSDK)\3rdParty\libpng\Lib\$(PlatformName)\Msvc90\$(ConfigurationName)";"$(GFXSDK)\3rdParty\zlib-1.2.3\Lib\$(PlatformName)\Msvc90\$(ConfigurationName)";"$(GFXSDK)\3rdParty\jpeg-6b\Lib\$(PlatformName)\Msvc90\$(ConfigurationName)";"$(GFXSDK)\Lib\$(PlatformName)\Msvc90\$(ConfigurationName)";"$(GFXSDK)\3rdParty\fmod\pc\$(PlatformName)\lib"

��Ŀ > �Է�
tutorial : libgfx.lib libjpeg.lib zlib.lib imm32.lib winmm.lib
//
libgfx.lib libjpeg.lib libpng.lib zlib.lib imm32.lib winmm.lib d3d9.lib d3dx9.lib XInput.lib fmodexL_vc.lib libgrenderer_d3d9.lib
-----------------------------------------------------------------------------------------




-----------------------------------------------------------------------------------------

MovieClipLoader, _root�� _lock

Variables in that movie can be accessed as _levelN.variableName (e.g., _level6.counter).


ASSetPropFlags ����
http://www.jowrney.com/xe/?mid=sas&listStyle=gallery&document_srl=8990

How to use ASSetPropFlags in ActionScript 2.0 
http://www.ryanjuckett.com/programming/actionscript/29-how-to-use-assetpropflags-in-actionscript-20
-----------------------------------------------------------------------------------------

$(GFXSDK)\gfxexport.exe
gfxexport -i DDS -c ���ϸ�.swf

-i �ɼ��� �̹��� ������ ����. (DDS�� DirectX �÷������� ���� �Ϲ����� �����ε� �� ������ DXT �ؽ�ó ������ ����, �Ϲ������� 4�� ���� ��Ÿ�� �ؽ�ó �޸𸮸� ����)

-c �ɼ��� ������ �����Ѵ�. GFx ���� �� ���� �� �׼ǽ�ũ��Ʈ ���������� ����ȴ�. �̹��� ������ ������ �̹��� ��� ���˰� DXT ���� �ɼǿ� ������

-share_images �ɼ��� ���� �ٸ� SWF ���� �� ������ �̹����� ã�Ƴ��� �ϳ��� ���� �纻���� �ε������ν� �޸� ����� ����
-----------------------------------------------------------------------------------------