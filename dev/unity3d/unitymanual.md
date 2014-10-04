--------------------------------------------------------------------------------
Loading Resources at Runtime
특정 에셋의 로드 시점을 조정할 수 있다.
- Asset Bundles (Unity Pro-only/iOS Advanced/Android Advanced licenses only)
  - 빌드하기 위해선 : Editor스크립트상의 BuildPipeline.BuildAssetBundle()를 호출
  - 불러오기 위해선 : AssetBundle.Load() 이용
- Resource Folders
  - GameObject inspector에 링크시키지 않아도, Resources폴더는 Unity player에 포함됨.
  - 불러오기 위해선 : Resources.Load()
  - If your target deployable is a Streaming Web Player, you can define which scene will include everything in your Resource Folders. You do this in the Player Settings, accessible via Edit->Project Settings->Player. Set the First Streamed Level With Resources parameter, and all assets in your Resource Folders will be loaded when this level streams in to the end-user. 
  - Note: All assets found in the Resources folders and their dependencies are stored in a file called resources.assets. If an asset is already used by another level it is stored in the .sharedAssets file for that level. The Edit -> PlayerSettings 'First Streamed Level' setting determines the level at which the resources.assets will be collected and included in the build. 
   -  If a level prior to "First streamed Level" is including an asset in a Resource folder, the asset will be stored in assets for that level. if it is included afterwards, the level will reference the asset from the "resources.assets" file. 
   - Resources폴더에 있는 에셋들만 Resources.Load로 불러올 수 있다. 의존성때문에 resources.assets에는 Resources폴더에 존재하지 않는 에셋들이 들어있을 수 있다.
- Resource Unloading
  - AssetBundle 
    - AssetBundle.Unload()
      - function Unload (unloadAllLoadedObjects : boolean) : void
        - unloadAllLoadedObjects : false => 이미 로드된 오브젝트들은 가만히 놔두고, 번들 에셋을 언로드한다.
        - unloadAllLoadedObjects : true  => 번들 에셋으로 로드된 모든 오브젝트들을 파괴하고, 번들 에셋을 언로드한다.
  - Resources
    - 오브젝트를 Object.Destroy()하고, Resources.UnloadUnusedAssets().

--------------------------------------------------------------------------------

Modifying Source Assets Through Scripting
- Automatic Instantiation
 - renderer.material.shader = Shader.Find("Specular"); 하면 material이 동적으로 생성되어 renderer에 적용된다.
- Direct Modification
 - 실제 에셋 소스를 수정한다(되돌릴 수 없음)
 - renderer.sharedMaterial.shader = Shader.Find("Specular"); 
- Applicable Class Members
 - Materials        : renderer.material, renderer.sharedMaterial
 - Meshes           : meshFilter.mesh  , meshFilter.sharedMesh
 - Physic Materials : collider.material, collider.sharedMaterial 
 
- Direct Assignment
 - 변수 할당해서 직접 바꾸는것.
 
- Assets that are not automatically instantiated
  - 변경하면 되돌릴 수 없을 뿐더러, 자동으로 인스턴스화 할 수 없다.
  - Desktop : Texture2D, TerrainData 
  - iOS & Android : Texture2D

--------------------------------------------------------------------------------

Generating Mesh Geometry Procedurally
- Anatomy_해부 of a Mesh
 - Mesh는 triangle들로 이루어진다.
   triangle은 3개의 vertex로 이루어진다.
   Mesh클래스에서 전체 vertex들이 하나의 배열안에 저장된다.
 - Lighting and Normals
   - 빛에 대한 쉐이더를 표현하기 위해선, 각각의 vertex에 대해 (밖을 향하는)normal vector가 필요.
     쉐이더계산시, normal vector 각각을 빛의 방향과 비교한다.
   - http://docs.unity3d.com/Documentation/Images/manual/AnatomyofaMesh-0.jpg
   - Mesh.RecalculateNormals를 호출하여, 유니티가 노멀값을 적용하도록 할 수 있다.
 - Texturing
   - uv좌표계 설명(생략)
- Using the Mesh Class
 - Accessing an Object's Mesh
   - var mf: MeshFilter = GetComponent(MeshFilter);
 - Adding the Mesh Data
   - Mesh.vertices = (Vector3)
   - Mesh.UVs = (Vector2) // x = U, y = V
