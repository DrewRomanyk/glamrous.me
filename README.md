glamrous.me 
===========
[![Build Status](https://travis-ci.org/DrewRomanyk/glamrous.me.svg?branch=master)](https://travis-ci.org/DrewRomanyk/glamrous.me)

### Installation

#### Requirements
* [Docker](https://www.docker.com)

#### Building containers
```bash
$ cd dockerfile
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

#### Start Server
```bash
$ ./start.sh [detach]
```
