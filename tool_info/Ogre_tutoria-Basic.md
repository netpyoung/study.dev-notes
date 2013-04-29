한글 : http://begin.pe.kr/category/Ogre3D 삽질란
영문 : http://www.ogre3d.org/tikiwiki/Tutorials
----------------------------------------------------------------------------
tutorial - 1
scene is an abstract representation of what is shown in a virtual world

SceneManager : 화면상에 보이는 모든 것을 관장하는 관리자
SceneNode : 객체의 위치, 회전 정보를 지님, SceneNode의 위치는 항상 부모SceneNode를 기반으로함.
Entity : scene에서 렌더링 할 수 있는 객체

SceneNode [  Entity  ] 이렇게 되야 렌더링 가능함.

# x,y,z축 회전 : pitch, yaw, roll

# 설정파일
plugins.cfg : "Plugin=[PluginName]" 플러그인을 찾을 장소를 변경할 수  있다.(상대경로 가능)
 - 주석은 #
 - .DLL을 붙이지 말것, "RenderSystem_"이나 "Plugin_"로 시작하지 말것
resources.cfg: 리소스를 포함한 폴더 설정.(상대경로가능)
 - 서브폴더를 포함하지 않으니 명시적으로 지시해야함.
media.cfg: skip
ogre.cfg: 컴퓨터 및 그래픽 설정
quake3settings.cfg: BSPSceneManager와 같이 사용하는 파일.
----------------------------------------------------------------------------
tutorial - 2

# camera
clipping distance : 얼마만큼 거리에 있어야 보이는가
	near는 가까이 far는 멀리

RenderWindow에게 어떤 카메라가 스크린을 뿌릴건지, 윈도우의 어떤 부분을 렌더링할지 말해줘야한다.

카메라의 Aspect ratio를 viewport에 맞추는 작업.
mCamera->setAspectRatio(Ogre::Real(vp->getActualWidth()) / Ogre::Real(vp->getActualHeight()));

# shadow : http://www.ogre3d.org/docs/manual/manual_70.html
Ogre::SHADOWTYPE_TEXTURE_MODULATIVE
Ogre::SHADOWTYPE_STENCIL_MODULATIVE
Ogre::SHADOWTYPE_STENCIL_ADDITIVE

mSceneMgr->setShadowTechnique(Ogre::SHADOWTYPE_STENCIL_ADDITIVE);
entNinja->setCastShadows(true);

# light
1. Diffuse color
  확산광 (擴散光)
2. Ambient color
  환경반사광. 전체 화면에 일정 색을 더해 주는 것으로 처리
3. Specular color
  정반사(正反射 : Specular Reflection)의 색상을 의미. 광원으로 부터 나오는 빛을 반사하여 시야에 들어오는 '하이라이트'를 의미
----------------------------------------------------------------------------
tutorial - 3 skipped

Terrain, Paging, Property
# terrian
TerrainGlobalOptions 
	MaxPixelError : 수가 적을 수록 정교해짐.
	CompositeMapDistance : lightmapped terrain에서 얼마만큼 지형을 렌더링할지 결정. 
	
# Sky
SkyBoxes : 정육면체
mSceneMgr->setSkyBox(isEnable, fname, 5000, false);
The third parameter sets the distance that the SkyBox is away from the Camera, and the fourth parameter sets whether or not the SkyBox is drawn before the rest of the scene or afterwards. 

SkyDomes : 아레가 뚤린 정육면체. 구면처럼 "projected"된다.

SkyPlanes : 판때기
	Cube가 아닌 Plane에 렌더링함. plane에 크기에 따라 SkyPlane이 끝나는 지점을 볼 수 도 있음.

# Fog
타입 : linear, exponential

fog는 구면체 - skybox&skydome 정육면체
fog와skybox&skydome을 같이쓰면 문제
skyplane을 이용하여 해결
----------------------------------------------------------------------------
tutorial - 4
# FrameListeners

virtual bool frameStarted(const FrameEvent& evt);
virtual bool frameRenderingQueued(const FrameEvent& evt);
virtual bool frameEnded(const FrameEvent& evt);

frameRenderingQueued
GPU가 렌더링버퍼를 flipping하기 전에 호출됨.
So you want to keep your CPU busy while the GPU works. 


# Unbuffered Input
frameRenderingQueued에서 Unbuffered Input을 처리함
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
	

buffered Input 에서는 capture가 필요함
	mKeyboard->capture();
	mMouse->capture();
----------------------------------------------------------------------------
tutorial - 6

