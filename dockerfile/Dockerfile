FROM python:3.6.0

ADD . /app
WORKDIR /app

RUN pip install --upgrade pip && \
    pip install -r pip_requirements

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        $(grep -vE "^\s*#" ./apt_requirements | tr "\n" " ")

RUN npm install

CMD python app/app.py

EXPOSE 80
EXPOSE 5000
EXPOSE 8000
EXPOSE 8080
