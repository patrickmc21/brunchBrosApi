const routes = require('express').Router();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const db = require('knex')(configuration);

routes.get('/:pinId', (req, res) => {
  const { pinId } = req.params;

  db('posts').select().where('pinID', pinId)
    .then((post) => {
      if (post.length > 0) {
        res.status(200).json(post); 
      } else {
        res.status(404).json({ message: 'No posts for that pin'});
      } 
    })
    .catch(error => {
      res.status(404).json({error, message: 'No posts for that pin'});
    });
});

routes.post('/', (req, res) => {
  const likes = { likes: 0 };
  const post = req.body;
  const {
    title,
    desc,
    thumbnail,
    pinID
  } = post;
  const newPost = {...post, ...likes};

  if (!title || !desc || !thumbnail || !pinID) {
    return res.status(406).json({message: 'Please include a valid post'});
  } 

  db('posts')
    .insert(newPost, ['ID', 'title', 'desc', 'likes', 'thumbnail', 'pinID'])
    .then((post) => {
      return res.status(201).json(post[0]);
    })
    .catch(error => {
      return res.status(500).json(
        {
          error, 
          message: 'Server Error, new post failed'
        }
      );
    });
});

routes.put('/:id', (req, res) => {
  const { id } = req.params;
  const updatedPost = req.body;
  const {
    title,
    desc,
    thumbnail
  } = updatedPost;

  if (!title || !desc || !thumbnail) {
    return res.status(406).json({message: 'Please include a valid post'});
  }

  db('posts')
    .where('ID', id)
    .update({...updatedPost}, ['ID', 'title', 'desc', 'likes', 'thumbnail'])
    .then(editedPost => {
      if (editedPost.length === 1) {
        return res.status(200).json(editedPost[0]);
      } else {
        return res.status(404).json({message: 'Post not found'});
      }
    })
    .catch(error => {
      return res.status(500).json({error, message: 'Failed to update post'});
    });
});

routes.delete('/:id', (req, res) => {
  const { id } = req.params;

  db('posts').where('ID', id).del()
    .then((deletedPost) => {
      if (deletedPost === 1) {
        return res.sendStatus(204);
      } else {
        return res.status(404).json({message: 'Post not found'});
      }
    })
    .catch(error => {
      return res.status(500).json({error, message: 'Failed to delete post'});
    });
});

module.exports = routes;

