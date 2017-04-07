from flask import Blueprint, jsonify
from app.models import Brand, Product, Category, Tag

api_search_blueprints = Blueprint(
    'api_search', __name__
)

search_results = {
    'keywords': [],
    'and_results': [],
    'or_results': [],
}


def search_for_keyword(keyword, content):
    return content.find(keyword) != -1


@api_search_blueprints.route('/api/search/<data>')
def get_tag(data):
    keywords = data.split(' ')
    search_results['keywords'] = keywords

    # Search for keywords for the entire database
    results = dict()
    for keyword in keywords:
        results[keyword] = {}
    for brand in Brand.query.all():
        for keyword in keywords:
            if search_for_keyword(keyword, brand.name):
                results[keyword][brand.id] = {
                    'id': brand.id,
                    'type': 'Brand',
                    'name': brand.name
                }

    search_results['and_results'] = []
    search_results['or_results'] = results

    return jsonify(search_results)
