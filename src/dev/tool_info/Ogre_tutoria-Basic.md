�ѱ� : http://begin.pe.kr/category/Ogre3D ������
���� : http://www.ogre3d.org/tikiwiki/Tutorials
----------------------------------------------------------------------------
tutorial - 1
scene is an abstract representation of what is shown in a virtual world

SceneManager : ȭ��� ���̴� ��� ���� �����ϴ� ������
SceneNode : ��ü�� ��ġ, ȸ�� ������ ����, SceneNode�� ��ġ�� �׻� �θ�SceneNode�� ���������.
Entity : scene���� ������ �� �� �ִ� ��ü

SceneNode [  Entity  ] �̷��� �Ǿ� ������ ������.

# x,y,z�� ȸ�� : pitch, yaw, roll

# ��������
plugins.cfg : "Plugin=[PluginName]" �÷������� ã�� ��Ҹ� ������ ��  �ִ�.(����� ����)
 - �ּ��� #
 - .DLL�� ������ ����, "RenderSystem_"�̳� "Plugin_"�� �������� ����
resources.cfg: ���ҽ��� ������ ���� ����.(����ΰ���)
 - ���������� �������� ������ ��������� �����ؾ���.
media.cfg: skip
ogre.cfg: ��ǻ�� �� �׷��� ����
quake3settings.cfg: BSPSceneManager�� ���� ����ϴ� ����.
----------------------------------------------------------------------------
tutorial - 2

# camera
clipping distance : �󸶸�ŭ �Ÿ��� �־�� ���̴°�
	near�� ������ far�� �ָ�

RenderWindow���� � ī�޶� ��ũ���� �Ѹ�����, �������� � �κ��� ���������� ��������Ѵ�.

ī�޶��� Aspect ratio�� viewport�� ���ߴ� �۾�.
mCamera->setAspectRatio(Ogre::Real(vp->getActualWidth()) / Ogre::Real(vp->getActualHeight()));

# shadow : http://www.ogre3d.org/docs/manual/manual_70.html
Ogre::SHADOWTYPE_TEXTURE_MODULATIVE
Ogre::SHADOWTYPE_STENCIL_MODULATIVE
Ogre::SHADOWTYPE_STENCIL_ADDITIVE

mSceneMgr->setShadowTechnique(Ogre::SHADOWTYPE_STENCIL_ADDITIVE);
entNinja->setCastShadows(true);

# light
1. Diffuse color
  Ȯ�걤 (��ߤ��)
2. Ambient color
  ȯ��ݻ籤. ��ü ȭ�鿡 ���� ���� ���� �ִ� ������ ó��
3. Specular color
  ���ݻ�(������ : Specular Reflection)�� ������ �ǹ�. �������� ���� ������ ���� �ݻ��Ͽ� �þ߿� ������ '���̶���Ʈ'�� �ǹ�
----------------------------------------------------------------------------
tutorial - 3 skipped

Terrain, Paging, Property
# terrian
TerrainGlobalOptions 
	MaxPixelError : ���� ���� ���� ��������.
	CompositeMapDistance : lightmapped terrain���� �󸶸�ŭ ������ ���������� ����. 
	
# Sky
SkyBoxes : ������ü
mSceneMgr->setSkyBox(isEnable, fname, 5000, false);
The third parameter sets the distance that the SkyBox is away from the Camera, and the fourth parameter sets whether or not the SkyBox is drawn before the rest of the scene or afterwards. 

SkyDomes : �Ʒ��� �Ը� ������ü. ����ó�� "projected"�ȴ�.

SkyPlanes : �Ƕ���
	Cube�� �ƴ� Plane�� ��������. plane�� ũ�⿡ ���� SkyPlane�� ������ ������ �� �� �� ����.

# Fog
Ÿ�� : linear, exponential

fog�� ����ü - skybox&skydome ������ü
fog��skybox&skydome�� ���̾��� ����
skyplane�� �̿��Ͽ� �ذ�
----------------------------------------------------------------------------
tutorial - 4
# FrameListeners

virtual bool frameStarted(const FrameEvent& evt);
virtual bool frameRenderingQueued(const FrameEvent& evt);
virtual bool frameEnded(const FrameEvent& evt);

frameRenderingQueued
GPU�� ���������۸� flipping�ϱ� ���� ȣ���.
So you want to keep your CPU busy while the GPU works. 


# Unbuffered Input
frameRenderingQueued���� Unbuffered Input�� ó����
----------------------------------------------------------------------------
tutorial - 5