- Example - Creating a Billboard Plane
  - 소스 한번만 보면됨.
  - http://docs.unity3d.com/Documentation/Manual/Example-CreatingaBillboardPlane.html

--------------------------------------------------------------------------------

Using Mono DLLs in a Unity Project

--------------------------------------------------------------------------------
Execution Order of Event Functions
- First Scene Load
  - Awake : Start 함수 이전에 호출. prefab이 인스턴스 되자마자 호출
  - OnEnable : (active상태에만 호출됨). object가 enable됬을시 호출(MonoBehavior 인스턴스턴스가 생성됬을시).
- Before the first frame update
  - Start : script 인스턴스가 enable됬을시, 최초 frame이 업데이트되기 전에 호출
- In between frames
  - OnApplicationPause : pause가 감지됬을시, frame 끝에 호출. 호출후 (pause 상태를 표시하기 위해) 추가로 한 frame이 돌게됨
- Update Order
  - FixedUpdate : 물리연산은 이 함수가 호출된 다음 적용됨. frame rate완 별개로 timer와 관련있음.
  - Update : 매 frame마다 호출.
  - LateUpdate : Update함수가 끝나고, 매 frame마다 호출.
  
- Rendering
  - OnPreCull : 카메라가 scene을 cull하기 전에 호출.
  - OnBecameVisible/OnBecameInvisible : 카메ㅏ에서 object가 visible/invisible 됬을시.
  - OnWillRenderObject : object가 visible시 각각의 카메라에서 한번씩 호출.
  - OnPreRender : scene을 렌더링하기 전에 호출.
  - OnRenderObject : 모든 regular scene렌더링이 끝난 후 호출. (이때, custom geometry를 그리기 위해 GL class나 Graphics.DrawMeshNow를 이용할 수 있음)
  - OnPostRender : 카메라가 scene의 렌더링을 마친 후에 호출.
  - OnRenderImage(Pro only) : 씬 이미지의 postprocessing을 마친 후 호출.
  - OnGUI
  - OnDrawGizmos 
   
- Coroutine
  - Coroutines are executed after all Update functions.
  - yield
  - yield WaitForSeconds
  - yield WaitForFixedUpdate
  - yield WWW 
  - yield StartCoroutine
  
- When the Object is Destroyed
  - OnDestroy
  
- When Quitting
  - OnApplicationQuit : 어플리케이션이 종료되기 전에 호출(editor - stop했을시, web - view가 닫힐시)
  - OnDisable
- So in conclusion, this is the execution order for any given script:
  - 전체 Awake 호출
  - 전체 Start 호출
  - while (stepping towards variable delta time) 
    - 전체 FixedUpdate
    - 물리연산
    - OnEnter/Exit/Stay trigger
    - OnEnter/Exit/Stay collision
  - Rigidbody interpolation applies transform.position and rotation 
  - OnMouseDown/OnMouseUp etc. events 
  - 전체 Update 함수
  - Animations are advanced, blended and applied to transform 
  - 전체 LateUpdate functions 
  - Rendering
--------------------------------------------------------------------------------
Practical Guide to Optimization for Mobiles
- Practical Guide to Optimization for Mobiles - Future & High End Devices(생략)
- Practical Guide to Optimization for Mobiles - Graphics Methods
- Practical Guide to Optimization for Mobiles - Scripting and Gameplay Methods
- Practical Guide to Optimization for Mobiles - Rendering Optimizations
- Practical Guide to Optimization for Mobiles - Optimizing Scripts

* http://docs.unity3d.com/Documentation/Manual/Profiler.html
* http://docs.unity3d.com/Documentation/Manual/iphone-InternalProfiler.html

--------------------------------------------------------------------------------

Optimizing Graphics Performance
- Draw Call Batching
- Modeling Characters for Optimal Performance
- Rendering Statistics Window

--------------------------------------------------------------------------------

Reducing File Size
- Unity post-processes all imported assets
  - import된 모든 파일들은 post-process과정을 거치니, 작업할땐 편한걸로 작업해라(.mb, .psd, .tiff 등등)
  
- Unity strips out unused assets
  - 배포시 Unity가 안쓰는 asset들은 정리하니 안심해라**
  
