#!/bin/bash
if [ -z "$1" ]; then
	sudo docker run \
		-v $(pwd):/usr/dev \
		-w /usr/dev \
		-it \
		glamrous-dev \
		./build.sh $(whoami)
else
	adduser -D "$1"
	su "$1" -c "npm install && tmux"
fi