1. Root 객체를 만들고
2. Ogre가 쓸 리소스를 정의
3. 렌더 시스템 설정.(DirectX, OpenGL, etc)
4. RenderWindow 생성 (the window which Ogre resides in).
5. 사용할 리소스 초기화
6. 리소스를 이용할 scene만들기
7. 3rd-party 라이브러리, 플러그인 설정
8. 프레임 리스너 생성
9. 렌더 루프 시작

---- #1. Root 객체 생성
Ogre::String mPluginsCfg;
	mPluginsCfg = "plugins_d.cfg";
	
#include <OgreRoot.h>
Ogre::Root* mRoot;
	mRoot = new Ogre::Root(mPluginsCfg);
	Root(pluginFname, configFname, logFname);// "plugins.cfg", "ogre.cfg", "Ogre.log"
	
	delete mRoot; // 어플리케이션 종료시 new를 해제해준다.

---- #2. 리소스 정의
#include <OgreConfigFile.h>
Ogre::String mResourcesCfg;
	mResourcesCfg = "resources_d.cfg";
	Ogre::ConfigFile cf;
	cf.load(mResourcesCfg);
	Ogre::ResourceGroupManager::getSingleton()
		.addResourceLocation(archName, typeName, secName);
			secName : 각 섹션의 이름(Essential, Popular, General)
			typeName : 리소스의 타입(FileSystem (folder) or Zip file)
			archName : 절대경로

---- #3. 렌더 시스템 설정.
	if(!(mRoot->restoreConfig() || mRoot->showConfigDialog()))
		return false;

---- #4. RenderWindow 생성
Ogre::RenderWindow* mWindow;
	mWindow = mRoot->initialise(true, "BasicTutorial6 Render Window");
---- #5. 사용할 리소스 초기화
	//Ogre::TextureManager::getSingleton().setDefaultNumMipmaps(5);
	Ogre::ResourceGroupManager::getSingleton()
		.initialiseAllResourceGroups();

---- #6. 리소스를 이용할 scene만들기
	##1. SceneManager 생성
	#include <OgreSceneManager.h>
	Ogre::SceneManager* mSceneMgr;
		mSceneMgr = mRoot->createSceneManager("DefaultSceneManager");
	##2. Camera 생성
	#include <OgreCamera.h>
	Ogre::Camera* mCamera;
		mCamera = mSceneMgr->createCamera("PlayerCam");
		//mCamera->setPosition(Ogre::Vector3(0,0,80));
		//mCamera->lookAt(Ogre::Vector3(0,0,-300));
		//mCamera->setNearClipDistance(5);
	##2-1. Viewport 추가
	#include <OgreViewport.h>
		Ogre::Viewport* vp = mWindow->addViewport(mCamera);
		vp->setBackgroundColour(Ogre::ColourValue(0,0,0));
		mCamera->setAspectRatio(
		Ogre::Real(vp->getActualWidth()) / Ogre::Real(vp->getActualHeight()));
	##3. Scene 생성
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

---- //#7. 3rd-party 라이브러리, 플러그인 설정
---- #8. 프레임 리스너 생성
	, public Ogre::FrameListener 상속
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
// 등록.
mRoot->addFrameListener(this);
mRoot->startRendering();

---- #9. 렌더 루프 시작 ( 프레임 리스너가 있을 경우 필요가 없음)
#include <OgreWindowEventUtilities.h>
	while(true)
	{
		// Pump window messages for nice behaviour
		Ogre::WindowEventUtilities::messagePump();
		if(mWindow->isClosed()) return false;
		if(!mRoot->renderOneFrame()) return false;
	}

---- #Etc. OIS 설정.
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

	// 등록
	windowResized(mWindow);
	Ogre::WindowEventUtilities::addWindowEventListener(mWindow, this);
	// 삭제
	Ogre::WindowEventUtilities::removeWindowEventListener(mWindow, this);
    windowClosed(mWindow);
	
	##finalize
	window의 event를 받기 우해 다음 클래스 상속 : public Ogre::WindowEventListener
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
mWindow에서 뷰포트 모두를 제거하고, SceneManager에서 카메라를 얻어온다.
mWindow->addViewport로 얻어온 카메라를 Viewport에 추가한다.

left, top, width, height 는 0~1사이의 값을 갖는다.
뷰포트를 추가할시, ZOrder값이 겹치면 에러가 난다.(ZOrder가 높으면 나중에 그려서, 결과적으로 ZOrder가 낮은 결과화면 위에 화면이 표시된다)
virtual Viewport* Ogre::RenderTarget::addViewport(
 	Camera *cam, int ZOrder = 0,
	float left = 0.0f, float top = 0.0f,
	float width = 1.0f, float height = 1.0f)
