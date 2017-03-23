from flask import Blueprint, jsonify

api_brands_blueprints = Blueprint(
    'api_brands', __name__
)

brand_data = {
    0: {
        'id': 0,
        'name': "Pure Anada",
        'avg_price': 12.99,
        'avg_rating': 5.00,
        'num_products': 1,
        'image_url': "http://www.thesimplemoms.com/wp-content/uploads/2013/11/PureAnadaLogo.jpg",
        "products": [
            {
                'id': 0,
                'brand_id': 0,
                'name': "Pure Anada Natural Mascara",
                'description': 'Be the glamrous you.',
                'price': 12.99,
                'rating': 5.00,
                'image_url': "https://d3t32hsnjxo7q6.cloudfront.net/i/afefede002b8d94f6e53ea07dd4070f9_ra,w158,h184_pa,w158,h184.jpg",
                'colors': [],
                'tags': [],
            }
        ],
        'tags': [
            {
                "id": 0,
                "name": "Gluten-Free",
            }
        ],
    },
    1: {
        'id': 1,
        'name': "L'oreal",
        'avg_price': 20.99,
        'avg_rating': 4.56,
        'num_products': 1,
        'image_url': "http://loreal-dam-front-resources-corp-en-cdn.brainsonic.com/ressources/afile/149700-bf308-picture_photo-loreal-logo.jpg",
        "products": [
            {
                'id': 1,
                'brand_id': 1,
                'name': "L'Oreal Paris Colour Riche Collection Exclusive Lip Colour",
                'description': 'Be the glamrous you.',
                'price': 12.99,
                'rating': 5.00,
                'image_url': "https://d3t32hsnjxo7q6.cloudfront.net/i/a9c19212339fb2ed792af559b2a4208d_ra,w158,h184_pa,w158,h184.jpeg",
                'colors': [],
                'tags': [],
            }
        ],
        'tags': [
            {
                "id": 1,
                "name": "Canadian",
            }
        ],
    },
    2: {
        'id': 2,
        'name': "smashbox",
        'avg_price': 12.99,
        'avg_rating': 3.03,
        'num_products': 1,
        'image_url': "http://www.wearemoviegeeks.com/wp-content/uploads/Smashbox-Logo.jpg",
        "products": [
            {
                'id': 2,
                'brand_id': 2,
                'name': "Jet Set Waterproof Eye Liner",
                'description': 'Be the glamrous you.',
                'price': 12.99,
                'rating': 5.00,
                'image_url': "http://www.smashbox.com/media/images/products/388x396/sbx_sku_46012_388x396_0.jpg",
                'colors': [],
                'tags': [],
            }
        ],
        'tags': [
            {
                "id": 2,
                "name": "Natural",
            }
        ],
    }
}


@api_brands_blueprints.route('/api/brands')
def get_brands():
    brand_data_list = [brand_data[key] for key in brand_data]
    return jsonify(brand_data_list)


@api_brands_blueprints.route('/api/brands/<id>')
def get_brand(id):
    return jsonify(brand_data[int(id)])
