from urllib.request import Request, urlopen
import json

with open('config.json') as f:
    bing_api_key = json.load(f)['BING_IMAGE_API_KEY']

""" API JSON """
# url = "http://makeup-api.herokuapp.com/api/v1/products.json"
# response = urllib.request.urlopen(url)
# api_products = json.load(response)
""" MODIFIED JSON """
with open('makeup_products.json') as f:
    api_products = json.load(f)

brands = {}
products = {}
categories = {}
tags = {}


def get_brand_image_from_bing(brand_name):
    # image_url_req = Request(
    #     "https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=smashbox&mkt=en-us&imageType=line&safeSearch=Strict")
    # image_url_req.add_header('Ocp-Apim-Subscription-Key', bing_api_key)
    # response = urlopen(image_url_req)
    # bing_image_response = json.load(response)

    # Find first image url
    return ''  # bing_image_response['value'][0]['contentUrl']


def update_average(cur_avg, length, new_data):
    return cur_avg + (new_data - cur_avg) / length


def create_product(api_product):
    price = api_product['price'] if api_product['price'] is not None else 0
    rating = api_product['rating'] if api_product['rating'] is not None else 0
    return {
        'id': api_product['id'],
        'name': api_product['name'],
        'description': api_product['description'],
        'price': float(price),
        'rating': float(rating),
        'image_url': api_product['image_link'],
        'colors': api_product['product_colors'],
        'tags': set()
    }


def create_or_update_brand(brand_name, product):
    if brand_name not in brands:
        # Create
        brands[brand_name] = {
            'id': len(brands),
            'name': brand_name,
            'image_url': get_brand_image_from_bing(brand_name),
            'avg_price': product['price'],
            'avg_rating': product['rating'],
            'products': {
                product['id'],
            },
            'categories': set(),
        }
    else:
        # Update
        brands[brand_name]['avg_price'] = update_average(
            brands[brand_name]['avg_price'],
            len(brands[brand_name]['products']),
            product['price']
        )
        brands[brand_name]['avg_rating'] = update_average(
            brands[brand_name]['avg_rating'],
            len(brands[brand_name]['products']),
            product['rating']
        )
        brands[brand_name]['products'] |= {product['id']}


def create_or_update_category(category_name, is_root, product):
    if category_name not in categories:
        # Create
        categories[category_name] = {
            'id': len(categories),
            'name': category_name,
            'is_root': is_root,
            'avg_price': product['price'],
            'avg_rating': product['rating'],
            'products': {
                product['id'],
            },
            'sub_categories': set(),
            'brands': set()
        }
    else:
        # Update
        categories[category_name]['avg_price'] = update_average(
            categories[category_name]['avg_price'],
            len(categories[category_name]['products']),
            product['price']
        )
        categories[category_name]['avg_rating'] = update_average(
            categories[category_name]['avg_rating'],
            len(categories[category_name]['products']),
            product['rating']
        )
        categories[category_name]['products'] |= {product['id']}


def create_or_update_tag(tag_name, product):
    if tag_name not in tags:
        # Create
        tags[tag_name] = {
            'id': len(tags),
            'name': tag_name,
            'avg_price': product['price'],
            'avg_rating': product['rating'],
            'products': {
                product['id'],
            },
            'brands': set()
        }
    else:
        # Update
        tags[tag_name]['avg_price'] = update_average(
            tags[tag_name]['avg_price'],
            len(tags[tag_name]['products']),
            product['price']
        )
        tags[tag_name]['avg_rating'] = update_average(
            tags[tag_name]['avg_rating'],
            len(tags[tag_name]['products']),
            product['rating']
        )
        tags[tag_name]['products'] |= {product['id']}


get_brand_image_from_bing("smashbox")

for api_product in api_products:
    product_id = api_product['id']
    # Create Product
    products[product_id] = create_product(api_product)

    # Create/Update Brand
    brand_name = api_product['brand']
    create_or_update_brand(brand_name, products[product_id])
    products[product_id]['brand'] = brands[brand_name]['id']

    # Create/Update Category
    category_name = api_product['product_type']
    create_or_update_category(category_name, True, products[product_id])
    products[product_id]['category'] = categories[category_name]['id']

    # Create/Update Sub-Category
    sub_category_name = api_product['category']
    if sub_category_name is not None:
        create_or_update_category(sub_category_name, False, products[product_id])
        products[product_id]['sub_category'] = categories[sub_category_name]['id']
        categories[category_name]['sub_categories'] |= {categories[sub_category_name]['id']}

    # Create/Update Tags
    tag_name_list = api_product['tag_list']
    for tag_name in tag_name_list:
        create_or_update_tag(tag_name, products[product_id])
        products[product_id]['tags'] |= {tags[tag_name]['id']}
        tags[tag_name]['brands'] |= {brands[brand_name]['id']}

    # Relations
    brands[brand_name]['categories'] |= {categories[category_name]['id']}
    if sub_category_name is not None:
        brands[brand_name]['categories'] |= {categories[sub_category_name]['id']}

    categories[category_name]['brands'] |= {brands[brand_name]['id']}


class SetEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, set):
            return list(obj)
        return json.JSONEncoder.default(self, obj)


with open('products.json', 'w') as f:
    json.dump(products, f, cls=SetEncoder)

with open('brands.json', 'w') as f:
    json.dump(brands, f, cls=SetEncoder)

with open('categories.json', 'w') as f:
    json.dump(categories, f, cls=SetEncoder)

with open('tags.json', 'w') as f:
    json.dump(tags, f, cls=SetEncoder)
