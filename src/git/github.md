# Github

## Github Action

- <https://docs.github.com/ko/billing/managing-billing-for-github-actions/about-billing-for-github-actions>

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
  - actions/configure-pages
  - actions/upload-pages-artifact
  - actions/deploy-pages
- changelog
  - [mindsers/changelog-reader-action](https://github.com/mindsers/changelog-reader-action)
  - [Azure/action-release-workflows](https://github.com/Azure/action-release-workflows)
- language
  - ruby // [ruby/setup-ruby](https://github.com/ruby/setup-ruby)
  - dotnet // [actions/setup-dotnet](https://github.com/actions/setup-dotnet)
- dev env
  - NDK // [nttld/setup-ndk](https://github.com/nttld/setup-ndk)
  - XCode // [maxim-lobanov/setup-xcode](https://github.com/maxim-lobanov/setup-xcode)
  - MSys2 [msys2/setup-msys2](https://github.com/msys2/setup-msys2)
  - MSBuild // [microsoft/setup-msbuild](https://github.com/microsoft/setup-msbuild)
  - MSVC // [ilammy/msvc-dev-cmd](https://github.com/ilammy/msvc-dev-cmd)
  - etc tools // [taiki-e/install-action](https://github.com/taiki-e/install-action)



## etc

- <https://docs.github.com/ko/enterprise-cloud@latest/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages>

``` yaml
schedule:
  cron: "0 0 */1 * *"


permissions:
  contents: write


```