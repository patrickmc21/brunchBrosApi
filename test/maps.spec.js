const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const db = require('knex')(configuration);
const { app } = require('../server');

chai.use(chaiHttp);

describe('maps endpoints', () => {

  beforeEach(() => {
    return db.migrate.rollback()
      .then(() => {
        return db.migrate.latest()          
      })
      .then(() => {
        return db.seed.run();    
      })
  });

  describe('GET /maps/:userID', () => {
    it('should return all maps for a given user', (done) => {
      chai.request(app)
      .get('/api/v1/maps/1')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.an('array');
        response.body[0].should.have.property('title');
        response.body[0].title.should.equal('Breakfast Burritos');
        response.body[0].should.have.property('location');
        response.body[0].location.should.equal('Denver, CO');
        response.body[0].should.have.property('description');
        response.body[0].description.should.equal('Denver\'s zestiest breakfast burritos');
        response.body[0].should.have.property('thumbnail');
        response.body[0].thumbnail.should.equal('https://www.macheesmo.com/wp-content/uploads/2016/10/Rotisserie-Chicken-Breakfast-Burrito.jpg');
        response.body[0].should.have.property('date');
        response.body[0].date.should.equal('2/4/2017');
        response.body[0].should.have.property('mapID');
        response.body[0].mapID.should.equal(1);
        done();
      });
    });

    it('should return 404 if no map found', (done) => {
      chai.request(app)
      .get('/api/v1/maps/5')
      .end((error, response) => {
        response.should.have.status(404);
        response.should.be.json;
        response.body.should.be.an('object');
        response.body.should.have.property('message');
        response.body.message.should.equal('No maps found for user');
        done();
      });
    });
  });
});