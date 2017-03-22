#!/bin/bash
if [ -z "$1" ] || [[ "$1" == "auto" ]]; then
	sudo docker run \
		-v $(pwd):/usr/dev \
		-w /usr/dev \
		-it \
		glamrous-dev \
		./build.sh $(whoami) "$1"
else
	CMD="tmux"
	if [[ "$2" == "auto" ]]; then
		CMD="NODE_ENV='production' rollup -c"
	fi
	adduser -D "$1"
	su "$1" -c "npm install && $CMD"
fi
