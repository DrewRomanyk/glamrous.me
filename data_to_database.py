from app.app import db
from app.models import Brand, Product, Color, Category, SubCategory, ProductCategory, Tag
from urllib.request import Request, urlopen
import json
from pathlib import Path
import urllib.parse

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
colors = {}


def reset_db():
    db.drop_all()
    db.create_all()


def get_brand_images():
    brand_images = {}
    brand_images_json_fn = 'brand_images.json'
    brand_images_json_file = Path(brand_images_json_fn)
    if not brand_images_json_file.is_file():
        # Create json
        for brand_name in brands:
            image_url = get_brand_image_from_bing(brand_name)
            brand_images[brand_name] = image_url
        # Store
        with open(brand_images_json_fn, 'w') as f:
            json.dump(brand_images, f)
    else:
        # Load json
        with open(brand_images_json_fn) as f:
            brand_images = json.load(f)
    return brand_images


def get_brand_image_from_bing(brand_name):
    search_query_param = urllib.parse.urlencode({'q': brand_name})
    image_url_req = Request(
        "https://api.cognitive.microsoft.com/bing/v5.0/images/search?" + search_query_param + "&mkt=en-us&imageType=line&safeSearch=Strict")
    image_url_req.add_header('Ocp-Apim-Subscription-Key', bing_api_key)
    response = urlopen(image_url_req)
    bing_image_response = json.load(response)

    # Find first image url
    return bing_image_response['value'][0]['contentUrl']


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
            'image_url': '',
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


def create_colors():
    for p in products:
        for c in products[p]['colors']:
            cur_color = c['colour_name']
            if cur_color not in colors:
                colors[cur_color] = {}
                colors[cur_color]['hex'] = c['hex_value']
                colors[cur_color]['count'] = 1
            else:
                colors[cur_color]['count'] += 1


def get_tag_name(tid):
    for t in tags:
        if tags[t]['id'] == tid:
            return t


def get_category_id(cid):
    for c in categories:
        if categories[c]['id'] == cid:
            cid = Category.query.filter_by(name=categories[c]['name']).first().id
            return cid


def get_sub_category_id(sid):
    if sid:
        for s in categories:
            if categories[s]['id'] == sid:
                sid = SubCategory.query.filter_by(name=categories[s]['name']).first().id
                return sid
    else:
        sid = sub_cat_id = SubCategory.query.filter_by(name='').first().id
        return sid


def insert_brand_product_relations(bname, b):
    brand = Brand(bname, float(format(b['avg_price'], '.2f')), float(format(b['avg_rating'], '.2f')),
                  len(b['products']), b['image_url'])
    db.session.add(brand)
    db.session.flush()
    for p in b['products']:
        cur_product = products[p]
        product = Product(brand.id, cur_product['name'], cur_product['description'],
                          float(format(cur_product['price'], '.2f')), float(format(cur_product['rating'], '.2f')),
                          cur_product['image_url'])
        db.session.add(product)
        db.session.flush()

        # Add product_tag relation
        for t in cur_product['tags']:
            product.tags.append(Tag.query.filter_by(name=get_tag_name(t)).first())

        # Add product_color relation
        for c in cur_product['colors']:
            product.colors.append(Color.query.filter_by(name=c['colour_name']).first())

        # Add product_category relation
        cid = cur_product['category']
        sid = None
        if 'sub_category' in cur_product:
            sid = cur_product['sub_category']

        product_category = ProductCategory(product.id, get_category_id(cid), get_sub_category_id(sid))
        db.session.add(product_category)

        brand.products.append(product)
    db.session.commit()


def insert_null_category():
    sub_category = SubCategory('', None, None, None)
    db.session.add(sub_category)
    db.session.commit()


def insert_category(cname, c):
    category = Category(cname, float(format(c['avg_price'], '.2f')), float(format(c['avg_rating'], '.2f')),
                        len(c['products']))
    db.session.add(category)
    db.session.commit()


def insert_color(cname, c):
    color = Color(cname, c['hex'], c['count'])
    db.session.add(color)
    db.session.commit()


def insert_tag(tname, t):
    tag = Tag(tname, float(format(t['avg_price'], '.2f')), float(format(t['avg_rating'], '.2f')), len(t['products']))
    db.session.add(tag)
    db.session.commit()


def insert_subcategory(sname, s):
    sub_category = SubCategory(sname, float(format(s['avg_price'], '.2f')), float(format(s['avg_rating'], '.2f')),
                               len(s['products']))
    db.session.add(sub_category)
    db.session.commit()


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

# Brand Images
brand_images = get_brand_images()

# Drop all tables in db and recreate them from the models.py
reset_db()

# Insert all tags values
for t in tags:
    insert_tag(t, tags[t])

# Insert all color values
create_colors()
for c in colors:
    insert_color(c, colors[c])

# Insert a null sub category for categories without one and insert category values
insert_null_category()
for c in categories:
    if categories[c]['is_root']:
        insert_category(c, categories[c])
    else:
        insert_subcategory(c, categories[c])

# Insert the brands, products, and the relationships those products have with the other tables
for b in brands:
    insert_brand_product_relations(b, brands[b])


class SetEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, set):
            return list(obj)
        return json.JSONEncoder.default(self, obj)
