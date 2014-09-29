#!/usr/bin/env bash



#cd /vagrant/famo.us && grunt serve
#&& npm install && bower install

#forever start -l node_server.log server.js

#grunt serve
cd /vagrant/meanjs && node server.js >> serverjs.log 2>> serverjs.log &

#cd ../famo.us &&  nohup grunt serve > grunt_output.log &
echo 'All Done! Access webapp via localhost:3000 in your browser'