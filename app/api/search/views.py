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
    spacing_context = 4
    for content in contents:
        index = content.lower().find(keyword.lower())
        if index != -1:
            pre_str = content[max(0, index - spacing_context):index]
            context_str = '<b>' + content[index: index + len(keyword)] + '</b>'
            post_str = content[index + len(keyword):min(len(content), index + len(keyword) + spacing_context)]
            context_str = pre_str + context_str + post_str
            if max(0, index - spacing_context) > 0:
                context_str = '...' + context_str
            if min(len(content), index + len(keyword) + spacing_context) < len(content):
                context_str += '...'
            context_str = "'" + context_str + "'"

            return True, context_str
    return False, None


@api_search_blueprints.route('/api/search/<query>')
def get_search_results(query):
    keywords = query.split(' ')
    search_results['keywords'] = keywords

    # Search for keywords for the entire database
    results = dict()
    # Brands
    results['Brand'] = {}
    for brand in Brand.query.all():
        contents = [brand.name]
        for keyword in keywords:
            if keyword not in results['Brand']:
                results['Brand'][keyword] = dict()
            found, context = search_for_keyword(keyword, contents)
            if found:
                results['Brand'][keyword][brand.id] = context
    # Products
    results['Product'] = {}
    for product in Product.query.all():
        contents = [product.name, product.description]
        for keyword in keywords:
            if keyword not in results['Product']:
                results['Product'][keyword] = dict()
            for color in product.colors:
                contents.append(color.name)
            found, context = search_for_keyword(keyword, contents)
            if found:
                results['Product'][keyword][product.id] = context
    # Categories
    results['Category'] = {}
    for category in Category.query.all():
        contents = [category.name]
        for keyword in keywords:
            if keyword not in results['Category']:
                results['Category'][keyword] = dict()
            found, context = search_for_keyword(keyword, contents)
            if found:
                results['Category'][keyword][category.id] = context
    # SubCategories
    results['Sub Category'] = {}
    for sub_category in SubCategory.query.all():
        contents = [sub_category.name]
        for keyword in keywords:
            if keyword not in results['Sub Category']:
                results['Sub Category'][keyword] = dict()
            found, context = search_for_keyword(keyword, contents)
            if found:
                results['Sub Category'][keyword][sub_category.id] = context
    # Tags
    results['Tag'] = {}
    for tag in Tag.query.all():
        contents = [tag.name]
        for keyword in keywords:
            if keyword not in results['Tag']:
                results['Tag'][keyword] = set()
            found, context = search_for_keyword(keyword, contents)
            if found:
                results['Tag'][keyword][tag.id] = context

    search_results['and_results'] = []
    search_results['or_results'] = []

    for class_name in results:
        is_first_keyword = True
        and_class_id_results = dict()
        or_class_id_results = dict()
        for keyword in results[class_name]:
            id_results = dict()
            for id in results[class_name][keyword]:
                id_results[id] = results[class_name][keyword][id]

            for id in id_results:
                if id in or_class_id_results:
                    or_class_id_results[id] += ' or ' + id_results[id]
                else:
                    or_class_id_results[id] = id_results[id]
            if is_first_keyword:
                and_class_id_results = id_results
            else:
                and_delete_set = set()
                for and_id in and_class_id_results:
                    if and_id in id_results:
                        and_class_id_results[and_id] += ' and ' + id_results[and_id]
                    else:
                        and_delete_set |= {and_id}
                for delete_id in and_delete_set:
                    del and_class_id_results[delete_id]

            is_first_keyword = False

        # Get class from id sets
        model_class = Brand
        url_class = '/brands/'
        if class_name == 'Brand':
            model_class = Brand
            url_class = '/brands/'
        elif class_name == 'Product':
            model_class = Product
            url_class = '/products/'
        elif class_name == 'Category':
            model_class = Category
            url_class = '/categories/'
        elif class_name == 'Sub Category':
            model_class = SubCategory
            url_class = '/subcategories/'
        elif class_name == 'Tag':
            model_class = Tag
            url_class = '/tags/'
        else:
            print("Model Class not found: " + class_name)

        # And
        if len(and_class_id_results) > 0:
            query = model_class.query.filter(model_class.id.in_(and_class_id_results.keys())).all()
            for obj in query:
                search_results['and_results'].append({
                    'id': obj.id,
                    'type': class_name,
                    'url_type': url_class,
                    'name': obj.name,
                    'context': and_class_id_results[obj.id]
                })

        # Or
        if len(or_class_id_results) > 0:
            query = model_class.query.filter(model_class.id.in_(or_class_id_results)).all()
            for obj in query:
                search_results['or_results'].append({
                    'id': obj.id,
                    'type': class_name,
                    'url_type': url_class,
                    'name': obj.name,
                    'context': or_class_id_results[obj.id]
                })

    return jsonify(search_results)
