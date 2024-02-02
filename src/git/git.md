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


# Ref

- git real
  - <https://www.pluralsight.com/courses/code-school-git-real>
  - <https://www.pluralsight.com/courses/code-school-git-real-2>
- [Git Immersion](https://gitimmersion.com/index.html)
- [git - the simple guide](https://rogerdudler.github.io/git-guide/)
- [지옥에서 온 Git](https://opentutorials.org/course/2708)
- [Pro Git](https://git-scm.com/book/en/v2)