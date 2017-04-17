# pylint: disable=wildcard-import
import json

with open('config.json') as f:
    debug = json.load(f)['DEBUG']

if not debug:
    import data.data_to_database

from app import app

if __name__ == "__main__":
    app.run(host='0.0.0.0')
