Overview
========

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

npm install -d
./start
```


Optimizing client
======================
Running this command will generate 'client-built' folder which could be served instead of 'client'.

```bash
./build
```


