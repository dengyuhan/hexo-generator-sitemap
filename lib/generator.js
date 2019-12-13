'use strict';

const micromatch = require('micromatch');
const template = require('./template');

module.exports = function(locals) {
  const { config } = this;
  let skipRenderList = [
    '**/*.js',
    '**/*.css'
  ];

  if (Array.isArray(config.skip_render)) {
    skipRenderList.push(...config.skip_render);
  } else if (typeof config.skip_render === 'string') {
    if (config.skip_render.length > 0) {
      skipRenderList.push(config.skip_render);
    }
  }

  const posts = [].concat(locals.posts.toArray(), locals.pages.toArray())
    .filter(post => {
      return post.baidusitemap !== false && !isMatch(post.source, skipRenderList);
    })
    .sort((a, b) => {
      return b.updated - a.updated;
    });

  if (posts.length <= 0) {
    config.baidusitemap.rel = false;
    return;
  }

  const xml = template(config).render({
    config,
    posts
  });

  return {
    path: config.baidusitemap.path,
    data: xml
  };
};

function isMatch(path, patterns) {
  return micromatch.isMatch(path, patterns);
}
