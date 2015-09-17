from collective.transmogrifier.interfaces import ISection
from collective.transmogrifier.interfaces import ISectionBlueprint
from zope.component import provideUtility
from zope.interface import classProvides
from zope.interface import implements
import pprint


class Fields(object):
    classProvides(ISectionBlueprint)
    implements(ISection)

    def __init__(self, transmogrifier, name, options, previous):
        self.previous = previous
        self.pprint = pprint.PrettyPrinter().pprint

provideUtility(Fields, name=u'collective.transmogrifier.tests.exampleconstructor')


class Create(object):
    classProvides(ISectionBlueprint)
    implements(ISection)

    def __init__(self, transmogrifier, name, options, previous):
        self.previous = previous
        self.pprint = pprint.PrettyPrinter().pprint

    def __iter__(self):
        for item in self.previous:
            self.pprint(sorted(item.items()))
            yield item


provideUtility(Create, name=u'collective.transmogrifier.tests.exampleconstructor')
