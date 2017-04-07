from flask import Blueprint, jsonify
from app.models import Product, Brand, ProductCategory, Category

api_products_blueprints = Blueprint(
    'api_products', __name__
)


@api_products_blueprints.route('/api/products')
def get_products():
    result = []
    for product in Product.query.all():
        product_json = dict()
        product_json['brand_id'] = product.brand_id
        brand = Brand.query.filter_by(id=product.brand_id).first()
        product_json['brand'] = {
            'id': brand.id,
            'name': brand.name
        }
        product_json['id'] = product.id
        product_json['price'] = product.price
        product_json['rating'] = product.rating
        product_json['image_url'] = product.image_url
        product_json['description'] = product.description if len(product.description) <= 255 \
            else product.description[:254]
        product_json['name'] = product.name
        product_json['colors'] = []
        for color in product.colors:
            product_json['colors'].append({
                'id': color.id,
                'name': color.name,
                'hashcode': color.hashcode
            })
        product_json['category'] = {}
        prodcat = ProductCategory.query.filter_by(product_id=product.id).first()
        cats = Category.query.filter_by(id=prodcat.category_id).first()
        product_json['category'] = {
            'id': cats.id,
            'name': cats.name
        }
        product_json['tags'] = []
        for tag in product.tags:
            product_json['tags'].append({
                'id': tag.id,
                'name': tag.name
            })
        result.append(product_json)
    return jsonify(result)


@api_products_blueprints.route('/api/products/<id>')
def get_product(id):
    result = {}
    try:
        product = Product.query.filter_by(id=id).first()
        result['brand_id'] = product.brand_id
        brand = Brand.query.filter_by(id=product.brand_id).first()
        result['brand'] = {
            'id': brand.id,
            'name': brand.name
        }
        result['id'] = product.id
        result['price'] = product.price
        result['rating'] = product.rating
        result['image_url'] = product.image_url
        result['description'] = product.description
        result['name'] = product.name
        result['colors'] = []
        for color in product.colors:
            result['colors'].append({
                'id': color.id,
                'name': color.name,
                'hashcode': color.hashcode
            })

        result['tags'] = []
        for tag in product.tags:
            result['tags'].append({
                'id': tag.id,
                'name': tag.name
            })
        result['category'] = {}
        prodcat = ProductCategory.query.filter_by(product_id=product.id).first()
        cats = Category.query.filter_by(id=prodcat.category_id).first()
        result['category'] = {
            'id': cats.id,
            'name': cats.name
        }
    except AttributeError:
        print("Error with Product ID: " + id)
    return jsonify(result)
