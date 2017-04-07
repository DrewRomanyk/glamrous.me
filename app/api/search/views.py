from flask import Blueprint, jsonify
from app.models import Brand, Product, Category, SubCategory, Tag

api_search_blueprints = Blueprint(
    'api_search', __name__
)

search_results = {
    'keywords': [],
    'and_results': [],
    'or_results': [],
}


def search_for_keyword(keyword, contents):
    for content in contents:
        if content.lower().find(keyword.lower()) != -1:
            return True
    return False


@api_search_blueprints.route('/api/search/<data>')
def get_tag(data):
    keywords = data.split(' ')
    search_results['keywords'] = keywords

    # Search for keywords for the entire database
    results = dict()
    # Brands
    results['Brand'] = {}
    for brand in Brand.query.all():
        for keyword in keywords:
            if keyword not in results['Brand']:
                results['Brand'][keyword] = set()
            contents = [brand.name]
            if search_for_keyword(keyword, contents):
                results['Brand'][keyword] |= {brand.id}
    # Products
    results['Product'] = {}
    for product in Product.query.all():
        for keyword in keywords:
            if keyword not in results['Product']:
                results['Product'][keyword] = set()
            contents = [product.name, product.description]
            for color in product.colors:
                contents.append(color.name)
            if search_for_keyword(keyword, contents):
                results['Product'][keyword] |= {product.id}
    # Categories
    results['Category'] = {}
    for category in Category.query.all():
        for keyword in keywords:
            if keyword not in results['Category']:
                results['Category'][keyword] = set()
            contents = [category.name]
            if search_for_keyword(keyword, contents):
                results['Category'][keyword] |= {category.id}
    # SubCategories
    results['Sub Category'] = {}
    for sub_category in SubCategory.query.all():
        for keyword in keywords:
            if keyword not in results['Sub Category']:
                results['Sub Category'][keyword] = set()
            contents = [sub_category.name]
            if search_for_keyword(keyword, contents):
                results['Sub Category'][keyword] |= {sub_category.id}
    # Tags
    results['Tag'] = {}
    for tag in Tag.query.all():
        for keyword in keywords:
            if keyword not in results['Tag']:
                results['Tag'][keyword] = set()
            contents = [tag.name]
            if search_for_keyword(keyword, contents):
                results['Tag'][keyword] |= {tag.id}

    search_results['and_results'] = []
    search_results['or_results'] = []

    for class_name in results:
        is_first_keyword = True
        and_class_id_set = set()
        or_class_id_set = set()
        for keyword in results[class_name]:
            id_set = set()
            for id in results[class_name][keyword]:
                id_set |= {id}

            or_class_id_set |= id_set
            if is_first_keyword:
                and_class_id_set = id_set
            else:
                and_class_id_set = and_class_id_set.intersection(id_set)

            is_first_keyword = False

        # Get class from id sets
        model_class = Brand
        if class_name == 'Brand':
            model_class = Brand
        elif class_name == 'Product':
            model_class = Product
        elif class_name == 'Category':
            model_class = Category
        elif class_name == 'Sub Category':
            model_class = SubCategory
        elif class_name == 'Tag':
            model_class = Tag
        else:
            print("Model Class not found: " + class_name)

        # And
        if len(and_class_id_set) > 0:
            query = model_class.query.filter(model_class.id.in_(and_class_id_set)).all()
            for obj in query:
                search_results['and_results'].append({
                    'id': obj.id,
                    'type': class_name,
                    'name': obj.name
                })

        # Or
        if len(or_class_id_set) > 0:
            query = model_class.query.filter(model_class.id.in_(or_class_id_set)).all()
            for obj in query:
                search_results['or_results'].append({
                    'id': obj.id,
                    'type': class_name,
                    'name': obj.name
                })

    return jsonify(search_results)
