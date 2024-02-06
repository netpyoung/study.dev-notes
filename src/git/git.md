# Git

## ignore

- <https://www.toptal.com/developers/gitignore>


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

## Ref

- git real
  - <https://www.pluralsight.com/courses/code-school-git-real>
  - <https://www.pluralsight.com/courses/code-school-git-real-2>
- [Git Immersion](https://gitimmersion.com/index.html)
- [git - the simple guide](https://rogerdudler.github.io/git-guide/)
- [지옥에서 온 Git](https://opentutorials.org/course/2708)
- [Pro Git](https://git-scm.com/book/en/v2)