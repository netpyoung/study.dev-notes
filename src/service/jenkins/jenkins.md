# Jenkins

- 어차피 jenkins 설정도 복잡하지 않고, 한번설치하고 계속 쓰는경우가 많으니 war로 실행하는게 간편

## using war

- <https://www.jenkins.io/download/> 에서 war파일을 다운받아서 실행

- 실행: `java -jar jenkins.war --httpPort=9090`
- 초기패스워드: `C:\Users\netpyoung\.jenkins\secrets\initialAdminPassword`

## using docker-compose

- 하지만, 여러프로젝트에서 동시다발적으로 셋팅해야할 경우 이게 도움될듯
- <https://github.com/jenkinsci/docker>

```yml
ports:
  - "50000:50000"
  - "8080:8080"
volumes:
  - "/c/Users/netpyoung/@DEVOPS/jenkins_home:/var/jenkins_home"
```

- 실행단계
  - `docker-compose.yml` 볼륨 확인하고
  - `Dockerfile` plugins.txt확인
  - `docker-compose up` 으로 기동
- 초기패스워드: `/var/jenkins_home/secrets/initialAdminPassword`

## agent 설정

Restrict where this project can be run

- 신규 agent : <http://localhost:8080/computer/new>
- agent설정: <http://localhost:8080/computer/{agent-name}/>
- agent.jar : <http://localhost:8080/jnlpJars/agent.jar>

``` shell
java -jar agent.jar -jnlpUrl http://localhost:8080/computer/agent-blue/jenkins-agent.jnlp -secret 0fa596c72ab35d2bf966ddd0908e3b7be055c80785af51694fafed5e69ce2ca4 -workDir "C:\Users\netpyoung\@DEVOPS\slave2"
```

- Run from agent command line, with the secret stored in a file:

``` shell
echo 0fa596c72ab35d2bf966ddd0908e3b7be055c80785af51694fafed5e69ce2ca4 > secret-file
java -jar agent.jar -jnlpUrl http://localhost:8080/computer/agent-blue/jenkins-agent.jnlp -secret @secret-file -workDir "C:\Users\netpyoung\@DEVOPS\slave2"\
```

# 이미지 다운로드.
http://ftp.daum.net/ubuntu-releases/precise/ubuntu-12.04.4-server-amd64.iso


# 네트워크 설정.
- 192.168.0.101을 먹고자 한다.

    sudo vi /etc/network/interface

        # This file describes the network interfaces available on your system
        # and how to activate them. For more information, see interfaces(5).

        # The loopback network interface
        auto lo
        iface lo inet loopback

        auto eth0
        iface eth0 inet dhcp

        # The primary network interface
        auto eth1
        iface eth1 inet static
        address 192.168.0.101
        netmask 255.255.255.0
        network 192.168.0.0
        gateway 192.168.0.1
        broadcast 192.168.0.255
        dns-nameservers 168.126.63.1 168.126.63.2 8.8.8.8
        mtu 9000

    sudo /etc/init.d/networking restart


- `ip addr`에서 나온 ip와 mac주소를 iptime에 추가시켜주자.
- http://repogen.simplylinux.ch/ 에서 저장소를 업데이트 시켜주자.


# 버츄얼박스 백그라운드.
$ VboxManage startvm {VM-Name} --type headless


# JAVA
sudo apt-get install python-software-properties
sudo add-apt-repository ppa:webupd8team/java
sudo apt-get update
sudo apt-get install oracle-java7-installer
sudo apt-get install oracle-java7-set-default



# Nginx 설치.

    sudo apt-get install nginx
    sudo rm /etc/nginx/sites-available/default
    sudo rm /etc/nginx/sites-enabled/default

    sudo vi /etc/nginx/sites-available/jenkins

```
upstream app_server {
        server 127.0.0.1:8080 fail_timeout=0;
    }

server {
    listen 80;
    listen [::]:80 default ipv6only=on;
    server_name ci.yourcompany.com;

    location / {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_redirect off;

        if (!-f $request_filename) {
            proxy_pass http://app_server;
            break;
        }
    }
}
```

    sudo ln -s /etc/nginx/sites-available/jenkins /etc/nginx/sites-enabled/
    sudo service nginx restart


# jenkins 설치.

https://wiki.jenkins-ci.org/display/JENKINS/Installing+Jenkins+on+Ubuntu

```bash
    wget -q -O - https://jenkins-ci.org/debian/jenkins-ci.org.key | sudo apt-key add -
    sudo sh -c 'echo deb http://pkg.jenkins-ci.org/debian binary/ > /etc/apt/sources.list.d/jenkins.list'
    sudo apt-get update
    sudo apt-get install jenkins
```



https://www.docker.com/products/docker-toolbox




http://stackoverflow.com/questions/7709993/how-can-i-update-jenkins-plugins-from-the-terminal

cd $JENKINS_HOME/plugins
curl -O http://updates.jenkins-ci.org/download/plugins/cobertura.hpi
curl http://yourservername:8080/reload


http://www.hugeinc.com/ideas/perspective/list-of-useful-jenkins-plugins

https://github.com/maxfields2000/dockerjenkins_tutorial



# redmine
* https://github.com/sameersbn/docker-redmine
* https://github.com/mrliptontea/PurpleMine2


```
sudo docker-compose run --rm redmine app:backup:create

1517889369_redmine_backup.tar

sudo mkdir -p /srv/docker/redmine/redmine/backups

sudo docker-compose run --rm redmine app:backup:restore BACKUP=1517889369_redmine_backup.tar

```
