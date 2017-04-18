FROM datagovsg/python-node:3.5-6.9.4


RUN apt-get update && \
    apt-get install -y \
        libpq-dev \
        gcc \
        build-essential \
        bash \
        tmux

RUN python -m ensurepip && \
	pip install --upgrade pip && \
	pip install \
		flask \
		Flask-SQLAlchemy \
		requests \
		psycopg2 \
		pylint \
		coverage

RUN npm install -g \
	rollup

WORKDIR /usr/web