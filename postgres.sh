FLAG=""
if [[ "$1" == "detach" ]]; then
	FLAG="-d"
fi
exec docker run $FLAG \
	--name glamrous-postgres \
	postgres
#	-e POSTGRES_PASSWORD=mysecretpassword
