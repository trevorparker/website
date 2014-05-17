FROM debian:wheezy
MAINTAINER Trevor Parker <trevor@trevorparker.com>

ADD . /data
WORKDIR /data

RUN apt-get update && apt-get -y upgrade \
  && apt-get -y install build-essential bundler ruby ruby-dev

RUN bundle install

EXPOSE 4000

CMD ["jekyll", "serve"]
