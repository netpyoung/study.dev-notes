# nginx

- 그냥 실행파일로 실행 추천
- [download](http://nginx.org/en/download.html)
- <https://github.com/h5bp/server-configs-nginx>


``` cmd
nginx -s stop      # fast shutdown
nginx -s quit      # graceful shutdown
nginx -s reload    # changing configuration, starting new worker processes with a new configuration, graceful shutdown of old worker processes
nginx -s reopen    # re-opening log files
```

- conf/nginx.conf

``` config
worker_processes  1;

events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;

    keepalive_timeout  65;

    server {
        listen       3000;
        server_name  localhost;

        location / {
            proxy_pass   http://127.0.0.1:3000;
        }
    }
}
```