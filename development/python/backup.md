## bottle: (http://bottlepy.org/docs/dev/)

 - Bottle은 Python을 위한, 빠르고, 간단한 경량형 WSGI(Web Server Gateway Interface) 마이크로 웹-프레임워크이다. 단일 파일 모듈로 배포되며, 다른 Python Standard Library에 대해 의존성을 지니지 않는다.

    Routing: clean, dynamic URL을 지원을 위해 매핑된 함수-호출 요청.
    Templates: 빠르고, 파이썬스러운(pythonic) 내장 템플릿엔진, mako, jinja2, cheetah 템플릿을 지원함.
    Utilities: form데이터, 파일 업로드, 쿠키, 헤더, 다른 HTTP관련 메타데이터에 접근하기 편함.
    Server: HTTP 개발서버를 내장하고 있으며, paste, fapws3, bjoern, Google App Engine, cherrypy, WSGI가 가는한 HTTP서버를 지원함.

```python
# We now try to fix 2.5/2.6/3.1/3.2 incompatibilities.
# It ain't pretty but it works... Sorry for the mess.
```

### 템플릿언어
* mako : http://www.makotemplates.org/
 - 음.. 왠지 병신같음.
* jinja2 : http://jinja.pocoo.org/docs/
 - 어디선가 본듯한 무난한 탬플릿.
* cheetah : http://www.cheetahtemplate.org/
 - 이것도 병맛.

### 참고
* clean URL : https://en.wikipedia.org/wiki/Clean_URL
* dynamic URL : http://www.webopedia.com/TERM/D/dynamic_URL.html

--------------------------------------------------------------------------------

## WSGI(Web Server Gateway Interface)
웹 에플리케이션과 통신(communicate)하기 위해, 웹서버나 에플리케이션 서버에 대한 명세서.

음.. 말그대로 인터페이스라 보면 좀 이해하기 쉬우려나?

좀더 파고들라면 PEP 333을 봐야함 ㅍㅋ.

Python 3.x, includes community errata, addenda, and clarifications 등등에 대해선 PEP 3333을 봐야함 ㅍㅋ.

### 참고
* http://wsgi.readthedocs.org/en/latest/learn.html
* PEP 333 : http://www.python.org/dev/peps/pep-0333/
* PEP 3333 : http://www.python.org/dev/peps/pep-3333/
* Flask로 만들어 보는 WSGI 어플리케이션 : http://spoqa.github.io/2012/01/16/wsgi-and-flask.html
* Python Flask vs Bottle: http://stackoverflow.com/questions/4941145/python-flask-vs-bottle
 - Bias warning이 인상깊다.

--------------------------------------------------------------------------------

## gevent: http://www.gevent.org/
 gevent는 코루틴 기반 Python 네트워킹 라이브러리이며, libevent 이벤트 루프 위에서 고-수준 synchronous API를 제공해주는 greenlet을 이용한다.

### 참고
* Comparing gevent to eventlet : http://blog.gevent.org/2010/02/27/why-gevent/
* (영) gevent For the Working Python Developer : http://sdiehl.github.io/gevent-tutorial/
* (한) Python 프로그래머를 위한 gevent 튜토리얼 : http://blog.naver.com/parkjy76/30159370760
* wiki:Monkey patch : http://en.wikipedia.org/wiki/Monkey_patch

--------------------------------------------------------------------------------
 
## greenlet: http://greenlet.readthedocs.org/en/latest/

 greenlet은, "tasklets"이라 불리는 마이크로-쓰래드를 지원을 위한 CPython 버전의 패키지이며, Stackless에서 파생??(spin-off)되었다.

### 참고 : 
* greenlet은 어떻게 구현했을까? : http://lee-seungjae.github.io/greenlet.html
* stackless: http://www.stackless.com/
 - Stackless Python은 Python 프로그래밍 언어를 강화한 버전이다.
 - 마이크로 쓰래드, 채널, 스캐줄, 시리얼라이제이션에 대한 특징을 가지고 있다.

--------------------------------------------------------------------------------

## libevent : http://libevent.org/
 - 아 망했어요, 이쪽을 자세히 보고자 하면, C랑 network쪽에 덕력이 많아야할듯.

--------------------------------------------------------------------------------

## django

fucking full stack

--------------------------------------------------------------------------------

## git
skip

--------------------------------------------------------------------------------

## python 2.7

--------------------------------------------------------------------------------

* python에서 @는 어떻게 구현한거지?
 - 자바 어노테이션이랑 다른거네..
 - Decorators for Functions and Methods : http://www.python.org/dev/peps/pep-0318/
 - 파이썬 데코레이터 (decorator): 기초편 : http://trowind.tistory.com/72

* `*`와 `**` ??
 - http://docs.python.org/2/tutorial/controlflow.html#keyword-arguments
 - http://docs.python.org/2/tutorial/controlflow.html#arbitrary-argument-lists


* virtualenv 는 뭐고 어떻게 설치 및 설정하지?
 - Python : virtualenv / virtualenvwrapper  : http://blog.naver.com/ez_/140138625021
 - http://virtualenvwrapper.readthedocs.org/en/latest/command_ref.html

* 패키기 구성
- https://www.facebook.com/groups/pythonkorea/permalink/380997145316786/?comment_id=381235475292953&offset=0&total_comments=10

# 파이썬 코딩하기
Pythonic

How to Write "Pythonic" Code
http://chrisarndt.de/talks/rupy/2008/output/slides.html

### dictionary를 dictionary답게 쓰는 법?
* https://www.facebook.com/groups/pythonkorea/permalink/379145462168621/?comment_id=379323492150818&offset=0&total_comments=13
* http://doughellmann.com/2012/11/the-performance-impact-of-using-dict-instead-of-in-cpython-2-7-2.html


### 인코딩
* http://www.python.org/dev/peps/pep-0263/

## PEP 0008
* http://www.python.org/dev/peps/pep-0008/
* https://github.com/hhatto/autopep8
* https://pypi.python.org/pypi/pep8

* https://github.com/bmcustodio/flake8

Syntax+pep8 checking before committing in git : http://signal0.com/2012/07/11/syntax_pep8_checking_before_committing_in_git.html

## PEP 0257 
* Docstring Conventions: http://www.python.org/dev/peps/pep-0257/

### 파이썬 Enum?
* https://www.facebook.com/groups/pythonkorea/permalink/460248590724974/?comment_id=460457844037382&offset=0&total_comments=4
 - http://stackoverflow.com/questions/1969005/enumerations-in-python
 - http://www.python.org/dev/peps/pep-0435/
 - http://pythonhosted.org/flufl.enum
 - A, B, C = range(3)

--------------------------------------------------------------------------------

## ??????????

* python관련해서 추천 블로그 및 읽어볼만한 글?

* python 2.7을 고수하는 이유?
 - 라이브러리 호환성?
 - 속도문제?

* Flask가 아닌 Bottle을 쓰는이유?
 - 원파일정책때문?

* python에서 타입 채킹하려면?
 - http://ceronman.com/2013/03/12/a-powerful-unused-feature-of-python-function-annotations/

* python 관련해서 더 봐야할것
 - http://docs.python.org/2/reference/datamodel.html

* 쓰지말아야할 이상한 함수? 
* 현재 쓰는 라이브러리?