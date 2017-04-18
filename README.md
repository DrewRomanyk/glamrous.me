glamrous.me 
===========
[![Build Status](https://travis-ci.org/DrewRomanyk/glamrous.me.svg?branch=master)](https://travis-ci.org/DrewRomanyk/glamrous.me)

## Project Structure

For stylization, we decided to change the placement of our .log and .html files to the documentation folder.


## Installation

#### Requirements
* [Docker](https://www.docker.com)

#### Building containers
```bash
$ docker-compose build
```

#### Build the frontend
```bash
$ npm install
$ ./scripts/build.sh
$ rollup -cw
```

#### Configuration
 * Copy `config.json.template` to `config.json` and fill out.
 * `SQLALCHEMY_DATABASE_URI` should be `postgresql://glamrous@postgres/glamrous`

#### Start Server
```bash
$ docker-compose up
```

## Testing
[Travis](https://travis-ci.org/DrewRomanyk/glamrous.me) runs tests automatically, but to run them on your machine:

```bash
$ make Dockerfile.db
$ make Dockerfile.server
$ make start-db
$ make test
$ make reset-config
```