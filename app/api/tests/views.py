from flask import Blueprint, jsonify
import unittest
import io
from app.tests import suite

api_test_blueprints = Blueprint(
    'api_test', __name__
)

test_data = {
    'result': '..............................\n----------------------------------------------------------------------\nRan 30 tests in 1.281s OK'
}


@api_test_blueprints.route('/api/test')
def get_tests(): # pragma: no cover
    # Run tests.py here
    with open("unit-test.cache", "w") as stream:
        unittest.TextTestRunner(stream=stream, verbosity=2).run(suite())
    with open("unit-test.cache") as stream:
        test_data['result'] = stream.read()
    return jsonify(test_data)
