const {
  mockUser,
  mockMaps,
  mockPins,
  mockPosts
} = require('../../../mock-data');

mockPins.forEach(pin => {
  pin.posts = mockPosts.filter(post => post.pin === pin.title);
});

mockMaps.forEach(map => {
  map.pins = mockPins.filter(pin => pin.map === map.title);
});

mockUser.maps = mockMaps;

const createPost = (knex, post, pinID) => {
  return knex('posts').insert({
    title: post.title,
    desc: post.desc,
    likes: post.likes,
    thumbnail: post.thumbnail,
    pinID: pinID[0]
  });
};

const createPin = (knex, pin, mapID) => {
  return knex('pins').insert({
    title: pin.title,
    long: pin.coordinates[0],
    lat: pin.coordinates[1],
    mapID: mapID[0]
  }, 'pinID')
    .then((pinID) => { 
      const postPromises = [];

      pin.posts.forEach(post => {
        postPromises.push(createPost(knex, post, pinID));
      });

      return Promise.all(postPromises);
    })
    .catch(error => {
      return error;
    });
};

const createMap = (knex, map, userID) => {
  return knex('maps').insert({
    title: map.title,
    location: map.location,
    description: map.description,
    thumbnail: map.thumbnail,
    date: map.date,
    userID: userID[0]
  }, 'mapID')
    .then((mapID) => {
      const pinPromises = [];
      
      map.pins.forEach((pin) => {
        pinPromises.push(createPin(knex, pin, mapID));
      });
      return Promise.all(pinPromises);
    })
    .catch(error => {
      return error;
    });
};

const createUser = (knex, user) => {
  return knex('users').insert({
    email: user.email,
    username: user.username
  }, 'UID')
    .then((userID) => {
      const mapPromises = [];
      user.maps.forEach(map => {
        mapPromises.push(createMap(knex, map, userID));
      });
      return Promise.all(mapPromises);
    })
    .catch(error => {
      return error;
    });
};

exports.seed = (knex, Promise) => {
  return knex('posts').del()
    .then(() => {
      knex('pins').del();      
    })
    .then(() => {
      knex('maps').del();
    })
    .then(() => {
      knex('users').del();
    })
    .then(() => {
      const userPromises = [];
      const users = [mockUser];

      users.forEach((user) => {
        userPromises.push(createUser(knex, user));
      });
      return Promise.all(userPromises);
    })
    .catch((error) => {
      return error;
    });
};
