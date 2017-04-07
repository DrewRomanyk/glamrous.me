#!/bin/bash
[[ -e config.json ]] && cp config.json config.json.bak
cp config.json.test config.json
DB_IP=sudo docker inspect --format '{{ .NetworkSettings.IPAddress }}' "glamrous-postgres"
sed -ie "s/IPADDRESS/${DB_IP}/g" config.json