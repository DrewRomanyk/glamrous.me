# pylint: disable=missing-docstring
# pylint: disable=unused-import

import unittest
import data.data_to_database
from app import tests


def suite():
    test_suite = unittest.TestSuite()
    test_suite.addTest(tests.suite())
    return test_suite


if __name__ == '__main__':
    unittest.main(defaultTest='suite')
