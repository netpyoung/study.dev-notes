--------------------------------------------------------------------------
-Basic Ogre Framework :
http://www.ogre3d.org/forums/viewtopic.php?f=2&t=68965
Actually, that's a change in 1.8 (I think), and it doesn't work with versions <= 1.7.x, just change 'msSingleton' to 'ms_Singleton', and it should compile just fine.

Debug면 Debug mode에 맞게 수정.
m_pRoot = new Ogre::Root("plugins_d.cfg");
cf.load("resources_d.cfg");


--------------------------------------------------------------------------
-Advanced Ogre Framework : skipped
--------------------------------------------------------------------------
-Manual Resource Loading : skipped
Geometry, Material, Skeleton, Font, Overlay

Shared geometry는 static geometry를 이용할때 더욱 효과적이다.
Non-shared geometry는 많은 뼈(bones)들을 이용할때 필수다.


Shared geometry:
    Create your Mesh object
    Create the vertex declaration
    Create your different vertex buffers (separate [position+normals] from the rest if you're animating your mesh)
    Link them to your Mesh
    Create your index buffer
    Create your SubMeshes and link them to the index buffer
    Call Mesh::load() 
  
Non-shared geometry:
    Create your Mesh object
    For each SubMesh:
        Create the vertex declaration
        Create your different vertex buffers (separate [position+normals] from the rest if you're animating your mesh)
        Link them to your SubMesh
        Create your index buffer
        Link it to your SubMesh 
    Call Mesh::load() 

Meterial [1 -> n] Technique [1 -> n] Pass [1 -> 0~n] TextureUnit or TextureUnitState [1 -> 1] Texture
--------------------------------------------------------------------------
-Basic knowledge about Resources :
OgreXmlConverter

*.mesh.xml (unloadable)
*.mesh (loadable)

Entity : mesh의 인스턴스.
MeshSerializer: 헬퍼 클래스. 매쉬를 불러오기 위해 Ogre가 내부적으로 사용.
ResourceManager 
--------------------------------------------------------------------------
-Resources and ResourceManagers :
Unknown - ResourceGroup에 파일이름이 저장되었지만, Orge는 이를 처리할 방법을 모르는 상태
Declared - 직접 혹은 간접에 의해 리소스의 플래그가 creation으로 된것. Orge가 리소스의 타입이 무엇인지, 멀할지, 언제 만들지 아는 상태
Created - Ogre가 리소스의 빈 인스턴스를 만들어, 관련 ResourceManager에 추가한 상태
Loaded - 생성된 인스턴스가 완전히 로드되면, 리소스의 전체 데이터가 메모리 상에 자리잡게됨. 이제서야 실제 리소스 파일에 접근하게 되는 상태.
 

 
 
1. Root::Root에서 ResourceManager 생성.
2. resource 경로 지정. ResourceGroupManager::addResourceLocation
- 없으면 ResourceGroup지정 (RG)
- 특정 타입의 Archive 인스턴스 생성 (A)
- 새로운 ResourceLocation생성 (RL).  (RG (RL (A)))
- A에 있는 파일목록 전부를 얻어와 RG에 추가.
[=============UnKnown 상태=============]
3. 리소스를 수동으로 선언(ResourceGroupManager::declareResource)
[수동으로 선언한것===Declared  상태==]  [나머지들==UnKnown 상태==]
4. ResourceGroup들이 초기화됨 (ResourceGroupManager::initialiseResourceGroup, ResourceGroupManager::initialiseAllResourceGroups)
	1. RG에 있는 Script를 Parse
	2. Declare된 리소스 생성.
	3. 리소스를 "ordered loading list"에 저장. => ResourceManager
	 
 [=============Created 상태=============]
5. 리스트를 이용.
	1. resource를 다룸
	2. ResourceGroupManager::loadResourceGroup 호출됨.
	3. 등등
[=============Loaded  상태=============]
 

Root 객체 생성
리소스 저장위치를 ResourceGroupManager::addResourceLocation를 호출하여 추가
ResourceGroupManager::_registerResourceManager, ResourceGroupManager::_registerScriptLoader을 이용하여 커스톰 ResourceManager, ScriptLoader 등록.
ResourceGroupManager::declareResource로 필요로하는 리소스 선언
단일 그룹초기화 : ResourceGroupManager::initialiseResourceGroup
다중 그룹초기화 : ResourceGroupManager::initialiseAllResourceGroups

# Resource Unloading and Destruction
언로드 : ResourceManager::unload 
삭제 : ResourceManager::getByName로 리소스를 가리키는 포인터를 얻어, ResourceManager::remove로 삭제

# Reloading Resources
Resource::reload, ResourceManager::reloadAll
--------------------------------------------------------------------------

메뉴얼 오브젝트
mesh 만들기
1. SimpleRenderable 객체를 subclass하여, vertex buffer, index buffer를 직접 제공하는 것.
2. 버퍼 객체에 생으로 데이터를 넣는 대신, ManualObject를 이용하여 함수를 호출하여 제공.

ManualObject
정점(vertices), 렌더링타입(points, lines, surfaces), 제질(material)을 정의해야함.
"begin() ...content... end()"으로 된 section들로 구성됨.