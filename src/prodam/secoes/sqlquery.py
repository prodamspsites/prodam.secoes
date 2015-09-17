from collective.transmogrifier.interfaces import ISection
from collective.transmogrifier.interfaces import ISectionBlueprint
from zope.interface import classProvides
from zope.interface import implements
from zope.component import provideUtility
import json, pprint, os


class Query(object):
    classProvides(ISectionBlueprint)
    implements(ISection)

    def __init__(self, transmogrifier, name, options, previous):
        self.previous = previous
        self.pprint = pprint.PrettyPrinter().pprint

    def __iter__(self):
        import pdb; pdb.set_trace()
        for item in self.previous:
            self.pprint(sorted(item.items()))
            yield item

provideUtility(Query,
               name=u'collective.transmogrifier.tests.exampleconstructor')