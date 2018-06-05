const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const db = require('knex')(configuration);
const { app } = require('../server');

chai.use(chaiHttp);

describe('user endpoints', () => {

  beforeEach(() => {
    return db.migrate.rollback()
      .then(() => {
        return db.migrate.latest();          
      })
      .then(() => {
        return db.seed.run();    
      });
  });

  describe('GET /:query', () => {
    it('should return a user by email', (done) => {
      chai.request(app)
        .get('/api/v1/users?email=pat@askjeeves.com')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.an('object');
          response.body.should.have.property('email');
          response.body.email.should.equal('pat@askjeeves.com');
          response.body.should.have.property('username');
          response.body.username.should.equal('pmac89');
          response.body.should.have.property('UID');
          response.body.UID.should.equal(2);
          done();
        });
    });

    it('should return 404 status if no user found', (done) => {
      chai.request(app)
        .get('/api/v1/users?email=fake@email.com')
        .end((error, response) => {
          response.should.have.status(404);
          response.should.be.json;
          response.body.should.be.an('object');
          response.body.should.have.property('message');
          response.body.message.should.equal('User not found');        
          done();
        });
    });
  });

  describe('POST /', () => {
    it('should post a new user', (done) => {
      chai.request(app)
        .post('/api/v1/users')
        .send({
          "email": "mttwlkr@email.com",
          "username": "nvwlsMtt"
        })
        .end((error, response) => {
          response.should.have.status(201);
          response.should.be.json;
          response.body.should.be.an('object');
          response.body.should.have.property('email');
          response.body.email.should.equal('mttwlkr@email.com');
          response.body.should.have.property('username');
          response.body.username.should.equal('nvwlsMtt');
          response.body.should.have.property('UID');
          response.body.UID.should.equal(3);
          done();
        });
    });

    it('should not post a user if email or username are missing', (done) => {
      chai.request(app)
        .post('/api/v1/users')
        .send({
          "email": "mttwlkr@email.com"        
        })
        .end((error, response) => {
          response.should.have.status(406);
          response.should.be.json;
          response.body.should.be.an('object');
          response.body.should.have.property('message');
          response.body.message.should.equal('Must include valid user');        
          done();
        });
    });
  });

  describe('PUT /:id', () => {
    it('should edit an existing user', (done) => {
      chai.request(app)
        .put('/api/v1/users/2')
        .send(
          {        
            "UID": 2,
            "email": "pat@askjeeves.com",
            "username": "pmac8989"
          }
        )
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.an('object');
          response.body.should.have.property('email');
          response.body.email.should.equal('pat@askjeeves.com');
          response.body.should.have.property('username');
          response.body.username.should.equal('pmac8989');
          response.body.should.have.property('UID');
          response.body.UID.should.equal(2);
          done();
        });
    });

    it('should return 404 if user not found', (done) => {
      chai.request(app)
        .put('/api/v1/users/4')
        .send(
          {        
            "UID": 1,
            "email": "pat@askjeeves.com",
            "username": "pmac8989"
          }
        )
        .end((error, response) => {
          response.should.have.status(404);
          response.should.be.json;
          response.body.should.be.an('object');
          response.body.should.have.property('message');
          response.body.message.should.equal('User not found');        
          done();
        });
    });
  });

  describe('DELETE /:id', () => {
    it('should delete a user', (done) => {
      chai.request(app)
        .delete('/api/v1/users/1')
        .end((error, response) => {
          response.should.have.status(204);
          done();
        });
    });

    it('should return 404 if user not found', (done) => {
      chai.request(app)
        .delete('/api/v1/users/4')
        .end((error, response) => {
          response.should.have.status(404);
          response.should.be.json;
          response.body.should.be.an('object');
          response.body.should.have.property('message');
          response.body.message.should.equal('User not found');
          done();
        });
    });
  });
});
