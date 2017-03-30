#! /bin/bash
FLAG=""
if [[ "$1" == "detach" ]]; then
	FLAG="-d"
fi
exec sudo docker run $FLAG \
	--name glamrous-postgres \
	glamrous-db
#	-e POSTGRES_PASSWORD=mysecretpassword
