# pylint: disable=missing-docstring
# pylint: disable=invalid-name
from flask import Flask, send_from_directory
app = Flask(__name__, static_folder='build', static_url_path='')

@app.route("/")
def root():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def actual_filename(path):
    return send_from_directory(app.static_folder, path)

if __name__ == "__main__":
    app.run(host='0.0.0.0')
