from flask import Blueprint, jsonify

api_products_blueprints = Blueprint(
    'api_products', __name__
)

product_data = {
    0: {
        'id': 0,
        'brand_id': 0,
        'name': "Robert's Special Lipstick",
        'description': 'Be the glamrous you.',
        'price': 12.99,
        'rating': 5.00,
        'image_url': "http://www.nyxcosmetics.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-cpd-nyxusa-master-catalog/default/dwdcc2ff58/ProductImages/2016/Lips/Velvet_Matte_Lipstick/velvetmattelipstick_main.jpg?sw=195&sh=195&sm=fit",
        'colors': [],
        'tags': [],
    },
    1: {
        'id': 1,
        'brand_id': 1,
        'name': "Thomas' Special Mascara",
        'description': 'Be the glamrous you.',
        'price': 12.99,
        'rating': 5.00,
        'image_url': "http://www.nyxcosmetics.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-cpd-nyxusa-master-catalog/default/dwdcc2ff58/ProductImages/2016/Lips/Velvet_Matte_Lipstick/velvetmattelipstick_main.jpg?sw=195&sh=195&sm=fit",
        'colors': [],
        'tags': [],
    },
    2: {
        'id': 2,
        'brand_id': 2,
        'name': "Piel's Special Eyeliner",
        'description': 'Be the glamrous you.',
        'price': 12.99,
        'rating': 5.00,
        'image_url': "http://www.nyxcosmetics.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-cpd-nyxusa-master-catalog/default/dwdcc2ff58/ProductImages/2016/Lips/Velvet_Matte_Lipstick/velvetmattelipstick_main.jpg?sw=195&sh=195&sm=fit",
        'colors': [],
        'tags': [],
    },
}


@api_products_blueprints.route('/api/products')
def get_brands():
    product_data_list = [product_data[key] for key in product_data]
    return jsonify(product_data_list)


@api_products_blueprints.route('/api/products/<id>')
def get_product(id):
    return jsonify(product_data[int(id)])
