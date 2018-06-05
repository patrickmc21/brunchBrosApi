
exports.up = function(knex, Promise) {
  return Promise.all([

    knex.schema.createTable('users', (table) => {
      table.increments('UID').primary();
      table.string('email');
      table.string('username');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('maps', (table) => {
      table.increments('mapID').primary();
      table.string('title');
      table.string('location');
      table.string('description');
      table.string('thumbnail');
      table.string('date');
      table.integer('userID').unsigned();
      table.foreign('userID').references('users.UID');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('pins', (table) => {
      table.increments('pinID').primary();
      table.string('title');
      table.float('long');
      table.float('lat');
      table.integer('mapID').unsigned();
      table.foreign('mapID').references('maps.mapID');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('posts', (table) => {
      table.increments('ID').primary();
      table.string('title');
      table.string('desc');
      table.integer('likes');
      table.string('thumbnail');
      table.integer('pinID').unsigned();
      table.foreign('pinID').references('pins.pinID');

      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('posts'),
    knex.schema.dropTable('pins'),
    knex.schema.dropTable('maps'),
    knex.schema.dropTable('users')  
  ]);
};
