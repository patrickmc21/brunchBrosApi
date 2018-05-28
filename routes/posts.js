const routes = require('express').Router();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const db = require('knex')(configuration);

routes.get('/:pinId', (req, res) => {
  const { id } = req.params;

  db('posts').select().where('ID', id)
    .then((pin) => {
      res.status(200).json(pin[0]);
    })
    .catch(error => {
      res.status(404).json({error, message: 'Post not found'})
    })
});

routes.post('/', (req, res) => {

});

routes.put('/:id', (req, res) => {

});

routes.delete('/:id', (req, res) => {

});

module.exports = routes;

