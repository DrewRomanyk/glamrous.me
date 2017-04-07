#!/bin/bash
docker-ip() {
  sudo docker inspect --format '{{ .NetworkSettings.IPAddress }}' "$@"
}

[[ -e config.json ]] && cp config.json config.json.bak
cp config.json.test config.json

DB_IP=$(docker-ip glamrous-postgres)

echo "IP address of postgres container is $DB_IP"

echo "Creating configuration file..."
sed -ie "s/IPADDRESS/${DB_IP}/g" config.json