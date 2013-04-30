
# 기본조작
## 키보드
 UnityEditor
* Q : 화면조정
* W : 물체이동
* E : 물체회전
* R : 물체크기조정

* F : 선택한 물체의 변화점 중심으로 화면이동

* Ctrl + N : 새로운 씬
* Ctrl + Shift + N : 새로운 GameObject
* Ctrl + D : GameObject 복사

* Ctrl + P : 게임플레이 토글
* Ctrl + Shift + P : 게임 정지 토글

MonoDeveloper

* Ctrl + ' : 모노에디터상에서 함수에 커서를 두고, unity3d reference사이트로 이동. 

## 마우스
* Alt + 왼쪽   버튼 드래그 : 회전
* Alt + 가운데 버튼 드래그 : 이동
* Alt + 오른쪽 버튼 드래그 : 확대/축소

 
# 참고 링크들
* 3dbuzz 동영상 강의 : http://www.3dbuzz.com/
* 유니티3D 한국 동영상 강의 : http://www.unity3dstudy.com/
* 메뉴얼 번역 : http://whitesnake.uzoo.in/109
* 유니티 길찾기 알고리즘 플러그인 : http://itween.pixelplacement.com/index.php
* boo language : https://github.com/bamboo/boo/tree/2e08bcdf452b4ac431d77d7cfaa56e1ea6d8bfa3/extras
* Unity3D 에디터 커스터마이즈 : http://mobilism.tistory.com/entry/Unity3D-%EC%97%90%EB%94%94%ED%84%B0-%EC%BB%A4%EC%8A%A4%ED%84%B0%EB%A7%88%EC%9D%B4%EC%A6%88-1
* 터치입력 : http://blog.daum.net/_blog/BlogTypeView.do?blogid=0Eokl&articleno=188&categoryId=25&regdt=20110404160200#ajax_history_home
* 스크립트에서 오브젝트/컴포넌트 접근 및 활성화 : http://blog.daum.net/_blog/BlogTypeView.do?blogid=0Eokl&articleno=185&categoryId=25&regdt=20110211020453#ajax_history_home
* active.tutsplus.com/category/tutorials/unity/
* http://active.tutsplus.com/author/daniel-branicki/
* http://www.design3.com/training-center/engines-sdks/unity/techniques/binocular-gui
* http://blip.tv/m50-tutorials
* http://www.youtube.com/user/infiniteammoinc#g/c/EEAEA1E6B11B4DAE


# 기타소스들
```
C# : [ExecuteInEditMode]
Java : @script ExecuteInEditMode
boo : ifdef 

게임을 실행시키면서, 스크립트를 편집하기 위해 사용하는 Attribute
매 프래임마다 Update, FixedUpdate, OnGUI 함수가 실행

WaitForSeconds(sec as float) : 지정된 초만큼 기다림
WaitForEndOfFrame : frame이 렌더링 될때까지 기다림(스크린 샷 처리시 유용)
WaitForFixedUpdate : 다음 fixed-Update 단계까지 기다림(물리 효과에서 유용함)
 

내가 다른사람과 부딫쳤을 경우
OnCollisionEnter(Collision collision) : 충돌 지점에 진입할 때
OnCollisionStay(Collision collision) : 충돌중...
OnCollisionExit(Collision collision) : 충돌 지점에서 벗어날 때

 

다른사람이 나와 부딫쳤을 경우
OnTriggerEnter(Collider other) : 트리거와 접촉 시작
OnTriggerStay(Collider other) : 트리거와 접촉 중...
OnTriggerExit(Collider other) : 트리거와 접촉 종료

 

플렛폼
if(Application.platform != RuntimePlatform.IPhonePlayer)

 

//Vector3.forward 에서 vector3_A 로 이동시 라디안 값을 구한다.
float tempAngle1 = Mathf.Acos(Vector3.Dot(Vector3.forward, vector3_A));

 

// 값을 대입 한다. * 라디안 값이므로 각으로 변환 시킨다. 곱하기 (180/Mathf.PI)
Vector3 temp =  arrow.transform.eulerAngles;
arrow.transform.t.TransformDirection(new Vector3(temp.x,tempAngle1 * (180/Mathf.PI),temp.z));

 

singleton : http://rockonflash.wordpress.com/2010/10/21/singletons-in-unity3d/
unity3d에서 웹에 있는 데이터 다운받기(C# 포함) :  http://botta.tistory.com/37
AssetBundle 만들기 (Unity Pro, iPhone Advanced Only) : http://botta.tistory.com/38
오브젝트 회전 - Quaternion : http://blog.daum.net/hopefullife/183

 
알아두면 좋다

EditorWindow (ScriptableObject)
    GetWindow
    GetWindowWithRect

EditorUtility
    DisplayProgressBar
    ClearPrograssBar
   
EditorGUILayout
    Label
    TextField
    BeginToggleGroup
        Toggle
        Slider
    EndToggleGroup

Gizmos
    씬 뷰에 나오는 걸 시각적으로 보여줄 수 있도록 하기 위한것.
    OnDrawGizmos
    OnDrawGizmosSelected

Debug
 drawLine

CustomEditor Inherits from System.Attribute  
Editor.OnInspectorGUI

RaycastHit
Physics.Raycast
```
 
# walkerboystudio

http://walkerboystudio.com/html/unity_training___free__.html

- Unity Tool Development Project 3 - in HD
 * Part 2:   Tool Folder Creator Start
 * Part 3:   Tool Folder Creator Add Menu Item
 * Part 4:   Tool Folder Creator First Folder
 * Part 5:   Tool Folder Creator Complete
 * Part 6:   Tool Folder Creator Comments Refresh
 * Part 7:   Tool Prefab Creator Menu Item
 * Part 8:   Tool Prefab Creator Selection Array
 * Part 9:   Tool Prefab Creator Create Empty Prefab
 * Part 10: Tool Prefab Creator Replace Prefab
 * Part 11: Tool Prefab Creator Conditional

## 2D Game Development - SideScroller - in HD
- Part 3:   Character Animation : sprite조정
- Part 20: Camera 1 - Smooth Follow : 케릭터에 카메라가 따라갈때, Mathf.SmoothDamp
- Part 53: Gumba Function Chase Gizmos : 디버그 범위를 표시하기 위한 Gizmo사용