// ---------------------------------------------

MinimapDC.loadMovie�� �ҽ� �ʱ⿡ _visible�Ӽ��� ������ �� ����.
MovieClipLoader�� onLoadComplete �ݹ� �Լ��� ����Ͽ� �����ؾ� ��.

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
Gfx�� �ʱ�ȭ�Ҷ� GFxImageCreator�� �������� ������, �̹��� ����� ����� ���� �ʴ� ������ ����.(D3D)
    // For D3D, it is good to override image creator to keep image data,
    // so that it can be restored in case of a lost device.
    GPtr<GFxImageCreator> pimageCreator = *new GFxImageCreator(1);
    loader.SetImageCreator(pimageCreator);
	
	
// ---------------------------------------------
Ogre���� GFxKeyEvent�� �̺�Ʈ�� ������ swf���� �� �ν����� ���ϴ� ����. - integration_tutorial���� ����.

GFxKeyEvent�� ���������ڵ�(asciiCode�� wcharCode)�� �� �����ϰų�, GFxCharEvent(UInt32 wcharCode)�� ���� �ȴ�.
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
Ogre���� D3D9 ����̽� ���� ��������.
// Device
#if 1
	Ogre::RenderSystem* rs = mRoot->getRenderSystem();
	Ogre::D3D9RenderSystem* d3dRs = dynamic_cast<Ogre::D3D9RenderSystem*>( rs );
	assert(d3dRs);
	pDevice = d3dRs->getActiveD3D9Device();
#endif
// ----------------------------------------------------
OIS Ű����, ���콺 �̺�Ʈ �ݹ� ����
createInputObject( Type iType, bool bufferMod, blablabla...)
bufferMode�� ������ �����ؾ� buffered input �� �ݹ��� ���۽�ų �� �ִ�.
    mKeyboard = static_cast<OIS::Keyboard*>(mInputManager->createInputObject( OIS::OISKeyboard, true ));
    mMouse = static_cast<OIS::Mouse*>(mInputManager->createInputObject( OIS::OISMouse, true ));
 
	mKeyboard->setEventCallback(this);
	mMouse->setEventCallback(this);

// ----------------------------------------------------
HUD �̴ϸʿ��� MapMCȸ����, Actionscript�󿡼� �ϴ°� �ƴ϶�, �ҽ� �ڵ� �󿡼� �ؾ���.
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