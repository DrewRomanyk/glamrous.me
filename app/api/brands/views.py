from flask import Blueprint, jsonify

api_brands_blueprints = Blueprint(
    'api_brands', __name__
)

brand_data = {
    0: {
        'id': 0,
        'name': "Robert's Lipstick Company",
        'avg_price': 12.99,
        'avg_rating': 5.00,
        'num_products': 20,
        'image_url': "http://www.nyxcosmetics.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-cpd-nyxusa-master-catalog/default/dwdcc2ff58/ProductImages/2016/Lips/Velvet_Matte_Lipstick/velvetmattelipstick_main.jpg?sw=195&sh=195&sm=fit",
    },
    1: {
        'id': 1,
        'name': "Thomas' Mascara Company",
        'avg_price': 20.99,
        'avg_rating': 4.56,
        'num_products': 15,
        'image_url': "http://ell.h-cdn.co/assets/15/47/urban-decay-perversion-mascara---open_1.jpg",
    },
    2: {
        'id': 2,
        'name': "Piel's Eyeliner Company",
        'avg_price': 12.99,
        'avg_rating': 3.03,
        'num_products': 10,
        'image_url': "http://images.ulta.com/is/image/Ulta/2297439?$detail$",
    }
}


@api_brands_blueprints.route('/api/brands')
def get_brands():
    brand_data_list = [brand_data[key] for key in brand_data]
    return jsonify(brand_data_list)


@api_brands_blueprints.route('/api/brands/<id>')
def get_brand(id):
    return jsonify(brand_data[int(id)])
