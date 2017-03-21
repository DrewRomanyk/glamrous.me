sudo docker run \
	-v $(pwd):/usr/web -d \
	-w /usr/web \
	-p 8080:5000 \
	docker-glamrous \
	python run.py
	#python -m http.server

# sudo docker kill $(sudo docker ps | grep "docker-glamrous" | cut -d" " -f1)