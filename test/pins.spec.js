const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const db = require('knex')(configuration);
const { app } = require('../server');

chai.use(chaiHttp);

describe('pin endpoints', () => {

  beforeEach(() => {
    return db.migrate.rollback()
      .then(() => {
        return db.migrate.latest()          
      })
      .then(() => {
        return db.seed.run();    
      })
  });

  describe('GET /:mapID', () => {
    it('should return a pin by map ID', (done) => {
      chai.request(app)
      .get('/api/v1/pins/1')
      .end((error, response) => {
        response.should.have.status(200)
        response.should.be.json;
        response.body.should.be.an('array');
        response.body[0].should.have.property('title');
        response.body[0].title.should.equal('Santiagos')
        response.body[0].should.have.property('long');
        response.body[0].long.should.equal(-105.001)
        response.body[0].should.have.property('lat');
        response.body[0].lat.should.equal(39.7254)
        response.body[0].should.have.property('mapID');
        response.body[0].mapID.should.equal(1)
        done();
      })
    })

    it('should return a 404 status if no pin is found', (done) => {
      chai.request(app)
      .get('/api/v1/pins/5000')
      .end((error, response) => {
        response.should.have.status(404)
        response.should.be.json;
        response.body.should.be.an('object');
        response.body.should.have.property('message');
        response.body.message.should.equal('No pins for that map'); 
        done();
      })
    })
  })

  describe('POST /', (req, res) => {
    it('should post a new pin', (done) => {
      chai.request(app)
      .post('/api/v1/pins/')
      .send({
        "title": "Garfs",
        "mapID": 1,
        "coordinates": [-122.9562014, 50.1171103]
      })
      .end((error, response) => {
        response.should.have.status(201);
        response.should.be.json;
        response.body.should.be.an('object');
        response.body.should.have.property('title');
        response.body.title.should.equal('Garfs');
        response.body.should.have.property('mapID');
        response.body.mapID.should.equal(1);
        response.body.should.have.property('lat');
        response.body.lat.should.equal(50.1171);
        response.body.should.have.property('long');
        response.body.long.should.equal(-122.956);
        response.body.should.have.property('pinID');
        response.body.pinID.should.equal(21);
        done();
      })
    })

    it.skip('should not post a new pin if a field is missing', (done) => {
      chai.request(app)
      .post('/api/v1/pins/')
      .send({
        "title": "Garfs",
        "mapID": 1
      })
      .end((error, response) => {
        // console.log(response.body)
        response.should.have.status(406);
        done();
      })
    })
  })

  describe('PUT /:id', (req, res) => {
    it('should patch an existing pin', (done) => {
      chai.request(app)
      .put('/api/v1/pins/19')
      .send({
        "title": "Geillllo",
        "mapID": 4,
        "coordinates": [7.981613, 60.535275]
      })
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.an('object');
        response.body.should.have.property('title');
        response.body.title.should.equal('Geillllo');
        response.body.should.have.property('mapID');
        response.body.mapID.should.equal(4);
        response.body.should.have.property('lat');
        response.body.lat.should.equal(60.5353);
        response.body.should.have.property('long');
        response.body.long.should.equal(7.98161);
        response.body.should.have.property('pinID');
        response.body.pinID.should.equal(19);
        done();
      })
    })

    it.skip('should not patch a new pin if a field is missing', (done) => {
      chai.request(app)
      .post('/api/v1/pins/19')
      .send({
        "title": "Geillllo",
        "coordinates": [60.535275, 7.981613]
      })
      .end((error, response) => {
        // console.log(response.body)
        response.should.have.status(406);
        done();
      })
    })
  })

  describe('DELETE /:id', () => {
    it.skip('should delete a pin', (done) => {
      chai.request(app)
      .delete('/api/v1/pins/8')
      .end((error, response) => {
        response.should.have.status(204)
        done();
      })
    })

    it('should return 404 if a pin is not found', (done) => {
      chai.request(app)
      .delete('/api/v1/pins/5000')
      .end((error, response) => {
        response.should.have.status(404);
        response.should.be.json;
        response.body.should.be.an('object');
        response.body.should.have.property('message');
        response.body.message.should.equal('Pin not found');
        done()
      })
    })
  })
})