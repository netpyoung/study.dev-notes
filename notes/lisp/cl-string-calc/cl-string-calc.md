
  웹에서 Clojure - emacs 를 이용한 [String calculator katacast]를 보게되었고 Common Lisp에서 한번 해보자는 생각에 emacs를 켜서 작성해보았다.

 일단 tdd환경을 구축하고자 할때 예전에 얼핏 본 기억이 있어 찾아보니 찾고자 하는게 있었다. [블로그][lisp-unit-blog]에 나와 있듯이 [lisp-unit]의 출력 결과에 맞게 텍스트를 초록//빨강으로 출력해 주는 것이 있었다.

 프로젝트 구성하는 패키지엔 [quickproject]와 [cl-project]가 있지만 tdd환경에선 [cl-test-more]를 이용하는 cl-project를 사용하는게 좋아, 위 블로그에서 [slime-lispunit.el]파일을 다운 받은 후, cl-test-more설정에 맞게 고쳤다. 텍스트에 색상을 입히는 대신 vimeo에 나온 동영상처럼 모드라인만 바뀌게 설정하고 테스트를 성공할 수 있었다.

 일단 Common Lisp로 완성한 프로젝트는 [이곳][netpyoung's string-calc]에서 확인할 수 있다.

 다 작성후 테스트 결과를 다른 버퍼에 출력시키면 어떨까라는 생각에 다시 .el 파일을 만졌고 [popwin-el]이란게 있어 한번 이걸 써보았다. 작성한 .el파일은 [이곳][netpyoung's cl-test-more.el]에서 받을 수 있다.


 키맵은 다음과 같다

```elisp
;; Keys

(slime-define-keys slime-mode-map
    ((kbd "C-t C-j") 'tst:switch-test<->source)
    ((kbd "C-t C-o") 'tst:on-off-test-result-popup)
    ((kbd "C-t C-t") 'tst:run-test)
    ((kbd "C-t C-e") 'tst:remove-test)
    ((kbd "C-t C-a") 'tst:run-all-tests)
    ((kbd "C-t C-c") 'tst:clear-all-tests)
    ((kbd "C-t C-r") 'tst:repeat-last-test))
```

스크린 샷
 ![cl-test-more_pass-mode-line](../imgs/cl-test-more_pass-mode-line.png)
 ![cl-test-more_pass-popup-result.png](../imgs/cl-test-more_pass-popup-result.png)
 ![cl-test-more_fail-mode-line.jpg](../imgs/cl-test-more_fail-mode-line.jpg)
 ![cl-test-more_fail-popup-result.png](../imgs/cl-test-more_fail-popup-result.png)


 [String calculator katacast]: http://vimeo.com/9350864
 [lisp-unit-blog]: http://cons.pulp.se/post/522988094/introducing-slime-lispunit
 [lisp-unit]: https://github.com/OdonataResearchLLC/lisp-unit
 [quickproject]: https://github.com/xach/quickproject
 [cl-project]: https://github.com/fukamachi/cl-project
 [cl-test-more]: https://github.com/fukamachi/cl-test-more
 [slime-lispunit.el]: https://github.com/johanlindberg/slime/blob/master/contrib/slime-lispunit.el
 [netpyoung's string-calc]: https://github.com/netpyoung/Practice/tree/master/Lisp/string-calc
 [popwin-el]: https://github.com/m2ym/popwin-el
 [netpyoung's cl-test-more.el]: https://github.com/netpyoung/emacs-config/blob/master/cl-test-more/cl-test-more.el