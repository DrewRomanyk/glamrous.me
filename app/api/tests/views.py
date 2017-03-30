from flask import Blueprint, jsonify

api_test_blueprints = Blueprint(
    'api_test', __name__
)

test_data = {
    'result': '..............................\n----------------------------------------------------------------------\nRan 30 tests in 1.281s OK'
}


@api_test_blueprints.route('/api/test')
def get_tests():
    # Run tests.py here
    return jsonify(test_data)
