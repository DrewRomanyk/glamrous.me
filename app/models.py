from .app import db


class Brand(db.Model):
    __tablename__ = 'brand'

    brand_id = db.Column('brand_id', db.Integer, primary_key=True)
    name = db.Column('name', db.Unicode(255), nullable=False)
    avg_price = db.Column('avg_price', db.Integer)
    avg_rating = db.Column('avg_rating', db.Integer)
    num_products = db.Column('num_products', db.Integer, default=0)
    image_url = db.Column('image_url', db.Unicode(255))

    def __init__(self, name, avg_price, avg_rating, num_products, image_url):
        assert isinstance(name, str)
        assert isinstance(avg_price, int) or avg_price is None
        assert isinstance(avg_rating, int) or avg_rating is None
        assert isinstance(num_products, int) or num_products is None
        assert isinstance(image_url, str) or image_url is None

        self.name = name
        self.avg_price = avg_price
        self.avg_rating = avg_rating
        self.num_products = num_products
        self.image_url = image_url

    def __repr__(self):
        return '<Brand %r>' % self.name


class Product(db.Model):
    __tablename__ = 'product'

    product_id = db.Column('product_id', db.Integer, primary_key=True)
    brand_id = db.Column('brand_id', db.Integer, db.ForeignKey('brand.brand_id'), nullable=False)
    name = db.Column('name', db.Unicode(255), nullable=False)
    description = db.Column('description', db.UnicodeText(4000))
    price = db.Column('price', db.Integer)
    rating = db.Column('rating', db.Integer)
    image_url = db.Column('image_url', db.Unicode(255))

    def __init__(self, brand_id, name, description, price, rating, image_url):
        assert isinstance(brand_id, int)
        assert isinstance(name, str)
        assert isinstance(description, str) or description is None
        assert isinstance(price, int) or price is None
        assert isinstance(rating, int) or rating is None
        assert isinstance(image_url, str) or image_url is None

        self.name = name
        self.description = description
        self.brand_id = brand_id
        self.price = price
        self.rating = rating
        self.image_url = image_url

    def __repr__(self):
        return '<Product %r>' % self.name


class Color(db.Model):
    __tablename__ = 'color'

    color_id = db.Column('color_id', db.Integer, primary_key=True)
    name = db.Column('name', db.Unicode(255), nullable=False)
    hashcode = db.Column('hashcode', db.Unicode('25'), nullable=False)
    num_products = db.Column('num_products', db.Integer, default=0)

    def __init__(self, name, hashcode, num_products):
        assert isinstance(name, str)
        assert isinstance(hashcode, str)
        assert isinstance(num_products, int) or num_products is None

        self.name = name
        self.hashcode = hashcode
        self.num_products = num_products

    def __repr__(self):
        return '<Color %r>' % self.name


class Classification(db.Model):
    __tablename__ = 'type'

    classification_id = db.Column('classification_id', db.Integer, primary_key=True)
    name = db.Column('name', db.Unicode(255), nullable=False)
    avg_price = db.Column('avg_price', db.Integer)
    avg_rating = db.Column('avg_rating', db.Integer)
    num_products = db.Column('num_products', db.Integer, default=0)

    def __init__(self, name, avg_price, avg_rating, num_products):
        assert isinstance(name, str)
        assert isinstance(avg_price, int) or avg_price is None
        assert isinstance(avg_rating, int) or avg_rating is None
        assert isinstance(num_products, int) or num_products is None

        self.name = name
        self.avg_price = avg_price
        self.avg_rating = avg_rating
        self.num_products = num_products

    def __repr__(self):
        return '<type %r>' % self.name


class Category(db.Model):
    __tablename__ = 'category'

    category_id = db.Column('category_id', db.Integer, primary_key=True)
    name = db.Column('name', db.Unicode(255), nullable=False)
    avg_price = db.Column('avg_price', db.Integer)
    avg_rating = db.Column('avg_rating', db.Integer)
    num_products = db.Column('num_products', db.Integer, default=0)

    def __init__(self, name, avg_price, avg_rating, num_products):
        assert isinstance(name, str)
        assert isinstance(avg_price, int) or avg_price is None
        assert isinstance(avg_rating, int) or avg_rating is None
        assert isinstance(num_products, int) or num_products is None

        self.name = name
        self.avg_price = avg_price
        self.avg_rating = avg_rating
        self.num_products = num_products

    def __repr__(self):
        return '<Category %r>' % self.name


class Tag(db.Model):
    __tablename__ = 'tag'

    tag_id = db.Column('tag_id', db.Integer, primary_key=True)
    name = db.Column('name', db.Unicode(255), nullable=False)
    avg_price = db.Column('avg_price', db.Integer)
    avg_rating = db.Column('avg_rating', db.Integer)
    num_products = db.Column('num_products', db.Integer, default=0)

    def __init__(self, name, avg_price, avg_rating, num_products):
        assert isinstance(name, str)
        assert isinstance(avg_price, int) or avg_price is None
        assert isinstance(avg_rating, int) or avg_rating is None
        assert isinstance(num_products, int) or num_products is None

        self.name = name
        self.avg_price = avg_price
        self.avg_rating = avg_rating
        self.num_products = num_products

    def __repr__(self):
        return '<Tag %r>' % self.name


class ProductColor(db.Model):
    __tablename__ = 'product_color'

    product_id = db.Column('product_id', db.Integer, db.ForeignKey('product.product_id'), primary_key=True)
    color_id = db.Column('color_id', db.Integer, db.ForeignKey('color.color_id'), primary_key=True)

    def __init__(self, product_id, color_id):
        assert isinstance(product_id, int)
        assert isinstance(color_id, int)

        self.product_id = product_id
        self.color_id = color_id


class ProductTag(db.Model):
    __tablename__ = 'product_tag'

    product_id = db.Column('product_id', db.Integer, db.ForeignKey('product.product_id'), primary_key=True)
    tag_id = db.Column('tag_id', db.Integer, db.ForeignKey('tag.tag_id'), primary_key=True)

    def __init__(self, product_id, tag_id):
        assert isinstance(product_id, int)
        assert isinstance(tag_id, int)

        self.product_id = product_id
        self.color_id = tag_id


class ProductClassificationCategory(db.Model):
    __tablename__ = 'product_classification_category'

    product_id = db.Column('product_id', db.Integer, db.ForeignKey('product.product_id'), primary_key=True)
    classification_id = db.Column('classification_id', db.Integer, db.ForeignKey('classification.classification_id'),
                                  primary_key=True)
    category_id = db.Column('category_id', db.Integer, db.ForeignKey('category.category_id'), primary_key=True,
                            nullable=True)

    def __init__(self, product_id, classification_id, category_id):
        assert isinstance(product_id, int)
        assert isinstance(category_id, int)
        assert isinstance(classification_id, int) or classification_id is None

        self.product_id = product_id
        self.classification_id = classification_id
        self.category_id = category_id
