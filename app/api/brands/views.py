from flask import Blueprint, jsonify
from app.models import Brand, ProductCategory, Category, SubCategory

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
        brand_json['tags'] = []
        brand_json['categories'] = []
        brand_json['sub_categories'] = []
        tag_dict = dict()
        categories_dict = dict()
        sub_categories_dict = dict()
        for product in brand.products:
            prodcat = ProductCategory.query.filter_by(product_id=product.id).first()
            cat = Category.query.filter_by(id=prodcat.category_id).first()
            categories_dict[cat.id] = {
                'id': cat.id,
                'name': cat.name
            }
            if prodcat.sub_category_id != 1:
                sub_cat = SubCategory.query.filter_by(id=prodcat.sub_category_id).first()
                sub_categories_dict[sub_cat.id] = {
                    'id': sub_cat.id,
                    'name': sub_cat.name
                }
            for tag in product.tags:
                tag_dict[tag.id] = {
                    'id': tag.id,
                    'name': tag.name
                }
        for tag_key in tag_dict:
            brand_json['tags'].append(tag_dict[tag_key])
        for cat_key in categories_dict:
            brand_json['categories'].append(categories_dict[cat_key])
        for sub_cat_key in sub_categories_dict:
            brand_json['sub_categories'].append(sub_categories_dict[sub_cat_key])
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
        result['categories'] = []
        result['sub_categories'] = []
        tag_dict = dict()
        categories_dict = dict()
        sub_categories_dict = dict()
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
            # Handle the sub_categories
            prodcat = ProductCategory.query.filter_by(product_id=product.id).first()
            cat = Category.query.filter_by(id=prodcat.category_id).first()
            categories_dict[cat.id] = {
                'id': cat.id,
                'name': cat.name
            }
            if prodcat.sub_category_id != 1:
                sub_cat = SubCategory.query.filter_by(id=prodcat.sub_category_id).first()
                sub_categories_dict[sub_cat.id] = {
                    'id': sub_cat.id,
                    'name': sub_cat.name
                }
        for tag_key in tag_dict:
            result['tags'].append(tag_dict[tag_key])
        for cat_key in categories_dict:
            result['categories'].append(categories_dict[cat_key])
        for sub_cat_key in sub_categories_dict:
            result['sub_categories'].append(sub_categories_dict[sub_cat_key])
    except AttributeError:
        print("Error with Brand ID: " + id)
    return jsonify(result)
