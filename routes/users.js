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
      res.status(404).json({error, message: 'User not found'});
    })
});

routes.post('/', (req, res) => {
  const { user } = req.body;
  const { email, username } = user;

  if (!email || !username) {
    return res.status(406).json({message: 'Must include valid user'});
  }

  db('users').insert(user, ['UID', 'username', 'email'])
    .then((user) => {
      return res.status(201).json({user[0]});
    })
    .catch(error => {
      return res.status(500).json({error, message: 'Server Error, failed to post user'});
    })
});

routes.put('/:id', (req, res) => {
  const { id } = req.params;
  const { user } = req.body;
  
  db('users').where('id', id).update(user, ['UID', 'username', 'email'])
    .then(user => {
      if (user.length === 1) {
        return res.status(200).json(user[0]);
      } else {
        return res.status(404).json({message: 'User not found'});
      }
    })
    .catch(error => {
      return res.status(500).json({message, message: 'Failed to update user'});
    }) 

});

routes.delete('/:id', (req, res) => {
  const { id } = req.params;

  db('users').where('id', id).del()
    .then((deleted) => {
      if (deleted.length === 1) {
        return res.sendStatus(204);
      } else {
        return res.status(404).json({message: 'User not found'});
      }
    })
    .catch(error => {
      return res.status(500).json({error, message: 'Failed to delete'});
    })
});

module.exports = routes;