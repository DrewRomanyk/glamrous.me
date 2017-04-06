#! /bin/bash
FLAG="-t"
if [[ "$1" == "detach" ]]; then
	FLAG="-d"
fi
exec sudo docker run \
	-v $(pwd):/usr/web $FLAG \
	-w /usr/web \
	-p 8081:5000 \
	--link glamrous-postgres:postgres \
	glamrous-server \
	make test
