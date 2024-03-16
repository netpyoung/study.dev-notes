# ref: https://hub.docker.com/_/redmine?tab=tags
FROM redmine:4.1.1

# redmine installation dir : /usr/src/redmine
# ref https://github.com/docker-library/redmine/blob/1b84bd5a0852d822de8e65d7f2686dc192321677/4.1/Dockerfile#L70
ENV REDMINE_INSTALL_DIR /usr/src/redmine

# waiting for DB
# ref: https://github.com/ufoscout/docker-compose-wait
#ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
#RUN chmod +x /wait

ENTRYPOINT ["/docker-entrypoint.sh"]

CMD ["rails", "server", "-b", "0.0.0.0"]