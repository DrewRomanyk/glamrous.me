import unittest
from app import tests

def suite():
    suite = unittest.TestSuite()
    suite.addTest(tests.suite())
    return suite

if __name__ == '__main__':
    unittest.main(defaultTest='suite')
