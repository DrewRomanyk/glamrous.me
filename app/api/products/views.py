from flask import Blueprint, jsonify

api_products_blueprints = Blueprint(
    'api_products', __name__
)

product_data = {
    0: {
        'id': 0,
        'brand_id': 0,
        'brand': {
            'id': 0,
            'name': "Pure Anada",
        },
        'name': "Pure Anada Natural Mascara",
        'description': 'Be the glamrous you.',
        'price': 12.99,
        'rating': 5.00,
        'image_url': "https://d3t32hsnjxo7q6.cloudfront.net/i/afefede002b8d94f6e53ea07dd4070f9_ra,w158,h184_pa,w158,h184.jpg",
        'colors': [],
        'tags': [
            {
                "id": 0,
                "name": "Gluten-Free",
            },
            {
                "id": 1,
                "name": "Canadian",
            }
        ],
    },
    1: {
        'id': 1,
        'brand_id': 1,
        'brand': {
            'id': 1,
            'name': "L'Oreal",
        },
        'name': "L'Oreal Paris Colour Riche Collection Exclusive Lip Colour",
        'description': 'I am a long description. I am a long description. I am a long description. I am a long description. I am a long description. I am a long description. ',
        'price': 20.99,
        'rating': 4.56,
        'image_url': "https://d3t32hsnjxo7q6.cloudfront.net/i/a9c19212339fb2ed792af559b2a4208d_ra,w158,h184_pa,w158,h184.jpeg",
        'colors': [],
        'tags': [
            {
                "id": 1,
                "name": "Canadian",
            }
        ],
    },
    2: {
        'id': 2,
        'brand_id': 2,
        'brand': {
            'id': 2,
            'name': "smashbox",
        },
        'name': "Jet Set Waterproof Eye Liner",
        'description': 'Be the glamrous you.',
        'price': 12.99,
        'rating': 3.03,
        'image_url': "http://www.smashbox.com/media/images/products/388x396/sbx_sku_46012_388x396_0.jpg",
        'colors': [],
        'tags': [
            {
                "id": 2,
                "name": "Natural",
            }
        ],
    },
}


@api_products_blueprints.route('/api/products')
def get_products():
    product_data_list = [product_data[key] for key in product_data]
    return jsonify(product_data_list)


@api_products_blueprints.route('/api/products/<id>')
def get_product(id):
    return jsonify(product_data[int(id)])
