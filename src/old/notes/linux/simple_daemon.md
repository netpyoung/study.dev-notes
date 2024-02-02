# 간단한 데몬.

1. 일단 ssh창 하나를 띄워
2. 일단 DaemonRoom을 만들고 그 안에 있는
3. watchRoom을 깨끗히 치워둔다.
4. myDaemond.conf는 파일명만.. 그냥 conf일뿐 log남기기 위한 파일이다.

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
합계 16
drwxrwxr-x 2 pyoung pyoung 4096  2월 20 09:59 .
drwxrwxr-x 3 pyoung pyoung 4096  2월 20 09:50 ..
[pyoung@hwarang DaemonRoom]$
```

ssh클라이언트를 하나 더띄워서 daemon을 실행한다.

```
[pyoung@hwarang temp]$ ./daemon01
child!
parent@
```

일단 watchRoom에 파일 aa를 생성해 보고, log파일(myDaemond.conf)를 확인해본다.
이번에는 watchRoom에 폴더를 생성하보고 다시 확인해 본다.

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

소스는 다음과 같다.
- main은 단순히 fork만 해주고
- init_daemon으로 데몬으로 만들고
- check_dir을 이용하여 특정 폴더(WATCH_DIR)를 감시하여
- 특정파일(CONF_FILE)에 로그를 남긴다.

데몬 생성방법은
http://netpyoung.tistory.com/75 를 참조한다.

daemon01.c

``` c
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