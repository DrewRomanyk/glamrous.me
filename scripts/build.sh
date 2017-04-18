#!/bin/bash
FLAG="-i"
if [ -z "$1" ]; then
	FLAG="-it"
fi

if [ -z "$1" ] || [[ "$1" == "auto" ]]; then
	sudo docker run \
		$FLAG \
		-v $(pwd):/usr/web \
		-w /usr/web \
		glamrousme_app \
		./scripts/build.sh $(whoami) "$1"
else
	CMD="tmux"
	if [[ "$2" == "auto" ]]; then
		CMD="NODE_ENV='production' rollup -c"
	fi
	adduser --disabled-password --gecos "" "$1"
	su "$1" -c "npm install && $CMD"
fi
