

 

cpio ��ɾ� : ������ ���� �������� ���� ����� �� �ִ�.

 

dump ��ɾ� : ��ȭ�� �߻��� ���ϸ� ����ϴ� "�κ� ���"��ɾ�

 

iostat ��ɾ� : �ð��� ���� ������� ����� ��踦 ������

 

vmstat ��ɾ� : Ŀ���� ������ �ִ� ������ üũ(���μ���, ��ũ, CPU, ����޸𸮵�)

 

ulimit ��ɾ� : ���ҽ��� �˻� �� ��� ����
-a : ����Ʈ
-c : �ھ����(512Byte����)
-d : ���ü��׸�Ʈ(kb)
-v : ����޸�(kb)

 

trap ��ɾ� : �ñ׳� ���� ��ɾ�

    $ trap 'echo "hi"' SIGINT
    $ trap -p
    trap -- 'echo "hi"' SIGINT
    $ ^Chi
    $ trap SIGINT

 

ulimit ��ɾ�

http://coffeenix.net/board_print.php?bd_code=146

    $ ulimit -c unlimited
    abort
    $ ulimit -c 0

 

nm ��ɾ�

       nm - list symbols from object files

    $ nm -D /lib/libc.so.6 | grep epoll

 
