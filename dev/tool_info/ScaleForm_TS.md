// ---------------------------------------------

MinimapDC.loadMovie로 할시 초기에 _visible속성을 제어할 수 없음.
MovieClipLoader로 onLoadComplete 콜백 함수를 등록하여 제어해야 함.

var loadListener:Object = new Object();
loadListener.onLoadComplete = function(target_mc:MovieClip):Void {
    target_mc._visible = false;
}

var mcLoader:MovieClipLoader = new MovieClipLoader();
mcLoader.addListener(loadListener);

var MinimapDC:MovieClip = this.createEmptyMovieClip("MinimapDC", this.getNextHighestDepth());
MinimapDC._x = 300;
MinimapDC._y = 10;
mcLoader.loadClip("Minimap.swf", MinimapDC);


// ---------------------------------------------
Gfx를 초기화할때 GFxImageCreator를 설정하지 않으면, 이미지 출력이 제대로 되지 않는 현상이 있음.(D3D)
    // For D3D, it is good to override image creator to keep image data,
    // so that it can be restored in case of a lost device.
    GPtr<GFxImageCreator> pimageCreator = *new GFxImageCreator(1);
    loader.SetImageCreator(pimageCreator);
	
	
// ---------------------------------------------
Ogre에서 GFxKeyEvent로 이벤트를 보낼시 swf에서 잘 인식하지 못하는 현상. - integration_tutorial문서 참조.

GFxKeyEvent의 나머지인자들(asciiCode나 wcharCode)를 잘 조정하거나, GFxCharEvent(UInt32 wcharCode)를 쓰면 된다.
GFxKeyEvent(EventType eventType = None,
	GFxKey::Code code = GFxKey::VoidSymbol,
	UByte asciiCode = 0,
	UInt32 wcharCode = 0)

GFxKeyEvent describes a keyboard event for a movie clip, it can be passed to GFxMovieView::HandleEvent. See GFxEvent description for more details.

The GFxCharEvent should be used in order to provide GFx with codes of character being typed. The analog of this event in Windows is WM_CHAR. All text fields receives character codes through this event. Use GFxMovieView::HandleEvent method to pass this event to GFx.


bool OgreScaleform::keyPressed( const OIS::KeyEvent &arg )
{
	GFxCharEvent event(arg.text);
	pMovie->HandleEvent(event);
	mCameraMan->injectKeyDown(arg);
	return true;
}

// ---------------------------------------------------

http://msdn.microsoft.com/en-us/library/windows/desktop/ee416848%28v=vs.85%29.aspx
DISCL - IDirectInputDevice8::SetCooperativeLevel method.
// ----------------------------------------------------
Ogre에서 D3D9 디바이스 정보 가져오기.
// Device
#if 1
	Ogre::RenderSystem* rs = mRoot->getRenderSystem();
	Ogre::D3D9RenderSystem* d3dRs = dynamic_cast<Ogre::D3D9RenderSystem*>( rs );
	assert(d3dRs);
	pDevice = d3dRs->getActiveD3D9Device();
#endif
// ----------------------------------------------------
OIS 키보드, 마우스 이벤트 콜백 설정
createInputObject( Type iType, bool bufferMod, blablabla...)
bufferMode를 참으로 설정해야 buffered input 즉 콜백을 동작시킬 수 있다.
    mKeyboard = static_cast<OIS::Keyboard*>(mInputManager->createInputObject( OIS::OISKeyboard, true ));
    mMouse = static_cast<OIS::Mouse*>(mInputManager->createInputObject( OIS::OISMouse, true ));
 
	mKeyboard->setEventCallback(this);
	mMouse->setEventCallback(this);

// ----------------------------------------------------
HUD 미니맵에서 MapMC회전시, Actionscript상에서 하는게 아니라, 소스 코드 상에서 해야함.
void OgreScaleform::AdjustHUDMap()
{
	
	int terrian_w = 1500;
	int terrian_h = 1500;

	int jpg_w = 500;
	int jpg_h = 500;

	int mapdc_w = 300;
	int mapdc_h = 300;

	int factor_w = terrian_w / jpg_w;
	int factor_h = terrian_h / jpg_h;

	float x, y;
	GMatrix2D terrainMat;
	terrainMat.SetIdentity();

	terrainMat.AppendScaling(factor_w, factor_h);

	x = nPlayer->getPosition().x - jpg_w * factor_w;
	y = nPlayer->getPosition().z - jpg_h * factor_h;
	terrainMat.AppendTranslation(x, y);

	float radian = nPlayer->getOrientation().getYaw().valueRadians();
	terrainMat.AppendRotation(radian);

	x = mapdc_w / 2;
	y = mapdc_h / 2;
	terrainMat.AppendTranslation(x, y);

	MapMC.SetDisplayMatrix(terrainMat);
}