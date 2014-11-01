# osx ftp 서버 구동.
 참고: http://sculove.pe.kr/wp/mac-%EC%97%90%EC%84%9C-apache-php-ftp-%ED%99%98%EA%B2%BD%EC%84%A4%EC%A0%95/

- 시작: `sudo -s launchctl load -w /System/Library/LaunchDaemons/ftp.plist`
- 정지: `sudo -s launchctl unload -w /System/Library/LaunchDaemons/ftp.plist`

```
$ sudo mkdir -p /opt/FTP_SHARE
$ sudo chmod 755 /opt/FTP_SHARED
$ sudo vi /etc/ftpd.conf
    chroot GUEST /opt/FTP_SHARED
```

개발자 등록하지 않고 iOS 기기에 앱 설치하기
http://apollo89.com/wordpress/?p=5941
