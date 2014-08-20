
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
