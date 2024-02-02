--------------------------------------------------------------------------
-Basic Ogre Framework :
http://www.ogre3d.org/forums/viewtopic.php?f=2&t=68965
Actually, that's a change in 1.8 (I think), and it doesn't work with versions <= 1.7.x, just change 'msSingleton' to 'ms_Singleton', and it should compile just fine.

Debug�� Debug mode�� �°� ����.
m_pRoot = new Ogre::Root("plugins_d.cfg");
cf.load("resources_d.cfg");


--------------------------------------------------------------------------
-Advanced Ogre Framework : skipped
--------------------------------------------------------------------------
-Manual Resource Loading : skipped
Geometry, Material, Skeleton, Font, Overlay

Shared geometry�� static geometry�� �̿��Ҷ� ���� ȿ�����̴�.
Non-shared geometry�� ���� ��(bones)���� �̿��Ҷ� �ʼ���.


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

Entity : mesh�� �ν��Ͻ�.
MeshSerializer: ���� Ŭ����. �Ž��� �ҷ����� ���� Ogre�� ���������� ���.
ResourceManager 
--------------------------------------------------------------------------
-Resources and ResourceManagers :
Unknown - ResourceGroup�� �����̸��� ����Ǿ�����, Orge�� �̸� ó���� ����� �𸣴� ����
Declared - ���� Ȥ�� ������ ���� ���ҽ��� �÷��װ� creation���� �Ȱ�. Orge�� ���ҽ��� Ÿ���� ��������, ������, ���� ������ �ƴ� ����
Created - Ogre�� ���ҽ��� �� �ν��Ͻ��� �����, ���� ResourceManager�� �߰��� ����
Loaded - ������ �ν��Ͻ��� ������ �ε�Ǹ�, ���ҽ��� ��ü �����Ͱ� �޸� �� �ڸ���Ե�. �������� ���� ���ҽ� ���Ͽ� �����ϰ� �Ǵ� ����.
 

 
 
1. Root::Root���� ResourceManager ����.
2. resource ��� ����. ResourceGroupManager::addResourceLocation
- ������ ResourceGroup���� (RG)
- Ư�� Ÿ���� Archive �ν��Ͻ� ���� (A)
- ���ο� ResourceLocation���� (RL).  (RG (RL (A)))
- A�� �ִ� ���ϸ�� ���θ� ���� RG�� �߰�.
[=============UnKnown ����=============]
3. ���ҽ��� �������� ����(ResourceGroupManager::declareResource)
[�������� �����Ѱ�===Declared  ����==]  [��������==UnKnown ����==]
4. ResourceGroup���� �ʱ�ȭ�� (ResourceGroupManager::initialiseResourceGroup, ResourceGroupManager::initialiseAllResourceGroups)
	1. RG�� �ִ� Script�� Parse
	2. Declare�� ���ҽ� ����.
	3. ���ҽ��� "ordered loading list"�� ����. => ResourceManager
	 
 [=============Created ����=============]
5. ����Ʈ�� �̿�.
	1. resource�� �ٷ�
	2. ResourceGroupManager::loadResourceGroup ȣ���.
	3. ���
[=============Loaded  ����=============]
 

Root ��ü ����
���ҽ� ������ġ�� ResourceGroupManager::addResourceLocation�� ȣ���Ͽ� �߰�
ResourceGroupManager::_registerResourceManager, ResourceGroupManager::_registerScriptLoader�� �̿��Ͽ� Ŀ���� ResourceManager, ScriptLoader ���.
ResourceGroupManager::declareResource�� �ʿ���ϴ� ���ҽ� ����
���� �׷��ʱ�ȭ : ResourceGroupManager::initialiseResourceGroup
���� �׷��ʱ�ȭ : ResourceGroupManager::initialiseAllResourceGroups

# Resource Unloading and Destruction
��ε� : ResourceManager::unload 
���� : ResourceManager::getByName�� ���ҽ��� ����Ű�� �����͸� ���, ResourceManager::remove�� ����

# Reloading Resources
Resource::reload, ResourceManager::reloadAll
--------------------------------------------------------------------------

�޴��� ������Ʈ
mesh �����
1. SimpleRenderable ��ü�� subclass�Ͽ�, vertex buffer, index buffer�� ���� �����ϴ� ��.
2. ���� ��ü�� ������ �����͸� �ִ� ���, ManualObject�� �̿��Ͽ� �Լ��� ȣ���Ͽ� ����.

ManualObject
����(vertices), ������Ÿ��(points, lines, surfaces), ����(material)�� �����ؾ���.
"begin() ...content... end()"���� �� section��� ������.