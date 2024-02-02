# OmegaT

- 컴퓨터 보조 번역 - CAT(`C`omputer-`A`ssisted `T`ranslation)
- .tmx (`T`ranslation `M`emory `E`xchange)

- deepl
  - <https://www.deepl.com/ko/app/>
  - 무료버전이라도 데스크탑 어플리케이션 버전으로 설치후 단축키 `Ctrl + C + C`로 텍스트 번역후, `번역문 삽입`버튼을 눌러 빠르게 입력가능
  - <https://blog.naver.com/british2/223205919525>
    - 웹사이트 무료한도


- [repo](https://github.com/omegat-org/omegat)
  - <https://github.com/omegat-org/omegat/tree/master/doc_src/ja>
  - <https://github.com/omegat-org/omegat/tree/master/doc_src/ko>

|            |                                                                                                                   |
| ---------- | ----------------------------------------------------------------------------------------------------------------- |
| omegat.tmx | 여기에는 다른 OmegaT 프로젝트에서 재사용하기 위해 OmegaT가 내부적으로 사용하는 태그가 뒤따르는 번역이 포함됩니다. |
| level1.tmx | `TMX 1.4b 레벨 1` 데이터, 즉 태그 없이 번역의 텍스트 내용만 포함합니다.                                           |
| level2.tmx | `TMX 1.4b level1 2` 데이터, 즉 번역의 텍스트 내용을 포함하며 `TMX` 표준에 의해 정의된 구문의 태그가 포함됩니다.   |

## git

- git
  - <https://omegat.sourceforge.io/manual-latest/en/howtos.html#howto.setupteamproject>
  - [.gitignore](https://github.com/omegat-org/omegat/blob/master/.gitignore)

- OmegaT로 번역 중에는 정기적으로 자동으로 커밋과 푸시가 이루어진다.
- 또, 번역문 생성 전과 프로젝트를 닫는 타이밍에서도 행해진다.

- Project > New
  - Repository Mapping... > Remote repositories > Add
- java -jar OmegaT.jar team init [lang1] [lang2]

OmegaT는 두 개의 파일만 수정합니다.
- omegat/project_save.tmx
- glossary/glossary.txt


필터 ?? - <https://okapiframework.org/wiki/index.php?title=Okapi_Filters_Plugin_for_OmegaT#Download_and_Installation>

## glossary/

- 간단히 말해서 용어집.
- 'UTF-8'로 인코딩된 'CSV'(콤마로 구분된), 'TSV' 형식(탭으로 구분된 값)의 간단한 텍스트 파일

- 생성
  - Ctrl + Shift + g
  - Edit > Create Glossary Entry

``` txt
# Glossary in tab-separated format -*- coding: utf-8 -*-
hello	안녕	코맨트
```

- <https://github.com/nacyot/omegat-glossary/tree/master>
- <https://github.com/clojure-kr/translation>

- antconc
  - <https://www.laurenceanthony.net/software/antconc/>
  - A freeware corpus analysis toolkit for concordancing and text analysis.


|                        |                  |
| ---------------------- | ---------------- |
| 다음 세그먼트          | Ctrl + N         |
| 이전 세그먼트          | Ctrl + P         |
| 번역파일 생성(target/) | Ctrl+D           |
| glossary 추가          | Ctrl + Shift + g |

## 사전

- <https://ftp.tw.freebsd.org/distfiles/stardict/stardict-quick_eng-kor-2.4.2.tar.bz2>

- OpenAI 플러그인
  - <https://wikidocs.net/197120>
  - <https://github.com/ychoi-kr/omegat-plugin-openai-translate>

## 프로젝트 구조

``` txt

ProjectRoot
├── dictionary/             : 
├── glossary/               : 용어집 
├── source/                 : 번역할 파일을 넣는 위치. 
├── target/                 : 번역될 파일이 생성되는 위치.
├── omegat/                 : 
│   ├── ignored_words.txt   : 
│   ├── learned_words.txt   : 
│   ├── project_save.tmx    : OmegaT 는 번역 작업의 모든 내용을 번역 메모리( omegat폴더 project_save.tmx파일)에 저장합니다
│   └── project_stats.txt   : 
├── tm/                     : 번역 메모리 (`T`ranslation `M`emory) - 파일에 기록된 번역된 분절 정보는 현재 원문 분절과 정확히 일치하면 참조 번역 창에 표시됩니다.
│   ├── auto/               : 자동(번역이 무조껀 맞다고 생각되면 넣을것)
│   ├── enforce/            : project_save.tmx보다 우선 순위가 높은 것
│   ├── mt/                 : 
│   ├── penalty-xxx/        : "xxx"는 0 에서 100 까지의 수치 - ex) Penalty-30, 100% 일치하는 분절이 발견되면 일치율은 70%로 낮아져 표시
│   └── tmx2source/         : 다른 대상 언어로 번역된 문서에서 비롯된 메모리가 포함. 번역할 세그먼트 아래에 직접 표시된 다른 대상 언어로 번역된 내용을 볼 수 있음.
└── omegat.project          : xml. 프로젝트 설정 파일
```


## sample

- source: en-US
- translated: ko

## 



tbx(term based exchange)
utx(universal terminology exchange)
sdltm(sdl translation memory)
passolo glossary

번역 메모리 매니저(TMM)

## Ref

- <https://european-masters-translation-blog.ec.europa.eu/articles-emt-blog/multi-user-translation-and-open-source-cat-software-omegat-action-2022-05-10_en>
- <https://qiita.com/ktgw0316/items/b58579570a044f8d68cc>
  - 일본인이 Bartosz Milewski의 "Category Theory for Programmers"를 번역하면서 남긴 작업환경
- <https://tolgee.io/pricing/self-hosted#pricing-toggle> - 셀프호스팅 무료
- <https://github.com/ever-co/ever-traduora>
- [youtube: OmegaT의 기본 사용법에 대해 알아보겠습니다.](https://www.youtube.com/watch?v=q9n3_IZtL-w)
- <https://github.com/nacyot/omegat-emacs.sexy>
  - <https://github.com/nacyot/omegat-emacs.sexy/blob/master/.travis.yml>
- <https://cestlaz.github.io/stories/emacs/>
- [3 OmegaT: 전문가를 위한 번역 도구](https://wikidocs.net/67058)
- <https://802.11ac.net/2021/02/05/dont-return-minus-1/#fn:1>
- <https://codeberg.org/miurahr/omegat-flat-theme>
- <https://sourceforge.net/projects/omegat-gt-without-api-key/>
- <https://www.linkedin.com/pulse/unleashing-power-omegat-60-mastering-your-translation-v%C3%ADctor-parra/>
- <https://omegat.sourceforge.io/manual-standard/en/chapter.how.to.html#how.to.use.team.project>
