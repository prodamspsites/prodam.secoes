# -*- coding:utf-8 -*-

from setuptools import find_packages
from setuptools import setup

version = '0.5.dev0'
long_description = (
    open('README.rst').read() + '\n' +
    open('CONTRIBUTORS.rst').read() + '\n' +
    open('CHANGES.rst').read()
)

setup(
    name='prodam.secoes',
    version=version,
    description="Produto de Secoes para portais prodam sp sites",
    long_description=long_description,
    classifiers=[
        "Development Status :: 1 - Planning",
        "Environment :: Web Environment",
        "Framework :: Plone",
        "Framework :: Plone :: 4.3",
        "Intended Audience :: Developers",
        "Intended Audience :: System Administrators",
        "License :: OSI Approved :: GNU General Public License v2 (GPLv2)",
        "Operating System :: OS Independent",
        "Programming Language :: JavaScript",
        "Programming Language :: Python",
        "Programming Language :: Python :: 2.7",
        "Topic :: Internet :: WWW/HTTP",
        "Topic :: Internet :: WWW/HTTP :: Dynamic Content",
        "Topic :: Multimedia",
        "Topic :: Software Development :: Libraries :: Python Modules",
    ],
    keywords='prodam secoes',
    author='prodam.portal',
    author_email='email@domain.com.br',
    url='https://github.com/prodamspsites/prodam.secoes',
    license='GPLv2',
    packages=find_packages('src'),
    package_dir={'': 'src'},
    namespace_packages=['prodam',],
    include_package_data=True,
    zip_safe=False,
    install_requires=[
        'prodam.portal',
        'Products.CMFPlone >=4.3',
        'setuptools',
        'plone.app.contenttypes<1.1a1',
    ],
    extras_require={
        'test': [
            'plone.app.testing',
            'prodam.portal',
        ],
    },
    entry_points="""
      [z3c.autoinclude.plugin]
      target = plone
      """,
)
