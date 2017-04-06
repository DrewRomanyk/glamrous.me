from flask import Blueprint, jsonify

api_search_blueprints = Blueprint(
    'api_search', __name__
)

search_results = {
    'keywords': [],
    'and_results': [],
    'or_results': [],
}


@api_search_blueprints.route('/api/search/<data>')
def get_tag(data):
    keywords = data.split(' ')
    search_results['keywords'] = keywords

    # Search for keywords for the entire database
    # If shown add to OR; if it has all keywords add to AND
    search_results['and_results'] = []
    search_results['or_results'] = []

    return jsonify(search_results)
