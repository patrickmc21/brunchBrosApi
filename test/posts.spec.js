const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const db = require('knex')(configuration);
const { app } = require('../server');

chai.use(chaiHttp);

describe('post endpoints', () => {

  beforeEach(() => {
    return db.migrate.rollback()
      .then(() => {
        return db.migrate.latest()          
      })
      .then(() => {
        return db.seed.run();    
      })
  });

  describe('GET /:pinId', () => {
    it('should return a post by pin ID', (done) => {
      chai.request(app)
      .get('/api/v1/posts/1')
      .end((error, response) => {
        response.should.have.status(200)
        response.should.be.json;
        response.body.should.be.an('array');
        response.body[0].should.have.property('title');
        response.body[0].should.have.property('desc');
        response.body[0].should.have.property('likes');
        response.body[0].should.have.property('thumbnail');
        response.body[0].should.have.property('pinID');
        response.body[0].pinID.should.equal(1)
        done();
      })
    })

    it('should return a 404 status if no pin is found', (done) => {
      chai.request(app)
      .get('/api/v1/posts/5000')
      .end((error, response) => {
        response.should.have.status(404)
        response.should.be.json;
        response.body.should.be.an('object');
        response.body.should.have.property('message');
        response.body.message.should.equal('No posts for that pin'); 
        done();
      })
    })
  })

  describe('POST /', () => {
    it('should post a new post', (done) => {
      chai.request(app)
      .post('/api/v1/posts/').
      send({
        pinID: 20,
        title: "Best Park",    
        desc: "In The World",
        thumbnail: 'https://i.ytimg.com/vi/UgJF1pbdMyA/maxresdefault.jpg'
      })
      .end((error, response) => {
        response.should.have.status(201)
        response.should.be.json;
        response.body.should.be.an('object');
        response.body.should.have.property('ID');
        response.body.ID.should.equal(21);
        response.body.should.have.property('title');
        response.body.title.should.equal('Best Park');
        response.body.should.have.property('desc');
        response.body.desc.should.equal('In The World');  
        response.body.should.have.property('likes');
        response.body.likes.should.equal(0);
        response.body.should.have.property('thumbnail');
        response.body.thumbnail.should.equal('https://i.ytimg.com/vi/UgJF1pbdMyA/maxresdefault.jpg');
        done();
      })
    })

    it('should not post a new post if a field is missing', (done) => {
      chai.request(app)
      .post('/api/v1/posts/')
      .send({
        pinID: 20,   
        desc: "In The World",
        thumbnail: 'https://i.ytimg.com/vi/UgJF1pbdMyA/maxresdefault.jpg'
      })
      .end((error, response) => {
        response.should.have.status(406)
        response.should.be.json;
        response.body.should.be.an('object');
        response.body.should.have.property('message');
        response.body.message.should.equal('Please include a valid post'); 
        done();
      })
    })
  })

  describe('PUT /:id', () => {
    it('should patch an existing post', (done) => {
      chai.request(app)
      .put('/api/v1/posts/20')
      .send({
        "title": "It is the best",
        "desc": "Oystein and Siver live here",
        "thumbnail": "https://i.ytimg.com/vi/UgJF1pbdMyA/maxresdefault.jpg",
        "likes": 69
      })
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.should.be.an('object')
        response.body.should.have.property('ID')
        response.body.ID.should.equal(20)
        response.body.should.have.property('title')
        response.body.title.should.equal('It is the best')
        response.body.should.have.property('desc')
        response.body.desc.should.equal('Oystein and Siver live here')
        response.body.should.have.property('likes')
        response.body.likes.should.equal(69)
        response.body.should.have.property('thumbnail')
        response.body.thumbnail.should.equal('https://i.ytimg.com/vi/UgJF1pbdMyA/maxresdefault.jpg')
        done();
      })
    })

    it('should not patch a post if the url is wrong', (done) => {
      chai.request(app)
      .put('/api/v1/posts/2000')
      .send({
        "title": "It is the best",
        "desc": "Oystein and Siver live here",
        "thumbnail": "https://i.ytimg.com/vi/UgJF1pbdMyA/maxresdefault.jpg",
        "likes": 69
      })
      .end((error, response) => {
        response.should.have.status(404);
        response.should.be.json;
        response.body.should.be.an('object');
        response.body.should.have.property('message');
        response.body.message.should.equal('Post not found');         
        done();
      })
    })

    it('should not patch a post if some fields are left blank', (done) => {
      chai.request(app)
      .put('/api/v1/posts/20')
      .send({
        "title": "It is the best",
        "thumbnail": "https://i.ytimg.com/vi/UgJF1pbdMyA/maxresdefault.jpg",
        "likes": 69
      })
      .end((error, response) => {
        response.should.have.status(406);
        response.should.be.json;
        response.body.should.be.an('object');
        response.body.should.have.property('message');
        response.body.message.should.equal('Please include a valid post');         
        done();
      })
    })
  })

  describe('DELETE /:id', () => {
    it('should delete a post by ID', (done) => {
      chai.request(app)
      .delete('/api/v1/posts/18')
      .end((error, response) => {
        response.should.have.status(204);
        done();
      })
    })

    it('should return a 404 if the post is not found', (done) => {
      chai.request(app)
      .delete('/api/v1/posts/6000')
      .end((error, response) => {
        response.should.have.status(404)
        response.should.be.json;
        response.body.should.be.an('object');
        response.body.should.have.property('message');
        response.body.message.should.equal('Post not found');        
        done();
      })
    })
  })
})