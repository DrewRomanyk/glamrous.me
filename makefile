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

docker-build:
	docker-compose build

test:
	cp config.json.test config.json
	docker-compose -f docker-compose.yml -f docker-compose-test.yml up --exit-code-from app

tests.tmp: clean .pylintrc
	coverage-3.5 --help
	coverage --help
	-$(PYLINT) run_tests.py
	$(COVERAGE) run    --branch run_tests.py >  tests.tmp 2>&1
	$(COVERAGE) report -m                      >> tests.tmp
	pwd
	ls
	cat tests.tmp

clean:
	rm -f tests.tmp
	rm -f .pylintrc