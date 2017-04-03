# pylint: disable=missing-docstring
from .app import db


class Brand(db.Model):
    """
    Brand is the outermost model of the project structure. A Brand leads you to the
    Products for said brand. A Brand is the company that owns and sells the products.
    Brand has a one-to-many relationship with the Product model.

    Attributes:
        id          Integer     numerical identifier for this model
        name        String      name of the Brand
        avg_price   Float       average price of all products in the Brand
        avg_rating  Float       average rating of all products in the Brand
        image_url   String      url of the image for the Brand
        products    List        list of all Products in the Brand
    """

    __tablename__ = 'brand'

    id = db.Column('id', db.Integer, primary_key=True,autoincrement=True)
    name = db.Column('name', db.Unicode(255), nullable=False)
    avg_price = db.Column('avg_price', db.Integer, default=0)
    avg_rating = db.Column('avg_rating', db.Integer, default=0)
    num_products = db.Column('num_products', db.Integer, default=0)
    image_url = db.Column('image_url', db.Unicode(255))
    
    # One-to-Many relationships
    products = db.relationship('Product', backref='brand', lazy='dynamic')

    def __init__(self, name, avg_price, avg_rating, num_products, image_url):
        assert isinstance(name, str)
        assert isinstance(avg_price, float) or avg_price is None
        assert isinstance(avg_rating, float) or avg_rating is None
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
    """
    Product is the center of the cluster of models, all others are things describing a Product.
    Each Product is one item being sold by a Brand. Product has a one-to-many relationship with 
    the Brand model, a many-to-many relationship with the Tag model, a ternary relationship with 
    the category and subcategory model, and an optional many-many relationship with the Color model.


    Attributes:
        id          Integer     numerical identifier for this model
        brand_id    Integer     numerical identifier for the Brand for this Product
        brand       String      the Brand object the Product belongs to       
        name        String      name of the Product
        price       Float       price of the Product
        rating      Float       rating of the Product
        image_url   String      url of the image for the Product
        colors      List        list of all Colors belonging to this Product
        tags        List        list of all Tags belonging to this Product
    """

    __tablename__ = 'product'

    id = db.Column('id', db.Integer, primary_key=True,autoincrement=True)
    brand_id = db.Column('brand_id', db.Integer, db.ForeignKey(
        'brand.id'), nullable=False)
    #brand = db.relationship('Brand', back_populates="products")
    name = db.Column('name', db.Unicode(255), nullable=False)
    description = db.Column('description', db.Unicode(4000))
    price = db.Column('price', db.Integer)
    rating = db.Column('rating', db.Integer)
    image_url = db.Column('image_url', db.Unicode(255))
   
    # Many-to-Many relationships
    colors = db.relationship('Color',
                             secondary='product_color', backref='product')
    tags = db.relationship('Tag',
                           secondary='product_tag', backref='product')

    def __init__(self, brand_id, name, description, price, rating, image_url):
        assert isinstance(brand_id, int)
        assert isinstance(name, str)
        assert isinstance(description, str) or description is None
        assert isinstance(price, float) or price is None
        assert isinstance(rating, float) or rating is None
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
    """
    The Color model is a colection of all Colors appearing throughout all of the 
    Products in the database. Not all Products have a Color and some have more 
    than one Color. Color has an optional many-many relationship with the Product model.


    Attributes:
        id              Integer     numerical identifier for this model
        name            String      name of the Color
        hashcode        String      the hash value for the Color
        num_products    Integer     number of products with this Color
    """
    
    __tablename__ = 'color'

    id = db.Column('id', db.Integer, primary_key=True,autoincrement=True)
    name = db.Column('name', db.Unicode(255), nullable=False)
    hashcode = db.Column('hashcode', db.Unicode(25), nullable=False)
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


class Category(db.Model):
    """
    The Category Model describes the type of the Product in collaboration with
    the SubCategory Model. A Category is something like "Blush", "Mascara", "Eye Liner".
    Category has a ternary relationship with Product and SubCategory represented in
    the ProductCategory Model.


    Attributes:
        id              Integer     numerical identifier for this model
        name            String      name of the Category
        avg_price       Float       the average price for Products with this Category
        avg_rating      Float       the average rating fro Products with this Category
        num_products    Integer     number of products with this Category
    """

    __tablename__ = 'category'

    id = db.Column('id', db.Integer, primary_key=True,autoincrement=True)
    name = db.Column('name', db.Unicode(255), nullable=False)
    avg_price = db.Column('avg_price', db.Integer)
    avg_rating = db.Column('avg_rating', db.Integer)
    num_products = db.Column('num_products', db.Integer, default=0)

    def __init__(self, name, avg_price, avg_rating, num_products):
        assert isinstance(name, str)
        assert isinstance(avg_price, float) or avg_price is None
        assert isinstance(avg_rating, float) or avg_rating is None
        assert isinstance(num_products, int) or num_products is None

        self.name = name
        self.avg_price = avg_price
        self.avg_rating = avg_rating
        self.num_products = num_products

    def __repr__(self):
        return '<type %r>' % self.name