# Buffered Input
    // OIS::KeyListener
    virtual bool keyPressed( const OIS::KeyEvent& evt );
    virtual bool keyReleased( const OIS::KeyEvent& evt );
    // OIS::MouseListener
    virtual bool mouseMoved( const OIS::MouseEvent& evt );
    virtual bool mousePressed( const OIS::MouseEvent& evt, OIS::MouseButtonID id );
    virtual bool mouseReleased( const OIS::MouseEvent& evt, OIS::MouseButtonID id );
	

buffered Input ������ capture�� �ʿ���
	mKeyboard->capture();
	mMouse->capture();
----------------------------------------------------------------------------
tutorial - 6

1. Root ��ü�� �����
2. Ogre�� �� ���ҽ��� ����
3. ���� �ý��� ����.(DirectX, OpenGL, etc)
4. RenderWindow ���� (the window which Ogre resides in).
5. ����� ���ҽ� �ʱ�ȭ
6. ���ҽ��� �̿��� scene�����
7. 3rd-party ���̺귯��, �÷����� ����
8. ������ ������ ����
9. ���� ���� ����

---- #1. Root ��ü ����
Ogre::String mPluginsCfg;
	mPluginsCfg = "plugins_d.cfg";
	
#include <OgreRoot.h>
Ogre::Root* mRoot;
	mRoot = new Ogre::Root(mPluginsCfg);
	Root(pluginFname, configFname, logFname);// "plugins.cfg", "ogre.cfg", "Ogre.log"
	
	delete mRoot; // ���ø����̼� ����� new�� �������ش�.

---- #2. ���ҽ� ����
#include <OgreConfigFile.h>
Ogre::String mResourcesCfg;
	mResourcesCfg = "resources_d.cfg";
	Ogre::ConfigFile cf;
	cf.load(mResourcesCfg);
	Ogre::ResourceGroupManager::getSingleton()
		.addResourceLocation(archName, typeName, secName);
			secName : �� ������ �̸�(Essential, Popular, General)
			typeName : ���ҽ��� Ÿ��(FileSystem (folder) or Zip file)
			archName : ������

---- #3. ���� �ý��� ����.
	if(!(mRoot->restoreConfig() || mRoot->showConfigDialog()))
		return false;

---- #4. RenderWindow ����
Ogre::RenderWindow* mWindow;
	mWindow = mRoot->initialise(true, "BasicTutorial6 Render Window");
---- #5. ����� ���ҽ� �ʱ�ȭ
	//Ogre::TextureManager::getSingleton().setDefaultNumMipmaps(5);
	Ogre::ResourceGroupManager::getSingleton()
		.initialiseAllResourceGroups();

---- #6. ���ҽ��� �̿��� scene�����
	##1. SceneManager ����
	#include <OgreSceneManager.h>
	Ogre::SceneManager* mSceneMgr;
		mSceneMgr = mRoot->createSceneManager("DefaultSceneManager");
	##2. Camera ����
	#include <OgreCamera.h>
	Ogre::Camera* mCamera;
		mCamera = mSceneMgr->createCamera("PlayerCam");
		//mCamera->setPosition(Ogre::Vector3(0,0,80));
		//mCamera->lookAt(Ogre::Vector3(0,0,-300));
		//mCamera->setNearClipDistance(5);
	##2-1. Viewport �߰�
	#include <OgreViewport.h>
		Ogre::Viewport* vp = mWindow->addViewport(mCamera);
		vp->setBackgroundColour(Ogre::ColourValue(0,0,0));
		mCamera->setAspectRatio(
		Ogre::Real(vp->getActualWidth()) / Ogre::Real(vp->getActualHeight()));
	##3. Scene ����
	/*
	#include <OgreEntity.h>
	Ogre::Entity* ogreHead = mSceneMgr->createEntity("Head", "ogrehead.mesh");
	Ogre::SceneNode* headNode = mSceneMgr->getRootSceneNode()->createChildSceneNode();
headNode->attachObject(ogreHead);
 
	// Set ambient light
	mSceneMgr->setAmbientLight(Ogre::ColourValue(0.5, 0.5, 0.5));
	 
	// Create a light
	Ogre::Light* l = mSceneMgr->createLight("MainLight");
	l->setPosition(20,80,50);
	*/

---- //#7. 3rd-party ���̺귯��, �÷����� ����
---- #8. ������ ������ ����
	, public Ogre::FrameListener ���
virtual bool frameRenderingQueued(const Ogre::FrameEvent& evt);
bool BasicTutorial6::frameRenderingQueued(const Ogre::FrameEvent& evt)
{
    if(mWindow->isClosed())
        return false;
 
    //Need to capture/update each device
    mKeyboard->capture();
    mMouse->capture();
 
    if(mKeyboard->isKeyDown(OIS::KC_ESCAPE))
        return false;
 
    return true;
}
// ���.
mRoot->addFrameListener(this);
mRoot->startRendering();

