단어의 "의미"를 붙이셈.
=========================================================================

```시
김춘수


내가 그의 이름을 불러 주기 전에는
그는 다만
하나의 몸짓에 지나지 않았다.

내가 그의 이름을 불러 주었을 때
그는 나에게로 와서
꽃이 되었다.

내가 그의 이름을 불러 준 것처럼
나의 이 빛깔과 향기(香氣)에 알맞는
누가 나의 이름을 불러다오.
그에게로 가서 나도
그의 꽃이 되고 싶다.

우리들은 모두
무엇이 되고 싶다.
너는 나에게 나는 너에게
잊혀지지 않는 하나의 의미가 되고 싶다.

<꽃의 소묘(素描), 백자사, 1959>
```


# 변수.
대체어
* send  : deliver, dispatch, announce, distribute, route
* find  : search, extract, locate, recover
* start : launch, create, begin, open
* make  : create, set up, build, generate, compose, add, new

# 목적을 명시하자(지나친 생략은 독약)
* tmp => tmp_file

* `i,j,k`가 좋을까? `ci, mi, ui`가 좋을까?

```cpp
for (int i = 0; i < clubs.size(); i++)
    for (int j = 0; j < clubs[i].members.size(); j++)
        for (int k = 0; k < users.size(); k++)
            if (clubs[i].members[k] == users[j])
                cout << "user[" << j << "] is in club[" << i << "]" << endl;
```

* ThrottleDownload(float limit) limit => max_kbps
* password => plaintext_password

# 변수의 길이?
* 변수가 사용되는 빈도수에 맞게 결정.

# 위치값 명명규칙
```note
[1,2,3,4,5][]
```
* first : 1
* last  : 5
* begin : 1
* end   : []


# 부울값(단, 부정어구는 __무조껀__피할것)
is, has, can, should 

# 주석
* TODO: 머머 해야됨.
* FIXME: 뭔가 문제있음.
* HACK: 우아하진 않지만 돌아가게 만듬.
* BOOM: 건들면 터질것같은 코드.
* ref: 레퍼런스

# 주석
```cpp
// Force vector to relinquish its memory (look up "STL swap trick")
vector<float>().swap(data);
```

```cpp
// bad
// Return the number of lines in this file.
int CountLines(string filename) { ... }
// ? "" (an empty file)?0 or 1 line?
// ? "hello"?0 or 1 line?
// ? "hello\n"?1 or 2 lines?
// ? "hello\n world"?1 or 2 lines?
// ? "hello\n\r cruel\n world\r"?2, 3, or 4 lines?

// good
// Count how many newline bytes ('\n') are in the file.
int CountLines(string filename) { ... }
```


```cpp
// Example: Partition([8 5 9 8 2], 8) might result in [5 2 | 8 9 8] and return 1
```