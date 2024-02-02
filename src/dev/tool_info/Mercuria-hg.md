hg init
hg commit -u "����ڸ�" -m "Ŀ�Գ���"
hg diff -r "������1":"������2" ���� // ex) hg diff -r 0:1 test.txt

hg idenfity -n
hg help ��ɾ�
hg tags
hg tip [-p]
  The tip revision (usually just called the tip) is the most recent changeset in the repository. The tip is the most recently changed head. 
hg log test2 -f
 -f --follow : follow changeset history, or file history across copies and renames
������ ��ɾ� : log, ci(commit�� �ظ�)

hg bisect�� �׽�Ʈ�ϱ� ���� �뵵

hg incomming/inc # clone�� ������Ʈ���� ã��, ã���� ���泻���� �˷��ش�.
hg pull      # clone�� ������Ʈ������ ���泻���� �����´�. ���� �������� ����
hg update/up # pull�� ���� �������� ������Ʈ ���� �����Ƿ�, ��������� update�� ����� �Ѵ�.


hg outgoing/out # clone�� ������Ʈ���� ã��, ã���� ������ ������ ����Ѵ�.
hg push         # ���泻����, clone�� ������Ʈ���� �߰��Ѵ�.


hg fetch # hg pull => hg merge => hg commit

hg archive -t zip ../hg1.zip # �������丮 ���θ� �����Ѵ�.

hg export -o ../hg1-rev19.diff 19 # ���泻���� export�Ѵ�.
hg import ../hg1-rev19.diff       # ���泻���� import�Ѵ�. �ڵ����� commit�ϹǷ� ( -no-commit �ɼ��� �ִ�)

hg bundle -r 24 --base 23 ../hg1-bundle # export�� ����ϳ� --base�� ������ �� �ִ�.
hg unbundle ../hg1-bundle


hg up -C default // default�귣ġ�� Clean Update�ϰڴٴ� ���̴�.
hg up -r "max(tagged())" // �±��� ���� ���� �±׷� update �ϰڴٴ� ��.

# hgrc -------------------------------------------------------------------------
hg glog -r -2: # �ֱ� revision 2���� �����ش�.// extenson�� graphlog =
hg slog        # log�� ����ȭ �Ͽ� �����ش�.

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