'use strict';

const { Review } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        spotId: 1,
        userId: 2,
        review: 'I did not like staying here',
        stars: 1
      },
      {
        spotId: 2,
        userId: 3,
        review: 'I thought it was ok',
        stars: 3
      },
      {
        spotId: 3,
        userId: 4,
        review: 'This place was pretty good',
        stars: 5
      },
      {
        spotId: 4,
        userId: 5,
        review: 'Would recommend this place to anyone',
        stars: 5
      },
      {
        spotId: 5,
        userId: 1,
        review: 'This was the nicest place I could ever imagine',
        stars: 5
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Review';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      review: { [Op.in]: ['I did not like staying here', 'I thought it was ok', 'This place was pretty good', 'Would recommend this place to anyone', 'This was the nicest place I could ever imagine'] }
    }, {});
  }
};
