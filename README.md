# glamrous.me [![Build Status](https://travis-ci.org/DrewRomanyk/glamrous.me.svg?branch=master)](https://travis-ci.org/DrewRomanyk/glamrous.me)
---

Setup:

```bash
; cd dockerfile
; docker build -t glamrous-dev .
; docker build -t glamrous-server .
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
```
