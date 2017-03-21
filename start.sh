exec sudo docker run \
	-v $(pwd):/usr/web -t \
	-w /usr/web \
	-p 8080:5000 \
	--entrypoint="python" \
	glamrous-server \
	run_server.py
