# pylint: disable=missing-docstring
# pylint: disable=no-member
# pylint: disable=trailing-whitespace
# pylint: disable=line-too-long

import unittest
from . import app, db
from .models import Brand, Category, SubCategory, Product, Color, Tag


class UnitTests(unittest.TestCase):
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
                query.image_url,
                'http://entertainment.inquirer.net/files/2016/07/13717225_1265259390150735_8093269019210020606_o.jpg')

            db.session.delete(brand)
            db.session.commit()

    def test_model_brand_2(self):
        with app.test_request_context():
            brand = Brand('Pure Anada', None, None, None, None)
            db.session.add(brand)
            db.session.commit()

            query = db.session.query(Brand).filter_by(
                name='Pure Anada').first()
            self.assertEqual(query.avg_price, 0.0)
            self.assertEqual(query.avg_rating, 0.0)
            self.assertEqual(query.num_products, 0)
            self.assertEqual(query.image_url, None)

            db.session.delete(brand)
            db.session.commit()

    # def test_model_brand_3(self):
    #     with app.test_request_context():
    #         brand = Brand('Pure Anada', None, None, None, None)
    #         self.assertEqual(brand, <Brand 'Pure Anada'>)

    def test_model_product_brand_1(self):
        with app.test_request_context():
            brand = Brand('Pure hatred', 1.01, 4.02, 2,
                          'http://entertainment.inquirer.net/files/2016/07/13717225_1265259390150735_8093269019210020606_o.jpg')
            product = Product(1, 'Makeup', 'This is makeup', 1.99, 4.99,
                              'http://entertainment.inquirer.net/files/2016/07/13717225_1265259390150735_8093269019210020606_o.jpg')
            brand.products.append(product)

            db.session.add(brand)
            db.session.add(product)
            db.session.commit()

            self.assertEqual(db.session.query(Brand).filter_by(name='Pure hatred').join(Product).count(), 1)

            db.session.delete(product)
            db.session.delete(brand)
            db.session.commit()

    def test_model_product_brand_2(self):
        with app.test_request_context():
            brand = Brand('Pure hatred', 1.01, 4.02, 2,
                          'http://entertainment.inquirer.net/files/2016/07/13717225_1265259390150735_8093269019210020606_o.jpg')
            product = Product(1, 'Makeup', 'This is makeup', 1.99, 4.99,
                              'http://entertainment.inquirer.net/files/2016/07/13717225_1265259390150735_8093269019210020606_o.jpg')
            product.brand = brand
            db.session.add(brand)
            db.session.add(product)
            db.session.commit()
            
            self.assertEqual(db.session.query(Brand).join(Product).filter_by(
                name='Makeup').first().name, 'Pure hatred')

            db.session.delete(product)
            db.session.delete(brand)
            db.session.commit()

    def test_model_category_1(self):
        with app.test_request_context():
            category = Category('acorn', 12.99, 2.13, 2)
            db.session.add(category)
            db.session.commit()

            query = db.session.query(Category).filter_by(name='acorn').first()
            self.assertEqual(query.avg_price, 12.99)

            db.session.delete(category)
            db.session.commit()

    # def test_model_category_2(self):
    #     with app.test_request_context():
    #         category = Category('blush', 12.99, 2.13, 2)
    #         self.assertEqual(category, <type 'blush'>)

    def test_model_category_3(self):
        with app.test_request_context():
            category = Category('paint', 12.99, 2.13, None)
            db.session.add(category)
            db.session.commit()

            query = db.session.query(Category).filter_by(name='paint').first()
            self.assertEqual(query.num_products, 0)

            db.session.delete(category)
            db.session.commit()

    def test_model_sub_category_1(self):
        with app.test_request_context():
            category = SubCategory('pen', 12.99, 2.13, 2)
            db.session.add(category)
            db.session.commit()

            query = db.session.query(SubCategory).filter_by(name='pen').first()
            self.assertEqual(query.avg_price, 12.99)

            db.session.delete(category)
            db.session.commit()

    # def test_model_sub_category_2(self):
    #     with app.test_request_context():
    #         category = Category('pencil', 12.99, 2.13, 2)
    #         self.assertEqual(category, "<type 'pencil'>")

    def test_model_sub_category_3(self):
        with app.test_request_context():
            category = SubCategory('pen', 12.99, 2.13, None)
            db.session.add(category)
            db.session.commit()

            query = db.session.query(SubCategory).filter_by(name='pen').first()
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
            tag = Tag('Cheese', 9.99, 1.25, 27)
            db.session.add(tag)
            db.session.commit()

            query = db.session.query(Tag).filter_by(name='Cheese').count()
            self.assertEqual(query, 1)

            db.session.delete(tag)
            db.session.commit()

    def test_model_tag_2(self):
        with app.test_request_context():
            tag = Tag('Bacon', 9.99, 1.25, 27)
            db.session.add(tag)
            db.session.commit()
            query = db.session.query(Tag).filter_by(name='Bacon').first()

            self.assertEqual(query.num_products, 27)
            self.assertEqual(query.avg_rating, 1.25)

            db.session.delete(tag)
            db.session.commit()


def suite():
    suite = unittest.TestSuite()
    suite.addTest(unittest.makeSuite(UnitTests, 'test'))
    return suite


if __name__ == '__main__':
    with app.test_request_context():
        unittest.main()
