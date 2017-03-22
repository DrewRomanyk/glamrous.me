from flask import Blueprint, jsonify

api_tags_blueprints = Blueprint(
    'api_tags', __name__
)

tag_data = {
    0: {
        'id': 0,
        'name': "Gluten-Free",
        'avg_price': 12.99,
        'avg_rating': 5.00,
        'num_products': 1,
    },
    1: {
        'id': 1,
        'brand_id': 1,
        'name': "Canadian",
        'avg_price': 12.99,
        'avg_rating': 5.00,
        'num_products': 1,
    },
    2: {
        'id': 2,
        'brand_id': 2,
        'name': "Natural",
        'avg_price': 12.99,
        'avg_rating': 5.00,
        'num_products': 1,
    },
}


@api_tags_blueprints.route('/api/tags/<id>')
def get_tag(id):
    return jsonify(tag_data[int(id)])
