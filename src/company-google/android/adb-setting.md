adb setting
================================

참고 : http://blog.naver.com/asjgi?Redirect=Log&logNo=70133527976
참고 : http://forum.falinux.com/zbxe/?mid=android&listStyle=list


NDK : jni를 쉽게 쓰기 위한 wapper class


* java 다운로드.
 - http://www.oracle.com/technetwork/java/javase/downloads/jdk7-downloads-1880260.html

* android sdk 다운로드.
 - http://developer.android.com/sdk/index.html

* ADT bundle 셋팅.
 - http://developer.android.com/sdk/index.html
 - http://developer.android.com/sdk/installing/bundle.html
 - DOWNLOAD FOR OTHER PLATFORMS > ADT Bundle > Mac OS X 64-bit 다운로드.
 - 압축해제후, "~/adt-bundle-mac"로 폴더 이동.
 - "~/adt-bundle-mac/sdk/tools/android" 실행
 - Tools랑 API 레벨 가장높은거 체크해서 모두 install. accept all.


* device 판매사의 usb드라이버 다운로드.
 - usb 빼고 설치.
 - ex) lg : http://www.lgmobile.co.kr/lgmobile/front/download/retrieveDownloadMain.dev#phone

* eclipse 셋팅.
 - D:\adt-bundle-windows-x86_64\eclipse
 - Android SDK Manager => 빌드하고자하는 API레벨선택 install all.

* 디바이스 셋팅.
 - 휴대폰 - 개발자옵션 - usb debug.

# 기본 명령어
```
> adb devices
> adb shell
> adb install -r test.apk
```

```
> adb shell

$ top -m 5 # cpu 사용량 확인(15%면 상당히 큰거임, 75%이상이면 디바이스가 알아서 죽이니 리밋 조심)

$ logcat  # 로그볼때
```


## 패킷볼땐
```
$ tcpdump 옵션 주고
> adb pull 해서 데이터 뽑아내서 와이어샤크로 보면 편리함.
```


## sample.rb for Unity3D

```ruby
IDENTIFIER = "com.hello.world"
ACTIVITY = "#{IDENTIFIER}/com.hello.world.MainActivity"

apks = Dir["*.apk"]
latest_apk = apks.sort().reverse().first
install_cmd = "adb install -r #{latest_apk}"

launch_cmd = "adb shell am start -S -a android.intent.action.MAIN -n #{ACTIVITY}"
stop_cmd = "adb shell am force-stop #{IDENTIFIER}"

puts "APK: #{latest_apk}"

puts "#{install_cmd}"
puts `#{install_cmd}`

# puts "#{stop_cmd}"
# puts `#{stop_cmd}`

puts "#{launch_cmd}"
puts `#{launch_cmd}`

gets
```
