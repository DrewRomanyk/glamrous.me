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
        'brand_id': 1,
        'name': "Canadian",
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
        'brand_id': 2,
        'name': "Natural",
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
    3: {
        'id': 0,
        'name': "Gluten-Free",
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
    4: {
        'id': 1,
        'brand_id': 1,
        'name': "Canadian",
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
    5: {
        'id': 2,
        'brand_id': 2,
        'name': "Natural",
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
    6: {
        'id': 0,
        'name': "Gluten-Free",
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
    7: {
        'id': 1,
        'brand_id': 1,
        'name': "Canadian",
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
    8: {
        'id': 2,
        'brand_id': 2,
        'name': "Natural",
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


@api_tags_blueprints.route('/api/tags')
def get_brands():
    tag_data_list = [tag_data[key] for key in tag_data]
    return jsonify(tag_data_list)


@api_tags_blueprints.route('/api/tags/<id>')
def get_tag(id):
    return jsonify(tag_data[int(id)])
