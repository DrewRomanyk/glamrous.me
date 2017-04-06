glamrous.me 
===========
[![Build Status](https://travis-ci.org/DrewRomanyk/glamrous.me.svg?branch=master)](https://travis-ci.org/DrewRomanyk/glamrous.me)

## Installation

#### Requirements
* [Docker](https://www.docker.com)

#### Building containers
```bash
$ cd dockerfile
$ docker build -t glamrous-db -f Dockerfile.db .
$ docker build -t glamrous-dev -f Dockerfile.dev .
$ docker build -t glamrous-server -f Dockerfile.server .
$ docker pull postgres
```

#### Starting postgres
```bash
$ ./postgres.sh [detach]
```

#### Build the frontend
```bash
$ npm install
$ ./build.sh
$ rollup -cw
```

#### Configuration
 * Copy `config.json.template` to `config.json` and fill out.
 * To get DB URI, use `sudo docker inspect --format '{{ .NetworkSettings.IPAddress }}' "glamrous-postgres"`

#### Start Server
```bash
$ ./start.sh [detach]
```
