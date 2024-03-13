# Firebase

- [요금](https://firebase.google.com/pricing)

- Cloud Firestore
  - NoSQL 클라우드 데이터베이스

- 로컬테스트
  - Firebase Local Emulator Suite
- 트렌젝션
  - Cloud Firestore Support

- Unity SDK
  - git: [firebase-unity-sdk](https://github.com/firebase/firebase-unity-sdk)
    - [packages#firebase](https://developers.google.com/unity/packages#firebase)
    - [archive#firebase](https://developers.google.com/unity/archive#firebase)
  - [sample](https://github.com/firebase/quickstart-unity)
  - [setup](https://firebase.google.com/docs/unity/setup?hl=ko)

## 프로젝트

- Firebase 프로젝트는 실제로는 사용 설정된 Firebase 관련 구성과 서비스가 추가적으로 포함된 Google Cloud 프로젝트입니다.
- Console (관리)
  - [Firebase Console](https://console.firebase.google.com/)
  - [Google Cloud Console](https://console.cloud.google.com/)
  - [Google Cloud API Console](https://console.cloud.google.com/apis/)
- 식별자
  - `https://console.firebase.google.com/u/0/project/{project-id}/settings/general`
  - 프로젝트 이름: test-firebase
  - 프로젝트 ID: test-firebase-9999
  - 프로젝트 번호: 123456789012

## CLI

- [firebase CLI](https://firebase.google.com/docs/cli)

``` zsh
# 인스톨
$ npm install -g firebase-tools

# 버전확인
$ firebase --version

# 로그인
$ firebase login

# 프로젝트 새로 생성/기존프로젝트 선택
$ firebase init

# init 결과물
$ ls
.firebaserc
.gitignore
firebase.json # 포트는 firebase.json의 "emulators"에 정의되어있음

$ firebase emulators:start
# services
#   - Authentication: 인증
#   - Firestore: DB(nosql)
#   - Realtime Database: DB(nosql). 실시간.
#   - Functions: 서버리스
#   - Storage: 파일 저장소
#   - Hosting: 도메인사이트관리
#   - PubSub: 자동으로 확장되는 글로벌 분산형 메시지 버스.(Functions트리거 가능)
#   - Extensions: 앱 또는 프로젝트에서 구체적으로 정의된 이벤트가 발생할 때마다 작업을 수행하는 코드.
```

firebase-debug.log
firestore-debug.log
ui-debug.log
....

### firebase.json

- https://firebase.google.com/docs/cli?hl=ko#the_firebasejson_file

## Firebase Local Emulator Suite

- environment variable
  - FIRESTORE_EMULATOR_HOST
  - FIREBASE_AUTH_EMULATOR_HOST
  - PUBSUB_EMULATOR_HOST

## `.snk` file

- Strongly Named Key
- https://learn.microsoft.com/en-us/dotnet/standard/assembly/strong-named?redirectedfrom=MSDN
- https://stackoverflow.com/questions/131181/what-is-a-snk-for

## Unity앱에 Firebase추가

- [Firebase Console](https://console.firebase.google.com/)
- Unity앱에 Firebase추가
  - 앱등록: com.hello.world
  - 구성파일다운로드
    - 안드로이드: google-services.json
    - 아이폰: GoogleService-Info.plist
    - Assets/google-services.json , Assets/GoogleService-Info.plist
    - 자동
      - Generated Firebase Resources file Assets\Plugins\Android\FirebaseApp.androidlib\project.properties
      - Generated Firebase Resources file Assets\Plugins\Android\FirebaseApp.androidlib\AndroidManifest.xml
- [SHA 인증서 지문](https://developers.google.com/android/guides/client-auth)

``` zsh
# `.keystore` file
keytool -list -v -alias <your-key-name> -keystore <path-to-production-keystore>

# `.apk` file
keytool -printcert -jarfile app.apk

# `.aab` file
keytool -printcert -jarfile app.aab

# gradle
./gradlew signingReport
```

## Unity 코드

``` csharp
Firebase.DependencyStatus dependencyStatus = await Firebase.FirebaseApp.CheckAndFixDependenciesAsync();
if (dependencyStatus != Firebase.DependencyStatus.Available)
{
    return;
}

Firebase.FirebaseApp app = Firebase.FirebaseApp.DefaultInstance;
FirebaseAnalytics.SetAnalyticsCollectionEnabled(true);
```



Android Auto-resolution
https://itnext.io/google-firebase-with-dotnet-6-f8a4a62db0b1

https://github.com/CharlieDigital/dn6-firebase
https://github.com/CharlieDigital/dn7-source-generators