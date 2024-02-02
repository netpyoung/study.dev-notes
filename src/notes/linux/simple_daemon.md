������ ����.
=======


1. �ϴ� sshâ �ϳ��� ���
2. �ϴ� DaemonRoom�� ����� �� �ȿ� �ִ�
3. watchRoom�� ������ ġ���д�.
4. myDaemond.conf�� ���ϸ�.. �׳� conf�ϻ� log����� ���� �����̴�.

```sh
[pyoung@hwarang DaemonRoom]$ rm watchRoom/*
[pyoung@hwarang DaemonRoom]$ ls
myDaemond.conf  watchRoom
[pyoung@hwarang DaemonRoom]$ pwd
/home/pyoung/DaemonRoom
[pyoung@hwarang DaemonRoom]$ ls
myDaemond.conf  watchRoom
[pyoung@hwarang DaemonRoom]$ cat myDaemond.conf
[pyoung@hwarang DaemonRoom]$ ls -al watchRoom/
�հ� 16
drwxrwxr-x 2 pyoung pyoung 4096  2�� 20 09:59 .
drwxrwxr-x 3 pyoung pyoung 4096  2�� 20 09:50 ..
[pyoung@hwarang DaemonRoom]$
```

sshŬ���̾�Ʈ�� �ϳ� ������� daemon�� �����Ѵ�.

```
[pyoung@hwarang temp]$ ./daemon01
child!
parent@
```

�ϴ� watchRoom�� ���� aa�� ������ ����, log����(myDaemond.conf)�� Ȯ���غ���.
�̹����� watchRoom�� ������ �����Ϻ��� �ٽ� Ȯ���� ����.

```
[pyoung@hwarang DaemonRoom]$ echo "AA" >>  watchRoom/aa
[pyoung@hwarang DaemonRoom]$ cat myDaemond.conf
aa Sat Feb 20 16:25:45 2010
[pyoung@hwarang DaemonRoom]$ mkdir watchRoom/BB
[pyoung@hwarang DaemonRoom]$ cat myDaemond.conf
aa Sat Feb 20 16:25:45 2010
BB Sat Feb 20 16:25:56 2010
[pyoung@hwarang DaemonRoom]$
```

�ҽ��� ������ ����.
* main�� �ܼ��� fork�� ���ְ�
* init_daemon���� �������� �����
* check_dir�� �̿��Ͽ� Ư�� ����(WATCH_DIR)�� �����Ͽ�
* Ư������(CONF_FILE)�� �α׸� �����.

���� ���������
http://netpyoung.tistory.com/75 �� �����Ѵ�.

daemon01.c
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <time.h>
#include <dirent.h>
#include <sys/types.h>
#include <fcntl.h>
#include <sys/stat.h>

#define CONF_FILE "/home/pyoung/DaemonRoom/myDaemond.conf"
#define WATCH_DIR "/home/pyoung/DaemonRoom/watchRoom"

void init_daemon();
time_t check_dir(int fd, char *d_name, time_t latest_time);

//==[MAIN]==============================================
int main()
{
  pid_t pid;
  pid = fork();
  switch(pid)
    {
    case -1:
      perror("fork()");
      break;
    case 0:
      printf("child!\n");
      init_daemon();
      break;
    default:
      printf("parent@\n");
      break;
    }
  return 0;
}
//==[MAIN]==============================================

void init_daemon()
{
  int fd;
  pid_t sid;
  time_t latest_time = 0;

  umask(0);

  sid = setsid();
  if( sid < 0) {
    exit(EXIT_FAILURE); }
  if((chdir("/")) < 0) {
    exit(EXIT_FAILURE); }

  close(STDIN_FILENO); close(STDOUT_FILENO); close(STDERR_FILENO);

  fd = open( CONF_FILE, O_WRONLY | O_TRUNC);
  while( fd>=0 ) {
    latest_time = check_dir(fd, WATCH_DIR, latest_time);
    sleep(1);
  }
  close(fd);
  return;
}

time_t check_dir(int fd, char * dname, time_t latest_time)
{
  char str[128];
  DIR *dp;
  struct dirent *p;
  struct stat buf;

  chdir(dname);
  dp = opendir(".");
  while(p = readdir(dp)) {
    lstat(p->d_name, &buf);
    if( latest_time < buf.st_mtime)
      {
        if(p->d_name[0] == '.')
          continue;
        write(fd, p->d_name, strlen(p->d_name));
        memset(str, 0, 128);
        sprintf(str, " %s", ctime(&buf.st_mtime));
        write(fd, str, strlen(str));
        latest_time = buf.st_mtime;
      }
  }
  closedir(dp);
  return latest_time;
}
```