# pylint: disable=missing-docstring
# pylint: disable=invalid-name
import os

from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_json(os.getcwd() + "/config.json")
db = SQLAlchemy(app)

# Needed to make migrations happen
from .models import *


@app.route('/')
def home():
    return render_template('home/home.html')


@app.route('/about/')
def about():
    return render_template('about/about.html')
