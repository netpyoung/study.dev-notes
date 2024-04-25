# Github

## Github Action

- <https://docs.github.com/ko/billing/managing-billing-for-github-actions/about-billing-for-github-actions>
- <https://docs.github.com/en/actions/using-workflows/about-workflows>

| 요금               | 분(월) | 스토리지 |
| ------------------ | ------ | -------- |
| Gtihub Free        | 2,000  | 500 MB   |
| 조직용 GitHub Free | 2,000  | 500 MB   |

- ref
  - <https://github.com/GuillaumeFalourd/useful-actions>
  - <https://github.com/sdras/awesome-actions>


- checkout
  - [actions/checkout](https://github.com/actions/checkout/)
- cache
  - [actions/cache](https://github.com/actions/cache/)
- artifact
  - [upload-artifact](https://github.com/actions/upload-artifact)
  - [download-artifact](https://github.com/actions/download-artifact)
- release page
  - [softprops/action-gh-release](https://github.com/softprops/action-gh-release)
  - [ncipollo/release-action](https://github.com/ncipollo/release-action)
- gh page
  - [actions/configure-pages ](https://github.com/actions/configure-pages)
  - [actions/upload-pages-artifact](https://github.com/actions/upload-pages-artifact) 
  - [actions/deploy-pages ](https://github.com/actions/deploy-pages)
- changelog
  - [mindsers/changelog-reader-action](https://github.com/mindsers/changelog-reader-action)
  - [Azure/action-release-workflows](https://github.com/Azure/action-release-workflows)
- language
  - ruby // [ruby/setup-ruby](https://github.com/ruby/setup-ruby)
  - dotnet // [actions/setup-dotnet](https://github.com/actions/setup-dotnet)
- quality
  - codeql
    - <https://codeql.github.com/>
    - <https://github.com/github/codeql-action>
      - github/codeql-action/init
      - github/codeql-action/autobuild
      - github/codeql-action/analyze
- dev env
  - NDK // [nttld/setup-ndk](https://github.com/nttld/setup-ndk)
  - XCode // [maxim-lobanov/setup-xcode](https://github.com/maxim-lobanov/setup-xcode)
  - MSys2 [msys2/setup-msys2](https://github.com/msys2/setup-msys2)
  - MSBuild // [microsoft/setup-msbuild](https://github.com/microsoft/setup-msbuild)
  - MSVC // [ilammy/msvc-dev-cmd](https://github.com/ilammy/msvc-dev-cmd)
  - etc tools // [taiki-e/install-action](https://github.com/taiki-e/install-action)
- issue
  - labeling // [actions/labeler](https://github.com/actions/labeler)
- project
  - [actions/add-to-project](https://github.com/actions/add-to-project)
- notify
  - 여러개가 있는데 서비스에 맞게 찾아보자



## etc

- <https://docs.github.com/ko/enterprise-cloud@latest/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages>

``` yaml
schedule:
  cron: "0 0 */1 * *"


permissions:
  contents: write


```

## 이슈 라벨링

- ref
  - <https://docs.github.com/ko/issues/using-labels-and-milestones-to-track-work/managing-labels>
  - <https://github.com/lablup/backend.ai/labels>

|                        |                                                                                                   |
| ---------------------- | ------------------------------------------------------------------------------------------------- |
| action:on hold         | Hold it. Wait for the restart.                                                                    |
|                        |                                                                                                   |
| area:docs              | Documentations                                                                                    |
| area:i18n              | Localization                                                                                      |
| area:infrastructure    | Infrastructure-related issues                                                                     |
| area:security          | Security issue.                                                                                   |
| area:upstream          | Issues with root cause from upstream 3rd parties                                                  |
| area:ux                | UI / UX issue.                                                                                    |
|                        |                                                                                                   |
| comp:agent             | Related to Agent component                                                                        |
| comp:appproxy          | Related to App Proxy component                                                                    |
| comp:cli               | Related to CLI component                                                                          |
| comp:client            | Related to Client component                                                                       |
| comp:common            | Related to Common component                                                                       |
| comp:installer         | Related to Installer                                                                              |
| comp:manager           | Related to Manager component                                                                      |
| comp:storage-proxy     | Related to Storage proxy component                                                                |
| comp:webserver         | Related to Web Server component                                                                   |
| comp:webui             | Related to WebUI component                                                                        |
|                        |                                                                                                   |
| dependencies           | Pull requests that update a dependency file                                                       |
|                        |                                                                                                   |
| effort:easy            | Need to understand only a specific region of codes (good first issue, easy).                      |
| effort:epic            | Need to split into multiple sub-issues (epic).                                                    |
| effort:hard            | Need to understand many components / a large extent of contextual or historical information.      |
| effort:normal          | Need to understand a few modules / some extent of contextual or historical information.           |
|                        |                                                                                                   |
| github_actions         | Pull requests that update GitHub Actions code                                                     |
|                        |                                                                                                   |
| hacktoberfest-accepted |
|                        |                                                                                                   |
| impact:breaking        | Breaking or highlighted changes.                                                                  |
| impact:invisible       | This change is invisible to users (internal changes).                                             |
| impact:visible         | This change is visible to users.                                                                  |
|                        |                                                                                                   |
| ossca-23               | OSS Contribution Academy mentee's contributions.                                                  |
|                        |                                                                                                   |
| pending:backport       | Waiting for backports                                                                             |
|                        |                                                                                                   |
| platform:enterprise    | Backend.AI Enterprise support.                                                                    |
| platform:general       | General platform issues. Most issues are general.                                                 |
|                        |                                                                                                   |
| require:config-update  | Local config update required. Consult the PR description or updated documentation.                |
| require:db-migration   | Automatically set when alembic migrations are added or updated                                    |
| require:pants-export   | Dependencies updated. You need to run `pants export --resolve=python-default` to make it working. |
|                        |                                                                                                   |
| size:L                 | 100~500 LoC                                                                                       |
| size:M                 | 30~100 LoC                                                                                        |
| size:S                 | 10~30 LoC                                                                                         |
| size:XL                | 500~ LoC                                                                                          |
| size:XS                | ~10 LoC                                                                                           |
|                        |                                                                                                   |
| skip:changelog         | Make the action workflow to skip towncrier check                                                  |
| skip:ci                | Make the action workflow to skip running lint, check, and test (use with caution!)                |
|                        |                                                                                                   |
| status:duplicate       | This issue is duplicated.                                                                         |
| status:help wanted     | Extra attention is needed.                                                                        |
| status:invalid         | This issue is invalid.                                                                            |
| status:open            | Waiting for volunteer / assignnee.                                                                |
| status:rejected        | There is no plan to fix this issue.                                                               |
|                        |                                                                                                   |
| type:bug               | Reports about that are not working                                                                |
| type:enhance           | Enhance component, behavior, internals without user-facing features                               |
| type:feature           | Add new features                                                                                  |
| type:feedback          | A suggestion about feature.                                                                       |
| type:maintenance       | Maintenance issue.                                                                                |
| type:question          | A question about feature.                                                                         |
| type:refactor          | Refactoring current implementation.                                                               |
|                        |                                                                                                   |
| urgency:blocker        | IT SHOULD BE RESOLVED BEFORE NEXT RELEASE!                                                        |
| urgency:1              | If no other duties are available, volunteer to help.                                              |
| urgency:2              | With time limit, it should be finished within it; otherwise, resolve it when no other chores.     |
| urgency:3              | Must be finished within a certain time frame.                                                     |
| urgency:4              | As soon as feasible, implementation is essential.                                                 |
| urgency:5              | It is imperative that action be taken right away.                                                 |

## .github/


``` txt
.github/
  workflows/
  ISSUE_TEMPLATE/
    bug_report.md
  pull_request_template.md
```

## codeql

- <https://docs.github.com/en/code-security/codeql-cli>
- <https://learn.microsoft.com/en-us/dotnet/devops/dotnet-secure-github-action>