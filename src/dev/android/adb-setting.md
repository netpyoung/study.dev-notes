adb setting
================================

���� : http://blog.naver.com/asjgi?Redirect=Log&logNo=70133527976
���� : http://forum.falinux.com/zbxe/?mid=android&listStyle=list


NDK : jni�� ���� ���� ���� wapper class


* java �ٿ�ε�.
 - http://www.oracle.com/technetwork/java/javase/downloads/jdk7-downloads-1880260.html

* android sdk �ٿ�ε�.
 - http://developer.android.com/sdk/index.html

* ADT bundle ����.
 - http://developer.android.com/sdk/installing/bundle.html

* device �ǸŻ��� usb����̹� �ٿ�ε�.
 - usb ���� ��ġ.
 - ex) lg : http://www.lgmobile.co.kr/lgmobile/front/download/retrieveDownloadMain.dev#phone

* eclipse ����.
 - D:\adt-bundle-windows-x86_64\eclipse
 - Android SDK Manager => �����ϰ����ϴ� API�������� install all.

* ����̽� ����.
 - �޴��� - �����ڿɼ� - usb debug.

# �⺻ ��ɾ�
```
> adb devices
> adb shell
> adb install -r test.apk
```

```
> adb shell

$ top -m 5 # cpu ��뷮 Ȯ��(15%�� ����� ū����, 75%�̻��̸� ����̽��� �˾Ƽ� ���̴� ���� ����)

$ logcat  # �α׺���
```


## ��Ŷ����
```
$ tcpdump �ɼ� �ְ�
> adb pull �ؼ� ������ �̾Ƴ��� ���̾��ũ�� ���� ����.
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
