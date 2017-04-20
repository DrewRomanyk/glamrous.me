# pylint: disable=missing-docstring
# pylint: disable=no-member
# pylint: disable=trailing-whitespace
# pylint: disable=line-too-long

import unittest
import requests
import json
from . import app, db
from app.api.brands.views import get_brands, get_brand
from app.api.products.views import get_products, get_product
from app.api.tags.views import get_tags, get_tag
from app.api.categories.views import get_categories, get_category
from app.api.sub_categories.views import get_sub_category
from app.api.search.views import get_search_results

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

            self.assertEqual(db.session.query(Brand).filter_by(
                name='Pure hatred').join(Product).count(), 1)

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

    def test_model_category_2(self):
        with app.test_request_context():
            category = Category('spray', 3.0, 4.5, 3)
            db.session.add(category)
            db.session.commit()

            query = db.session.query(Category).filter_by(name='spray').first()
            self.assertEqual(query.avg_rating, 4.5)

            db.session.delete(category)
            db.session.commit()

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

    def test_model_sub_category_2(self):
        with app.test_request_context():
            category = SubCategory('pen', 12.99, 2.13, 2)
            db.session.add(category)
            db.session.commit()

            query = db.session.query(SubCategory).filter_by(name='pen').first()
            self.assertEqual(query.avg_rating, 2.13)

            db.session.delete(category)
            db.session.commit()

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
            tag = Tag('Bacon', 9.99, 1.25, 27)
            db.session.add(tag)
            db.session.commit()
            query = db.session.query(Tag).filter_by(name='Bacon').first()

            self.assertEqual(query.num_products, 27)
            self.assertEqual(query.avg_rating, 1.25)

            db.session.delete(tag)
            db.session.commit()

    def test_endpoint_brand_1(self):
        with app.test_request_context():
            res = get_brands()
            brands = json.loads(res.data.decode())
            self.assertEqual(len(brands), 41)

    def test_endpoint_specific_brand_1(self):
        with app.test_request_context():
            res = get_brand(1)
            brand = json.loads(res.data.decode())
            self.assertEqual(brand['id'], 1)
            self.assertGreaterEqual(len(brand['name']), 1)
            self.assertGreaterEqual(brand['num_products'], 1)

    def test_endpoint_specific_brand_2(self):
        with app.test_request_context():
            res = get_brand(2)
            brand = json.loads(res.data.decode())
            self.assertEqual(brand['id'], 2)
            self.assertGreaterEqual(len(brand['name']), 1)
            self.assertGreaterEqual(brand['num_products'], 1)

    def test_endpoint_tag_1(self):
        with app.test_request_context():
            res = get_tags()
            tags = json.loads(res.data.decode())
            self.assertEqual(len(tags), 10)

    def test_endpoint_specific_tag_1(self):
        with app.test_request_context():
            res = get_tag(2)
            tag = json.loads(res.data.decode())
            self.assertEqual(tag['id'], 2)
            self.assertGreaterEqual(tag['avg_price'], 0)
            self.assertGreaterEqual(len(tag['name']), 1)
            self.assertGreaterEqual(tag['num_products'], 1)

    def test_endpoint_specific_tag_2(self):
        with app.test_request_context():
            res = get_tag(3)
            tag = json.loads(res.data.decode())
            self.assertEqual(tag['id'], 3)
            self.assertGreaterEqual(tag['avg_price'], 0)
            self.assertGreaterEqual(len(tag['name']), 1)
            self.assertGreaterEqual(tag['num_products'], 1)

    def test_endpoint_product_1(self):
        with app.test_request_context():
            res = get_products()
            products = json.loads(res.data.decode())
            self.assertEqual(len(products), 615)

    def test_endpoint_specific_product_1(self):
        with app.test_request_context():
            res = get_product(1)
            category = json.loads(res.data.decode())
            self.assertEqual(category['id'], 1)
            self.assertGreaterEqual(len(category['name']), 1)
            self.assertGreaterEqual(category['price'], 0)
            self.assertGreaterEqual(category['brand']['id'], 1)

    def test_endpoint_specific_product_2(self):
        with app.test_request_context():
            res = get_product(2)
            category = json.loads(res.data.decode())
            self.assertEqual(category['id'], 2)
            self.assertGreaterEqual(len(category['name']), 1)
            self.assertGreaterEqual(category['price'], 0)
            self.assertGreaterEqual(category['brand']['id'], 1)

    def test_endpoint_specific_product_3(self):
        with app.test_request_context():
            res = get_product(3)
            category = json.loads(res.data.decode())
            self.assertEqual(category['id'], 3)
            self.assertGreaterEqual(len(category['name']), 1)
            self.assertGreaterEqual(category['price'], 0)
            self.assertGreaterEqual(category['brand']['id'], 1)

    def test_endpoint_categories_1(self):
        with app.test_request_context():
            res = get_categories()
            categories = json.loads(res.data.decode())
            self.assertEqual(len(categories), 10)

    def test_endpoint_specific_category_1(self):
        with app.test_request_context():
            res = get_category(1)
            category = json.loads(res.data.decode())
            self.assertEqual(category['id'], 1)
            self.assertGreaterEqual(len(category['name']), 1)
            self.assertGreaterEqual(category['num_products'], 1)
            self.assertGreaterEqual(category['avg_price'], 0)

    def test_endpoint_specific_sub_category_1(self):
        with app.test_request_context():
            res = get_sub_category(2)
            sub_category = json.loads(res.data.decode())
            self.assertEqual(sub_category['id'], 2)
            self.assertGreaterEqual(len(sub_category['name']), 1)
            self.assertGreaterEqual(sub_category['num_products'], 1)
            self.assertGreaterEqual(sub_category['avg_price'], 0)

    def test_endpoint_search_1(self):
        with app.test_request_context():
            res = get_search_results('makeup red')
            search_results = json.loads(res.data.decode())
            self.assertEqual(len(search_results['and_results']), 64)
            self.assertEqual(len(search_results['or_results']), 374)
            self.assertEqual(len(search_results['keywords']), 2)


def suite():
    suite = unittest.TestSuite()
    suite.addTest(unittest.makeSuite(UnitTests, 'test'))
    return suite


if __name__ == '__main__':
    with app.test_request_context():
        unittest.main()
