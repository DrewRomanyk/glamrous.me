from flask import Blueprint, jsonify
from app.models import Tag, Product, Brand

api_tags_blueprints = Blueprint(
    'api_tags', __name__
)

@api_tags_blueprints.route('/api/tags')
def get_brands():
    result = []
    for tag in Tag.query.all():
        tag_json = dict()
        tag_json['id'] = tag.id
        tag_json['name'] = tag.name
        tag_json['avg_price'] = tag.avg_price
        tag_json['avg_rating'] = tag.avg_rating
        tag_json['num_products'] = tag.num_products
        result.append(tag_json)
    return jsonify(result)


@api_tags_blueprints.route('/api/tags/<id>')
def get_tag(id):
    result = {}
    try:
        tag = Tag.query.filter_by(id=id).first()
        result['id'] = tag.id
        result['name'] = tag.name
        result['avg_price'] = tag.avg_price
        result['avg_rating'] = tag.avg_rating
        result['num_products'] = tag.num_products
        result['products'] = []
        result['brands'] = []
        brand_dict = dict()
        products = Product.query.filter(Product.tags.any(id=tag.id)).all()
        for product in products:
            result['products'].append({
                'id': product.id,
                'name': product.name
            })

            brand = Brand.query.filter_by(id=product.brand_id).first()
            brand_dict[brand.id] = {
                'id': brand.id,
                'name': brand.name
            }
        for brand_key in brand_dict:
            result['brands'].append(brand_dict[brand_key])
    except AttributeError:
        print("Error with Tag ID: " + id)
    return jsonify(result)
