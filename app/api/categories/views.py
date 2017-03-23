from flask import Blueprint, jsonify

api_categories_blueprints = Blueprint(
    'api_categories', __name__
)

category_data = {
    0: {
        'id': 0,
        'name': "Mascara",
        'avg_price': 12.99,
        'avg_rating': 5.00,
        'num_products': 1,
        'brands': [
            {
                'id': 0,
                'name': 'Pure Anada'
            }
        ],
        'products': [
            {
                'id': 0,
                'name': 'Pure Anada Natural Mascara'
            }
        ]
    },
    1: {
        'id': 1,
        'name': "Lipstick",
        'avg_price': 12.99,
        'avg_rating': 5.00,
        'num_products': 1,
        'brands': [
            {
                'id': 1,
                'name': "L'Oreal"
            }
        ],
        'products': [
            {
                'id': 1,
                'name': "L'Oreal Paris Colour Riche Collection Exclusive Lip Colour"
            }
        ]
    },
    2: {
        'id': 2,
        'name': "Eye liner",
        'avg_price': 12.99,
        'avg_rating': 5.00,
        'num_products': 1,
        'brands': [
            {
                'id': 2,
                'name': 'smashbox'
            }
        ],
        'products': [
            {
                'id': 2,
                'name': 'Jet Set Waterproof Eye Liner'
            }
        ]
    },
}


@api_categories_blueprints.route('/api/categories')
def get_brands():
    tag_data_list = [category_data[key] for key in category_data]
    return jsonify(tag_data_list)


@api_categories_blueprints.route('/api/categories/<id>')
def get_tag(id):
    return jsonify(category_data[int(id)])
