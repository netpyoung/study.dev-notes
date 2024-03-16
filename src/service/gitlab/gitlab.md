# gitlab

- 설정 복잡하니 docker-compose로 띄우자
  - 단, wsl에서는 패스 권한 문제 있음
  - 리눅서 서버로해서 셋팅하면 gitea보다 기능이 좋으니 gitlab쓰는게 좋음

https://docs.gitlab.com/ee/install/docker.html

- [docker:gitlab-ee](https://hub.docker.com/r/gitlab/gitlab-ee/tags)
- [docker:gitlab-ce](https://hub.docker.com/r/gitlab/gitlab-ce/tags)

``` yml
version: "3.7"

services:
  gitlab:
    image: "gitlab/gitlab-ee:14.4.2-ee.0"
    # restart: always
    hostname: "gitlab.example.com"
    environment:
      GITLAB_ROOT_PASSWORD: "qwer1234"
      GITLAB_TIMEZONE: "Asia/Seoul"
      GITLAB_OMNIBUS_CONFIG: |
        external_url 'https://127.0.0.1:8888'
    ports:
      - "8888:8888"
      - "443:443"
      - "22:22"
    volumes:
      - "./gitlab/config:/etc/gitlab"
      - "./gitlab/logs:/var/log/gitlab"
      - "./gitlab/data:/var/opt/gitlab"
```
admin@local.host
```
- "./gitlab/logs:/var/log/gitlab"
- "./gitlab/data:/var/opt/gitlab"
위에껏이 문제있으면 
var전체를
- "./gitlab/var:/var"
```
      

https://gitlab.com/gitlab-org/omnibus-gitlab/-/issues/2280


# gitlab

* https://github.com/sameersbn/docker-gitlab
* gitlab - redmine issue

```
sudo docker-compose run --rm gitlab app:rake gitlab:backup:create						
1517890127_2018_02_06_10.4.2_gitlab_backup.tar						

sudo mkdir -p /srv/docker/gitlab/gitlab/backups						

chmod +777	1517890127_2018_02_06_10.4.2_gitlab_backup.tar					

sudo docker-compose run --rm gitlab app:rake db:setup						

sudo docker-compose run --rm gitlab app:rake gitlab:backup:restore BACKUP=1517890127_2018_02_06_10.4.2						
```
