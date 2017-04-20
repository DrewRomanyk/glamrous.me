from flask import Blueprint, jsonify
import unittest
from app.tests import suite
import coverage

api_test_blueprints = Blueprint(
    'api_test', __name__
)

test_data = {
    'result': '..............................\n----------------------------------------------------------------------\nRan 30 tests in 1.281s OK'
}


@api_test_blueprints.route('/api/test')
def get_tests():  # pragma: no cover
    # Run tests.py here

    with open("unit-test.cache", "w") as stream:
        c = coverage.Coverage()
        c.start()
        unittest.TextTestRunner(stream=stream, verbosity=2).run(suite())
        c.stop()
        c.report(file=stream)
    with open("unit-test.cache") as stream:
        test_data['result'] = stream.read()
    return jsonify(test_data)
