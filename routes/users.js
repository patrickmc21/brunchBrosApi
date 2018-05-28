const routes = require('express').Router();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const db = require('knex')(configuration);

routes.get('/', (req, res) => {
  const { email } = req.query;

  db('users').select().where('email', email)
    .then((user) => {
      res.status(200).json(user[0]);
    })
    .catch(error => {
      res.status(404).json({message: 'User not found'});
    })
});

routes.post('/', (req, res) => {

});

routes.put('/:id', (req, res) => {

});

routes.delete('/:id', (req, res) => {

});

module.exports = routes;