FROM debian:wheezy
MAINTAINER Trevor Parker <trevor@trevorparker.com>

RUN apt-get update && apt-get -y upgrade \
  && apt-get -y install build-essential python2.7 ruby ruby-dev

RUN update-alternatives --install /usr/bin/python python /usr/bin/python2.7 100
RUN gem install --no-ri --no-rdoc jekyll coderay

ADD . /data
WORKDIR /data

EXPOSE 4000

CMD ["jekyll", "serve"]
