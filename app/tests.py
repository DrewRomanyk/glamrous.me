from .. import data_to_database
from unittest import main, TestCase
from models import Brand, Product, Color, Category, SubCategory, ProductCategory
from .app import db
from .app import app


class UnitTests(TestCase):

    def test_model_brand_1(self):
        with app.test_request_context():
            brand = Brand('Pure Anada', 1.01, 4.02, 2,
                          'http://entertainment.inquirer.net/files/2016/07/13717225_1265259390150735_8093269019210020606_o.jpg')
            db.session.add(brand)
            db.session.commit()

            query = db.session.query(Brand).filter_by(
                name='Pure Anada').first()
            self.assertEqual(query.avg_price, 1.01)
            self.assertEqual(query.avg_rating, 4.02)
            self.assertEqual(query.num_products, 2)
            self.assertEqual(
                query.image_url, 'http://entertainment.inquirer.net/files/2016/07/13717225_1265259390150735_8093269019210020606_o.jpg')

            db.session.delete(brand)
            db.session.commit()

    def test_model_brand_2(self):
        with app.test_request_context():
            brand = Brand('Pure Anada', None, None, None, None)
            db.session.add(brand)
            db.session.commit()

            query = db.session.query(Brand).filter_by(
                name='Pure Anada').first()
            self.assertEqual(query.avg_price, None)
            self.assertEqual(query.avg_rating, None)
            self.assertEqual(query.num_products, 0)
            self.assertEqual(query.image_url, None)

            db.session.delete(brand)
            db.session.commit()

    def test_model_brand_3(self):
        with app.test_request_context():
            brand = Brand('Pure Anada', None, None, None, None)
            self.assertEqual(brand, 'Pure Anada')

    def test_model_product_brand_1(self):
        with app.test_request_context():
            brand = Brand('Pure Anada', 1.01, 4.02, 2,
                          'http://entertainment.inquirer.net/files/2016/07/13717225_1265259390150735_8093269019210020606_o.jpg')
            product = Product(1, 'Makeup', 'This is makeup', 1.99, 4.99,
                              'http://entertainment.inquirer.net/files/2016/07/13717225_1265259390150735_8093269019210020606_o.jpg')
            brand.products.append(product)

            self.assertEqual(brand.products.count(), 1)
            self.assertEqual(brand.products.filter_by(
                name='makeup').count(), 1)

    def test_model_product_brand_2(self):
        with app.test_request_context():
            brand = Brand('Pure Anada', 1.01, 4.02, 2,
                          'http://entertainment.inquirer.net/files/2016/07/13717225_1265259390150735_8093269019210020606_o.jpg')
            product = Product(1, 'Makeup', 'This is makeup', 1.99, 4.99,
                              'http://entertainment.inquirer.net/files/2016/07/13717225_1265259390150735_8093269019210020606_o.jpg')
            product.brand = brand
            db.session.add(brand)
            db.session.add(product)
            db.commit()

            self.assertEqual(db.session.query(Product).filter_by(
                name='Makeup').first().Brand.name, 'Pure Anada')

            db.session.delete(product)
            db.session.delete(brand)
            db.session.commit()

    def test_model_category_1(self):
        with app.test_request_context():
            category = Category('blush', 12.99, 2.13, 2)
            db.session.add(category)
            db.session.commit()

            query = db.session.query(Color).filter_by(name='blush').first()
            self.assertEqual(query.avg_price, 12.99)

            db.session.delete(category)
            db.session.commit()

    def test_model_category_2(self):
        with app.test_request_context():
            category = Category('blush', 12.99, 2.13, 2)
            self.assertEqual(category, 'blush')

    def test_model_category_3(self):
        with app.test_request_context():
            category = Category('blush', 12.99, 2.13, None)
            db.session.add(category)
            db.session.commit()
           
            query = db.session.query(Category).filter_by(name='blush').first
            self.assertEqual(query.num_products, 0)
           
            db.session.delete(category)
            db.session.commit()

    def test_model_sub_category_1(self):
        with app.test_request_context():
            category = SubCategory('pencil', 12.99, 2.13, 2)
            db.session.add(category)
            db.session.commit()

            query = db.session.query(Color).filter_by(name='pencil').first()
            self.assertEqual(query.avg_price, 12.99)

            db.session.delete(category)
            db.session.commit()

    def test_model_sub_category_2(self):
        with app.test_request_context():
            category = Category('pencil', 12.99, 2.13, 2)
            self.assertEqual(category, 'pencil')

    def test_model_sub_category_3(self):
        with app.test_request_context():
            category = SubCategory('pencil', 12.99, 2.13, None)
            db.session.add(category)
            db.session.commit()
           
            query = db.session.query(Category).filter_by(name='pencil').first()
            self.assertEqual(query.num_products, 0)
           
            db.session.delete(category)
            db.session.commit()

    def test_model_color_1(self):
        with app.test_request_context():
            color = Color('White', "#FFFFFF", 1)
            db.session.add(color)
            db.session.commit()
            
            query = db.session.query(Color).filter_by(name='White').first()
            self.assertEqual(query.hashcode, '#FFFFFF')
            self.assertEqual(query.num_products, 1)
            
            db.session.delete(color)
            db.session.commit()

    def test_model_color_2(self):
        with app.test_request_context():
            color = Color('White', "#FFFFFF", None)
            db.session.add(color)
            db.session.commit()
            
            query = db.session.query(Color).filter_by(name='White').first()
            self.assertEqual(query.hashcode, '#FFFFFF')
            self.assertEqual(query.num_products, 0)
            
            db.session.delete(color)
            db.session.commit()

    def test_model_tag_1(self):
        with app.test_request_context():
            tag = Tag('Canadian', 9.99, 1.25, 27)
            db.session.add(tag)
            db.session.commit()
            
            query = db.session.query(Tag).filter_by(name='Canadian').count()
            self.assertEqual(query, 1)

            db.session.delete(tag)
            db.session.commit()

    def test_model_tag_2(self):
        with app.test_request_context():
            tag = Tag('Canadian', 9.99, 1.25, 27)
            db.session.add(tag)
            db.session.commit()
            query = db.session.query(Tag).filter_by(name='Canadian').first()

            self.assertEqual(query.num_products, 0)
            self.assertEqual(query.avg_rating, 1.25)

            db.session.delete(tag)
            db.session.commit()


if __name__ == "__main__":
    with app.test_request_context():
        main()
