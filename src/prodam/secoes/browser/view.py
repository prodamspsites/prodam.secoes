# -*- coding: utf-8 -*-

from Products.Five import BrowserView


class TopicView(BrowserView):

    def getImage(self):
        context = self.context
        path = '/'.join(context.getPhysicalPath())

        if context.image:
            path = path + '/@@images/image.jpeg'
            if not context.hasProperty('secaoImagem'):
                context.manage_addProperty(id='secaoImagem', type='string', value=path)
        else:
            if context.secaoImagem:
                path = context.secaoImagem

        return path


class SectionView(BrowserView):

    def getSecao(self):
        context = self.context
        secao = context.Title()

        if not context.hasProperty('secao'):
            context.manage_addProperty(id='secao', type='string', value=secao)
        else:
            pass

        return secao
