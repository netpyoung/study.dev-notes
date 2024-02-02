케릭터가 앞을 보고있을때 그 정반대인 뒤를 클릭하면 케릭터가 거꾸로 도는 현상
(target.z가 player.z보다 작을때 발생)

src.y와 dir.y를 0으로 설정해준다.(y축 회전 방향 성분 제거)

http://www.gpgstudy.com/forum/viewtopic.php?p=87948
{ // Targetting
	if (isSetTarget)
	{
		mTarget_ent->setVisible(true);
		Ogre::Vector3 p = nPlayer->getPosition();
		Ogre::Vector3 t = mTarget->getPosition();
		Ogre::Vector3 dir = t - p;
		dir.y = 0;
		dir.normalise();

		Ogre::Vector3 src = nPlayer->getOrientation() * Ogre::Vector3::UNIT_Z;
		// 여기서 UNIT_Z는 케릭터가 바라보는 방향
		src.y = 0;
		src.normalise();

		Ogre::Quaternion q;
		q = src.getRotationTo(dir);
		nPlayer->rotate(q);
		PlayerMove(0, 0, acc);

		if ((abs(p.x - t.x) < 2) && (abs(p.z - t.z) < 2))
		{
			UnsetTarget();
			SetPlayerState(PlayerState::IDLE_BASE);
		}
	}
}