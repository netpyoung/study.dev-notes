# docker image
# ref: https://hub.docker.com/r/jenkins/jenkins/tags
FROM jenkins/jenkins:lts-jdk11

# install plugins
# ref: https://stackoverflow.com/a/29328489
COPY plugins.txt /usr/share/jenkins/ref/
RUN /usr/local/bin/install-plugins.sh < /usr/share/jenkins/ref/plugins.txt