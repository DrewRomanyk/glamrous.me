from flask import Blueprint, jsonify
from app.models import Category, Brand, ProductCategory, Product, SubCategory

api_sub_categories_blueprints = Blueprint(
    'api_sub_categories', __name__
)


@api_sub_categories_blueprints.route('/api/sub_categories/<id>')
def get_sub_category(id):
    result = {}
    try:
        sub_category = SubCategory.query.filter_by(id=id).first()
        result['id'] = sub_category.id
        result['name'] = sub_category.name
        result['avg_price'] = sub_category.avg_price
        result['avg_rating'] = sub_category.avg_rating
        result['num_products'] = sub_category.num_products
        result['products'] = []
        result['brands'] = []
        result['tags'] = []
        tag_dict = dict()
        brand_dict = dict()
        sub_cat_dict = dict()
        product_cats = ProductCategory.query.filter_by(
            sub_category_id=sub_category.id).all()
        for product_cat in product_cats:
            # Handle the product
            product = Product.query.filter_by(
                id=product_cat.product_id).first()
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
            if 'category' not in result:
                category = Category.query.filter_by(
                    id=product_cat.category_id).first()
                result['category'] = {
                    'id': category.id,
                    'name': category.name
                }

        for brand_key in brand_dict:
            result['brands'].append(brand_dict[brand_key])
        for tag_key in tag_dict:
            result['tags'].append(tag_dict[tag_key])
    except AttributeError:
        print("Error with Sub Category ID: " + id)
    return jsonify(result)