- Unity prints an overview of the used file size
  - console log에 빌드 후 파일크기가 표시된다.
  
- Optimizing texture size
  - inspector에서 잘 설정해서 texture크기를 조정해라.
  
- How much memory does my texture take up?
  - Desktop, iOS, Android : Texture타입에 대한 메모리 사용량 나와있음.
  - 총 texture 크기 : width * height * bpp (mipmap을 가질시 +33%)
  
- Optimizing mesh and animation size
  - Mesh compression은 data크기만 작게할 뿐이고, 메모리를 덜먹진 않음.
  - Animation Keyframe reduction은 data크기도 작게하고, 메모리도 덜먹음.
  - 빌드시 공간이나, 런타임시 메모리를 줄이기 위해, normals and/or tangents의 저장여부를 선택할 수 있다.
  - Mesh Import Settings에서 Tangent Space Generation 드랍다운을 통해 선택할 수 있다.
  - 최선책 : 
    - Tangents는 normal-mapping에 사용된다.(normal-mapping을 사용하지 않으면 tangent를 저장할 필요가 없다)
    - Normals는 lighting에 사용된다. (실시간 lighting이 필요치 않으면, normal을 저장할 필요가 없다)
    
- Reducing included dlls in the Players
  - System.Xml대신, http://docs.unity3d.com/Documentation/Images/manual/Mono.Xml.zip
  - 대부분의 Generic container들이 mscorlib에 들어있지만, Stack<>과 몇몇은 System.dll에 들어있음.
  - 배포시, Unity는 다음 DLL들을 포함함 : mscorlib.dll, Boo.Lang.dll, UnityScript.Lang.dll, UnityEngine.dll. 

--------------------------------------------------------------------------------

Getting Started with iOS Development

--------------------------------------------------------------------------------

* Setting Up Your Apple Developer Account
- [AccountSetup]
    1. https://developer.apple.com/programs/ios/ 에 개발자 등록
	2. 운영체제 업데이트, iTunes 설치.
	3. iPhone SDK 설치.
	https://developer.apple.com/devcenter/ios/index.action
	https://developer.apple.com/xcode/index.php
	4. 장치 식별자 얻기
	5. 장치 등록
	6. 인증서 생성
	7. WWDR Intermediate Certificate 다운로드.
	8. Provisioning 파일 생성.
	
