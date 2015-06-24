# -*- coding: utf-8 -*-

from plone.browserlayer.utils import registered_layers
from prodam.secoes.config import PROJECTNAME
from prodam.secoes.interfaces import IBrowserLayer
from prodam.secoes.testing import FUNCTIONAL_TESTING
from prodam.secoes.testing import INTEGRATION_TESTING

import unittest2 as unittest


class Plone43TestCase(unittest.TestCase):

    layer = FUNCTIONAL_TESTING


class BaseTestCase(unittest.TestCase):
    """Base test case to be used by other tests."""

    layer = INTEGRATION_TESTING

    profile = 'prodam.secoes:default'

    def setUp(self):
        self.portal = self.layer['portal']
        self.qi = self.portal['portal_quickinstaller']
        self.wt = self.portal['portal_workflow']
        self.st = self.portal['portal_setup']


class TestInstall(BaseTestCase):
    """Ensure product is properly installed."""

    def test_installed(self):
        self.assertTrue(self.qi.isProductInstalled(PROJECTNAME),
                        '%s not installed' % PROJECTNAME)

    def test_browser_layer_installed(self):
        self.assertIn(IBrowserLayer, registered_layers())

    def test_version(self):
        self.assertEqual(
            self.st.getLastVersionForProfile(self.profile),
            (u'1000',)
        )


class TestUninstall(BaseTestCase):
    """Ensure product is properly uninstalled."""

    def setUp(self):
        BaseTestCase.setUp(self)
        self.qi.uninstallProducts(products=[PROJECTNAME])

    def test_uninstalled(self):
        self.assertFalse(self.qi.isProductInstalled(PROJECTNAME))

    def test_browser_layer_removed_uninstalled(self):
        self.assertNotIn(IBrowserLayer, registered_layers())
