�ɸ��Ͱ� ���� ���������� �� ���ݴ��� �ڸ� Ŭ���ϸ� �ɸ��Ͱ� �Ųٷ� ���� ����
(target.z�� player.z���� ������ �߻�)

src.y�� dir.y�� 0���� �������ش�.(y�� ȸ�� ���� ���� ����)

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
		// ���⼭ UNIT_Z�� �ɸ��Ͱ� �ٶ󺸴� ����
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