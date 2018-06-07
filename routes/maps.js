const routes = require('express').Router();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const db = require('knex')(configuration);

routes.get('/', (req, res) => {
  db('maps').select()
    .then((maps) => {
      return res.status(200).json(maps)
    })
    .catch(error => {
      return res.status(500).json({ error, message: 'Server error'})
    });
});

routes.get('/:userId', (req, res) => {
  const { userId } = req.params;

  db('maps').where('userID', userId).select()
    .then((maps) => {
      if (maps.length > 0) {
        return res.status(200).json(maps);
      } else {
        return res.status(404).json({message: 'No maps found for user'});
      }
    }) 
    .catch(error => {
      return res.status(500).json({error, message: 'Failed to get maps'});
    });
});

routes.post('/', (req, res) => {
  const map = req.body;
  const mapKeys = Object.keys(map);
  const {
    title,
    location,
    description,
    thumbnail,
    date,
    userID
  } = map;

  if (!title || !location || !description || !thumbnail || !date || !userID) {
    return res.status(406).json({message: 'Please include a valid map'});
  }

  db('maps').insert(map, ['mapID', ...mapKeys])
    .then(map => {
      return res.status(201).json(map[0]);
    })
    .catch(error => {
      return res.status(500).json({error, message: 'Failed to add map'});
    });
});

routes.put('/:id', (req, res) => {
  const { id } = req.params;
  const map = req.body;
  const mapKeys = Object.keys(map);

  db('maps').where('mapID', id).update({...map}, [...mapKeys])
    .then(map => {
      if (map.length === 1) {
        return res.status(200).json(map[0]);
      } else {
        return res.status(404).json({message: 'Map not found'});
      }
    })
    .catch(error => {
      return res.status(500).json({error, message: 'Failed to update map'});
    });
});

routes.delete('/:id', (req, res) => {
  const { id } = req.params;

  db('maps').where('mapID', id).del()
    .then(deleted => {
      if (deleted === 1) {
        return res.sendStatus(204);
      } else {
        return res.status(404).json({message: 'Map not found'});
      }
    })
    .catch(error => {
      return res.status(500).json({error, message: 'Failed to delete map'});
    });
});

module.exports = routes;