class SubCategory(db.Model):
    """
    The SubCategory Model describes the type of the Product in collaboration with
    the Category Model. A SubCategory is something like "Pencil", "Cream", "Liquid" that
    describes the Category of the Product. However, this Model is optional for some 
    Categories due to them not having SubCateogories. SubCategory has a ternary
    relationship with Product and Category represented in the ProductCategory Model.


    Attributes:
        id              Integer     numerical identifier for this model
        name            String      name of the SubCategory
        avg_price       Float       the average price for Products with this SubCategory
        avg_rating      Float       the average rating fro Products with this SubCategory
        num_products    Integer     number of products with this SubCategory
    """

    __tablename__ = 'sub_category'

    id = db.Column('id', db.Integer, primary_key=True,autoincrement=True)
    name = db.Column('name', db.Unicode(255), nullable=False)
    avg_price = db.Column('avg_price', db.Integer)
    avg_rating = db.Column('avg_rating', db.Integer)
    num_products = db.Column('num_products', db.Integer, default=0)

    def __init__(self, name, avg_price, avg_rating, num_products):
        assert isinstance(name, str)
        assert isinstance(avg_price, float) or avg_price is None
        assert isinstance(avg_rating, float) or avg_rating is None
        assert isinstance(num_products, int) or num_products is None

        self.name = name
        self.avg_price = avg_price
        self.avg_rating = avg_rating
        self.num_products = num_products

    def __repr__(self):
        return '<Sub_Category %r>' % self.name


class Tag(db.Model):
    """
    The Tag model descibes attributes of the Product. A Tag is something like 
    "Vegan", "Sugar-Free", "Organic". The Tag model has a many-many relationship
    with the Product model.


    Attributes:
        id              Integer     numerical identifier for this model
        name            String      name of the Tag
        avg_price       Float       the average price for Products with this Tag
        avg_rating      Float       the average rating fro Products with this Tag
        num_products    Integer     number of products with this Tag
    """

    __tablename__ = 'tag'

    id = db.Column('id', db.Integer, primary_key=True,autoincrement=True)
    name = db.Column('name', db.Unicode(255), nullable=False)
    avg_price = db.Column('avg_price', db.Integer)
    avg_rating = db.Column('avg_rating', db.Integer)
    num_products = db.Column('num_products', db.Integer, default=0)

    def __init__(self, name, avg_price, avg_rating, num_products):
        assert isinstance(name, str)
        assert isinstance(avg_price, float) or avg_price is None
        assert isinstance(avg_rating, float) or avg_rating is None
        assert isinstance(num_products, int) or num_products is None

        self.name = name
        self.avg_price = avg_price
        self.avg_rating = avg_rating
        self.num_products = num_products

    def __repr__(self):
        return '<Tag %r>' % self.name


product_color = db.Table('product_color',
                         db.Column('product_id', db.Integer,
                                   db.ForeignKey('product.id')),
                         db.Column('color_id', db.Integer, db.ForeignKey('color.id')),
                         db.PrimaryKeyConstraint('product_id', 'color_id'))

product_tag = db.Table('product_tag',
                       db.Column('product_id', db.Integer,
                                 db.ForeignKey('product.id')),
                       db.Column('tag_id', db.Integer, db.ForeignKey('tag.id')),
                       db.PrimaryKeyConstraint('product_id', 'tag_id'))


class ProductCategory(db.Model):
    """
    The ProductCategory model is the manifestation of the ternary relationship
    between Product, Category, and SubCategory. A Category can have many to no 
    SubCategories so a ternary relationship is necesary to show the unique 
    combination for a certain Product.

    Attributes:
        product_id          Integer     numerical identifier for the Product
        category_id         Integer     numerical identifier for the Category of the
                                        Product
        sub_category_id     Integer     numerical identifier for the SubCategory of 
                                        the Product
    """


    __tablename__ = 'product_category'

    product_id = db.Column('product_id', db.Integer, db.ForeignKey(
        'product.id'), primary_key=True)
    category_id = db.Column('category_id', db.Integer, db.ForeignKey(
        'category.id'), primary_key=True)
    sub_category_id = db.Column('sub_category_id', db.Integer, db.ForeignKey(
        'sub_category.id'), primary_key=True, nullable=True)

    def __init__(self, product_id, category_id, sub_category_id):
        assert isinstance(product_id, int)
        assert isinstance(category_id, int)
        assert isinstance(sub_category_id, int) or sub_category_id is None

        self.product_id = product_id
        self.category_id = category_id
        self.sub_category_id = sub_category_id
