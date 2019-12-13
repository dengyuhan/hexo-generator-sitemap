/* global hexo */
'use strict';

const { extname } = require('path');

hexo.config.baidusitemap = Object.assign({
  path: 'baidusitemap.xml',
  rel: false
}, hexo.config.baidusitemap);

const config = hexo.config.baidusitemap;

if (!extname(config.path)) {
  config.path += '.xml';
}

hexo.extend.generator.register('baidusitemap', require('./lib/generator'));

if (config.rel === true) {
  hexo.extend.filter.register('after_render:html', require('./lib/rel'));
}
