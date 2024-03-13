# Mermaid

- <https://mermaid.js.org/>
  - JavaScript based diagramming and charting tool
- <https://github.blog/2022-02-14-include-diagrams-markdown-files-mermaid/>
  - Mermaid는 Javascript를 이용 브라우저에서 실행되며 SVG를 이용 렌더링
  - Plantuml에는 Java와 GraphViz가 필요합니다.

|           |                     |
| --------- | ------------------- |
| 확장자    | `.mermaid` , `.mmd` |
| MIME type | `text/vnd.mermaid`  |

## TEST







## ETC


```mermaid
---
title: Node with text
---

%% this is comment

flowchart LR
    id1[This is the text in the box]

    A -- text --> B -- text2 --> C

    style id1 fill:#f9f,stroke:#333,stroke-width:4px

```

|     |                 |                                 |
| --- | --------------- | ------------------------------- |
| TB  | 위에서 아레     | Top to bottom                   |
| TD  | 위에서 아레     | Top-down/ same as top to bottom |
| BT  | 아레서 위       | Bottom to top                   |
| RL  | 오른쪽에서 왼쪽 | Right to left                   |
| LR  | 왼쪽에서 오른쪽 | Left to right                   |

|                 |                                     |
| --------------- | ----------------------------------- |
| sequenceDiagram |                                     |
| gitGraph        |                                     |
| flowchart       |                                     |
| classDiagram    |                                     |
| stateDiagram-v2 |                                     |
| C4Context       | 미묘...                             |


```
subgraph title
    graph definition
end
```

`%%`는 주석

```mermaid
graph TD;
    A-->B;
    A-->C{b};
    B-->D[Sqaure];
    C-->D;
```


GameSir G8 Galileo

## VSCode Extension

- [Mermaid Editor](https://marketplace.visualstudio.com/items?itemName=tomoyukim.vscode-mermaid-editor)
- [Mermaid Markdown Syntax Highlighting](https://marketplace.visualstudio.com/items?itemName=bpruitt-goddard.mermaid-markdown-syntax-highlighting)


| commit type |
| ----------- |
| NORMAL      |
| REVERSE     |
| HIGHLIGHT   |

```mermaid
---
title: Git branch - Client
---

%%{init: {
  'logLevel': 'debug',
  'theme': 'default',
  'themeVariables': {
    'git0': '#000000',
    'git1': '#00ff00',
    'git2': '#f000ff',
    'git3': '#ff0000'
  },
  'gitGraph': { 'rotateCommitLabel': false }
}}%%

%% gitGraph TB:
gitGraph LR:
    commit
    
    branch task/issue-id
    checkout task/issue-id
    commit
    checkout main
    merge task/issue-id
    commit
    
    branch release
    checkout release
    commit type:HIGHLIGHT id: "merge with main" tag:"0.0.0"

    branch hotfix/issue-id
    checkout hotfix/issue-id
    commit

    checkout release
    merge hotfix/issue-id tag: "0.0.1"

```

```mermaid
---
title: Git branch - Server
---

%%{init: {
  'logLevel': 'debug',
  'theme': 'default',
  'themeVariables': {
    'git0': '#000000',
    'git1': '#00ff00',
    'git2': '#f000ff',
    'git3': '#f000ff',
    'git4': '#ff0000'
  },
  'gitGraph': { 'rotateCommitLabel': false }
}}%%

%% gitGraph TB:
gitGraph LR:
    commit
    
    branch task/issue-id
    checkout task/issue-id
    commit
    checkout main
    merge task/issue-id
    commit

    branch server/dev
    checkout server/dev
    commit type:HIGHLIGHT id: "merge with main"

    
    branch server/live
    checkout server/live
    commit type:HIGHLIGHT id: "merge with server/dev" tag:"0.0.0"

    branch hotfix/issue-id
    checkout hotfix/issue-id
    commit

    checkout server/live
    merge hotfix/issue-id tag: "0.0.1"
```
    

```mermaid
---
title: Git branch - Localize
---

%%{init: {
  'logLevel': 'debug',
  'theme': 'default',
  'themeVariables': {
    'git0': '#000000',
    'git1': '#00ff00',
    'git2': '#f000ff',
    'git3': '#ff0000'
  },
  'gitGraph': { 'rotateCommitLabel': false }
}}%%

%% gitGraph TB:
gitGraph LR:
    commit
    
    commit
    
    branch distribute/dev
    checkout distribute/dev
    commit type:HIGHLIGHT id: "merge with main"


    branch distribute/live
    checkout distribute/live
    commit type:HIGHLIGHT id: "merge with distribute/dev"
```

## Ref

- https://www.dandoescode.com/blog/plantuml-vs-mermaid