# pylint: disable=wildcard-import
# pylint: disable=missing-docstring
# pylint: disable=unused-import
# pylint: disable=wrong-import-position

import json

with open('config.json') as f:
    DEBUG = json.load(f)['DEBUG']

if not DEBUG:
    import data.data_to_database

from app import app

if __name__ == "__main__":
    app.run(host='0.0.0.0')
