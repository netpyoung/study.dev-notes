# Git Commit Message

## Message

|                  |                                                                           |
| ---------------- | ------------------------------------------------------------------------- |
| Fix              | 버그를 고친 경우                                                          |
| Test             | 테스트 추가, 테스트 리팩토링(프로덕션 코드 변경 X)                        |
| Doc              | 문서를 수정한 경우                                                        |
| Chore            | 빌드 태스트 업데이트, 패키지 매니저를 설정하는 경우(프로덕션 코드 변경 X) |
| Feat             | 새로운 기능을 추가할 경우                                                 |
| !BREAKING CHANGE | 커다란 API 변경의 경우                                                    |
| !HOTFIX          | 급하게 치명적인 버그를 고쳐야하는 경우                                    |
| Style            | 코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우                     |
| Refactor         | 프로덕션 코드 리팩토링                                                    |
| Comment          | 필요한 주석 추가 및 변경                                                  |
| Rename           | 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우                        |
| Remove           | 파일을 삭제하는 작업만 수행한 경우                                        |
| Design           | CSS 등 사용자 UI 디자인 변경                                              |


- First line is important to tracking.
- `{tag}: {what i did} // {issue}`

```
Update TryParse code gen to use CodeWriter. (#46928) 

* Update TryParse code gen to use CodeWriter.
```

### Ref

- <https://www.conventionalcommits.org/en/v1.0.0/>
- <https://blog.sourcerer.io/using-commit-message-standardization-to-enhance-your-release-and-feature-management-6778c4b9cd8e>
- <https://github.com/dotnet/aspnetcore/commits/main>
- <https://blog.ssanj.net/posts/2015-10-22-git-commit-message-format.html>
