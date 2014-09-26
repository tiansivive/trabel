#!/usr/bin/env bash

apt-get update
apt-get install -y curl
curl -sL https://deb.nodesource.com/setup | sudo bash -

apt-get install python-software-properties python g++ make
apt-get install -y nodejs
apt-get install -y build-essential
apt-get install git
apt-get update

apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | tee /etc/apt/sources.list.d/mongodb.list
apt-get update
apt-get install -y mongodb-org


npm install -g bower
npm install -g grunt-cli
npm install -g cordova
npm install -g yo
npm install -g ionic
npm install -g generator-meanjs
npm install -g generator-ionic
npm install -g generator-famous

#cd /vagrant
#npm install
#bower install