* Accessing iOS Functionality
[Unity3d's iOS scripting page]
몇몇 클래스밖에없고, 문서화가 안됨. 그냥 살펴보기만하면됨.
iPhoneInput	    : Access to multi-touch screen, accelerometer, device orientation and geographical location.
iPhoneSettings	: iOS specific settings, such as screen orientation, dimming and information about device hardware.
iPhoneKeyboard	: Support for native on-screen keyboard.
iPhoneUtils	    : Useful functions for movie playback, anti-piracy protection and vibration.

```
#if UNITY_IPHONE
#endif
```

[Unity3d's Mobile Keyboard]
iOS키보드 화면 설정 api들을 설명함.

[Unity3d's .NET API 2.0 compatibility level]
[Unity3d's .NET API 2.0 Subset Limitation]
Unity iOS는 스크립트상 이름공간을 지원하지 않음. 3rd party라이브러리 추가할라면, dll로 만들어서 추가하는게 좋음.

--------------------------------------------------------------------------------

* * Exposing Native C, C++ or Objective-C Code to Scripts
:TODO [Unity3d's Plugins]: http://docs.unity3d.com/Documentation/Manual/Plugins.html

--------------------------------------------------------------------------------

* Prepare Your Application for In-App Purchases
:TODO [Unity3d's In-App Purchases]: http://docs.unity3d.com/Documentation/Manual/iphone-Downloadable-Content.html
애플의 StoreKit API쓸라믄 [Unity3d's Plugins]를 참조
"In App Purchase"단계에서 할 수 있는 것.
    Content, Functionality, Services, Subscriptions
여기서 다룰 껀, Content를 다룰것이며, 방법에는 AssetBundles를 활용하겠음
exporting => downloading
 - exporting
 BuildTarget 주의
 Editor폴더 만들고, 다음 코드를 만들어서 저장

ExportBundle.js
```javascript
@MenuItem ("Assets/Build AssetBundle From Selection - Track dependencies")
static function ExportBundle(){

        var str : String = EditorUtility.SaveFilePanel("Save Bundle...", Application.dataPath, Selection.activeObject.name, "assetbundle");
        if (str.Length != 0){
             BuildPipeline.BuildAssetBundle(Selection.activeObject, Selection.objects, str, BuildAssetBundleOptions.CompleteAssets, BuildTarget.iPhone);
        }
}
```
[BuildPipeline.BuildAssetBundle]: http://docs.unity3d.com/Documentation/ScriptReference/BuildPipeline.BuildAssetBundle.html

 - downloading
	
* Occlusion Culling
:TODO [Unity3d's Occlusion Culling]: http://docs.unity3d.com/Documentation/Manual/OcclusionCulling.html

* Splash Screen Customization : 빌드셋팅에 스플레쉬스크린 바꾸는거있음.

* Troubleshooting and Reporting Crashes.
:TODO [Unity3d's Troubleshooting]: http://docs.unity3d.com/Documentation/Manual/TroubleShooting.html#iPhoneTroubleShooting


--------------------------------------------------------------------------------

* How Unity's iOS and Desktop Targets Differ
- iOS를 타겟으로할때, 다이나믹 타이핑이 꺼진다(#pragma strict을 쓴것과 같음)
- MP3포맷을 추천함. Ogg Vorbis로 압축된것이 있으면, 빌드시 MP3로 다시 압축됨.
- iPhone/iPad 장치는 PVRTC를 지원함.(iOS는 DXT 텍스처를 지원하지 않음.)
- [Unity3d's Texture 2D]: http://docs.unity3d.com/Documentation/Components/class-Texture2D.html

- Movie Playback
 - iOS에선 MovieTextures를 지원하지 않음. 전체화면 스트리밍은 함수로 지원함.
 - [Handheld.PlayFullScreenMovie]: http://docs.unity3d.com/Documentation/ScriptReference/Handheld.PlayFullScreenMovie.html
 - StreamingAssets 폴더에 동영상파일이 있어야함.
 - .mov, .mp4, .mpv, .3gp 확장자를 사용.
 - 압축포맷 : H.264 Baseline Profile Level 3.0 video, MPEG-4 Part 2 video

[iOS's MPMoviePlayerController Class Reference]: http://developer.apple.com/library/ios/#documentation/MediaPlayer/Reference/MPMoviePlayerController_Class/Reference/Reference.html
:TODO [Movie Texture]: http://docs.unity3d.com/Documentation/Manual/VideoFiles.html

--------------------------------------------------------------------------------

Further Reading
    Unity iOS Basics
	 - 성능이 안좋으니, 파티클 대신 텍스쳐에니메이션을 써라.
	 - 물리연산을 중시할때는, Edit->Time->Fixed Delta Time을 조정해서, 프래임레이트를 낮춰라
	 - Unity의 OnGUI()는 성능 후지니 쓰지마라.
	 - 그래도 쓸라면, MonoBehaviour.useGUILayout = false; 처럼 GUILayout을 이용.
	 
    Unity Remote : 이미지 스트리밍해서 보여주기때문에 화질 구림.
	
    iOS Hardware Guide - (:NOTE MBX series, SGX series 설명 필요)
	 - 하드웨어 스펙나옴(참고)
	 - Graphics Processing Unit and Hidden Surface Removal
	  - iPhone/iPad graphics processing unit (GPU) is a Tile-Based Deferred Renderer.
	  - GPU's 프레임 버퍼는 tile로 나뉘며, 렌더링은 tile단위로 처리된다.
	  - 전체 프레임의 triangles가 모여, tile로 할당됨. => 보여지는 triangles가 선택됨 => 선택된 triangles가 rasterizer로 넘겨짐 (이 단계에서 카메라에 보이지 않는것은 무시됨)
	 - MBX series
	  - iPhone, iPhone 3G, iPod Touch 1st and 2nd Generation.
	  - MBX 씨리즈는 OpenGL ES1.1 만 지원함. the fixed function Transform/Lighting pipeline and two textures per fragment(???)
	 - SGX series
	  - iPhone 3GS, newer devices are equipped with the SGX series of GPUs.
	  - OpenGL ES2.0 rendering API and vertex and pixel shaders. The Fixed-function pipeline is not supported natively on such GPUs, but instead is emulated by generating vertex and pixel shaders with analogous functionality on the fly(???).
	  - SGX씨리즈는 MultiSample anti-aliasing를 완벽히 지원(부가설명필요).
	 - Vertex Processing Unit
	  - iPhone/iPad has a dedicated unit responsible for vertex processing which runs calculations in parallel with rasterization. In order to achieve better parallelization, the iPhone/iPad processes vertices one frame ahead of the rasterizer. 
     - Unified Memory Architecture
	  - iPhone/iPad에서 CPU와 GPU는 동일한 메모리를 공유한다. 이점: 비디오 메모리를 걱정할 필요가 없음. 단점: 동일한 메모리 대역폭을 공유해야해서, 그래픽에 좀더 메모리를 쓰고자하면, 물리나 게임플레이에는 적은 메모리를 쓰게됨.
	 - Multimedia CoProcessing Unit
	  - iPhone/iPad에 메인CPU 아키텍쳐는 VFP나 NEON 아키텍처에서 지원하는 SIMD(Single Instruction, Multiple Data) coprocessor임.
      - skinned mesh transformations 계산, geometry batching, audio processing, 계산중심연산에 대해 이점을 지님
	 - 참고
	  - [POWERVR MBX Technology Overview]
	  - [Apple Notes on iPhone/iPad GPU and OpenGL ES]
	  - [Apple Performance Advices for OpenGL ES in General]
	  - [Apple Performance Advices for OpenGL ES Shaders]
	
	:TODO Optimizing Performance in iOS.
        iOS Specific Optimizations
        Measuring Performance with the Built-in Profiler
        Optimizing the Size of the Built iOS Player 
    Features currently not supported by Unity iOS
	 - Scripting
	   - 미지원 (이벤트) : OnMouseDown, OnMouseEnter, OnMouseOver, OnMouseExit, OnMouseDown, OnMouseUp, OnMouseDrag
	   - 미지원 (WWW): 비디오 스트리밍
	   - 부분지원 (WWW): FTP
	 - Features Restricted to Unity iOS Advanced License
	   - iOS Advanced에서 지원 : Static batching, Video playback, Splash-screen customization, AssetBundles, Code stripping, .NET sockets
	   - Note
	     - .NET CIL코드 1MB는 대충 ARM 3~4MB로 변환된다.
		 - ex) (srtipping미사용시) System.dll과 System.Xml.dll를 참조하게되면, ARM 코드 6MB가 추가된다.
	
* Links
    [Unity3d's Iphone Account Setup]: http://docs.unity3d.com/Documentation/Manual/iphone-accountsetup.html
	[Unity3d's iOS scripting page]: http://docs.unity3d.com/Documentation/Manual/iphone-API.html
	[Unity3d's Mobile Keyboard]: http://docs.unity3d.com/Documentation/Manual/MobileKeyboard.html
	[Unity3d's .NET API 2.0 compatibility level]: http://docs.unity3d.com/Documentation/Manual/MobileDotnet.html

	[Unity3d's .NET API 2.0 Subset Limitation]: http://docs.xamarin.com/ios/guides/advanced_topics/Limitations
	
	[POWERVR MBX Technology Overview]: http://www.imgtec.com/factsheets/SDK/PowerVR%20Technology%20Overview.1.0.2e.External.pdf
	[Apple Notes on iPhone/iPad GPU and OpenGL ES]: http://developer.apple.com/iphone/library/documentation/3DDrawing/Conceptual/OpenGLES_ProgrammingGuide/OpenGLESPlatforms/OpenGLESPlatforms.html#//apple_ref/doc/uid/TP40008793-CH106-SW1
	[Apple Performance Advices for OpenGL ES in General]: http://developer.apple.com/library/ios/#documentation/3DDrawing/Conceptual/OpenGLES_ProgrammingGuide/Performance/Performance.html
	[Apple Performance Advices for OpenGL ES Shaders]: http://developer.apple.com/library/ios/#documentation/3DDrawing/Conceptual/OpenGLES_ProgrammingGuide/BestPracticesforShaders/BestPracticesforShaders.html
	
* What is it ?
 - rasterizer [Wiki Rasterisation]: http://en.wikipedia.org/wiki/Rasterisation
 - Transform/Lighting pipeline