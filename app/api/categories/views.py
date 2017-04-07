from flask import Blueprint, jsonify
from app.models import Category, Brand, ProductCategory, Product, SubCategory

api_categories_blueprints = Blueprint(
    'api_categories', __name__
)


@api_categories_blueprints.route('/api/categories')

def get_categories():
    result = []
    for category in Category.query.all():
        category_json = dict()
        category_json['id'] = category.id
        category_json['name'] = category.name
        category_json['avg_price'] = category.avg_price
        category_json['avg_rating'] = category.avg_rating
        category_json['num_products'] = category.num_products
        result.append(category_json)
    return jsonify(result)


@api_categories_blueprints.route('/api/categories/<id>')
def get_category(id):
    result = {}
    try:
        category = Category.query.filter_by(id=id).first()
        result['id'] = category.id
        result['name'] = category.name
        result['avg_price'] = category.avg_price
        result['avg_rating'] = category.avg_rating
        result['num_products'] = category.num_products
        result['products'] = []
        result['brands'] = []
        result['tags'] = []
        result['sub_categories'] = []
        tag_dict = dict()
        brand_dict = dict()
        sub_cat_dict = dict()
        product_cats = ProductCategory.query.filter_by(category_id=category.id).all()
        for product_cat in product_cats:
            # Handle the product
            product = Product.query.filter_by(id=product_cat.product_id).first()
            product_json = dict()
            product_json['id'] = product.id
            product_json['name'] = product.name
            result['products'].append(product_json)
            brand = Brand.query.filter_by(id=product.brand_id).first()
            brand_dict[brand.id] = {
                'id': brand.id,
                'name': brand.name
            }
            for tag in product.tags:
                tag_dict[tag.id] = {
                    'id': tag.id,
                    'name': tag.name
                }
            # Handle the sub_categories
            if product_cat.sub_category_id is not None:
                sub_category = SubCategory.query.filter_by(id=product_cat.sub_category_id).first()
                sub_cat_json = {
                    'id': sub_category.id,
                    'name': sub_category.name
                }
                sub_cat_dict[sub_category.id] = sub_cat_json

        for brand_key in brand_dict:
            result['brands'].append(brand_dict[brand_key])
        for tag_key in tag_dict:
            result['tags'].append(tag_dict[tag_key])
        for sub_cat_key in sub_cat_dict:
            result['sub_categories'].append(sub_cat_dict[sub_cat_key])
    except AttributeError:
        print("Error with Category ID: " + id)
    return jsonify(result)

