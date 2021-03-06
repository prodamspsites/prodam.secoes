# -*- coding: utf-8 -*-
from Products.Five.browser.pagetemplatefile import ViewPageTemplateFile
from plone.app.portlets.portlets.navigation import Renderer as BaseRenderer
from plone.app.uuid.utils import uuidToObject


class Renderer(BaseRenderer):

    def getLinkObject(self, linkUID):
        obj = uuidToObject(linkUID)
        return obj or False


    def process_navigation(self, data):
        ''' '''
        portal_url = self.urltool()
        navroot_url = self.getNavRoot().absolute_url()
        for item in data:
            remoteUrl = item.get('getRemoteUrl', '')
            if '${portal_url}' in str(remoteUrl):
                item['getRemoteUrl'] = remoteUrl.replace('${portal_url}',
                                                         portal_url)
            elif '${portal_url}' in str(remoteUrl):
                item['getRemoteUrl'] = remoteUrl.replace(
                    '${navigation_root_url}', navroot_url)
            
        return data

    def createNavTree(self):
        data = self.getNavTree()

        bottomLevel = (self.data.bottomLevel or
                       self.properties.getProperty('bottomLevel', 0))
        if bottomLevel < 0:
            # Special case where navigation tree depth is negative
            # meaning that the admin does not want the listing to be displayed
            return self.recurse([], level=1, bottomLevel=bottomLevel)
        else:
            children = self.process_navigation(data.get('children', []))
            return self.recurse(children=children,
                                level=1,
                                bottomLevel=bottomLevel)

    recurse = ViewPageTemplateFile('templates/secoes.pt')
    
    def getUrlIcone(self, obj):
        if obj.icone != None:
            print(obj.icone.filename)
            print(obj.absolute_url())
            return obj.absolute_url() + '/@@edit/++widget++form.widgets.icone/@@download/' + obj.icone.filename 
        else:
            return ''
