sudo docker run \
	-v $(pwd):/usr/web -t \
	-w /usr/web \
	-p 8080:5000 \
	docker-glamrous \
	python server/server.py
	#python -m http.server

#sudo docker kill $(sudo docker ps | grep "docker-glamrous" | cut -d" " -f1)
