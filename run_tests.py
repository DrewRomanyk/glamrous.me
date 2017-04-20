# pylint: disable=missing-docstring
# pylint: disable=unused-import
# pylint: disable=redefined-outer-name


import unittest
import data.data_to_database
from app import tests


def suite():
    suite = unittest.TestSuite()
    suite.addTest(tests.suite())
    return suite


if __name__ == '__main__':
    unittest.main(defaultTest='suite')
