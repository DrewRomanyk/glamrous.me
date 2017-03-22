# pylint: disable=missing-docstring
# pylint: disable=invalid-name
# pylint: disable=wildcard-import
# pylint: disable=wrong-import-position
import os

from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from .api.brands.views import api_brands_blueprints

app = Flask(__name__, static_url_path='/static')

app.config.from_json(os.getcwd() + "/config.json")
db = SQLAlchemy(app)

# Needed to make migrations happen
from .models import *

app.register_blueprint(api_brands_blueprints)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def route(path):  # pylint: disable=unused-argument
    return send_from_directory('', 'index.html')
