Overview
============
MicroCommunity is an open source social networking the aims to make it easy to develop specialized social platforms that enforce knowledge exchange and content production in real and online communities. That goal is basically achieved by building a modular system of plugins that allow developers to mix them in order to meet the needs of small communities.

Requirements
============
mongodb server
--------------

```bash
sudo apt-get install mongodb-server
```

create a configuration file

```bash
sudo mkdir -p /data/db/
sudo chown `id -u` /data/db
```

Running Microcommunity
======================

```bash

#for the first time
git clone git@github.com:wikitechie/microcommunity.git
cd microcommunity

npm install
node app.js
```


Optimizing client
======================
Running this command will generate 'client-built' folder which could be served instead of 'client'.

```bash
r.js -o client/build.js
```

Running Tests
======================

To run server-side tests, cd to the project main directory then, run the make test:

```bash
make test
```

Client-side tests are runned from the browser, so you need to start the application in Node test mode:

```bash
NODE_ENV=test node app.js
```

Then you can run the tests by visiting: http://localhost:3000/test


