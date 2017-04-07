from flask import Blueprint, jsonify
from app.models import Brand

api_brands_blueprints = Blueprint(
    'api_brands', __name__
)


@api_brands_blueprints.route('/api/brands')
def get_brands():
    result = []
    for brand in Brand.query.all():
        brand_json = dict()
        brand_json['name'] = brand.name
        brand_json['id'] = brand.id
        brand_json['avg_price'] = brand.avg_price
        brand_json['avg_rating'] = brand.avg_rating
        brand_json['image_url'] = brand.image_url
        brand_json['num_products'] = brand.num_products
        result.append(brand_json)
    return jsonify(result)


@api_brands_blueprints.route('/api/brands/<id>')
def get_brand(id):
    result = {}
    try:
        brand = Brand.query.filter_by(id=id).first()
        result['name'] = brand.name
        result['id'] = brand.id
        result['avg_price'] = brand.avg_price
        result['avg_rating'] = brand.avg_rating
        result['image_url'] = brand.image_url
        result['num_products'] = brand.num_products
        result['products'] = []
        result['tags'] = []
        tag_dict = dict()
        for product in brand.products:
            product_json = dict()
            product_json['id'] = product.id
            product_json['name'] = product.name
            result['products'].append(product_json)
            for tag in product.tags:
                tag_dict[tag.id] = {
                    'id': tag.id,
                    'name': tag.name
                }
        for tag_key in tag_dict:
            result['tags'].append(tag_dict[tag_key])
    except AttributeError:
        print("Error with Brand ID: " + id)
    return jsonify(result)
