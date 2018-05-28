const routes = require('express').Router();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const db = require('knex')(configuration);

routes.get('/:mapId', (req, res) => {
  
});

routes.post('/', (req, res) => {

});

routes.put('/:id', (req, res) => {

});

routes.delete('/:id', (req, res) => {

});

module.exports = routes;

