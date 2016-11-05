# 원격에 있는 clojure파일 편집하기.

* ref: http://www.danneu.com/posts/editing-clojure-remotely-with-emacs-tramp-nrepl/

```
remote$ lein repl :headless :port 50505

local$ ssh myuser@my.host.address -N -L 50505:localhost:50505

Emacs: C-x C-f //myuser@my.host.address:blogjure/src/blogjure/handler.clj
Emacs: M-x cider
    host: 127.0.0.1
    port: 50505
```

# 참고링크.
* Timothy Baldridge의 튜토리얼(유료)
 - https://tbaldridge.pivotshare.com/authors/timothy-baldridge/3486/media
