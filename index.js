/* global hexo */
'use strict';

const pathFn = require('path');

const config = hexo.config.baidusitemap = Object.assign({
  path: 'sitemap.xml'
}, hexo.config.baidusitemap);

if (!pathFn.extname(config.path)) {
  config.path += '.xml';
}

hexo.extend.generator.register('baidusitemap', require('./lib/generator'));