---- #9. ���� ���� ���� ( ������ �����ʰ� ���� ��� �ʿ䰡 ����)
#include <OgreWindowEventUtilities.h>
	while(true)
	{
		// Pump window messages for nice behaviour
		Ogre::WindowEventUtilities::messagePump();
		if(mWindow->isClosed()) return false;
		if(!mRoot->renderOneFrame()) return false;
	}

---- #Etc. OIS ����.
#include <OISEvents.h>
#include <OISInputManager.h>
#include <OISKeyboard.h>
#include <OISMouse.h>
	## init
	Ogre::LogManager::getSingletonPtr()->logMessage("*** Initializing OIS ***");
	OIS::ParamList pl;
	size_t windowHnd = 0;
	std::ostringstream windowHndStr;
	 
	mWindow->getCustomAttribute("WINDOW", &windowHnd);
	windowHndStr << windowHnd;
	pl.insert(std::make_pair(std::string("WINDOW"), windowHndStr.str()));
	 
	mInputManager = OIS::InputManager::createInputSystem( pl );

	mKeyboard = static_cast<OIS::Keyboard*>(mInputManager->createInputObject( OIS::OISKeyboard, false ));
	mMouse = static_cast<OIS::Mouse*>(mInputManager->createInputObject( OIS::OISMouse, false ));

	// ���
	windowResized(mWindow);
	Ogre::WindowEventUtilities::addWindowEventListener(mWindow, this);
	// ����
	Ogre::WindowEventUtilities::removeWindowEventListener(mWindow, this);
    windowClosed(mWindow);
	
	##finalize
	window�� event�� �ޱ� ���� ���� Ŭ���� ��� : public Ogre::WindowEventListener
	//Adjust mouse clipping area
	void BasicTutorial6::windowResized(Ogre::RenderWindow* rw)
	{
		unsigned int width, height, depth;
		int left, top;
		rw->getMetrics(width, height, depth, left, top);
	 
		const OIS::MouseState &ms = mMouse->getMouseState();
		ms.width = width;
		ms.height = height;
	}
	 
	//Unattach OIS before window shutdown (very important under Linux)
	void BasicTutorial6::windowClosed(Ogre::RenderWindow* rw)
	{
		//Only close for window that created OIS (the main window in these demos)
		if( rw == mWindow )
		{
			if( mInputManager )
			{
				mInputManager->destroyInputObject( mMouse );
				mInputManager->destroyInputObject( mKeyboard );
	 
				OIS::InputManager::destroyInputSystem(mInputManager);
				mInputManager = 0;
			}
		}
	}
----------------------------------------------------------------------------
tutorial - 7 // skipp
http://www.ogre3d.org/tikiwiki/Basic+Tutorial+7
http://www.cegui.org.uk/wiki/index.php/Main_Page
----------------------------------------------------------------------------
tutorial - 8
# Multiple and Dual SceneManagers
  scene1 - SceneMng1 - cam1
  scene2 - SceneMng2 - cam2
	mWindow->removeAllViewports();
	Ogre::Camera *cam = curr->getCamera(CAMERA_NAME);
	Ogre::Viewport *vp;
	//single viewport
		vp = mWindow->addViewport(cam);
	// dual viewport	
		vp = mWindow->addViewport(cam, 0, 0, 0, 0.5, 1);
		vp = mWindow->addViewport(cam, 1, 0.5, 0, 0.5, 1);		
	vp->setBackgroundColour(Ogre::ColourValue(0,0,0));
	cam->setAspectRatio(Ogre::Real(vp->getActualWidth()) / Ogre::Real(vp->getActualHeight()));
mWindow���� ����Ʈ ��θ� �����ϰ�, SceneManager���� ī�޶� ���´�.
mWindow->addViewport�� ���� ī�޶� Viewport�� �߰��Ѵ�.

left, top, width, height �� 0~1������ ���� ���´�.
����Ʈ�� �߰��ҽ�, ZOrder���� ��ġ�� ������ ����.(ZOrder�� ������ ���߿� �׷���, ��������� ZOrder�� ���� ���ȭ�� ���� ȭ���� ǥ�õȴ�)
virtual Viewport* Ogre::RenderTarget::addViewport(
 	Camera *cam, int ZOrder = 0,
	float left = 0.0f, float top = 0.0f,
	float width = 1.0f, float height = 1.0f)
