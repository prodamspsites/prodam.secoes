# -*- coding: utf-8 -*-

from Products.Five.browser.pagetemplatefile import ViewPageTemplateFile
from plone.app.portlets.portlets.navigation import AddForm
from plone.app.portlets.portlets.navigation import Assignment
from plone.app.portlets.portlets.navigation import INavigationPortlet
from plone.app.portlets.portlets.navigation import Renderer
from zope.interface import implements


class ISecoesPortlet(INavigationPortlet):
    """ Defines a new portlet "grey static" which takes properties of the existing static text portlet. """
    pass


class SecoesRenderer(Renderer):
    """ Overrides static.pt in the rendering of the portlet. """
    render = ViewPageTemplateFile('templates/secoes.pt')


class SecoesAssignment(Assignment):
    """ Assigner for grey static portlet. """
    implements(ISecoesPortlet)


class SecoesAddForm(AddForm):
    """ Make sure that add form creates instances of our custom portlet instead of the base class portlet. """
    def create(self, data):
        return SecoesAssignment(**data)
