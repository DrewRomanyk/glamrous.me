# glamrous.me [![Build Status](https://travis-ci.org/DrewRomanyk/glamrous.me.svg?branch=master)](https://travis-ci.org/DrewRomanyk/glamrous.me)
---

Setup:

```bash
; cd dockerfile
; docker build -t glamrous-dev -f Dockerfile.dev .
; docker build -t glamrous-server -f Dockerfile.server .
; docker pull postgres
```

Start postgres server:
```bash
; ./postgres.sh [detach]
```

Run server:

```bash
; ./start.sh [detach]
```

Build for frontend:

```bash
; ./build.sh
; rollup -cw
```

NOTE: If rollup is failing, make sure to npm install
