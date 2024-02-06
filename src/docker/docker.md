# Docker

- <https://learnxinyminutes.com/docs/docker/>
- <https://www.docker.com/>
  - <https://docs.docker.com/>

``` sh
# 컨테이너 확인(실행중)
docker ps
# 컨테이너 확인(실행중 + 중지)
docker ps -a

# 컨테이너 중지
docker stop

# 컨테이너 삭제
docker rm

# 컨테이너 로그
docker logs

# 이미지 목록(다운로드된)
docker images

# 이미지 다운로드
docker pull

# 이미지 삭제
docker rim
```

## cmd

``` sh
## open port
docker@default:~$ echo 'export DOCKER_HOST=tcp://$(boot2docker ip 2>/dev/null):8000' >> ~/.bash_profile

## install image
docker@default:~$ docker search ubuntu
docker@default:~$ docker pull ubuntu:latest

## run image
docker@default:~$ docker run -it --name jekyll ubuntu




docker@default:~$ docker ps
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS                    NAMES
33b5f808449d        ubuntu              "/bin/bash"         About an hour ago   Up About an hour    0.0.0.0:8000->8000/tcp   jekyll

## backup image
docker@default:~$ docker commit 33b5f808449d github-pages
docker@default:~$ docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             VIRTUAL SIZE
github-pages        latest              3ccaea30ec80        About an hour ago   641.5 MB
ubuntu              latest              cdd474520b8c        45 hours ago        188 MB

## set volum from VirtualBox
docker@default:~$ docker run -it --name jekyll -p 8000:8000 -v /c/Users/pyoung/hello/netpyoung.github.io/:/site github-pages

docker@default:~$ docker start jekyll
docker@default:~$ docker attach jekyll
```


## With Jenkins

``` sh
# pull
git clone ...

# unit-test
docker run --rm \
-v /var/jenkins_home/workspace/${JOB_NAME}:/app \
-w /app \
ruby:2.3 sh -c "bundle install && bundle exec ruby app_test.rb"

# build
docker build --force-rm=true -t ${DOCKER_USER_ID}/ruby-app:latest .

# tag
docker tag ${DOCKER_USER_ID}/ruby-app ${DOCKER_USER_ID}/ruby-app:${BUILD_NUMBER}

# push
docker login -u ${DOCKER_USER_ID} -p {DOCKER_USER_PASSWOD}
docker push ${DOCKER_USER_ID}/ruby-app:${BUILD_NUMBER}
docker push ${DOCKER_USER_ID}/ruby-app:latest

# deploy
docker stop ruby-app
docker rm ruby-app
docker run -d -p 10000:4567 --name=ruby-app ${DOCKER_USER_ID}/ruby-app:${BUILD_NUMBER}
```


## docker compose

``` yaml
version: '2'

services:
    app:
        build: .
        image: ${DOCKER_USER_ID}/ruby-app
    unit:
        image: ruby:2.3
        volumes:
            - ${WORKSPACE_PATH}/${JOB_NAME}:/app
        working_dir: /app
        command: bash -c "bundle install && bundle exec ruby app_test.rb"
    production:
        image: ${DOCKER_USER_ID}/ruby-app:${BUILD_NUMBER}
        ports:
            - 10001:4567
```

``` yaml
# pull
git clone ...

# unit-test
docker-compose run --rm unit

# build
docker-compose build app

# tag

# push

# deploy
docker-compose up -d production
```

## swarm

- [docker swarm](https://docs.docker.com/engine/swarm/)

DockerSwarm
docker service update \
 --image localhost:5000/ruby-app:${BUILD_NUMBER} \
 ruby-app

Kubernetes
 kubectl set image \
 -f deploy/ruby-app.yml \
 app=localhost:5000/ruby-app:${BUILD_NUMBER}
## Ref

https://github.com/skanehira/denops-docker.vim
https://github.com/Silex/docker.el


[이재홍의 언제나 최신 Docker](https://pyrasis.com/jHLsAlwaysUpToDateDocker)


[Tacademy: 컨테이너 기반 가상화 플랫폼 ‘도커(Doker)’의 이해](https://tacademy.skplanet.com/live/player/onlineLectureDetail.action?seq=125)

[K-MOOC: 도커(Docker) 기초](http://wwwdev.kmooc.kr/courses/course-v1:WJTB+WJTB32+2023_01/about)

https://www.44bits.io/ko/post/easy-deploy-with-docker