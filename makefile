# TODO: Uncomment once target implemented
# .DEFAULT_GOAL := test

ROOT_DIR:=$(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))

ifeq ($(shell uname), Darwin)          # MacOS
    PYTHON   := python3.5
    PIP      := pip3.5
    PYLINT   := pylint
    COVERAGE := coverage-3.5
    PYDOC    := pydoc3.5
    AUTOPEP8 := autopep8
else ifeq ($(CI), true)                # Travis CI
    PYTHON   := python3.5
    PIP      := pip3.5
    PYLINT   := pylint
    COVERAGE := coverage-3.5
    PYDOC    := pydoc3.5
    AUTOPEP8 := autopep8
else ifeq ($(shell uname -p), unknown) # Docker
    PYTHON   := python3.5
    PIP      := pip3.5
    PYLINT   := pylint
    COVERAGE := coverage-3.5
    PYDOC    := pydoc3.5
    AUTOPEP8 := autopep8
else                                   # UTCS
    PYTHON   := python3
    PIP      := pip3
    PYLINT   := pylint3
    COVERAGE := coverage-3.5
    PYDOC    := pydoc3.5
    AUTOPEP8 := autopep8
endif

.pylintrc:
	$(PYLINT) --disable=locally-disabled --reports=no --generate-rcfile > $@

IDB1.html:
	pydoc3.5 -w app/Models.py

IDB1.log:
	git log > IDB1.log

Dockerfile.db:
	cd dockerfile && sudo docker build -t glamrous-db -f Dockerfile.db .

Dockerfile.dev:
	cd dockerfile && sudo docker build -t glamrous-dev -f Dockerfile.dev .

Dockerfile.server:
	cd dockerfile && sudo docker build -t glamrous-server -f Dockerfile.server .

start-db:
	sudo docker run -d \
	--name glamrous-postgres \
	-p 5433:5432 \
	glamrous-db
	[[ -e config.json ]] && cp config.json config.json.bak
	cp config.json.test config.json
	DB_IP=sudo docker inspect --format '{{ .NetworkSettings.IPAddress }}' "glamrous-postgres"
	sed -ie "s/IPADDRESS/${DB_IP}/g" config.json

test:
	sudo docker run \
	-v $(ROOT_DIR):/usr/web -t \
	-w /usr/web \
	-p 8081:5000 \
	--link glamrous-postgres:postgres \
	glamrous-server \
	make tests.tmp

tests.tmp: clean .pylintrc
	-$(PYLINT) app/tests.py
	$(COVERAGE) run    --branch app/tests.py >  tests.tmp 2>&1
	$(COVERAGE) report -m                      >> tests.tmp
	cat tests.tmp

clean:
	rm -f tests.tmp
	rm -f .pylintrc

reset-config:
	[[ -e config.json.bak ]] && cp config.json.bak config.json