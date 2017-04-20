# pylint: disable=line-too-long
# pylint: disable=no-member
# pylint: disable=missing-docstring

import json
import urllib.parse
from urllib.request import Request, urlopen
from pathlib import Path

from app.models import Brand, Product, Color, Category, SubCategory, ProductCategory, Tag, db

with open('config.json') as file:
    BING_API_KEY = json.load(file)['BING_IMAGE_API_KEY']

# === API JSON
# url = "http://makeup-api.herokuapp.com/api/v1/products.json"
# response = urllib.request.urlopen(url)
# api_products = json.load(response)
# === MODIFIED JSON
with open('data/makeup_products.json') as file:
    API_PRODUCTS = json.load(file)

BRANDS = {}
PRODUCTS = {}
CATEGORIES = {}
TAGS = {}
COLORS = {}


def reset_db():
    db.drop_all()
    db.create_all()


def get_brand_images():
    brand_images = {}
    brand_images_json_fn = 'data/brand_images.json'
    brand_images_json_file = Path(brand_images_json_fn)
    if not brand_images_json_file.is_file():
        # Create json
        for b_name in BRANDS:
            image_url = get_brand_image_from_bing(b_name)
            brand_images[b_name] = image_url
        # Store
        with open(brand_images_json_fn, 'w') as brand_image_file:
            json.dump(brand_images, brand_image_file)
    else:
        # Load json
        with open(brand_images_json_fn) as brand_image_file:
            brand_images = json.load(brand_image_file)
    return brand_images


def get_brand_image_from_bing(b_name):
    search_query_param = urllib.parse.urlencode({'q': b_name})
    image_url_req = Request(
        "https://api.cognitive.microsoft.com/bing/v5.0/images/search?" + search_query_param +
        "&mkt=en-us&imageType=line&safeSearch=Strict")
    image_url_req.add_header('Ocp-Apim-Subscription-Key', BING_API_KEY)
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


