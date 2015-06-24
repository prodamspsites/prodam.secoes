# -*- coding: utf-8 -*-

from Products.CMFPlone.interfaces import INonInstallable
from zope.interface import implements

PROJECTNAME = 'prodam.secoes'


class HiddenProfiles(object):
    implements(INonInstallable)

    def getNonInstallableProfiles(self):
        return [
            u'prodam.secoes:uninstall',
            u'prodam.secoes.upgrades.v1010:default'
        ]
