# Git


- <https://docs.gitea.com/next/installation/comparison>

## ignore

- <https://www.toptal.com/developers/gitignore>


|      |                                   |
| ---- | --------------------------------- |
| 2.34 | 기본 Merge 전략: recursive => ort |
| 2.33 | ort Merge 전략 추가               |
| 2.25 | sparse checkout                   |
| 2.24 | partial clone                     |


## git sinppet

``` sh
git log --pretty=fuller
git filter-branch --env-filter 'export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"'
```

- ref: <https://qiita.com/yug1224/items/c7663540bde617e348ac>


``` sh
git log --author="이름" --name-only --pretty=format: | grep "\.cs$" | sort | uniq > author.txt
```


## sparse-checkout

- Git 2.25 - <https://git-scm.com/docs/git-sparse-checkout>
- Git 2.24 - <https://git-scm.com/docs/partial-clone>

- ref
  - <https://github.blog/2020-01-13-highlights-from-git-2-25/>
  - <https://github.blog/2020-01-17-bring-your-monorepo-down-to-size-with-sparse-checkout/>
  - <https://github.blog/jp/2021-01-13-get-up-to-speed-with-partial-clone-and-shallow-clone/>
  - <https://tech.asoview.co.jp/entry/2023/03/14/095235>
  - <https://zenn.dev/mizchi/articles/gha-run-test-only-changed>
  - <https://tech.guitarrapc.com/entry/2023/06/15/000000>

## orphan

``` sh
git checkout --orphan helloworld
git rm -rf .
git commit --allow-empty -m "helloworld"
git push origin helloworld
```

## interpret-trailers

- <https://git-scm.com/docs/git-interpret-trailers>


## merge 전략

- ort(Ostensously Recursive's Twin)
- <https://git-scm.com/docs/merge-strategies>
- [Git의 새로운 기본 Merge 전략 ort](https://blog.outsider.ne.kr/1707)


### fast forward
- base와 다른 브랜치가 참조하는 커밋들이 동일 선상에 위치하고 있다.
  - 이 때 두 브랜치는 Fast-foward 상태에 있다고 한다.

--ff
fast-forward 관계에 있는 경우 새로운 commit을 생성하지 않고 브랜치의 참조 값만 변경되도록
--no-ff
non fast forward
merge 대상과 fast-forward 관계여도 강제로 merge commit을 생성하고 병합한다

### squash

짓누르다

--squash
feature 커밋들을 하나로 모아서 base에 합침

### rebase
base 재설정 - 커밋을 복사 붙여넣어가기 (커밋 id가 달라짐)

## Ref

- git real
  - <https://www.pluralsight.com/courses/code-school-git-real>
  - <https://www.pluralsight.com/courses/code-school-git-real-2>
- [Git Immersion](https://gitimmersion.com/index.html)
- [git - the simple guide](https://rogerdudler.github.io/git-guide/)
- [지옥에서 온 Git](https://opentutorials.org/course/2708)
- [Pro Git](https://git-scm.com/book/en/v2)


## Flow

- https://qiita.com/ogomr/items/36350d515434d6674caa

``` mermaid
---
title: Example Git diagram
config:
    theme: base
    gitGraph:
        mainBranchOrder: 1
        mainBranchName: dev
        showCommitLabel: true
    themeVariables:
        git0: "#00A0F0"
        git1: "#F0A000"
        git2: "#F0F000"
        git3: "#FF0000"
---

%% ref: https://mermaid.js.org/syntax/gitgraph.html

gitGraph TB:
    commit
    %% =========================== Feature
    branch feature/1-hello order: 0
    checkout feature/1-hello
    commit
    checkout dev
    merge feature/1-hello
    commit
    %% =========================== Release
    branch release order: 2
    checkout release
    commit tag:"0.0.1"
    checkout dev
    merge release
    checkout release
    %% =========================== HotFix
    branch hotfix/2-fix order: 3
    checkout hotfix/2-fix
    commit
    checkout release
    merge hotfix/2-fix
    commit tag:"0.0.2"
    checkout dev
    merge release
```

``` plantuml
skinparam shadowing false
skinparam ArrowColor #dimgray
skinparam EntityBorderColor #gray
skinparam SequenceLifeLineBorderColor #gray
skinparam NoteBorderColor #grey
skinparam roundcorner 15
skinparam maxmessagesize 60

entity "feature/1-hello" as branch_fix     #00A0F0
entity "dev" as branch_dev             #F0A000
entity "release" as branch_release     #F0F000
entity "hotfix/2-fix" as branch_hotfix #FF0000


== dev client/server ==

branch_dev -> branch_fix : branch
branch_fix -> branch_fix : commit
branch_fix ->o branch_dev : Pull Request

== dist client ==
branch_dev -> branch_release : for release
branch_release -> branch_release : tag
note right
0.0.1
endnote
branch_dev o<- branch_release : merge

== hotfix client ==
branch_release -> branch_hotfix : branch
branch_hotfix -> branch_hotfix : commit
branch_release o<- branch_hotfix
branch_release -> branch_release : tag
note right
0.0.2
endnote
branch_dev o<- branch_release : merge

```