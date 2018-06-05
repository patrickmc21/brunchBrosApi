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
        return db.migrate.latest();          
      })
      .then(() => {
        return db.seed.run();    
      });
  });

  describe('GET /:mapID', () => {
    it('should return a pin by map ID', (done) => {
      chai.request(app)
        .get('/api/v1/pins/2')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.an('array');
          response.body[0].should.have.property('title');        
          response.body[0].should.have.property('coordinates');        
          response.body[0].should.have.property('mapID');
          response.body[0].mapID.should.equal(2);
          done();
        });
    });

    it('should return a 404 status if no pin is found', (done) => {
      chai.request(app)
        .get('/api/v1/pins/5000')
        .end((error, response) => {
          response.should.have.status(404);
          response.should.be.json;
          response.body.should.be.an('object');
          response.body.should.have.property('message');
          response.body.message.should.equal('No pins for that map'); 
          done();
        });
    });
  });

  describe('POST /', () => {
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
          response.body.should.have.property('coordinates');
          response.body.coordinates[1].should.equal(50.1171);        
          response.body.coordinates[0].should.equal(-122.956);
          response.body.should.have.property('pinID');
          response.body.pinID.should.equal(21);
          done();
        });
    });

    it('should not post a new pin if a field is missing', (done) => {
      chai.request(app)
        .post('/api/v1/pins/')
        .send({
          "title": "Garfs",
          "coordinates": [-122.9562014, 50.1171103]
        })
        .end((error, response) => {
          response.should.have.status(406);
          done();
        });
    });
  });

  describe('PUT /:id', () => {
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
          response.body.should.have.property('coordinates');
          response.body.coordinates[1].should.equal(60.5353);
          response.body.coordinates[0].should.equal(7.98161);
          response.body.should.have.property('pinID');
          response.body.pinID.should.equal(19);
          done();
        });
    });

    it('should not patch a pin if a field is missing', (done) => {
      chai.request(app)
        .put('/api/v1/pins/19')
        .send({
          "mapID": 4,
          "coordinates": [60.535275, 7.981613]
        })
        .end((error, response) => {
          response.should.have.status(406);
          done();
        });    
    });

    it('should not patch a pin if the pinID does not exist', (done) => {
      chai.request(app)
        .put('/api/v1/pins/5000')
        .send({
          "title": "Geillllo",
          "mapID": 4,
          "coordinates": [7.981613, 60.535275]
        })
        .end((error, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  describe('DELETE /:id', () => {    

    it('should return 404 if a pin is not found', (done) => {
      chai.request(app)
        .delete('/api/v1/pins/5000')
        .end((error, response) => {
          response.should.have.status(404);
          response.should.be.json;
          response.body.should.be.an('object');
          response.body.should.have.property('message');
          response.body.message.should.equal('Pin not found');
          done();
        });
    });
  });
});