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
 * To get DB URI, use `docker inspect --format '{{ .NetworkSettings.IPAddress }}' "glamrous-postgres"`

#### Start Server
```bash
$ ./start.sh [detach]
```

## Testing
[Travis](https://travis-ci.org/DrewRomanyk/glamrous.me) runs tests automatically, but to run them on your machine first make sure no instances
of `glamrous-db` are running.

```bash
$ make Dockerfile.db
$ make Dockerfile.server
$ make start-db
$ make test
$ make reset-config
```