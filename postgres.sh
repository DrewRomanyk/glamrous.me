#! /bin/bash
FLAG=""
if [[ "$1" == "detach" ]]; then
	FLAG="-d"
fi
exec sudo docker run $FLAG \
	--name glamrous-postgres \
	-p 5432:5432 \
	glamrous-db
#	-e POSTGRES_PASSWORD=mysecretpassword
