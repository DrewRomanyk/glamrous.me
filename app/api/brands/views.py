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
    },
    1: {
        'id': 1,
        'name': "L'oreal",
        'avg_price': 20.99,
        'avg_rating': 4.56,
        'num_products': 1,
        'image_url': "http://loreal-dam-front-resources-corp-en-cdn.brainsonic.com/ressources/afile/149700-bf308-picture_photo-loreal-logo.jpg",
    },
    2: {
        'id': 2,
        'name': "smashbox",
        'avg_price': 12.99,
        'avg_rating': 3.03,
        'num_products': 1,
        'image_url': "http://www.wearemoviegeeks.com/wp-content/uploads/Smashbox-Logo.jpg",
    }
}


@api_brands_blueprints.route('/api/brands')
def get_brands():
    brand_data_list = [brand_data[key] for key in brand_data]
    return jsonify(brand_data_list)


@api_brands_blueprints.route('/api/brands/<id>')
def get_brand(id):
    return jsonify(brand_data[int(id)])
