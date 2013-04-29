hg init
hg commit -u "사용자명" -m "커밋내용"
hg diff -r "리비전1":"리비전2" 파일 // ex) hg diff -r 0:1 test.txt

hg idenfity -n
hg help 명령어
hg tags
hg tip [-p]
  The tip revision (usually just called the tip) is the most recent changeset in the repository. The tip is the most recently changed head. 
hg log test2 -f
 -f --follow : follow changeset history, or file history across copies and renames
간단한 명령어 : log, ci(commit의 준말)

hg bisect은 테스트하기 위한 용도

hg incomming/inc # clone한 리포지트리를 찾고, 찾으면 변경내역을 알려준다.
hg pull      # clone한 리포지트리에서 변경내역을 가져온다. 현재 리비전은 유지
hg update/up # pull시 현재 리비전이 업데이트 되지 않으므로, 명시적으로 update를 해줘야 한다.


hg outgoing/out # clone한 리포지트리를 찾고, 찾으면 변경할 내용을 출력한다.
hg push         # 변경내역을, clone한 리포지트리에 추가한다.


hg fetch # hg pull => hg merge => hg commit

hg archive -t zip ../hg1.zip # 리포지토리 전부를 압축한다.

hg export -o ../hg1-rev19.diff 19 # 변경내역을 export한다.
hg import ../hg1-rev19.diff       # 변경내역을 import한다. 자동으로 commit하므로 ( -no-commit 옵션이 있다)

hg bundle -r 24 --base 23 ../hg1-bundle # export와 비슷하나 --base를 지정할 수 있다.
hg unbundle ../hg1-bundle


hg up -C default // default브랜치로 Clean Update하겠다는 말이다.
hg up -r "max(tagged())" // 태그중 가장 상위 태그로 update 하겠다는 말.

# hgrc -------------------------------------------------------------------------
hg glog -r -2: # 최근 revision 2개를 보여준다.// extenson의 graphlog =
hg slog        # log를 간략화 하여 보여준다.

[ui]
username = Eunpyoung Kim <longstone@ncrewcorp.com>

[alias]
slog = log --template '{rev}:{node|short} {desc|firstline}\n'
show = log --color=always -pr

[extensions]
graphlog = 
hgext.extdiff = 
fetch =

[extdiff]
cmd.kdiff3 = 

[merge-tolls]
kdiff3.args = $base $local $other -o $output