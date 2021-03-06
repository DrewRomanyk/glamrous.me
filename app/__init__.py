# pylint: disable=missing-docstring
# pylint: disable=invalid-name
# pylint: disable=wildcard-import
# pylint: disable=wrong-import-position
import os

from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, static_url_path='/static')

app.config.from_json(os.getcwd() + "/config.json")
db = SQLAlchemy(app)

# Needed to make migrations happen
from .api.brands.views import api_brands_blueprints
from .api.products.views import api_products_blueprints
from .api.tags.views import api_tags_blueprints
from .api.categories.views import api_categories_blueprints
from .api.sub_categories.views import api_sub_categories_blueprints
from .api.tests.views import api_test_blueprints
from .api.about.views import api_about_blueprints
from .api.search.views import api_search_blueprints

# API routing through their own modules
app.register_blueprint(api_brands_blueprints)
app.register_blueprint(api_products_blueprints)
app.register_blueprint(api_tags_blueprints)
app.register_blueprint(api_categories_blueprints)
app.register_blueprint(api_sub_categories_blueprints)
app.register_blueprint(api_test_blueprints)
app.register_blueprint(api_about_blueprints)
app.register_blueprint(api_search_blueprints)

# Client-side routing through React
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def route(path):  # pylint: disable=unused-argument
    return send_from_directory('', 'index.html')
