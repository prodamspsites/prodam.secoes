# -*- coding: utf-8 -*-
from collective.transmogrifier.transmogrifier import Transmogrifier


def initial_content(context):
    site = context.getSite()
    transmogrify = Transmogrifier(site)
    transmogrify('prodam.secoes.conteudo')
