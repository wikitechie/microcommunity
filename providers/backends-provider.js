var backboneio          = require('backbone.io');
var posts_provider      = require('./posts-provider.js');
var comments_provider   = require('./comments-provider.js');

var posts = backboneio.createBackend();
posts.use(backboneio.middleware.mongooseStore(posts_provider.model));

exports.posts = posts;