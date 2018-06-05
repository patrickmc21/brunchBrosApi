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
        return db.migrate.latest();          
      })
      .then(() => {
        return db.seed.run();    
      });
  });

  describe('GET /maps/:userID', () => {
    it('should return all maps for a given user', (done) => {
      chai.request(app)
        .get('/api/v1/maps/2')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.an('array');
          response.body[0].should.have.property('title');
          response.body[0].title.should.equal('Bagel Joints');
          response.body[0].should.have.property('location');
          response.body[0].location.should.equal('New York City');
          response.body[0].should.have.property('description');
          response.body[0]
            .description.should.equal('Best Bagels in Metropolis');
          response.body[0].should.have.property('thumbnail');
          response.body[0].thumbnail.should.equal('FakeImage.jpg');
          response.body[0].should.have.property('date');
          response.body[0].date.should.equal('5/22/2018');
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

  describe('POST /maps', () => {
    it('should post a map', (done) => {
      chai.request(app)
        .post('/api/v1/maps')
        .send({
          title: "Restaraunts",
          location: "Boulder, CO",
          description: "Best restaraunts in Boulder",
          thumbnail: "www.fakeImage.jpg",
          date: "5/22/2018",
          userID: 1
        })
        .end((error, response) => {
          response.should.have.status(201);
          response.should.be.json;
          response.body.should.be.an('object');
          response.body.should.have.property('title');
          response.body.title.should.equal('Restaraunts');
          response.body.should.have.property('location');
          response.body.location.should.equal('Boulder, CO');
          response.body.should.have.property('description');
          response.body.description.should.equal('Best restaraunts in Boulder');
          response.body.should.have.property('thumbnail');
          response.body.thumbnail.should.equal('www.fakeImage.jpg');
          response.body.should.have.property('date');
          response.body.date.should.equal('5/22/2018');
          response.body.should.have.property('userID');
          response.body.userID.should.equal(1);
          response.body.should.have.property('mapID');
          response.body.mapID.should.equal(6);
          done();
        }); 
    });

    it('should return 406 if incomplete map sent', (done) => {
      chai.request(app)
        .post('/api/v1/maps')
        .send({
          title: "Restaraunts",        
          description: "Best restaraunts in Boulder",        
          thumbnail: "www.fakeImage.jpg",
          date: "5/22/2018",
          userID: 1
        })
        .end((error, response) => {
          response.should.have.status(406);
          response.should.be.json;
          response.body.should.be.an('object');
          response.body.should.have.property('message');
          response.body.message.should.equal('Please include a valid map');
          done();
        }); 
    });
  });

  describe('PUT /maps/:id', () => {
    it('should update a map', (done) => {
      chai.request(app)
        .put('/api/v1/maps/1')
        .send({
          mapID: 1,
          title: "Restaraunts",
          location: "Boulder, CO",        
          description: "Best restaraunts in Boulder",
          thumbnail: "www.fakeImage.jpg",
          date: "5/22/2018",
          userID: 1
        })
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.an('object');
          response.body.should.have.property('title');
          response.body.title.should.equal('Restaraunts');
          response.body.should.have.property('location');
          response.body.location.should.equal('Boulder, CO');
          response.body.should.have.property('description');
          response.body.description.should.equal('Best restaraunts in Boulder');
          response.body.should.have.property('thumbnail');
          response.body.thumbnail.should.equal('www.fakeImage.jpg');
          response.body.should.have.property('date');
          response.body.date.should.equal('5/22/2018');
          response.body.should.have.property('userID');
          response.body.userID.should.equal(1);
          response.body.should.have.property('mapID');
          response.body.mapID.should.equal(1);
          done();
        }); 
    });

    it('should return 404 if mapID not found', (done) => {
      chai.request(app)
        .put('/api/v1/maps/6')
        .send({
          mapID: 1,
          title: "Restaraunts",
          location: "Boulder, CO",        
          description: "Best restaraunts in Boulder",
          thumbnail: "www.fakeImage.jpg",
          date: "5/22/2018",
          userID: 1
        })
        .end((error, response) => {
          response.should.have.status(404);
          response.should.be.json;
          response.body.should.be.an('object');
          response.body.should.have.property('message');
          response.body.message.should.equal('Map not found');        
          done();
        }); 
    });
  });

  describe('DELETE /maps/:id', () => {
    it('should delete a map', (done) => {
      chai.request(app)
        .delete('/api/v1/maps/1')
        .end((error, response) => {
          response.should.have.status(204);            
          done();
        });
    });

    it('should return 404 if map not found', (done) => {
      chai.request(app)
        .delete('/api/v1/maps/6')
        .end((error, response) => {
          response.should.have.status(404);
          response.body.should.have.property('message');
          response.body.message.should.equal('Map not found');
          done();
        });
    });
  });
});