def create_or_update_brand(name, product):
    if name not in BRANDS:
        # Create
        BRANDS[name] = {
            'id': len(BRANDS),
            'name': name,
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
        BRANDS[name]['avg_price'] = update_average(
            BRANDS[name]['avg_price'],
            len(BRANDS[name]['products']),
            product['price']
        )
        BRANDS[name]['avg_rating'] = update_average(
            BRANDS[name]['avg_rating'],
            len(BRANDS[name]['products']),
            product['rating']
        )
        BRANDS[name]['products'] |= {product['id']}


def create_or_update_category(name, is_root, product):
    if name not in CATEGORIES:
        # Create
        CATEGORIES[name] = {
            'id': len(CATEGORIES),
            'name': name,
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
        CATEGORIES[name]['avg_price'] = update_average(
            CATEGORIES[name]['avg_price'],
            len(CATEGORIES[name]['products']),
            product['price']
        )
        CATEGORIES[name]['avg_rating'] = update_average(
            CATEGORIES[name]['avg_rating'],
            len(CATEGORIES[name]['products']),
            product['rating']
        )
        CATEGORIES[name]['products'] |= {product['id']}


def create_or_update_tag(name, product):
    if name not in TAGS:
        # Create
        TAGS[name] = {
            'id': len(TAGS),
            'name': name,
            'avg_price': product['price'],
            'avg_rating': product['rating'],
            'products': {
                product['id'],
            },
            'brands': set()
        }
    else:
        # Update
        TAGS[name]['avg_price'] = update_average(
            TAGS[name]['avg_price'],
            len(TAGS[name]['products']),
            product['price']
        )
        TAGS[name]['avg_rating'] = update_average(
            TAGS[name]['avg_rating'],
            len(TAGS[name]['products']),
            product['rating']
        )
        TAGS[name]['products'] |= {product['id']}


def create_colors():
    for prod in PRODUCTS:
        for cat in PRODUCTS[prod]['colors']:
            cur_color = cat['colour_name']
            if cur_color not in COLORS:
                COLORS[cur_color] = {}
                COLORS[cur_color]['hex'] = cat['hex_value']
                COLORS[cur_color]['count'] = 1
            else:
                COLORS[cur_color]['count'] += 1


def get_tag_name(tid):
    for tag in TAGS:
        if TAGS[tag]['id'] == tid:
            return tag


def get_category_id(cid):
    for cat in CATEGORIES:
        if CATEGORIES[cat]['id'] == cid:
            cid = Category.query.filter_by(
                name=CATEGORIES[cat]['name']).first().id
            return cid


def get_sub_category_id(sid):
    if sid:
        for sub_cat in CATEGORIES:
            if CATEGORIES[sub_cat]['id'] == sid:
                sid = SubCategory.query.filter_by(
                    name=CATEGORIES[sub_cat]['name']).first().id
                return sid
    else:
        sid = SubCategory.query.filter_by(name='').first().id
        return sid


def insert_brand_product_relations(bname, brand):
    brand = Brand(bname, float(format(brand['avg_price'], '.2f')), float(format(brand['avg_rating'], '.2f')),
                  len(brand['products']), brand['image_url'])
    db.session.add(brand)
    db.session.flush()
    for prod in brand['products']:
        cur_product = PRODUCTS[prod]
        product = Product(brand.id, cur_product['name'], cur_product['description'],
                          float(format(cur_product['price'], '.2f')), float(format(cur_product['rating'], '.2f')),
                          cur_product['image_url'])
        db.session.add(product)
        db.session.flush()

        # Add product_tag relation
        for tag in cur_product['tags']:
            product.tags.append(Tag.query.filter_by(
                name=get_tag_name(tag)).first())

        # Add product_color relation
        for color in cur_product['colors']:
            product.colors.append(Color.query.filter_by(
                name=color['colour_name']).first())

        # Add product_category relation
        cid = cur_product['category']
        sid = None
        if 'sub_category' in cur_product:
            sid = cur_product['sub_category']

        product_category = ProductCategory(
            product.id, get_category_id(cid), get_sub_category_id(sid))
        db.session.add(product_category)

        brand.products.append(product)
    db.session.commit()


def insert_null_category():
    sub_category = SubCategory('', None, None, None)
    db.session.add(sub_category)
    db.session.commit()


def insert_category(cname, cat):
    category = Category(cname, float(format(cat['avg_price'], '.2f')), float(format(cat['avg_rating'], '.2f')),
                        len(cat['products']))
    db.session.add(category)
    db.session.commit()


def insert_color(cname, color):
    color = Color(cname, color['hex'], color['count'])
    db.session.add(color)
    db.session.commit()


def insert_tag(tname, tag):
    tag = Tag(tname, float(format(tag['avg_price'], '.2f')), float(
        format(tag['avg_rating'], '.2f')), len(tag['products']))
    db.session.add(tag)
    db.session.commit()


def insert_subcategory(sname, sub_cat):
    sub_category = SubCategory(sname, float(format(sub_cat['avg_price'], '.2f')), float(format(sub_cat['avg_rating'], '.2f')),
                               len(sub_cat['products']))
    db.session.add(sub_category)
    db.session.commit()


for api_prod in API_PRODUCTS:
    product_id = api_prod['id']
    # Create Product
    PRODUCTS[product_id] = create_product(api_prod)

    # Create/Update Brand
    brand_name = api_prod['brand']
    create_or_update_brand(brand_name, PRODUCTS[product_id])
    PRODUCTS[product_id]['brand'] = BRANDS[brand_name]['id']

    # Create/Update Category
    category_name = api_prod['product_type']
    create_or_update_category(category_name, True, PRODUCTS[product_id])
    PRODUCTS[product_id]['category'] = CATEGORIES[category_name]['id']

    # Create/Update Sub-Category
    sub_category_name = api_prod['category']
    if sub_category_name is not None:
        create_or_update_category(
            sub_category_name, False, PRODUCTS[product_id])
        PRODUCTS[product_id]['sub_category'] = CATEGORIES[sub_category_name]['id']
        CATEGORIES[category_name]['sub_categories'] |= {
            CATEGORIES[sub_category_name]['id']}

    # Create/Update Tags
    tag_name_list = api_prod['tag_list']
    for tag_name in tag_name_list:
        create_or_update_tag(tag_name, PRODUCTS[product_id])
        PRODUCTS[product_id]['tags'] |= {TAGS[tag_name]['id']}
        TAGS[tag_name]['brands'] |= {BRANDS[brand_name]['id']}

    # Relations
    BRANDS[brand_name]['categories'] |= {CATEGORIES[category_name]['id']}
    if sub_category_name is not None:
        BRANDS[brand_name]['categories'] |= {
            CATEGORIES[sub_category_name]['id']}

    CATEGORIES[category_name]['brands'] |= {BRANDS[brand_name]['id']}

# Brand Images
BRAND_IMAGES = get_brand_images()
for brand_name in BRANDS:
    BRANDS[brand_name]['image_url'] = BRAND_IMAGES[brand_name]

# Drop all tables in db and recreate them from the models.py
reset_db()

# Insert all tags values
for t in TAGS:
    insert_tag(t, TAGS[t])

# Insert all color values
create_colors()
for c in COLORS:
    insert_color(c, COLORS[c])

# Insert a null sub category for categories without one and insert
# category values
insert_null_category()
for c in CATEGORIES:
    if CATEGORIES[c]['is_root']:
        insert_category(c, CATEGORIES[c])
    else:
        insert_subcategory(c, CATEGORIES[c])

# Insert the brands, products, and the relationships those products have
# with the other tables
for b in BRANDS:
    insert_brand_product_relations(b, BRANDS[b])
