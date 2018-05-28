const routes = require('express').Router();
const users = require('./routes/users');
const maps = require('./routes/maps');
const pins = require('./routes/pins');
const posts = require('./routes/posts');

routes.use('/users', users);
routes.use('/maps', maps);
routes.use('/pins', pins);
routes.use('/posts', posts);

module.exports = routes;