#! /bin/bash
FLAG="-t"
exec sudo docker run \
	-v $(pwd):/usr/web $FLAG \
	-w /usr/web \
	-p 8080:5000 \
	--link glamrous-postgres:postgres \
	--entrypoint="python" \
	glamrous-server \
	run_server.py