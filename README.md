Overview
============

MicroCommunity is a project that aims to build an open source social networking platform, built as a modular system where developers can mix plugins supporting features such as diverse content types production, content organization and curation and collaboration styles. The goal is to make it easy for developers easily create dedicated platforms that encourage content production and knowledge exchange in small-scale communities, or MicroCommunities! We think that those communities for a majority in the online Arab community.

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


