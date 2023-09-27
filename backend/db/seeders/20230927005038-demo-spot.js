'use strict';
const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  async up(queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: '123 Rainbow Lane',
        city: 'Graham',
        state: 'NH',
        country: 'USA',
        lat: 123.123,
        lng: 123.123,
        name: 'Dynasty',
        description: 'Buffet',
        price: 14.99
      },
      {
        ownerId: 2,
        address: '321 Count Dracula St',
        city: 'Berlin',
        state: 'ME',
        country: 'France',
        lat: 321.321,
        lng: 1321.32,
        name: 'Guildies',
        description: 'Vampire house',
        price: 6.99
      },
      {
        ownerId: 3,
        address: '159914234 Lemieux Lane',
        city: 'James',
        state: 'MA',
        country: 'Brazil',
        lat: 456.654,
        lng: 456.654,
        name: 'Jimbo',
        description: 'The crizzy',
        price: 3.50
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spot';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Dynasty', 'Guildies', 'Jimbo'] }
    }, {});
  }
};
