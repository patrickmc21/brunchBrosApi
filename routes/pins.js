const routes = require('express').Router();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const db = require('knex')(configuration);

routes.get('/:mapId', (req, res) => {
  const { mapId } = req.params

  db('pins').select().where('mapID', mapId)
    .then((pin) => {
      res.status(200).json(pin);
    })
    .catch(error => {
      res.status(404).json({error, message: 'No pins for that map'})
    })
});

routes.post('/', (req, res) => {
  const title = {title: req.body.title}
  const mapID = {mapID: req.body.mapID}
  const lat = {lat: req.body.coordinates[1]}
  const long = {long: req.body.coordinates[0]}
  const newPin = Object.assign(title, mapID, lat, long)

  db('pins').insert(newPin, ['title', 'lat', 'long', 'pinID'])
    .then((pin) => {
      return res.status(201).json(pin[0]);
    })
    .catch(error => {
      return res.status(500).json({error, message: 'Server Error, failed to post pin'});
    })
});

routes.put('/:id', (req, res) => {
  const { id } = req.params
  const title = {title: req.body.title}
  const mapID = {mapID: req.body.mapID}
  const lat = {lat: req.body.coordinates[1]}
  const long = {long: req.body.coordinates[0]}
  const updatedPin = Object.assign(title, mapID, lat, long)
  
  db('pins').where('pinID', id).update({...updatedPin}, ['title', 'lat', 'long', 'pinID'])
    .then(editedPin => {
      if (editedPin.length === 1) {
        return res.status(200).json(editedPin[0]);
      } else {
        return res.status(404).json({message: 'Pin not found'});
      }
    })
    .catch(error => {
      return res.status(500).json({error, message: 'Failed to update pin'});
    }) 
});

routes.delete('/:id', (req, res) => {
  const { id } = req.params

  db('pins').where('pinID', id).del()
    .then((deletedPin) => {
      if (deletedPin === 1) {
        return res.sendStatus(204)
      } else {
        return res.status(404).json({message: 'Pin not found'})
      }
    })
    .catch(error => {
      return res.status(500).json({error, message: 'Failed to delete pin'})
    })
});

module.exports = routes;

