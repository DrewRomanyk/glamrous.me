# pylint: disable=missing-docstring
# pylint: disable=invalid-name
# pylint: disable=wildcard-import
# pylint: disable=wrong-import-position
import os

from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, static_url_path='')

app.config.from_json(os.getcwd() + "/config.json")
db = SQLAlchemy(app)

# Needed to make migrations happen
from .models import *


@app.route('/static/<path:path>')
def static_resources(path):
    return send_from_directory('static', path)


@app.route('/', defaults={'path': ''})
@app.route('/<string:path>')
def route(path):  # pylint: disable=unused-argument
    return send_from_directory('', 'index.html')
