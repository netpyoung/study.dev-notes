# Redmine
* http://www.redmine.org/
* Redmine은 유연한 프로젝트 관리 웹 어플리케이션이다. Ruby on Rails 프레임워크를 이용해서 작성되었고, 크로스 플랫폼과 크로스 데이터베이스를 지원한다.
* Redmine은 오픈소스이며, GNU General Public License v2 (GPL)하에 배포되고 있다.
* 설치
 - http://www.redmine.org/projects/redmine/wiki/RedmineInstall
 - http://www.redmine.or.kr/projects/community/wiki/레드마인_설치(Windows) 참고.

# MySQL
* http://dev.mysql.com/downloads/

```cmd
> mysqld --install 

// 윈도우즈 서비스 실행후,
> mysql -uroot
```
# PostgreSQL
* http://www.postgresql.org/
* PostgreSQL는 강력한 오픈소스 객체-관계 데이터베이스 시스템이다.


# Bundler
* http://gembundler.com/
* Bundler는 ruby 어플리케이션 환경을 일관되게 유지시켜줌.
* 구동에 필요한 정확한 gem(그리고 버전)을 항상 유지.

# DevKit
* https://github.com/oneclick/rubyinstaller/wiki/Development-Kit
* DevKit은 윈도우즈용 Ruby에 대해 네이티브 C/C++ 확장기능 빌드/사용을 쉽게 만들어 주는 도구.

config.yml

```yml
---
- C:\Ruby200-x64
```

```cmd
c:\DevKit> ruby dk.rb init

// config.yml수정후,
c:\DevKit> ruby dk.rb install
```

--------------------------------------------------------------------------------

# Trouble Shooting

## The 'json' native gem requires installed build tools.
* http://rubyinstaller.org/downloads 에서, DEVELOPMENT KIT 설치


--------------------------------------------------------------------------------

# In Archlinux
* 참조 : https://wiki.archlinux.org/index.php/Redmine

* ruby 설치.

```cmd
$ yaourt -S ruby
$ sudo gem install bundler
```
~/.gem/ruby/x.x.x/bin을 PATH에 추가해주자.

* db 설치

```cmd
$ yaourt -S mariadb
$ sudo systemctl start mysqld
$ mysql -u root
```

```sql
CREATE DATABASE redmine CHARACTER SET UTF8;
CREATE USER 'redmine'@'localhost' IDENTIFIED BY '1234';
GRANT ALL PRIVILEGES ON redmine.* TO 'redmine'@'localhost';
```

* redmine 설치

```cmd
$ yaourt -S mercurial
$ hg clone --updaterev 2.3-stable https://bitbucket.org/redmine/redmine-all redmine
$ cd redmine
redmine$ cp config/database.yml.example config/database.yml
redmine$ vi config/database.yml
```

```yml
production:
  adapter: mysql2
  database: redmine
  host: localhost
  username: redmine
  password: "1234"
  encoding: utf8
```

```cmd
redmine$ sudo bundle install --without development test rmagick
redmine$ rake generate_secret_token
redmine$ RAILS_ENV=production rake db:migrate

redmine$ RAILS_ENV=production REDMINE_LANG=ko rake redmine:load_default_data
redmine$ sudo chmod -R 755 files/ log/ tmp/ public/
redmine$ sudo ruby script/rails server webrick -e production
```

접속 : http://localhost:3000/
아이디/비번 : admin / admin


webrick은 테스트용도로만 쓸것.

Passenger 플러그인과, Nginx를 설치 및 설정해주자.


# plugin
```cmd
redmine$ cd plugins
redmine/plugins$ sudo gem install redcarpet
redmine/plugins$ git clone https://github.com/alminium/redmine_redcarpet_formatter.git
redmine/plugins$ cd redmine_redcarpet_formmatter
redmine/plugins/redmine_redcarpet_formmatter$ git checkout v2.0.1
```

Admin -> Settings -> Text formatting에서 바꿔주기만 하면 됨-_-.


# theme
* http://redminecrm.com/pages/a1-theme
 - 흰바탕 회색 조합.무난한듯?
* http://pixel-cookers.github.io/redmine-theme/
 - 블루계열, 레이아웃도 바뀌나?
* https://github.com/lqez/redmine-theme-basecamp-with-icon
 - 부트캠프이용한것 깔쌈하네.

```cmd
redmine/public/themes$ git clone git://github.com/lqez/redmine-theme-basecamp-with-icon.git
```