에셋번들이란?
====================================

참고 : http://icoder.tistory.com/entry/Unity3D-%EA%B0%95%EC%A2%8C-%EC%95%A0%EC%85%8B%EB%B2%88%EB%93%A4-%EA%B0%9C%EB%85%90%EC%A0%95%EB%A6%AC

정리요약.

* AssetBundle?
 - 게임 제작에 사용하는 애셋에 관련된 원본 데이터 및 관련 설정을 모두 포함하여 하나의 파일로 묶어줌.
 - 에셋번들은 플랫폼간 호환성이 없음.

* Asset = GUID + 원본데이터 + 메타데이터
 
* Asset Server
 - (참고로 에디터가 자동으로 GUID를 애셋에 부여하기 때문에, 다른 프로젝트의 애셋이 같은 GUID를 생성할 가능성이 있습니다. 이의 충돌을 해결하기 위해 서버쪽에서 통합적으로 GUID를 관리하는 솔루션이 애셋 서버입니다. )
 
* class AssetBundle 
 - http://docs.unity3d.com/Documentation/ScriptReference/AssetBundle.html
 
* enum BuildAssetBundleOptions
 - CollectDependencies      : ?? - Includes all dependencies.( 특정 애셋에 연관된 다른 애셋을 모두 포함시킵니다.)
 - CompleteAssets	        : ?? - Forces inclusion of the entire asset.(애셋이 속하는 게임 오브젝트와 관련된 모든 애셋을 포함)
 - DisableWriteTypeTree     : ?? - Do not include type information within the AssetBundle.(유니티 버젼 정보이 달라도 애셋의 정보를 올바르게 인식할 수 있는 타입트리(TypeTree) 정보를 제거하여 애셋번들을 제작합니다.)
 - DeterministicAssetBundle	: 애셋번들을 빌드시 기존 애셋번들이 가지고 있던 GUID의 해시 값을 그대로 유지.
 - UncompressedAssetBundle	: 애셋번들을 제작할 때 압축하지 않음.
 
* static function LoadFromCacheOrDownload (url : String, version : int, crc : uint = 0) : WWW 
 - http://docs.unity3d.com/Documentation/ScriptReference/WWW.LoadFromCacheOrDownload.html
함수를 사용하여 애셋번들의 url, 버젼 정보, 체크섬 정보를 사용하면 자동으로 하드디스크에 지정한 버젼과 url의 애셋번들이 존재하는 경우 하드디스크에서 불러오고 아닌 경우에는 인터넷을 통해서 불러들이게 됩니다.

* class Cashing
 - http://docs.unity3d.com/Documentation/ScriptReference/Caching.html
 - Caching.IsVersionCached 
 
* class BuildPipeline
 - http://docs.unity3d.com/Documentation/ScriptReference/BuildPipeline.html
 - PushAssetDependencies              : Lets you manage cross-references and dependencies between different asset bundles and player builds.
 - PopAssetDependencies               : Lets you manage cross-references and dependencies between different asset bundles and player builds.
 - BuildPlayer                        : Builds a player (Unity Pro only).
 - BuildStreamedSceneAssetBundle      : Builds one or more scenes and all their dependencies into a compressed asset bundle.
 - BuildAssetBundle                   : Builds an asset bundle (Unity Pro only).
 - BuildAssetBundleExplicitAssetNames : Builds an asset bundle, with custom names for the assets (Unity Pro only).
 
 
*  PushAssetDependencies() & PopAssetDependencies()
 - 디펜던시 scope를 조정하기 위한것임.
 - When you push asset dependencies it will share all resources on that layer, pushing recursively always inherits the previous dependencies. PushAssetDependencies and PopAssetDependencies must even each other out.
 - 참고
  - answer.unity3d.com : http://answers.unity3d.com/questions/55416/please-explain-buildpipelinepushassetdependencies.html
  - reference : http://docs.unity3d.com/Documentation/ScriptReference/BuildPipeline.PushAssetDependencies.html

* static function BuildAssetBundle (mainAsset : Object, assets : Object[], pathName : String, assetBundleOptions : BuildAssetBundleOptions = BuildAssetBundleOptions.CollectDependencies | BuildAssetBundleOptions.CompleteAssets, targetPlatform : BuildTarget = BuildTarget.WebPlayer) : boolean 

 - mainAsset lets you specify a specific object that can be conveniently retrieved using AssetBundle.mainAsset.
 The compressed asset bundle file will be saved at pathName.
 options allows you to automatically include dependencies or always include complete assets instead of just the exact referenced objects.
 All paths are relative to the project folder. Like: "Assets/MyTextures/hello.png"


*  static function BuildAssetBundleExplicitAssetNames (assets : Object[], assetNames : string[], pathName : String, assetBundleOptions : BuildAssetBundleOptions = BuildAssetBundleOptions.CollectDependencies | BuildAssetBundleOptions.CompleteAssets, targetPlatform : BuildTarget = BuildTarget.WebPlayer) : boolean 

 - Creates a compressed unity3d file that contains a collection of assets. AssetBundles can contain any asset found in the project folder. In the assetNames parameter, supply an array of strings of the same size as the number of assets. These will be used as asset names, which you can then pass to AssetBundle.Load to load a specific asset. Use BuildAssetBundle to just use the asset's path names instead. The compressed asset bundle file will be saved at pathName. options allows you to automatically include dependencies or always include complete assets instead of just the exact referenced objects.  

*  static function CreateFromFile (path : String) : AssetBundle 
 -  Only uncompressed asset bundles are supported by this function. This is the fastest way to load an asset bundle. 
 
* warnning
 - 스크립트를 다이나믹로딩할려는것같은데 위험하지않나?
  - http://angryant.com/2010/01/05/downloading-the-hydra/
